"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.CommonResourceHandlers = exports.CommonResourceAPI = void 0;

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _wechat = require("@medux/wechat");

var _utils = require("./utils");

class CommonResourceAPI {
  getDetailItem(id) {
    return Promise.resolve({
      id: '1'
    });
  }

  _filterEmpty(params) {
    return Object.keys(params).reduce((pre, cur) => {
      let value = params[cur];
      const ntype = typeof value;

      if (ntype === 'string') {
        value = value.trim();
      }

      if (Array.isArray(value) && value.length === 0) {
        pre[cur] = undefined;
        return pre;
      }

      if (ntype === 'number' || ntype === 'boolean' || value) {
        pre[cur] = value;
      } else {
        pre[cur] = undefined;
      }

      return pre;
    }, {});
  }

  _pickFields(source, fields) {
    return fields.reduce((prev, cur) => {
      prev[cur] = source[cur];
      return prev;
    }, {});
  }

}

exports.CommonResourceAPI = CommonResourceAPI;
let CommonResourceHandlers = (0, _decorate2.default)(null, function (_initialize, _BaseModelHandlers) {
  class CommonResourceHandlers extends _BaseModelHandlers {
    constructor(configOptions, moduleName, store) {
      super(moduleName, store);

      _initialize(this);

      const defConfig = {
        viewName: {
          category: 'category',
          list: 'list',
          detail: 'detail',
          create: 'create',
          edit: 'edit'
        },
        newItem: {},
        enableRoute: {
          list: true,
          detail: false
        },
        listView: ['list', 'selector', 'category'],
        itemView: ['detail', 'edit', 'create', 'summary'],
        listPaths: ['app.Main', this.moduleName + '.List'],
        itemPaths: ['app.Main', this.moduleName + '.List', this.moduleName + '.Detail']
      };
      this.config = Object.assign(Object.assign({}, defConfig), configOptions);
      this.config.noneListSearch = Object.keys(this.config.defaultRouteParams.listSearch).reduce((prev, cur) => {
        prev[cur] = undefined;
        return prev;
      }, {});
    }

  }

  return {
    F: CommonResourceHandlers,
    d: [{
      kind: "field",
      key: "config",
      value: void 0
    }, {
      kind: "field",
      key: "listLoading",

      value() {
        return false;
      }

    }, {
      kind: "field",
      key: "itemLoading",

      value() {
        return false;
      }

    }, {
      kind: "method",
      key: "getCurrentListSearch",
      value: function getCurrentListSearch() {
        return this.state.routeParams.listSearch;
      }
    }, {
      kind: "method",
      key: "getDefaultListSearch",
      value: function getDefaultListSearch() {
        return this.config.defaultRouteParams.listSearch;
      }
    }, {
      kind: "method",
      key: "getNoneListSearch",
      value: function getNoneListSearch() {
        return this.config.noneListSearch;
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putSearchList",
      value: function putSearchList(list, listSummary, listSearch, listView, listKey) {
        return Object.assign(Object.assign({}, this.state), {}, {
          [listView]: {
            listKey,
            listSearch,
            list,
            listSummary
          },
          listLoading: undefined
        });
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putCurrentItem",
      value: function putCurrentItem(itemDetail, itemId, itemView, itemKey) {
        return Object.assign(Object.assign({}, this.state), {}, {
          [itemView]: {
            itemKey,
            itemId,
            itemDetail
          },
          itemLoading: undefined
        });
      }
    }, {
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putSelectedRows",
      value: function putSelectedRows(selectedRows) {
        return Object.assign(Object.assign({}, this.state), {}, {
          selectedRows
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "refreshCurrentItem",
      value: async function refreshCurrentItem() {
        var _this$state$routePara;

        await this.openCurrentItem((_this$state$routePara = this.state.routeParams) === null || _this$state$routePara === void 0 ? void 0 : _this$state$routePara.itemId);
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "closeCurrentItem",
      value: async function closeCurrentItem() {
        const itemView = this.state.routeParams.itemView;
        const enableRoute = this.config.enableRoute[itemView];
        const routeData = this.state.routeParams;

        if (enableRoute) {
          global.historyActions.navigateTo({
            params: {
              [this.moduleName]: Object.assign(Object.assign({}, routeData), {}, {
                itemId: '',
                itemView: '',
                itemKey: ''
              })
            },
            paths: this.config.listPaths
          });
        } else {
          this.dispatch(this.actions.RouteParams(Object.assign(Object.assign({}, routeData), {}, {
            itemId: '',
            itemView: '',
            itemKey: ''
          })));
        }
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "openCurrentItem",
      value: async function openCurrentItem(currentItem, view) {
        var _this$state$routePara2;

        const itemView = view || ((_this$state$routePara2 = this.state.routeParams) === null || _this$state$routePara2 === void 0 ? void 0 : _this$state$routePara2.itemView) || 'detail';
        const itemKey = Date.now();

        if (!currentItem) {
          currentItem = Object.assign(Object.assign({}, this.config.newItem), {}, {
            id: ''
          });
        }

        let itemId = currentItem;

        if (typeof currentItem !== 'string') {
          itemId = currentItem.id;
          this.dispatch(this.actions.putCurrentItem(currentItem, itemId, itemView, itemKey));
        }

        const enableRoute = this.config.enableRoute[itemView];
        const routeData = this.state.routeParams;
        const curPathname = this.rootState.route.data.paths;

        if (enableRoute && curPathname.join('/') !== this.config.itemPaths.join('/')) {
          global.historyActions.navigateTo({
            params: {
              [this.moduleName]: Object.assign(Object.assign({}, routeData), {}, {
                itemId,
                itemView,
                itemKey
              })
            },
            paths: this.config.itemPaths
          });
        } else {
          this.dispatch(this.actions.RouteParams(Object.assign(Object.assign({}, routeData), {}, {
            itemId,
            itemView,
            itemKey
          })));
        }
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "createItem",
      value: async function createItem(data, callback) {
        return this.config.api.createItem(data).then(res => {
          this.dispatch(this.actions.closeCurrentItem());
          global.message.success('创建成功');
          this.dispatch(this.actions.latestListSearch());
          callback && callback(res);
        }, err => {
          if (callback) {
            return callback(err);
          } else {
            throw err;
          }
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "updateItem",
      value: async function updateItem(data, callback) {
        return this.config.api.updateItem(data).then(res => {
          this.dispatch(this.actions.closeCurrentItem());
          global.message.success('修改成功');
          this.dispatch(this.actions.refreshListSearch());
          callback && callback(res);
        }, err => {
          if (callback) {
            return callback(err);
          } else {
            throw err;
          }
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "changeListStatus",
      value: async function changeListStatus({
        ids,
        status,
        remark
      }) {
        ids = ids || this.state.selectedRows.map(item => item.id);

        if (!ids.length) {
          return;
        }

        await this.config.api.changeListStatus(ids, status, remark);
        global.message.success('操作成功');
        await this.dispatch(this.actions.refreshListSearch());
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "deleteList",
      value: async function deleteList(ids) {
        ids = ids || this.state.selectedRows.map(item => item.id);

        if (!ids.length) {
          return;
        }

        await this.config.api.deleteList(ids);
        global.message.success('删除成功');
        await this.dispatch(this.actions.refreshListSearch());
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "latestListSearch",
      value: async function latestListSearch() {
        await this.searchList({
          params: {
            sorterField: 'createdTime',
            sorterOrder: 'descend'
          },
          extend: 'none'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "refreshListSearch",
      value: async function refreshListSearch() {
        this.searchList({
          params: {},
          extend: 'current'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "sortListSearch",
      value: async function sortListSearch(sorterField, sorterOrder) {
        await this.searchList({
          params: {
            sorterField,
            sorterOrder,
            pageCurrent: 1
          },
          extend: 'current'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "changeListPageCurrent",
      value: async function changeListPageCurrent(pageCurrent) {
        await this.searchList({
          params: {
            pageCurrent
          },
          extend: 'current'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "changeListPageSize",
      value: async function changeListPageSize(pageSize) {
        await this.searchList({
          params: {
            pageCurrent: 1,
            pageSize
          },
          extend: 'current'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "resetListSearch",
      value: async function resetListSearch(options = {}) {
        await this.searchList({
          params: options,
          extend: 'default'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "noneListSearch",
      value: async function noneListSearch(options = {}) {
        await this.searchList({
          params: options,
          extend: 'none'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "doListSearch",
      value: async function doListSearch(options = {}) {
        await this.searchList({
          params: Object.assign(Object.assign({}, options), {}, {
            pageCurrent: 1
          }),
          extend: 'current'
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: "searchList",
      value: async function searchList({
        params,
        extend
      }, view) {
        let listSearch;

        if (extend === 'default') {
          listSearch = Object.assign(Object.assign({}, this.getDefaultListSearch()), params);
        } else if (extend === 'current') {
          listSearch = Object.assign(Object.assign({}, this.getCurrentListSearch()), params);
        } else {
          listSearch = Object.assign(Object.assign({}, this.getNoneListSearch()), params);
        }

        const listKey = Date.now();
        const routeData = this.state.routeParams;
        const listView = view || (routeData === null || routeData === void 0 ? void 0 : routeData.listView) || 'list';
        const enableRoute = this.config.enableRoute[listView];
        const curPathname = this.rootState.route.data.paths;

        if (enableRoute && curPathname.join('/') !== this.config.listPaths.join('/')) {
          const args = {
            paths: this.config.listPaths,
            params: {
              [this.moduleName]: Object.assign(Object.assign({}, routeData), {}, {
                listView,
                listSearch,
                listKey
              })
            }
          };
          global.historyActions.navigateTo(args);
        } else {
          await this.dispatch(this.actions.RouteParams(Object.assign(Object.assign({}, routeData), {}, {
            listView,
            listSearch,
            listKey
          })));
        }
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "loadMoreList",
      value: async function loadMoreList(pageCurrent) {
        if (!this.listLoading) {
          const routeData = this.state.routeParams;
          const currentListSearch = this.getCurrentListSearch();
          const listSearch = Object.assign(Object.assign({}, currentListSearch), {}, {
            pageCurrent
          });
          const listView = routeData.listView;
          const listKey = -1;
          this.listLoading = true;
          const {
            list,
            listSummary
          } = await this.config.api.searchList(listSearch).catch(e => {
            this.listLoading = false;
            throw e;
          });
          this.listLoading = false;
          this.dispatch(this.actions.putSearchList(list, listSummary, currentListSearch, listView, listKey));
        }
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "fetchList",
      value: async function fetchList(listSearch, listView, listKey) {
        this.listLoading = true;
        const {
          list,
          listSummary
        } = await this.config.api.searchList(listSearch).catch(e => {
          this.listLoading = false;
          throw e;
        });
        this.listLoading = false;
        this.dispatch(this.actions.putSearchList(list, listSummary, listSearch, listView, listKey));
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)()],
      key: "fetchItem",
      value: async function fetchItem(itemId, itemView, itemKey) {
        this.itemLoading = true;
        const item = await this.config.api.getDetailItem(itemId).catch(e => {
          this.itemLoading = false;
          throw e;
        });
        this.itemLoading = false;
        this.dispatch(this.actions.putCurrentItem(item, itemId, itemView, itemKey));
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: 'this.Init,this.RouteParams',
      value: async function (routeState, action) {
        const routeParams = this.state.routeParams || {};
        const {
          listView,
          listSearch,
          listKey,
          itemView,
          itemId,
          itemKey
        } = routeParams;

        if (!this.listLoading) {
          if (listView) {
            const {
              listKey: prevListkey,
              listSearch: prevListSearch
            } = this.state[listView] || {
              listKey: 0
            };

            if (action !== 'POP' && (listKey > prevListkey || !(0, _utils.simpleEqual)(listSearch, prevListSearch))) {
              await this.dispatch(this.callThisAction(this.fetchList, listSearch, listView, listKey));
            }
          }
        }

        if (!this.itemLoading) {
          if (itemView) {
            const {
              itemKey: prevItemkey,
              itemId: prevItemId
            } = this.state[itemView] || {
              itemKey: 0
            };

            if (action !== 'POP' && (itemKey > prevItemkey || itemId !== prevItemId)) {
              await this.dispatch(this.callThisAction(this.fetchItem, itemId, itemView, itemKey));
            }
          } else {
            const data = this.config.itemView.reduce((prev, view) => {
              if (this.state[view]) {
                prev[view] = undefined;
              }

              return prev;
            }, {});

            if (Object.keys(data).length) {
              this.updateState(data);
            }
          }
        }
      }
    }]
  };
}, _wechat.BaseModelHandlers);
exports.CommonResourceHandlers = CommonResourceHandlers;