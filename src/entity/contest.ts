import {BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

import {ListItem as BaseListItem} from './post';

export interface ListItem extends BaseListItem {
  extra: {
    addr: string;
    signUpTime: number;
    activeTime: [number, number];
  };
}
export interface ListSearch extends BaseListSearch {}
export interface ListSummary extends BaseListSummary {}

export interface RouteParams extends CommonResourceRouteParams {
  listSearch: ListSearch;
}
export interface Resource extends CommonResource {
  RouteParams: RouteParams;
  ListSearch: ListSearch;
  ListItem: ListItem;
  ListSummary: ListSummary;
}

export const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    term: undefined,
    category: 'all',
  },
  listView: '',
  listKey: '',
  itemId: '',
  itemView: '',
  itemKey: '',
};
