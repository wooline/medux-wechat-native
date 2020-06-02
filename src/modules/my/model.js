"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _resource = require("../../common/resource");

var _api = _interopRequireDefault(require("./api"));

var _meta = _interopRequireDefault(require("./meta"));

const initModelState = {
  routeParams: _meta.default
};
exports.initModelState = initModelState;

class ModelHandlers extends _resource.CommonResourceHandlers {
  constructor(moduleName, store) {
    super({
      defaultRouteParams: _meta.default,
      api: _api.default
    }, moduleName, store);
  }

}

exports.ModelHandlers = ModelHandlers;