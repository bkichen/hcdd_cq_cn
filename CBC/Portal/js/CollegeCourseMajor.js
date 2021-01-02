

//关闭查看弹窗
$(function(){
	$(".cy_yhqsbigbg").click(function(){
		$(".cy_yhqshidebox").hide();
		$(".cy_yhqsbigbg").hide();
	})
});
	

function closediv(){
	$(".cy_yhqshidebox").hide();
	$(".cy_yhqsbigbg").hide();
}

function jQueryEasyUi() {
}

jQueryEasyUi.ajax = function(s) {
	jQuery.ajax(s);
}

//课程对应证书
function courseToCertificate(value){
		var unitName = value.split(',');
		var collegeCourseName=unitName[0];
		var collegeCourseCode=unitName[1];
		collegeCourseName = collegeCourseName+" ";
		collegeCourseCode = collegeCourseCode+"";
		jQueryEasyUi.ajax({
			type : "POST",
			url: "/CBC/collegeCourseMajorAction!findCertificate.action?isView=y&collegeCourseName="+ encodeURI(encodeURI(collegeCourseName))+"&collegeCourseCode="+encodeURI(encodeURI(collegeCourseCode)),
			contentType: "charset=UTF-8",
			success : function(data) {
				$("#cy_yhqshidebox").html(
						"<div class='cy_zhenshuxinxi'><span class='close' onclick='closediv()'><img src='Portal/portalImages/off.jpg'/></span>"+
			        		"<h1>课程信息</h1>"+
			    			"<a><span>课程代码：</span>"+collegeCourseCode+"</a><a><span>课程名称：</span>"+collegeCourseName+"</a>"+
			        	"</div>"
				 ); 
				 $("#cy_yhqshidebox").append(data);
		     	 $("#cy_yhqshidebox").css({top:($(window).height() - 600) * 0.5+$(document).scrollTop(),left:($(window).width() - 750) * 0.5});
		         $("#cy_yhqshidebox").show();
		 		 $("#cy_yhqsbigbg").show();
			}
});
}


/*	function search() {
		var disName = $('#resultNameType').val();
		var collegeName = $('#resultName').val();
		if(collegeName==""&&disName==""){
			location.reload(true);
		}else{
			function dw() {
			}
			dw.ajax = function(s) {
				jQuery.ajax(s);
			}
			dw.ajax({
					type : "POST",
					url : "/CBC/login!collegeCourseMajor.htm?disName="+disName+"&collegeName="+collegeName,
					beforeSend : function() {
						
					},
					success : function(datas) {
					}
				});
			}
	}*/

	/*//课程对应证书
	function courseToCertificate(value){
		var unitName = value.split(',');
		var collegeCourseName=unitName[0];
		var collegeCourseCode=unitName[1];
		//window.open ("/CBC/collegeCourseMajorAction!findCertificate.action?isView=y&collegeCourseName="+ collegeCourseName+"&collegeCourseCode="+collegeCourseCode, "newwindow", "height=450, width=650, top="+($(window).height() - 300) * 0.5+",left="+($(window).width() - 650) * 0.5+",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no")
		$.getJSON("/CBC/collegeCourseMajorAction!findCertificate.action?isView=y&collegeCourseName="+ collegeCourseName+"&collegeCourseCode="+collegeCourseCode, function(data) {
			 $("#collegeCourseMajorInfo").html("<br/><div style='text-align:left;'><div style='color: #0A6DC0;padding-left:15px;height:35px;line-height:35px;font-size:18px;'>课程信息</div><hr style='width: 95%;margin:0 auto;color: #EEF4F9;size:2px;'/><div style='padding-left:15px;height:10px;margin-top:10px;'><span style='display:block;float: left;width:70px;height:20px;background-color:#D4D0C8;text-align:center;color:#666666'>课程代码:</span><span style='display:block;float: left;font-weight: bold;height:20px;'>&nbsp;&nbsp;"+collegeCourseCode+"</span><span style='margin-left:10px;display:block;float: left;width:70px;height:20px;background-color:#D4D0C8;text-align:center;color:#666666'>课程名称:</span><span style='display:block;float: left;font-weight: bold;height:20px;'>&nbsp;&nbsp;"+collegeCourseName+"</span></div><br/><hr style='clear:both;width: 95%;margin:0 auto;border:1px dotted #CCCCCC;'/></div><br/>" );
					 $.each(data.rows, function(i, item) {
				            $("#collegeCourseMajorInfo").append(
				            		 "<table style='width:200px;text-align:left;margin-left:10px;margin-top:5px'>" +
			 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center;color:#666666'>证书名称:</td><td style='width:120px;color: #0A6DC0;'>&nbsp;&nbsp;"+item.certificateName+"</td></tr>"+
			 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center;color:#666666'>发证机构:</td><td style='font-weight: bold;'>&nbsp;&nbsp;"+item.awardOrgName+"</td></tr>"+
									 "</table>");
				        });
				        });
		 
               $("#collegeCourseMajorInfo").css({top:($(window).height() - 500) * 0.5+$(document).scrollTop(),left:($(window).width() - 500) * 0.5});
		        $("#collegeCourseMajorInfo").show();
		        $(".collegeCourseMajorInfoHide").show();
		        
			$('#course_certificate').show();
			$('#course_certificate').window({
				title: '课程对应证书',
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
							url : '/CBC/ddcbc/collegeCourseMajorAction!findCourse.action?isView=y',
							data : "collegeCourseName=" + collegeCourseName+"&collegeCourseCode="+collegeCourseCode,
							dataType:"json", 
							beforeSend : function() {
							},
							success : function(datas) {
						
								$("#course_certificate").html("<br/><div style='padding-left:2px;font-size:15px;height:20px;'><span style='display:block;float: left;width:80px;height:20px;background-color:#D4D0C8;text-align:center'>课程代码</span>&nbsp;<span style='display:block;float: left;width:120px;height:20px;'>&nbsp;&nbsp;"+collegeCourseCode+"</span><span style='display:block;float: left;width:80px;height:20px;background-color:#D4D0C8;text-align:center'>课程名称:</span><span style='display:block;float: left;width:150px;height:20px;'>&nbsp;&nbsp;"+collegeCourseName+"</span></div><br/><hr/>");
				 			    $(datas.rows).each(function(i){
			 					$("#course_certificate").append(
			 						 "<table style='width:480px;margin:5px 0;'>" +
				 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>证书名称:</td><td style='color: #0A6DC0;'>&nbsp;&nbsp;"+datas.rows[i].certificateName+"</td>"+
				 						 "<tr style='font-size:15px;height:20px;'><td style='width:80px;background-color:#D4D0C8;text-align:center'>发证机构:</td><td style='color: #0A6DC0;'>&nbsp;&nbsp;"+datas.rows[i].awardOrgName+"</td></tr>"+
		 							 "</table>"
		 						);
			 			    });
						}	
					});
			
				
			}*/
	
