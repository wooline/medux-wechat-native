"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _listPageBehavior = _interopRequireDefault(require("../../../../common/listPageBehavior"));

var _navPageBehavior = _interopRequireDefault(require("../../../../common/navPageBehavior"));

const listPage = (0, _listPageBehavior.default)(global.actions.post, 'list');
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const props = listPage.mapStateToProps(state.post, data);
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
const initData = {
  templateNames: {
    contest: 'contestList',
    grade: 'gradeList',
    article: 'articleList'
  }
};
component({
  behaviors: [listPage.behavior, _navPageBehavior.default],
  data: initData
});