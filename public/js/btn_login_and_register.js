window.onload = function () {
  var register_btn = document.getElementById('reg'); // 获取“立即注册”按钮
  var login_btn = document.getElementById('login'); // 获取"立即登录"按钮
  register_btn.onclick = function () { // 给"立即注册"按钮添加点击事件
    location.href = '/register'; // 页面跳转到“注册”界面
  };
  login_btn.onclick = function () {
    location.href = '/login'; // 页面跳转到"登录"界面
  }
};