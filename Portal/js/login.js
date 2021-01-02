$(function(){
	/*
	 * jQuery.validator.addMethod("isMobile", function(value, element) { var
	 * length = value.length; var mobile =
	 * /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/; return this.optional(element) ||
	 * (length == 11 && mobile.test(value)); }, "请正确填写您的手机号码");
	 */
	jQuery.validator.addMethod("stringCheck", function(value, element) { 
		return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
//		return 	validateUserAccount(value);
	   /* if(this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value)){
	    	return 	validateUserAccount(value);
	    }else{
	    	return false;
	    }  */  
	    
	 }, "<font color=red>只能包括中文字、英文字母、数字和下划线</font></br> ");
	
	jQuery.validator.addMethod("isIdCardNo", function (value, element) {
        return this.optional(element) || isIdCardNo(value);
    }, "请正确输入您的身份证号码 ");
	 $("#loginform").validate({
		 rules:{
			 userAccount:{
				 required:true
//			     remote: {
//			    	 url: "/CBC/userInfoAction!checkLoginUserAccount.htm",
//                     type:"post",
//                     dataType: "json",
//                     data: {
//                    	 userAccount: function () {
//                             return $("#loginUser").val();//这个是取要验证的密码
//                         }
//                     }
//                 }
			 },
			 password:{
				    required:true,
				    minlength:6
				   }
			 ,
			 validateCode:{
				    required:true,
				    minlength:4,
				    maxlength:4,
				    remote:{
				    	 url: "/CBC/smsValidateRecAction!getSecurityCode.htm",
	                     type:"post",
	                     dataType: "json",
	                     data: {
	                    	 validateCode: function () {
	                             return $("#validateCode").val();//这个是取要验证的密码
	                         }
	                     }
	                 }
				   }
		 },
		 messages:{
			 userAccount:{
				 required:"<font color=red>必填<font> "
//				 remote:"<font color=red>帐户不存在<font> "
			 },
			 password:{
				 required:"<font color=red>必填<font> ",
				 minlength:"<font color=red>长度必须大于6<font> "
			 },
			 validateCode:{
				 required:"<font color=red>必填<font> ",
				 minlength:"<font color=red>长度为4位<font> ",
				 maxlength:"<font color=red>长度为4位<font> ",
				 remote:"<font color=red>验证码错误<font> "
			 }
		 }, 
		 errorPlacement: function(error, element) {
			 error.insertAfter("#messageError");
		},
		 onfocus: true,
         onkeyup: false//这个地方要注意，修改去控制器验证的事件。
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

$(function(){//点击图片更换
	$("#validaImg").on("click", function(){
		$("#validaImg").attr("src","/CBC/smsValidateRecAction!getLoginValidateCode.htm?"+Math.random());//必须加Math.random(),不然地址一样不会刷新
	});
});