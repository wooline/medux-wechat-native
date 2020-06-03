"use strict";

exports.__esModule = true;
exports.default = request;
const apiServerPath = {
  '/api/': 'http://localhost:7445/api/'
};

function request(method, url, params = {}, data = {}) {
  url = url.replace(/:\w+/g, flag => {
    const key = flag.substr(1);

    if (params[key]) {
      const val = params[key];
      delete params[key];
      return encodeURIComponent(val);
    } else {
      return '';
    }
  });
  Object.keys(apiServerPath).some(key => {
    const reg = new RegExp(key);

    if (reg.test(url)) {
      url = url.replace(reg, apiServerPath[key]);
      return true;
    } else {
      return false;
    }
  });
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url,
      data,

      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },

      fail() {
        reject({
          msg: '请求失败',
          url,
          method,
          data
        });
      }

    });
  });
}