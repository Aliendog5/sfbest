$(function() {
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

})