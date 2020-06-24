"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _miniprogramComputed = _interopRequireDefault(require("miniprogram-computed"));

const component = (0, _wechat.connectComponent)(_module, state => {
  var _state$contact, _state$contact$detail;

  return {
    itemDetail: (_state$contact = state.contact) === null || _state$contact === void 0 ? void 0 : (_state$contact$detail = _state$contact.detail) === null || _state$contact$detail === void 0 ? void 0 : _state$contact$detail.itemDetail
  };
});
const initData = {
  itemDetail: undefined,
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
  behaviors: [_miniprogramComputed.default],
  data: initData,
  watch: {
    itemDetail: function (itemDetail) {
      if (itemDetail) {
        this.setData(Object.assign({}, itemDetail));
      }
    }
  },
  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },

    submit() {
      global.historyActions.navigateBack(1);
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
    }

  }
});