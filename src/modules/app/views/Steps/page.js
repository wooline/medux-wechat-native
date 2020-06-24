"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, (state, data) => {
  const steps = state.app.steps;

  if (data._steps !== steps) {
    const max = Math.max(...steps);
    const unit = 200 / max;
    const sizes = steps.map(n => Math.floor(n * unit));
    return {
      steps,
      sizes,
      _steps: steps
    };
  } else {
    return {};
  }
});
page({});