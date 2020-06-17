import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ItemDetail} from '~/entity/grade';
import detailPageBehavior from '~/common/detailPageBehavior';

const detailPage = detailPageBehavior(global.actions.grade, 'detail');

interface StoreProps {
  itemDetail?: ItemDetail;
  inited: boolean;
  cates: {[cid: string]: string};
  clientPublishPath: string;
}
interface OwnerProps {}
interface ComponentState {
  singUpType: string;
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state, data) => {
  const projectConfig = state.app!.projectConfig;
  if (projectConfig) {
    const props = detailPage.mapStateToProps(state.grade!, data);
    const {clientPublishPath, cates} = projectConfig;
    return {...props, inited: true, clientPublishPath, cates};
  } else {
    return {} as StoreProps;
  }
});

const initData: any = {
  singUpType: 0,
};
component<Data, {}, Methods>({
  behaviors: [detailPage.behavior],
  data: initData,
  methods: {
    onSingUpTypeChange(event: {detail: string}) {
      this.setData({
        singUpType: event.detail,
      });
    },
  },
});
