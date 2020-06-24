import * as module from '../../module';

import {connectPage} from '@medux/wechat';

interface StoreProps {}
interface OwnerProps {}
interface ComponentState {
  minDate: number;
  maxDate: number;
  selectedDate: number[];
  today: number;
}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const page = connectPage<RootState, StoreProps>(module, (state) => {
  return {};
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
});
