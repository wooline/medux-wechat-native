import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

import {ListItem as Master} from './contact';

export interface ListItem extends BaseListItem {
  cid: string;
  cgid: string;
  cname: string;
  cgname: string;
  price: number;
  thumb: string;
  activeTime: [number, number];
  signUpTime: [number, number];
  createdTime: number;
  master: Master;
}
export interface ItemDetail extends ListItem {}

export interface ListSearch extends BaseListSearch {}
export interface ListSummary extends BaseListSummary {}

export interface RouteParams extends CommonResourceRouteParams {
  listSearch: ListSearch;
  cid: string;
  cgid: string;
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
    category: undefined,
  },
  listView: '',
  listKey: 0,
  itemId: '',
  itemView: '',
  itemKey: 0,
  cid: '',
  cgid: '',
};
