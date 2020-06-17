import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';
import {ListItem, ListSearch, ListSummary} from '~/entity/contest';

import navPageBehavior from '~/common/navPageBehavior';
import refreshPageBehavior from '~/common/refreshListPageBehavior';

const listPage = refreshPageBehavior(global.actions.contest, 'category');

interface StoreProps {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  inited: boolean;
  cates: {[cid: string]: string};
  clientPublishPath: string;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state, data) => {
  const projectConfig = state.app!.projectConfig;
  if (projectConfig) {
    const props = listPage.mapStateToProps(state.contest!, data);
    const {clientPublishPath, cates} = projectConfig;
    return {...props, inited: true, clientPublishPath, cates};
  } else {
    return {} as StoreProps;
  }
});

component<Data, {}, Methods>({
  behaviors: [listPage.behavior, navPageBehavior],
  pageLifetimes: {
    show() {
      this.getTabBar().init();
    },
  },
});
