import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

export interface ListItem extends BaseListItem {
  name: string;
  gender: number;
  mobile: string;
  birthday: string;
  iid: string;
  dressSize: number;
  addr: string;
  createdTime: number;
}
export interface ItemDetail extends ListItem {}

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
};
