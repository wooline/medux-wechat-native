import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ItemDetail} from '~/entity/contact';
import computedBehavior from 'miniprogram-computed';

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
  return {itemDetail: state.contact?.detail?.itemDetail};
});

const initData: Partial<Data> = {
  itemDetail: undefined,
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
  behaviors: [computedBehavior],
  data: initData as Data,
  watch: {
    itemDetail: function (itemDetail?: ItemDetail) {
      if (itemDetail) {
        this.setData({
          ...itemDetail,
        });
      }
    },
  },
  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },
    submit() {
      global.historyActions.navigateBack(1);
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
  },
});
