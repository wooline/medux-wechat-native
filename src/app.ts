import './Global';

import * as appModule from './modules/app/module';

import {defaultRouteParams, locationMap, moduleGetter, routeConfig} from './modules/export';

import {buildApp} from '@medux/wechat';

//import reduxDevtools from '@medux/wechat-redux-devtools';

buildApp({
  moduleGetter,
  appModule,
  routeConfig,
  locationMap,
  defaultRouteParams,
  storeOptions: {
    enhancers: [
      // reduxDevtools({
      //   realtime: true,
      //   port: 8000,
      // }),
    ],
  },
  beforeRender: ({store, historyActions, toBrowserUrl, transformRoute}) => {
    global.historyActions = historyActions;
    global.toUrl = toBrowserUrl;
    global.transformRoute = transformRoute;

    return store;
  },
});

App<any>({
  globalData: {
    navHeight: 0,
  },
  onLaunch() {
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const res = wx.getSystemInfoSync();

    wx.getSystemInfo({
      success: (res) => {
        const statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      },
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
});
