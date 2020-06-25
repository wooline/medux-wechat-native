"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _detailPageBehavior = _interopRequireDefault(require("../../../../common/detailPageBehavior"));

var _navPageBehavior = _interopRequireDefault(require("../../../../common/navPageBehavior"));

const detailPage = (0, _detailPageBehavior.default)(global.actions.contest, 'detail');
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const props = detailPage.mapStateToProps(state.contest, data);
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
  behaviors: [detailPage.behavior, _navPageBehavior.default],
  data: initData,
  methods: {
    signUp(e) {
      const {
        id,
        gid
      } = e.currentTarget.dataset;
      global.historyActions.navigateTo({
        paths: ['app.Main', 'signed.Detail'],
        params: {
          signed: {
            itemId: 'create',
            itemView: 'detail',
            itemKey: Date.now(),
            cid: id,
            cgid: gid
          }
        }
      });
    },

    onSingUpTypeChange(event) {
      this.setData({
        singUpType: event.detail
      });
    }

  }
});