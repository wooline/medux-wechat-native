"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wechat = require("@medux/wechat");

var _api = _interopRequireDefault(require("./api"));

const initModelState = {
  curUser: {
    id: '',
    username: 'guest',
    hasLogin: false,
    avatar: ''
  },
  loading: {
    global: _wechat.LoadingState.Stop
  }
};
exports.initModelState = initModelState;
let ModelHandlers = (0, _decorate2.default)(null, function (_initialize, _BaseModelHandlers) {
  class ModelHandlers extends _BaseModelHandlers {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: ModelHandlers,
    d: [{
      kind: "method",
      decorators: [_wechat.reducer],
      key: "Loading",
      value: function Loading(payload) {
        const state = (0, _get2.default)((0, _getPrototypeOf2.default)(ModelHandlers.prototype), "Loading", this).call(this, payload);
        const globalLoading = state.loading.global;

        if (globalLoading === _wechat.LoadingState.Start || globalLoading === _wechat.LoadingState.Depth) {
          wx.showLoading({
            title: '加载中',
            mask: true
          });
        } else {
          wx.hideLoading();
        }

        return state;
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: 'this.Init',
      value: async function () {
        const [projectConfig, curUser] = await Promise.all([_api.default.getProjectConfig(), _api.default.getCurUser()]);
        this.updateState({
          curUser,
          projectConfig
        });
        global.historyActions.navigateTo({
          url: '/app/Welcome'
        });
      }
    }]
  };
}, _wechat.BaseModelHandlers);
exports.ModelHandlers = ModelHandlers;