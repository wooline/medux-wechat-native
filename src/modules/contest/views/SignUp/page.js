"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, state => {
  var _state$contest, _state$contest$detail;

  console.log(111);
  return {
    itemDetail: (_state$contest = state.contest) === null || _state$contest === void 0 ? void 0 : (_state$contest$detail = _state$contest.detail) === null || _state$contest$detail === void 0 ? void 0 : _state$contest$detail.itemDetail
  };
});
page({
  signUp() {
    global.message.success('报名成功！');
  },

  navBack() {
    global.historyActions.navigateBack(1);
  },

  onLoad(query) {
    this.setData({
      gid: query.gid,
      gindex: parseInt(query.gindex)
    });
  }

});