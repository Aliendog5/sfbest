require(["config"], function() {
	require(["jquery", "jquery.validation", "idcode", "md5"], function() {
		$(function() {
			$.idcode.setCode();
			$("#myform").validate({
				submitHandler: function() {
					if($.idcode.validateCode()) {
	console.log(111)
						$.ajax({
							type: "post",
							url: "http://127.0.0.1/sfbest/server/reg.php",
							data: {
								uname: $("[name='uname']").val(),
								upwd: $.md5($("[name='upwd']").val())
							},
							dateType: "json"
						}).then(function(res) {
							if(res.status == 1) {
								if(confirm("注册成功,是否需要登录?")) {
									window.location.assign("login.html");
								}
							} else {
								alert(res.msg);
							}
						})
					}else{
						alert("验证码错误!");
					}
					return false;
				},
				rules: {
					uname: {
						'required': true,
						'rangelength': [6, 20],
						remote: {
							type: "get",
							url: "http://127.0.0.1/sfbest/server/checkUserName.php"
						}
					},
					upwd: {
						'required': true,
						'rangelength': [6, 20],
					},
					upwd1:{
						equalTo:"#upwd"
					}
				},
				messages: {
					uname: {
						'required': "请输入用户名",
						'rangelength': "用户名长度6-20",
						remote: "该用户已存在"
					},
					upwd: {
						'required': "请输入密码",
						'rangelength': "密码长度为6-20"
					},
					upwd1:{
						equalTo:"两次密码不一致"
					}
				}
			})
		})
	})
})