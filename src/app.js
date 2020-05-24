"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./Global");

var _export = require("./modules/export");

var _wechat = require("@medux/wechat");

var _wechatReduxDevtools = _interopRequireDefault(require("@medux/wechat-redux-devtools"));

(0, _wechat.buildApp)({
  moduleGetter: _export.moduleGetter,
  appModuleName: 'app',
  routeConfig: _export.routeConfig,
  defaultRouteParams: _export.defaultRouteParams,
  storeOptions: {
    enhancers: [(0, _wechatReduxDevtools.default)({
      realtime: true,
      port: 8000,
      maxAge: 30
    })]
  },
  beforeRender: function beforeRender(_ref) {
    var store = _ref.store,
        historyActions = _ref.historyActions,
        toBrowserUrl = _ref.toBrowserUrl,
        transformRoute = _ref.transformRoute;
    global.historyActions = historyActions;
    global.toUrl = toBrowserUrl;
    global.transformRoute = transformRoute;
    return store;
  }
});
App({
  globalData: {},

  onLaunch() {
    var _this = this;

    console.log('...onLaunch');
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    wx.login({
      success: function success(res) {
        console.log(res.code);
      }
    });
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function success(res) {
              _this.globalData.userInfo = res.userInfo;

              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  }

});