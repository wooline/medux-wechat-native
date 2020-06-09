import * as module from '../../module';

import {DispatchProp, connectPage} from '@medux/wechat';
import {ListItem, ListSearch, ListSummary} from '~/entity/contest';

interface StoreProps {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  inited: boolean;
  cates: {[cid: string]: string};
  clientPublishPath: string;
}
interface OwnerProps {}
interface ComponentState {}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps, {}, Data>(module, (state, data) => {
  const projectConfig = state.app!.projectConfig;
  if (projectConfig) {
    const {clientPublishPath, cates} = projectConfig;
    const moduleState = state.contest!;
    const {list, listSummary} = moduleState;
    const listSearch = moduleState.routeParams!.listSearch;
    return {list, listSearch, listSummary, inited: true, clientPublishPath, cates};
  } else {
    return {} as StoreProps;
  }
});

page<Data, Methods>({
  onShow() {
    this.getTabBar().init();
  },
});
