$(function () {
  $('#publish').on('click', function () {
    var content_title = $('#content-title').val(); // 获取题目名称
    var main_content = $('#main-content').val(); // 获取题目正文
    var main_classification_index = $('#main-classification').val(); // 获取主分类索引
    var secondary_classification_index = $('#secondary-classification').val(); // 获取次分类索引
    // console.log(secondary_classification_index)
    var choose_list = $('.choose-list input'); // 获取供选择的答案选项列表
    var real_answer = []; // 正确答案
    var choose_arr = []; // 答案列表

    function get_real_answer() {
      var true_list = $('.true-answer input'); // 包含正确答案的输入框input
      true_list.each(function (index, value) {
        real_answer.push($(value).val());
      });
      return real_answer;
    }

    choose_list.each(function (index, value) {
      // console.log(index, $(value).val())
      choose_arr.push($(value).val()); // 将输入框内的答案推入答案列表数组中
    });
    $.ajax({
      url: '/admin/publish',
      type: 'POST',
      data: {
        'main-classfication': main_classification_index - 1,
        'secondary-classification': secondary_classification_index - 1,
        'content-title': content_title,
        'main-content': main_content,
        'choose-arr': choose_arr,
        'true-answer': get_real_answer()
      },
      dataType: 'json',
      success: function (data) {
        console.log(data)
      }
    })

  });

});