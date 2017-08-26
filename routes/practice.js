var express = require('express');
var router = express.Router();
var Sliwx = require('../models/Sljwx');

/**
 * 完型填空通用方法
 */
function set_wanxing_convert() { // 答案选项编号
  var convert = ['A)' ,'B)' ,'C)' ,'D)' ,'E)' ,'F)' ,'G' ,'I)' ,'J)' ,'K)' ,'L) ','M)' ,'N)' ,'O)'];
  return convert;
}
function set_wanxing_query_string(main, secondary) { // 数据库检索关键字
  var query_data = {
    main_classification: main,
    secondary_classification: secondary
  };
  return query_data;
}
function set_wanxing_render(req, res, addr, query_data, convert) { // 数据库操作
  if (req.session.userInfos) { // 先判断有没有用户信息，如果有直接进入
    var userInfos = req.session.userInfos;
    Sliwx.count(query_data).then(function (counts) {
      var one_page_topic_number = 1; // 每个页面显示的条数
      var page_sum = Math.ceil(counts / one_page_topic_number); // 计算总页数
      var page = Number(req.query.page || 1); // 当前是第几页
      page = Math.min(page_sum, page);
      page = Math.max(1, page);
      var skip = (one_page_topic_number * page) - one_page_topic_number; // 每次查询要跳过的页数
      Sliwx.find(query_data).limit(one_page_topic_number).skip(skip).sort({_id: -1}).then(function (results) {
        res.render(addr, {
          page_sum: page_sum,
          page: page,
          results: results,
          convert: convert,
          userInfos: userInfos
        });
      })
    });
  } else {
    res.redirect('/login');
  }
}
// 四六级英语
router.get('/part1', function (req, res) {
  if (req.session.userInfos) {
    var userInfos = req.session.userInfos;
  }
  res.render('four_or_six_english/siliuji.html', {
    userInfos: userInfos
  });
});

// 考研类英语
router.get('/part2', function (req, res) {
  res.render('pubmed/kaoyan.html');
});

// 学雅思英语
router.get('/part3', function (req, res) {
  res.render('ielts/studyyasi.html');
});

// 专业类英语
router.get('/part4', function (req, res) {
  res.render('major_english/majorenglish.html');
});

/**
 *  四六级路由
 */
// 完型填空
router.get('/part1/siliutiankong', function (req, res) {
  var convert = set_wanxing_convert();
  var query_data = set_wanxing_query_string('1、四、六级英语', '1、完型填空');
  set_wanxing_render(req, res, 'four_or_six_english/siliutiankong.html', query_data, convert);
});

// 阅读
router.get('/part1/siliuyuedu', function (req, res) {
  res.render('four_or_six_english/siliuyuedu.html');
});
// 作文
router.get('/part1/siliuzuowen', function (req, res) {
  res.render('four_or_six_english/siliuzuowen.html');
});

/**
 * 考研路由
 */

// 完型填空
router.get('/part2/kaoyantiankong', function (req, res) {
  // if (req.session.userInfos) { // 先判断有没有用户信息，如果有直接进入
  //   var userInfos = req.session.userInfos;
  var convert = set_wanxing_convert()
  var query_data = set_wanxing_query_string('2、考研英语', '1、完型填空');
  set_wanxing_render(req, res, 'pubmed/kaoyantiankong.html', query_data, convert);
});
router.get('/part2/kaoyanyuedu', function (req, res) {
  res.render('pubmed/kaoyanyuedu.html');
});
router.get('/part2/kaoyanzuowen', function (req, res) {
  res.render('pubmed/kaoyanzuowen.html');
});


/**
 * 雅思英语路由
 */
// 雅思完型填空
router.get('/part3/yasitiankong', function (req, res) {

  // if (req.session.userInfos) { // 先判断有没有用户信息，如果有直接进入
  //   var userInfos = req.session.userInfos;
  var convert = set_wanxing_convert();
  var query_data = set_wanxing_query_string('3、雅思英语', '1、完型填空');
  set_wanxing_render(req, res, 'ielts/yasitiankong.html', query_data, convert);
});
router.get('/part3/yasiyuedu', function (req, res) {
  res.render('ielts/yasiyuedu.html');
});
router.get('/part3/yasizuowen', function (req, res) {
  res.render('ielts/yasizuowen.html');
});

/**
 * 专业类英语路由
 */

// 专业完型填空
router.get('/part4/majortiankong', function (req, res) {

  // if (req.session.userInfos) { // 先判断有没有用户信息，如果有直接进入
  //   var userInfos = req.session.userInfos;
  var convert = set_wanxing_convert();
  var query_data = set_wanxing_query_string('4、专业英语', '1、完型填空');
  set_wanxing_render(req, res, 'major_english/majortiankong.html', query_data, convert);
});
router.get('/part4/majoryuedu', function (req, res) {
  res.render('major_english/majoryuedu.html');
});
router.get('/part4/majorzuowen', function (req, res) {
  res.render('major_english/majorzuowen.html');
});

module.exports = router;