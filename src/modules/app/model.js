"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

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
      decorators: [(0, _wechat.effect)()],
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