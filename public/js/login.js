/**
 * 用户登录
 */
$(function () {
  var username = $('#username');
  var password = $('#password');
  $('#login').on('click', function () {
    $.ajax({
      url: '/login/user_login',
      type: 'POST',
      dataType: 'json',
      data: {
        username: username.val(),
        password: password.val()
      },
      success: function (data) { // code: 0, message: "登录成功", userInfos: {…}
        console.log(data)
        if (data.code === 0) {
          location.href = '/';
        }
      }
    })
  })
});