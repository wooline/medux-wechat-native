"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _miniprogramComputed = _interopRequireDefault(require("miniprogram-computed"));

var _navPageBehavior = _interopRequireDefault(require("../../../../common/navPageBehavior"));

global.historyActions.block(location => {
  const state = global.store.getState();

  if (!state.app.curUser.loggedIn) {
    if (location.pathname === '/modules/signed/views/Detail/page') {
      global.store.dispatch((0, _wechat.errorAction)({
        code: global.commonErrorCode.unauthorized
      }));
      return false;
    }
  }

  return true;
});
const component = (0, _wechat.connectComponent)(_module, state => {
  var _state$signed, _state$signed$detail;

  return {
    itemDetail: (_state$signed = state.signed) === null || _state$signed === void 0 ? void 0 : (_state$signed$detail = _state$signed.detail) === null || _state$signed$detail === void 0 ? void 0 : _state$signed$detail.itemDetail
  };
});
const initData = {
  genderOptions: [{
    id: 0,
    name: '女'
  }, {
    id: 1,
    name: '男'
  }],
  dressSizeOptions: [{
    id: 0,
    name: '小码'
  }, {
    id: 1,
    name: '中码'
  }, {
    id: 2,
    name: '大码'
  }]
};
component({
  behaviors: [_miniprogramComputed.default, _navPageBehavior.default],
  data: initData,
  watch: {
    itemDetail: function (itemDetail) {
      if (itemDetail) {
        this.setData(Object.assign({}, itemDetail.master));
      }
    }
  },
  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },

    submit() {
      wx.showModal({
        title: '报名成功',
        content: '接下来您要前往...',
        confirmText: '继续报名',
        cancelText: '我的赛事',

        success(res) {
          if (res.confirm) {
            const location = global.historyActions.getLocation();
            global.historyActions.redirectTo(location.pathname + location.search);
          } else if (res.cancel) {
            global.historyActions.switchTab('/my/home');
          }
        }

      });
    },

    onDressSizeChange(e) {
      this.setData({
        dressSize: parseInt(e.detail.value)
      });
    },

    onGenderChange(e) {
      this.setData({
        gender: parseInt(e.detail.value)
      });
    },

    onBirthdayChange(e) {
      this.setData({
        birthday: e.detail.value
      });
    },

    onContactChange(e) {
      const item = e.detail.value;

      if (item) {
        this.setData(item);
      }
    }

  }
});