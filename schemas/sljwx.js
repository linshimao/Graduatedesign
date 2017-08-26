var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  main_classification: String, // 题型所属主分类(四六级、考研、雅思、专业)
  secondary_classification: String, // 次要分类（完型，阅读，作文）
  content_title: String, // 标题
  main_content: String, // 题目内容
  push_time: { // 发布时间
    type: Date,
    default: Date.now
  },
  true_answer: Array, // 正确答案
  answer_choose_list: Array // 答案列表
  // answer_num: Number // 答案的个数
});