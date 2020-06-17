"use strict";

exports.__esModule = true;
exports.default = void 0;

var _base = require("./base");

var _default = Behavior({
  behaviors: [],
  methods: {
    navToSubList(e) {
      const {
        type,
        sid
      } = e.currentTarget.dataset;
      (0, _base.navToSubList)(type, sid);
    },

    navToItem(e) {
      const {
        type,
        id
      } = e.currentTarget.dataset;
      (0, _base.navToItem)(type, id);
    },

    navToList(e) {
      const {
        type
      } = e.currentTarget.dataset;
      (0, _base.navToList)(type);
    }

  }
});

exports.default = _default;