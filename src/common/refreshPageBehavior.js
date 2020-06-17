"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(actions) {
  return Behavior({
    behaviors: [],
    data: {
      refreshing: false
    },
    methods: {
      onRefresh() {
        if (this.data.refreshing) {
          return;
        }

        this.setData({
          refreshing: true
        });
        this.dispatch(actions.refreshDataSource());
        setTimeout(() => {
          this.setData({
            refreshing: false
          });
        }, 1000);
      }

    }
  });
}