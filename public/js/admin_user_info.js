$(function () {
  var $user_list = $('#user-list');
  $user_list.on('click', '.user-remove', function () {
    var _id = $(this).attr('data-user-id');
    $.ajax({
      type: 'POST',
      url: '/admin/admin_user_info/delete_user',
      data: {
        _id: _id
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data.code === 0) {
          alert('删除成功!');
          location.reload();
        }
      }
    })
  })
});