"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.routeConfig = exports.locationMap = exports.actions = exports.moduleGetter = exports.moduleNames = exports.defaultRouteParams = void 0;

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
  app: () => {
    return appModule;
  }
};
exports.moduleGetter = moduleGetter;
var actions = (0, _wechat.exportActions)(moduleGetter);
exports.actions = actions;
var locationMap = {
  in(location) {
    var pathname = location.pathname.replace(/\/modules\/(.*)\/views/, '/$1').replace(/export$/, '');
    console.log(location.pathname, '=', pathname);
    return location;
  },

  out(location) {
    return location;
  }

};
exports.locationMap = locationMap;
var routeConfig = {
  '/': ['app.Main', {
    '/app/Welcome': 'app.Welcome',
    '/app/Startup': 'app.Startup'
  }]
};
exports.routeConfig = routeConfig;