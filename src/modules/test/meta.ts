import {RouteParams} from '~/entity/my';
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
  listKey: '',
  itemId: '',
  itemView: '',
  itemKey: '',
};
export default defaultRouteParams;
