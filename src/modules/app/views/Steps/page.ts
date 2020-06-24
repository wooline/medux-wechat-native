import * as module from '../../module';

import {connectPage} from '@medux/wechat';

interface StoreProps {
  steps: number[];
  sizes: number[];
}
interface OwnerProps {}
interface ComponentState {
  _steps: number[];
}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps, Methods, Data>(module, (state, data) => {
  const steps = state.app!.steps;
  if (data._steps !== steps) {
    const max = Math.max(...steps);
    const unit = 200 / max;
    const sizes = steps.map((n) => Math.floor(n * unit));
    return {steps, sizes, _steps: steps};
  } else {
    return {} as any;
  }
});

page<Data, Methods>({});
