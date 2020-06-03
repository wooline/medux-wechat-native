import {connectPage} from '@medux/wechat';

Page({
  onShow() {
    this.getTabBar().init();
  },
  gotoTest() {
    global.historyActions.navigateTo('/test/Home');
  },
});
