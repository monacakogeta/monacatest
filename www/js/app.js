// This is a JavaScript file

var appKey = ''
var clientKey = ''

// SDKの初期化
var ncmb = new NCMB(appKey, clientKey)

///// Called when app launch
$(function () {
  $.mobile.defaultPageTransition = 'none'
  $('#LoginBtn').click(onLoginBtn)
  $('#RegisterBtn').click(onRegisterBtn)
  $('#YesBtn_logout').click(onLogoutBtn)
})

//--------------------------USER MANAGEMENT------------------------------//
var currentLoginUser // 現在ログイン中ユーザ

function onRegisterBtn () {
  // 入力フォームからusername, password変数にセット
  var userName = $('#reg_username').val()
  var password = $('#reg_password').val()

  var user = new ncmb.User()
  user.set('userName', userName)
    .set('password', password)

  // ユーザ名とパスワードで新規登録
  user.signUpByAccount()
    .then(function (regUser) {
      // 新規登録したユーザでログイン
      ncmb.User.login(regUser)
        .then(function (loginUser) {
          alert('新規登録とログイン成功')
          currentLoginUser = ncmb.User.getCurrentUser()
          $.mobile.changePage('#DetailPage')
        })
        .catch(function (error) {
          alert('ログイン失敗！次のエラー発生： ' + error)
        })
    })
    .catch(function (error) {
      alert('新規登録に失敗！次のエラー発生：' + error)
    })
}

function onLoginBtn () {
  var userName = $('#login_username').val()
  var password = $('#login_password').val()
  // ユーザ名とパスワードでログイン
  ncmb.User.login(userName, password)
    .then(function (user) {
      alert('ログイン成功')
      currentLoginUser = ncmb.User.getCurrentUser()
      $.mobile.changePage('#DetailPage')
    })
    .catch(function (error) {
      alert('ログイン失敗！次のエラー発生：' + error)
    })
}

function onLogoutBtn () {
  ncmb.User.logout()
  alert('ログアウト成功')
  currentLoginUser = null
  $.mobile.changePage('#LoginPage')
}