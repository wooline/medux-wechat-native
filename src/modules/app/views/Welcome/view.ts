import {connectPage} from '@medux/wechat';

interface Props {
  timer: number;
}
interface Data {
  countdown: number;
}

interface Config {
  [key: string]: any;
}

const page = connectPage<RootState, Props>((state) => {
  return {timer: state.app!.projectConfig!.startupPage.times};
});

let nid = 0;
const view: any = page<Data & Props, Config>({
  data: {
    timer: 0,
    countdown: 0,
  },
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
  onLoad() {
    this.setData({countdown: this.data.timer});
  },
});

export default view;
