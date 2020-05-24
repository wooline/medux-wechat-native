import * as appModule from './app/export';
import * as wechat from '@medux/wechat';

import {RouteConfig, exportActions} from '@medux/wechat';

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

export const routeConfig: RouteConfig = {
  '/$': '@./admin/home',
  '/': [
    'app.Main',
    {
      '/login': 'app.LoginPage',
      '/register': 'app.RegisterPage',
      '/admin$': '@./admin/home',
      '/admin': [
        'adminLayout.Main',
        {
          '/admin/home': 'adminHome.Main',
          '/admin/role/:listView': [
            'adminRole.List',
            {
              '/admin/role/:listView/:itemView/:itemId': 'adminRole.Detail',
            },
          ],
          '/admin/member/:listView': [
            'adminMember.List',
            {
              '/admin/member/:listView/:itemView/:itemId': 'adminMember.Detail',
            },
          ],
          '/admin/post/:listView': [
            'adminPost.List',
            {
              '/admin/post/:listView/:itemView/:itemId': 'adminPost.Detail',
            },
          ],
        },
      ],
      '/article$': '@./article/home',
      '/article': [
        'articleLayout.Main',
        {
          '/article/home': 'articleHome.Main',
          '/article/about': 'articleAbout.Main',
          '/article/service': 'articleService.Main',
        },
      ],
    },
  ],
};
