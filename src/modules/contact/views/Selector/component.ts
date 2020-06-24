import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ListItem} from '~/entity/contact';
import computedBehavior from 'miniprogram-computed';

interface StoreProps {
  list?: ListItem[];
}
interface OwnerProps {}
interface ComponentState {
  options?: {id: string; name: string}[];
  index?: number;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state, data) => {
  return {list: state.contact!.selector?.list};
});

component<Data, {}, Methods>({
  behaviors: [computedBehavior],
  watch: {
    list(list?: ListItem[]) {
      if (list) {
        this.setData({
          index: -1,
          options: list.map((item) => ({id: item.id, name: item.name + ' ' + item.mobile})),
        });
      }
    },
  },
  lifetimes: {
    attached() {
      this.dispatch!(global.actions.contact.searchList({params: {}, extend: 'default'}, 'selector'));
    },
  },
  methods: {
    onSelect(e: any) {
      const index = parseInt(e.detail.value);
      const item = this.data.list![index];
      this.setData({index});
      this.triggerEvent('change', {value: item});
    },
  },
});
