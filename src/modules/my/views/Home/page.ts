import * as module from '../../module';

import {connectPage, errorAction} from '@medux/wechat';

global.historyActions.block((location) => {
  const state: RootState = global.store.getState();
  if (!state.app!.curUser.loggedIn) {
    if (location.pathname === '/modules/my/views/Home/page') {
      global.store.dispatch(errorAction({code: global.commonErrorCode.unauthorized}));
      return false;
    }
  }
  return true;
});

interface StoreProps {
  nickName: string;
  gender: number;
  avatar: string;
  score: number;
}

interface OwnerProps {}
interface ComponentState {}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps>(module, (state) => {
  const {nickName, gender, avatar, score} = state.app!.curUser;
  return {nickName, gender, avatar, score};
});

page<Data, Methods>({
  navTo(e: any) {
    const url = e.currentTarget.dataset.url;
    global.historyActions.navigateTo(url);
  },
  onShow() {
    this.getTabBar().init();
  },
});
