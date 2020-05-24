"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.routeConfig = exports.actions = exports.moduleGetter = exports.moduleNames = exports.defaultRouteParams = void 0;

var appModule = _interopRequireWildcard(require("./app/export"));

var _wechat = require("@medux/wechat");

var defaultRouteParams = {
  app: null
};
exports.defaultRouteParams = defaultRouteParams;
var moduleNames;
exports.moduleNames = moduleNames;

(function (moduleNames) {
  moduleNames["app"] = "app";
})(moduleNames || (exports.moduleNames = moduleNames = {}));

var moduleGetter = {
  app: function app() {
    return appModule;
  }
};
exports.moduleGetter = moduleGetter;
var actions = (0, _wechat.exportActions)(moduleGetter);
exports.actions = actions;
var routeConfig = {
  '/$': '@./admin/home',
  '/': ['app.Main', {
    '/login': 'app.LoginPage',
    '/register': 'app.RegisterPage',
    '/admin$': '@./admin/home',
    '/admin': ['adminLayout.Main', {
      '/admin/home': 'adminHome.Main',
      '/admin/role/:listView': ['adminRole.List', {
        '/admin/role/:listView/:itemView/:itemId': 'adminRole.Detail'
      }],
      '/admin/member/:listView': ['adminMember.List', {
        '/admin/member/:listView/:itemView/:itemId': 'adminMember.Detail'
      }],
      '/admin/post/:listView': ['adminPost.List', {
        '/admin/post/:listView/:itemView/:itemId': 'adminPost.Detail'
      }]
    }],
    '/article$': '@./article/home',
    '/article': ['articleLayout.Main', {
      '/article/home': 'articleHome.Main',
      '/article/about': 'articleAbout.Main',
      '/article/service': 'articleService.Main'
    }]
  }]
};
exports.routeConfig = routeConfig;