"use strict";

exports.__esModule = true;
exports.default = void 0;

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(state => {
  return {
    timer: state.app.projectConfig.startupPage.times
  };
});
let nid = 0;
const view = page({
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
var _default = view;
exports.default = _default;