import {BaseItemDetail, ItemData} from '~/entity/base';

import {CommonResourceState} from '~/common/resource';

interface StoreProps {
  itemDetail?: BaseItemDetail;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

export default function (actions: {refreshCurrentItem: Function}, itemView: string) {
  return {
    mapStateToProps: <D extends Data>(moduleState: CommonResourceState, componentData: D) => {
      type Result = Pick<D, keyof StoreProps>;
      const itemData: ItemData = moduleState[itemView] || {};
      const {itemDetail} = itemData;
      return {itemDetail} as Result;
    },
    behavior: Behavior<Data, {}, Methods>({
      behaviors: [],
      data: {
        refreshing: false,
      },
      methods: {
        onRefresh() {
          if (this.data.refreshing) {
            return;
          }
          this.setData({
            refreshing: true,
          });
          this.dispatch!(actions.refreshCurrentItem());
          setTimeout(() => {
            this.setData({
              refreshing: false,
            });
          }, 1000);
        },
      },
    }),
  };
}
