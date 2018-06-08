require(["config"], function() {
	require(["jquery", "jquery.cookie"], function() {
		function getStyle(obj, attr) {
			if(window.getComputedStyle) {
				return window.getComputedStyle(obj, null)[attr];
			}
			return obj.currentStyle[attr];
		}
		$(function() {

			//获取页面数据->数据库
			var id = window.location.href.split("?")[1].split("=")[1];
			$.ajax({
				type: "post",
				url: "../../server/goods2.php",
				data: {
					pid: id
				},
				dataType: "json"
			}).then(function(res) {
				console.log(res)
				$(".right h1").html(res[0].p_tit);
				console.log(res[0].p_tit)
				$("#d_price span").html(res[0].p_price);
				$("#smallImg img")[0].src = res[0].p_img;
			})
			//点击加入购物车			
			$("#btnDetail").on("click", function() {
				var data = {
					cp_id: id,
					cp_name: $(".right h1").text(),
					cp_price: $("#d_price span").text(),
					cp_num: $("#number_265991").val(),
					cp_img: $("#smallImg img")[0].src
				}
				console.log(data)
				var cur = sessionStorage.getItem("userInfo");
				if(cur != null) {
					//已登录,存数据库
					cur = JSON.parse(sessionStorage.getItem("userInfo"));
					$.ajax({
						type: "post",
						url: "../../server/car.php",
						data: {
							u_id: cur.uid,
							p_id: id,
							c_num: $("#number_265991").val(),
							c_status: 1
						},
						dataType: "json"
					}).then(function(res) {
						alert(res.msg);
					})
				} else {
					//没登录,就存cookie
					var cookieArr = JSON.parse($.cookie("nologin") || '[]');
					console.log(cookieArr)
					var flag = true;
					for(var i = 0; i < cookieArr.length; i++) {
						if(cookieArr[i]["cp_id"] == data["cp_id"]) {
							cookieArr[i]["cp_num"] = Number(data["cp_num"]) + Number(cookieArr[i]["cp_num"]);
							flag = false;
						}
					}
					if(flag) {
						cookieArr.push(data);
					}
					alert("操作成功");
					$.cookie("nologin", JSON.stringify(cookieArr), 10)
				}
			})
			//菜单切换
			$(".qh ul li:eq(0)").css({
				background: "#669900",
				color: "#fff"
			});
			$(".qh ul li").on("click", function() {
				console.log($(this).index());
				$(this).css({
					background: "#669900",
					color: "#fff"
				}).siblings("li").css({
					background: "",
					color: ""
				});
				$(this).parent().siblings("ol").find("li").eq($(this).index()).show().siblings("li").hide();
			})
			//加减按钮
			$("#add-sell-num").on("click", function() {
				$(this).parent().prev("span").find("input").val($(this).parent().prev("span").find("input").val() - 0 + 1);
			})
			$("#reduce-sell-num").on("click", function() {
				if($(this).parent().prev("span").find("input").val() <= 1) {
					$(this).parent().prev("span").find("input").val(1);
				} else {
					$(this).parent().prev("span").find("input").val($(this).parent().prev("span").find("input").val() - 1);
				}
			})
			//放大镜
			var $smallImg = $("#smallImg"); //小图
			var $bigImg = $("#bigImg"); //大图
			var $smallArea = $("#smallArea"); //小区域
			var $bigArea = $("#bigArea"); //大区域			
			//小区域
			$smallArea.width(($smallImg.width() / $bigImg.width()) * $bigArea.width());
			$smallArea.height(($smallImg.height() / $bigImg.height()) * $bigArea.height());
			//鼠标移入小图
			$smallImg.on("mouseenter", function() {
				$smallArea.show();
				$bigArea.css("display", "block");
				//移动
				$(document).on("mousemove", function(e) {
					//坐标点=e.clientX-小图的左边距离-小区域宽度的一半
					var dx = e.pageX - $smallImg.offset().left - $smallArea.width() / 2;
					var dy = e.pageY - $smallImg.offset().top - $smallArea.height() / 2;
					if(dx <= 0) {
						dx = 0;
					}
					if(dx >= $smallImg.width() - $smallArea.width()) {
						dx = $smallImg.width() - $smallArea.width();
					}
					if(dy <= 0) {
						dy = 0;
					}
					if(dy >= $smallImg.height() - $smallArea.height()) {
						dy = $smallImg.height() - $smallArea.height();
					}
					$smallArea.css({
						"left": dx,
						"top": dy
					})
					//倍数
					var oscale = $bigImg.width() / $smallImg.width();
					//小区域移动,大图跟着动
					$bigImg.css({
						left: -dx * oscale,
						top: -dy * oscale
					})
				})
			})
			$smallImg.on("mouseleave", function() {
				$smallArea.hide();
				$bigArea.hide();
				$(document).off("mousemove");
			})
			//点击小图,将小图的src属性给大图的src 
			var slis = $("#small ul li img");
			var big = document.querySelector("#smallImg img");
			var bigA = document.querySelector("#bigArea img");
			$("#small li").eq(0).css({
				border: "solid 1px #669900"
			}).siblings("li").css({
				border: "solid 1px #ccc"
			})
			for(var m = 0; m < slis.length; m++) {
				slis[m].index = m; //slis[m].index=m;for循环不会等待点击,所以需要留住m的值
				slis[m].onclick = function() {
					big.src = slis[this.index].src;
					bigA.src = slis[this.index].src;
					$(this).parent("li").css({
						border: "solid 1px #669900"
					}).siblings("li").css({
						border: "solid 1px #ccc"
					})
				}
			}
			$(".header").load("header.html");
			$(".footer").load("footer.html");
			
			
			
			//当前用户名
	var cur = sessionStorage.getItem("userInfo");
	if(cur != null) {
		cur = JSON.parse(sessionStorage.getItem("userInfo"));
		$(".mRight li").eq(0).html(`${cur.uname} 欢迎回来! [<a id="aaa" href="#">退出</a>]`);
	}
	$("body").delegate("#aaa", "click", function() {
		sessionStorage.clear();
		window.location.reload();
	})
			//入口括号	
		})

	})
})