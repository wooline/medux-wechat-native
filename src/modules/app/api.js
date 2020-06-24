"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

var _session = require("../../entity/session");

var _dateHelper = require("../../common/dateHelper");

class API {
  getProjectConfig() {
    return global.request('GET', '/api/projectConfig');
  }

  getCurUser() {
    return Promise.resolve(_session.guest);
  }

  login(request) {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      nickName: 'admin',
      gender: 0,
      loggedIn: true,
      avatar: '',
      latestSigned: '2020/06/16',
      signedDays: 2,
      score: 234
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