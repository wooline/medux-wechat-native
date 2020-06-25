"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _dateHelper = require("../../../../common/dateHelper");

var _navPageBehavior = _interopRequireDefault(require("../../../../common/navPageBehavior"));

var _refreshPageBehavior = _interopRequireDefault(require("../../../../common/refreshPageBehavior"));

const listPage = (0, _refreshPageBehavior.default)(global.actions.app);
const aaa = 0;
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  const {
    projectConfig,
    dataSource,
    curUser
  } = state.app;

  if (projectConfig && dataSource) {
    const props = dataSource;
    const {
      clientPublishPath,
      cates
    } = projectConfig;
    const {
      loggedIn,
      latestSigned,
      signedDays
    } = curUser;
    return Object.assign({}, props, {
      loggedIn,
      latestSigned,
      signedDays,
      inited: true,
      clientPublishPath,
      cates
    });
  } else {
    return {};
  }
});
const initData = {
  category: [{
    id: '0',
    name: '今日步数'
  }, {
    id: '1',
    name: '签到打卡'
  }, {
    id: '2',
    name: '成绩公示'
  }],
  showSignPopup: false
};
component({
  behaviors: [listPage, _navPageBehavior.default],
  data: initData,
  pageLifetimes: {
    show() {
      this.getTabBar().init();
    }

  },
  methods: {
    todaySteps() {
      if (this.data.loggedIn) {
        this.dispatch(global.actions.app.getTodaySteps());
      } else {
        this.dispatch(global.actions.app.showLoginPopup(true));
      }
    },

    showSignPopup() {
      if (this.data.loggedIn) {
        if (this.data.latestSigned && this.data.latestSigned === (0, _dateHelper.dateFormat)()) {
          global.historyActions.navigateTo('/app/signed');
        } else {
          this.setData({
            showSignPopup: true
          });
        }
      } else {
        this.dispatch(global.actions.app.showLoginPopup(true));
      }
    },

    sign() {
      this.setData({
        showSignPopup: false
      });
      this.dispatch(global.actions.app.sign());
    },

    closeSignPopup() {
      this.setData({
        showSignPopup: false
      });
    }

  }
});