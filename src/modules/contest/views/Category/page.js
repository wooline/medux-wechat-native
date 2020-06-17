"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _navPageBehavior = _interopRequireDefault(require("../../../../common/navPageBehavior"));

var _refreshListPageBehavior = _interopRequireDefault(require("../../../../common/refreshListPageBehavior"));

const listPage = (0, _refreshListPageBehavior.default)(global.actions.contest, 'category');
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const props = listPage.mapStateToProps(state.contest, data);
    const {
      clientPublishPath,
      cates
    } = projectConfig;
    return Object.assign(Object.assign({}, props), {}, {
      inited: true,
      clientPublishPath,
      cates
    });
  } else {
    return {};
  }
});
component({
  behaviors: [listPage.behavior, _navPageBehavior.default],
  pageLifetimes: {
    show() {
      this.getTabBar().init();
    }

  }
});