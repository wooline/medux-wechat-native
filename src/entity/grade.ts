import {BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

import {ListItem as BaseListItem} from './contest';

export interface Group {
  id: string;
  name: string;
  grades: {name: string; avatar: string}[];
}

export interface ListItem extends BaseListItem {
  groups: Group[];
}
export interface ItemDetail extends ListItem {
  groups: Group[];
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
    category: undefined,
  },
  listView: '',
  listKey: 0,
  itemId: '',
  itemView: '',
  itemKey: 0,
};
