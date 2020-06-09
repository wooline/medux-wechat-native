"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

class API {
  getProjectConfig() {
    return global.request('GET', '/api/projectConfig');
  }

  getCurUser() {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      hasLogin: true,
      avatar: ''
    });
  }

}

exports.API = API;

var _default = new API();

exports.default = _default;