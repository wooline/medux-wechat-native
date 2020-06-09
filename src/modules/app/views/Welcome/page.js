"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, state => {
  const projectConfig = state.app.projectConfig;

  if (projectConfig) {
    const clientPublishPath = projectConfig.clientPublishPath;
    const {
      imageUrl,
      linkUrl,
      times
    } = projectConfig.startupPage;
    return {
      inited: true,
      imageUrl,
      linkUrl,
      times,
      countdown: times,
      clientPublishPath
    };
  } else {
    return {};
  }
});
let nid = 0;
page({
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
  }

});