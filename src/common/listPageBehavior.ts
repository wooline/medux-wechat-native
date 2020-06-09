import {BaseListItem, BaseListSearch, BaseListSummary} from '~/entity/base';

import {CommonResourceState} from '~/common/resource';

interface StoreProps {
  list?: BaseListItem[];
  listSummary?: BaseListSummary;
  listSearch?: BaseListSearch;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
  loadMore: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

export default function (actions: {changeListPage: Function}) {
  return {
    mapStateToProps: <D extends Data>(moduleState: CommonResourceState, componentData: D) => {
      type Result = Pick<D, keyof StoreProps>;
      let {list} = moduleState;
      const {listSummary} = moduleState;
      const listSearch = moduleState.routeParams!.listSearch;
      if (componentData.listSummary !== listSummary) {
        if (componentData.listSummary && listSummary && componentData.listSummary.pageCurrent < listSummary.pageCurrent) {
          console.log('add List');
          let index = componentData.list!.length;
          const newData = {listSummary};
          list!.forEach((item) => {
            newData['list[' + index++ + ']'] = item;
          });
          return newData as Result;
        }
      } else {
        list = componentData.list;
      }
      return {list, listSummary, listSearch} as Result;
    },
    behavior: Behavior<Data, {}, Methods>({
      behaviors: [],
      data: {
        refreshing: false,
        loadMore: false,
      },
      methods: {
        async onRefresh() {
          if (this.data.refreshing) {
            return;
          }
          this.setData({
            refreshing: true,
          });
          await this.dispatch!(actions.changeListPage(1));
          this.setData({
            refreshing: false,
          });
        },
        async onMore() {
          console.log('onMore');
          const {pageCurrent, totalPages} = this.data.listSummary!;
          if (this.data.loadMore || pageCurrent >= totalPages) {
            return;
          }
          console.log('loadMore start');
          this.setData({
            loadMore: true,
          });
          await this.dispatch!(actions.changeListPage(pageCurrent + 1));
          this.setData({
            loadMore: false,
          });
          console.log('loadMore end');
        },
      },
    }),
  };
}
