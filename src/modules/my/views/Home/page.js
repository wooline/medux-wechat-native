"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

global.historyActions.block(location => {
  const state = global.store.getState();

  if (!state.app.curUser.loggedIn) {
    if (location.pathname === '/modules/my/views/Home/page') {
      global.store.dispatch((0, _wechat.errorAction)({
        code: global.commonErrorCode.unauthorized
      }));
      return false;
    }
  }

  return true;
});
const page = (0, _wechat.connectPage)(_module, state => {
  const {
    nickName,
    gender,
    avatar,
    score
  } = state.app.curUser;
  return {
    nickName,
    gender,
    avatar,
    score
  };
});
page({
  navTo(e) {
    const url = e.currentTarget.dataset.url;
    global.historyActions.navigateTo(url);
  },

  onShow() {
    this.getTabBar().init();
  }

});