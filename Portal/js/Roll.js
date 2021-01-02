$(function() {
	var text;
	var timerID;
	setTimeout("newtext("+text+","+timerID+")", 800);
});
var count=0;
function newtext(text,timerID) {
	if(count==26){
		count=0;
	}
	text=document.title;
    clearTimeout(timerID);
    if(count==0){
    document.title=text.substring(1,text.length)+" "+text.substring(0,1);	
    }else{
    document.title=text.substring(1,text.length)+text.substring(0,1);
    }
    text=document.title.substring(0,text.length);
    count++;
    timerID = setTimeout("newtext()", 800);
}