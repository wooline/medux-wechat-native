"use strict";

exports.__esModule = true;
exports.navToItem = navToItem;
exports.navToList = navToList;
exports.navToSubList = navToSubList;
exports.message = exports.CommonErrorCode = exports.metaKeys = void 0;
const metaKeys = {
  ApiServerPath: 'http://localhost:7445/api',
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl'
};
exports.metaKeys = metaKeys;
let CommonErrorCode;
exports.CommonErrorCode = CommonErrorCode;

(function (CommonErrorCode) {
  CommonErrorCode["unknown"] = "unknown";
  CommonErrorCode["notFound"] = "notFound";
  CommonErrorCode["unauthorized"] = "unauthorized";
  CommonErrorCode["forbidden"] = "forbidden";
  CommonErrorCode["redirect"] = "redirect";
  CommonErrorCode["refresh"] = "refresh";
  CommonErrorCode["authorizeExpired"] = "authorizeExpired";
  CommonErrorCode["handled"] = "handled";
  CommonErrorCode["noToast"] = "noToast";
})(CommonErrorCode || (exports.CommonErrorCode = CommonErrorCode = {}));

const message = {
  success: title => {
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000
    });
  },
  error: title => {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    });
  }
};
exports.message = message;

function navToItem(type, id) {
  global.historyActions.navigateTo(`/${type}/Detail?q={"${type}":{"itemView":"detail","itemId":"${id}"}}`);
}

function navToList(type) {
  const pages = {
    contest: '/contest/category',
    article: '/article/category',
    grade: '/grade/list'
  };

  if (type === 'contest' || type === 'article') {
    global.historyActions.switchTab(pages[type]);
  } else {
    global.historyActions.navigateTo(pages[type]);
  }
}

function navToSubList(type, subId) {
  global.historyActions.navigateTo(`/${type}/List?q={"${type}":{"listSearch":{"category":"${subId}"}}}`);
}