"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _detailPageBehavior = _interopRequireDefault(require("../../../../common/detailPageBehavior"));

const detailPage = (0, _detailPageBehavior.default)(global.actions.grade, 'detail');
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const props = detailPage.mapStateToProps(state.grade, data);
    const {
      clientPublishPath,
      cates
    } = projectConfig;
    return Object.assign({}, props, {
      inited: true,
      clientPublishPath,
      cates
    });
  } else {
    return {};
  }
});
const initData = {
  singUpType: 0
};
component({
  behaviors: [detailPage.behavior],
  data: initData,
  methods: {
    onSingUpTypeChange(event) {
      this.setData({
        singUpType: event.detail
      });
    }

  }
});