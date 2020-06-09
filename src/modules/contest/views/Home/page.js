"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, (state, data) => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const {
      clientPublishPath,
      cates
    } = projectConfig;
    const moduleState = state.contest;
    const {
      list,
      listSummary
    } = moduleState;
    const listSearch = moduleState.routeParams.listSearch;
    return {
      list,
      listSearch,
      listSummary,
      inited: true,
      clientPublishPath,
      cates
    };
  } else {
    return {};
  }
});
page({
  onShow() {
    this.getTabBar().init();
  }

});