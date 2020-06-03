"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.component = void 0;

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const component = (0, _wechat.connectComponent)(_module, state => {
  var _state$post, _state$post$routePara;

  return {
    curPathname: state.route.location.pathname,
    term: ((_state$post = state.post) === null || _state$post === void 0 ? void 0 : (_state$post$routePara = _state$post.routeParams) === null || _state$post$routePara === void 0 ? void 0 : _state$post$routePara.listSearch.term) || ''
  };
}, dispatch => {
  return {
    onSearch({
      detail
    }) {
      dispatch(global.actions.post.doListSearch({
        term: detail
      }));
    }

  };
});
exports.component = component;
component({});