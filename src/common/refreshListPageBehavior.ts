import {BaseListItem, BaseListSearch, BaseListSummary, ListData} from '~/entity/base';

import {CommonResourceState} from '~/common/resource';

interface StoreProps {
  list?: BaseListItem[];
  listSummary?: BaseListSummary;
  listSearch?: BaseListSearch;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

export default function (actions: {changeListPageCurrent: Function}, listView: string) {
  return {
    mapStateToProps: <D extends Data>(moduleState: CommonResourceState, componentData: D) => {
      type Result = Pick<D, keyof StoreProps>;
      const listData: ListData = moduleState[listView] || {};
      const {list} = listData;
      const {listSummary, listSearch = {}} = listData;
      return {list, listSummary, listSearch} as Result;
    },
    behavior: Behavior<Data, {}, Methods>({
      behaviors: [],
      data: {
        refreshing: false,
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
      },
    }),
  };
}
