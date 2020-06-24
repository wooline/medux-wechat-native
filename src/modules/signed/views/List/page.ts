import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';
import {ListItem, ListSearch, ListSummary} from '~/entity/contact';

import listPageBehavior from '~/common/listPageBehavior';

const listPage = listPageBehavior(global.actions.contact, 'list');
interface StoreProps {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
  loadMore: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state, data) => {
  return listPage.mapStateToProps(state.contact!, data);
});

component<Data, {}, Methods>({
  behaviors: [listPage.behavior],
  methods: {
    navToDetail(e: any) {
      const index = e.target.dataset.index;
      const item = this.data.list![index];
      this.dispatch!(global.actions.contact.openCurrentItem(item));
    },
    createItem() {
      this.dispatch!(global.actions.contact.openCurrentItem());
    },
    deleteItem(e: any) {
      const index = e.target.dataset.index;
      const item = this.data.list![index];
      const dispatch = this.dispatch!;
      wx.showModal({
        title: '联系人: ' + item.name,
        content: '手机 ' + item.mobile,
        confirmText: '删除',
        success(res) {
          if (res.confirm) {
            dispatch(global.actions.contact.deleteList([item.id]));
          }
        },
      });
    },
  },
});
