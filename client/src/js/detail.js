require(["config"], function() {
	require(["jquery"], function() {
		function getStyle(obj, attr) {
			if(window.getComputedStyle) {
				return window.getComputedStyle(obj, null)[attr];
			}
			return obj.currentStyle[attr];
		}
		$(function() {
			//菜单切换
			$(".qh ul li:eq(0)").css({
				background: "#669900",
				color: "#fff"
			});
			console.log($(".qh ol li:eq(0)"))
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
			$("#add-sell-num").on("click",function(){
				$(this).parent().prev("span").find("input").val($(this).parent().prev("span").find("input").val()-0+1);
			})
			$("#reduce-sell-num").on("click",function(){
				if($(this).parent().prev("span").find("input").val()<=1){
					$(this).parent().prev("span").find("input").val(1);
				}else{
					$(this).parent().prev("span").find("input").val($(this).parent().prev("span").find("input").val()-1);
				}				
			})
			//放大镜
			console.log(222)
			var $smallImg = $("#smallImg"); //小图
			var $bigImg = $("#bigImg"); //大图
			var $smallArea = $("#smallArea"); //小区域
			var $bigArea = $("#bigArea"); //大区域			
			//小区域
			$smallArea.width(($smallImg.width() / $bigImg.width()) * $bigArea.width());
			$smallArea.height(($smallImg.height() / $bigImg.height()) * $bigArea.height());
			//鼠标移入小图
			$smallImg.on("mouseenter", function() {
				console.log(1111)
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
			var slis=$("#small ul li img");console.log(slis)
			var big=document.querySelector("#smallImg img");
			var bigA=document.querySelector("#bigArea img");
			$("#small li").eq(0).css({border:"solid 1px #669900"}).siblings("li").css({border:"solid 1px #ccc"})
			for(var m = 0; m <slis.length; m++) {
				slis[m].index = m; //slis[m].index=m;for循环不会等待点击,所以需要留住m的值
				slis[m].onclick = function() {
					console.log(slis[this.index].src);
					big.src = slis[this.index].src;
					bigA.src = slis[this.index].src;
					$(this).parent("li").css({border:"solid 1px #669900"}).siblings("li").css({border:"solid 1px #ccc"})
				}
			}
			//入口括号	
		})

	})
})