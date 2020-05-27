import * as appModule from './app/export';
import * as wechat from '@medux/wechat';

import {LocationMap, RouteConfig, exportActions} from '@medux/wechat';

export const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
};

export enum moduleNames {
  app = 'app',
}

// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
  app: () => {
    return appModule;
  },
};
export const actions = exportActions(moduleGetter);

export type RootState = wechat.RootState<typeof moduleGetter>;

export type RouteViews = wechat.RouteViews<typeof moduleGetter>;

export type BrowserRouter = wechat.BrowserRouter<RootState['route']['data']['params']>;

export const locationMap: LocationMap = {
  in(location) {
    const pathname = location.pathname.replace(/\/modules\/(.*)\/views/, '/$1').replace(/export$/, '');
    console.log(location.pathname, '=', pathname);
    return location;
  },
  out(location) {
    return location;
  },
};

export const routeConfig: RouteConfig = {
  '/': [
    'app.Main',
    {
      '/app/Welcome': 'app.Welcome',
      '/app/Startup': 'app.Startup',
    },
  ],
};
