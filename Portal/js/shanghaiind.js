// JavaScript Document
$(function() {
	$(".login").click(function() {
		$(".cy_denglubox").show();
		$(".cy_dengluboxbg").show();
		$(".indexcontainer").css("position", "relative");
		$(".indexcontainer").css("z-index", "-5");
	})
	$(".closed").click(function() {
		$(".cy_denglubox").hide();
		$(".cy_dengluboxbg").hide();
		$(".indexcontainer").css("position", "relative");
		$(".indexcontainer").css("z-index", "1");
	})

	$(".bot_all span").click(function() {
		$(".bot_all span").removeClass("bot_scend").addClass("bot_third")
		$(this).removeClass("bot_third").addClass("bot_scend")
		var index = $(".bot_all span").index(this);
		$(".cy_indexbanner").hide()
		$(".cy_indexbanner").eq(index).fadeIn();
	});

	$(".cy_indexnav ul li").hover(function() {
		/*$(this).find("a").css("color", "white");*/
	}, function() {
		/*$(this).find("a").css("color", "#676767");
		$("#cx_Cnv").css("color", "white");
		$("#cx_Env").css("color", "white");*/
	}

	);
	
	setTimeout("changImg(1)", 3000);
});
var indexShow = 0;
function changImg(show) {
	if (show != 1) {
		$(".cy_indexbanner").hide()
		$(".cy_indexbanner").eq(indexShow).fadeIn();
		$(".bot_all span").removeClass("bot_scend").addClass("bot_third")
		$(".bot_all span").each(function() {
			var index = $(".bot_all span").index(this);
			if (indexShow == index) {
				$(this).removeClass("bot_third").addClass("bot_scend")
				return false;
			}
		});
	}
	if (indexShow == 3) {
		indexShow = 0;
	} else {
		indexShow = indexShow + 1;
	}
	setTimeout("changImg(2)", 3000);
}