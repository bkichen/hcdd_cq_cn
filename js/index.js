window.onload = function(){
	var oNav = document.getElementById('nav');
	var oNavImg = document.getElementById('nav-img-id');
	var aNavImgLi = oNavImg.getElementsByTagName('li');
	var oNavSec = oNav.children[1];
	var aNavSecDiv = oNavSec.children;
	var oBanner = document.getElementById('banner');
	var oBimg = getElemntsByClassName(oBanner,'banner-img')[0];
	var oBicon = getElemntsByClassName(oBanner,'banner-icon')[0];
	var aImgLi = oBimg.getElementsByTagName('li');
	var aIconLi = oBicon.getElementsByTagName('li');
	var oVideoList = document.getElementById('video-list');
	var aVideoListLi = oVideoList.getElementsByTagName('li');
	var oVideoShadow = document.getElementById('video-shadow');
	var oVideoShut = document.getElementById('video-shut');
	var oVideoArea = document.getElementById('video-area');

	var icon = 0;
	var timer = null;

/******* banner ********/
	for(var i = 0;i<aIconLi.length;i++){
		aIconLi[i].index = i;
		aIconLi[i].onclick = function(){
			for(var j = 0;j<aIconLi.length;j++){
				aIconLi[j].className = ' ';
			   
			}
			icon = this.index;
			startMove(oBimg,'left',- icon * aImgLi[0].offsetWidth);
			this.className = 'banner-icon-select';
		}
	}

	timer = setInterval(tap,3000);

	function tap(){
		if(icon < aIconLi.length-1){
			icon ++
		}else {
			icon = 0;
		}
		for(var j = 0;j<aIconLi.length;j++){
				aIconLi[j].className = ' ';
			   
			}
			startMove(oBimg,'left',- icon * aImgLi[0].offsetWidth);
			aIconLi[icon].className = 'banner-icon-select';
	}
	oBimg.onmouseover = function(){
		clearInterval(timer);
	}
	oBimg.onmouseout = function(){
		timer = setInterval(tap,3000);
	}

/************** 导航 **************/
	for(var i = 0;i<aNavImgLi.length;i ++){
		aNavImgLi[i].style.left = i*170 -20 + 'px';
		if(i>0){
			aNavImgLi[i].getElementsByTagName('img')[0].style.paddingTop = 13+ 'px';
		}
	}

	var src = { 
		img1:['img/link2_1.png','img/data.png','img/serve.png'],
		img2:['img/link.png','img/data2.png','img/serve2.png']
		}

	for(var i =0;i<aNavSecDiv.length;i++){
		var current = 0;
		aNavImgLi[i].index = i;
		aNavImgLi[i].onclick = function(){

			if( current == i){
				return false;
			}

			for(var j = 0;j<aNavSecDiv.length;j++){
				aNavImgLi[j].className =" ";
				aNavImgLi[j].getElementsByTagName('img')[0].src=src.img1[j];
				aNavSecDiv[j].style.display = "none";
			}
			current = this.index;
			this.getElementsByTagName('img')[0].src=src.img2[current];
			this.className = "Nav-img-select";
			aNavSecDiv[current].style.display = "block";
		}
	}

/**  video **/
/*for(var i = 0;i<aVideoListLi.length;i++){
	aVideoListLi[i].onclick = function(){
		oVideoShadow.style.display = "block";
	}
	oVideoArea.innerHTML = '<embed src="http://www.tudou.com/v/Bs_lZPxcoRs/&rpid=818231113&autoPlay=true&resourceId=818231113_04_05_99/v.swf" allowFullScreen="true" quality="high" width="700" height="400" align="middle" allowScriptAccess="always" flashvars ="isAutoPlay=true" type="application/x-shockwave-flash"></embed>';

}

oVideoShut.onclick = function(){
	oVideoShadow.style.display = "none";
}
*/

}




function getElemntsByClassName(parent,Name){
	var arr = new Array();
	if(!document.getElemntsByClassName){
		var all = parent.getElementsByTagName('*');
		for(var i = 0;i<all.length;i++){
			var classList = all[i].className.split(' ');
			for(var j = 0;j<classList.length;j++){
				if(classList[j] == Name){
					arr.push(all[i]);
				}
			}
		}

	}else {
		arr = parent.getElemntsByClassName('name');
	}
	return arr;
}

