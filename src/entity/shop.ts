import {BaseListItem, BaseListSearch, BaseListSummary, CommonResource, CommonResourceRouteParams} from './base';

export interface ListItem extends BaseListItem {
  title: string;
  summary: string;
  thumb: string;
  link: string;
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
