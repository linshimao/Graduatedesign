/**
 * 用户注册
 */
$(function () {
  $('#register').on('click', function () {
    var data = {
      username: $('#username').val(),
      password: $('#password').val(),
      rpassword: $('#rpassword').val()
    };
    $.ajax({
      url: '/register/user_register',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (data) {
        if (data.code === 0) {
          location.href = '/login';
        }
      }
    })
  })

});