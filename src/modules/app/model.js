"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _wechat = require("@medux/wechat");

var _session = require("../../entity/session");

var _api = _interopRequireDefault(require("./api"));

const initModelState = {
  showLoginPopup: false,
  curUser: _session.guest,
  steps: [364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 13656, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124].slice(0, 30),
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
      key: "putDatasource",
      value: function putDatasource(dataSource) {
        return Object.assign(Object.assign({}, this.state), {}, {
          dataSource
        });
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putCurUser",
      value: function putCurUser(curUser) {
        return Object.assign(Object.assign({}, this.state), {}, {
          curUser
        });
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putSteps",
      value: function putSteps(steps) {
        return Object.assign(Object.assign({}, this.state), {}, {
          steps
        });
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "showLoginPopup",
      value: function showLoginPopup(_showLoginPopup) {
        return Object.assign(Object.assign({}, this.state), {}, {
          showLoginPopup: _showLoginPopup
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "getTodaySteps",
      value: async function getTodaySteps() {
        const data = await wx.getWeRunData();
        const result = data;
        console.log(result);
        this.dispatch(this.callThisAction(this.putSteps, [364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 13656, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124].slice(0, 30)));
        global.historyActions.navigateTo('/app/steps');
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "refreshDataSource",
      value: async function refreshDataSource() {
        const dataSource = await _api.default.getHomeData();
        this.dispatch(this.callThisAction(this.putDatasource, dataSource));
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "sign",
      value: async function sign() {
        const location = await wx.getLocation({});
        console.log(location);
        const data = await _api.default.sign();
        const curUser = this.state.curUser;
        this.dispatch(this.callThisAction(this.putCurUser, Object.assign(Object.assign({}, curUser), data)));
        global.historyActions.navigateTo('/app/signed');
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "login",
      value: async function login(data) {
        const curUser = await _api.default.login(data);
        this.updateState({
          curUser,
          showLoginPopup: false
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "logout",
      value: async function logout() {
        this.updateState({
          curUser: _session.guest
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "loginWithWechat",
      value: async function loginWithWechat(wuser) {
        const curUser = {
          id: 'admin',
          username: wuser.nickName,
          nickName: wuser.nickName,
          gender: wuser.gender,
          loggedIn: true,
          avatar: wuser.avatarUrl,
          latestSigned: '2020/06/16',
          signedDays: 2,
          score: 234
        };
        this.updateState({
          curUser,
          showLoginPopup: false
        });
        global.message.success('登录成功！');
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: _wechat.ActionTypes.Error,
      value: async function (error) {
        if (error.code === global.commonErrorCode.unauthorized) {
          const curUser = this.state.curUser;

          if (curUser.loggedIn) {
            this.dispatch(this.actions.logout());
          }

          this.dispatch(this.actions.showLoginPopup(true));
        }
      }
    }, {
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
        this.refreshDataSource();
      }
    }]
  };
}, _wechat.BaseModelHandlers);
exports.ModelHandlers = ModelHandlers;