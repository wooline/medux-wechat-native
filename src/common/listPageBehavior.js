"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(actions) {
  return {
    mapStateToProps: (moduleState, componentData) => {
      let {
        list
      } = moduleState;
      const {
        listSummary
      } = moduleState;
      const listSearch = moduleState.routeParams.listSearch;

      if (componentData.listSummary !== listSummary) {
        if (componentData.listSummary && listSummary && componentData.listSummary.pageCurrent < listSummary.pageCurrent) {
          console.log('add List');
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
    },
    behavior: Behavior({
      behaviors: [],
      data: {
        refreshing: false,
        loadMore: false
      },
      methods: {
        async onRefresh() {
          if (this.data.refreshing) {
            return;
          }

          this.setData({
            refreshing: true
          });
          await this.dispatch(actions.changeListPage(1));
          this.setData({
            refreshing: false
          });
        },

        async onMore() {
          console.log('onMore');
          const {
            pageCurrent,
            totalPages
          } = this.data.listSummary;

          if (this.data.loadMore || pageCurrent >= totalPages) {
            return;
          }

          console.log('loadMore start');
          this.setData({
            loadMore: true
          });
          await this.dispatch(actions.changeListPage(pageCurrent + 1));
          this.setData({
            loadMore: false
          });
          console.log('loadMore end');
        }

      }
    })
  };
}