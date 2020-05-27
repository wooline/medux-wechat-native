"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _wechat = require("@medux/wechat");

var _api = _interopRequireDefault(require("./api"));

var initModelState = {
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
var ModelHandlers = (0, _decorate2.default)(null, function (_initialize, _BaseModelHandlers) {
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
      decorators: [(0, _wechat.effect)(null)],
      key: 'this.Init',
      value: function () {
        var _ref = (0, _asyncToGenerator2.default)(function* () {
          var [projectConfig, curUser] = yield Promise.all([_api.default.getProjectConfig(), _api.default.getCurUser()]);
          this.updateState({
            curUser,
            projectConfig
          });
          global.historyActions.redirectTo({
            url: '/modules/app/views/Welcome/export'
          });
          console.log();
        });

        return function value() {
          return _ref.apply(this, arguments);
        };
      }()
    }]
  };
}, _wechat.BaseModelHandlers);
exports.ModelHandlers = ModelHandlers;