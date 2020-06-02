"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _model = require("./model");

var _view = _interopRequireDefault(require("./views/List/view"));

var _view2 = _interopRequireDefault(require("./views/Search/view"));

var _wechat = require("@medux/wechat");

var _default = (0, _wechat.exportModule)('post', _model.initModelState, _model.ModelHandlers, {
  List: _view.default,
  Search: _view2.default
});

exports.default = _default;