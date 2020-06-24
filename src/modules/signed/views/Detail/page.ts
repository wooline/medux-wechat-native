import * as module from '../../module';

import {DispatchProp, connectComponent, errorAction} from '@medux/wechat';

import {ItemDetail as Contact} from '~/entity/contact';
import {ItemDetail} from '~/entity/signed';
import computedBehavior from 'miniprogram-computed';
import navPageBehavior from '~/common/navPageBehavior';

global.historyActions.block((location) => {
  const state: RootState = global.store.getState();
  if (!state.app!.curUser.loggedIn) {
    if (location.pathname === '/modules/signed/views/Detail/page') {
      global.store.dispatch(errorAction({code: global.commonErrorCode.unauthorized}));
      return false;
    }
  }
  return true;
});

interface StoreProps {
  itemDetail?: ItemDetail;
}
interface OwnerProps {}
interface ComponentState {
  genderOptions: {id: number; name: string}[];
  dressSizeOptions: {id: number; name: string}[];
  name?: string;
  gender?: number;
  mobile?: string;
  birthday?: string;
  iid?: string;
  dressSize?: number;
  addr?: string;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state) => {
  return {itemDetail: state.signed?.detail?.itemDetail};
});

const initData: Partial<Data> = {
  genderOptions: [
    {
      id: 0,
      name: '女',
    },
    {
      id: 1,
      name: '男',
    },
  ],
  dressSizeOptions: [
    {
      id: 0,
      name: '小码',
    },
    {
      id: 1,
      name: '中码',
    },
    {
      id: 2,
      name: '大码',
    },
  ],
};
component<Data, {}, Methods>({
  behaviors: [computedBehavior, navPageBehavior],
  data: initData as Data,
  watch: {
    itemDetail: function (itemDetail?: ItemDetail) {
      if (itemDetail) {
        this.setData({
          ...itemDetail.master,
        });
      }
    },
  },

  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },
    submit() {
      wx.showModal({
        title: '报名成功',
        content: '接下来您要前往...',
        confirmText: '继续报名',
        cancelText: '我的赛事',
        success(res) {
          if (res.confirm) {
            const location = global.historyActions.getLocation();
            global.historyActions.redirectTo(location.pathname + location.search);
          } else if (res.cancel) {
            global.historyActions.switchTab('/my/home');
          }
        },
      });
    },
    onDressSizeChange(e: any) {
      this.setData({dressSize: parseInt(e.detail.value)});
    },
    onGenderChange(e: any) {
      this.setData({gender: parseInt(e.detail.value)});
    },
    onBirthdayChange(e: any) {
      this.setData({
        birthday: e.detail.value,
      });
    },
    onContactChange(e: any) {
      const item: Contact = e.detail.value;
      if (item) {
        this.setData(item);
      }
    },
  },
});
