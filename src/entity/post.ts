import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

export interface ListItem extends BaseListItem {
  type: string;
  title: string;
  summary: string;
  thumb: string;
  link: string;
  cate: string;
  createdTime: number;
  updatedTime: number;
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
  },
  listView: '',
  listKey: '',
  itemId: '',
  itemView: '',
  itemKey: '',
};
