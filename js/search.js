/// <reference path="../jquery/jquery-1.4.1.min.js" />

$(function () {



    //分辨率低于1366X768
    if (screen.height <= 768) {
        $(".header .logo").css("margin", "30px 0 0 0");
        $(".search .list_box .list").css("padding", "20px 0 0 30px");
        $(".right_nav").css("top", 0);

    }

    $(".nav>a:gt(0)").live("mouseenter", function () {
        var _index = $(this).index() - $(this).index() / 2;
        var total = $(".nav>a").length - 1; //栏目数量
        var _width = $(this).width();
        var _left = 902;
        var _length = 0;
        for (var i = _index; i < total; i++) {
            _length += $(".nav>a").eq(i).width() + 22;
        }
        $(".downlist>.one").hide();
        if ($(".downlist>.one").eq(_index - 1).children("a").length > 0) {
            $(".downlist>.one").eq(_index - 1).show();
        }
        $(".downlist").css("left", _left - _length + "px");

        //----------------重要通知----------------//
        if ($(this).attr("guid") == zytzId) {
            $(".downlist>.one").hide();
            if ($.cookie('landing') == null) {
                $(this).attr("title", "请点击此处，登陆！")
            } else {
                var hrefs = href.substring(href.indexOf('?') + 1).split('&');
                var MyTypeId = hrefs[0].substring(7);
                var MyGuids = "";
                $.ajax({
                    type: "POST",
                    url: "ArticleClass.axd",
                    data: {
                        type: "GetArticleListNetPage",
                        Currpage: 1,
                        PageSize: 10000,
                        TypeId: MyTypeId,
                        SearchContent: ""
                    },
                    dataType: "xml",
                    async: false,
                    success: function (data) {
                        $(data).find("row").find("C_ArticleGuid").each(function () {
                            MyGuids += $(this).text() + ",";
                        })
                    }
                })
                MyGuids = MyGuids.substring(0, MyGuids.length - 1);
                if ($.cookie('ArticleNo') == null) {
                    $(this).attr("title", "您有" + MyGuids.split(',').length + "条新通知。")
                } else {
                    var ArticleNo = $.cookie('ArticleNo').split(',');
                    var MyNo = 0;
                    for (var i = 0; i < ArticleNo.length; i++) {
                        if (MyGuids.indexOf(ArticleNo[i]) > -1)
                            MyNo++;
                    }
                    $(this).attr("title", "您有" + (MyGuids.split(',').length - MyNo) + "条新通知。")
                }
            }
        }


        //---------------------------------------//

    })
    $(".downlist").live("mouseleave", function () {
        $(this).children(".one").hide();
    })
    $(".nav>a:eq(0)").live("mouseenter", function () {
        $(".downlist").children(".one").hide();
    });
    var has_month = true;
    $("body").ajaxStop(function () {
        if (has_month) {
            has_month = false;
            var $chind = $("#NewListA li").eq(0).children("a")
            var d = new Date();
            var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate().length < 2 ? "0" + d.getDate().toString() : d.getDate());
            var date1 = $chind.attr("ymd");
            var bijiao = daysBetween(date, date1);
            if (bijiao < 31) {
                $chind.html($chind.attr("con"));
                $("#NewListA .font li:gt(0)").hide();
            }
        }
        has_month = false;
    });

    function daysBetween(DateOne, DateTwo) {
        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
        return Math.abs(cha);
    }



    //    //百链
    function BaiLianSearch() {
        //        var _type = $(".kuang .author>span").attr("val");
        //        var _searchType = $(".kuang .author>span").attr("valtwo");
        //        var sw = $(".btnSearch").val();
        //        var URL = "http://" + _type + ".blyun.com/" + _searchType;
        //        var parameter = "?Field=all&channel=" + _searchType;
        //        var searchText = "";
        //        $.ajax({
        //            type: "POST",
        //            url: "CommonFunction.axd",
        //            data: {
        //                type: "GetUTF8",
        //                value: sw
        //            },
        //            dataType: "text",
        //            async: false,
        //            success: function (data) {
        //                searchText = data;
        //            }
        //        });
        //        var _last = "&ecode=utf-8&edtype=&searchtype=&view=0";
        //        parameter += "&sw=" + searchText + _last;
        //        alert(URL + "" + parameter);
        //        window.open(URL + parameter);
    }
    //    //馆藏书目
    function GuanCangSearch() {
        //        var URL = "http://www.zhizhen.com/s";
        //        var sw = $(".btnSearch").val();
        //        var parameter = "?sw=" + sw + "&size=15&isort=0&x=0_185";
        //        window.open(URL + parameter);
    }


    //-------------------检索-------------------//
    //检索大导航点击事件
    Search();
    //首次加载
    SearchContent(NavigationIndex);
    //检索文本框聚焦失焦事件
    $("#searchContent").live("focus", function () {
        var test = $(this).val();
        if ($.trim(test) == "请输入关键字" || $.trim(test) == "请输入中文关键字" || $.trim(test) == "请输入英文关键字") {
            $(this).attr("rel", test).val("");
        }
    }).live("blur", function () {
        var test = $(this).val();
        if ($.trim(test) == "") {
            $(this).val($(this).attr("rel"));
        }
    })
    //隐藏检索条件
    $("body").live("click", function () {
        $(".author>.author_down").hide();
    })
    //防冒泡  显示检索条件
    $(".author>span").click(function (event) {
        event.stopPropagation();
        var aLength = $(this).next().find("a").length;
        if (aLength > 6)
            $(".author>.author_down").css("top", "-" + (aLength - 6) * 38 + "px");
        var MyName = $(this).text();
        $(".author>.author_down>a").each(function () {
            $(this).removeClass();
            if ($(this).text() == MyName)
                $(this).addClass("e1");
        })
        $(".author>.author_down").show();
    })
    //在检索条件中选取检索条件
    $(".author>.author_down>a").live("click", function () {
        $(this).parent().prev().attr({"val": $(this).attr("val"),"valtwo": $(this).attr("valtwo")});
        $(this).parent().prev().text($(this).text());
        $(".author>.author_down").hide();
    })
    //回车事件
    $("#searchContent").keypress(function (event) {
        if (event.keyCode == 13) {
            $("#SearchButton").click();
        }
    })
    //检索按钮
    $("#SearchButton").click(function () {
        var sw = $("#searchContent").val();
        $("#searchContent").val('');
        switch (NavigationIndex) {
            case 0: //馆藏查询
                var _type = $(".kuang .author>span").attr("val");
                //var _searchType = $(".kuang .author>span").attr("valtwo");
                if (_type=="all") {
                    $("input[value='all']").attr("checked",true);
                }else if(_type=="title"){
                   $("input[value='title']").attr("checked",true);
                }else if(_type=="creatorSearch"){
                     $("input[value='creatorSearch']").attr("checked",true);
                }else if(_type=="publisher"){
                    $("input[value='publisher']").attr("checked",true);
                }else if(_type=="isbnSearch"){
                     $("input[value='isbnSearch']").attr("checked",true);
                }else if(_type=="callNumberSearch"){
                    $("input[value='callNumberSearch']").attr("checked",true);
                }
                $("input.search-text").val(sw);
                 $("#formGcAll").submit();
               /* var URL = 'http://10.2.15.85/gdweb/';
                var text = "";
                $.ajax({
                    type: "POST",
                    url: "CommonFunction.axd",
                    data: {
                        type: "GetUTF8",
                        value: sw
                    },
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        text = data;
                    }
                });
                
                window.open(URL);*/
                break;

            case 1: //CNKI
               var name = $(".author>span").attr("val");
                        var URL = 'http://scholar.cnki.net/result.aspx?q=';
                        
                        var parameter = sw + '&rt=' + name +'&rl=&udb=';
                 
                        window.open(URL + parameter);
                        break;  
                        
       
            default: break;
        }
    })


    //ThreeNavigationBing();
    //----------------------------------------//


    BannerDown();

})

// 检索大导航的当前下标
var NavigationIndex = 0;
//二级导航的当前下标
var aIndex = 0;
//三级导航的当前下标
var ThreeIndex = 0;
//检索所需要的字段
var SearchArray = {
    //学术资源
    LearningName: ['国内检索(读秀)', '国外检索(百链)', '三大检索', '人大复印', 'CNKI', 'EBSCO', '...'],
    LearningUrl: ['javascript://', 'javascript://', 'javascript://', 'javascript://', 'http://cnki.net/', 'http://search.ebscohost.com', '/ShangYeYd_Library/ResourcesList.html?TypeId=dd9ce2a9-456b-4ddf-b83c-d5baf3424fb2&ChannelGuid=e6d06f07-8941-47da-a413-0dd2d66626e2'],
    //读秀检索                                            //EI                                    SCI CPIC
    DuxiuName: ['图书', '期刊', '报纸', '学位论文', '会议论文', '文档', '电子书'],
    DuxiuVal: ['book', 'jour', 'newspaper', 'jour', 'jour', 'book', 'book'],
    DuxiuValTwo: ['search', 'searchJour', 'searchNP', 'searchThesis', 'searchThesis', 'searchDoc', 'searchEBook'],
    //百链检索
    BailianName: ["全部", "报纸", "图书", "期刊", "专利", "标准", "视频", "学位论文", "会议论文", "信息咨询"],
    BailianVal: ["book", "newspaper", "book", "jour", "book", "book", "book", "jour", "jour", "book"],
    BailianValTwo: ["searchMix", "searchNP", "search", "searchJour", "searchPatent", "searchStd", "searchVideo", "searchThesis", "searchCP", "searchInfo"],
    //三大检索
    ThridyName: ['SCI', 'EI', 'CPCI'],
    ThridUrl: ['javascript://', 'javascript://', 'javascript://'],
    //人大复印
    RendaName: ["标题", "副标题", "作者", "作者简介", "关键字", "正文", "摘要", "参考文献", "原文出处", "分类名称", "分类号"],
    RendaVal: ["1", "19", "2", "15", "3", "4", "5", "23", "6", "7", "22"],
   //超星发现
    KnowledgeName: ["全部", "报纸", "图书", "期刊", "专利", "标准", "音视频", "学位论文", "会议论文"],
    KnowledgeVal: [" ", "13", "11,12", "1,2", "10,19", "6,15", "8", "3,5", "4,7"],
    KnowledgeValTwo: [" ", "13", "11,12", "1,2", "10,19", "6,15", "8", "3,5", "4,7"],
    //calis
    CalisName: ["全部","纸本资源","电子资源",'不显示报纸文章'],
    CalisVal: [" ","&st=range&f_jl=holding","&st=range&f_jl=ebook",'&st=range&f_jl=exnewspaper'],
    //书目查询
    BibliographyName: [],
    //书目查询检索选项
    BibliographyOption: [ '全部','题名', '责任者', '出版者', '标准编码', '索书号'],
    BibliographyVal: [ 'all','title', 'creatorSearch', 'publisher', 'isbnSearch', 'callNumberSearch'],
    //知网 CNKI
    CNKIName:['全部文献','期刊','学位论文','会议','报纸','专利','标准','年鉴','图书','科研项目'],
    CNKIVal:['All','Journal','Thesis','Conference','Newspaper','Patent','Standard','Yearbook','Book','http://projects.cnki.net/']
};

//检索大导航点击事件
function Search() {
    $(".list_box>.list>a").click(function () {
        if ($(this).index() == 0) { $("#searchContent").val($("#searchContent").attr("v1")); }
        else { $("#searchContent").val($("#searchContent").attr("v3")); }
        $(".down1").hide();
        $(".list_box>.list>a").removeClass();
        $(this).addClass("e");
        NavigationIndex = $(this).index();
        if (NavigationIndex != 0)
            NavigationIndex = NavigationIndex / 2;
        SearchContent(NavigationIndex);
    })


}
function SearchContent(index) {
    var HTML = ""; var sssss = ""; var sssss2 = ""; $(".sssss").remove(); $(".sssss2").remove();
    switch (index) {
        case 0://馆藏资源
            $(".kuang .author").show();
            $(".list_box>.down").hide();
            dropDownBing(0, SearchArray.BibliographyOption, SearchArray.BibliographyVal);
            $(".kuang").show();
            break;
        case 1://CNKI
            MinNavigation(5);
            $("#searchContent").val($("#searchContent").attr("v3"));
            break;
       
        default: break;    
        
    }
}
//根据二级导航的下标显示不同的检索框
function MinNavigation(index) {
    $(".kuang").show();
    switch (index) {
        case 0: //读秀检索
            dropDownBing(1, SearchArray.DuxiuName, SearchArray.DuxiuVal, SearchArray.DuxiuValTwo);
            $(".kuang .author").show();
            break;
        case 1: //百链检索
            dropDownBing(1, SearchArray.BailianName, SearchArray.BailianVal, SearchArray.BailianValTwo);
            $(".kuang .author").show();
            break;
        case 999: //SCI
            //dropDownBing(0, SearchArray.CalisName, SearchArray.CalisVal);
            $(".kuang").hide();
            break;
        case 2: //SCI/CPCI   
            dropDownBing(1, SearchArray.BailianName, SearchArray.BailianVal, SearchArray.BailianValTwo);
            $(".kuang").hide();
            break;
       case 3: //超星
            dropDownBing(1, SearchArray.KnowledgeName, SearchArray.KnowledgeVal,SearchArray.KnowledgeValTwo);
            $(".kuang .author").show();
            break;
        case 4: //SCI
            dropDownBing(0, SearchArray.CalisName, SearchArray.CalisVal);
            $(".kuang .author").show();
            break;
        case 5: //CNKI
            dropDownBing(0, SearchArray.CNKIName, SearchArray.CNKIVal);
            $(".kuang .author").show();
            break;
        default: break;
    }
}
//绑定下拉字段  
//type=1是表示a标签有val，valtwo属性，type=0这表示a标签有val属性   
//ArrayName, ArrayVal, ArrayValTwo则表示相关的数组
function dropDownBing(type, ArrayName, ArrayVal, ArrayValTwo) {
    var HTML = "";
    var aAttribute = "";
    $(".author>span").attr("val", ArrayVal[0]);
    if (type == 1)
        $(".author>span").attr("valtwo", ArrayValTwo[0]);
    $(".author>span").text(ArrayName[0]);
    for (var i = 0; i < ArrayName.length; i++) {
        aAttribute = "val='" + ArrayVal[i] + "'";
        if (type == 1)
            aAttribute = "val='" + ArrayVal[i] + "' valtwo='" + ArrayValTwo[i] + "'";
        HTML += "<a href='javascript://' " + aAttribute + ">" + ArrayName[i] + "</a>";
    }
    $(".author>.author_down").html(HTML);
}


//导航下拉
function BannerDown() {
    $(".header>.top>.nav>ul>li:gt(0)").live("mouseover", function () {
        var index = $(this).index();
        var width = $(this).width() - 5;
        var left = 0;
        for (var i = 0; i < index; i++) {
            left += $(".header>.top>.nav>ul>li").eq(i).width();
        }
        $(".header>.top>.nav>.downlist>div").hide();
        $(".header>.top>.nav>.downlist>div").eq(index - 1).css({ "display": "block", "margin-left": left, "width": width })
        $(".nav>.downlist a").css("width", width + 8);
    })
    $(".top>.nav>ul>li:eq(0)").live("mouseover", function () {
        $(".top>.nav>.downlist>div").hide();
    })

}