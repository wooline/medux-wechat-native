"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _base = require("./common/base");

var _export = require("./modules/export");

var _request = _interopRequireDefault(require("./common/request"));

global.actions = _export.actions;
global.moduleNames = _export.moduleNames;
global.message = _base.message;
global.request = _request.default;
global.metaKeys = _base.metaKeys;
global.commonErrorCode = _base.CommonErrorCode;