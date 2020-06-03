import * as module from '../../module';

import {DispatchProp, connectPage} from '@medux/wechat';
import {ListItem, ListSearch, ListSummary} from '~/entity/post';

interface Props {
  list?: ListItem[];
  listSummary?: ListSummary;
}
interface Data {
  refreshing: boolean;
  loadMore: boolean;
}

interface Config {
  [key: string]: any;
}

export const page = connectPage<RootState, Props>(module, (state) => {
  const thisModule = state.post!;
  const {list, listSummary} = thisModule;
  return {list, listSummary, listSearch: thisModule.routeParams?.listSearch!};
});

const view: any = page<Data & Props, Config & DispatchProp>({
  data: {
    refreshing: false,
    loadMore: false,
  },
  onRefresh() {
    console.log('onRefresh');
    if (this.data.refreshing) {
      return;
    }
    console.log('refresh start');
    this.dispatch!(global.actions.post.refreshListSearch());

    this.setData({
      refreshing: true,
    });
    //this.dispatch();
    setTimeout(() => {
      this.setData({
        refreshing: false,
      });
      console.log('refresh end');
    }, 3000);
  },
  onMore() {
    console.log('onMore');
    if (this.data.loadMore) {
      return;
    }
    console.log('loadMore start');
    this.setData({
      loadMore: true,
    });
    setTimeout(() => {
      this.setData({
        loadMore: false,
      });
      console.log('loadMore end');
    }, 3000);
  },
});
