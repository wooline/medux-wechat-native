"use strict";

Page({
  onShow() {
    this.getTabBar().init();
  },

  gotoTest() {
    global.historyActions.navigateTo('/test/Home');
  }

});