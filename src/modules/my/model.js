"use strict";

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _wechat = require("@medux/wechat");

const initModelState = {};
exports.initModelState = initModelState;

class ModelHandlers extends _wechat.BaseModelHandlers {}

exports.ModelHandlers = ModelHandlers;