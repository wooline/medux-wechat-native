"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const component = (0, _wechat.connectComponent)(_module, state => {
  return {
    loadingState: state.app.loading.global
  };
});
component({
  methods: {
    maskEvents() {
      return false;
    }

  }
});