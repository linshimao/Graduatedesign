/**
 * 个人资料修改
 */
$(function () {
  $('#save-user-info').on('click', function () {
    var data = {
      "username": $('#username').val(),
      "edit-password": $('#edit-password').val(),
      "school": $('#school').val()
    };
    $.ajax({
      url: '/management/user_message',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (data) {
        // console.log(data);
        if (data.code === 0) {
          location.href = '/login';
        }
      }
    })
  })
});