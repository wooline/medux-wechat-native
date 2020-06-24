"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _miniprogramComputed = _interopRequireDefault(require("miniprogram-computed"));

const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  var _selector;

  return {
    list: (_selector = state.contact.selector) === null || _selector === void 0 ? void 0 : _selector.list
  };
});
component({
  behaviors: [_miniprogramComputed.default],
  watch: {
    list(list) {
      if (list) {
        this.setData({
          index: -1,
          options: list.map(item => ({
            id: item.id,
            name: item.name + ' ' + item.mobile
          }))
        });
      }
    }

  },
  lifetimes: {
    attached() {
      this.dispatch(global.actions.contact.searchList({
        params: {},
        extend: 'default'
      }, 'selector'));
    }

  },
  methods: {
    onSelect(e) {
      const index = parseInt(e.detail.value);
      const item = this.data.list[index];
      this.setData({
        index
      });
      this.triggerEvent('change', {
        value: item
      });
    }

  }
});