"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(actions, itemView) {
  return {
    mapStateToProps: (moduleState, componentData) => {
      const itemData = moduleState[itemView] || {};
      const {
        itemDetail
      } = itemData;
      return {
        itemDetail
      };
    },
    behavior: Behavior({
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
          this.dispatch(actions.refreshCurrentItem());
          setTimeout(() => {
            this.setData({
              refreshing: false
            });
          }, 1000);
        }

      }
    })
  };
}