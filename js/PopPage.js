// JScript File
function PopPage(name,subject,body,width,height,mediatype,id)
{
var strUrl=""
    if("Html"==mediatype)
    {   
        strUrl = "../../LinkHtml/PopPage/"+body;
    }
    else
    {
        //strUrl ="../../PopPage.aspx?Subject=" + escape(subject) + "&body=" + escape(body);
        strUrl = "../../PopPage.aspx?PopId="+id;
    }
    var strPopInfo = "dialogHeight: " + height + "px; dialogWidth: " + width + "px; dialogTop: 200px; "+
                    "dialogLeft: 100px;edge: Raised; center: Yes; help: Yes; resizable: Yes; status: Yes;"
   
   window.showModalDialog(strUrl,"newwin",strPopInfo); 
}

function IndexPopPageHtml(name,subject,body,width,height,mediatype,left,Top)
{

var strUrl=""
   // if("Html"==mediatype)
    //{   
        strUrl = "LinkHtml/PopPage/"+body;
   /* }
    else
    {
        strUrl ="PopPage.aspx?Subject=" + escape(subject) + "&body=" + escape(body);
    }*/
    var strPopInfo = "height=" + height + "px, width=" + width + "px, scrollbars=yes,top="+Top+",left="+left;
    
                  
    window.open(strUrl,name,strPopInfo); 
}

function IndexPopPageText(name,id,width,height,mediatype,left,Top)
{

var strUrl=""

        strUrl ="PopPage.aspx?PopId="+id;

    var strPopInfo = "height=" + height + "px, width=" + width + "px, scrollbars=yes,top="+Top+",left="+left;
                    
    window.open(strUrl,name,strPopInfo); 
    
}