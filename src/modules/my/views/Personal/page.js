"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _miniprogramComputed = _interopRequireDefault(require("miniprogram-computed"));

global.historyActions.block(location => {
  const state = global.store.getState();

  if (!state.app.curUser.loggedIn) {
    if (location.pathname === '/modules/my/views/Home/page') {
      global.store.dispatch((0, _wechat.errorAction)({
        code: global.commonErrorCode.unauthorized
      }));
      return false;
    }
  }

  return true;
});
const component = (0, _wechat.connectComponent)(_module, state => {
  const {
    nickName,
    gender,
    avatar,
    score
  } = state.app.curUser;
  return {
    nickName,
    gender,
    avatar,
    score,
    birthday: ''
  };
});
const initData = {
  gender: 0,
  avatar: '',
  genderOptions: [{
    id: 0,
    name: '女'
  }, {
    id: 1,
    name: '男'
  }]
};
component({
  behaviors: [_miniprogramComputed.default],
  data: initData,
  computed: {
    _gender(data) {
      return data.gender;
    },

    _birthday(data) {
      return data.birthday;
    },

    avatarUpload(data) {
      return [{
        url: data.avatar,
        isImage: true,
        name: 'avatar'
      }];
    }

  },
  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },

    submit() {
      global.historyActions.navigateBack(1);
    },

    onGenderChange(e) {
      this.setData({
        _gender: parseInt(e.detail.value)
      });
    },

    onBirthdayChange(e) {
      this.setData({
        _birthday: e.detail.value
      });
    }

  }
});