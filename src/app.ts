import './Global';

import {defaultRouteParams, locationMap, moduleGetter, routeConfig} from './modules/export';

import {buildApp} from '@medux/wechat';
import reduxDevtools from '@medux/wechat-redux-devtools';

buildApp({
  moduleGetter,
  appModuleName: global.moduleNames.app,
  routeConfig,
  locationMap,
  defaultRouteParams,
  storeOptions: {
    enhancers: [
      reduxDevtools({
        realtime: true,
        port: 8000,
      }),
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
  globalData: {},
  onLaunch() {
    console.log('...onLaunch');
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
