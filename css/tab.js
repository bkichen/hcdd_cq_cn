// JScript 文件

function tabit(btn){
	var idname = new String(btn.id);
	var s = idname.indexOf("_");
	var e = idname.lastIndexOf("_")+1;
	var tabName = idname.substr(0, s);
	var id = parseInt(idname.substr(e, 1));
	var tabNumber = btn.parentNode.childNodes.length;
	for(i=0;i<tabNumber;i++){
		if(i==id){
			document.getElementById(tabName+"_div_"+id).style.display = "block";
		    btn.className = "curr";
		}else{
		document.getElementById(tabName+"_div_"+i).style.display = "none";
		document.getElementById(tabName+"_btn_"+i).className = ""};
	}};
	