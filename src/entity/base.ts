export interface BaseListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  recommend?: string[];
  categorys?: {id: string; name: string; list: string[]}[];
}

export interface BaseListItem {
  id: string;
}

export type BaseItemDetail = BaseListItem;

export interface BaseListSearch {
  pageCurrent?: number;
  pageSize?: number;
  term?: string;
  category?: string;
  sorterOrder?: 'ascend' | 'descend';
  sorterField?: string;
}

export type ListSearchFormData<F> = Required<Omit<F, keyof BaseListSearch>>;

export type ListView = 'list' | 'selector' | 'category' | '';
export type ItemView = 'detail' | 'edit' | 'create' | 'summary' | '';
export interface CommonResourceRouteParams<L = never, I = never> {
  listView: ListView | L;
  listSearch: BaseListSearch;
  listKey: number;
  itemView: ItemView | I;
  itemId: string;
  itemKey: number;
}

export interface CommonResource<L = never, I = never> {
  RouteParams: CommonResourceRouteParams;
  ListSearch: BaseListSearch;
  ListItem: BaseListItem;
  ListSummary: BaseListSummary;
  ListView: ListView | L;
  ItemDetail: BaseItemDetail;
  ItemView: ItemView | I;
  CreateItem: any;
  UpdateItem: any;
}

export interface ListData {
  listKey?: string;
  list?: CommonResource['ListItem'][];
  listSummary?: CommonResource['ListSummary'];
  listSearch?: CommonResource['ListSearch'];
}

export interface ItemData {
  itemKey?: string;
  itemDetail?: CommonResource['ItemDetail'];
}
export interface TabNav {
  id: string;
  title: string;
  url: string;
}
