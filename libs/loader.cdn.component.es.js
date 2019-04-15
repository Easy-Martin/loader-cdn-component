import React from 'react';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function systemImport(output, exportName) {
  if (exportName === void 0) {
    exportName = "default";
  }

  return window.System.import(output).then(function (module) {
    return module[exportName];
  });
}

var loaderCss = {};

function loaderStyle(src) {
  return new Promise(function (resolve, reject) {
    if (loaderCss[src]) {
      resolve();
    } else {
      loaderCss[src] = true;
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", src);
      link.addEventListener("load", function () {
        resolve();
      });
      link.addEventListener("error", function (e) {
        reject(e);
      });
      document.head.appendChild(link);
    }
  });
}
/**
 * 加载js
 * @param {string} name
 */


function loadScript(src, exportName) {
  return systemImport(src, exportName);
}

function loadComponent(_ref) {
  var src = _ref.src,
      exportName = _ref.exportName,
      _ref$errorholder = _ref.errorholder,
      errorholder = _ref$errorholder === void 0 ? null : _ref$errorholder,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder;

  var LoadWrapComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(LoadWrapComponent, _React$Component);

    function LoadWrapComponent() {
      var _this;

      _this = _React$Component.call(this) || this;
      _this.state = {
        C: null,
        isError: false,
        loaded: false
      };
      _this.isDone = false;
      return _this;
    }

    var _proto = LoadWrapComponent.prototype;

    _proto.componentDidUpdate = function componentDidUpdate() {
      var _this$state = this.state,
          isError = _this$state.isError,
          loaded = _this$state.loaded;

      if (loaded && !this.isDone) {
        this.isDone = true;

        if (isError) {
          this.props.loadError && this.props.loadError();
        } else {
          this.props.loadSuccess && this.props.loadSuccess();
        }
      }
    };

    _proto.componentDidMount = function componentDidMount() {
      this.loaderComponent();
    };

    _proto.loaderComponent =
    /*#__PURE__*/
    function () {
      var _loaderComponent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var entry;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return loadScript(src, exportName);

              case 3:
                entry = _context.sent;

                if (entry) {
                  this.setState({
                    C: entry,
                    loaded: true
                  });
                } else {
                  this.setState({
                    isError: true,
                    loaded: true
                  });
                }

                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                this.setState({
                  isError: true,
                  loaded: true
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function loaderComponent() {
        return _loaderComponent.apply(this, arguments);
      }

      return loaderComponent;
    }();

    _proto.render = function render() {
      var _this$props = this.props,
          forwardRef = _this$props.forwardRef,
          loadSuccess = _this$props.loadSuccess,
          props = _objectWithoutPropertiesLoose(_this$props, ["forwardRef", "loadSuccess"]);

      var _this$state2 = this.state,
          C = _this$state2.C,
          isError = _this$state2.isError;
      return C ? React.createElement(C, _extends({}, props, {
        ref: forwardRef
      })) : isError ? React.createElement(React.Fragment, null, errorholder) : React.createElement(React.Fragment, null, placeholder);
    };

    return LoadWrapComponent;
  }(React.Component);

  return React.forwardRef(function (props, ref) {
    return React.createElement(LoadWrapComponent, _extends({}, props, {
      forwardRef: ref
    }));
  });
}

function loadDecComponent(_ref2) {
  var src = _ref2.src,
      exportName = _ref2.exportName,
      Component = _ref2.Component,
      args = _ref2.args,
      _ref2$errorholder = _ref2.errorholder,
      errorholder = _ref2$errorholder === void 0 ? null : _ref2$errorholder,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? null : _ref2$placeholder;

  var LoadWrapComponent =
  /*#__PURE__*/
  function (_React$Component2) {
    _inheritsLoose(LoadWrapComponent, _React$Component2);

    function LoadWrapComponent() {
      var _this2;

      _this2 = _React$Component2.call(this) || this;
      _this2.state = {
        C: null,
        isError: false,
        loaded: false
      };
      _this2.isDone = false;
      return _this2;
    }

    var _proto2 = LoadWrapComponent.prototype;

    _proto2.componentDidUpdate = function componentDidUpdate() {
      var _this$state3 = this.state,
          isError = _this$state3.isError,
          loaded = _this$state3.loaded;

      if (loaded && !this.isDone) {
        this.isDone = true;

        if (isError) {
          this.props.loadError && this.props.loadError();
        } else {
          this.props.loadSuccess && this.props.loadSuccess();
        }
      }
    };

    _proto2.componentDidMount =
    /*#__PURE__*/
    function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var dec;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return loadScript(src, exportName);

              case 3:
                dec = _context2.sent;
                dec ? this.setState({
                  C: args ? dec.apply(void 0, args)(Component) : dec(Component),
                  loaded: true
                }) : this.setState({
                  isError: true,
                  loaded: true
                });
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0); //TODO 错误处理

                this.setState({
                  C: Component,
                  isError: true
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }();

    _proto2.render = function render() {
      var _this$props2 = this.props,
          forwardRef = _this$props2.forwardRef,
          loadSuccess = _this$props2.loadSuccess,
          props = _objectWithoutPropertiesLoose(_this$props2, ["forwardRef", "loadSuccess"]);

      var _this$state4 = this.state,
          C = _this$state4.C,
          isError = _this$state4.isError;
      return C ? React.createElement(C, _extends({}, props, {
        ref: forwardRef
      })) : isError ? {
        errorholder: errorholder
      } : {
        placeholder: placeholder
      };
    };

    return LoadWrapComponent;
  }(React.Component);

  return React.forwardRef(function (props, ref) {
    return React.createElement(LoadWrapComponent, _extends({}, props, {
      forwardRef: ref
    }));
  });
}

var Loader = {
  loadComponent: loadComponent,
  loadDecComponent: loadDecComponent,
  loadScript: loadScript,
  loaderStyle: loaderStyle
};

export default Loader;
//# sourceMappingURL=loader.cdn.component.es.js.map
