import * as module from '../../module';

import {DispatchProp, connectComponent} from '@medux/wechat';

import {ListItem as Article} from '~/entity/article';
import {ListItem as Contest} from '~/entity/contest';
import {ListItem as Grade} from '~/entity/grade';
import {ListItem as Post} from '~/entity/post';
import {dateFormat} from '~/common/dateHelper';
import navPageBehavior from '~/common/navPageBehavior';
import refreshPageBehavior from '~/common/refreshPageBehavior';

const listPage = refreshPageBehavior(global.actions.app);

interface StoreProps {
  recommend: Post[];
  articles: Article[];
  contests: Contest[];
  grades: Grade[];
  inited: boolean;
  cates: {[cid: string]: string};
  clientPublishPath: string;
  loggedIn: boolean;
  latestSigned: string;
  signedDays: number;
}
interface OwnerProps {}
interface ComponentState {
  category: {id: string; name: string}[];
  showSignPopup: boolean;
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}
const aaa = 0;
const component = connectComponent<RootState, StoreProps, {}, Data>(module, (state, data) => {
  const {projectConfig, dataSource, curUser} = state.app!;
  if (projectConfig && dataSource) {
    const props = dataSource;
    const {clientPublishPath, cates} = projectConfig;
    const {loggedIn, latestSigned, signedDays} = curUser;
    return {...props, loggedIn, latestSigned, signedDays, inited: true, clientPublishPath, cates};
  } else {
    return {} as StoreProps;
  }
});

const initData: any = {
  category: [
    {id: '0', name: '今日步数'},
    {id: '1', name: '签到打卡'},
    {id: '2', name: '成绩公示'},
  ],
  showSignPopup: false,
};
component<Data, {}, Methods>({
  behaviors: [listPage, navPageBehavior],
  data: initData,
  pageLifetimes: {
    show() {
      this.getTabBar().init();
    },
  },
  methods: {
    todaySteps() {
      if (this.data.loggedIn) {
        this.dispatch!(global.actions.app.getTodaySteps());
      } else {
        this.dispatch!(global.actions.app.showLoginPopup(true));
      }
    },
    showSignPopup() {
      if (this.data.loggedIn) {
        if (this.data.latestSigned && this.data.latestSigned === dateFormat()) {
          global.historyActions.navigateTo('/app/signed');
        } else {
          this.setData({showSignPopup: true});
        }
      } else {
        this.dispatch!(global.actions.app.showLoginPopup(true));
      }
    },
    sign() {
      this.setData({showSignPopup: false});
      this.dispatch!(global.actions.app.sign());
    },
    closeSignPopup() {
      this.setData({showSignPopup: false});
    },
    // navToSigned() {
    //   global.historyActions.navigateTo('/modules/app/views/Signed/page');
    // },
  },
});
