$(function () {

  $(document).on('click', '.sure-answer', function () {
    // console.log($(this).parent('li').siblings('li'));
    var _this = $(this);
    var ipt_arr = $(this).parent('li').siblings('li').find('input'); // 获取所有的input输入框
    // console.log(ipt_arr.length)
    var answer_arr = []; // 空数组存放用户选择的答案
    // console.log(ipt_arr)
    ipt_arr.each(function (index, value) {
      if (!$(value).val()) {
        alert('还有题目未作答哦！');
        return false;
      } else {
        answer_arr.push($(value).val().toUpperCase()); // 将用户选择的答案推入数组
        // console.log(answer_arr)
      }
      // console.log(answer_arr);
    });
    if (ipt_arr.length === answer_arr.length) {
      compare_answer(answer_arr, _this);
    }
  });

  // 比较用户的答案和正确答案
  function compare_answer(answer_arr, who) {
    console.log(who)
    var $answer_li = who.parents('.user-select').next().find('ul li'); // 获取把参考答案包裹的li标签
    $answer_li.each(function (index, value) { // 遍历li标签获取参考答案
      var index_point = $(value).html().indexOf('.');
      // console.log(index_point);
      if ($(value).html().slice(index_point + 1).toUpperCase() === answer_arr[index]) {
        $(value).removeClass('note-error').addClass('note-right'); // 答案正确，给予正确提示
      } else {
        $(value).removeClass('note-right').addClass('note-error'); // 答案错误，给予错误提示
      }
    });
    who.parents('.user-select').next().slideDown(500); // 参考答案淡入
  }

});