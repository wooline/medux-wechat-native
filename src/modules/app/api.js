"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

var API = function () {
  function API() {}

  var _proto = API.prototype;

  _proto.getCurUser = function getCurUser() {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      hasLogin: true,
      avatar: ''
    });
  };

  return API;
}();

exports.API = API;

var _default = new API();

exports.default = _default;