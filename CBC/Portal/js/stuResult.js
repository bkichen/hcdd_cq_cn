


/*$(function(){
	$("a[name=page_a]").focus(function(){
		
		var certificateName = $("#certificateName").val();
		var awardOrgName = $("#awardOrgName").val();
		certificateName = certificateName + "";
		awardOrgName = awardOrgName + "";
		
		var split = $(this).attr("href").split("#mark");
		$(this).attr("href",split[0]+"&certificateName="+certificateName+"&awardOrgName="+awardOrgName+"#mark");
	});
});*/


//关闭查看弹窗
$(function(){
	$(".cy_yhqsbigbg").click(function(){
		$(".cy_yhqshidebox").hide();
		$(".cy_yhqsbigbg").hide();
	});
});
	
	
$(function(){
	$(".cy_yhqsbigbg02").click(function(){
		$(".cy_yhqshidebox02").hide();
		$(".cy_yhqsbigbg02").hide();
	})
});

$(function(){
	$("#cr_tcc02").click(function(){
		$("#cr_show").hide();
		$("#cr_tcc02").hide();
	})
});

function closediv(){
	$(".cy_yhqshidebox").hide();
	$(".cy_yhqsbigbg").hide();
	$(".cy_yhqshidebox02").hide();
	$(".cy_yhqsbigbg02").hide();
}

function closecr_show(){
	$("#cr_show").hide();
	$("#cr_tcc02").hide();
}



function jQueryEasyUi() {
}

jQueryEasyUi.ajax = function(s) {
	jQuery.ajax(s);
}

//对应高校课程
function stuResultToCollegeCourse(value2){
	//alert("ok");
	var unitCode = value2;
	var certificate = $("#certificate").text();
	//window.open ("/CBC/stuResultAction!findCourse.action?isView=y&type=1&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, "newwindow", "height=450, width=650, top="+($(window).height() - 300) * 0.5+",left="+($(window).width() - 650) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no") 
	
	jQueryEasyUi.ajax({
		type : "POST",
		url: "/CBC/stuResultAction!findCollege_Course.htm?&unitCode="+encodeURI(encodeURI(unitCode)),
		success : function(data) {
			$("#cy_yhqshidebox").html(
					"<div class='cy_zhenshuxinxi'><span class='close' onclick='closediv()'><img src='Portal/portalImages/off.jpg'/></span>"+
		        		"<h1>证书信息</h1>"+
		    			"<a><span>证书编号：</span>"+unitCode+"</a><a><span>证书名称：</span>"+certificate+"</a>"+
		        	"</div>"+
		        	"<div class='cy_zhenshuxinxi02'>"+
		            	"<h1>对应高校课程</h1>"+
		        	"</div>" 
			 ); 
			 $("#cy_yhqshidebox").append(data);
	     	 $("#cy_yhqshidebox").css({top:($(window).height() - 600) * 0.5+$(document).scrollTop(),left:($(window).width() - 750) * 0.5});
	         $("#cy_yhqshidebox").show();
	 		 $("#cy_yhqsbigbg").show();
		}
	});
	/*  $.getJSON("/CBC/stuResultAction!findCourse.action?isView=y&type=1&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, function(data) {
		 $("#cy_yhqshidebox").html(
				 "<div class='cy_zhenshuxinxi'>"+
             	"<h1>证书信息</h1>"+
         		"<a><span>证书编号：</span>0027</a><a><span>证书名称：</span>职业水平技能证书</a>"+
	         	"</div>"+
	         	"<div class='cy_zhenshuxinxi02'>"+
	             	"<h1>对应高校课程</h1>"+
	         	"</div>" +
	         	"<table width='100%' border='0' cellpadding='0' cellspacing='0' class='sytm_tab01'>"+
	         	"<tr class='cy_adstyle'>"+
	     		   " <td>高校网点</td>"+
	     		   " <td>课程名称</td>"+
	     		   " <td>专业</td>"+
	     		   " <td>对应方式</td>"+
	     		   " <td>课程简介</td>"+
	     		" </tr>"
		 ); 
		 
		 
		var  json = eval(data.rows);
		 var middle;
		 for(var i=0; i<json.length; i++)  {
			  middle = middle +"<tr class='cy_adstyle01'><td>"+json[i].collegesName+"</td><td>"+json[i].unitName+"</td><td>"+json[i].disciplineName+"</td><td>"+json[i].formsInfoName+"</td><td>"+json[i].caption+"</td></tr>";
			 
		} 
		 $("#cy_yhqshidebox").append(middle);
	      $.each(data.rows, function(i, item) {
	            $("#cy_yhqshidebox").append(
	            		 "<tr class='cy_adstyle01'>"+
	            		   " <td>"+item.collegesName+"</td>"+
		   	     		   " <td>"+item.unitName+"</td>"+
		   	     		   " <td>"+item.disciplineName+"</td>"+
		   	     		   " <td>"+item.formsInfoName+"</td>"+
		   	     		   " <td>"+item.caption+"</td>"+
	   	     		   	 "</tr>"
	            );
	        });
		
	 });*/
	        
}


//对应规则
function findConvertRules(id){
	jQueryEasyUi.ajax({
		type : "POST",
		url: "/CBC/stuResultAction!findConvertrules.action?convertRulesId="+ id,
		success : function(data) {
			 $("#cr_show").html("<div class='cy_zhenshuxinxi'><span class='close'onclick='closecr_show()'><img src='Portal/portalImages/off.jpg'/></span></div>");
			 $("#cr_show").append(data);
	     	 $("#cr_show").css({top:($(window).height() - 600) * 0.5+$(document).scrollTop(),left:($(window).width() - 750) * 0.5});
	         $("#cr_show").show();
	         $("#cr_tcc02").show();
		}
	})
}

//对应学分银行课程
function stuResultToCbcCourse(value1,type){
	var split = value1.split(',');
	var id = split[0];
	var text=""
	if(type==0){
	    text="学历教育学习成果";
	}else if(type==1){
		text="非学历教育学习成果";
	}else{
		text="无定式教育学习成果";
	}
	jQueryEasyUi.ajax({
		type : "POST",
		url: "/CBC/stuResultAction!findCourse.action?isView=y&id="+ id,
		success : function(data) {
			$("#cy_yhqshidebox02").html(
					"<div class='cy_zhenshuxinxi'><span class='close'onclick='closediv()'><img src='Portal/portalImages/off.jpg'/></span>"+
			        "</div>"+
		        	"<div class='cy_zhenshuxinxi02'>"+
		            	"<h1>"+text+"</h1>"+
		        	"</div>" 
			 ); 
			 $("#cy_yhqshidebox02").append(data);
	     	 $("#cy_yhqshidebox02").css({top:($(window).height() - 600) * 0.5+$(document).scrollTop(),left:($(window).width() - 750) * 0.5});
	         $("#cy_yhqshidebox02").show();
	 		 $("#cy_yhqsbigbg02").show();
		}
	});
}
/*$(function(){
	
		//grid.bind();//初始刷新表格(调用定义好的表格)
	
//		$('.sytm_m1_first').click(function(val){
//			alert("ok");
//			alert($('#cbcTd').text());
//			stuResultToCbcCourse(val);
//		});
//		
//		$('#collegeSearch').click(function(){
//			
//			stuResultToCollegeCourse("软件工程师证");
//			window.open ("Register.vm", "newwindow", "height=500, width=500, top="+($(window).height() - 400) * 0.5+$(document).scrollTop()+",left="+($(window).width() - 300) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no") 
				var certificateName = "软件工程师证";
				jQueryEasyUi.ajax({
					type : "POST",
					url : '/CBC/ddcbc/stuResultAction!findCourse.action?isView=y&type=1&certificateName=' + certificateName,
					beforeSend : function() {
					},
					success : function(datas) {
//						datas解析成你要的形式
//						var htmlvalue="<html><head></head><body>ssss</body></html>"
//						alert(datas);
						window.open (htmlvalue, "newwindow", "height=500, width=500, top="+($(window).height() - 400) * 0.5+$(document).scrollTop()+",left="+($(window).width() - 300) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no") 
//						alert();
					}	
				});
//				var awardOrgName = $("#awardOrgName").val();
//				var certificateName = $("#certificateName").val();
//				var queryParams = {
//					awardOrgName : awardOrgName + "",
//					certificateName : certificateName + ""
//				};
//			
//	    		url = "/CBC/login!educationGain.htm?cssType=$!id&Page=$!Page&pageNo=1&check=1#mark";   
//	    		 $('#list').datagrid('options').url=url;
//	    		 $('#list').datagrid('options').queryParams=queryParams;
//	    		 $('#list').datagrid('reload'); 
			
//			var awardOrgName = $("#awardOrgName").val();
//			var certificateName = $("#certificateName").val();
//			
//			jQueryEasyUi.ajax({
//				type : "POST",
//				url : '/CBC/login!educationGain.htm?cssType=$!id',
//				data : "awardOrgName=" + awardOrgName+"&certificateName="+certificateName,
//				beforeSend : function() {
//				},
//				success : function(datas) {
//					alert(datas);
//				}	
//			});
		
//		}); 
		
		
		$("a[rel^='colorbox']").colorbox({iframe:false,width:"80%",
			height:"80%",close: "关闭",
			overlayClose: true,scrolling:false,
			opacity:0.7, rel: 'group1'
		});// rel='colorbox' 加上ColorBox 效果
		
		
	
});*/



	/*var grid = {
			
    bind: function () {
        //var winSize = { width: $(window).width() - 40, height: $(window).height() - 40 };
        
        $('#list').datagrid({
	            url: '/CBC/ddcbc/stuResultAction!loadEasyuiPage.action?isView=y',
	            iconCls: 'icon icon-list',
	           //width: winSize.width,
	           //height: winSize.height,
	            width : 765,
				height : 590,
	            nowrap: false, //false:折行
	            rownumbers: true, //行号
	            striped: true, //隔行变色
	            idField: 'Id', //主键
	            singleSelect: true, //单选
	            pagination:true,//分页控件（jQueryUi自带分页控件）
	            pageSize:20,//每页显示几条记录
	        	pageList:[20,25,30],//一个数组 [每页显示几条记录]
	        	pageNumber:1,//设置默认当前页
	        	showPageList:true,
				showRefresh:true,
				beforePageText:'第',
	        	afterPageText:'页，共{pages}页',
				displayMsg:'{from}-{to}/{total}',
				loadMsg: '数据加载中,请稍候...',
				onClickRow:function(rowIndex,rowData){
//					   showSelectedSurveryGaiYaoMsgOnMap(rowData);
					alert(rowIndex);
					alert(rowData);
			    },
					  
	            //frozenColumns: [[]],
				//toolbar://工具：添加，修改，删除等
	            columns: [[
	                    { title: '证书名称', field: 'certificate', width: 165,align:'center'},
						{ title: '证书代码', field: 'unitCode', width: 130,align:'center'},
						{ title: '发证机构', field: 'awardOrg', width: 244,align:'center'},
						{ title: '对应学分银行课程', field: 'id', width: 99,align:'center',
							formatter:function(value1){
								return '<a title="查看" href="javascript:stuResultToCbcCourse(\''+value1+'\')"><img src="core/css/imgs/grid/ga_view.png"></img></a>' ;
								return  '<a rel="colorbox" class="group1" href="/CBC/ddcbc/stuResultAction!loadEasyuiPage.action?isView=y">查看</a>';
								return  '<a rel="colorbox" class="group1" href="/CBC/ddcbc/stuResultAction!loadEasyuiPage.action?isView=y" onclick="parent.$.fn.colorbox({iframe:false,width:"80%",height:"80%",close: "关闭",overlayClose: true,scrolling:false,opacity:0.7}); return false;">查看</a>';
							
							}
						},
						{ title: '对应高校课程', field: 'certificateName', width: 99,align:'center',
							formatter:function(value2){
								return '<a title="查看" href="javascript:stuResultToCollegeCourse(\''+value2+'\')"><img src="Portal/images/navpicicon_06.png"></img></a>' ;
							}
						},
							
	                ]]
        });
        
    },
    
}*/
	
	
	/*//对应学分银行课程
	function stuResultToCbcCourse(value1){
		
		var split = value1.split(',');
		var id = split[0];
		var unitCode = split[1];
		var certificate = split[2];
//		window.open ("/CBC/stuResultAction!findCourse.action?isView=y&type=0&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, "newwindow", "height=450, width=650, top="+($(window).height() - 300) * 0.5+",left="+($(window).width() - 650) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no")
		 $.getJSON("/CBC/stuResultAction!findCourse.action?isView=y&type=0&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, function(data) {
		        $("#sturesultInfo").html("<br/><div style='text-align:left;'><div style='color: #0A6DC0;padding-left:15px;height:35px;line-height:35px;font-size:18px;'>证书信息</div><hr style='width: 95%;margin:0 auto;color: #EEF4F9;size:2px'/><div style='padding-left:15px;height:10px;margin-top:10px;'><span style='display:block;float: left;width:70px;height:25px;line-height:25px;background-color:#D4D0C8;text-align:center;color:#666666'>证书代码:</span><span style='display:block;float: left;font-weight: bold;height:25px;line-height:25px;'>&nbsp;&nbsp;"+unitCode+"</span><span style='margin-left:10px;display:block;float: left;width:70px;height:25px;line-height:25px;background-color:#D4D0C8;text-align:center;color:#666666'>证书名称:</span><span style='display:block;float: left;font-weight: bold;height:25px;line-height:25px;'>&nbsp;&nbsp;"+certificate+"</span></div><br/><hr style='clear:both;width: 95%;margin:0 auto;border:1px dotted #CCCCCC;'/><div style='height:35px;line-height:35px;color: #0A6DC0;padding-left:15px;font-size:18px;margin-top:10px;'>对应学分银行课程</div><hr style='width: 95%;margin:0 auto;color: #EEF4F9;size:2px'/></div><br/>"); 
		        $.each(data.rows, function(i, item) {
		            $("#sturesultInfo").append(
		            		 "<table style='width:480px;text-align:left;margin-left:10px;'>" +
	 						 "<tr style='font-size:15px;height:23px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>课程名称:</td><td style='width:120px;color: #0A6DC0;'>&nbsp;&nbsp;"+item.unitName+"</td><td style='width:80px;background-color:#D4D0C8;text-align:center;'>&nbsp;&nbsp;课程代码:</td><td style='color: #0A6DC0;'>&nbsp;&nbsp;"+item.unitCode+"</td></tr>"+
	 						 "<tr style='font-size:15px;height:23px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>专&nbsp;&nbsp;&nbsp;&nbsp;业:</td><td style='color: #0A6DC0;'>&nbsp;&nbsp;"+item.disciplineName+"</td><td  colspan=2 >1</td></tr>"+
	 						 "<tr style='font-size:15px;height:40px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>课程描述:</td><td  colspan=3 style='color: #0A6DC0;width:400px'>&nbsp;&nbsp;"+item.caption+"</td></tr>"+
							 "</table>");
		        });
		        });
		 
         		$("#sturesultInfo").css({top:($(window).height() - 500) * 0.5+$(document).scrollTop(),left:($(window).width() - 500) * 0.5});
		        $("#sturesultInfo").show();
		        $(".sturesultInfoHide").show();
		
			$('#certificate_CbcCourse').show();
			$('#certificate_CbcCourse').window({
				title: '证书对应学分银行课程',
				width: 500,
				height: 500,
				top:($(window).height() - 480) * 0.5+$(document).scrollTop(),  
	            left:($(window).width() - 500) * 0.5,
				collapsible:true,
				minimizable:false,
				maximizable:true,
				closable:true,
				draggable:true,
				resizable:false,
				shadow:true,
				modal:true,
			});
			
	 			   	for(var i=0,j=datas.rows.length;i<j;i++){
	 			   	    alert(datas.rows[i].unitName);
	 			   	}
						jQueryEasyUi.ajax({
							type : "POST",
							url : '/CBC/ddcbc/stuResultAction!findCourse.action?isView=y&type=0',
							data : "id=" + value1,
							dataType:"json", 
							beforeSend : function() {
							},
							success : function(datas) {
						
								$("#certificate_CbcCourse").html("<br/><div><span style='font-size:20px;font-weight: bold;'>"+datas.rows[0].certificateName+"</span></div><br/><hr/>");
				 			    $(datas.rows).each(function(i){
			 					$("#certificate_CbcCourse").append(
			 						 "<table style='width:480px;margin:5px 0;'>" +
				 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>课程名称:</td><td style='width:120px;color: #0A6DC0;'>&nbsp;&nbsp;"+datas.rows[i].unitName+"</td><td style='width:80px;background-color:#D4D0C8;text-align:center;'>&nbsp;&nbsp;课程代码:</td><td style='color: #0A6DC0;text-align:center;'>"+datas.rows[i].unitCode+"</td></tr>"+
				 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>专&nbsp;&nbsp;&nbsp;&nbsp;业:</td><td style='color: #0A6DC0;'>&nbsp;&nbsp;"+datas.rows[i].disciplineName+"</td></tr>"+
				 						 "<tr style='font-size:15px;height:40px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>课程描述:</td><td  colspan=3 style='color: #0A6DC0;'>&nbsp;&nbsp;"+datas.rows[i].caption+"</td></tr>"+
		 							 "</table>"
		 						);
			 			    });
						}	
					});
			
				
			}*/
	
	
	
	
	/*//对应高校课程
	function stuResultToCollegeCourse(value2){
		var split = value2.split(',');
		var id = split[0];
		var unitCode = split[1];
		var certificate = split[2];
		//window.open ("/CBC/stuResultAction!findCourse.action?isView=y&type=1&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, "newwindow", "height=450, width=650, top="+($(window).height() - 300) * 0.5+",left="+($(window).width() - 650) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no") 
		 $.getJSON("/CBC/stuResultAction!findCourse.action?isView=y&type=1&id="+ id+"&unitCode="+unitCode+"&certificate="+certificate, function(data) {
			 $("#sturesultInfo").html("<br/><div style='text-align:left;'><div style='color: #0A6DC0;padding-left:15px;height:35px;line-height:35px;font-size:18px;'>证书信息</div><hr style='width: 95%;margin:0 auto;color: #EEF4F9;size:2px;'/><div style='padding-left:15px;margin-top:10px;height:10px;'><span style='display:block;float: left;width:70px;height:25px;line-height:25px;background-color:#D4D0C8;text-align:center;color:#666666'>证书代码:</span><span style='display:block;float: left;font-weight: bold;height:25px;line-height:25px;'>&nbsp;&nbsp;"+unitCode+"</span><span style='margin-left:10px;display:block;float: left;width:70px;height:25px;line-height:25px;background-color:#D4D0C8;text-align:center;color:#666666'>证书名称:</span><span style='display:block;float: left;font-weight: bold;height:25px;line-height:25px;'>&nbsp;&nbsp;"+certificate+"</span></div><br/><hr style='clear:both;width: 95%;margin:0 auto;border:1px dotted #CCCCCC;'/><div style='height:35px;line-height:35px;color: #0A6DC0;padding-left:15px;font-size:18px;margin-top:10px;'>对应高校课程</div><hr style='width: 95%;margin:0 auto;color: #EEF4F9;size:2px;'/></div><br/>" +
		        		"<table style='width:500px;text-align:left;margin:0 auto;'>" +
		        		"<tr style='background-color:#D4D0C8;font-size:15px;height:20px;text-align:center'><td style='width:100px;'>高校网点</td><td style='width:100px;'>课程名称</td><td style='width:100px;'>专业</td><td style='width:100px;'>对应方式</td><td style='width:100px;'>课程简介</td></tr>"); 
		       
		        $.each(data.rows, function(i, item) {
		            $("#sturesultInfo").append(
		            		 "<tr style='font-size:15px;height:23px;text-align:center'><td style='width:100px;'>"+item.collegesName+"</td><td style='width:100px;'>"+item.unitName+"</td><td style='width:100px;'>"+item.disciplineName+"</td><td style='width:100px;'>"+item.formsInfoName+"</td><td style='width:100px;'>"+item.caption+"</td></tr>");
		        });
		        
		        $("#sturesultInfo").append("</table>");
		        });
		 
                $("#sturesultInfo").css({top:($(window).height() - 500) * 0.5+$(document).scrollTop(),left:($(window).width() - 500) * 0.5});
		        $("#sturesultInfo").show();
		        $(".sturesultInfoHide").show();
		        
//				jQueryEasyUi.ajax({
//					type : "POST",
//					url : '/CBC/ddcbc/stuResultAction!findCourse.action?isView=y&type=1&id=' + value2,
//					dataType:"json", 
//					success : function(datas) {
//						if(datas.rows.length==0){
//							$.messager.alert('My Title','没有找到对应的课程信息！');
//						}else{
//							$('#certificate_collegeCourse').show();
//							$('#certificate_collegeCourse').window({
//								title: '证书对应高校课程',
//								width: 680,
//								height: 500,
//								top:($(window).height() - 480) * 0.5+$(document).scrollTop(),  
//					            left:($(window).width() - 650) * 0.5,
//								collapsible:true,
//								minimizable:false,
//								maximizable:false,
//								closable:true,
//								draggable:false,
//								resizable:false,
//								shadow:true,
//								modal:false,
//							});
//							$('#collegeCourseId').datagrid({
//								width: 700,
//								height: 500,
//								url : '/CBC/ddcbc/stuResultAction!findCourse.action?isView=y&type=1&id='+value2,
//					            iconCls: 'icon icon-list',
//					            nowrap: false, //false:折行
//					            rownumbers: true, //行号
//					            striped: true, //隔行变色
//					            idField: 'Id', //主键
//					            singleSelect: true, //单选
//					            pagination:true,//分页控件（jQueryUi自带分页控件）
//					            pageSize:5,//每页显示几条记录
//					        	pageList:[5,10,15,20,25],//一个数组 [每页显示几条记录]
//					        	pageNumber:1,//设置默认当前页
//					        	showPageList:true,
//								showRefresh:true,
//								beforePageText:'第',
//					        	afterPageText:'页，共{pages}页',
//								displayMsg:'{from}-{to}/{total}',
//								loadMsg: '数据加载中,请稍候...',
//					            //frozenColumns: [[]],
//								//toolbar://工具：添加，修改，删除等
//					            columns: [[
//					                    { title: '高校网点', field: 'collegesName', width: 100,align:'center'},
//					                    { title: '课程名称', field: 'unitName', width: 100,align:'center'},
//										{ title: '专业', field: 'disciplineName', width: 100,align:'center'},
//										{ title: '类型', field: 'unitTypeName', width: 105,align:'center'},
//										{ title: '学习成果形式', field: 'formsInfoName', width: 110,align:'center'},
//										{ title: '描述/说明', field: 'caption', width: 110,align:'center'},
////										{ title: '课程所属体系', field: 'courseSystemName', width: 110,align:'center'},
////										{ title: '课程性质', field: 'coursePropertyName', width: 105,align:'center'},
////										{ title: '课程模块', field: 'courseModelTypeName', width: 105,align:'center'},
//										
//										
//					                ]]
//							});
//						}
//				}	
//			});
	} */
	
	//加载tab中的数据
	/*$(function(){
		$('#tt').datagrid({
			title:"终身学习成果",
			//fit: false,//自动大小
			width:550,
			height:590,
			nowrap:true,//如果为true，则在同一行中显示数据。设置为true可以提高加载性能。
			striped:true,//是否显示斑马线效果。
			url:'/CBC/ddcbc/userStuResultRecAction!loadApplication.action?isView="y"',
			pagination:true,//分页控件  
			rownumbers:true,//行号  
			singleSelect:true,//是否单选  					 
			pageSize:20,//每页显示几条记录
    		pageList:[20,25,30],//一个数组 [每页显示几条记录]
    		loadMsg: '数据加载中,请稍候...',
						
			columns:[[
				{field:'baseUserName',title:'用户姓名',align:'center',width:100	},
				{field:'baseUnitName',title:'取得成果名称',align:'center',width:90},
				{field:'achieveTime',title:'获取时间',align:'center',width:100},
				{field:'achieveWay',title:'获取方式',align:'center',width:70},
				{field:'stuResultName',title:'学习成果名称',align:'center',width:100},
			
			
				
				//{field:'remark',title:'开设状态',align:'center',width:100},
				//{field:'caption',title:'课时',align:'center',width:100},					
				{field:'caption',title:'备注',align:'center',width:60,
					formatter:function(value){
							return '<a href="#" onClick="alertView(\''
												+ value + '\')">查看</a>'
						}
				},
			]]																		
		});*/
	$(function(){	
		$("#seachForm input").blur(function(){
			
			//验证输入框内不能输入特殊字符,输入就立刻清除
		    if(/["'<>%;)(&+]/.test(this.value)){
		       $(this).val(this.value.replace(/["'<>%;)(&+]/,""));
			}
		});
	});
	
	//A标签Post提交信息
	function AlablePost(url,para){
		var subForm = document.createElement("form");
		subForm.method = "post";  
        subForm.action = url;  
		for (var i in para){
			var myInput = document.createElement("input");       
            myInput.setAttribute("name", i);  // 为input对象设置name  
            console.log(i+":"+htmlEncode(para[i]));
            myInput.setAttribute("value",para[i]);  // 为input对象设置value  
            subForm.appendChild(myInput);  
		}
		document.body.appendChild(subForm);     
        subForm.submit();   
        document.body.removeChild(subForm);  // 提交后移除创建的form
	}
	