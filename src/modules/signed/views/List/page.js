"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _module = _interopRequireWildcard(require("../../module"));

var _wechat = require("@medux/wechat");

var _listPageBehavior = _interopRequireDefault(require("../../../../common/listPageBehavior"));

const listPage = (0, _listPageBehavior.default)(global.actions.contact, 'list');
const component = (0, _wechat.connectComponent)(_module, (state, data) => {
  return listPage.mapStateToProps(state.contact, data);
});
component({
  behaviors: [listPage.behavior],
  methods: {
    navToDetail(e) {
      const index = e.target.dataset.index;
      const item = this.data.list[index];
      this.dispatch(global.actions.contact.openCurrentItem(item));
    },

    createItem() {
      this.dispatch(global.actions.contact.openCurrentItem());
    },

    deleteItem(e) {
      const index = e.target.dataset.index;
      const item = this.data.list[index];
      const dispatch = this.dispatch;
      wx.showModal({
        title: '联系人: ' + item.name,
        content: '手机 ' + item.mobile,
        confirmText: '删除',

        success(res) {
          if (res.confirm) {
            dispatch(global.actions.contact.deleteList([item.id]));
          }
        }

      });
    }

  }
});