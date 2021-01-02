var oListNav = document.getElementById('listNav');
var aListNavLi = oListNav.getElementsByTagName('li');
for(var i = 0;i<aListNavLi.length;i++){
	aListNavLi[i].onclick = function(){
		for(var j = 0;j<aListNavLi.length;j++){
			aListNavLi[j].className = " ";
		}
		this.className = "asideSec";
	}
}