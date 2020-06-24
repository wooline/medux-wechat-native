"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _resource = require("../../common/resource");

var _signed = require("../../entity/signed");

var _api = _interopRequireDefault(require("./api"));

const initModelState = {
  routeParams: _signed.defaultRouteParams
};
exports.initModelState = initModelState;

class ModelHandlers extends _resource.CommonResourceHandlers {
  constructor(moduleName, store) {
    super({
      defaultRouteParams: _signed.defaultRouteParams,
      api: _api.default
    }, moduleName, store);
  }

  createNewItem() {
    const {
      cid,
      cgid
    } = this.state.routeParams;
    const curContest = this.rootState.contest.detail.itemDetail;
    const {
      title,
      thumb,
      signUpTime,
      activeTime
    } = curContest;
    const group = curContest.groups.find(item => item.id === cgid);
    const master = {
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
    return Promise.resolve({
      id: '',
      cid,
      cname: title,
      cgid,
      cgname: group.name,
      price: group.price,
      thumb,
      signUpTime,
      activeTime,
      master,
      createdTime: 0
    });
  }

}

exports.ModelHandlers = ModelHandlers;