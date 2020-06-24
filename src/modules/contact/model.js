"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _resource = require("../../common/resource");

var _contact = require("../../entity/contact");

var _api = _interopRequireDefault(require("./api"));

const initModelState = {
  routeParams: _contact.defaultRouteParams
};
exports.initModelState = initModelState;
const newItem = {
  id: '',
  name: '',
  gender: 0,
  mobile: '',
  birthday: '',
  iid: '',
  dressSize: 0,
  addr: '',
  createdTime: 0
};

class ModelHandlers extends _resource.CommonResourceHandlers {
  constructor(moduleName, store) {
    super({
      defaultRouteParams: _contact.defaultRouteParams,
      api: _api.default,
      newItem
    }, moduleName, store);
  }

}

exports.ModelHandlers = ModelHandlers;