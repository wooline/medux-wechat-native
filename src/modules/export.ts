import * as wechat from '@medux/wechat';

import {LocationMap, RouteConfig, exportActions} from '@medux/wechat';

import {defaultRouteParams as postParams} from '~/entity/post';

export const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  article: null,
  post: postParams,
  shop: null,
  contest: null,
  my: null,
  test: null,
};

export enum moduleNames {
  app = 'app',
  article = 'article',
  post = 'post',
  shop = 'shop',
  contest = 'contest',
  my = 'my',
  test = 'test',
}

export const moduleGetter = {
  app: () => {
    return {} as typeof import('./app/module');
  },
  article: () => {
    return {} as typeof import('./article/module');
  },
  post: () => {
    return {} as typeof import('./post/module');
  },
  contest: () => {
    return {} as typeof import('./contest/module');
  },
  shop: () => {
    return {} as typeof import('./shop/module');
  },
  my: () => {
    return {} as typeof import('./my/module');
  },
  test: () => {
    return {} as typeof import('./test/module');
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
