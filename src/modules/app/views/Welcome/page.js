"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, state => {
  return {
    timer: state.app.projectConfig.startupPage.times
  };
});
let nid = 0;
page({
  data: {
    timer: 0,
    countdown: 0
  },

  onSkip() {
    this.setData({
      countdown: 0
    });
  },

  onComplete() {
    if (this.data.countdown && !nid) {
      nid = setInterval(() => {
        if (this.data.countdown) {
          this.setData({
            countdown: this.data.countdown - 1
          });
        } else {
          clearInterval(nid);
          global.historyActions.navigateBack(1);
        }
      }, 1000);
    }
  },

  onLoad() {
    this.setData({
      countdown: this.data.timer
    });
  }

});