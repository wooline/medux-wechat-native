"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const component = (0, _wechat.connectComponent)(_module, state => {
  return {
    showLoginPopup: state.app.showLoginPopup,
    curUser: state.app.curUser
  };
}, dispatch => {
  return {
    closePopup() {
      dispatch(global.actions.app.showLoginPopup(false));
    }

  };
});
component({
  methods: {
    login() {
      this.dispatch(global.actions.app.login({
        username: '',
        password: ''
      }));
    },

    maskEvents() {
      return false;
    }

  }
});