var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Sliwx = require('../models/Sljwx');
var resData = {};


router.get('/test', function (req, res) { // 管理中心路由
  res.render('publish.html')
});


router.get('/admin_manage', function (req, res) { // 管理员管理界面
  res.render('admin_manage.html');

});

router.get('/admin_user_info', function (req, res) { // 用户信息查看
  User.find().then(function (users) {
    // console.log(users);
    var users = users;
    res.render('admin_user_info.html', {
      users: users
    });
  });
});

router.get('/admin_topic_info', function (req, res) { // 题型信息查看
  Sliwx.find().then(function (topics) {
    var topics = topics;
    res.render('admin_topic_info.html', {
      topics: topics
    })
  })
});

router.post('/admin_topic_info/edit', function (req, res) { // 修改题型信息
  var main_classification = req.body.main_classification;
  var secondary_classification = req.body.secondary_classification;
  var topic_id = req.body.topic_id;

  if (main_classification == 0 || secondary_classification == 0) {
    resData.code = 1;
    resData.message = '请选择正确的分类或者题型！';
    res.json(resData);
    return false;
  } else {
    Sliwx.findByIdAndUpdate(topic_id, {main_classification: main_classification, secondary_classification: secondary_classification}, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log('更改成功:' + docs);
        resData.code = 0;
        resData.message = '更新成功';
        res.json(resData);
      }
    })
  }
});

router.post('/admin_topic_info/delete', function (req, res) {
  var topic_id = req.body.topic_id;
  Sliwx.remove({_id: topic_id}, function (err, docs) {
    if (err) {
      console.log(err);
      resData.code = 1;
      resData.message = '删除题目失败!';
      res.json(resData);
      return false;
    } else {
      console.log('删除题目成功!' + docs);
      resData.code = 0;
      resData.message = '删除题目成功';
      res.json(resData);
    }
  })
});

router.post('/admin_user_info/delete_user', function (req, res) { // 删除用户
  var _id = req.body._id;
  // console.log(_id)
  User.remove({_id: _id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('删除成功' + docs);
      resData.code = 0;
      resData.message = '删除成功';
      res.json(resData);
    }
  });
});


router.post('/publish', function (req, res) {
  var content_title = req.body['content-title'];
  var main_content = req.body['main-content'];
  var main_classfication_index = req.body['main-classfication'];
  var secondary_classification_index = req.body['secondary-classification'];
  var main_classfication_arr = ['1、四、六级英语', '2、考研英语', '3、雅思英语', '4、专业英语'];
  var secondary_classification_arr = ['1、完型填空', '2、阅读理解','3、作文训练'];
  var choose_arr = req.body['choose-arr'];
  var true_answer_arr = req.body['true-answer'];
  // console.log(choose_arr)
  new Sliwx({
    main_classification: main_classfication_arr[main_classfication_index],
    secondary_classification: secondary_classification_arr[secondary_classification_index],
    content_title: content_title,
    main_content: main_content,
    answer_choose_list: choose_arr,
    true_answer: true_answer_arr
  }).save().then(function (topic) {
    resData.code = 0; // 保存成功
    resData.message = '题型发布成功';
    res.json(resData);
  })
  // console.log(req.body);
});

router.get('/user_message', function (req, res) {
  if (!req.session.userInfos) {
    res.redirect('/login');
  } else {
    var userInfos = req.session.userInfos;
    console.log(userInfos);
    res.render('managemessage.html', {
      userInfos: userInfos
    });
  }
});

router.post('/user_message', function (req, res) {
  // console.log(req.body) { 'edit-password': '2ewew', school: 'efrewrew' }
  var edit_password = req.body['edit-password'];
  var school = req.body.school;
  var username = req.body.username;

  User.update({
    username: username
  }, { $set: { password: edit_password, school: school }}).then(function () {
    resData.code = 0;
    resData.message = '用户资料修改成功';
    req.session.destroy(function(err) {
      if (err) {
        console.log('session删除失败' + err);
      } else {
        res.json(resData);
      }
    });
  })
});

module.exports = router;