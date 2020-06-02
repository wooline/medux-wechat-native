"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.routeConfig = exports.locationMap = exports.actions = exports.moduleGetter = exports.moduleNames = exports.defaultRouteParams = void 0;

var appModule = _interopRequireWildcard(require("./app/module"));

var articleModule = _interopRequireWildcard(require("./article/module"));

var contestModule = _interopRequireWildcard(require("./contest/module"));

var myModule = _interopRequireWildcard(require("./my/module"));

var postModule = _interopRequireWildcard(require("./post/module"));

var shopModule = _interopRequireWildcard(require("./shop/module"));

var _wechat = require("@medux/wechat");

var _meta = _interopRequireDefault(require("./post/meta"));

const defaultRouteParams = {
  app: null,
  article: null,
  post: _meta.default,
  shop: null,
  contest: null,
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
  moduleNames["my"] = "my";
})(moduleNames || (exports.moduleNames = moduleNames = {}));

const moduleGetter = {
  app: () => {
    return appModule;
  },
  article: () => {
    return articleModule;
  },
  post: () => {
    return postModule;
  },
  contest: () => {
    return contestModule;
  },
  shop: () => {
    return shopModule;
  },
  my: () => {
    return myModule;
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
    '/article/Outdoors': 'article.Outdoors'
  }]
};
exports.routeConfig = routeConfig;