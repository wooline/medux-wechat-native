"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(actions, listView) {
  return {
    mapStateToProps: (moduleState, componentData) => {
      const listData = moduleState[listView] || {};
      const {
        list
      } = listData;
      const {
        listSummary,
        listSearch = {}
      } = listData;
      return {
        list,
        listSummary,
        listSearch
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
          this.dispatch(actions.changeListPageCurrent(1));
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