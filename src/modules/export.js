"use strict";

exports.__esModule = true;
exports.routeConfig = exports.locationMap = exports.actions = exports.moduleGetter = exports.moduleNames = exports.defaultRouteParams = void 0;

var _wechat = require("@medux/wechat");

var _article = require("../entity/article");

var _contact = require("../entity/contact");

var _contest = require("../entity/contest");

var _grade = require("../entity/grade");

var _post = require("../entity/post");

var _signed = require("../entity/signed");

const defaultRouteParams = {
  app: null,
  article: _article.defaultRouteParams,
  post: _post.defaultRouteParams,
  shop: null,
  grade: _grade.defaultRouteParams,
  contest: _contest.defaultRouteParams,
  contact: _contact.defaultRouteParams,
  signed: _signed.defaultRouteParams,
  my: null
};
exports.defaultRouteParams = defaultRouteParams;
let moduleNames;
exports.moduleNames = moduleNames;

(function (moduleNames) {
  moduleNames["app"] = "app";
  moduleNames["article"] = "article";
  moduleNames["post"] = "post";
  moduleNames["shop"] = "shop";
  moduleNames["contest"] = "contest";
  moduleNames["grade"] = "grade";
  moduleNames["my"] = "my";
  moduleNames["contact"] = "contact";
  moduleNames["signed"] = "signed";
})(moduleNames || (exports.moduleNames = moduleNames = {}));

const moduleGetter = {
  app: () => {
    return {};
  },
  article: () => {
    return {};
  },
  post: () => {
    return {};
  },
  contest: () => {
    return {};
  },
  grade: () => {
    return {};
  },
  shop: () => {
    return {};
  },
  my: () => {
    return {};
  },
  contact: () => {
    return {};
  },
  signed: () => {
    return {};
  }
};
exports.moduleGetter = moduleGetter;
const actions = (0, _wechat.exportActions)(moduleGetter);
exports.actions = actions;
const locationMap = {
  in(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);

    if (arr) {
      let pathname = location.pathname.replace(arr[0], arr[1]);
      pathname = pathname.replace(/\w(?=\w+\/page)/, a => a.toLowerCase()).replace(/\/page$/, '');
      return Object.assign({}, location, {
        pathname
      });
    }

    return location;
  },

  out(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);

    if (!arr) {
      let pathname = '/modules' + location.pathname.replace(/(^\/\w+\/)/, '$1views/') + '/page';
      pathname = pathname.replace(/\w(?=\w+\/page)/, a => a.toUpperCase());
      return Object.assign({}, location, {
        pathname
      });
    }

    return location;
  }

};
exports.locationMap = locationMap;
const routeConfig = {
  '/': ['app.Main', {
    '/app/Welcome': 'app.Welcome',
    '/app/Home': 'app.Home',
    '/post/List': 'post.List',
    '/contest/detail': 'contest.Detail',
    '/contest/signUp': 'contest.SignUp',
    '/contest/:listView': 'contest.List',
    '/grade/detail': 'grade.Detail',
    '/grade/:listView': 'grade.List',
    '/article/detail': 'article.Detail',
    '/article/:listView': 'article.List',
    '/contact/detail': 'contact.Detail',
    '/contact/:listView': 'contact.List',
    '/signed/detail': 'signed.Detail',
    '/signed/:listView': 'signed.List'
  }]
};
exports.routeConfig = routeConfig;