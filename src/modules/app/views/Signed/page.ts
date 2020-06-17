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
interface ComponentState {
  minDate: number;
  maxDate: number;
  selectedDate: number[];
  today: number;
  showPopup: boolean;
}
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

const today = new Date().getTime();

const selectedDates = {
  '2020-6-14': true,
  '2020-6-16': true,
  '2020-6-17': true,
};
const initData: any = {
  minDate: today - 1000 * 3600 * 24 * 30 * 3,
  maxDate: today,
  today: today,
  showPopup: true,
  formatter(day: {date: Date; type: string; topInfo: string}) {
    if (day.type !== 'disabled') {
      const date = day.date;
      const str = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      if (selectedDates[str]) {
        day.topInfo = '签到';
      }
    }

    return day;
  },
};
page<Data, Methods>({
  data: initData,
  showPopup() {
    this.setData({showPopup: true});
  },
  closePopup() {
    this.setData({showPopup: false});
  },
});
