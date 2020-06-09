import './Global';

import * as appModule from './modules/app/module';

import {buildApp, setLoadingDepthTime} from '@medux/wechat';
import {defaultRouteParams, locationMap, moduleGetter, routeConfig} from './modules/export';

import reduxDevtools from '@medux/wechat-redux-devtools';

setLoadingDepthTime(1);

buildApp({
  moduleGetter,
  appModule,
  routeConfig,
  locationMap,
  defaultRouteParams,
  storeOptions: {
    enhancers: [
      reduxDevtools({
        realtime: false,
        port: 8000,
      }),
    ],
  },
  beforeRender: ({store, historyActions, toBrowserUrl, transformRoute}) => {
    global.historyActions = historyActions;
    global.toUrl = toBrowserUrl;
    global.transformRoute = transformRoute;
    global.store = store;
    return store;
  },
});

App<APP>({
  globalData: {} as any,
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    if (!systemInfo.statusBarHeight) {
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    const isIOS = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    const rect = getMenuButtonBoundingClientRect(systemInfo);
    const gap = rect.top - systemInfo.statusBarHeight;
    const navHeight = systemInfo.statusBarHeight + rect.height + gap * 2;
    const navPaddingTop = systemInfo.statusBarHeight;
    this.globalData.navHeight = navHeight;
    this.globalData.navPaddingTop = navPaddingTop;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // // 登录
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // });
    // // 获取用户信息
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: (res) => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         },
    //       });
    //     }
    //   },
    // });
  },
});

function getMenuButtonBoundingClientRect(systemInfo: WechatMiniprogram.GetSystemInfoSyncResult): WechatMiniprogram.Rect {
  const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
  let rect = wx.getMenuButtonBoundingClientRect();
  if (!rect || !rect.width || !rect.top || !rect.left || !rect.height) {
    let gap = 0; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度
    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      if (ios) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width,
    };
  }
  return rect;
}
