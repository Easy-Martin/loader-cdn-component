(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime-corejs2/regenerator'), require('@babel/runtime-corejs2/core-js/promise'), require('react')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime-corejs2/regenerator', '@babel/runtime-corejs2/core-js/promise', 'react'], factory) :
  (global = global || self, global.loader = factory(global._regeneratorRuntime, global._Promise, global.React));
}(this, function (_regeneratorRuntime, _Promise, React) { 'use strict';

  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _Promise = _Promise && _Promise.hasOwnProperty('default') ? _Promise['default'] : _Promise;
  React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /*
  * SystemJS 3.1.2
  */
  (function () {
    const hasSelf = typeof self !== 'undefined';

    const envGlobal = hasSelf ? self : commonjsGlobal;

    let baseUrl;
    if (typeof location !== 'undefined') {
      baseUrl = location.href.split('#')[0].split('?')[0];
      const lastSepIndex = baseUrl.lastIndexOf('/');
      if (lastSepIndex !== -1)
        baseUrl = baseUrl.slice(0, lastSepIndex + 1);
    }

    const backslashRegEx = /\\/g;
    function resolveIfNotPlainOrUrl (relUrl, parentUrl) {
      if (relUrl.indexOf('\\') !== -1)
        relUrl = relUrl.replace(backslashRegEx, '/');
      // protocol-relative
      if (relUrl[0] === '/' && relUrl[1] === '/') {
        return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
      }
      // relative-url
      else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
          relUrl.length === 1  && (relUrl += '/')) ||
          relUrl[0] === '/') {
        const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
        // Disabled, but these cases will give inconsistent results for deep backtracking
        //if (parentUrl[parentProtocol.length] !== '/')
        //  throw new Error('Cannot resolve');
        // read pathname from parent URL
        // pathname taken to be part after leading "/"
        let pathname;
        if (parentUrl[parentProtocol.length + 1] === '/') {
          // resolving to a :// so we need to read out the auth and host
          if (parentProtocol !== 'file:') {
            pathname = parentUrl.slice(parentProtocol.length + 2);
            pathname = pathname.slice(pathname.indexOf('/') + 1);
          }
          else {
            pathname = parentUrl.slice(8);
          }
        }
        else {
          // resolving to :/ so pathname is the /... part
          pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
        }

        if (relUrl[0] === '/')
          return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

        // join together and split for removal of .. and . segments
        // looping the string instead of anything fancy for perf reasons
        // '../../../../../z' resolved to 'x/y' is just 'z'
        const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;

        const output = [];
        let segmentIndex = -1;
        for (let i = 0; i < segmented.length; i++) {
          // busy reading a segment - only terminate on '/'
          if (segmentIndex !== -1) {
            if (segmented[i] === '/') {
              output.push(segmented.slice(segmentIndex, i + 1));
              segmentIndex = -1;
            }
          }

          // new segment - check if it is relative
          else if (segmented[i] === '.') {
            // ../ segment
            if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
              output.pop();
              i += 2;
            }
            // ./ segment
            else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
              i += 1;
            }
            else {
              // the start of a new segment as below
              segmentIndex = i;
            }
          }
          // it is the start of a new segment
          else {
            segmentIndex = i;
          }
        }
        // finish reading out the last segment
        if (segmentIndex !== -1)
          output.push(segmented.slice(segmentIndex));
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

    function resolveUrl (relUrl, parentUrl) {
      return resolveIfNotPlainOrUrl(relUrl, parentUrl) ||
          relUrl.indexOf(':') !== -1 && relUrl ||
          resolveIfNotPlainOrUrl('./' + relUrl, parentUrl);
    }

    function resolvePackages(pkgs, baseUrl) {
      var outPkgs = {};
      for (var p in pkgs) {
        var value = pkgs[p];
        // TODO package fallback support
        if (typeof value !== 'string')
          continue;
        outPkgs[resolveIfNotPlainOrUrl(p, baseUrl) || p] = resolveUrl(value, baseUrl);
      }
      return outPkgs;
    }

    function parseImportMap (json, baseUrl) {
      const imports = resolvePackages(json.imports, baseUrl) || {};
      const scopes = {};
      if (json.scopes) {
        for (let scopeName in json.scopes) {
          const scope = json.scopes[scopeName];
          let resolvedScopeName = resolveUrl(scopeName, baseUrl);
          if (resolvedScopeName[resolvedScopeName.length - 1] !== '/')
            resolvedScopeName += '/';
          scopes[resolvedScopeName] = resolvePackages(scope, resolvedScopeName) || {};
        }
      }

      return { imports: imports, scopes: scopes };
    }

    function getMatch (path, matchObj) {
      if (matchObj[path])
        return path;
      let sepIndex = path.length;
      do {
        const segment = path.slice(0, sepIndex + 1);
        if (segment in matchObj)
          return segment;
      } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1)
    }

    function applyPackages (id, packages) {
      const pkgName = getMatch(id, packages);
      if (pkgName) {
        const pkg = packages[pkgName];
        if (pkg === null)

        if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/')
          ;
        return pkg + id.slice(pkgName.length);
      }
    }

    function resolveImportMap (id, parentUrl, importMap) {
      const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl) || id.indexOf(':') !== -1 && id;
      if (urlResolved)
        id = urlResolved;
      const scopeName = getMatch(parentUrl, importMap.scopes);
      if (scopeName) {
        const scopePackages = importMap.scopes[scopeName];
        const packageResolution = applyPackages(id, scopePackages);
        if (packageResolution)
          return packageResolution;
      }
      return applyPackages(id, importMap.imports) || urlResolved || throwBare(id, parentUrl);
    }

    function throwBare (id, parentUrl) {
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

    const hasSymbol = typeof Symbol !== 'undefined';
    const toStringTag = hasSymbol && Symbol.toStringTag;
    const REGISTRY = hasSymbol ? Symbol() : '@';

    function SystemJS () {
      this[REGISTRY] = {};
    }

    const systemJSPrototype = SystemJS.prototype;
    systemJSPrototype.import = function (id, parentUrl) {
      const loader = this;
      return Promise.resolve(loader.resolve(id, parentUrl))
      .then(function (id) {
        const load = getOrCreateLoad(loader, id);
        return load.C || topLevelLoad(loader, load);
      });
    };

    // Hookable createContext function -> allowing eg custom import meta
    systemJSPrototype.createContext = function (parentId) {
      return {
        url: parentId
      };
    };

    // onLoad(id, err) provided for tracing / hot-reloading
    systemJSPrototype.onload = function () {};

    let lastRegister;
    systemJSPrototype.register = function (deps, declare) {
      lastRegister = [deps, declare];
    };

    /*
     * getRegister provides the last anonymous System.register call
     */
    systemJSPrototype.getRegister = function () {
      const _lastRegister = lastRegister;
      lastRegister = undefined;
      return _lastRegister;
    };

    function getOrCreateLoad (loader, id, firstParentUrl) {
      let load = loader[REGISTRY][id];
      if (load)
        return load;

      const importerSetters = [];
      const ns = Object.create(null);
      if (toStringTag)
        Object.defineProperty(ns, toStringTag, { value: 'Module' });
      
      let instantiatePromise = Promise.resolve()
      .then(function () {
        return loader.instantiate(id, firstParentUrl);
      })
      .then(function (registration) {
        if (!registration)
          throw new Error('Module ' + id + ' did not instantiate');
        function _export (name, value) {
          // note if we have hoisted exports (including reexports)
          load.h = true;
          let changed = false;
          if (typeof name !== 'object') {
            if (!(name in ns) || ns[name] !== value) {
              ns[name] = value;
              changed = true;
            }
          }
          else {
            for (let p in name) {
              let value = name[p];
              if (!(p in ns) || ns[p] !== value) {
                ns[p] = value;
                changed = true;
              }
            }
          }
          if (changed)
            for (let i = 0; i < importerSetters.length; i++)
              importerSetters[i](ns);
          return value;
        }
        const declared = registration[1](_export, registration[1].length === 2 ? {
          import: function (importId) {
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

      const linkPromise = instantiatePromise
      .then(function (instantiation) {
        return Promise.all(instantiation[0].map(function (dep, i) {
          const setter = instantiation[1][i];
          return Promise.resolve(loader.resolve(dep, id))
          .then(function (depId) {
            const depLoad = getOrCreateLoad(loader, depId, id);
            // depLoad.I may be undefined for already-evaluated
            return Promise.resolve(depLoad.I)
            .then(function () {
              if (setter) {
                depLoad.i.push(setter);
                // only run early setters when there are hoisted exports of that module
                // the timing works here as pending hoisted export calls will trigger through importerSetters
                if (depLoad.h || !depLoad.I)
                  setter(depLoad.n);
              }
              return depLoad;
            });
          })
        }))
        .then(function (depLoads) {
          load.d = depLoads;
        });
      });

      linkPromise.catch(function (err) {
        load.e = null;
        load.er = err;
      });

      // Captial letter = a promise function
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
        er: undefined,
        // in the case of TLA, the execution promise
        E: undefined,

        // On execution, pLi, pLo, e cleared

        // Promise for top-level completion
        C: undefined
      };
    }

    function instantiateAll (loader, load, loaded) {
      if (!loaded[load.id]) {
        loaded[load.id] = true;
        // load.L may be undefined for already-instantiated
        return Promise.resolve(load.L)
        .then(function () {
          return Promise.all(load.d.map(function (dep) {
            return instantiateAll(loader, dep, loaded);
          }));
        })
      }
    }

    function topLevelLoad (loader, load) {
      return load.C = instantiateAll(loader, load, {})
      .then(function () {
        return postOrderExec(loader, load, {});
      })
      .then(function () {
        return load.n;
      });
    }

    // the closest we can get to call(undefined)
    const nullContext = Object.freeze(Object.create(null));

    // returns a promise if and only if a top-level await subgraph
    // throws on sync errors
    function postOrderExec (loader, load, seen) {
      if (seen[load.id])
        return;
      seen[load.id] = true;

      if (!load.e) {
        if (load.er)
          throw load.er;
        if (load.E)
          return load.E;
        return;
      }

      // deps execute first, unless circular
      let depLoadPromises;
      load.d.forEach(function (depLoad) {
        {
          try {
            const depLoadPromise = postOrderExec(loader, depLoad, seen);
            if (depLoadPromise)
              (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
          }
          catch (err) {
            loader.onload(load.id, err);
            throw err;
          }
        }
      });
      if (depLoadPromises) {
        return Promise.all(depLoadPromises)
          .then(doExec)
          .catch(function (err) {
            loader.onload(load.id, err);
            throw err;
          });
      }

      return doExec();

      function doExec () {
        try {
          let execPromise = load.e.call(nullContext);
          if (execPromise) {
            execPromise = execPromise.then(function () {
                load.C = load.n;
                load.E = null; // indicates completion
                loader.onload(load.id, null);
              }, function (err) {
                loader.onload(load.id, err);
                throw err;
              });
            return load.E = load.E || execPromise;
          }
          // (should be a promise, but a minify optimization to leave out Promise.resolve)
          load.C = load.n;
          loader.onload(load.id, null);
        }
        catch (err) {
          loader.onload(load.id, err);
          load.er = err;
          throw err;
        }
        finally {
          load.L = load.I = undefined;
          load.e = null;
        }
      }
    }

    envGlobal.System = new SystemJS();

    /*
     * Supports loading System.register via script tag injection
     */

    let err;
    if (typeof window !== 'undefined')
      window.addEventListener('error', function (e) {
        err = e.error;
      });

    const systemRegister = systemJSPrototype.register;
    systemJSPrototype.register = function (deps, declare) {
      err = undefined;
      systemRegister.call(this, deps, declare);
    };

    systemJSPrototype.instantiate = function (url, firstParentUrl) {
      const loader = this;
      return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.charset = 'utf-8';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.addEventListener('error', function () {
          reject(new Error('Error loading ' + url + (firstParentUrl ? ' from ' + firstParentUrl : '')));
        });
        script.addEventListener('load', function () {
          document.head.removeChild(script);
          // Note URL normalization issues are going to be a careful concern here
          if (err) {
            reject(err);
            return err = undefined;
          }
          else {
            resolve(loader.getRegister());
          }
        });
        script.src = url;
        document.head.appendChild(script);
      });
    };

    /*
     * Supports loading System.register in workers
     */

    if (hasSelf && typeof importScripts === 'function')
      systemJSPrototype.instantiate = function (url) {
        const loader = this;
        return new Promise(function (resolve, reject) {
          try {
            importScripts(url);
          }
          catch (e) {
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

    const systemJSPrototype = System.constructor.prototype;

    // safari unpredictably lists some new globals first or second in object order
    let firstGlobalProp, secondGlobalProp, lastGlobalProp;
    function getGlobalProp () {
      let cnt = 0;
      let lastProp;
      for (let p in global) {
        if (!global.hasOwnProperty(p))
          continue;
        if (cnt === 0 && p !== firstGlobalProp || cnt === 1 && p !== secondGlobalProp)
          return p;
        cnt++;
        lastProp = p;
      }
      if (lastProp !== lastGlobalProp)
        return lastProp;
    }

    function noteGlobalProps () {
      // alternatively Object.keys(global).pop()
      // but this may be faster (pending benchmarks)
      firstGlobalProp = secondGlobalProp = undefined;
      for (let p in global) {
        if (!global.hasOwnProperty(p))
          continue;
        if (!firstGlobalProp)
          firstGlobalProp = p;
        else if (!secondGlobalProp)
          secondGlobalProp = p;
        lastGlobalProp = p;
      }
      return lastGlobalProp;
    }

    const impt = systemJSPrototype.import;
    systemJSPrototype.import = function (id, parentUrl) {
      noteGlobalProps();
      return impt.call(this, id, parentUrl);
    };

    const emptyInstantiation = [[], function () { return {} }];

    const getRegister = systemJSPrototype.getRegister;
    systemJSPrototype.getRegister = function () {
      const lastRegister = getRegister.call(this);
      if (lastRegister)
        return lastRegister;
      
      // no registration -> attempt a global detection as difference from snapshot
      // when multiple globals, we take the global value to be the last defined new global object property
      // for performance, this will not support multi-version / global collisions as previous SystemJS versions did
      // note in Edge, deleting and re-adding a global does not change its ordering
      const globalProp = getGlobalProp();
      if (!globalProp)
        return emptyInstantiation;
      
      let globalExport;
      try {
        globalExport = global[globalProp];
      }
      catch (e) {
        return emptyInstantiation;
      }

      return [[], function (_export) {
        return { execute: function () { _export('default', globalExport); } };
      }];
    };

    })(typeof self !== 'undefined' ? self : commonjsGlobal);

    /*
     * Loads WASM based on file extension detection
     * Assumes successive instantiate will handle other files
     */
    const instantiate = systemJSPrototype.instantiate;
    systemJSPrototype.instantiate = function (url, parent) {
      if (url.slice(-5) !== '.wasm')
        return instantiate.call(this, url, parent);
      
      return fetch(url)
      .then(function (res) {
        if (!res.ok)
          throw new Error(res.status + ' ' + res.statusText + ' ' + res.url + (parent ? ' loading from ' + parent : ''));

        if (WebAssembly.compileStreaming)
          return WebAssembly.compileStreaming(res);
        
        return res.arrayBuffer()
        .then(function (buf) {
          return WebAssembly.compile(buf);
        });
      })
      .then(function (module) {
        const deps = [];
        const setters = [];
        const importObj = {};

        // we can only set imports if supported (eg early Safari doesnt support)
        if (WebAssembly.Module.imports)
          WebAssembly.Module.imports(module).forEach(function (impt) {
            const key = impt.module;
            setters.push(function (m) {
              importObj[key] = m;
            });
            if (deps.indexOf(key) === -1)
              deps.push(key);
          });

        return [deps, function (_export) {
          return {
            setters: setters,
            execute: function () {
              return WebAssembly.instantiate(module, importObj)
              .then(function (instance) {
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
     * Only those import maps available at the time of SystemJS initialization will be loaded
     * and they will be loaded in DOM order.
     * 
     * There is no support for dynamic import maps injection currently.
     */

    const baseMap = Object.create(null);
    baseMap.imports = Object.create(null);
    baseMap.scopes = Object.create(null);
    let importMapPromise = Promise.resolve(baseMap);
    let acquiringImportMaps = typeof document !== 'undefined';

    if (acquiringImportMaps) {
      document.querySelectorAll('script[type="systemjs-importmap"][src]').forEach(function (script) {
        script._j = fetch(script.src).then(function (resp) {
          return resp.json();
        });
      });
    }

    function mergeImportMap(originalMap, newMap) {
      for (let i in newMap.imports) {
        originalMap.imports[i] = newMap.imports[i];
      }
      for (let i in newMap.scopes) {
        originalMap.scopes[i] = newMap.scopes[i];
      }
      return originalMap;
    }

    systemJSPrototype.resolve = function (id, parentUrl) {
      parentUrl = parentUrl || baseUrl;

      if (acquiringImportMaps) {
        acquiringImportMaps = false;
        document.querySelectorAll('script[type="systemjs-importmap"]').forEach(function (script) {
          importMapPromise = importMapPromise.then(function (map) {
            return (script._j || script.src && fetch(script.src).then(function (resp) {return resp.json()}) || Promise.resolve(JSON.parse(script.innerHTML)))
            .then(function (json) {
              return mergeImportMap(map, parseImportMap(json, script.src || baseUrl));
            });
          });
        });
      }

      return importMapPromise
      .then(function (importMap) {
        return resolveImportMap(id, parentUrl, importMap);
      });
    };

    const toStringTag$1 = typeof Symbol !== 'undefined' && Symbol.toStringTag;

    systemJSPrototype.get = function (id) {
      const load = this[REGISTRY][id];
      if (load && load.e === null && !load.E) {
        if (load.er)
          return null;
        return load.n;
      }
    };

    systemJSPrototype.set = function (id, module) {
      let ns;
      if (toStringTag$1 && module[toStringTag$1] === 'Module') {
        ns = module;
      }
      else {
        ns = Object.assign(Object.create(null), module);
        if (toStringTag$1)
          Object.defineProperty(ns, toStringTag$1, { value: 'Module' });
      }
      const done = Promise.resolve(ns);
      this.delete(id);
      this[REGISTRY][id] = {
        id: id,
        i: [],
        n: ns,
        I: done,
        L: done,
        h: false,
        d: [],
        e: null,
        er: undefined,
        E: undefined,
        C: done
      };
      return ns;
    };

    systemJSPrototype.has = function (id) {
      const load = this[REGISTRY][id];
      return load && load.e === null && !load.E;
    };

    // Delete function provided for hot-reloading use cases
    systemJSPrototype.delete = function (id) {
      const load = this.get(id);
      if (load === undefined)
        return false;
      // remove from importerSetters
      // (release for gc)
      if (load && load.d)
        load.d.forEach(function (depLoad) {
          const importerIndex = depLoad.i.indexOf(load);
          if (importerIndex !== -1)
            depLoad.i.splice(importerIndex, 1);
        });
      return delete this[REGISTRY][id];
    };

    const iterator = typeof Symbol !== 'undefined' && Symbol.iterator;

    systemJSPrototype.entries = function () {
      const loader = this, keys = Object.keys(loader[REGISTRY]);
      let index = 0, ns, key;
      return {
        next () {
          while (
            (key = keys[index++]) !== undefined && 
            (ns = loader.get(key)) === undefined
          );
          return {
            done: key === undefined,
            value: key !== undefined && [key, ns]
          };
        },
        [iterator]: function() { return this }
      };
    };

  }());

  function systemImport(output, exportName) {
    return window.System.import(output).then(function (module) {
      return exportName ? module.default[exportName] : module.default;
    });
  }

  var loaderCss = {};

  function loaderStyle(src) {
    return new _Promise(function (resolve, reject) {
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
        placeholder = _ref.placeholder,
        errorholder = _ref.errorholder;

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
        _regeneratorRuntime.mark(function _callee() {
          var entry;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
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
        errorholder = _ref2.errorholder,
        placeholder = _ref2.placeholder;

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
        _regeneratorRuntime.mark(function _callee2() {
          var dec;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
//# sourceMappingURL=loader.cdn.component.js.map
