"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("./Global");

var appModule = _interopRequireWildcard(require("./modules/app/module"));

var _wechat = require("@medux/wechat");

var _export = require("./modules/export");

(0, _wechat.setLoadingDepthTime)(1);
const {
  historyActions,
  toBrowserUrl,
  transformRoute,
  store
} = (0, _wechat.buildApp)({
  moduleGetter: _export.moduleGetter,
  appModule,
  routeConfig: _export.routeConfig,
  locationMap: _export.locationMap,
  defaultRouteParams: _export.defaultRouteParams,
  storeOptions: {
    enhancers: []
  }
});
global.historyActions = historyActions;
global.toUrl = toBrowserUrl;
global.transformRoute = transformRoute;
global.store = store;
App({
  globalData: {},

  onLaunch() {
    console.log(1);
    const systemInfo = wx.getSystemInfoSync();

    if (!systemInfo.statusBarHeight) {
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }

    const rect = getMenuButtonBoundingClientRect(systemInfo);
    const gap = rect.top - systemInfo.statusBarHeight;
    const navHeight = systemInfo.statusBarHeight + rect.height + gap * 2;
    const navPaddingTop = systemInfo.statusBarHeight;
    this.globalData.navHeight = navHeight;
    this.globalData.navPaddingTop = navPaddingTop;
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  }

});

function getMenuButtonBoundingClientRect(systemInfo) {
  const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
  let rect = wx.getMenuButtonBoundingClientRect();

  if (!rect || !rect.width || !rect.top || !rect.left || !rect.height) {
    let gap = 4;
    let width = 88;

    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      width = 96;

      if (ios) {
        gap = 5.5;
      } else {
        gap = 7.5;
      }
    }

    rect = {
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width
    };
  }

  return rect;
}