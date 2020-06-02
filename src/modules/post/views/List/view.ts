import {ListItem, ListSearch, ListSummary} from '~/entity/post';

import {connectPage} from '@medux/wechat';

interface Props {
  list?: ListItem[];
  listSummary?: ListSummary;
}
interface Data {}

interface Config {
  [key: string]: any;
}

export const page = connectPage<RootState, Props>((state) => {
  const thisModule = state.post!;
  const {list, listSummary} = thisModule;
  return {list, listSummary, listSearch: thisModule.routeParams?.listSearch!};
});

const view: any = page<Data & Props, Config>({
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
  },
  onReachBottom() {
    wx.showNavigationBarLoading();
  },
});

export default view;
