"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

var _dateHelper = require("../../common/dateHelper");

class API {
  getProjectConfig() {
    return global.request('GET', '/api/projectConfig');
  }

  getCurUser() {
    return Promise.resolve({
      id: '',
      username: 'guest',
      loggedIn: false,
      avatar: '',
      latestSigned: '',
      signedDays: 0
    });
  }

  login(request) {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      loggedIn: true,
      avatar: '',
      latestSigned: '2020/06/16',
      signedDays: 2
    });
  }

  sign() {
    return Promise.resolve({
      latestSigned: (0, _dateHelper.dateFormat)(),
      signedDays: 3
    });
  }

  getHomeData() {
    return global.request('GET', '/api/home');
  }

}

exports.API = API;

var _default = new API();

exports.default = _default;