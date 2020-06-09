"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _resource = require("../../common/resource");

var _contest = require("../../entity/contest");

var _api = _interopRequireDefault(require("./api"));

const initModelState = {
  routeParams: _contest.defaultRouteParams
};
exports.initModelState = initModelState;

class ModelHandlers extends _resource.CommonResourceHandlers {
  constructor(moduleName, store) {
    super({
      defaultRouteParams: _contest.defaultRouteParams,
      api: _api.default
    }, moduleName, store);
  }

}

exports.ModelHandlers = ModelHandlers;