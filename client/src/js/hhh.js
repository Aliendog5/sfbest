require(["config"], function() {
	require(["jquery", "jquery.cookie"], function() {
		$(function() {
			$(".header").load("header.html");
			$(".footer").load("footer.html");
		})
	})
})