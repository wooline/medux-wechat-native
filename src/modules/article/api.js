"use strict";

exports.__esModule = true;
exports.default = exports.API = void 0;

var _resource = require("../../common/resource");

class API extends _resource.CommonResourceAPI {
  searchList(request) {
    const result = {
      list: [{
        title: '',
        summary: '',
        thumb: '',
        link: '',
        id: ''
      }],
      listSummary: {
        pageCurrent: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 1
      }
    };
    return Promise.resolve(result);
  }

}

exports.API = API;

var _default = new API();

exports.default = _default;