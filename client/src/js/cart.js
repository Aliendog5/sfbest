require(["config"], function() {
	require(["jquery", "jquery.cookie"], function() {
		$(function() {
			$(".header").load("header.html");
			$(".footer").load("footer.html");
			var cur = sessionStorage.getItem("userInfo");
			var m = 0;
			if(cur != null) {
				var uid = JSON.parse(cur).uid;
				$.ajax({
					type: "post",
					url: "http://127.0.0.1/sfbest/server/showcar.php",
					data: {
						uid: uid
					},
					dataType: "json"
				}).then(function(res) {
					if(res) {
						for(let i = 0; i < res.length; i++) {
							var str = "";
							str = `<tr  data-info="${res[i].p_id}"><td><input type="checkbox"/></td><td><img src="${res[i].p_img}"/>${res[i].p_tit}</td><td>¥${res[i].p_price}</td><td>0</td><td>${res[i].c_num}</td><td class="mm">¥${res[i].p_price*res[i].c_num}</td><td><a href="javascript:;" id='del'>删除<a/></td></tr>`;
							$("table tbody").append(str);
							//							m = m + res[i].p_price * res[i].c_num;
						}
					}
					//删除一行
					$("body").on("click", "#del", function() {
						var data = $(this).parents("tr").data("info");
						if(confirm("确定删除该条商品?")) {
							$(this).parent().parent().remove();
							$.ajax({
								type: "post",
								url: "http://127.0.0.1/sfbest/server/delete1.php",
								data: {
									u_id: uid,
									p_id: data
								}
							}).then(function() {
								if($("table tbody tr").length == 0) {
									$(".shopcar").css({
										display: "none"
									});

									$(".kong").css({
										display: "block"
									});
								}
							})
						}
					})
					//清空购物车
					$("#clearAll").on("click", function() {
						if(confirm("你确定要清空购物车?????")) {
							$.ajax({
								type: "post",
								url: "http://127.0.0.1/sfbest/server/delete2.php",
								data: {
									u_id: uid
								},
								dataType: "json"
							}).then(function(res) {
								alert(res.msg);
								$(".shopcar").css({
									display: "none"
								});
								$(".kong").css({
									display: "block"
								});
							})
						}
					})
					//全选
					$("table thead input").on("click", function() {
						console.log(111)
						for(let k = 0; k < $("table tbody input").length; k++) {
							$("table tbody input")[k].checked = this.checked;
						}
					})
					for(let i = 0; i < $("table tbody input").length; i++) {
						$("table tbody input")[i].onclick = function() {
							var c = 0;
							for(let j = 0; j < $("table tbody input").length; j++) {
								if($("table tbody input")[j].checked) {
									c++;
								}
							}
							$("table thead input")[0].checked = c == $("table tbody input").length;
						}
					}
					//总价
					$(".money span").html("¥" + m);
				})
			} else {
				console.log(111)
				//没登录

				var cartList = JSON.parse($.cookie("nologin") || "[]");
				for(let i = 0; i < cartList.length; i++) {
					var str2 = "";
					//					str = `<tr data-info="${cartList[i].p_id}"><td><input type="checkbox"/></td><td><img src="${cartList[i].p_img}"/>${cartList[i].p_tit}</td><td>¥${cartList[i].p_price}</td><td>0</td><td>${cartList[i].c_num}</td><td class="mm">¥${cartList[i].p_price*cartList[i].c_num}</td><td><a href="javascript:;" id='del'>删除<a/></td></tr>`;
					str2 = `<tr data-info="${cartList[i].p_id}">
						<td><input type="checkbox"/></td>
						<td><img src="${cartList[i].cp_img}"/>${cartList[i].cp_name}</td>
						<td>¥${cartList[i].cp_price}</td>
						<td>0</td><td>${cartList[i].cp_num}</td>
						<td class="mm">¥${cartList[i].cp_price*cartList[i].cp_num}</td>
						<td><a href="javascript:;" id='del'>删除<a/></td>
					</tr>`;
					console.log(343)
					$("table tbody").append(str2);
					//					m = m + res[i].p_price * res[i].c_num;
				}
				//删除一行
				$("body").on("click", "#del", function() {
					if(confirm("确定删除该条商品?")) {
						$(this).parent().parent().remove();
					}
				})
				//全选
				$("table thead input").on("click", function() {
					console.log(111)
					for(let k = 0; k < $("table tbody input").length; k++) {
						$("table tbody input")[k].checked = this.checked;
					}
				})
				for(let i = 0; i < $("table tbody input").length; i++) {
					$("table tbody input")[i].onclick = function() {
						var c = 0;
						for(let j = 0; j < $("table tbody input").length; j++) {
							if($("table tbody input")[j].checked) {
								c++;
							}
						}
						$("table thead input")[0].checked = c == $("table tbody input").length;
					}
				}
				//总价
				$(".money span").html("¥" + m);
			}

		})
	})
})