require(["config"], function() {
	require(["jquery", "idcode", "md5", "jquery.validation","jquery.cookie"], function() {
		$.idcode.setCode();
		$("#myform").validate({
			submitHandler: function() {
				if($.idcode.validateCode()) {
					$.ajax({
						url: "../../server/login.php",
						data: {
							uname: $("[name=uname]").val(),
							upwd: $.md5($("[name=upwd]").val())
						},
						type: "post",
						dataType: "json"
					}).done(function(res) {	
						sessionStorage.setItem("userInfo", JSON.stringify(res.data));
						if(res.status == 1) {							
							var arr=JSON.parse($.cookie("nologin")||"[]");
							for(var i=0; i<arr.length; i++){
								$.ajax({
									url:"../../server/car.php",
									type:"post",
									dataType:"json",
									data:{
										u_id:JSON.parse(sessionStorage.getItem("userInfo")).uid,
										p_id:arr[i].p_id,
										c_num:arr[i].c_num,
										c_status:1
									}
								})
							}
							$.removeCookie("nologin");							
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