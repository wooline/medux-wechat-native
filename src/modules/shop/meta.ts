import {RouteParams} from '~/entity/shop';
// 定义本模块的路由参数类型

const defaultRouteParams: RouteParams = {
  listSearch: {
    pageSize: 10,
    pageCurrent: 1,
    sorterField: undefined,
    sorterOrder: undefined,
    term: 'abcde',
  },
  listView: '',
  listKey: 0,
  itemId: '',
  itemView: '',
  itemKey: 0,
};
export default defaultRouteParams;
