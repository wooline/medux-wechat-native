"use strict";

exports.__esModule = true;
exports.default = void 0;

var _model = require("./model");

var _wechat = require("@medux/wechat");

var _default = (0, _wechat.exportModule)('post', _model.initModelState, _model.ModelHandlers, {});

exports.default = _default;