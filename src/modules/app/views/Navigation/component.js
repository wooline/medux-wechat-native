"use strict";

exports.__esModule = true;
const App = getApp();
const properties = {
  extClass: {
    type: String,
    value: ''
  },
  background: {
    type: String,
    value: '#0089ff'
  },
  color: {
    type: String,
    value: '#fff'
  },
  title: {
    type: String,
    value: ''
  },
  showBack: {
    type: Boolean,
    value: true
  },
  show: {
    type: Boolean,
    value: true
  }
};
Component({
  options: {
    addGlobalClass: true
  },
  properties,
  lifetimes: {
    attached() {
      this.data.show && this.setData({
        navHeight: App.globalData.navHeight,
        navPaddingTop: App.globalData.navPaddingTop
      });
    }

  },
  methods: {
    back() {
      try {
        global.historyActions.navigateBack(1);
      } catch (e) {
        global.historyActions.reLaunch({
          url: '/app/Home'
        });
      }
    }

  }
});