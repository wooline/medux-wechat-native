import {BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

import {ListItem as BaseListItem} from './post';

export interface Group {
  id: string;
  name: string;
  price: number;
}
export interface ListItem extends BaseListItem {
  addr: string;
  signUpTime: [number, number];
  activeTime: [number, number];
}
export interface ListSearch extends BaseListSearch {}
export interface ListSummary extends BaseListSummary {}
export interface ItemDetail extends ListItem {
  groups: Group[];
}

export interface RouteParams extends CommonResourceRouteParams {
  listSearch: ListSearch;
}
export interface Resource extends CommonResource {
  RouteParams: RouteParams;
  ListSearch: ListSearch;
  ListItem: ListItem;
  ListSummary: ListSummary;
  ItemDetail: ItemDetail;
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
  listKey: 0,
  itemId: '',
  itemView: '',
  itemKey: 0,
};
