import * as wechat from '@medux/wechat';

import {LocationMap, RouteConfig, exportActions} from '@medux/wechat';

import {defaultRouteParams as articleParams} from '~/entity/article';
import {defaultRouteParams as contestParams} from '~/entity/contest';
import {defaultRouteParams as gradeParams} from '~/entity/grade';
import {defaultRouteParams as postParams} from '~/entity/post';

export const defaultRouteParams: {[K in moduleNames]: any} = {
  app: null,
  article: articleParams,
  post: postParams,
  shop: null,
  grade: gradeParams,
  contest: contestParams,
  my: null,
};

export enum moduleNames {
  app = 'app',
  article = 'article',
  post = 'post',
  shop = 'shop',
  contest = 'contest',
  grade = 'grade',
  my = 'my',
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
  grade: () => {
    return {} as typeof import('./grade/module');
  },
  shop: () => {
    return {} as typeof import('./shop/module');
  },
  my: () => {
    return {} as typeof import('./my/module');
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
      let pathname = location.pathname.replace(arr[0], arr[1]).replace(/\/page$/, '');
      pathname = pathname.toLocaleLowerCase();
      return {...location, pathname};
    }
    return location;
  },
  out(location) {
    const arr = location.pathname.match(/^\/modules(\/.*\/)views\//);
    if (!arr) {
      let pathname = '/modules' + location.pathname.replace(/(^\/\w+\/)/, '$1views/') + '/page';
      pathname = pathname.replace(/\w(?=\w+\/page)/, (a) => a.toLocaleUpperCase());
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
      '/contest/detail': 'contest.Detail',
      '/contest/:listView': 'contest.List',
      '/grade/detail': 'grade.Detail',
      '/grade/:listView': 'grade.List',
      '/article/detail': 'article.Detail',
      '/article/:listView': 'article.List',
    },
  ],
};
