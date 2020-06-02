"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

class API {
  getProjectConfig() {
    return Promise.resolve({
      startupPage: {
        linkUrl: 'aaa',
        imageUrl: '',
        times: 9
      }
    });
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