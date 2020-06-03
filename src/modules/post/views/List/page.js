"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.page = void 0;

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, state => {
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
  data: {
    refreshing: false,
    loadMore: false
  },

  onRefresh() {
    console.log('onRefresh');

    if (this.data.refreshing) {
      return;
    }

    console.log('refresh start');
    this.dispatch(global.actions.post.refreshListSearch());
    this.setData({
      refreshing: true
    });
    setTimeout(() => {
      this.setData({
        refreshing: false
      });
      console.log('refresh end');
    }, 3000);
  },

  onMore() {
    console.log('onMore');

    if (this.data.loadMore) {
      return;
    }

    console.log('loadMore start');
    this.setData({
      loadMore: true
    });
    setTimeout(() => {
      this.setData({
        loadMore: false
      });
      console.log('loadMore end');
    }, 3000);
  }

});