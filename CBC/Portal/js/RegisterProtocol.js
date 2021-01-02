$(function() {

	$("#form1").validate({
		/* 设置验证规则 */
		rules : {
			fruit : {// userAccount为文本框name
				required : true
			// 必填
			}
		},
		messages : {
			fruit:{
				required : '<font color=red>请阅读协议</font>'
			}
		}
	});

});

function clickCheckbox(){
	if($("#checkValue").attr("checked")){
		$("#submitButton").removeAttr("disabled");
	}else{
		$("#submitButton").attr({"disabled":"disabled"});
	}

}
