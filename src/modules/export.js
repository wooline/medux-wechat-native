"use strict";

exports.__esModule = true;
exports.routeConfig = exports.locationMap = exports.actions = exports.moduleGetter = exports.moduleNames = exports.defaultRouteParams = void 0;

var _wechat = require("@medux/wechat");

var _contest = require("../entity/contest");

var _post = require("../entity/post");

const defaultRouteParams = {
  app: null,
  article: null,
  post: _post.defaultRouteParams,
  shop: null,
  contest: _contest.defaultRouteParams,
  my: null,
  test: null
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
  moduleNames["my"] = "my";
  moduleNames["test"] = "test";
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
  shop: () => {
    return {};
  },
  my: () => {
    return {};
  },
  test: () => {
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
      const pathname = location.pathname.replace(arr[0], arr[1]).replace(/\/page$/, '');
      return Object.assign(Object.assign({}, location), {}, {
        pathname
      });
    }

    return location;
  },

  out(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);

    if (!arr) {
      const pathname = '/modules' + location.pathname.replace(/(^\/\w+\/)/, '$1views/') + '/page';
      return Object.assign(Object.assign({}, location), {}, {
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
    '/contest/:listView': 'contest.List',
    '/article/Outdoors': 'article.Outdoors'
  }]
};
exports.routeConfig = routeConfig;