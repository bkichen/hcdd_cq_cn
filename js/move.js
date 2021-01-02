
	function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
	function startMove(obj,attr,iTarget){
		var timer = null;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var iCurrent = 0;
			if(attr == 'opacity'){
				iCurrent = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCurrent = parseInt(getStyle(obj,attr));
			}
			
			var iSpeed = (iTarget - iCurrent)/8;
			
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			if(iCurrent == iTarget ){
				clearInterval(obj.timer);
			}else{
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity:' + (iCurrent + iSpeed) + ';)';
					obj.style.opacity = (iCurrent + iSpeed)/100;
				}else{
					obj.style[attr] = iCurrent + iSpeed + 'px';
				}
			}
		},30)
	}