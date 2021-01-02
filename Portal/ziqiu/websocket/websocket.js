/**
 * 
 */
function socket(userid){
	var websocket = null;
		
		//判断当前浏览器是否支持WebSocket
		if('WebSocket' in window){
		    websocket = new WebSocket("ws://"+window.document.domain+":"+window.location.port+"/CBC/websocket/"+userid);
		}
		else{
		    //alert('当前浏览器不支持websocket')
		}
		 
		//连接发生错误的回调方法
		websocket.onerror = function(){
		   // setMessageInnerHTML("error");
		};
		 
		//连接成功建立的回调方法
		websocket.onopen = function(event){
		  //  setMessageInnerHTML("open");
			//send(userid);
		}
		 
		//接收到消息的回调方法
		websocket.onmessage = function(event){
		    setMessageInnerHTML(event.data);
		}
		 
		//连接关闭的回调方法
		websocket.onclose = function(){
		  //  setMessageInnerHTML("close");
		}
		 
		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.onbeforeunload = function(){
		    websocket.close();
		}
		 
		//将消息显示在网页上
		function setMessageInnerHTML(innerHTML){
		   // document.getElementById('message').innerHTML += innerHTML + '<br/>';
			//console.log(innerHTML);
			
			layui.use('layer', function(){
				 var layer = layui.layer;
				 layer.open({
					 type: 1,
					 title:'<b style="font-size:16px;color:red;">系统消息</b>',
					 offset: 'rb',
					 anim: 5,
					 fixed:true,
					 resize:false,
					 area: ['300px', '200px'],
				     shadeClose: true, //点击遮罩关闭
				     shade:0,
				     zIndex:500,
				     time: 20000,//20秒自动关闭
				     move:false,//禁止拖拽
				     content: '\<\div style="padding:20px;font-size:16px;">'+innerHTML+'\<\/div>'
				 });
			}); 
		}
		 
		//关闭连接
		function closeWebSocket(){
		    websocket.close();
		}
		 
		//发送消息
		function send(currid){
		    //var message = document.getElementById('text').value;
			//var message = "======================链接会话========================";
		    websocket.send(currid);
		}
}