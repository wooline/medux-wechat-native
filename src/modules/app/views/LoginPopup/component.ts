import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {CurUser} from '~/entity/session';

interface StoreProps {
  showLoginPopup: boolean;
  curUser: CurUser;
}
interface OwnerProps {}
interface ComponentState {}
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

component<Data, Properties, Methods>({
  methods: {
    login() {
      this.dispatch!(global.actions.app.login({username: '', password: ''}));
    },
    maskEvents() {
      return false;
    },
  },
});
