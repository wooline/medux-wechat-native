export const metaKeys = {
  ApiServerPath: 'http://localhost:7445/api',
  //ApiServerPath: 'http://192.168.31.53:7445/api',
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl',
};
export enum CommonErrorCode {
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  redirect = 'redirect',
  refresh = 'refresh',
  authorizeExpired = 'authorizeExpired',
  handled = 'handled',
  noToast = 'noToast',
}
export type ExcludeNull<T> = {[K in keyof T]-?: T[K] extends null ? never : K}[keyof T];
export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
//export type PickOptional<T> = Pick<T, {[K in keyof T]-?: unknown extends {[P in K]: T[K]} ? K : never}[keyof T]>;

export const message = {
  success: (title: string) => {
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000,
    });
  },
  error: (title: string) => {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000,
    });
  },
};

export function navToItem(type: string, id: string) {
  global.historyActions.navigateTo(`/${type}/Detail?q={"${type}":{"itemView":"detail","itemId":"${id}"}}`);
}
export function navToList(type: string) {
  const pages = {
    contest: '/contest/category',
    article: '/article/category',
    grade: '/grade/list',
  };
  if (type === 'contest' || type === 'article') {
    global.historyActions.switchTab(pages[type]);
  } else {
    global.historyActions.navigateTo(pages[type]);
  }
}
export function navToSubList(type: string, subId: string) {
  global.historyActions.navigateTo(`/${type}/List?q={"${type}":{"listSearch":{"category":"${subId}"}}}`);
}
