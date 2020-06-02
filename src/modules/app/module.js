"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _model = require("./model");

var _view = _interopRequireDefault(require("./views/Welcome/view"));

var _wechat = require("@medux/wechat");

var _default = (0, _wechat.exportModule)('app', _model.initModelState, _model.ModelHandlers, {
  Welcome: _view.default
});

exports.default = _default;