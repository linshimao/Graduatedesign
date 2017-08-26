var express = require('express');
var router = express.Router();
var User = require('../models/User'); // 引入用户模型
var resData = {}; // 数据返回对象，以后用来传递返回前台的数据消息

router.get('/', function (req, res) {
  // console.log(req.session);
  if (req.session.userInfos) {
    var userInfos = req.session.userInfos;
    res.render('index.html', {
      userInfos: userInfos
    });
    // console.log(userInfos)
  } else {
    res.render('index.html');
  }

});
router.get('/questionpractice', function (req, res) {
  res.render('questionpractice.html')
});

router.get('/register', function (req, res) { // 用户注册页面
  res.render('register.html');
});

router.post('/register/user_register', function (req, res) { // 用户注册
  // console.log(req.body) { username: 'ww', password: 'wwe', rpassword: 'wrewrde' }
  var username = req.body.username; // 获取用户名
  var password = req.body.password; // 获取密码

  new User({
    username: username,
    password: password
  }).save().then(function () {
    resData.code = 0; // 0表示注册成功,1表示用户已经存在
    resData.message = '注册成功'; // 成功提示
    res.json(resData); // 传递json数据给前台
  });
});

router.get('/login', function (req, res) { // 用户登录界面
  res.render('login.html');
});

router.post('/login/user_login', function (req, res) { // 用户登录
  // console.log(req.body) { username: '热污染', password: '234' }
  var username = req.body.username; // 从 req.body中获取ajax传递过来的用户名
  var password = req.body.password; // 从 req.body中获取ajax传递过来的密码
  User.findOne({
    username: username,
    password: password
  }).then(function (user) { // 随便输入一个账号密码登录 user获取的结果是null
    if (!user) { // 如果该用户资料为空
      resData.code = 1; // 0表示登录成功,1表示登录失败
      resData.message = '账号或密码错误'; // 错误提示
      res.json(resData); // 传递此消息给前台
      return false;
    } else {
      resData.code = 0;
      resData.message = '登录成功';
      resData.userInfos = {
        userId : user._id,
        username: user.username,
        school: user.school
      };
      req.session.userInfos = resData.userInfos;
      // console.log(req.session)
      res.json(resData);
    }
  })

});

module.exports = router;