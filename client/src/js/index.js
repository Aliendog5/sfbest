require(["config"], function() {
	require(["jquery"], function() {
		$(document).ready(function() {
			$(".header").load("header.html");
			$(".footer").load("footer.html");
		})
	})
})