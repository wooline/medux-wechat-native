"use strict";

var _util = require("../../utils/util");

Page({
  data: {
    logs: []
  },

  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return (0, _util.formatTime)(new Date(log));
      })
    });
  }

});