require(["config"], function() {
	require(["jquery", "idcode", "md5", "jquery.validation"], function() {
		$.idcode.setCode();
		$("#myform").validate({
			submitHandler: function() {
				if($.idcode.validateCode()) {
					$.ajax({
						url: "http://127.0.0.1/sfbest/server/login.php",
						data: {
							uname: $("[name=uname]").val(),
							upwd: $.md5($("[name=upwd]").val())
						},
						type: "post",
						dataType: "json"
					}).done(function(res) {
						if(res.status == 1) {
							sessionStorage.setItem("userInfo", JSON.stringify(res.data));
							window.location.assign("homepage.html")
						}

						alert(res.msg);
					})

				} else {
					alert("验证码错误");
				}

				return false;
			}

		});

	})

})