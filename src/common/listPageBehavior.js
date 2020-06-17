"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(actions, listView) {
  return {
    mapStateToProps: (moduleState, componentData) => {
      const listData = moduleState[listView];

      if (listData) {
        let {
          list
        } = listData;
        const {
          listSearch = {},
          listSummary
        } = listData;

        if (componentData.listSummary !== listSummary) {
          if (componentData.listSummary && listSummary && componentData.listSummary.pageCurrent < listSummary.pageCurrent) {
            console.log('addPage');
            let index = componentData.list.length;
            const newData = {
              listSummary
            };
            list.forEach(item => {
              newData['list[' + index++ + ']'] = item;
            });
            return newData;
          }
        } else {
          list = componentData.list;
        }

        return {
          list,
          listSummary,
          listSearch
        };
      } else {
        return {};
      }
    },
    behavior: Behavior({
      behaviors: [],
      data: {
        refreshing: false,
        loadMore: false
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
        },

        onMore() {
          const {
            pageCurrent,
            totalPages
          } = this.data.listSummary;

          if (this.data.loadMore || pageCurrent >= totalPages) {
            return;
          }

          this.setData({
            loadMore: true
          });
          console.log('loadMore...');
          this.dispatch(actions.changeListPageCurrent(pageCurrent + 1));
          setTimeout(() => {
            this.setData({
              loadMore: false
            });
          }, 1000);
        }

      }
    })
  };
}