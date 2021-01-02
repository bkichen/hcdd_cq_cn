$(function(){
	$("form input").blur(function(){
		//验证输入框内不能输入特殊字符,输入就立刻清除
	    if(/["'<>%;)(&+]/.test(this.value)){
	       $(this).val(this.value.replace(/["'<>%;)(&+]/,""));
		}
	});
	jQuery.validator.addMethod("stringCheck", function(value, element) { 
		return this.optional(element) || /^\w+$/.test(value);
	 }, "<font color=red>只能英文字母、数字和下划线</font>");
	jQuery.validator.addMethod("isIdCardNo", function (value, element) {
        return this.optional(element) || isIdCardNo(value);
    }, "<font color=red>请正确输入您的身份证号码</font>");
	 $("#form2").validate({
		 rules:{
			 fogetAccount:{
				 required:true,
				 stringCheck:true,
				 minlength:4,
				 maxlength:16,
			     remote: {
			    	 url: "/CBC/userRegionAction!checkUserAccount.htm?forgetType=1",
                     type:"post",
                     dataType: "json",
                     data: {
                    	 fogetAccount: function () {
                             return $("#fogetAccount").val();// 这个是取要验证的密码
                         }
                     }
                 }
			 },
			 fogetIdentityId :{
				 required:true,
				 isIdCardNo:true,
			     remote: {
			    	 url: "/CBC/userRegionAction!checkIdentityId.htm?forgetType=1",
                     type:"post",
                     dataType: "json",
                     data: {
                    	 fogetIdentityId: function () {
                             return $("#fogetIdentityId").val();// 这个是取要验证的密码
                         }
                     }
                 }
			 },
			  validateTelephoneCode:{
				 required:true,
				 digits:"只能输入数字",// digits只能输入整数
				 remote: {
			    	 url: "/CBC/userRegionAction!checkValidateCode.htm",
                     type:"post",
                     dataType: "json",
                     data: {
                    	 validateCode: function () {
                    	 	$("#validateCode").val($("#validateTelephoneCode").val());
                             return $("#validateTelephoneCode").val();// 这个是取要验证的密码
                         }
                     }
                 },
                 errorPlacement:function(error, element){
                	 //$("#getValidateCode").append(error.getm);
                	//error.appendTo(element.parent());
                 }
			 }
		 },
		 messages:{
			 fogetAccount:{
				 required:"<font color=red>必填</font>",
				 remote:"<font color=red>账户不存在</font>",
				 minlength:"<font color=red>长度必须大于4</font>",
				 maxlength:"<font color=red>长度不能大于16</font>"
			 },
			 fogetIdentityId:{
				 required:"<font color=red>必填</font>",
				 isIdCardNo : "<font color=red>请输入正确的身份证号码</font>",
				 remote:"<font color=red>身份证不存在</font>"
			 },
			 validateTelephoneCode:{
				 required:"<font color=red>必填</font>",
				 digits:"<font color=red>只能输入数字</font>",
				 remote:"<font color=red>验证码错误或者失效</font>"
			 }
		 }, 
		 onfocus: true,
         onkeyup: false// 这个地方要注意，修改去控制器验证的事件。
         
	 });
	 $("#form3").validate({
		 rules:{
		 	  newPassword:{
				    required:true,
				    minlength:6,
				    maxlength:16
				   },
			 newPassword2:{
				    required:true,
				    minlength:6,
				    maxlength:16,
				    equalTo:"#newPassword"
			}
		 },
		 messages:{
		 	 newPassword:{
				 required:"<font color=red>必填</font>",
				 minlength:"<font color=red>长度必须大于等于6</font>",
				 maxlength:"<font color=red>长度不能大于16</font>"
			 },
			 newPassword2:{
				 required:"<font color=red>必填</font>",
				 minlength:"<font color=red>长度必须大于6</font>",
				 maxlength:"<font color=red>长度不能大于16</font>",
				 equalTo:"<font color=red>两次输入密码不一致</font>"
			 }
		 }, 
		 onfocus: true,
         onkeyup: false// 这个地方要注意，修改去控制器验证的事件。
         
	 });
	 
	 
});


// 增加身份证验证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }

    if (intStrLen == 18) {
        // check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
            return false;
        }
    }
    else {        // length is 15
        // check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            return false;
        }
    }
    return true;
}
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false
    if (month < 1 || month > 12) return false
    return true
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}


// 获取电话号码向后台传递，调用发送验证码的方法
	function getTelephone(){	
		 var telephone = $("#telephone").val();
		 if(!(/^1[0-9]\d{9}$/.test(telephone))){
			 $("#showtecodemsg").text("电话号不合法");
			 return;
		 }
	 	    // 利用ajax向后台提交：电话号码，验证码
	 	   function dw() {
			}
			dw.ajax = function(s) {
				jQuery.ajax(s);
			}
			dw.ajax({
				type : "POST",
				 url: "/CBC/smsValidateRecAction!saveSmsValidate.htm?isView=y&&telephone="
		    		+telephone,
			
				success : function(msg) {
					$("#showtecodemsg").text(msg);
					//$("#showtecodemsg").append("&nbsp;&nbsp;<font  color='red'>"+msg+"</font>");
				}
			});
			onOff=1; // 把开关打开，函数变为可用
			Countdown(); // 调用Countdown函数
			
	}
	 
	// 倒计时函数,并把button设置为不可用
	var delayMins=60; // 全局时间变量（秒数）;与后台的delayMins要相同
	var onOff=0;// 为0时次函数不可用，为1时可用
	    function Countdown(){ // 计时函数
	        if(delayMins >0 && onOff==1){ // 如果不到零秒且onOff为1可用
	            --delayMins; // 时间变量自减1
	            $("#getValidateCode").html(parseInt(delayMins)+"s后重新获取"); // 写入秒数  没有显示
	            $("#getValidateCode").attr("disabled", true); // 按钮设置为不可用
	            setTimeout("Countdown()", 1000); // 设置1000毫秒以后执行一次本函数
	        };
	    };
	// 设置个监听， timerc归零时，把getValidateCode按钮上的：值恢复默认；再变为可用
		function listenerGetValidateCode(){
			// alert("listener");
			if(delayMins<=0){
				$("#getValidateCode").attr("disabled", false);
				$("#getValidateCode").html("获取验证码");
				onOff=0;// 关闭函数，禁用上面的方法
				delayMins=60;	
				$("#showtecodemsg").text("");
			}
			setTimeout("listenerGetValidateCode()", 500);		
		};
		listenerGetValidateCode();// 初始化时就加载此函数