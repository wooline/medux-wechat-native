import * as module from '../../module';

import {ItemDetail} from '~/entity/contest';
import {connectPage} from '@medux/wechat';

interface StoreProps {
  itemDetail?: ItemDetail;
}
interface OwnerProps {
  gindex: number;
  gid: string;
}
interface ComponentState {}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps, Methods, Data>(module, (state) => {
  console.log(111);
  return {itemDetail: state.contest?.detail?.itemDetail};
});

page<Data, Methods>({
  signUp() {
    global.message.success('报名成功！');
  },
  navBack() {
    global.historyActions.navigateBack(1);
  },
  onLoad(query: {gid: string; gindex: string}) {
    this.setData({gid: query.gid, gindex: parseInt(query.gindex)});
  },
});
