"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

var _resource = require("../../common/resource");

class API extends _resource.CommonResourceAPI {
  searchList(request) {
    return global.request('GET', '/api/contest', this._filterEmpty(request));
  }

}

exports.API = API;

var _default = new API();

exports.default = _default;