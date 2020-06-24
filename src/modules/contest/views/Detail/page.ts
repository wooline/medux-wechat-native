import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ItemDetail} from '~/entity/contest';
import detailPageBehavior from '~/common/detailPageBehavior';
import navPageBehavior from '~/common/navPageBehavior';

const detailPage = detailPageBehavior(global.actions.contest, 'detail');

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
    const props = detailPage.mapStateToProps(state.contest!, data);
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
  behaviors: [detailPage.behavior, navPageBehavior],
  data: initData,
  methods: {
    signUp(e: any) {
      const {id, gid} = e.currentTarget.dataset;
      global.historyActions.navigateTo({paths: ['app.Main', 'signed.Detail'], params: {signed: {itemId: 'create', itemView: 'detail', itemKey: Date.now(), cid: id, cgid: gid}}});
    },
    onSingUpTypeChange(event: {detail: string}) {
      this.setData({
        singUpType: event.detail,
      });
    },
  },
});
