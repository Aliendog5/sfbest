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
							url: "../../server/reg.php",
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
					} else {
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
							url: "../../server/checkUserName.php"
						}
					},
					upwd: {
						'required': true,
						'rangelength': [6, 20],
					},
					upwd1: {
						equalTo: "#upwd"
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
					upwd1: {
						equalTo: "两次密码不一致"
					}
				}
			})
			//mima			
//			var aStr = "牛逼";
                function checkStrong(val) {
                    var modes = 0;
                    if (val.length < 6) return 0;
                    if (/\d/.test(val)) modes++; //数字
                    if (/[a-z]/.test(val)) modes++; //小写
                    if (/[A-Z]/.test(val)) modes++; //大写  
                    if (/\W/.test(val)) modes++; //特殊字符
                    if (val.length > 12) return 4;
                    return modes;
                };
                $("#upwd").keyup(function() {
                    var val = $(this).val();
                    $("#tips i").text(val.length);
                    var num = checkStrong(val);
                    switch (num) {
                        case 0:
                            break;
                        case 1:
                            $("#tips em").css('background', 'grey').eq(num - 1).css('background', 'red');
                            break;
                        case 2:
                            $("#tips em").css('background', 'grey').eq(num - 1).css('background', 'orange');
                            break;
                        case 3:
                            $("#tips em").css('background', 'grey').eq(num - 1).css('background', 'greenyellow');
                            break;
                        case 4:
                            $("#tips em").css('background', 'grey').eq(num - 1).css('background', 'cornflowerblue');
                            break;
                        default:
                            break;
                    }
                })
		})
	})
})