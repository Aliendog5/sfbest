require(["config"], function() {
	require(["jquery"], function() {
		$(document).ready(function() {
			$(".header").load("header.html");
			$(".footer").load("footer.html");
//			//轮播图
//			$(".banner ul>li").each(function(index, value) {
//				if(index == 0) {
//					$("<li class='current'></li>").appendTo($(".banner ol"));
//				} else {
//					$("<li></li>").appendTo($(".banner ol"));
//				}
//			})
//			$(".banner ul>li").eq(0).clone(true).appendTo($(".banner ul"));
//			//点击轮播
//			$("body").on("click", "ol>li", function() {
//				$(this).addClass("current").siblings().removeClass("current");
//				imgIndex = dotIndex = $(this).index() - 1;
//				autoPlay();
//			})
//			//自动轮播
//			var timer = setInterval(autoPlay, 3000);
//			var imgIndex = 0;
//			var dotIndex = 0;
//			var bflag = true;
//
//			function autoPlay() {
//				if(bflag) {
//					bflag = false;
//					imgIndex++;
//					dotIndex++;
//					if(imgIndex > 8) {
//						imgIndex = 1;
//						$(".banner ul").css("left", 0);
//					}
//					if(dotIndex > 7) {
//						dotIndex = 0;
//					}
//					$(".banner ol li").eq(dotIndex).addClass("current").siblings().removeClass("current");
//					$(".banner ul").animate({
//						"left": -imgIndex * 1263
//					}, 1000, function() {
//						bflag = true;
//					})
//				}
//			}
//			$(".banner .banner-box").hover(function() {
//				clearInterval(timer);
//			}, function() {
//				timer = setInterval(autoPlay, 3000);
//			})
//
		})
	})
})