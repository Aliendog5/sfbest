require(["config"], function() {
	require(["jquery", "jquery.lazyload"], function() {
		$(document).ready(function() {
			$(".header").load("header.html");
			$(".footer").load("footer.html");
			//回到顶部
			$("#top").click(function() {
				$("html,body").animate({
					scrollTop: 0
				}, 500);
			});
			//发送请求数据到页面
			$.ajax({
				type: "get",
				url: "../../server/goods.php",
				dataType: "json"
			}).then(function(res) {
				console.log(res)
				for(var i = 0; i < res.length; i++) {
					$("#bigPerfect li").eq(i).find(".a_buy").html(res[i].p_tit);
					$("#bigPerfect li").eq(i).find(".a_price").html("¥" + res[i].p_price);
					$("#bigPerfect li").eq(i).find("img")[0].src = (res[i].p_img);
					//通过URL传ID到详情页					
					$("#bigPerfect li").eq(i).on("click", function() {
						window.location.href = "detail.html?id=" + res[$(this).index()].p_id;
					})
				}
			})
			//加入购物车显示隐藏
			$(".bbig li").hover(function() {
				$(this).find(".gBtn").show().parent().siblings("li").find("div").eq(1).hide()
			}, function() {
				$(this).find(".gBtn").hide()
			})
			$(".subcont ul li").hover(function() {
				$(this).find("div").show().parent().siblings("li").find("div").hide()
			}, function() {
				$(this).find("div").hide()
			})
			//倒计时
			function countDown(times) {
				var timer = null;
				timer = setInterval(function() {
					var day = 0,
						hour = 0,
						minute = 0,
						second = 0; //时间默认值
					if(times > 0) {
						day = Math.floor(times / (60 * 60 * 24));
						hour = Math.floor(times / (60 * 60)) - (day * 24);
						minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
						second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					}
					if(day <= 9) day = '0' + day;
					if(hour <= 9) hour = '0' + hour;
					if(minute <= 9) minute = '0' + minute;
					if(second <= 9) second = '0' + second;
					//					console.log(day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒");
					$("#djs").html(day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒")
					times--;
				}, 1000);
				if(times <= 0) {
					clearInterval(timer);
				}
			}
			countDown(432000);
			//懒加载
			$("img.lazy").lazyload({
				effect: "fadeIn",
			});
			//轮播图
			$(".point").find("li").on("click", function() {
				$(this).addClass("active").siblings("li").removeClass("active");
				$(".pic").find("li").eq($(this).index()).addClass("active").siblings("li").removeClass("active");
			})
			var i = 0;
			setInterval(function() {
				i++;
				if(i == 8) {
					i = 0;
				}
				$(".point").find("li").eq(i).addClass("active").siblings("li").removeClass("active");
				$(".pic").find("li").eq(i).addClass("active").siblings("li").removeClass("active");
			}, 2000)
		})
	})
})