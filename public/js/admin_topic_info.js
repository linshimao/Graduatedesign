$(function () {
  $('#topic-list').on('click', '.save-edit', function () {
    var $this = $(this);
    var main_classification = $this.siblings('select').first().val(); // 获取主分类索引
    var secondary_classification = $this.siblings('select').last().val(); // 获取次分类索引
    var _id = $this.attr('data-topic-id'); // 获取当前要修改的这道题型的id
    $.ajax({
      url: '/admin/admin_topic_info/edit',
      type: 'POST',
      dataType: 'json',
      data: {
        topic_id: _id,
        main_classification: main_classification,
        secondary_classification: secondary_classification
      },
      success: function (data) {
        if (data.code == 1) {
          alert(data.message);
        }
        if (data.code == 0) {
          alert(data.message);
          location.reload();
        }
      }
    })
  });
  $('#topic-list').on('click', '.del-topic', function () {
    var $this = $(this);
    var topic_id = $this.attr('data-topic-id');
    $.ajax({
      url: '/admin/admin_topic_info/delete',
      type: 'POST',
      dataType: 'json',
      data: {
        topic_id: topic_id
      },
      success: function (data) {
        if (data.code == 1) {
          alert(data.message);
          return false;
        }
        if (data.code == 0) {
          alert(data.message);
          location.reload();
        }
      }
    })
  })

});