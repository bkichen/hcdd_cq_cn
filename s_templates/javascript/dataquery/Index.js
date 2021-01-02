$().ready(function () {
    GetNewsList();
    GetCourseList();
    GetMediaList();
    GetSpecialList();
    GetLinks();
});
//截取字符串
function Substrlengs(str, lengths) {
    if (str.length > lengths) {
        return str.substr(0, lengths) + "...";
    }
    else {
        return str;
    }
    // 返回 "Spain"。
}
function GetLinks() {//获取首页友情链接
    var tbody = "";

    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetLinks&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { document.getElementById("linklistid").innerHTML = "<li>加载中...</li>"; }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件

            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "<li>暂无数据</li>";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                $.each(productData, function (i, n) {
                    var trs = "";
                    trs += " <li><a href='" + n.LINKS_URL + "' target='_blank' title='" + n.LINKS_TITLE + "'>" + Substrlengs(n.LINKS_TITLE, 15) + "</a></li>";
                    tbody += trs;
                });
            }
            document.getElementById("linklistid").innerHTML = tbody;
        }
    });
}
function GetSpecialList() {//获取首页推荐专题
    var tbody = "";

    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetSpecialRecommend&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { document.getElementById("speciallistid").innerHTML = "<li>加载中...</li>"; }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件

            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "<li>暂无数据</li>";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                $.each(productData, function (i, n) {
                    var trs = "";
                    trs += "<li>";
                    trs += "<a href=\"/site/Special/SpecialDetail.aspx?id=" + n.SPECIAL_NUM + "\" target=\"_blank\" >";
                    trs += "<div class=\"picText2\">";
                    trs += "<img src=\"" + n.SpecialImage + "\" class=\"tu\" />";
                    trs += "<div class=\"infor\">";
                    trs += "<h2>" + n.SPECIAL_NAME + "</h2>";
                    trs += "</div>";
                    trs += "</div>";
                    trs += "</a>";
                    trs += "</li>";
                    tbody += trs;
                });
            }
            document.getElementById("speciallistid").innerHTML = tbody;
        }
    });
}
function GetMediaList() {//获取首页课程推荐
    var tbody = "";
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetRecommendMedia&pageSize=' + $("#pagesize").val() + '&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { document.getElementById("medialistid").innerHTML = "<li>加载中...</li>"; }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件
            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                var counti = 0;
                $.each(productData, function (i, n) {
                    var trs = "";
                    if ($("#pagesize").val() == "4") {
                        trs += "<li>";
                        trs += "<a href=\"/site/Media/MediaDetail.aspx?resid=" + n.MEDIA_ID + "\" target=\"_blank\" >";
                        trs += "<div class=\"picText2\">";
                        trs += "<img src=\"" + n.img + "\" class=\"tu\" />";
                        trs += "<div class=\"infor\">";
                        trs += "<h2>" + n.RESOURCE_NAME + "</h2>";
                        trs += "</div>";
                        trs += "</div>";
                        trs += "</a>";
                        trs += "</li>";
                    }
                    else {
                        if (i == 0) {
                            trs += "<li class=\"big\">";
                            trs += "<div class=\"picText2\"><a href=\"/site/Media/MediaDetail.aspx?resid=" + n.MEDIA_ID + "\" target=\"_blank\" ><img src=\"" + n.img + "\" class=\"tu\"></a>";
                            trs += "<div class=\"infor\">";
                            trs += "<h2><a href=\"/site/Media/MediaDetail.aspx?resid=" + n.MEDIA_ID + "\" target=\"_blank\" >" + n.RESOURCE_NAME + "</a></h2>";
                            trs += "<div class=\"detail\">" + Substrlengs(n.RESOURCE_DES,15) + "<a href=\"/site/Media/MediaDetail.aspx?resid=" + n.MEDIA_ID + "\" target=\"_blank\" >[详情]</a></div>";
                            trs += "</div>";
                            trs += "</div>";
                            trs += "</li>";

                        }
                        else {
                            trs += "<li>";
                            trs += "<div class=\"picText2\"><a href=\"/site/Media/MediaDetail.aspx?resid=" + n.MEDIA_ID + "\" target=\"_blank\"><img src=\"" + n.img + "\" class=\"tu\"><span class=\"text\"><em>" + n.RESOURCE_NAME + "</em></span></a></div>";
                            trs += "</li>";

                        }
                    }
                    tbody += trs;
                });
            }
            document.getElementById("medialistid").innerHTML = tbody;
        }
    });
}
function GetCourseList() {//获取首页课程推荐
    var tbody = "";
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetRecommendCourse&pageSize=' + $("#pagesize").val() + '&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { document.getElementById("courselistid").innerHTML = "<li>加载中...</li>"; }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件
            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                var counti = 0;
                $.each(productData, function (i, n) {
                    var trs = "";
                    if ($("#pagesize").val() == "4") {
                        trs += "<li>";
                        trs += "<a href=\"/site/Course/CourseDetail.aspx?resid=" + n.COURSE_NUM + "\" target=\"_blank\" >";
                        trs += "<div class=\"picText2\">";
                        trs += "<img src=\"" + n.img + "\" class=\"tu\" />";
                        trs += "<div class=\"infor\">";
                        trs += "<h2>" + n.COURSE_NAME + "</h2>";
                        trs += "</div>";
                        trs += "</div>";
                        trs += "</a>";
                        trs += "</li>";
                    }
                    else {
                        if (i == 0) {
                            trs += "<li class=\"big\">";
                            trs += "<div class=\"picText2\"><a href=\"/site/Course/CourseDetail.aspx?resid=" + n.COURSE_NUM + "\" target=\"_blank\" ><img src=\"" + n.img + "\" class=\"tu\"></a>";
                            trs += "<div class=\"infor\">";
                            trs += "<h2><a href=\"/site/Course/CourseDetail.aspx?resid=" + n.COURSE_NUM + "\" target=\"_blank\" >" + n.COURSE_NAME + "</a></h2>";
                            trs += "<div class=\"detail\">" + Substrlengs(n.COURSE_SYNO,15) + "<a href=\"/site/Course/CourseDetail.aspx?resid=" + n.COURSE_NUM + "\" target=\"_blank\" >[详情]</a></div>";
                            trs += "</div>";
                            trs += "</div>";
                            trs += "</li>";

                        }
                        else {
                            trs += "<li>";
                            trs += "<div class=\"picText2\"><a href=\"/site/Course/CourseDetail.aspx?resid=" + n.COURSE_NUM + "\" target=\"_blank\"><img src=\"" + n.img + "\" class=\"tu\"><span class=\"text\"><em>" + n.COURSE_NAME + "</em></span></a></div>";
                            trs += "</li>";

                        }
                    }
                    tbody += trs;
                });
            }
            document.getElementById("courselistid").innerHTML = tbody;
        }
    });
}
function GetNewsList() {//获取首页大轮播推荐
    var tbody = "";
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetNewsList&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { document.getElementById("newslistid").innerHTML = "<li>加载中...</li>"; }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件
            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                var counti = 0;
                $.each(productData, function (i, n) {
                    var trs = "";

                    trs += "<li><span class=\"t\">" + n.CREATEDATE + "</span><a href=\"/site/News/NewsDetail.aspx?id=" + n.NEWS_ID + "\" target=\"_blank\">" + n.NEWS_TITLE + " </a></li>";
                    tbody += trs;
                });
            }
            document.getElementById("newslistid").innerHTML = tbody;
        }
    });
}
function recommendnewslist() {//获取首页大轮播推荐
    var tbody = "";
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=recommendNewsList&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件
            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                var counti = 0;
                $.each(productData, function (i, n) {
                    var trs = "";

                    trs += "<li class=\"bg\" style=\"background-image: url(" + n.NOTICE_CONTENT + ")\"><a target=\"_blank\" href=\"" + n.RELEASE_ID + "\"></a></li>";
                    tbody += trs;
                });
            }
            document.getElementById("newsrecommendlist").innerHTML = tbody;
        }
    });
}
function GetResRecommendList() {//获取首页资讯轮播推荐
    var tbody = "";
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/s_dataservice/indexdataservice.aspx?action=GetResRecommendList&r=' + Math.random(), //目标地址
        data: "",
        beforeSend: function () { }, //发送数据之前
        complete: function () { }, //接收数据完毕
        success: function (json) {
            //将查询到的记录赋值给隐藏控件
            var couns = json.BaseCount[0].Count;
            //无数据不显示过犹不及
            if (couns == 0) {
                tbody += "";
            } //有数据时加载
            else {
                var productData = json.BaseData;
                var counti = 0;
                $.each(productData, function (i, n) {
                    var trs = "";
                    trs += "<li>";
                    trs += " <a href=\"/site/News/NewsDetail.aspx?id=" + n.NEWS_ID + "\" target=\"_blank\">";
                    trs += "<img src=\"/FrontEnd/Uploads/News/" + n.MAP_URL + "\" />";
                    trs += " <div class=\"text2\">";
                    trs += "<div class=\"c\">" + n.NEWS_TITLE + "</div>";
                    trs += "</div>";
                    trs += " </a>";
                    trs += "</li>";
                    tbody += trs;
                });
            }
            document.getElementById("renewslist").innerHTML = tbody;

        }
    });
}