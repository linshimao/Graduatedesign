var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String, // 用户名
  password: String, // 密码
  school: {
    type: String, // 学校，默认为空
    defalut: ''
  },
  tel: String // 联系方式
});