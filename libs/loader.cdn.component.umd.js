(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.loader = factory(global.React));
}(this, function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

  /*
  * SystemJS 3.0.0
  */
  (function () {
    var hasSelf = typeof self !== 'undefined';
    var envGlobal = hasSelf ? self : global;
    var baseUrl;

    if (typeof location !== 'undefined') {
      baseUrl = location.href.split('#')[0].split('?')[0];
      var lastSepIndex = baseUrl.lastIndexOf('/');
      if (lastSepIndex !== -1) baseUrl = baseUrl.slice(0, lastSepIndex + 1);
    }

    var backslashRegEx = /\\/g;

    function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
      if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/'); // protocol-relative

      if (relUrl[0] === '/' && relUrl[1] === '/') {
        return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
      } // relative-url
      else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) || relUrl.length === 1 && (relUrl += '/')) || relUrl[0] === '/') {
          var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1); // Disabled, but these cases will give inconsistent results for deep backtracking
          //if (parentUrl[parentProtocol.length] !== '/')
          //  throw new Error('Cannot resolve');
          // read pathname from parent URL
          // pathname taken to be part after leading "/"

          var pathname;

          if (parentUrl[parentProtocol.length + 1] === '/') {
            // resolving to a :// so we need to read out the auth and host
            if (parentProtocol !== 'file:') {
              pathname = parentUrl.slice(parentProtocol.length + 2);
              pathname = pathname.slice(pathname.indexOf('/') + 1);
            } else {
              pathname = parentUrl.slice(8);
            }
          } else {
            // resolving to :/ so pathname is the /... part
            pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
          }

          if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl; // join together and split for removal of .. and . segments
          // looping the string instead of anything fancy for perf reasons
          // '../../../../../z' resolved to 'x/y' is just 'z'

          var segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
          var output = [];
          var segmentIndex = -1;

          for (var i = 0; i < segmented.length; i++) {
            // busy reading a segment - only terminate on '/'
            if (segmentIndex !== -1) {
              if (segmented[i] === '/') {
                output.push(segmented.slice(segmentIndex, i + 1));
                segmentIndex = -1;
              }
            } // new segment - check if it is relative
            else if (segmented[i] === '.') {
                // ../ segment
                if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
                  output.pop();
                  i += 2;
                } // ./ segment
                else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
                    i += 1;
                  } else {
                    // the start of a new segment as below
                    segmentIndex = i;
                  }
              } // it is the start of a new segment
              else {
                  segmentIndex = i;
                }
          } // finish reading out the last segment


          if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
          return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
        }
    }
    /*
     * Import maps implementation
     * 
     * To make lookups fast we pre-resolve the entire import map
     * and then match based on backtracked hash lookups
     * 
     */


    function resolveUrl(relUrl, parentUrl) {
      return resolveIfNotPlainOrUrl(relUrl, parentUrl) || relUrl.indexOf(':') !== -1 && relUrl || resolveIfNotPlainOrUrl('./' + relUrl, parentUrl);
    }

    function resolvePackages(pkgs) {
      var outPkgs = {};

      for (var p in pkgs) {
        var value = pkgs[p]; // TODO package fallback support

        if (typeof value !== 'string') continue;
        outPkgs[resolveIfNotPlainOrUrl(p) || p] = value;
      }

      return outPkgs;
    }

    function parseImportMap(json, baseUrl) {
      var imports = resolvePackages(json.imports) || {};
      var scopes = {};

      if (json.scopes) {
        for (var scopeName in json.scopes) {
          var scope = json.scopes[scopeName];
          var resolvedScopeName = resolveUrl(scopeName, baseUrl);
          if (resolvedScopeName[resolvedScopeName.length - 1] !== '/') resolvedScopeName += '/';
          scopes[resolvedScopeName] = resolvePackages(scope) || {};
        }
      }

      return {
        imports: imports,
        scopes: scopes,
        baseUrl: baseUrl
      };
    }

    function getMatch(path, matchObj) {
      if (matchObj[path]) return path;
      var sepIndex = path.length;

      do {
        var segment = path.slice(0, sepIndex + 1);
        if (segment in matchObj) return segment;
      } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1);
    }

    function applyPackages(id, packages, baseUrl) {
      var pkgName = getMatch(id, packages);

      if (pkgName) {
        var pkg = packages[pkgName];
        if (pkg === null) if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/') console.warn("Invalid package target " + pkg + " for '" + pkgName + "' should have a trailing '/'.");
        return resolveUrl(pkg + id.slice(pkgName.length), baseUrl);
      }
    }

    function resolveImportMap(id, parentUrl, importMap) {
      var urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
      if (urlResolved) id = urlResolved;
      var scopeName = getMatch(parentUrl, importMap.scopes);

      if (scopeName) {
        var scopePackages = importMap.scopes[scopeName];
        var packageResolution = applyPackages(id, scopePackages, scopeName);
        if (packageResolution) return packageResolution;
      }

      return applyPackages(id, importMap.imports, importMap.baseUrl) || urlResolved || throwBare(id, parentUrl);
    }

    function throwBare(id, parentUrl) {
      throw new Error('Unable to resolve bare specifier "' + id + (parentUrl ? '" from ' + parentUrl : '"'));
    }
    /*
     * SystemJS Core
     * 
     * Provides
     * - System.import
     * - System.register support for
     *     live bindings, function hoisting through circular references,
     *     reexports, dynamic import, import.meta.url, top-level await
     * - System.getRegister to get the registration
     * - Symbol.toStringTag support in Module objects
     * - Hookable System.createContext to customize import.meta
     * - System.onload(id, err?) handler for tracing / hot-reloading
     * 
     * Core comes with no System.prototype.resolve or
     * System.prototype.instantiate implementations
     */


    var hasSymbol = typeof Symbol !== 'undefined';
    var toStringTag = hasSymbol && Symbol.toStringTag;
    var REGISTRY = hasSymbol ? Symbol() : '@';

    function SystemJS() {
      this[REGISTRY] = {};
    }

    var systemJSPrototype = SystemJS.prototype;

    systemJSPrototype.import = function (id, parentUrl) {
      var loader = this;
      return Promise.resolve(loader.resolve(id, parentUrl)).then(function (id) {
        var load = getOrCreateLoad(loader, id);
        return load.C || topLevelLoad(loader, load);
      });
    }; // Hookable createContext function -> allowing eg custom import meta


    systemJSPrototype.createContext = function (parentId) {
      return {
        url: parentId
      };
    }; // onLoad(id, err) provided for tracing / hot-reloading


    systemJSPrototype.onload = function () {};

    var lastRegister;

    systemJSPrototype.register = function (deps, declare) {
      lastRegister = [deps, declare];
    };
    /*
     * getRegister provides the last anonymous System.register call
     */


    systemJSPrototype.getRegister = function () {
      var _lastRegister = lastRegister;
      lastRegister = undefined;
      return _lastRegister;
    };

    function getOrCreateLoad(loader, id, firstParentUrl) {
      var load = loader[REGISTRY][id];
      if (load) return load;
      var importerSetters = [];
      var ns = Object.create(null);
      if (toStringTag) Object.defineProperty(ns, toStringTag, {
        value: 'Module'
      });
      var instantiatePromise = Promise.resolve().then(function () {
        return loader.instantiate(id, firstParentUrl);
      }).then(function (registration) {
        if (!registration) throw new Error('Module ' + id + ' did not instantiate');

        function _export(name, value) {
          // note if we have hoisted exports (including reexports)
          load.h = true;
          var changed = false;

          if (typeof name !== 'object') {
            if (!(name in ns) || ns[name] !== value) {
              ns[name] = value;
              changed = true;
            }
          } else {
            for (var p in name) {
              var _value = name[p];

              if (!(p in ns) || ns[p] !== _value) {
                ns[p] = _value;
                changed = true;
              }
            }
          }

          if (changed) for (var i = 0; i < importerSetters.length; i++) {
            importerSetters[i](ns);
          }
          return value;
        }

        var declared = registration[1](_export, registration[1].length === 2 ? {
          import: function _import(importId) {
            return loader.import(importId, id);
          },
          meta: loader.createContext(id)
        } : undefined);

        load.e = declared.execute || function () {};

        return [registration[0], declared.setters || []];
      });
      instantiatePromise = instantiatePromise.catch(function (err) {
        loader.onload(load.id, err);
        throw err;
      });
      var linkPromise = instantiatePromise.then(function (instantiation) {
        return Promise.all(instantiation[0].map(function (dep, i) {
          var setter = instantiation[1][i];
          return Promise.resolve(loader.resolve(dep, id)).then(function (depId) {
            var depLoad = getOrCreateLoad(loader, depId, id); // depLoad.I may be undefined for already-evaluated

            return Promise.resolve(depLoad.I).then(function () {
              if (setter) {
                depLoad.i.push(setter); // only run early setters when there are hoisted exports of that module
                // the timing works here as pending hoisted export calls will trigger through importerSetters

                if (depLoad.h || !depLoad.I) setter(depLoad.n);
              }

              return depLoad;
            });
          });
        })).then(function (depLoads) {
          load.d = depLoads;
        });
      }); // disable unhandled rejections

      linkPromise.catch(function () {}); // Captial letter = a promise function

      return load = loader[REGISTRY][id] = {
        id: id,
        // importerSetters, the setters functions registered to this dependency
        // we retain this to add more later
        i: importerSetters,
        // module namespace object
        n: ns,
        // instantiate
        I: instantiatePromise,
        // link
        L: linkPromise,
        // whether it has hoisted exports
        h: false,
        // On instantiate completion we have populated:
        // dependency load records
        d: undefined,
        // execution function
        // set to NULL immediately after execution (or on any failure) to indicate execution has happened
        // in such a case, pC should be used, and pLo, pLi will be emptied
        e: undefined,
        // On execution we have populated:
        // the execution error if any
        eE: undefined,
        // in the case of TLA, the execution promise
        E: undefined,
        // On execution, pLi, pLo, e cleared
        // Promise for top-level completion
        C: undefined
      };
    }

    function instantiateAll(loader, load, loaded) {
      if (!loaded[load.id]) {
        loaded[load.id] = true; // load.L may be undefined for already-instantiated

        return Promise.resolve(load.L).then(function () {
          return Promise.all(load.d.map(function (dep) {
            return instantiateAll(loader, dep, loaded);
          }));
        });
      }
    }

    function topLevelLoad(loader, load) {
      return load.C = instantiateAll(loader, load, {}).then(function () {
        return postOrderExec(loader, load, {});
      }).then(function () {
        return load.n;
      });
    } // the closest we can get to call(undefined)


    var nullContext = Object.freeze(Object.create(null)); // returns a promise if and only if a top-level await subgraph
    // throws on sync errors

    function postOrderExec(loader, load, seen) {
      if (seen[load.id]) return;
      seen[load.id] = true;

      if (!load.e) {
        if (load.eE) throw load.eE;
        if (load.E) return load.E;
        return;
      } // deps execute first, unless circular


      var depLoadPromises;
      load.d.forEach(function (depLoad) {
        {
          try {
            var depLoadPromise = postOrderExec(loader, depLoad, seen);
            if (depLoadPromise) (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
          } catch (err) {
            loader.onload(load.id, err);
            throw err;
          }
        }
      });

      if (depLoadPromises) {
        return Promise.all(depLoadPromises).then(doExec).catch(function (err) {
          loader.onload(load.id, err);
          throw err;
        });
      }

      return doExec();

      function doExec() {
        try {
          var execPromise = load.e.call(nullContext);

          if (execPromise) {
            execPromise = execPromise.then(function () {
              load.C = load.n;
              load.E = null; // indicates completion

              loader.onload(load.id, null);
            }, function () {
              loader.onload(load.id, err);
              throw err;
            });
            execPromise.catch(function () {});
            return load.E = load.E || execPromise;
          } // (should be a promise, but a minify optimization to leave out Promise.resolve)


          load.C = load.n;
          loader.onload(load.id, null);
        } catch (err) {
          loader.onload(load.id, err);
          load.eE = err;
          throw err;
        } finally {
          load.L = load.I = undefined;
          load.e = null;
        }
      }
    }

    envGlobal.System = new SystemJS();
    /*
     * Supports loading System.register via script tag injection
     */

    var err$1;
    if (typeof window !== 'undefined') window.addEventListener('error', function (e) {
      err$1 = e.error;
    });
    var systemRegister = systemJSPrototype.register;

    systemJSPrototype.register = function (deps, declare) {
      err$1 = undefined;
      systemRegister.call(this, deps, declare);
    };

    systemJSPrototype.instantiate = function (url, firstParentUrl) {
      var loader = this;
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.charset = 'utf-8';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.addEventListener('error', function () {
          reject(new Error('Error loading ' + url + (firstParentUrl ? ' from ' + firstParentUrl : '')));
        });
        script.addEventListener('load', function () {
          document.head.removeChild(script); // Note URL normalization issues are going to be a careful concern here

          if (err$1) return reject(err$1);else resolve(loader.getRegister());
        });
        script.src = url;
        document.head.appendChild(script);
      });
    };
    /*
     * Supports loading System.register in workers
     */


    if (hasSelf && typeof importScripts === 'function') systemJSPrototype.instantiate = function (url) {
      var loader = this;
      return new Promise(function (resolve, reject) {
        try {
          importScripts(url);
        } catch (e) {
          reject(e);
        }

        resolve(loader.getRegister());
      });
    };
    /*
     * SystemJS global script loading support
     * Extra for the s.js build only
     * (Included by default in system.js build)
     */

    (function (global) {
      var systemJSPrototype = System.constructor.prototype; // safari unpredictably lists some new globals first or second in object order

      var firstGlobalProp, secondGlobalProp, lastGlobalProp;

      function getGlobalProp() {
        var cnt = 0;
        var lastProp;

        for (var p in global) {
          if (!global.hasOwnProperty(p)) continue;
          if (cnt === 0 && p !== firstGlobalProp || cnt === 1 && p !== secondGlobalProp) return p;
          cnt++;
          lastProp = p;
        }

        if (lastProp !== lastGlobalProp) return lastProp;
      }

      function noteGlobalProps() {
        // alternatively Object.keys(global).pop()
        // but this may be faster (pending benchmarks)
        firstGlobalProp = secondGlobalProp = undefined;

        for (var p in global) {
          if (!global.hasOwnProperty(p)) continue;
          if (!firstGlobalProp) firstGlobalProp = p;else if (!secondGlobalProp) secondGlobalProp = p;
          lastGlobalProp = p;
        }

        return lastGlobalProp;
      }

      var impt = systemJSPrototype.import;

      systemJSPrototype.import = function (id, parentUrl) {
        noteGlobalProps();
        return impt.call(this, id, parentUrl);
      };

      var emptyInstantiation = [[], function () {
        return {};
      }];
      var getRegister = systemJSPrototype.getRegister;

      systemJSPrototype.getRegister = function () {
        var lastRegister = getRegister.call(this);
        if (lastRegister) return lastRegister; // no registration -> attempt a global detection as difference from snapshot
        // when multiple globals, we take the global value to be the last defined new global object property
        // for performance, this will not support multi-version / global collisions as previous SystemJS versions did
        // note in Edge, deleting and re-adding a global does not change its ordering

        var globalProp = getGlobalProp();
        if (!globalProp) return emptyInstantiation;
        var globalExport;

        try {
          globalExport = global[globalProp];
        } catch (e) {
          return emptyInstantiation;
        }

        return [[], function (_export) {
          return {
            execute: function execute() {
              _export('default', globalExport);
            }
          };
        }];
      };
    })(typeof self !== 'undefined' ? self : global);
    /*
     * Loads WASM based on file extension detection
     * Assumes successive instantiate will handle other files
     */


    var instantiate = systemJSPrototype.instantiate;

    systemJSPrototype.instantiate = function (url, parent) {
      if (url.slice(-5) !== '.wasm') return instantiate.call(this, url, parent);
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText + ' ' + res.url + (parent ? ' loading from ' + parent : ''));
        if (WebAssembly.compileStreaming) return WebAssembly.compileStreaming(res);
        return res.arrayBuffer().then(function (buf) {
          return WebAssembly.compile(buf);
        });
      }).then(function (module) {
        var deps = [];
        var setters = [];
        var importObj = {}; // we can only set imports if supported (eg early Safari doesnt support)

        if (WebAssembly.Module.imports) WebAssembly.Module.imports(module).forEach(function (impt) {
          var key = impt.module;
          setters.push(function (m) {
            importObj[key] = m;
          });
          if (deps.indexOf(key) === -1) deps.push(key);
        });
        return [deps, function (_export) {
          return {
            setters: setters,
            execute: function execute() {
              return WebAssembly.instantiate(module, importObj).then(function (instance) {
                _export(instance.exports);
              });
            }
          };
        }];
      });
    };
    /*
     * Import map support for SystemJS
     * 
     * <script type="systemjs-importmap">{}</script>
     * OR
     * <script type="systemjs-importmap" src=package.json></script>
     * 
     * Only supports loading the first import map
     */


    var importMap, importMapPromise;

    if (typeof document !== 'undefined') {
      var scripts = document.getElementsByTagName('script');

      var _loop2 = function _loop2(i) {
        var script = scripts[i];
        if (script.type !== 'systemjs-importmap') return "continue";

        if (!script.src) {
          importMap = parseImportMap(JSON.parse(script.innerHTML), baseUrl);
        } else {
          importMapPromise = fetch(script.src).then(function (res) {
            return res.json();
          }).then(function (json) {
            importMap = parseImportMap(json, script.src);
          });
        }

        return "break";
      };

      _loop: for (var i = 0; i < scripts.length; i++) {
        var _ret = _loop2(i);

        switch (_ret) {
          case "continue":
            continue;

          case "break":
            break _loop;
        }
      }
    }

    importMap = importMap || {
      imports: {},
      scopes: {}
    };

    systemJSPrototype.resolve = function (id, parentUrl) {
      parentUrl = parentUrl || baseUrl;
      if (importMapPromise) return importMapPromise.then(function () {
        return resolveImportMap(id, parentUrl, importMap);
      });
      return resolveImportMap(id, parentUrl, importMap);
    };

    systemJSPrototype.get = function (id) {
      var load = this[REGISTRY][id];

      if (load && load.e === null && !load.E) {
        if (load.eE) return null;
        return load.n;
      }
    }; // Delete function provided for hot-reloading use cases


    systemJSPrototype.delete = function (id) {
      var load = this.get(id);
      if (load === undefined) return false; // remove from importerSetters
      // (release for gc)

      if (load && load.d) load.d.forEach(function (depLoad) {
        var importerIndex = depLoad.i.indexOf(load);
        if (importerIndex !== -1) depLoad.i.splice(importerIndex, 1);
      });
      return delete this[REGISTRY][id];
    };
  })();

  function systemImport(output, exportName) {
    return window.System.import(output).then(function (module) {
      return exportName ? module.default[exportName] : module.default;
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

  return Loader;

}));
//# sourceMappingURL=loader.cdn.component.umd.js.map
