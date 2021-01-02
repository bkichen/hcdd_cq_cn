function validateExt(filename, m_strAllowedFilesList, isfolder)
{
    var index = filename.lastIndexOf("\\");
    var index1 = filename.lastIndexOf("/");

    if(index < index1)
        index = index1;

    var filevalue = filename.substr(index + 1);
    var dot = filevalue.lastIndexOf(".");
    var ext = filevalue.substr(dot);
    ext = ext.toLowerCase();

    if(m_strAllowedFilesList.indexOf(ext) == -1 && isfolder == "false")
    {
        alert("没有扩展名或扩展名必须为\"" + m_strAllowedFilesList + "\"中的一种!");
        return false;
    }

    return true;
}

function validateFileEntry(validString, field)
{
    var isCharValid = true;
    var inValidChar;

    if(field.length == 0 || field.value == '')
    {
        alert("必须提供一个名称。");
        field.focus();
        field.select();
        return false;
    }

    if(validString.indexOf("..") != -1)
    {
        alert("文件名或目录名称不能包含\"..\"串,请重新输入！");
        return false;
    }

    if(validString.lengh != 0 && (validString.lastIndexOf(".") == validString.length - 1))
    {
        alert("文件名或目录名不能以\".\"结尾！");
        return false;
    }

    for(i = 0; i < validString.length; i++)
    {
        if(validateCharacter(validString.charAt(i)) == false)
        {
            isCharValid = false;
            inValidChar = validString.charAt(i);
            i = validString.length;
        }
        else if(validString.charAt(0) == '_' || validString.charAt(0) == '-' || validString.charAt(0) == '.')
        {
            isCharValid = false;
            i = validString.length;
        }
    }

    if(i < 1)
    {
        return false;
    }

    if(isCharValid == false)
    {
        //if (inValidChar) { alert("名称非法, 不可包含字符 \"" + inValidChar + "\"。");	}
        //else             { alert("名称非法, 请重新输入。\r\n名称只能包含字母、数字、下划线和横线，并且不能以下划线和横线开始。"); }
        {
            alert("名称非法, 请重新输入。\r\n名称只能包含\"_\"、\"-\"、\".\"、字母和数字，并且不能以\"_\"、\"-\"和\".\"开始。");
        }

        if(field)
        {
            field.focus();
            field.select();
        }
        return false;
    }

    return true;
}

function validateCharacter(character)
{
    if((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || (character >= '0' && character <= '9') || (character == '-') || (character == '.') || (character == '_') || (character == '/') || (character == '\\'))
        return true;
    else
        return false;
}

//检测是否为中文名称
function ischinesename(str)
{
    if(str == null || str == '')
        return false;

    for(var i = 0; i < str.length; i++)
    {
        var charcode = str.charCodeAt(i);
        if(charcode >= 0xFF)
            return true;
    }

    return false;
}

function CheckUploadInput(field)
{
    if(field.value == "")
    {
        alert('必须提供一个名称。');
        field.focus();
        return false;
    }

    FName = field.value;

    if(navigator.appVersion.indexOf('Win') > 0)
    {
        FName = FName.substring(FName.lastIndexOf('\\') + 1, FName.length);
    }
    else
    {
        FName = FName.substring(FName.lastIndexOf('/') + 1, FName.length);
    }

    if((navigator.appVersion.lastIndexOf('Win')) != -1)
    {
        if((FName.indexOf('\\') >= 0) || (FName.indexOf('/') >= 0) || (FName.indexOf(':') >= 0) || (FName.indexOf('*') >= 0) || (FName.indexOf('?') >= 0) || (FName.indexOf('"') >= 0) || (FName.indexOf('<') >= 0) || (FName.indexOf('>') >= 0) || (FName.indexOf('|') >= 0))
        {
            alert('名称不能包含下列字符：\n \\, /, :, *, ?, \", <, >, |');
            field.focus();
            return false;
        };
    }
    else
    {
        if((FName.indexOf('\\') >= 0) || (FName.indexOf(':') >= 0) || (FName.indexOf('*') >= 0) || (FName.indexOf('?') >= 0) || (FName.indexOf('"') >= 0) || (FName.indexOf('<') >= 0) || (FName.indexOf('>') >= 0) || (FName.indexOf('|') >= 0))
        {
            alert('名称不能包含下列字符：\n \\, /, :, *, ?, \", <, >, |');
            field.focus();
            return false;
        }
    }

    MyStr = field.value;
    i = 0;

    while(MyStr.charAt(i) == ' ')
    {
        i++
    }

    if(i == MyStr.length)
    {
        alert('名称必须至少包括一个非空字符。');
        field.focus();
        return false;
    }

    return true;
}

//用于检查<input type=file>
function validateBrowseEntry(pathString, field)
{
    var isCharValid = true;
    var inValidChar;

    if(pathString.indexOf("..") != -1)
    {
        alert("文件名或目录名称不能包含\"..\"串,请重新输入！");
        return false;
    }

    if(pathString.length != 0 && (pathString.lastIndexOf(".") == pathString.length - 1))
    {
        alert("文件名或目录名不能以\".\"结尾！");
        return false;
    }

    if(field.length == 0 || field.value == '')
    {
        alert("必须提供一个名称。");
        field.focus();
        field.select();
        return false;
    }

    //取文件名
    if(navigator.appVersion.indexOf("Win") != -1)
    {
        seperator = "\\";
    }
    else
        seperator = "/";

    surffixDot = ".";
    validString = pathString;
    ixs = validString.lastIndexOf(seperator) + 1;

    if(ixs >= validString.length)
        ixs = 0;

    validString = validString.substring(ixs);

    //取文件名前缀
    //	ixe = validString.lastIndexOf(surffixDot);
    //	if(ixe < 0)
    //		ixe = validString.length;
    //	validString = validString.substring(0,ixe);
    for(i = 0; i < validString.length; i++)
    {
        if(validateCharacter(validString.charAt(i)) == false)
        {
            isCharValid = false;
            inValidChar = validString.charAt(i);
            i = validString.length;
        }
        else if(validString.charAt(0) == '_' || validString.charAt(0) == '-' || validString.charAt(0) == '.')
        {
            isCharValid = false;
            i = validString.length;
        }
    }

    if(i < 1)
    {
        return false;
    }

    if(isCharValid == false)
    {
        //if (inValidChar) { alert("名称非法, 不可包含字符 \"" + inValidChar + "\"。");	}
        //else             { alert("名称非法, 请重新输入。\r\n名称只能包含字母、数字、下划线和横线，并且不能以下划线和横线开始。"); }
        {
            alert("名称非法, 请重新输入。\r\n名称只能包含\"_\"、\"-\"、\".\"、字母和数字，并且不能以\"_\"、\"-\"和\".\"开始。");
        }

        if(field)
        {
            field.focus();
            field.select();
        }
        return false;
    }

    return true;
}

function validateTemplateCatalog(validString, field)
{
    var isCharValid = true;
    var inValidChar;

    if(field.length == 0 || field.value == '')
    {
        alert("必须提供一个名称。");
        field.focus();
        field.select();
        return false;
    }

    if(validString.indexOf("..") != -1)
    {
        alert("文件名或目录名称不能包含\"..\"串,请重新输入！");
        return false;
    }

    if(pathString.length != 0 && (validString.lastIndexOf(".") == validString.length - 1))
    {
        alert("文件名或目录名不能以\".\"结尾！");
        return false;
    }

    for(i = 0; i < validString.length; i++)
    {
        if(validateCharacter(validString.charAt(i)) == false)
        {
            isCharValid = false;
            inValidChar = validString.charAt(i);
            i = validString.length;
        }
        else if(validString.charAt(0) == '_' || validString.charAt(0) == '-' || validString.charAt(i) == '.')
        {
            isCharValid = false;
            i = validString.length;
        }
    }

    if(i < 1)
    {
        return false;
    }

    if(isCharValid == false)
    {
        {
            alert("名称非法, 请重新输入。\r\n名称只能包含\"_\"、\"-\"、字母和数字，并且不能以\"_\"、\"-\"开始。");
        }

        if(field)
        {
            field.focus();
            field.select();
        }
        return false;
    }

    return true;
}