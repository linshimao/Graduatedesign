var mongoose = require('mongoose');
var userSchema = require('../schemas/Users');

module.exports = mongoose.model('User', userSchema); // 导出模块，第一个参数为引用名，第二个参数为定义的表结构