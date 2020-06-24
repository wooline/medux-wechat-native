"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

const page = (0, _wechat.connectPage)(_module, state => {
  return {};
});
const today = new Date().getTime();
const selectedDates = {
  '2020-6-14': true,
  '2020-6-16': true,
  '2020-6-17': true
};
const initData = {
  minDate: today - 1000 * 3600 * 24 * 30 * 3,
  maxDate: today,
  today: today,

  formatter(day) {
    if (day.type !== 'disabled') {
      const date = day.date;
      const str = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

      if (selectedDates[str]) {
        day.topInfo = '签到';
      }
    }

    return day;
  }

};
page({
  data: initData
});