"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ModelHandlers = exports.initModelState = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _wechat = require("@medux/wechat");

var _api = _interopRequireDefault(require("./api"));

var initModelState = {
  curUser: {
    id: '',
    username: 'guest',
    hasLogin: false,
    avatar: ''
  },
  loading: {
    global: _wechat.LoadingState.Stop
  }
};
exports.initModelState = initModelState;
var ModelHandlers = (0, _decorate2.default)(null, function (_initialize, _BaseModelHandlers) {
  var ModelHandlers = function (_BaseModelHandlers2) {
    (0, _inheritsLoose2.default)(ModelHandlers, _BaseModelHandlers2);

    function ModelHandlers() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _BaseModelHandlers2.call.apply(_BaseModelHandlers2, [this].concat(args)) || this;

      _initialize((0, _assertThisInitialized2.default)(_this));

      return _this;
    }

    return ModelHandlers;
  }(_BaseModelHandlers);

  return {
    F: ModelHandlers,
    d: [{
      kind: "method",
      decorators: [_wechat.reducer],
      key: "putCurUser",
      value: function putCurUser(curUser) {
        return Object.assign(Object.assign({}, this.state), {}, {
          curUser
        });
      }
    }, {
      kind: "method",
      decorators: [(0, _wechat.effect)(null)],
      key: 'this.Init',
      value: function () {
        var _value = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
          var curUser;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _api.default.getCurUser();

                case 2:
                  curUser = _context.sent;
                  this.dispatch(this.actions.putCurUser(curUser));

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function value() {
          return _value.apply(this, arguments);
        }

        return value;
      }()
    }]
  };
}, _wechat.BaseModelHandlers);
exports.ModelHandlers = ModelHandlers;