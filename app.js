var express = require('express'); // 加载express模块
var app = new express(); // 实例化express
var path = require('path'); // 加载path模块
var bodyParser = require('body-parser'); // 加载body-parser模块
var mongoose = require('mongoose'); // 加载mongoose模块
var nunjucks = require('nunjucks'); // 加载nunjucks模板引擎
var session = require('express-session'); // 加载express-session 模块

var env = nunjucks.configure('views', { // nj模板配置
  autoescape: true,
  express: app
});

env.addFilter('fliter_date', function (date) {
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var dates = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return year + '年' + month + '月' + dates + '日' + hours + '时' + minutes + '分' + seconds + '秒';
});

app.use(bodyParser.urlencoded({ // 在用post提交数据时需要把参数extended:false改为extended:true,因为通常post内容的格式为application/x-www-form-urlencoded
  extended: true,
  secret: 'duanwanyi'
}));

app.use(session({ // 挂载session中间件
  secret: 'duanwanyi', // 必须项。该值用于session ID的cookie签名。该值可以是单个字符串，或是多个字符串数组。当使用数组时，只有第一个会被用于签名，而所有值都会被用于request中的签名。
  cookie: { maxAge: 600000 }, // 设置过期时间
  resave: false, // 强制将 session 保存回session存储区，即使在请求期间session从不被修改。默认为true
  saveUninitialized: true// 强制将未初始的session保存到存储中。Session在新创建而未修改时，是未初始化状态。
}));

app.use(function (req, res, next) {
  // console.log(req.session.userInfos); // { userId: '599a7f6539ba8f49203086bc', username: 'test' }
  if (req.session.userInfos) {
    req.userInfos = req.session.userInfos;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'))); // 指定静态文件目录为public
app.use('/', require('./routes/index')); // 指定“/”目录下的路由分发路径
app.use('/practice', require('./routes/practice')); // 指定"/practice"路由
app.use('/admin', require('./routes/admin')); // 指定"/admin"路由

mongoose.connect('mongodb://localhost:27017/duan', function (err) {
  if (err) {
    console.log('连接错误' + '----' + err);
  } else {
    console.log('数据库连接成功，端口号9000');
    app.listen(9000); // 监听端口号为9000
  }
});


