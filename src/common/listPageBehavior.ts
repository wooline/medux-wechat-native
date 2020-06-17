import {BaseListItem, BaseListSearch, BaseListSummary, ListView} from '~/entity/base';

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

export default function (actions: {changeListPageCurrent: Function}, listView: ListView) {
  return {
    // mapStateToProps: <D extends Data>(moduleState: CommonResourceState, componentData: D) => {
    //   type Result = Pick<D, keyof StoreProps>;
    //   const listData: ListData = moduleState[listView] || {};
    //   let {list} = listData;
    //   const {listSearch = {}, listSummary} = listData;
    //   if (componentData.listSummary !== listSummary) {
    //     if (componentData.listSummary && listSummary && componentData.listSummary.pageCurrent < listSummary.pageCurrent) {
    //       let index = componentData.list!.length;
    //       const newData = {listSummary};
    //       list!.forEach((item) => {
    //         newData['list[' + index++ + ']'] = item;
    //       });
    //       return newData as Result;
    //     }
    //   } else {
    //     list = componentData.list;
    //   }
    //   return {list, listSummary, listSearch} as Result;
    // },
    mapStateToProps: <D extends Data>(moduleState: CommonResourceState, componentData: D) => {
      type Result = Pick<D, keyof StoreProps>;
      const listData = moduleState[listView];
      if (listData) {
        let {list} = listData;
        const {listSearch = {}, listSummary} = listData;
        if (componentData.listSummary !== listSummary) {
          if (componentData.listSummary && listSummary && componentData.listSummary.pageCurrent < listSummary.pageCurrent) {
            console.log('addPage');
            let index = componentData.list!.length;
            const newData = {listSummary};
            list!.forEach((item) => {
              newData['list[' + index++ + ']'] = item;
            });
            return newData as Result;
          }
        } else {
          //和store中的list不再是同一个对象，只要listSummary没更新则本地不更新
          list = componentData.list!;
        }
        return {list, listSummary, listSearch};
      } else {
        return {};
      }
    },
    behavior: Behavior<Data, {}, Methods>({
      behaviors: [],
      data: {
        refreshing: false,
        loadMore: false,
      },
      methods: {
        onRefresh() {
          if (this.data.refreshing) {
            return;
          }
          this.setData({
            refreshing: true,
          });
          this.dispatch!(actions.changeListPageCurrent(1));
          setTimeout(() => {
            this.setData({
              refreshing: false,
            });
          }, 1000);
        },
        onMore() {
          const {pageCurrent, totalPages} = this.data.listSummary!;
          if (this.data.loadMore || pageCurrent >= totalPages) {
            return;
          }
          this.setData({
            loadMore: true,
          });
          console.log('loadMore...');
          this.dispatch!(actions.changeListPageCurrent(pageCurrent + 1));
          setTimeout(() => {
            this.setData({
              loadMore: false,
            });
          }, 1000);
        },
      },
    }),
  };
}
