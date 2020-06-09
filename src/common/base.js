"use strict";

exports.__esModule = true;
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