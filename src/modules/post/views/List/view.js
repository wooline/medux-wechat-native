"use strict";

exports.__esModule = true;
exports.default = exports.page = void 0;

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(state => {
  var _thisModule$routePara;

  const thisModule = state.post;
  const {
    list,
    listSummary
  } = thisModule;
  return {
    list,
    listSummary,
    listSearch: (_thisModule$routePara = thisModule.routeParams) === null || _thisModule$routePara === void 0 ? void 0 : _thisModule$routePara.listSearch
  };
});
exports.page = page;
const view = page({
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
  },

  onReachBottom() {
    wx.showNavigationBarLoading();
  }

});
var _default = view;
exports.default = _default;