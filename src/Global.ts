// 将某些常用变量提升至global，对全局变量有洁癖者可忽略此文件

import {actions, moduleNames} from './modules/export';
import {message, metaKeys} from './common/base';

import {Store} from 'redux';
import request from './common/request';

type Actions = typeof actions;
type MetaKeys = typeof metaKeys;
type Message = typeof message;
type EnumModuleNames = typeof moduleNames;
type Request = typeof request;

declare global {
  type BrowserRouter = import('./modules/export').BrowserRouter;
  type RootState = import('./modules/export').RootState;
  type RouteViews = import('./modules/export').RouteViews;
  type RouteData = RootState['route']['data'];
  type BaseRouteData = import('@medux/wechat').RouteData;
  type CommonErrorCode = import('./common/base').CommonErrorCode;
  type DispatchProp = import('@medux/wechat').DispatchProp;
  interface GlobalData {
    isIOS?: boolean;
    navHeight: number;
    navPaddingTop: number;
    menuButtonBoundingClientRect?: WechatMiniprogram.Rect;
  }
  interface APP {
    globalData: GlobalData;
  }
  interface ENV {
    store: Store;
    actions: Actions;
    moduleNames: EnumModuleNames;
    metaKeys: MetaKeys;
    request: Request;
    historyActions: BrowserRouter['historyActions'];
    toUrl: BrowserRouter['toUrl'];
    transformRoute: BrowserRouter['transformRoute'];
    message: Message;
  }
  const global: ENV;
}

global.actions = actions;
global.moduleNames = moduleNames;
global.message = message;
global.request = request;
global.metaKeys = metaKeys;
