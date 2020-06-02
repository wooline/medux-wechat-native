"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./Global");

var _export = require("./modules/export");

var _wechat = require("@medux/wechat");

var _wechatReduxDevtools = _interopRequireDefault(require("@medux/wechat-redux-devtools"));

(0, _wechat.buildApp)({
  moduleGetter: _export.moduleGetter,
  appModuleName: global.moduleNames.app,
  routeConfig: _export.routeConfig,
  locationMap: _export.locationMap,
  defaultRouteParams: _export.defaultRouteParams,
  storeOptions: {
    enhancers: [(0, _wechatReduxDevtools.default)({
      realtime: false,
      port: 8000
    })]
  },
  beforeRender: ({
    store,
    historyActions,
    toBrowserUrl,
    transformRoute
  }) => {
    global.historyActions = historyActions;
    global.toUrl = toBrowserUrl;
    global.transformRoute = transformRoute;
    return store;
  }
});
App({
  globalData: {
    navHeight: 0
  },

  onLaunch() {
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const res = wx.getSystemInfoSync();
    wx.getSystemInfo({
      success: res => {
        const statusBarHeight = res.statusBarHeight,
              navTop = menuButtonObject.top,
              navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },

      fail(err) {
        console.log(err);
      }

    });
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    wx.login({
      success: res => {
        console.log(res.code);
      }
    });
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  }

});