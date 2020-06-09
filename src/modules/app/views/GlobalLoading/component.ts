import * as module from '../../module';

import {LoadingState, connectComponent} from '@medux/wechat';

interface StoreProps {
  loadingState: LoadingState;
}
interface OwnerProps {}
interface ComponentState {}
interface Methods {
  [key: string]: any;
}
type Data = StoreProps & OwnerProps & ComponentState;
type Properties = Record<keyof OwnerProps, any>;

const component = connectComponent<RootState, StoreProps>(module, (state) => {
  return {
    loadingState: state.app!.loading.global,
  };
});

component<Data, Properties, Methods>({
  methods: {
    maskEvents() {
      return false;
    },
  },
});
