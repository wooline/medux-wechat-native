"use strict";

exports.__esModule = true;
exports.CommonErrorCode = exports.metaKeys = void 0;
var metaKeys = {
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl'
};
exports.metaKeys = metaKeys;
var CommonErrorCode;
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