/**
 * forgetPassword javascript to write by zQ
 */
$(function(){
	$("ul.nav.nav-pills li").click(function() {
		$(this).siblings('li').removeClass('active');// 删除其他兄弟元素的样式
		$(this).addClass('active'); // 添加当前元素的样式
		var formid=$(this).attr("data-fname");
		if(formid=="formsecurity"){
			$("#tablesecurity2").hide();
			$("#tablesecurity1").show();
		}
		$("#"+formid).show();
		$(this).siblings('li').each(function(){
			$(".error").each(function(){
				$(this).children().remove();//remove error msg
			});
			var hideformid=$(this).attr("data-fname");
			$("#"+hideformid).hide();
			//$("#"+hideformid).children("table tbody tr td").find("label").remove();
			$("#"+hideformid)[0].reset();
		});
		
	})
	 $("#formemail").validate({
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
                             return $("#fogetAccountemail").val();// 这个是取要验证的密码
                         }
                     }
                 }
			 },
			 email :{
				 required:true,
				 email:true,
			     remote: {
			    	 url: "/CBC/unfreezeLoginAction!checkUserEmail.htm?forgetType=1",
                     type:"post",
                     dataType: "json",
                     data: {
                    	 email: function () {
                             return $("#email").val();// 这个是取要验证的密码
                         }
                     }
                 }
			 }
		 },
		 messages:{
			 fogetAccount:{
				 required:"<font color=red>必填</font>",
				 remote:"<font color=red>账户不存在</font>",
				 minlength:"<font color=red>长度必须大于4</font>",
				 maxlength:"<font color=red>长度不能大于16</font>"
			 },email:{
				 required:"<font color=red>必填</font>",
				 email : "<font color=red>请输入正确的邮箱</font>",
				 remote:"<font color=red>邮箱错误或不存在</font>"
			 }
		 }, 
		 onfocus: true,
         onkeyup: false// 这个地方要注意，修改去控制器验证的事件。
         
	 });
	
	$("#formsecurity").validate({
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
                            return $("#fogetAccountsecurity").val();// 这个是取要验证的密码
                        }
                    }
                }
			 },
			 answer1 :{
				 required:true,
				 minlength:2,
				 maxlength:32
			 },
			 answer2 :{
				 required:true,
				 minlength:2,
				 maxlength:32
			 },
			 answer3 :{
				 required:true,
				 minlength:2,
				 maxlength:32
			 }
			 
		 },
		 messages:{
			 fogetAccount:{
				 required:"<font color=red>必填</font>",
				 remote:"<font color=red>账户不存在</font>",
				 minlength:"<font color=red>长度必须大于4</font>",
				 maxlength:"<font color=red>长度不能大于16</font>"
			 },
			 answer1:{
				 required:"<font color=red>必填</font>",
				 minlength:"<font color=red>长度必须大于等于2</font>",
				 maxlength:"<font color=red>长度不能大于32</font>"
			 },
			 answer2:{
				 required:"<font color=red>必填</font>",
				 minlength:"<font color=red>长度必须大于等于2</font>",
				 maxlength:"<font color=red>长度不能大于32</font>"
			 },
			 answer3:{
				 required:"<font color=red>必填</font>",
				 minlength:"<font color=red>长度必须大于等于2</font>",
				 maxlength:"<font color=red>长度不能大于32</font>"
			 }
		 }, 
		onfocus: true,
        onkeyup: false// 这个地方要注意，修改去控制器验证的事件。
	 });
	//获取密保信息
	$("#getSecurityInfo").click(function() {
		//console.log("youzhi?");
		var fogetAccount=$("#fogetAccountsecurity").val();
		if(fogetAccount!=null && (fogetAccount.trim()).length>0 ){
			if(fogetAccount.length >= 4){
				$.ajax({
					type : 'post',
					url : '/CBC/unfreezeLoginAction!getUserSecurityInfo.htm?forgetType=1',
					dataType : 'json',
					data : {
						fogetAccount : fogetAccount
					},
					success : function(data) {
						if (data.success) {
							console.log(data.body)
							$("#answer1").parent().parent().prev().find("td:last").html(data.body.securityquestion.question1);
							$("#answer2").parent().parent().prev().find("td:last").html(data.body.securityquestion.question2);
							$("#answer3").parent().parent().prev().find("td:last").html(data.body.securityquestion.question3);
							$("#securityfogetIdentityId").val(data.body.fogetIdentityId);
							$("#tablesecurity1").hide();
							$("#tablesecurity2").show();
						} else {
							$("#fogetAccountsecurity").after("<label for=\"fogetAccountsecurity\" class=\"error\"><font color=\"red\">"+data.msg+"</font></label>");
						}
					}
				});
				
			}
		}else{
			$("#fogetAccountsecurity").after("<label for=\"fogetAccountsecurity\" class=\"error\"><font color=\"red\">必填</font></label>");
		}
	});
	
	//提交邮箱
	$("#emailButton").click(function(){
		var formemailvalidat=$("#formemail").validate();
		if(formemailvalidat.form()){
			$.ajax({
			 	type : 'post',
				url : '/CBC/unfreezeLoginAction!userEmailRightForSendEmail.htm?forgetType=1',
				dataType : 'json',
				data :$("#formemail").serialize(),
				success : function(data) {
					if (data.success) {
						layer.alert("邮件已发送！请移步邮箱查看...",{icon:1},function(index){
							layer.close(index);
							setTimeout("document.location.href='/CBC/index.htm'",500);
						});
					} else {
						layer.alert(data.msg+"请重新来过...",{icon:5},function(index){
							layer.close(index);
							setTimeout("location.reload();",500);
						});
					}
				} 
			 });
		 }
	});
});

