import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ItemDetail} from '~/entity/article';
import detailPageBehavior from '~/common/detailPageBehavior';

const detailPage = detailPageBehavior(global.actions.article, 'detail');

interface StoreProps {
  itemDetail?: ItemDetail;
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
    const props = detailPage.mapStateToProps(state.article!, data);
    const {clientPublishPath, cates} = projectConfig;
    return {...props, inited: true, clientPublishPath, cates};
  } else {
    return {} as StoreProps;
  }
});

component<Data, {}, Methods>({
  behaviors: [detailPage.behavior],
});
