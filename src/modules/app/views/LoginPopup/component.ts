import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {CurUser} from '~/entity/session';

interface StoreProps {
  showLoginPopup: boolean;
  curUser: CurUser;
}
interface OwnerProps {}
interface ComponentState {
  tabActived: number;
}
interface Methods extends DispatchProp {
  [key: string]: any;
}
type Data = StoreProps & OwnerProps & ComponentState;
type Properties = Record<keyof OwnerProps, any>;

const component = connectComponent<RootState, StoreProps>(
  module,
  (state) => {
    return {
      showLoginPopup: state.app!.showLoginPopup,
      curUser: state.app!.curUser,
    };
  },
  (dispatch) => {
    return {
      closePopup() {
        dispatch(global.actions.app.showLoginPopup(false));
      },
    };
  }
);
const initData: any = {
  tabActived: 0,
};
component<Data, Properties, Methods>({
  data: initData,
  methods: {
    bindGetUserInfo(e: any) {
      this.dispatch!(global.actions.app.loginWithWechat(e.detail.userInfo));
    },
    login() {
      this.dispatch!(global.actions.app.login({username: '', password: ''}));
    },
    switchTab() {
      const tabActived = this.data.tabActived ? 0 : 1;
      this.setData({tabActived});
    },
    maskEvents() {
      return false;
    },
  },
});
