"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.component = void 0;

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _listPageBehavior = _interopRequireDefault(require("../../../../common/listPageBehavior"));

const listPage = (0, _listPageBehavior.default)(global.actions.post);
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
exports.component = component;
component({
  behaviors: [listPage.behavior]
});