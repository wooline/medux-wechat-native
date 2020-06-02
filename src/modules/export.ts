import * as appModule from './app/module';
import * as articleModule from './article/module';
import * as contestModule from './contest/module';
import * as myModule from './my/module';
import * as postModule from './post/module';
import * as shopModule from './shop/module';
import * as wechat from '@medux/wechat';

import {LocationMap, RouteConfig, exportActions} from '@medux/wechat';

import adminRoleParams from './post/meta';

export const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  article: null,
  post: adminRoleParams,
  shop: null,
  contest: null,
  my: null,
};

export enum moduleNames {
  app = 'app',
  article = 'article',
  post = 'post',
  shop = 'shop',
  contest = 'contest',
  my = 'my',
}

// 定义模块的加载方案，同步或者异步均可
export const moduleGetter = {
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
  },
};
export const actions = exportActions(moduleGetter);

export type RootState = wechat.RootState<typeof moduleGetter>;

export type RouteViews = wechat.RouteViews<typeof moduleGetter>;

export type BrowserRouter = wechat.BrowserRouter<RootState['route']['data']['params']>;

export const locationMap: LocationMap = {
  in(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);
    if (arr) {
      const pathname = location.pathname.replace(arr[0], arr[1]).replace(/\/page$/, '');
      return {...location, pathname};
    }
    return location;
  },
  out(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);
    if (!arr) {
      const pathname = '/modules' + location.pathname.replace(/(^\/\w+\/)/, '$1views/') + '/page';
      return {...location, pathname};
    }

    return location;
  },
};

export const routeConfig: RouteConfig = {
  '/': [
    'app.Main',
    {
      '/app/Welcome': 'app.Welcome',
      '/app/Home': 'app.Home',
      '/post/List': 'post.List',
      '/article/Outdoors': 'article.Outdoors',
    },
  ],
};
