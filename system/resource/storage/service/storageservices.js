/*
* 云存储上传封装使用类
*/
function storageServices() {
	_this = this;
	
	///////////需要的变量/////////
	this.updater = undefined;
	this.progress = undefined;
	this.requestcount = 0;
	
	
	this.oldaction; //修改设置之间的action地址
	this.oldtarget;//修改设置之间的target
	this.oldencoding;
	
	//////////需要外部设置的参数/////////
	this.formid = "";//当前表单的名称
	this.uploadurl = "";//云存储上传路径
	this.uploadResultAjaxUrl = ""; //获取上传结果的ajax 的url
	this.uploadStateAjaxUrl = "";//获取上传状态的 ajax 的url
	this.uploadStateEchoDivId = "";//上传状态回显div 的编号
	this.formtargetname = "";//form提交的目标的地址
	this.handleerrfunction;//错误时需要回调处理的函数
	this.handlesucceedfunction;//上传成功时需要回调处理的函数
}
String.prototype.trim　= function()       
{              
    var t = this.replace(/(^\s*)|(\s*$)/g, "");     
    return t.replace(/(^　*)|(　*$)/g, "");     
}     
storageServices.prototype = {
//启动方法
startStatusCheck:function () 
{
	 var formobj = document.getElementById(_this.formid);
	 
	 //记录之间的参数
	 _this.oldaction=formobj.action;
	 _this.oldtarget=formobj.target;
	 _this.oldencoding = formobj.encoding;
	 
	 //设置新的参数
	 formobj.action = _this.uploadurl;
   	 formobj.target = _this.formtargetname;
   	 formobj.setAttribute('enctype', 'multipart/form-data');
   	 formobj.encoding = 'multipart/form-data';
   	 
   	 
   	 //调用回调参数 获取结果和上传进度进度参数

   	 //_this.updater  = new Ajax.PeriodicalUpdater('',_this.uploadResultAjaxUrl,{asynchronous:true, frequency:2, method: 'get', onFailure: _this.reportError,onSuccess : _this.readJson});
     //_this.progress = new Ajax.PeriodicalUpdater(_this.uploadStateEchoDivId,_this.uploadStateAjaxUrl,{asynchronous:true, frequency:2, method: 'get', onFailure: _this.myError});
	
	 //获取结果回调函数
	 _this.updater = new storageServicesPeriodicalUpdater();
	 _this.updater.setAjaxurl(_this.uploadResultAjaxUrl);
     _this.updater.setPostAsynchronous(true)
	 _this.updater.setPostFrequency("500")
	 _this.updater.setPostMethod("GET");
	 _this.updater.onFailure(_this.reportError)
	 _this.updater.onSuccess(_this.readJson)
	 _this.updater.start();
	 
	 //显示状态的回调回调函数
	 _this.progress = new storageServicesPeriodicalUpdater();
	 _this.progress.setAjaxurl(_this.uploadStateAjaxUrl);
     _this.progress.setUploadState(_this.uploadStateEchoDivId);
     _this.progress.setPostAsynchronous(true)
	 _this.progress.setPostFrequency("500")
	 _this.progress.setPostMethod("GET");
	 _this.progress.onFailure(_this.myError)
	 _this.progress.start();
	
},
//读取成功时调用的方法
readJson:function (request)
{
	var content = request.responseText;
	if(content=="\r\n")
	{
	    //alert(requestcount);
	    if(request.status!=200)
	        requestcount++;
	    //三次请求不到，则提示错误    
	    if(_this.requestcount==3)
	    {
	        alert("存储节点访问出错，请和管理员联系!")
	        //清除之前的setTimeout任务
            _this.stopAjax();
            _this.handleErrFunction();                       
	        return ;
	    }
	}else
	{
		try
		{
			var json=eval("("+content+")");
			if(json.status=="end")
			{				
   			    try
   			    {
   			    	//回调外部使用的函数
   			    	eval( "var _function = " +  _this.handlesucceedfunction);
   			    	_function(json);
   			    }catch(e)
   			    {
   			    	alert(e)
   			    }
   			    
   			    //停止定时器
				_this.stopAjax();
 				setTimeout("_this.progress.stop()",500);
   				
   			}
   			//上传失败
			if(json.result=="false")
			{
  			    if(json.errorinfo!="")
  			    {
  			        alert(json.errorinfo);
  			        _this.stopAjax();
                    setTimeout("_this.progress.stop()",500);
                    _this.handleErrFunction(); 
  			    }
			}
		}catch(e){ return;}
	}
	
},
stopAjax:function ()
{
    setTimeout("_this.updater.stop()",100);
},
myError:function (request)
{
    setTimeout("_this.progress.stop()",100);
},
reportError:function(request)
{
    var content = request.responseText;
    alert("请求失败"+request.status);
    //清除之前的setTimeout任务
    _this.stopAjax();
    
    _this.handleErrFunction();
},
//回调错误处理函数,需要在外部设置
handleErrFunction:function()
{
	try{
    	if(_this.handleerrfunction!="")
    	{
    		eval(_this.handleerrfunction+"()");
    	}    	
    }catch(e)
    {
    }
},
//将action的地址之前的地址
recoverForm:function()
{
	 var formobj = document.getElementById(_this.formid);
	 formobj.action= _this.oldaction;
   	 formobj.target = _this.oldtarget;
   	 formobj.setAttribute('enctype', _this.oldencoding);
   	 formobj.encoding = _this.oldencoding;
}
};
/*回调封装函数
* 内部使用
*/
function storageServicesPeriodicalUpdater() 
{
	var ajaxurl = "";//请求ajax地址
	var uploadState = "";//回显div编号
	
	var asynchronous = true; //ajax 参数是否异步
	var frequency = "500";  //ajax 调用频率 毫秒数
	var method =  "GET";  //ajax 请求方式
	var onFailure =  "";  //失败调用的函数
	var onSuccess =  ""; //成功调用的函数
	
	var isrun  = false;  //是否运行
	var isstop  = false; //是否停止
	var id =  "";   
	var xmlHttp;  //ajax 对象
	//启动函数
	this.start = function()
	{
		if(isstop)
		{
			return;	
		}
		if(!isrun)
		{
			isrun = true;
		}
		
		//调用ajax函数
		xmlHttp = createXMLHttpRequest();
		startRequest(ajaxurl,operationResult,xmlHttp)
		
		//定时在调用自己循环执行，调用成功，失败或者外部停止
		setTimeout(arguments.callee,frequency);
	}
	//停止调用 供外部调用
	this.stop = function()
	{
		isstop = true;
	}
	this.setAjaxurl = function(p1)
	{
		ajaxurl = p1;
	}
	this.setID = function(p1)
	{
		id = p1;
	}
	this.setUploadState = function(p1)
	{
		uploadState = p1;
	}
	
	this.setPostAsynchronous = function(p1)
	{
		asynchronous = p1;
	}
	this.setPostFrequency = function(p1)
	{
		frequency = p1;
	}
	this.setPostMethod = function(p1)
	{
		method = p1;
	}
	this.onFailure = function(p1)
	{
		onFailure = p1;
	}
	this.onSuccess = function(p1)
	{
		onSuccess = p1;
	}
	
	//ajax 回调处理
	function operationResult()
	{
		//获取状态成功
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
		{			
			//如果设置了成功的回调函数就调用	
			if(onSuccess!="")
			{
				callFunction(onSuccess,xmlHttp);
			}
			//如果设置了回显的标签编号就回显
			
			var rt = xmlHttp.responseText.trim();
			if(uploadState!="" && rt!="")
			{
				document.getElementById(uploadState).innerHTML = rt;
			}
		}else
		{
			//处理错误，先做简单处理 除了200以外都当作错误处理
			if(xmlHttp.readyState == 4 && xmlHttp.status != 200)
			{
				try{
			    	if(onFailure!="")
			    	{
	   			    	callFunction(onFailure,xmlHttp);
			    	}    	
			    }catch(e)
			    {
			    }
		    }
		}
	}
	//执行一个带参数的函数
	function callFunction(functionname,o)
	{
		eval( "var _function = " +  functionname);
	    _function(o);
	}
	//ajax进行请求
	function startRequest(url, fun,xmlHttp)
	{
	    xmlHttp.onreadystatechange  =  fun;
	    xmlHttp.open(method,url,asynchronous);
	    xmlHttp.send(null);
	}
	//创建ajax对象
	function createXMLHttpRequest()
	{
		 var xmlHttp = null;
		 try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		 }
		 catch(e)
		 {
		  	 try
		  	 {
		         xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		     }
		     catch(e)
		     {
			   try{
			          xmlHttp = new XMLHttpRequest();
			      }catch(e){
			    }
		     }
		}
	    return xmlHttp;
	}
	
}

function storageServicesGetrelateVsl() 
{
	var ajaxurl = "/system/resource/storage/service/services.jsp?actiontype=getrelatevsl";//请求ajax地址
	var type = "";
	var callbackfunction =  ""; //回调函数
	var imagepath= "";//图片地址
	var xmlHttp;
	this.setType = function(p1)
	{
		type = p1;
	}
	this.setCallbackFunction = function(p1)
	{
		callbackfunction = p1;
	}
	this.setImagepath = function(p1)
	{
		imagepath = p1;
	}
	this.start = function()
	{
		ajaxurl += "&imagepath="+imagepath+"&type="+type;
		
		//调用ajax函数
		xmlHttp = createXMLHttpRequest();
		startRequest(ajaxurl,operationResult,xmlHttp)
	}
	//ajax 回调处理
	function operationResult()
	{
		//获取状态成功
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
		{			
			callFunction(callbackfunction,xmlHttp.responseText);
		}else
		{
			
		}
	}
	//ajax进行请求
	function startRequest(url, fun,xmlHttp)
	{
	    xmlHttp.onreadystatechange  =  fun;
	    xmlHttp.open("get",url,false);
	    xmlHttp.send(null);
	}
	//创建ajax对象
	function createXMLHttpRequest()
	{
		 var xmlHttp = null;
		 try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		 }
		 catch(e)
		 {
		  	 try
		  	 {
		         xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		     }
		     catch(e)
		     {
			   try{
			          xmlHttp = new XMLHttpRequest();
			      }catch(e){
			    }
		     }
		}
	    return xmlHttp;
	}
	//执行一个带参数的函数
	function callFunction(functionname,o)
	{
		eval( "var _function = " +  functionname);
	    _function(o);
	}
}