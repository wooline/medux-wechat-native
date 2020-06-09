import * as module from '../../module';

import {connectPage} from '@medux/wechat';

interface StoreProps {
  inited: boolean;
  linkUrl: string;
  imageUrl: string;
  times: number;
  countdown: number;
}
interface OwnerProps {}
interface ComponentState {}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps>(module, (state) => {
  const projectConfig = state.app!.projectConfig;
  if (projectConfig) {
    const clientPublishPath = projectConfig.clientPublishPath;
    const {imageUrl, linkUrl, times} = projectConfig!.startupPage;
    return {inited: true, imageUrl, linkUrl, times, countdown: times, clientPublishPath};
  } else {
    return {} as StoreProps;
  }
});

let nid = 0;

page<Data, Methods>({
  onSkip() {
    this.setData({countdown: 0});
  },
  onComplete() {
    if (this.data.countdown && !nid) {
      nid = setInterval(() => {
        if (this.data.countdown) {
          this.setData({countdown: this.data.countdown - 1});
        } else {
          clearInterval(nid);
          global.historyActions.navigateBack(1);
        }
      }, 1000);
    }
  },
});
