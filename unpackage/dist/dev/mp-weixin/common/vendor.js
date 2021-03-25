(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"bigCreation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 13:
/*!**************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/store/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

var lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
var saveStateKeys = ['_user_info', '_token'];

// 保存变量到本地存储中
var saveLifeData = function saveLifeData(key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    var tmp = uni.getStorageSync('lifeData');
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp);
  }
};
var store = new _vuex.default.Store({
  state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    _user_info: lifeData._user_info ? lifeData._user_info : {
      headImg: __webpack_require__(/*! @/static/image/huge.jpg */ 15), //头像
      id: 1, //id
      userName: 'DR', //昵称
      address: "河南郑州" },

    _token: lifeData._token ? lifeData._token : '',
    // 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
    vuex_version: '1.0.1',
    //我的朋友
    firendList: [{
      userId: 2,
      userName: "陈冠希",
      wechatNumber: 'chenguanxi',
      headImg: __webpack_require__(/*! @/static/image/guanxi.jpg */ 16),
      signature: '我最帅，不接受反驳',
      pictureBanner: __webpack_require__(/*! @/static/image//circleBanner/2.jpg */ 17),
      show: false,
      isTop: true,
      address: "中国香港" },

    {
      userId: 3,
      userName: "迪丽热巴",
      wechatNumber: 'reba',
      headImg: __webpack_require__(/*! @/static/image/girl.jpg */ 18),
      signature: '我最美，不接受反驳',
      pictureBanner: __webpack_require__(/*! @/static/image//circleBanner/4.jpg */ 19),
      show: false,
      address: "新疆维吾尔自治区" },

    {
      userId: 4,
      userName: "小贱贱",
      wechatNumber: 'xiaojianjian',
      headImg: __webpack_require__(/*! @/static/image/boy.jpg */ 20),
      signature: '我最贱，不接受反驳',
      pictureBanner: __webpack_require__(/*! @/static/image//circleBanner/1.jpg */ 21),
      show: false,
      address: "美利坚合众国" }] },





  mutations: {
    $uStore: function $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      var nameArr = payload.name.split('.');
      var saveKey = '';
      var len = nameArr.length;
      if (nameArr.length >= 2) {
        var obj = state[nameArr[0]];
        for (var i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey]);
    } } });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 15:
/*!*********************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/huge.jpg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAJZAoADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA6EAEAAgIBAwMCBQMEAgIBAwUBABECAyEEMUEFElFhcRMigZGhBjLBFLHR8ELhI/FSFTOSFiQ0Q2L/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9TnggmCD9pmz6rZoH34KHdC/9pvaK4kM8RbgYdXqvSZIZbHFfkf+JqOo0ZNG7Bvtz3mfd0PT7DL3asVfBgCfrOPt9K3dNkuDtyFscbXE+/iB6M2A1YnhGSuznh+GeXw2df0penYdRjfOOX5k/e6l+Pr5rzNfV6dmD29xkp+yED0QnZaftBXwzD03qPS9QH4PU4ZtdrLPp3moyEuBNyUOKqIyKoeYGVnMghi2eYFt2ES15uIT2wa8wGZWQV71Etnaj5kTPHFtbPJAkpV934kHLLgAvu21Uz7et163J+PrOT1fr2GvHIxMTAaHLIF/iAvVur359SaenHPKroGh+F7RadbjqTqMzCz82OKX/mcU9WPfs2Z7starkY4tqc8cJMm31fZlsc9WK0JWTy/uQPSdXn0GvHE/Ddw+c3k/gmHZ1Grp8107MU7uKPHwE4OXqe3bkZbFrxzRK9m/LNbDnsjA7PUeqZbMV6er81Odt2nUPu2bHjvfmZsMq7PsTx8yW5xX3lA+IEdhjfDR4fEjhljrybTnyDFmY5Hfx2PEqeShKgazY2C3RQyZkVfZ8/WYsNtcPaW6ttZNl/BA2CZY1mIPF3IbR1gOYh2SVYZOtVbHufEkZgvux9+D2rxAnhucTsp9ySyy17OVp+syuBjbqyUeafEqc0fzd/MCzcFtlnhJn24tWHH0l+OwRFs8EqyXHkbx/wBoFNUd/wBIx+kMweSKBPD++3t9JMyLaU+8qxQLYFqoQOl0PqL0+XsS8ERD7SPU73JyDNcc2wOxMCLQEsxExBaCA9mQHZQO82aM8csNOzN5wyBPk4/9zC42tZnMs0KDdU8kD2HoWzH/AFW0xxvHAHCu/PMh6z1R1W/LVpyE2JeZwAcv+38zD6V1mGr8bYZpn+GUX8ATBn1ZhryxaaK4eVu/9qgbMPUcOny2aemA1WDl9C7P1kdHr2zXnQXwvubrvOPqx/G3GJ+XFS/pbNXWa9WvPHXp2GdFZZH2vwwPaemerYdRqc92eGCNHembzrunC9m7AfBy3+0+b6+rQBzfYtoKTRn12GSZGzMTsH/NwPevqukUwXJfgf8AiB6hxxraeVuqnhcPWdmOuj8X3HkzbZq6T+onFDdqyR492Wdp9aSB7vVtxzw93uAq+RlvD57TzXSetdPnl7XbgiWVkcTs6epMsbMjZj4p7QNg35j+lSBli0nN/HiTWggMI5EjuA6hAYQCMVOGKB2gMI+zcV8QWAQSBBbYCjhXEFgCfWQVklkagF2VUAK7RhJcBAAKuEDkh4gF32hUVwuA2KO2ooB3jD6xI8VGB3YBxUUcLgKoVUcGBBSgYIHJ3jaAibSw4gQyF8SJkg4tD4vzJOzA8i/BKN2ezNDXqvj+5O0A3dHr2plVZB3Gpm39MmtNuv8AF1nF0Cf7SYbdDWZ+JivLVV/vNWDryCqv4YHm8/SOh25+/ps3XutRVKfiu3eZ93qHqnpOSb026ewgIrz4pnq9vT9PsH8TVrzsrnEanG3+kZ6c3Z0nW7MDLj8PO3CvtZXYgLoP6g6ffgG3Y4N1TjwcfTmdN6nDZr9+GzHKvuTwW4dW/J6jTnrBoceRB4qjjzLsuq1ZYmozUq/cKJx8wPaa+pchfdyeGRy9Qwc6MsRO43xPFHqfUZazp33/AIA2qtv3fibtXUu7DHT0urDZiPtp7fHJ5geg6n1TDHH2YbHJXtgF/wAzl9b6lvDLDduwww7+zEvJ/Wq/mc/qvT9mA57dzqyWzVg85foP+JT0mnf1GzH8Tpc9Osf7va2cd+36QM27qd3U7Ux9/wCHlwHF/wDEXUen9Vr6c2OGZjYXklz2PQ6NOvQ4axs77MseX7PFTnep79Ww2GzcDiUYqKvzcDz3Tek9T1eS5ZAiFLVvnsTqYf0ua9eOee4sbsy7fxMPT+q7tXTOOv2jmJlldq1wzB1fV7d2QZ5Nnm2n9IEeqxNW1w1o4Pm5SZIe3wSVLgF3UhkvcgDk4snhsK78yq77siCNjzAvU5av5kGsn8rXzcrVsp+8lYnJAHvZC/rSRPDxIqL2gX4bXERbKqS17DkviZrPiMUK4ga/cKOLx5ZDMMnnn7SozQE8fzLTI2BxSPFQKkB+GP3Jw8kN4451l3ZVb2e0B5IqkUHtCAdu/aFvbEPtAxWW6tQtLR9C4FeOKnYvzyy/HQmN0p9GadWnDE4LflKmgxw9v99PwQMP+ncgTFGGOvPAX2lHytzp4YakF6gs+v8A7k88cA/Llqz+vA/7wOXhtcVrL2KV2leeOJkua8/XvOnnqxvnAR83M23pxtwS/hIGfD2ApnQwrBS8mqle3RmWuCHzXEopG/B8sDQ68KHHLg8MDVknuwpfhlPuAryMDZkN2h94FmzHPAvJL8lRmagVfEevcZY+3Mv6r3hnq9/OA0eBgLHIazxfZmM6np3r2/pdplkiLzx3nIr22B273IpbZy/SB9M9M9R09Vqxz05V7gchPM6Zkle45ezPk/S9Vt6bMcMmrLBqp6/0r+o8326t+DnrDnYK19ymoHrhPmOypm6ffp34GejPDZj84o1+0vOF/j6wGPMfmKqhAlGdojmBAcDvCB3gNqJY2pFa4qALxBkbtjqAVHUAjICqPx2hCAdoJAfmD94CDiHmEGmA4m/EDiHNQAWEDzCARwDiIPEBwYRQIL8cyLrcuXJD4JOEBfhmJwF/PmAfDXz9Y4eIEcgeKJVnqMm/PyS87sTyMDLk79fZxzPp3/2mfb1mvPEw3Drb7vZfibvbao1Kep369GnLLcmOJ5fLA856k9P/AKHbVZLwUDzZPM7sTVThie45S2dD+ofVNfW544dPrDEW088/VmfoPRdnV63Zs3GvUpdPL4+sCJ1XT5YmWzWWWIKSGHVZ69jn0w4ADQX258x9f6dl0+bnrM89JwOVXf7H+0x46NmevIwBxC+8D0vpG/oduw29Y5bN3/i5ZtDfxdTu7eu9Oxadmss5SqufPMF1bD8TBCuwkuyAw9+tQvkYHqet/qDpdI4dI5Z7MrBo9v8Av/icHbv/ABN2zPfkbMnmh+n0nNd7fHCeZF35Ly3AkYqAFHgg6v8A8mI24P8Adj+0s9w4/kQ+8CsxMWnK4OIDXmJc8XkGAifDAqT9ImWqeZWgvEBFn6wfvDxAgM+9xLb2hxcLrtAXmNeIdyJuAx8RmTiieG5EUj48kDRvyM6UtrvM9VJ5/wBpxI9n6QEsDmMSxCAK2wHi89rl2DkI4lPyyv3e04i/EYGk2Zh/cr8Elhv2Yn/7dr4e8xmzO3niM2owNn4uRl7jW4v0id+0FDIfmiZjqNgiIfWWYdVn7qy5PtAlj1e7HI92SnxxLMeqMs+Son/T7i38uTKc+lzx5GyB0MOpwywcNgJ2CpVno1ZcmtF+/wDzMZi40Mtw2utEy/SBHdrx1tONEpTFeG/pOnj1BtPZm9/NSjbr5X2CfIwMKd+KksNuWtstrxL/AMEpdbXyMzZ4oq94Go2691GePsfp5kNvTutXW3jcynDacy/XtceR5YELA4LfrL+k6jPpdxlrX2v9xVjHlgbi8X8xM+V45dqrxA9d0PUbNQ9Z6YLr77dA3bXNXfHL8dp6b0v1TT6jpvWOOzArPBS8X95879K6vPp+s17MMqBB48T1nW9Bl1uGv1L07Y4dQHuzpOQ+/wBQgemuMnJ9H9Ww9Q0ChhuxazwRP1+3M6pdVAkRyOK9pK4D8RMSsRd8wJc/MjVwCSCAVDtCMgKMhUXaA4mECAQhcIBCEIBBhCAHFwYQgCw8kcIDe0jUcGBB4hUF4je0BNRLGr8RX2gH0iWjjmPzEkCGWQHmjvU8z6nr6n1f1HLpLzw0YHuWl5AP8z02VuKduSVY6zXsyeESlPHaB4b1fpNHpzr06cT3ewyV4e/x+k3f07p2dXrUyDE8pfl8TD6uZ9b65kDZgIv0Lf8AadL+lt+GPWb9LkGJiIfr/wC4Ha670/8AE6VxNZmhS/PM8P1fRb+g6hwcMjHJa7nZ+31n0ff1B02pz3J7TsBy+J5D+oetOr0UYUVYVywOedF03UdJj1DuTI4cVp8nz9JyM8xzQ99X5uGW3PVspzUOePEeWa/noROYEPw/cWdviQcU58fSTNhY9hkssSrMrGBRXw/vCrO8eQ812kSwgS9z5ViW/wBIlgPeAzJO8Gl4KisuMS+ICbOKgH1jVWLj9YCU+I747QqFcQAT4gpGEka1O0CHNWEPk8y7DSuK9qZZjpKFOXiBVli/h45P+0MddqI8ToYaHLTVHEeHT3naFVzUDAa1H2hREYPtudJ04ZZGOtRvkkM9CZmNdmBz/wANC0f2hRXwzp9RrMQ47hOfnhy/xAqcU5EfpUijVSSOIR3ZcCDiUrFbfHEsEeGPPESwgQvsPf5uWY7s8Slcj4ZSid4WiVA1mzDYVVMDX8ZD+kyj5OHzJmXFi3A0GOwaoyPpLMdmKUmQnhZRq3uJS0/LNWGWOzJbG/ECPt/EV15mLM+ZniplgJ8/Mvz1e3KwS/hkc7xoTj5gZ3WJYfpKg55Kluz3YvHZkFs+vmBLDY4PDc0BhvG+EmMO7JYZuKN8eSA8V1bROabR8z1X9PerGnYassl17KKc69rf8zze/Ez13ifmOePrK9GzLVkZ4Pbn9SB9J39AYb/9b07hhmFPtxKy78cPbmb+l347tOOY0oXjfZrtOJ/T/qJ1ejLXkq49x+OJ0dx+EY7dBVZXmfS4HRunv35IWsrw2GeBmcmXI/xJjAkMZy8wDtJHEAhCEBMBgwgO4MInmAQuJQkctgQJ3z2hcrNhJGQnECVwiKj4+YBCFwgEIQgPvCBzBgEIQgQgvEBsh5gESRwgIgwqF/SBHusKFp7PeN5leb7RWuflgeEzxen9d2bNnfDO3F7IqP8AFyzbsx6b1XLqtWCY5Hub7OPCV88TX/UPTujq9fWZYOWnIcdgXyX3v9Zxs9+PV/8Aw682tXOCvj4fnx+0DX1Xqe71PMwMjBAMQa+/f9Zyutww0bdhnm5IJjWQ8yrTlsLzMgBXjhuu/wC0zZ5OeeSqtra+fmBFeb8w92QldovbbZzHT8QGt8seDXI19JFEKSLjyQL/AHYJzwyLifLUqVfsQ92Vd4Fjh9FYnHIP7WvrIGWR5YOzMq24Dr9IoK/rAFCjvAB5gAMnhqzyyoH9Cbum9P2bMgSj6kDFhhlk1TLMOnVpG744nf0elhwg/Wps1+mYYvOJ96gcLD0/JwH2rf0Jq19CODiYon0J3dXRA04ifaXHRYgtAvwQPP8A+gaLGz4JM6FcxB/aegw6cCg+/Etx6W0UD9IHF0dI69beK39IsejMs7BH4noDQBTgMi9NjVmAPzcDkHS4Zfl2Y8+EmPqei9udjmB4nfdFN95m3GI/mwW4HnOpM8cb9qgd2Yc0RTX3noN+OAZGWKi1zOb1PT4YjlqyPtA42eKN+PiRviqqXbcW2+/zKFfPMBPbiPDYiETxEAsCxDLs8+ZBPPxDkbJaVlhwUwKVIDT24knGvEijXeoE7E+sCzkldp5ksck7lwLdW/PFpZd+KZHJ3mZBtOPpDFQbYGjPEcaefh+Jnzx9rS9vMs15opfD8xbcVFCwgVceIBF34CMW6qBdozcVDzI7BNji8D2fiRFMympZtffjYc/MDq9B1B0pq6/RyYv4e3E8vz/J+093027Dqul17MMrxyOa+pPmfp/UGnP2bC9eXDivDx/zPUf076l+Hvel2ZXrU9rfY+IHpuiXEy6fIr8Ja+o8/wCZsAO0xYL/AK7PLsOF2eexNRlAsuiMytlOWwC7kTaNIwNXeHiQwys7yVwCORupFyKu4E7pkMtlXK89pi8vExdT1hiJZ+8DTt3mJdkwbvUcMLLP3nK6zr8shMcnv4Zzs9mebatwPRa/U8MmrL+82auqEv3H7zx+LljaLc0aur24cObX3geww3iVcvxyEOeZ5jR6gnDk/vOhp64yr837sDsDzJXMOvqR83+svx2iWP8AMC4W4xBlZkX3JKyBK7hEMdwCOKMuBA7Q8wOQhVMAO8XmOEA4qCccRNQgJa7yFZPNCHhknlqCgNtAQOf6row6ro89Ox/KnFcVPnvXdFs6T3ZAmtzcRu1pan0Lrsvdo2olYYK2/Tg/Rnkevc3osnP8zg2Bza2n+YHm7QQs+Q8x4lpXN+JfvxyozcAE5PIyfTYBg7ci07CQKcsTWc+ZByW64lu1HK1H6SpXJoKqBBvy2QknGjvzEkCK0RXx2kmKrgPvCrZPDU5PAzX0/ROXKP7QMmGty7DOl0npmexF7WeZ0Oj6HDi8L/Sdvp+lxxOMa/SBz+n9O14Vxb950NfSY41xNOGingmg1AcQM2rpsR7S80h2Jfjh9JMxPiBSYUdpM1XzLsQkzEgUGv4JZjhcsMSMxIEHCossB5SW1BCuYGZx+CU7MBCzm5toe0r2Y8c1A42/UqinfsjOb1XT4guWBXyT0G3EtvtUwdVqPbYC/HzA8n1Ogt9hxU5+zH28E73V6z3JVNck5m/Ucj3gc9ik8yskkApgPv55hhk45D4iy7wIF3GRchkcccwwRaZJoyQ7QKoR5ALUid+YDGpIeGRSHaBNruXcnhkuKXwfMrG2o1peOL7wDOrskWxuWZoI34ld3wQBeZLDK8UZBaajxBX7QALtO5NXS7U3Y0pkI3+sy4qZfSW4VeLi/wDlz+8D3fQepOxxxzaTB5r6k6B1QnGX8TyPQ7XLS7LpGv0m3DreEVv7wO7t6sxxbZDT1hk1c4G7q8suDj9ZZo25gKsD1mraOI3LzZx3JwNXVpicsteu9vbK/wBYHWz3h3eJm3dXhid/4nK29dll2a+zMm3bnm3b+8DZ1XqKWYN/cnJ39Rs2rzzJZCjcoSnjz3gLAfLcnXHEjdSTkJxAQN94KeYzgicbgJteJLHLbilJX2hic0Eu9tBxAlr63ZreX+Jt1eqnZa/RnNzwvxKM7HtTA9Pp9Qxy8/wzdh1WKHNzxmG3Zi37kPHM2aetzxr87+8D12O4fiWGwZ5vT6itC/zN+rrcUOT94HZMhIWM5+vqR59x+80G4TuQLjtUHmAUwe/EAeIQYCfEBLC4PPaEBJzcp35VjfDz2+ZcspRy2BVnwwOX6iuPQby7XHIW+9E8z1WZr9L1Zgioq+aEnovW3Vj0O33KcFh8LU8j6jsMOmx1guJScnIkDF1Oxc6aMr5k9q4dPiY9/bb+0yZrnmq83Nb/APP0eDhVh7cv2IGK1eZZidwOXz8SNU1faScgGu7Ab7ceHl+spWNbLe8VFFd2Aqvs8zTo6bLZVJzJ9J0jsRRS53Oj6P2hR4/zAz9L0KY2nmdLT0gVZ3mzR04FIzXhoLHwQIaOnAGgmzHAOCSwwOOJd7SyiBDHGqKJaY/SSMaqTPtAiYnxHRfaSC25IBIETE+I6PiSqoQFUYcRMfiAMT2gyK8wEtPaVbG74alqyrPIurgZNzQ8tHcZzerzT254nZ45m/rEMFt7cfecffupLeb5HtAw9btx2Ch+byzldQ2Db95s6tsXB/ac/JcU93IwM6WLXPa5UnM1ey9bkdrv7SrPW94FLz83A4+ZY4pxUinH0+YCKGWBZ2LldUwxUW2BZljx9ZUjzLhErzKshtgIuoJXMBriNpO0BHNRt1SxPHbiO7A8wGF94kBuAoUQX5gPJMqagNZXR8SI8sOzAeXDfiSwaVHtyEH82MhSD9oHW6LY/h5YilJ+vE04KZfeUena3LDLOrFD+J0zRVNECgw93zNOrCse8ZiB2kwagTFChiflhXEL+YEbL7xqQQKgpUCGXH1lOaV2l+UqzLGyBmyyrm4ht47SeepTiIx9pUCzFsj7SJwR2PkgadGJlSFtzaaH2j7YdBrEx48k6/4I4HHiB57frcV8cTJlS8zs+oajEX6Tj5VAryQJWZq/EnmWSn2t+agacNl9u8ux2ZnJk1MmGKS4Xx2ga8Oq2Yv9zNeHqPtC1v8ASczF45j4Xlge7uCxQIBEPMcSFwHfMSxPcg1bcBLV/aVOXtzXz7ePvcn3W3tIZn/zYnyQOH67gvRuDXuz/Kr9z/meQ9Rwwx0gv5sc8cf4f+J6X+p+oDVlhfLm8niknkut2ZZGL/8AkifoVAy4DklL88zR0m7HTsRLwX8x8zPgpkfDzJZoKBw90gaep0Je7Tjep7UdpjU7Dbdy3X1OzXj+GN4/CQzcM2w9r8ECpu6mjptGWzPGz+JXq1uewCeh9O6RKciqvtAn0XRoBQfpOv02gxQTiS06DEO8168QbgPHArtL8MaO1RY48SZxxAmASYSBz3lgQJBJASJyhJAHlgSDmPzFzcD6wJMSRrxI8wC6jsiv6RLAdicSL35gtEi33gC1KNj3ZPPKrvvM2zdiYtvMDL1ewcEyLK7/ABOJ1e3ATHMvG+GdbqUywcsE7dns/tOZv1GWF5YU+DwwOZuxXJcEp7B2mVxxBcy6uaNmt15tY/le5chnjZdL8n0gUag12p+TLv8AaBiOHHa6fvNDjjjgZZW63uHcjy6bLEDFEXh8QMv4WPOtAyXh/wB5Tt0OKhxicB9ZvdVIZl5jane/H7yXU6Pfp/FwOR/Pi+PHEDj/AIdLzI1zT3mn2Aq3I5a7eeIFQ0l9pLPH3Y2SLjSlwMnFrmoEOfMZ24hmi2RCXzAeZcRwEnXuGvEhyHJzABpGPLw1E8AneNt4viAvqd48ayKe8Sdoi7EgTFGg4iz7t/EscjLGg/NIZ2UJzUDrekb71/h/Fs7YKDXE856QOW1ppB/3J38MthQVx4gWpZGHHMQ2c95LlKgJK7QornvC3zIq+AgHHxIqD2gLBW7qAm37yKNRrRdwOR8wK6slWZTL0leeNwK+Q4iKHklnt4iMQyBWB3vSy8C/knYA9tfScf0/IxMT6k6jsxMBWuIHO9TD8Nv4JwUJ2vUdg4pZ2nD91gwACvrI+2zn5lg2dpJH29iBT7U8yQcSXYtC4LxxAMaO8FPEVUQE/WB72F1FXMKgFtwvmCcRVAaikXFtkFkbVpgIpv4le7MNoCXXN+JYcZLxR/vMu3DjPPPlrgO/eB5D1/dht3BdJsVHzaf8TgdXmbNjhj//AK+1eZ3PVnD8PHJBy2qGT4xKR+/LPN58ZLi3y8/PMAChHxC7L8wPzC1xfeHbHiAuRLg8vEUlrx92wIHS9K6f8TaL24nqOn1gcdycr0rQY4Ytd6nd0YFQLtZRzNGIB2leJwSwKIFmKyYXIHbvJCfMCRLMZWH1lgQJnCRjzEHJJBzAdwuAcQ4+YB+kFPiF/WJgA8RLAIJAS2EiqfapLt4g88QKM6e7Mm/ULwzbnhaccSGWsTtA5OetxVAXtV1Me28X810+Kr/7nX36lT2hMW3p/eHvUb4gczbjgiDy88kybcRDBfa+E8zZt6e83H3vD3lO3p8sS22jhgZcsPymIPuf2ZPDEMfw7XFbPkY8XFz9i1kFyWKZNZnsyOyeYFe8daGQmeKNhynj/EmZOOzHYl6szmnzSf8AEN2PvXLHJaKVkcDPXgYZpnq738QMu/QY5NdsmyZ89bi5GXcO8378VBHk7TLsFFW17n/ftAwoPmLPXkYXwn0lmzHhoqQxyfY4rxApO9eIJJZHLUjUBmVHEeRYNSMeOVd+0BXLK/J7jn5icbLP2j05Vm604S4Fa23A7QSlPiKAzhseZarljaUyqStqvowN3pV49Q/Di/7k7plWQ8c/E4Hpi479bl2bP5neAyLHgIF2OZJ+6ubmVyAL7yH4/g7QNa35JByqZnahI5bm+8DS5wMrmJ3t8MljsWBqtXsVE5VfH7SBnwRZZV2+IEzIT6xtfWZnNGyH4zA0NVIjWXFVKfxWm5F2qcQOp0/U+xFez5mzPrxwCzj6zzrvzHhi/wBVmNMDp9Tv95wzGNBcodypB2pA14vHaWKpxMuG3guTNqwLEUtYwO0MWyOqIEeBiDntJKD2kHYHeB75O3zBUYX2gtsBNsE4hcFYCCJOe0kNEFHsQK0seJj9Q2OrSuFuT/bXzNqgv2uc/PF6rqQbMMOfcHF9q/mB5D+otH4GrTjdmODY+Z5wUpq+e09J/V+6+oNVAB3+zPPasfdnRfbmBbli6+mMMgMvdb89pQUDO16x0uGvodHUAmWxpE7d/wDicSkGAvIfLNfSaV3a+bUt+jzMiAt8/adj0zVjl1PuGw4vx5gd7otXt149/E6erXxYzN0+IAHJ9J0MNYYWQDAR5llDwwxEkgt5IDATtGEkH7QDlgSAqTD4iDjtJBTAkDxJHEV9oK/EBjZF5gDUA7wD9IPDHf1kTLFUEU789oEpFJJSjkisWrgKr8woHvJUVZ2iQgRQZFD4k6+kK5gVOsu6JXl0+OXyeeJpS4nHhgcrf0XK4qv1mbZ0uf8AaltNLO24D3D9ZF1Y5UIV81A8jt6d1K5ayx4Zlzwfd/cI+XuT1fVdHhligNv0nM3+n1ijjVeQgcUcsM0Gk8PZ/aSXGlRB735lu/B1rx7sTgs5mUPcgK1yDAs3a8XAzM7oupmyccrQpDmW7TgzEGqcb5lXtfxLULIGbLFtxTv5mTPFxyfidHfrTIOz4+sy7Nai3fzAy3x8xK1cdUHMT27wF37wvxRxE3H94DxyRv8AiWLjlV8PySoS40puBPMFUeWV+Y7VqJ7wDzHge5o+0UeCjZA6fR9OntyV47FzqY5YmulbJyMOocdIe4E8XE9Y8NwOlnkHFxY8vect6nPJu5Zh1ORXmB1EWVuLfaZjq2L/AFavZgavwuTxcZrSuZmOqtLeJN6o+YGp4OYmnzMefV+LkTqj5ganG+0XsyPEpx6k+SWf6squP3gT/DU5OZB15BxEdWea/ci/1QvDAl+EpbA1PkgdSdiWmz3VXFQKctSeJH8Ny5JtATmBgfaBlwxXhviXYYg92WBiPazzK89mIwLcUDtDPYBMmfUAcMzbOqXgeIGzPeHNzNu6kbpmTLbll2ZBFIH1uEI0ICgx94kgHciCM4iVqiBn6jLL2+3X/cvP2jwwNesAoq37ywBtTtK9+RjrVaPmB87/AKl247PUk70P+7M3pHT49TucES0Lh6je71bYf/8ATjz92dn+muiNhuR5xXn7KQLPX9eR6Fr15YVlhmc/J/1nk2vYN82XPb/1Tjnl0rr14uVYmbxfN1PE5CY5WUjSPiBFOVnd9ExrC07v+JwmlS/E9D6MHsx88/4geh6NEAJ08BMaqYOjxOK8VOhgPCsCSNEKkkqriUgPsRiUSC0VIuYMC8QIzIGZ/wAReSoO3ELUIGsR7RXTyzn5+oatTzmH6zHv9Z1hl+bHg+YHaz6jXi0tMp39Zhjja0fM8pv9YVeyeOZgz9U2bLxa4eCB63P1OuF/LXepVh19ZXgtPdSeRet3ZZ1iK+Rupr6bZu24p7EfFMD0mfqFcXb4Qlmv1ByBeU+CcXpui37Ec7xP0nSw6HPEAz4+TvA6WrrsskEr9Jpx2GXN8zn6el9ifnX7zdhrAD/aBcIneMJEA7MmMBJFXMmsSQIJIhJN3xAogV548Mo26/cJV8TUg3IZAwPN9f04OTXP/qcbLX7c7RQexPW9dr4SrPn9J53dj7Ni/wAQMWeK5mT2+ZF9lJhwfXvNOYZD4DwTBv2JtALF5YFuZjs1OTfuwKGZMwMbHjzJu1xycE/Lla/tKDL3GWJ2OYFezGlQ4lKPxxNGaUh3JWnHJApqoSSNNtN8X5nU9M9F6jrcxz154a14U8frA5IZZIFv6SzLTmAuLU9fn0Pp3pOodh79ldqFuvoTOetdIphs6Qxxur/6QPLJTS1xxciN2Jz8z22fSej+r6k15mGzHCsTGhX62fSeU9R6Hb0HU5a9uKFvsU7kDJUnqxc8wxebP95DFfcFd51fQumw39Xl7uAR/lgU59PmYlh/1mbPHLG563qOkwMeG2czLocMs+bpfFQOV03S57kr/ednR6NnliWfzOp6d6fhiFfBO9o0YY4BcDy56FkeP5hl6Fkch/M9ea8Kh+Hi9oHis/Rcwuu31mXqPT89eN1/M93npET/AGnP6zpDLFDtA+fbTPDNHxI6zZnwF8zv9d6cu5o5r4mj070ukUe53IHF1dJuyOCWvQ7quiex1enYY42/4jz6TXiNH+0DxGfSbcTkJQ454tJPXdT0+NIf4nK39PiKrA5GDmPIzXqya5hlhjjypK8tmIlQNhsQ7xu8DlmF6hL7ftKc9uTA3Z9UHAzPnvW5nFy5lpguPBzAryyWQRfvLzUrySeOke9wKMNanBLDUjzNWGoDiLMp7cQPpiHzCoJ2gkAO8Dl5hEsApvtxA5Yzs/aRO8BLQlTN1YZajFGl5r7M0rTUy9a+3WtcnJA+a7H8T1LcryZ5ZfwrPUf0drXDdkj7cxR+eW5wMNdeob2vzhk0/Znqf6aE9M15oD+Ya+qwL/Vdbs35YY4WOsHj4Vnz/rMXHrN5jTiZqV5LaZ9J6sxcstjkmsw/M/v/AMz551uox25b6ywx2Ofss8eP94GFOF45J6P0QPwy671/E8484g/21yz0/oOODih2M2l+xA9J0eJVnwTW8VMuhx1nKHMhu6rXg37yBuyyAG5H3CXcxY9XjsOEZPXtKRYF+ezmU7doHLDPYJx3nO6zeY4K9wagX7OuNZY/yTB1PqlCY5eO4k5O7rslcK4+0wbc1aLgaOs67PZmVm8PYZRnuzyzpyTH5WV4assntLXUHCwArJuzjsXLdPS5bMjIQfjmLRiYpxOjo2glFfWBZo9Oatrnvc6HTdJhreEr7zPq3A0uM2at2Djzkt/A/wDEDbgYmIWVNOCe0CqnPw24BV19xl+G/HsJA34B7bsGWY88r+0xY777S02ghcDXx45kx4mfHYNUy0yHzAnfMIhI3nswF27sTT5hT5YUBUBcQSSO0j8wMvV4rgoXPL9WPvU8eJ6nqVMFuef6zGn31x5gctUbpR/zMXUgbeOD/aa9uRgonF8TJtDLddcIf7QIY+1xTLlO0zmKOXt5Elzimb8VDXr96Yl8sCjDXnkPdb5Z0um9I27dZmjXHcZ1vSPSwU2Cg8W/ad/X0+Jj7A4Kgeb9L/pxz3OzqQ9o8CM9HvdXR6HExDJPygVNmOOOvBA5CcTq92e3rUcfyjRxApOgy6rY7Niq2ll0TF1npGCqYBXkuel6MEAPBJ9X0442HMDwuvRt6PqMc8FsRK8zu9f02HrXpOOYBv1UtHLQlcfpLOq6YW05LlfpC6uqz1vZED62QPD67Mhe54fiei9IMNfTu0AVv9JyfU+ndPqe3SDxkB9qJ09WOevRjgcBiD+0Dob+pE7kqw245JSXObm5tiw0OY8MD0vTb8cMQXxNuHWYh3/knl8Nmd8s14ZZ0cwPRY9YJw8/cluPVY/P8zz+GzI8yzHqc8VGB3ndZYyrbk5HLOVj1uQJZ+0hn1+Vdz9oFu/DEz5rtL+kcMAtCcjZ1VtqcyJ6g4CCNQPR59Thji08H1nP6j1HAOMi/vOHu9RzyEsB+k5+zqssnl/iB1+o9Quwt/UnO29S5LzMjsXsyIq3As2bF4WVArLTBaamjVoEtIGV1rD8NfE356gO0WGsX6wKNGhrkmrHUHFS/Vq+kuNQXAxfhfTiM1cTQ4gME/JcCswoe0ozKyqaTszNsfz/AEgfSFUIQ8Q8QComOLmACwSEFgRS25TtDLL2v9vniX2XK6tt7DzA8N6h0uWj1zdrRDbryRr59xO9/TGrPX0Rpyuh7p35Yev9KY79HW4oZYJi2+FD/LJ+h76dmOWQhklH1VP3OYGj1XD/APszAUdmQUNWCP8AieV/rDpHR+Btws1OHtquBA7fvPVdfsMut6bUtgqv6JOP/WbfpmvH22YZd/rZcDxueBlhrQeTnmb+k9QenxxAAG37pU52vNxD4GMLbvu1UDvZ+rZ54WZgfFzH1HXZ7cEMm/m5zi1TlJZrx4pgdX0vrnHMwzzbE7s7R1WHuG+Pm55vDUAOA3NGnqdl+zMSvLA9TqyNoolzN1vS55YKC9+xI9FmAN8LOknuwee8DxfV9PsM1cXh+Jm9j7uRJ67qukMhQucfqOlMWgpgctvF4jxFb4fvLs9XtZLXiXUCGGvNtBfhmvpvT89qOexxHmjz/MlrxPcGTWJ3ht9W09HlWs9yHd7EDp9P0OnW2azNPOTxNuK48YaunA8tf8TyHU+sdXsFtxE4oJlOo3Zl7OoQ8gvED271CW59LryO14g/7Eqeo6Nypfwl+Wp5TDLqMNf4mnrRPhV/3IYep9U4psxwzO1pT/BA9bjswANe3DL6mRLTbSc3PGYdbk5WDinw9p1Ol6jZmA53cD0+rfjYD/M14Zi8Nzh9MZKKs6mgbKGBvKW5IkNdgXLB+kAYHaNpgfaAfaQbJO/mRagZ+oxvB+pOT1Ou8Hjt9J2dtIniph267FE/WB5nqdSq0WLRU5ubWQpSNVO/1eJ7szIp57eZw92ty15ZvceLgRUcUDlBnT9I6J2hsceBHkvzOd0mv/VbNeAfAhPaen9Ljo0Y441VF3Au1azHFA/iW4VfPDcYV3OZXsUeIFyivNzM6cHJfaC+ZPHYA8XxM+r1Todu115Z1kNdv/cDbo1mFU2zRljeNSrDZrAROe0tMxTmBzeq6dMmuyrzMWnSa+sMq8Wv6k7nU6jLCx5O05+GF7k8nd+CB4/1nWZf1IAeLf2f+JozGmu0r6m9n9S7l59mNP04f+ZdnQINwMOY2klqxt4jzq1ktIC8wLcMee016yvEow7k1YVXMCTQcSpUtjzyDuzPv2+04gR27XFeeJj29VSg8zP1HUZWl3zMjsVUgbst98XKst/LzMplb3kqt7wLXNS5WqyeGNnMbgQKgVl+GIeJAASXYHJUDRhiJ2mvAoAJn1tHaa8OxUCrafSLVjaSe2yLVajUDZqwKuWOJ4kdZxzJqU1zAzbCpWv5ePEs25BKnKx44+YEcsuOJm2PNkscwUOZRsVeCB9MhBgQCJ7xvEUAq4VHUICTmQS8fnntJpEEDL1ur/UdNs1+23Ma+j4nC9M6bd0/qO3DZZjngV9Eo/yz0oI1zQ8TJnoXqsssQBOePmoGbdqwOv6fPKwM3G/n8qzF/VwPpO5Tgzxr925v61MMMMkb1ZX+/H+Zi/qLHHb6NuPeUZHL55geCdWRji+1MV4a48yejTszXIGhnoOq6TDL+mNOzSCi8hzdsz9Drx/0+W54xPB8wOdnq9lKUviDpMS7nTejM/8A5t2YY5c4Y1S/94mTqNenVkjnX0G/8wKMNgeeTtJbdvuBun5h+Frzx92OZ+pVSp00qZj9Lgd30Xf+Lh7LtHj9p6PRhllgWcTyH9P5v+vx1fN3x9Ge90azHGq7QMuzUuNVOdu6a8mzmd7PGztMOzW/iNwPNdZ02eN1g0zHhryHkSeq3aMcykP1Jy+t6L2Y5IHBfBA8/wBdudeNGVrfBD0jof8AWdT/APKpZYMr0dJu6jflnswTEeBudjounz1Jm8VwBA0+rejmz05x1lZYllVzVf8AE8hnry1ZuGWGWGRwiT6CdQZYd+amDqOg6bqUzz04uXdQq4Hj9erbta168814EOCeo6D07LV0eOsxvLIPctfH/wBzfo6TVjiGvVhgHwTdq1GIC3bcDk6vQ9Yuey1fFE3afS9eCe0Q/SdPDHGiW4n/AGoGPX0ZiiXxNWGuk4l4UPEYW3AWONEmFEA4jCi4CCElIveASL9pKRyfiBDMsqZN+KCTWvMq2Huu4HB6nVnlvaL4Zk29OPTZDj+a+06rjl+Nlm9hokHWOQ5Jz4gc70bpTHZbjyPM9Prx4v4Jzeg0uvdktUvap1cMQPvAn7bD5lW7X+VUsmjEi3h+DkvgX9iBzTBSi78Tx/V+nbsN+W0xzpbsCew6PqMN7lTbip3+sqz1e5ywywPavHEDiej7dutMdjkcFLPT6NvuBu5zN3Q1TggfQmjpTLHIxR4gdhb1Mw6cR6jJe02YK60fhZRpKy2Ng01f3geQ0Y5Z9Z1XU5YoZ5oL8UR7LB4nT6vQaemxwMSrt45uc7PH8qveBhz5aZLVQwzC2S1BXMDRrKZa5VKcD5ll0ccMBZ5fJMPUrU15vHLMe9gczaOWXaQNaTWgvJIoBwQMwJ4luF2cSLYyQ1UC3xwRZHEZVQTiBEBluBIY4jLsAEKgaMGg4mjBolAUd5YZAQDblcWppLleeQsWKrA6OOwMe8rz21fJKLyoKWPDVnl3HmBHZtcjg5iwxzyHia9XSKcn8TXr6WjtA5uHTraklj0q/wDjOvj0wS01YYni4HoWBExkAYVxCK4DihHUAYoJCioAkhkVad2TiYGbqNWOWKpZXM4XquJj6XswRy9uVp8j/wAVPR524J8zj+t6fxPTt2A0uK3+nEDJ6TrN/wDTGGBwrm8vn3s5Lq/0O7dhsSsG8R8jxO//AE4D6Pr1tUKfyzl/1T0q9Hj1OFmWt/Dzo7giP8wPP9X1+e3PLHFDFasO0zY7cNa+wc8jut1KM2l+vIzvHRY6vQc88MPdm+Q57kDl4b+o2j7dZkHx/wDcjs2Z4NZYGD8P/wByrT1W7Rjka8ktrhSotm3bvHDZsc1828QPSf0tjh1HW/ie2nA5+nDPcaxoZ5L+ien9vTbNjiitcn0J7DArEPNQFn2mfPC1ZpS2QTmBk2a/g7zPt1D354nRcReSV56x8QOJt0tIUfaZXBwWxr/ed3PUC8SjPVijxA5mGfJx+kvwyb4Jpx0njGW4awe0CnX72rKmzVraLpjwxK7S7HFqAGNBYS0ACADGU0QJBZRGFcMAojFT6wCh7MAriB9YLTAHiQWNbkV4gNYkK5iWV5L8wGofaVZoveCtd5By5qBXnrMuOxd3M/U6HYjg0k1LIKWHlgW9NrrEXud5qCUauCpcNQLQ4kdp7tGwDvgn8ROVSG3eYYo+SoHk9eG7oupycV5zbP3nd6Pr8M8TDcWvmoZ9JjsvMO/PaU7emMQTiu1QOn+BhspweHmSenxxLDmZehcjAMloCdAXIoIEdWNCPapSYgZj3viX55GvAFLZUljR9YHG9XUaHjipydoUlzq+rt5lfScnd/b3gYc+7bRJauCQz7snq7EC/BrzJuVErxYZL5gRze9sy7sheWXbMpl2vLAgcrXMMu0lrBe0luxDEogYs093EZyyOReUmECwqiGRxHgP1lxpyyOz+0CjDv3mjAb4Jbq6PJT8r+026+jR5xf2gZMMVOCTNWahTU6uvpAO38S7HpQLr+IHHenU7Mv09JfcnUx6cl2GrE8EDn4dKHFS7DQHia32Y+T95VlvxxO5+8CzDXRSEsaxOUmHPrcAeS/vMW31EB/MfvA62e7DHulzNs6vHHjicPf6kvZ/lmDf1+eTxf7sD6o38RUsLfmCvzAdReYV9Y6r7QF5juJ78Q5YDYjlj8ReYDSKuOY/1hAjQN195i9R1mXS5iFGLd/FTcnj5mP1QHoeoW+NeR3+jA5/9OYmPQOGR7fbnlZfe1T/AHl3rfSPUendTqK9ziUPmkf8Sn0DJy6dHmxbr4anWyxvIHlTl+IHy/qejyxwRKzwsR8/H+07HpW439GYZg4q2L9Z6L1P0nX1TniCZN/mK5ucLXqz05mG3bmhdi9v4gYep9Fwy6hy15ezBWznjma9PR9J0un2mGOeSctWyzbvMLNbavENOrPZmZZNL2YHofRNft6MrEBVaK8E65VX5mbpNZq0Y4Hiag4KgAXBPMkEO5zAqeWJD4k05kUgVZYnu5JTnrLaJoyL+8i4lcwMpinFSRi1LXEu5F5YCxE4ZaPErKvvJjAnjxJCDKxjtuBbfEiJfeRuIeYFpl9YWPmVGQWMPd344gWWSC3IuXLzI2/pAk5XxK8m7gtcyN2sCK089pF5OCSaWoA3x2gV2h2hhrcs/dl28S2r8QpAPMCeGNND3kvcHEjiDTfMWfJ9PmBP3cWN0zNtyMt3fsdmDs9r9Llhow3P4g01Al7j2hZUryRQOVlv4GB3ePvJjpw7ApAjq0IjlwfEsz2gVgdonP3cjx8RmBjzYwKzW7czPP8AtO5cenbjsyzMUTHi5h9a9T1dD0mZZ78hA558R+hax9POo/8ALae5PjlgYfUrdhc5e5EZ0fU8n8QPNf8AM5e1ogZcg5ktf9v2kM8qP1ksF9rAtxXmLJaeYhslWeVXTAWafMx7ckylueT4lOevPN4GBLDaFDLMsvecEhq6TNyLGp0tPQ8HD/EDl49Plln2mzX0WTzxOro6Gns/xNuHTgckDkaehs5CbtXQ4gNFTfhqA+ktMcTjiBm19KY00S80BTVMtMsMaJXt34hxUBmANRqYnLMW3rccXlJi3epYghkfzA6me/DE4uZdnXBfLOHv9TOQT9mYNvX5ZPDA7271GhpT9Cc7d6nd0s5Ge3PIbZB5gbdvqGWV0sy5dRnl3WpXUdfSAOS91itY/aPmBQQPsXiEIQCPxER3AXeBww7wqvMBneHEPEC+8BlfEOGIUhfMAeUPPiZ+rB6fLHPH3GQjNFoid5n6gUMcbteYGbodH4GrWYgcq8eLZuLaWIxqj6VHVLUCLiOd1PKer9PmddkYtYodp61anB9VDLq3iijmBx9PTe1tb45udDosDLqdeCXXeVe0tE5+Zv8ATtNbjNOfmB28AMZYPEhi/lkhogSuAyNwGA3vILGqsV8wEkikY8/SCjArSRTiWvMhAr9rd+I6XzJ0eSRaO0ApPML+sircTlXHmoDVPMXvrzILfmRgW+6+Y74lRfjtGXAmPPEFfMDtzEF9oD7/AHgh5jDjmOiBAxHk7SRjzGHNHaOm4EfbzGjJcxN33gRAr6xPAyb2SQUp45gVmv3qSWOjZiVjkhJY5B4lptso7/WBh3dP1Tft2SjDT1GOSbM1DzzOobMEpefoSrbv14ivc+SBXrMyueJX13qOrotGWeeZfguUb+uKTSLkC9uJ4v1rq9+/qXHN/KU1UBdf6hn6h1hnsX2Dwe/xc976Me30rTT3w4pvzPmmrjYPe59H9FU9I0qU+w/zA5nqKu/9D/M5m9nQ6/Ieoea/6zmb9mNp35gUvPi5PH+34kBXsS7XqyyOSBWZIJURqc/DzNurplQS5u1dH2s4gcvV0Tk0i/pN2r04/wDxP2nT1dPhiln8y6sMXgCBz9fRY4v9h+0049PjjXBLM92GPwsoz6ot5r9IF5hjidiLLMB4JztvXmP/AJfxMHUeqhwP8QOzn1RiVx+8y5+oY4r+b+Z5/f6kq08faY9nVZ59n+IHo9vquIP5m/vMHUerZZdsn95xss8nu/xIvPeBs3dfszX8z+8y5btmTzm8/WQr5kqGuIEW3u3BOY1qJSAVCol5h7l8QJKES/EjCleIA5cQLZPHVnl2JfhoeyQPrUIXULgEd34h4isCAcrCoDCA7uHPiIhfMBrDxEsLs7QGtErQsfh5klouU57QIEnYDyyOW4DvOf1PVGL3SYdnXKUZN/pA6u7qjHvlOb1f/wAoZDyzn7d+zY372dDTzpxX4f8AeBVhrCltJ0uhxe//AHvMgjxXFTb01YFjA6OLRUfYlWGQkm5DxcBrzDHmQUkzPEgNOZFEWSM8fPeJyHsQKl5iMue8WfD3ldo8QNBz2iTiVmSSY3AEKkU5kkBgpAqXmgiyFeTxJve6gg8+YFLiXD234liEAqBAxQ5jpCPLtF8XABs57xgeO8ivMli8wJUHLGcyK2SWHaBIOY3iIj8wALOYkLY0RuQVW4Bk0VKM8kxU8SzNRmfdmmL9oHG671k6bNwyH3H1ambD15yGhv7sj6h0L1W5y4olen072oIX+sDX/wDqHVb2sMavzc1atW3LG9+ar4/6w6fpzECjibTEAKgVmrHHWgUV8Tx/rul19StNNf7T3HtvFqec9d6d2YuYclc1A8vhxmNcE996J1uO30zEyacMKqeBBNj8nhno/SesDpHBwpDufdgT6/a5bn2347TLjqzzbR/WanH3Ny7XiBbUCGjpmj8pN2GrECwJT+NhgXco2dfhi1cDp4/h490jeq141yVOBt9TA4X+Jlz9SUeX+IHpM/UMcWxP3mfb6niD+Y/eea2dXty5FqU5bs8nnJYHa3eq8tZf7zDt9Q2ZLT/LMC28tw4G4FufUbMm1a+8qVVVgJEp4gFX5h2kfdBys4gSaTiRsGrgWkij4gSci4c1DDXnkhXE1YdMgKXcDI29oqfh/Wb/AMArsRY9NZ28wMmGpyeCaDpM6bJu6bpQe06OHT4J2LgcDPp0OTmW9P0vuLSdDqdAPYqPANeu/NwFj02OvBULqZNrSh3mvbvPYg9ypn1aM9ua+IH0xiLjgQCJLY6hAOxFccVQC247kXiRcg7sCf6yGewxLslW3cBwzndX6hhhjy8/eBt39UY+aCcnq/Uwv25TBv67Pfl7dd0/WUmjLJfd5gTd+fUZ0cH2mvV0lvJI9J04ZHE7GjSUPmBg/wBEfBHzqDFuvE6v4ZfaZPUdSafeeEuBRgl3LPxTFpalGvIQF5QZi9S25ajHMWl8MDt6uqPbw8yb1QAr+s8xr9TEoy5+jctPURo91/IsDu7euxxw9/voO9jORv8A6l06sq/EH9Gcr1Tq920/C0mQNclzk4+n7lXIFPkgep6f+pdO3OnYF9rH/idrp+vNgJmI/efOtXp/UbdiYYojw0k7fSHW9JgY7Gwb4Vgewz3GRZUMMvdON0vUbd9GI1Z3nb04+3WWcwJHC3J4tyKccxYtQLO7ywa7xc1awq+0B8JE4/SC1UYrAgiPbiCcybfapCqXiBBglklQwogV18SQIXHVNEkDXMCPhksbqKmTxKO8BhHdRWVDu/SAPa2QXlqSVTjtIPd5gQytbmbeXNGSnn95RnWTzAzGkeQ5+ZPHRfKcy/DECkk8MaODm4FJrp7SftolyFfWRyGioEATB+0xdf0+GzpkO83hZV8yOeOOWKJ47wPm/WanT1LinDOh0GWOGkVq5L+odH4XUY5Vwjz+sw45pgApxA6efWY4lDKc+vyRpanPVXla+8G+fiBdn1eeXlqUuzLJtYqvvEofEBc3yx00cwETuQVr6QB7Vci1Ug5N1zAtIDHlic+YInPiS16nY8ECIr2uSMFvia9XTmNWS11F8BA5rg32l2rQ5+Jtw6b3N+3j7Tbo6YxLqBzzoX2XUhh0t5onH1nfxwwcEqZXWGahxAz6unxwrirhtxRKk8s1zAeZo16MtjbyQMmnQ5vJNmPRVjwczoaOiAHj9pqx0BxRA45q/DaSSNgM379ViVzOdt15YtVAW195fcmHqNjie0m1HHGmYXF2baOa7wI9Nqy25U8n1ne6LpTHAfackr9P6Ps0ePE7GGswwCu0DtLywuR9xzHfFwHcIuIXAFQ4iv5g5Vcz7dxiKsCzPYA88EwdT1uGvuzB1/qmGsQyF5KucPb1WzqtlBxd+YHT6v1RRMH+Cc33bOobzXvLtXT/AJbeZow0mPiAum6c4Q/ebTUFvHEenEMQJLcVjxAn01KcTqaTg4nK6K3LmdjU0ECXt57SvfrM9eWORx5lz3kM7Tns94HB9rr2ZYPz+xKer1Yb9OWClva5s67XWxzHxzUxZUn2geU36t3T5uORR8nJIYb88UbsPNT02eBsvBFx7Uzl9R0Jg5AcPY+IGbH1BsK7eam/onLa3m8rMmXQVq9wI/NTp+naaxxe7ZA6XTacDEAC+7NePRYZv5lr7yGnCu/0qbdd9vECejRr1FY4hLw+vEgN+ZMogNJW8MtsZHKr7QA5IyztIhfaSBgFWXGcIRI39JKuzAEViRtjUieGBGqhXMY8dowu24EajKqNYl8QExjxFxGVALgw4JFeYDvhuV5oSSoSrNF7wFmjKVDLzJvD3kQLXzAng80ksupVit/5kzk5YEqVuJe/HEkHEEKgRCufMT27d5JKZHPiB5z+qOmdmkzAvEf955kRwAOThnvut0HUachLsSp4bq9H+m6nbrzXEMuLgZ8sqiMlPrLTHWrTcpcsMc0TzAlWXt5JFwVqpr6bZr2/kQF7M36+hMVsv6wOXp6bLPufzLnpU48Tqmo7AcR4dP7s0WBx/wDSOWXBDPpnA5J3zoPaWX+0zdVocceYHGdZ7Hiaek1YgLXiQyFyCv0mjCsQKgT4VAk+n1OWfJcNGl2ZWX+k7HSdIYnJX3gZjpkwaCJx9hVTrOsCqKmPfqVKIGMzRqVb8k4PM056kLSpmzxc9gXcCrpenz2bLTzO50nTmOJZI9F0tU1OmazHGkCBW4gcEjVMschakVvIgQz1qlHiY+p0ULXidjDGztMvVa32PHiB5vqckK8+ZZ0PT+/YKWNxdXrfxkDzOv6Z04AoeYG7punMNZR/Me+sceeJtMAwKqYOtaxYGo2t0N/rLsc1OWYtdDyy73c14gXuwGrj9wneY89oMkbRCmBdnsAeZzOu2rrQeZfnsVfMzbcHIbOIHnuo1OzNtVVua+l6UA48d5fs01s4PM2atdYlhAocDACpBQeJd1JRxM4WnMDXqv2knuPyX9Iag9pJbcVw4IC6MrKdbX2nM6TWicTqaxAuBNu5HPnGTkcjhgczq8bFfhnLyfapzU7m3V7px+u15694Vwv+IFWHL2bfpKN+C7ARfsTTqG1exLdOj8Tb72qgY8+mXWCUS/oOnTXjZOnnpwQo/aS1468Sr7QDDUccfaX4CPAQwz1oU/xJlLwn7wAsklrv5ipHjtDNKtfEBmUFFlZl3qBlAtGpMbPpKTLjh8ywVDmBJSIbYfaHi4DSH1iMole/iBIT4iOFiHzHcAWR78wYoDh7geYhCJQ5gSXnjtIKXVxOR8SK828EB5ZV5lOWR7mmSzSuGUKCtwJq3YxiV5lfuV47Sd8UQJjfBLMD6yjWNlzViFcd4AFHeCdpJCok44gRe8rzaSWPA3KMhW4CypaH7H1nlf6r6UHDdhj5rL9v/U9Lt2e2lSiee9e67Tlg6+7favpA83pEbvj6cw3o5By/WpZhWOABM+T7slgWY5OAI8jZPQ9J1Rt6YPdeQczza8faa+g3GrMFQyeWB3tIrY2Tp9P0vuTJO8p6HQbNeOWPIgjOxrwMdYVzApdAYBwznddpPbVfxOxVzN1OpyaqB5TbpcFaIaNbs2BXDNfqWLgUHMt9J6dzDJPiBt6LpApo/adI1mIDLNGoxwupT1WwwVXtAeQKcSOeoyBAmbDqsMswGdDAvC6gczqtSYv6zH0mhy3K8k7HWY1rWvmZ+g1KqnzA6PTaTHEWHU5GJNWvAMOJk63BRr4gcnqeux1ZVf7Mn03VmzM5Xk+Jw/Vcc8clpoDsy70Mz2Z23QkD1/Tplhcr6kPY/aXdNimslXVFYsDgbsL6lO/P+Z2+gwDEucbPnq0OS/8AM73R4/lPmBs9vHEydVqMsGybQolO7G8XiBy895rtUuLDq/ccc/ZnE63q+eF5/wCZr9LydgPfggdQxc22XGrtUu1avyFksMCBQaRexcjs1UM1lHKynfkBQ3A5G8TYH1l2BwMhvvLYAeZp14flOOYGLqxSUatapOns0GTbFhopKIEdWvg4mh18VUlhjR2lgXAjq1+2acexzKglmJUCd8RJGCxhRzAg4inEw+q6DLQbA5xeZ0eP2kN2v8TTlhfD2gecxC6urkNnUOpDB4O/Mea4lpSd5w/UOrzx3ZgtL4IHoMOvHS3mX9yZtvqGJkBsH5pnmTq8y7WmVPUZCI2/WB6f/wDVDHKjM/8A5SeHrOZ2zP8A+U8plvyWyvrzI470UVGB7fV66DWaP6zVh6np2imeN/Ck8EdSfPP1lmHV54WmTX0ge1/1xitpX3luvqjJGz9GeIfUs8ilb/SdD0zq9mzZXNfLA9lhmZY8MnivHMwdPnk8JX2mzDLnuQNWOQH1kV5kBruwcragSv6SQ/SVmVcMdviBNeIj5iGzkicu8CSjIKETlcipUCTkBIuRVyGWRVXKnLjv+kCzLYXZxIOz6r9JVnsolbsxq7qoFzs+ZU5C3Kc9t9mRNhwLA1YvmW4Nky4Z32Zo120sDRgfWWg+JXr7S3G64gTMeOZHKiqkzk5leYeO8CGbxM23P24K8MuyUS+z8Tj+r9bhowbyrtQneBk9X9QNOHDeScA955nZnlv2OzO1fDzUe/dn1O335rw8D8SI+0V7JAhmgcMqCPJ/M0fvFfmA3sfMeLTTI2qRvLcD1P8ATPqWtyOm6jLHEAMVT57fzPSbdpiXZR2rsz5thk40iiciT0fRer47emNe5TM7KFMD0WreZZBLtzYJOJ0O3LLeC2KVU7TiuJ5gee9VLQq1Z0vR9AacFOUJj9T1v4uI/M6/peNadZfggbzXWBU4/q2KYNHhneD8lM53X6zLHJqymB5zojJ6gG0J6jRj+Q4nG6PVj+OoV/0noNWIYQMfWY//ABv2ZDocaD9ZZ1p+V/WLoq9p+sDo4H5ZTvxseJowOGV7msXiB5X1jVjTQHHxJ+haj2XXxH6ytpXxLvRMawK+kDv6MawCZurEwftNesrCY+sX2P2gcMp6pr5/zO/0n9pOBqH/AFeV/P8Ameg6QrEgbDtK9zWLLSqqU72hIHht/TOTbOl6Ri6wPBUh1SBQFy7osqxO0D0WtDEtqV7NuOJ3LmLLqE1qtVOJ1XrPtzcTJu/mB6T8Uy4G4OLlzU5PpnUPUBkqlfN+Z3tWI4wMTovK6l+GFBRLnEIiiBW4Hd7RAfEeeRciZA94ExA7RHLFfEB5gWYjcsBleEtGAziEIL9ICez8SLl7RrmCsp2ZU8NQOL6zj+HuyMe2fJPKepIbFG1u/wBJ671vG8ccg4Cv5nk+s0ZZOSC8r2gcxSuYgcngWdPoPSc+pPfsTAHyM6uHpGvUAg/WoHndfSbtrRgzo9N6Du2U5Y5HP0nd09Lr1IgfUSdE344hiAP2gef1f00Ley/4l+H9PdO2NqPgP+J3sNjmctfaXYGOJxzA42n+n9BSj+of8TZh6Zp1caxE8zp+4TtEl8iQMWGrPA58S3ESm5fkWd5VYWMCw5O8LRkMcraknI+IEh57yRlxKjL6RuTAn7m+InJbJEaae8F5gO6LkXIq1ia5tlWeQCHf5gLPZ+fglOezhbg5GNq2+Jj37UuiBPbtatqpnz2qVZKNm9S1/SVe+0gazY+2uJMyHI+Znw5KmjUIhV/WBq1CvabdRwTLqETia9eK14gaMCWHBK8Cl5k+aqBO+JW5Aqnio8ng/wATJ1O/DVry2Z5hjjy35gUeodZr6TS57MgUaG+Wp4br+r2dbuc9lUNGM1ereo5+ob8qE14KAvD9f4nPEHkPvAiDZfjvDZkeGSy4GmyUPd5sgHduDxCNOCAjtGSRjY1xUgXSwLBUCSxUOHtzIW0FRh9YHV9P9U2dJlimI48ct3PVeneudJ1eJhnma867N88/aeDMuSmSxzcWxROyPMD3HqGsy2CJkfJN3p+Ka8a8BPJem+qbFx19Rk5C0OT/AMz13QbNeQGGWKoUDA6J/bMHWtYZfZm6/wAtdvvOf1+QYZX8MDB0SO54/wC3O3hxgTh9Arsa/wC8zuYP5IGLrW8U8cw6IDEr6yPXPD+sn0de0ogdLB4le9rFlmPBKeofyMDzPrOT7wr4mz0anWfpOT69tcdwC1x/vOl6Bl7tI38QPRYFYTD1qGt+02j+Tuzn9fxg/Zgcfp1eqy+/+Z6Hpj8pPPdIL1GT9f8AM9H0/YgaLlPUKHeXtEz9T/Y/aB5Hq3O0CaOgxzyCyLqAU47zX0fAUECfUac8tKeGp5Lr+ky17bu1XzPdbC8KnE6/pTNXjiBV/T5njrLvt/mes1WY95wfSunNeJ9v8zv4lY1Ar2bKauVZba4uQ6jJMu8zuSvMCee591XzJ68l7zHm3sJp05Hs+0DStVGL95C7BZIUYFuClS0L5lI9paNECcQyPL5jviAZPDczbOWaM2yZ8uVgZuv1fidDlxyf8k8vlWWxBoOGeyMTLBweRKnk+s6c6f1DLHLg9y/uwLtGzDWGLQHMtz63XTSX8Tmeo+7DWZ4XU4rv2uSln6sD0r1+OLalfaI6622k+QnmFzzfzL+izb0WezHL2pZflgem6bq/cFDU6GreIV3nE6ZxfNfSdXS4mJRbA6GGwTmJ2c9pnMsvipMMnmBY5v2kMkOWFPkjcPcHEBGQ8kl7h+kj7QK7QNb3HiA7tsSMVZFEeC4vcj2ogWDzz2hlkD3u/iV+58NkpzycbbYF7kc2zNv2Y0g9vMoz3vIszbuoMcU8/eBZt3e04Zg39Raiynf1ZVWXMmWWWeVjAtdjk0XL9eK0/Mq1a6Oe826scaBgWaNfh5m3Vrql7SrViGQDNuGNAeYE8Q4omjAa7yvDHgK5loUQLMUGo1o7yvFq5Xt2BhlnmhiCv2ID6jfjr1ZZ5ZBieXzPF+serbOt2OrCjUcLXLLPXfVsus2OnQ1pwe4vPE4pSfC+IDG+/Y7RjxayKJX07x2J2gRzy4o7MrCuI15fiRq4D/WEVR3AlhVo+Y0po8/MgNcyS394AqFd46fbfiIBHvcSpwXUCQFd6ZLFeS+JW8fSA0wLBMUF4ubNHVbNGRnq2InYZgksck79oHo+m/qXrNTWThmdmydF9Z19bryxyfbklAnDPGuVLXljwzTK7e75ge09OV3U+ez+s9BjRgHeeD9K9YenQ2l4Hy8z2nR9b0/VaDPTsE+jcDP16HH3lvRf2nzM/X5Hu7jynEv6HtisDp49mUdR/Yy/HsyjeHtbgeM9dwctwh8f7zrehYOOnH60zJ6vh7thR8Tq+lYhqx+xA6+AfhnM5vqD/wDG/ZnSP7Cmcz1C/wAN+zA5XRL+Nl9/8z0fTdi553oQ/Fy+/wDmej0HBA0pZdzL1H9rNLdTN1P9jA8lu3+3IGbOi2+6v0nF35LmL3m7oM3HA5p4gegybwJm26zK2Qd/5DmTwzMjt3gaOk1gTo1+UmPpiia+fbAw9TfulFczTuxXJ5O8rNdd4GPOnad+81aE7SGWIZ9pbqAYF3kjvkjC+Y6vL4gSBuWHCWyvE5lvtgF80QLq6kUR7yRlxAWQpKM8Ve803ZIuN8wK8RAfE4/r/SLjj1OvmlM7+Gv+J3AAkduvDbpy15nGYj+pUDxm3LDZqcO4n8Tluk/E7Tp9X0+fR9Rlpy5b4Q4R8f7ftK8NTlmKUXAz6+j9zYE3aPTrT7/WdDpemDEam7VqxMrriBm6boDDvNuGj2nBNOGI/SW44hxUCjHXxUmaa8y32hJB9YFX4fFROIcWkvUC6uQUb8DAozC67yLitBx9JbnwUdvtM6e14fvAFceLleWwCmQ27Kb7hMu3cV8QL89oWjMm7qLUXmZd/UmJY39Jg3dSCK3cDbv6pxEuc7f1Ssz7d7m0XIY4qi/MC0ycs7SaNeKoyvAH6S/DHkbgX4Y8y/AbCuJDWUDLsW0qBp1HBNeC9l4mPBqpeLwnEDXjkHFtywy/KLMplyc8fMm7KEXg7sC7JxbVrE7zy/rvrX4jl0vT37WxT71D171ex6fp0ri08zzwoIPflvywGZoOKHe+0BHK3zIIra8xiDfYgSVtiy/KRh3e5IbMr+0CK2wYd2DAUdRRiniAfSEPF1C/pALask6DEV8yFodyLuQJvLxI3fiBYVfMFYDCu0R3qI4bjO9wJgyZ2kBXzJCg3UAGh5mvpeu3dI47MM8innG+JkEL4k+Bur+8D0uj13X1RjjuHHLjlCeh6LLFwxTIyHyT51S8lA+Gaui6vf0mwy1bKrw9oH0/EA4e8z9TRi3OJ6b/AFPp3Bq6o9mywEuv8zr7duG3UZ4ZDiliNwPP+oU7jn4nV9NL14v0Jx/Ucz8QQ4anX9Nb1ifSB1f/ABnK9RX8N+06qflnI9R//befH+YGD04fev1/zPR6P7Z5/wBNLzfHI/zPQ6P7TniBazP1KmDNKFMxdYnta4geHzHZmLNmqscQ+ky63seSasQogXfiIAM29LlwXOcoIE0aNiIX5qB3unbCprLSc/pFcRWbzKiBXnjy2SvIAZLPYDM+3biXbAq25AqyGO4O1zL1OTktMy+7MzKYHdw2+7E5qWjb3mDp8nIBe024hZA0YHaW1xIaipa43Ape8AlmWMqQHvAmEP8AxkXMJH8QYE04iQR5gZCd43ESxgcn1vojqNP4mGJ+JglteJyum1GdPep6bahii9559rTuyxO0DVg4hXapM2g95h/HwG21lee/Jzcjg8wO1p3GXBNJmUF0zz+re8ZY5cTdq6kfNwOo5gPJA2jjc5z1ONtyP+oFEsgdB2iUSOW2i5gz6n8vCKfEoz6sqr5+0DoZ71FaP1mTZ1R7kvxOdt6oV/NMm7qjHFvLmBv39WYiXz95z9vVhat/rOdv6r3LTM2e1yKgatu/3K3xM65bHvxIjZzJGVXAmYgyRd95X7rLksNgFMDRgtduPmaMHtMxsAD4lmDbYwNuGTQS/C7Jl1qVc067UbgacHtLxvGZ8HjvLXL24mS8Hj5gWGRhiuTx95yPVvVnVqdOCmTY8/SHqXqGOrDKn8yflK7Tzeebn7sslVV5gGWS5OWTb8sVXbf2kVtjOOYD7fWSCy079ou8sNgdO4ezle8CN0UEqeVGWZflAv8ASVLzAYiFRMIQCSWgr4kfMOfiAKsI4nvAOAY6TEX5iC6Etk8slDFKTxAjcOIjlgkB8MYUcRBzD5gSGFq89pEYXcCXuJIyo5GV3CviBZjs5lmOY33lPtUjcUSBoBAcMgDsPedL071nd0hljsc88UOFuv3ucfBruv7yxytAafrA7m3qjq88c8Dullz0npg+wPtPB4bXUiPN9yeq9E9Y07a17H258F1A9O8YJOP6nf4bz4/zOo7RxG+E4ZzOsrLBPpAyemH5lu+3+89Do/tOJxOgxpf++Z29T+UgWvaYet7J9JuWYusOGB4zHW47E8XxNeGNnMka7zGpZ7UEO8DPtxTIrtL+mwXMe/MTiuQTZ0mpxeTvA6HSYpiPwTVnnWMq0YpiXHvaIGPfvDLvMu3erZUl1Fe668zBtyyuiBa7PdlVxHOYJ+sowtzKZowxXK2Br0ZBkFzbjsrIJyz8u4B8TZryfeQOvqbqaa4mPRmcTUZ8QI58THt2e17/AMzVt2cTi9f1DgoPxzAvz6g55L+8rN9vc/ecDb6jljsbWvvEeqna39yB6fVvHiyacMjI7zy3Tdc5ZgK8+Wdrp96hfFwL+qUOGec6vb7drbyz0HVZfkueS9W2JsE+sCf4qLxZ94ZbbKumpy3fk+ah/qAy5VgbseocVL4Zfq6xwDiz5ucjPdfZkDflVXRcD0R1eKXY39Y3qsK4yP3nnjqkK9zB6rL/APJgdjPrXF4T95n29bzYg/dnKz6hy7KyrLYpbA6G3rVssX7syZ78suFlHuvmolbgW+6HuldtQ5gWmVQ9ysqF+ZI5gWmXMkZcjUrxBZYYviBZhbld95r0jZbcr0alqatWrP3nHEC/WcBXE0awC4sddHJBypgaMcgLaD5mXretw06XNQTsL3mfqeqx14PLVdvrOFv3578nPZkpfAwFu3Zb9jszfzPY+CV3bEqtpT8RkAePEdX5i7tR0+ID7HeSKotkU+YefpANnKviQD6xrbUDlgLvC41Dt38xB5gFwuFQYAMHmDwXAgPDJxyU715iVVXvB4iIEruBzAIEB48MHlQhwd2PHL2va4EYcvASRj7myToIEMcU8SVB2jcg7RKh2gNyaQ4iM/a2lyIr3Id4ElCIbe/EXPc5j7+KgWmyimkgUZmZkiNiSlKZMS/pA9H6T67+HiaepVDgyXsTt55Y7df4mvMyxTuM8Ko42J8Tf6d6nv6fYYZ5ueF8l9oHrOkyrlKnY0f2jOB6d1Wrqvza23jhnf0lYh5+PiBZk8TF1eXDNWeVD9pzOt2g1A5uGq0kstaL9pr/AAvbzKtuLXDAzYYvuFnQ0HJMuGCAvaacEIG7FoCV7n8sjhsEuV7th7agYeotza+sxmDlsqatuQrz+kOi1mzdyXwwDT0i52E1nT5D2nT0aA5r+Jf+EHggcHPRljsupPAfeXxOts1FXUxbtZjbAlqzRl7tamXDl4ZNGguBPPbZOb1Ol2jZ3nR9pXMiYjxUDy3V+nraDx9Zw+p1Z6difWfQN+jFwya8Tx3rOBjvQK5gbPRukyyfcnmel16nHA47E5voWWH4Bzyv/E7eeWPtKPEDH1OV4VPMer4tr4pnpOpzA4Jw+s6fZ1OVYjT8FwPPe33ND5ideeLwiT0Or0FyxFeft/7lh6Blz+b+P/cDy2Rkd5EtGek2/wBPbHtmft/7mXP0HqMeyP6QOOYqd5LXoc0DLvN230zqNRbiVXzM2GOWvZWRSMDZo9Fy2he2vp/0mvH+m8UB38v/AH4mz07JcRv5nUwFyOO8Dz+3+l99Xp2mVeFJyet9O6nosw6jXQliIn8T6JhjQNA/aV9fq09Rp/D34Y54pxYcP/agfNcW7D5gFs1+o9K9L1uzWH5TJ9tFcTNhiqXAAVk8MFZbr1295fhqofpAqw113Jq1airTzAxKPpNGrHsXAnq13wFfWa9etwxfdl37SOnExxt8fSTVTl4gSQxxBWY+r3mkVqS6nqsNWCqPxOB1XUZb83lr4uAt+137Ve3iQUOJH6PMCu0AgQgW+OIEjtDtASoFMA7xPEB5iyagJ73GgVFdweYA+YHeHmA0wHEctQuDAH4hGReYBdMK4+8A5bY3uQGlB9IkrmFoK+Yd2oAc8MkY029oVT2jt8wJXRFxyneRPrzHZ3qAy6qOsk5kfdaIVUZlxAkYpiwMFOEkXJqhqBnRUCf4aY1I0pz4gbUaeZYZYvCVfmBUAMTiV3ZdlqQs5leQgWUfMBYBilMnhkDdSJd9ohpRgbNHV56MzPTn7ESxLnqPTP6k15ph1A4vJ7gZ47DIP7gT4qPG1XF/Q4qB9Od+vZpM9eXvxR5PtOH1+6nLmuZ5voPVeo6TPEM83ES8XJ5Pieg1bdHqes9ifiBbi1A7GeN8TLvxQS5L/VYr3JTv3mXZgL3mOILI57wCmZNu4FmXb1HIBzA6+HVBhM27rSktmD8XNKpCY9hsyye8DoYb/wATJ58zuekaG3N+H/E810RljsPcdp6j07qMDEFOeO8DuYYBixZCSo6jAx5yP3kXqcPmj7wLMiyYupw4Ze9VgW+4f1nO63q8B4yPPmBXhkGdXNOKd5zde7HLZY+Zuw2j3YF+X9sWKMi7BOJHHZicrAfUFannwzxHrinU9/P+J7LqOowNeRZ2njfV02dQ18wNnonUOOIL2f8AE9AdQZYDfieX6DExqji52dWw/DA7wNOzL3FS/punrG0kek0+9L+Z1cNAFVUDMYYYnMli4PaT29I7GhQ+keHp7jj3bgQTCqolOeGNXRf3l23otgflzbmfPpeov+5f+/eBz+vwPY2HaeZ6rE/Hfm56nrei6jPB5e3/AHzPPb+h3a957rS/iB0fTsUxLK7ztaMbSYOh1Vicc8zqavysDR7X21Of1i2HNVx+82Z7qKWYer2i9+a+frA4vrvSm7QbQ/Phdvzx/wCp57ERLqp7T247BMuyczzHqPSPS9QjftWyBDUHE14gHbvMmhVqq+ZswxQ7wJfhfluMXGk7QVMe8pyyQvvzA2mZRzzK928w1qrQTLluTG1qpzuq6jLa1dkBdV1DuzS/y3xxM5ZXPEDkh55gHmPyxB8RkAIYqCeGB3geYAF+ZIKiC2N44gCfEi8yTwWSF2XAfmooeYrgSe0VFQIQDiEIU3ADvAgpXEDtAY8xRhGAcsApTntHdpxEqxXzAk8JTC1icijiRv6QJXEsBfiP2rASwv6yX4b5qSNYKwK1YA3JhjTcYg8HECJgrcmUCefEBvJpr6RPLAkZ5VQyY+45OJV5bhio8doEshOfHiRoS/MsEyKe8Mg8nBAqODmSFCxiTjvZFWNNECTkJfZ8su6fqt3T7jZry9qdg8kz8VyRq0UcQPV47Mg7Kxuas1bNBg9uZLV0jm2nEDn5YuTySevp8cnsLOhn0bjyhX3hpwDLtAznRWdgPtIvQA3R+064FBUPaPiBxcundbdcTFu67PpcqxX96nodukRs7zkdX6fhtVcf5gc/X651Jmrmo+Llmfr+1Ch/RgekW9uPvG+kIcH8wM+z13qHF9qj95Rp6/qd+yss1F7XNOz0h8n8y7pfTTXkNfHmBu6MaHu1N+C0qRdPpMMDjxLjD4gIzU4P5mfZsTzNLjTUi6schuBzt+xcVF5nD6rXnltV8T02fS4I8Tm9XoDLKiBzNW38MrxNvSbXbtAeLJyuoszcQSaPTHI6gLTkuB7j0/X+UfM62GFlpOT6dlQFztakqAY6ge3eTMAklBIKAwIZaxO0qdQ3xLfdcL7wMuzpzISpyut9PM8lMT9p36uVZ4DfBA85r1uppDhlmewxxuaev1mOKhVTib+qUS+0CzqOroQX9GYc+qcsi1/VlG7eL3mbbtoaYHY078cqp5+JD1PpTqulMwHZilH0nI1dU4tD9p0um68UFvikqBxcFx2c8N0n1nQ0jkLQ0d5L1HpAf9RrPyPLz5lfTbsUAPvAszwA5PtMe19t9gJs6jbiHLxXE43V9Qo4Yt/WBX1G5yXEePMz1z3hfn57wuAQ8wgQHFccK4gB3jrvFzAYEr4DzBo58xPHMjdtwBW436RPaB4gFQqFQgEKjrtEkAu4LAaYPLADvJApFVcsL+IEuxIrY8RgrJ/hfltgVt1X0gYqgeZaY48j8Q4AQ8wIY617vAyTiA/SMzC74h7wfvAScgHLGmQ0nJ8SZnj7Qrg8+YvcOQnB8wK1fn+YraoZaOCNyKYeCBWNFQMpP8MeYGrPmjiBHGrt7x9m7uIO7zCj5gSVeSouVo4ICdrj7FwAXG6k7csaWQeS4hagSp8domviO07donntAYFdrgtF3xCkGRTg5gfQcQc7yDvOhoxxaoKqeYPUHDKnJ4eeCa9frWGvD+57fSB2+qow7Hicxf8A5OEnM6v1338C1LPT97uyFyu/mB2cbouTFPP8wwLxH+JKvoQINpIZax7kuCAX9IFRqxPEl+CMscaOGIIFT0+L3kXp8D7/AGmg4Lhw+IFZroKjce0sq40o5YFLjIp9Jf7bicSBnapGY+p1GV8TousZDPWPiB57b0JlmtfxH0nRmvd7n5PE7boG6Jm36nEsIGvpN5rzDxOtq6sPP8zxnV9Rs1U4rZDT6puC3KB7h6vFovmS/wBQM8Rj6xvxWxfipfj67s4HHL9iB7A3j5P3jdx9J5Q9dx8ifoRZf1DqxOcsh+xA9Z+MHZInaI28zxv/APUutWl/YmjR64bhTJ/iB2Ov2DrQ7zyfXZZY5LdHPmdfb1btwS5wvUskE88wOfnvTJF/mV7N6lXKzFyzVsuSz1gee0CP4tIfWaNG+sguY/bk5VJ46ssX3KmJ5gd7qerMfS9gJeQlX9JwdfU54U+X6w2b89hS/lOx8yh/zA1bOqzzxbf5mVVVe8Lh4gKEKh2gEfiILOY4AR/pGDUD6kBd46Kt8QapkFviAOVsArmACweCoAsXxCozsvxAFgx5BQ/MV/SAeIXcIA+IBVyQFUSRiBbHwPBADWoq8SVYjXmpBUu3iRcm1O9VcCz3gUHMHbeIVz5lTk1/mF2fX5gScsquRWz6wclKigO4XzEHzCy+GA75hdQqLu8wGMdq3IhDl7QLTJUPqSz8UNVHe5nODvzcBor63AvMhKkXXaUWsSZJ7gKgZJSPJ4gL2o12Yw4Bkl9xd/m8kj2ygFXdHbvAH4gNX94e/wAXASInN1G9uIz202tsePtGla+YCuymCHiLJLotgDXLAM+ozyyt8sDbkkrrtxLDFq4EHJ9wz0PoWwsv5J5/I5OGdb0fLLHPs0JUD2ujIcD7S0L7TBo2P4eNnj4mnDZklBAurvAAIsVTnvJAJUBVIpLEokWAjtGcRRXUBi3HIrXmA9ubgTMoMhfMPdwwJULIuN+YHMlAh7CQ2ahKfMuO0OEgcvd0OGbySs9OwE4Z10PiP2idoHMOhwKo7yGXQYL2Z1HA+Ki/DHxA5D6frR4mbf6XryFLv/v0nedWL3CRy04+CB5Pb6QeB5+0l0/p2WpQGemenxXt/Ei6MQuoHN1dO44i3+so6rpfxO40TtOsqqkctGCcn8QPP4enC3T/ABHt6HGqpnc/BxOxE9OZPJyQPPY+l98mwOVZy+u24mx1a+Qea8zv+vdWdL05hrT3Z2IfaeVP73LPuwHlxiH6xYl39IZtqwweE+YAkXmOuY0ouAoKQ+8YfECP1kg4jTjvHiMBHEODzJZcdzmVrcBLzFdsPMcBhxEsHtCARV3jhAO/mEAVkzEOWAscXvJWHiDkcB2kV8QBybu+IL8MjDm4AsBD5gCskYJzATzFXNy0wvuxuOB2LgVBcDFuql+Ji8HERkGfHiBX+GwNdvBUm5q3D3PzAgYttw9ieGT91qrA2NAQIONEVV4lmWXFRPIwIBFUmVRE8PEAHKuFr4qAg8d/rDmuZF+kCY1n/mC+ZDlOYxgOk5jKYhv7EFp4gNUaOSMqu7cid4CiwJUY+YKXVxNIMS8wPSvouI9n95M9IwCq/meodOL4P2iNGA9iB5h9GxU4/mbuk9Nx1AAztGnF7B+0kag4CBkw1OJXiTxwTyzSYEDXAqxE8ssACS/DqJxSAAVUEuMIwgQceJFx5lqWw9twKHEh7a55lrjE41ArtPEOEk0+kgCQEH3hYeYI3IvHeBO+ICyIvxHVkCV3GLI1AWBZd94FBK77SQ8QHXEinwR3DlgRpg4qVUk3JBZ3gUuBVcyLiV2lySKV4gU+1R4lW7L8LW5qBiK3NVK8dpwP6p6rPR0prwyBzOefFwPNepdTl1XX7c2vaZIB27zNsbrikgKqv6yOTbxAT2uGDXeHYrzFUCzz9IVfFcQxbKjBgRSo6PHmSRKuCdkgDjVWwcnHtUHnl/eV5vPHMAyzV5kVh3YeYAwHmFXGAHeAMIjtHAEgcJfntG8hXMCqL/SA6p78xrF2eWJeeYCX48xnBz+kRTwfaTMF4eAgRBZIw5tsj4OfMWWxSggSsxeC/vDLYJXaVK1zC4EnJ7ROTFfHMIDcmIyfiFQ7QGPywuJhX1gMWqjGuZG4QJ358wHvIeO8dwG9j6Q7RXBgSuKl7ct9oS7Tq2ZYuevDNcU5BQgVNiiUkj3kti5ZLlXu+kjABoqSkSFsALfMacQuoruBIXsQbGRGSG/rA+rpzE4yziJIEKSFVG94I1AVQqHB27xwDiNLIcQuAe3iRqpK4MCMLgwgDEx/SJIEWJBkkIqqBFwo7SDj9JcWxON+YFJikcscWQrvcBd4w+kAjFgJOTiPtG1xBSBG+Y1iYlqA3KL3RXAYE/dZUS0WSI294IpzwfSAZZOJb28zwXrfV5dX12Qr7cOC/vPT+vdf/pOjUT8TLgH4pf8AE8OqtvK92AOV1XftIvHaOvMSwC+O3MAVijIAtJUniqUd5BHvAURqBcC4g94NhUMGvzWcSGearT3gGeSFSC8Q7wYBF5hfiEBhzDmAcw8wCoBzDm6jDm2ACAkHio3vcS9uIA8sKV+kdCl8EahAt0GvXsMtheILX1qQz2GWSnZ5JC7S/DcivLUAV5hCn4jASBFF7RgxgDJGVeCBBwaOY65DzHYHYjU71UCNQQokrGECKfEAkhgwImPeDjGRwI1CpJqrigLtCDCAS3Dfs1a8jXnRl3JUw7nMBU337xnJz3gd6e0O7AFhBIDABsgd6iuAc3AdVGNPaK7hSvfiB9c7wfrI/rDzdwE94lY1PiRYAJcmcyFcxkCX3g9iHeRYBcdwIr7wCHPyQu4i7gOoRjEkBcQqOIeYDCFQGDAgn1kUrzLEkau7gRCP2wSMuAk7RZFSwOOe/iR9twKmKymWuJUg4kCDlFZ8wyOYu0CVcXcLAb+PmR90z+odVh0/SZ7Fp9qn7QPL/wBT9Vhv6t1jZh3p+n/ucM55+Zb1Ox39RnsX+5uVtchATUTBhVwF4jIq4lmvEeUgAWfSRcUL8S3LI7BUg90gR8cftFVx9oQEkI04kV7QF5kqiiHmBKHniHchiQJYnLB4YXQVE8kAu/MdcDUAiV7eIDWRUYLAIAHxAIcw+8BiBzC+eIVXiFc3ADvCo3tAPmAqagkl5KeJPa4oAcnmBUQjDiKuIBCMIWHcgMg9oh4jC8W/EBLxA7c8MTxGC3RYQCqYRPJxFAbDmyD3INlVAdcxEIVAfDIx1zxA4W4CjIMRwQHBeIRvaB9YuyMSVjJcPECSSLYx2hXaJSAmoDBS4cQGQe8BKgsAFivmFw4+YBxUO0Eo4bgFkCR2iWHiJgM5iCoowrzcBnJBoIr+CDyQBZHvBv4iO0CRUKiJIT5gFVEsbVHMi/eAXxFfeRVviKA3G3vK88EFkn7wuzm4FKctPM81/VXVD7OnxS6br9J6Xqt+vp9DnnxXZWfP/UOqy6vq9m1v+5AXxcDL8HghdX9YRVAIXUIMAG5bioSo+8mcneBJW+a/aCi35kS/1hfFVASULcR9GSeTxcHt4GBFfEh5km7i8wCo4HeNgKwkyg5kTG35I1Xiu0BFfrJOIFwAtWDlwkBLIsFfEV8wBI7rxGYr4ZIAaSBEF7SRrat7yWNC8hBWmnxxAs6fS7MkMg9pbaStKzT61x2hipyBact1I2cnb6QGofaReRjCuVhxXeAFVBtIAvYuCIciQFdQuJa7wq4ApH9ojjxHAA4hdCQ7RJAG6uMUul5gdpGAwo+YB9IFkFQuyoBz5h3hdw4Oe8Av6xLHx8RMBjbA7RBfB3+IKmVVAaxVdMa32igMYXxFDmB9WPEkMgMld8EBKxOVSVLK8jmAzLiSHmQCSOIDuMZG/pELAmEdfDIH3kxIDBHmFhHYkSwCJhzBWAox4gEB8QC77Q5qOomBFG4qUjSBxcBUklj9YqhAlzUg38SXMSwII3DmuZOuIu7zArrmKuK+snxcBoGrLgeX/qrent0inAv8/wDE8rY0hxc9N/V5ibMEeUL/AJnmVFK4gEFhE94DqJhcIAHEmMh4ksaRXuQHfLAhJB5IEbp7SOTbJZJ8cyDzAIntC6jOWAHaF21CGJbAmFY/WIGSQYhBpF+IBfDIWEattdmM1Ps968X2gRpZIAK8kV1C7gSGoLzI1f2gn1gNbYxJGqLZKjhgCxebgwYDv4ibgXCj5gHbsxN/NyVNfSRbGACHeOqi8cR3xAB7wYrqEAIMEgMAIMLpgsA+hC/DAyRtLPMk0lhx8QIPiM7QSu8LgKox5iuB3gMeeOGC394cctQWAVxEPMLagEAjuFxQPqonEkPPaVHYlh2gSkSlZJ7SLAKrxxD9I/8AxgQEjUQMmwgQMZMK4hGQGURL9I4PeAqfiJH4k4vECPbzA7whjAF7QWDFAdQh4kDvAnCooztAVc8ESPxJkTAhzIrzxJyD5+0CIt8fMw9f6pp6FDMcsl7H/wBzZn5+z/tPD+uf/wCbn94FPq/X5dd1ZmlYhQP6/wDM59yWfckWAXEwjIChBhAPMY9/iI7x+SAyntLMRr6Ss7ks/wDCBVm88SMll5i8QFC6iZIgBzJhQXIeJZj/AGwEtPeQFD5WTy7sg94DALVu/Ebk088fETFAYL4jDxUMZYdoFftXkjB7SfiRgKqeeSHDCI7wBT5jbTgkGMgF/MO/aSYECLYQpTljz7xkCJQ8weO0HvCAhjh5h/5QBgV5hEwGp4YntE95JgIa+3xGo/22HmKEBr8xfUgxnaAoDzHEd4BH4gd2DARJGNlhIksP7YFaHh4gUQO0IH//2Q=="

/***/ }),

/***/ 16:
/*!***********************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/guanxi.jpg ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 17:
/*!*******************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/circleBanner/2.jpg ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 18:
/*!*********************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/girl.jpg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABAQEBAREBIUFBIZGxgbGSUiHx8iJTgoKygrKDhVNT41NT41VUtbSkVKW0uHal5eaoecg3yDnL2pqb3u4u7///8BEBAQEBEQEhQUEhkbGBsZJSIfHyIlOCgrKCsoOFU1PjU1PjVVS1tKRUpbS4dqXl5qh5yDfIOcvampve7i7v/////AABEIArwCvAMBIgACEQEDEQH/xACGAAACAwEBAQAAAAAAAAAAAAAAAgEDBAUGBxAAAgIBAwMDAwIFAwQDAQEAAAECEQMEITEFEkFRYXETIjKBkRQjQlKxM2KhBhU0ciRDwdHhAQEBAQEBAAAAAAAAAAAAAAAAAQIDBBEBAQACAgMBAAIDAAAAAAAAAAECESExAxJBMiJRQlJx/9oADAMBAAIRAxEAPwD0rZXJjsIwsiMzUpWki3Hp292bYY0i9RRZBnhhS8GiMEh0hjaISJAkKgkAIAAAAAAAAAAAAAohlbGbEXIDoYhDEEABIAAAAAAAAAAAAAAEEgBArYxTOVAVT3KHsWWVSt8EQ0ctPk2wlaOZDA27Z0scaRpItAADSQIJIAAAAAAAgAAAJElOMeWVPMnfaVNxeBj+rJq3JIR6iCtOY0ntG+ws5MtbijwpsR66dfbikXSe0dm0Bw/43OuYJAtbmS4Gj3juAczHrrStpP3NC1mPhjVX2jWAkZxkORpIEEkEEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQSQAAQSBz1AtjElIsSJAyQ4pJRJJAASBAASAAAEkAUSBAASBAASQwIbIEkwiheWWoIkkACgAAAAAAAAAAAAoAACAACAIZkyyNUnSOfllbCVCbbL4YxMSNkUERGCRYBJWkASAEASAEAAAACTnGCbkzlajXt2otRQ0lsjpZM+PGrcjnZte/6dkcfJqJSun+pTU5vZtmpi5XOt8tY2+W2PHJNmfDgUeTV3xiXiElEVLzIm8S3e5nnl9zHPNuXW0tkbp6qEeIlL1UnwjKnKfikQ2oLcumblWh5phHNJGbviTb9BpNtn1IyQKaT2e5luX9rDvrlNCRfZ1MeqlGW51MWqtLuPMLI3Sbsujna2szZtqZaetTTJOLp9VxudWM+4xZp1mUq0BLZKYaMSQBBIEEgAABQAAAAAAAAAAAAAAAAAAAAEEgAhKYMgCpIsQqGIABWwQDkkEgAAQBIEABIEABJIoAMQRYATZW2SKAItQiHAkkgCgACCBgFskCQIACQAAAAAAIJFYFWR0jmye5syszxx27YrK7CbUZscKNKCxJJAFVJAAAABDaQEmXNqseJNXbMmp1q3jBnDzZu61ZZHO5tOo1ksj5Oc5zk/UmMJSNShHGvuN8Rz5qqGnm95M2QqNpL9SpzbW+y9CmeblJE5rXEanOMd7Ms8zsqbk+BH6LdlZtEpyfkn6a5Y0VSt7yG53ZqJon1HxFEKDe7e5akqHvtXATWyKCjuixOuCLshyl5/wCCLpoU2g2l4TM3wmWQeRblBPEqbic+TlF0mddW1yyjNpXNXsyFlUYdRR08OtkjzmRZMcmpbUW48rTTHbMysenj1BvlDrV34pnnI5WmbceSRLHTHK16KGoVK0aVJNWjz0Mz5Rtx5+K2MadJk6xJTjyKaLSNpACAJAAAAACAAAAAAAAAAAAAAAAAIAAAREggARhEJERAtAEAAQSQAAAAAAAAAAAEEkALYqJAB0SQSBIEABIEABIAAASQSBIEABIAAAVzY7KMjCVRLdl0IlUVbNcUCBIYACgAAoAApzZoYottgPPJHHFuTpHC1Ovc21F/aZtRqsmaTp1E5uTKr7YrZGpHHLOrMuRy/F8hjx+XuxMcW3b3ZqvtXqzdZnJto7+RJT3t/kVyn2K3yzK5SmzOlt0eWVyl67jpJfly/AkUo/IGoydttsaK9CIpUOFCjVjJXdfuTSFu9kBOytIPBK9g7kt2BMYt7jUkVPPvsL3SbtukReGmORehEsjXCM7y41yxHnh/TbCNKzZGWQm/MjEpSnxEeMZBN1qyRjNbqzkTgoSpPY6yhJqkV5NMpRA58ZV4Lo52vKKKUZVJl8IxXKTKjbiyyadpF6zR+CrHPHZfUJbWmzLpNtGHNKPuvVHXxZVkjaZ59QcfxZpxZXBrw2StS2O6BRhzKaryXmXRIABAAAAAAAAAAUAAAAAAAAAEEASACEgACMhEsEAyJAAAAJAUCQAgCQAAAAAVjCsBSUQhgAkAAAAkCAJACCSAAkCAAYBSQJJFsLKBsyzZbJlC3ZEq3Gi9CQRYVQAAAABVlyxxxbbAXPnjii99zzGr1Tm92WazV90pLycaU3J7mpHHOrHlfL/REwTdJlCTlI3wjGEbdG6xOTr7Y7iyl223yQ3W7/Qz5J2/cy2Wb7pO/wBiL3Epr5D9UVirU78liSoqikkXLdcA0lyZYqSEUa5I3kNqmTbBN+Aq2DYiH71wUt82yuU62W4dkp/nKlfAIh5a/FWxownL8nSGilEbui+UO29JjixFqhj8LcRU1tY6hl8UQ0sSi+HTQ3Y7doXszeaXuSll4YNLYui9NNOzK45PN/I8VJLdA0warE7c0uTIpu47s7ObHKcEjiTi4SaNSs2ctmLJR0Y1Pmjhxkk0ao55GaS6ddRLKMWPN6s2xmStyxZCTjJNM62HL3rfk5GzLMc3BojUdoCvHNTVjkbSBBIAAAAAAAAAAAAAQAAAAAAAoAACMhDMVAWEioYAAAACCSAAAAAAAABBhQAkgYAAAAkAAAAgiwJIEchXMC0LKe8O8C6yLKHMr+owm2uyHIzLILLIDa2UhYPcxvK26RoxkRuiOURZYpFU4CdxDmA0pKKbZ53WatzbrjwaNbqe68cWed1OVttI1IzlVeTLbZUn37i14bL8ULeyNxxvLThxqEW2NffLzSFbTqKX2ojJNraJK3C5ZxsytvwTOSXL48FVtiBkvVlqqJWvtVt2FrdsqLlNliku23IzJtu2MrZBqttInfhFTfCH4W7Iqe5q9xG3uR92/wAEKLlsihk/fdcB3P0LIadyds0RxwgjO2pGSOPJLfgujg33Ze8sF5RXLWY1tyNrqHWH/cXKCXlnMnrpb0ip67N4kOTh3kkh1I85/G5uG2PHV5fUaPZ6C1wVOVeUcuOqkXR1V87oRNtylJHKzxacmzfGUZbxsjPFSgUcRP1ih/qK+GGSCiyssYsbcT/3GtZKWyOWn8IvhlopOHThmas1Ry2cmM01/wDwuT9yWNSu3hyuLOnCdo81iyJcSZ09PqFdNmbGpXVAWLTQxGwSQSQAAAAAAAAAAAAAAAEAQAEgKxRxQJQwqGAAAAAgkAIAAAAAAIEsZlTYD2MipFqAYAAAFbJYjYENiNksVoBWxbGoKIKyLZd2kdpRRuw7S7tJoJpQ0Z5KRuaKnEhpnhj33NkIERiaIoEgSJodICqRow6rM4RpG2bpM8/q8qt72glY82VpSaXJzWpPhfLDPqZVs6Mak+3dnSRytaoYm57zRv7YQj+W5i00buRptykv+CEXVCMd2zLOWPfcjLl9HwZJN2xpVt4nu1JjL6a3plMbQbsC6Th7iL7pV/xQJVz+xLn27Vyii7trZySHjHH/AHWZ4Wy5BGiKxpXf7oNpbucf2KE7Jb7d2wrTHFF8ziO3ix8U2c7Jnb4exn+ozLTpS1EWUSzr1Zgtsi0NG2iWRt/kV2vMiu29yO1sBtgolQ5LVAGqpSHUbNKxSfgsWB+g3D1qmMWzXjxO0Tjwu+Dq4NO63RLWpgpx4abNMsdo1xw0uCJxVVRNr6vOZsdqzFJU9kd/LivlbHPy4N+Cys3BzO4nvGljknwI9jptxp1KTL4/LMqsvg0i0jZHJCK8mrHmijAmjRDN28QTJpXd0mp4T48M66kmeVhqG7+xHV0urXDZix0xrrAQmmrRJGwAEgQBIAQSAEAAABBAxAAAABDIGFAEMKSBIAAAAEASQRZHcAwCdwOQAypjtioBoodEIcAACAIYlDMEgFoGWCMCugoYAIoKJABaChgAShKLCCARYhBkBYDdC2Vzn2Rc2Bg1uel2Jnm9VkuzdqM7k5Nvk8/nyuTaN4xjPLUVZZd3wh93SRUt2qNWKNyV/obcpzWlfbCMfJNpCN7v5K5SMtq8k22KvUhblqqKKgjF80Q5JCzyNle7YguVP7nuTy7rdsWyxVBX5YFi+1JXu0WRi2uBMWJy+6TonNmUfti2iVZEzyKG13IyTm23bKpTtuhQp+4LoTuTJim/kA5HULrcthjbpWbMWDyZtbmNrJHC/KNOPTtvaJ08WCKuzZDEtqRi5V0mEjmw0j9DStHH0OjDFwXLGl4JutcMENJCuDRHSo2KKLUgMsdND0NEMaRYkOVi0naI4IuAoxZMXojBkwujttFMsaZB5rLi5qJzsmOpPY9RlwJnJz4ErpGpWcsduK2k+CYyL542rTRV2JcqjptysWxdln2qnVszqS8DqmIzY1QzNcRo0wzN/kjHDZmuMovlV7oo7uk1MXFLuOmjy2OThJNbr1PQYMvfFO7MV0xrSSQBG0gAAAAAAAEASKSAEEi2FkDCkkABIpIDAQSACNjFGVtRbApzahQMT1jswZJzc33Exiakcbla3rVly1CZz1Emmi6iy5OksqZbCRyFkcS7DnTZmxZk7EWWGbFK0aER0SQyRQIGRBIAKxhWAoAAEAAASQwFIBgQSgAlBQSdADZyNZqZNuEePJo1Wbsi0nTPP5cnuywrJqs1Wcltt2y7Pk7pFKWx0jhe1sI3Jcs2R+0z4l5ouvakSrE3ZTOV7DtpWVeb9AtHG758EN+4XvYjbCG9WPFeWEMbdeC5e3IVEYu7LoY4r75/ohuxQj3T/QyZcrfLLs0uy6i9o7GFttg2RZFMq2I5FuxorggshE04oJi44m3FEza3jD48Zux4xccfY2wijFdpBCFUaoxIii+KIoSHQJDJFRKQ6IQyDNSMQiTSJAgkICGiQAplFPwZM2FNbHQaK3EK4OTAvJgy6byj0uTFZinp+aG11K8zOLgQp+7OnqNO6do5c8bi2dMbuOOWOqa4PzY6SVNNoz214GU0+djTm6eHK/7kzq6TNUkvU82k77os6GnzqVJ7SM1ca9hF2hjBo831Io3mXWAkgkigAAAAAAgAABAJAKCGSQEQSmKCAsJFJABJKxyAObm00Zb1uc9xcHTO7JGLNisRjLFg76IeRBODXgyThJvY0xyMmVE6OffkaKfoN8m3S4ljkqFvCTe47OFUa0ZYMvTMuywViuQjmgLLGszqY6kBYQRZIVBIEgQQMQArEHYgAMhUOiA4VmfJOk2y6T3o52ryOMG152FHK1Wa26fBx8uRu3exbqcttpMwTeyRqRzyqh7ttslbp7kculwNy6NsNENojXbbEW0QTrkLE+SttIHK7E/qYDOTXComNt22IuUi2CSe/IFqtr0NKUcMe+XPhFeNUu+fC4RVlm5yt8boz9ahJzc22ypslyEZRHyxHImTK0EqyKs0Y0ymMXZphEUjTjR08EUvCMOGPHydbFBLhHKu+M4aYJUXJCRVF0UZbNFFqESLUBKHRBKKhiSCSoZEiokIkkgCiQIJACGSAQlFbhaLqCgrnZMKlycTVaavB6mUTFqMXcmqJzKvceNnBq6RXaZs1EVjySiY5JX8naXcebOap4ya3s1repR2aOei7FJplZlek0GZ2ehi7SZ4/S5FHLZ6jTzTikYrrjWkAAjaQAAAAAAIAAFAAIIAAAggGRYFhIiaJsCQFsWwJZRNWWNisIyShZlyYPQ6TQvaE05SwyXJdCDibHEpaIaXQkXd5iVlqKLpTM8pktordFhTwkaINszRNEARoQ4kRyKAJICggAAVlYzFIGQ3CFSJe+wFWR9kG3yea6hqW5uJ19dn7U0eVzO5tt7iclZ523TKJyVj5J7V6lKV1Z0jjU3SvyyI3ZEmGPmyov8Acl+RbV1QN7hrSu9mEPPuFbA2ETdUjbhwtrulwjPgxuUk/wBlybcsnGPZ+5mtYxVObnJLakUOVWNJ9qpFHLCo+SJDUVvfYBeR4rfYmMLo0wxi0k2SETVjxsthhimaYQXFXRi5OkwWYYdu1nRxw9WUYoeTbCJh00sjEuSIikMAyQ6EQ6Kh0SQSBJJBJUSBBIEgQSESAAUAAAAAAAFcoplhDA8n1fC4vvSOHGVo9Z1jHenkzx0XubwcfLxYtsdbfoIh4tI6OWmzFLtpnqNFkvHFnkcbPQ9LyX3QMV0xeiTtWSV43sWGXUEkEgAAQAAQACWRZVZFkF3cR3FVkWA7kK5CNiMguUw7ilDJFRZ3BYtE0BJBIAQNRAxFK0VOJeIwM7RBc0VSiVlRNlKmPMqSdljNa8ZrgijFE1xQah0MKiSNJIAgCRWAoEEIGMiCeEJOagnJlnk5Ou1DjFxXywOTr9QpNpHETtsu1E7e5RxEsZyqqX3Sb8Cp2yHIhcWbcyssjsipliEIa3bJ+BBhWk+H6EdvruyNrs0YcbvvlwgNGNLDDuv7mI5bWyW3klbM+WdvkjRG7BcEIf1Ark6XyIlvQSlY0VuEX41yb8cWUYoM6GOF0zGVdcJwsx4+5KkbI4yccVSNMYnN0LCBdFAkOUMhrFQ6CGRYhEMioYkhElEkgBEBJBIAAAUSBBIRIEElAAAAAAAcvqavS5fg8It2e+6l/wCLl+DwXk3h9cvL8Oh0xIsZcG3FdBqzpaDI45onKizVhm45IsNSvcQfD9UXoxaafdgxyZtRydoAAgKYiyBJMB7JM8ZF5UlZAoegoilolIkkBGhGixisgRDoVFhQAAAAABBKGIRNAKyB6BRKKmhXE0dpDiBzckBYR3Nc4lcY0wzYvgi5CQLAqQCiQqAJoAFYljMQgB0CRNAJkahBtnnOpPsiot7y3Z2tZNXCHvb/AEPLazN35ckn42Q+l4jmTau35dIryN/ogu5NlU2tqZtyquT4H8IWnaGkmlRpFd2y2L3Kb3LI8sgZMlP0BJpVTHSjBc/cwohFtpGyapKF7csTFFQg5MZO7bM1uQTajCkzHyPklbFXgIeKfjyLkaqkWraLZlm/uYaRW7s144WZ4K3sdLBAl4MZtpxQXFKjoQjexThg7s2wicry7SLIouQkUW0VVUs0I3/+Fa1kKNDhF8oqlpscvFCIr/jIkfxwr0FttSZVLQT9QNcdXfLLo6n3Od/CzjQrTV7OyDqrVIvjng/Jwl3IdZe18lhp6FSTGONDUtebNsNSnyXaabCRIyTGCJAAKgJIACQACgJIJIAgkUo5nVXWizfB4Q9p1vIoaR+7R4xG/G5eXuHRNiom9zo4rEy6LpoojyXIkHrum5O/SuPlHYXCPP8ASMieLIjvw3jH4OddsOoYAANoFaHIAzuNMsT2JaAIrZBIEVBA1EUBAo9BRBWPQUOkULQUWUAFdEUOyCAQ4qHKAAAAIZJAFEylcovkVpbhF0RxYliCgCQAAAVugEkxUQ/VgiCxDcIVFeom4Y5NAcrU5leXIvTtPJ5cnd3Ha1+RQwpWrk7Z52buxjNs5IbXa6ZTN21uOyq9zpGKm7kPOT9RI13jZNghU3Y6bSsqXLdjhT222Nij35BDVpY9sJTYqybq+dNqK8CzpRGinXcyjJIy2pkxorexEi+ERtDS2Rj5Zry7JGNcvcRa1Y4nYw4zm6ZWztYVsjnlXTGcL8UTXGJXBGhGY2lIdEpE0VChZEnQndyF0uHRn7h1NBNLqD6cZeBIzHTApnp4PwYM2mnvR10LKKZR5aU5xdMaOfJe0rOzn0cMvK/VHOnoZQ/F2No16bWcJnXx5VLhnmKcXaTtG/SZJXzt4RB3k7JKsb23LDSJAAAkCAAkkgAgFYwjCvMdfybYoHmlVs6nWsvfrGvETlo64dPP5LvKmQyIiPXJrbARaipFtOuUIO90nJ90l6o9TD8F8HjOlSrOtz2WP8I/BjJ08fRwACOgIJIZABQIkCmiaJACKAAsAIZIMBBkKyUA4EBYEMUlkAMhhUOBBDGFAVDEAAkhUhmCQQ8RgRIUEAK2BDYhJBBDJiA1ASjnazLcnjT8HRtKLZ5zUz+yc26cnaCuJq8ndJnOZfmdzM3k1JpztVyYnLHd9xX5Ztk+P8hp7sXHyPMh8VXvRYinhlyvtBDQi5S2Ok49qjBGbTQuXsjcldslreKvI1FNGNpNmmT3KVuRSxTL4q3wHa0rC1GJO1VZWrZljyWSa3EhzwWJXS06pI6+HhHLwcHVwnLJ2nUb4F0UVQL4kinSGoEWJFRlyI58s8INxb3Xg62SKrg4ms08cl3aa4ZGt8Eya1Q43Mr1+aW0WkcvLCabXdZX9HJTbujcxl+ud8mvju4s+on/APbE1xyatW+6LPJKTX9dGiGqzx2jldD0SeWPWQ1uSH+rjcTo4s0MkbTPK4+q8LPC1RshmxyqWKXwjNljcsyeioSUUzLg1DdRnya7IumWeGMhMeHtk9vJsJSKh4FyKYosRUMSQSVABFiSyJAWgZP4mA6zwfkC8qyS7YSfohlOLMHU8yxaPM78UEeH1OR5c2Sb8yYsSrll0KaO06ef6dR24GXIXTC1sxyBcFlf4EjzItq4BGvQ19VJnt4fijxGhX87Ge3hwjN7dMOlgEEkbAowpBKJIJKKLCye0KIEbItlnaHaQLbCxu0KArJTJaFoB7IsUVoB7JRWixAOhhUNZQAFkABBIAVyBAwQRYiSEAUMWhgAqYljyEIHQwiHQC5WlCvXY8tr5pTmkd7VT/mRTdKKtnkdVl75zd+SK5st3IobLZsz2dI5Whu2RQoxWTY+RpiQb7hpPdsqq0aEqXG7K4JLc04IXOzNWRu08O2D+CyqgyH6cULJrt3ZG1L497CMNm74CKRalSsiwr4bZlySdls5csyye79WEtLJ+CYRdlfLNONFqTmt+DwdbCjmYVwdXEc67tsC+JRA0RJBdFFyRTEviVCSjszmanG6Z12jNkhZKsrx2bE+4ZR/+POL5o7WbSptsojjjF1JPcY3RcZY8usVjwwN8nV1HTcsZOeF3Fhi0GrnJJwperZ1llcLhYr0Gi+plqW8a3L82ly6LJ34m+29z0ek0sNPjrz5ZZmxwlCSa5RLVx25enyQzwUovc34pNxSfKONjj/DamUbpM68aOX16Z00EplSHTCLostRTE0RRqMVBDdDsyykKkGTIopnKz6httHQcb5FenhLmJK04yyu9r5HWeS2o6EtFF8bFf8AAy/uKlVR1Mkc7qus+rgWO/NnQy4JQT2s85rJ26vyax5c89yMHk0439pmRpx20dXCLG13IFwgl+aANJ4kjSvwMxpW8CI1dNV54Hs1weP6XG80T2Ji9umHSSbIANJIAAJRIpIEBQAFFBRIBEURRIAK0K0WCsBKIaHACqhkDJRBIE0FFChY1CsBrByK2xXICWyYlDkNGQRqsEVpjdwU5BFhYCSKi1iGaJSHclFNvwiEZtZkUMT35pIo5WuyOOGcnzNnmZv7TpdQzObUb4RypVQiVmyFDLsnKRnZ0jnQTZHwQEPC+5DpW/RFUPyRokqVCrCRi5zVI6cILFC1yJp8Hak3y/8ABpcd1ZluRG63sSXJM36C8zIqVFq36k5HSSQ1bN+hnmwqucvBne6k7LJsT/637sqUkN3+ptxoyQNuO3RK1i34InSxI5+A6OM5bdWuBoiZ4miJUXouiURL4lQ5VkT7W0i0KKjB2ucbaopliOm4lLgZ03KwxhKPBar8otcWiKIt1QsjRRlnk8RLRlY2kkjiaq6jJQdpnSw28cG14RrpNboWMUkRrfBBkTRKRUXYzQiqCLkbjnaozT7UY+8fVSqZycmrx4/zml7Izbutzicup3Jcsui4+Gjz66jpU3cW0a8Wq0WV/l2saqbx/t2lQUjE4zgrxzv2YuPVqTcZbSXKLs0fVZIYsU5y4SPAZcjnklL1Z2usa/6j+jBnAs6YRw8l50ZPk04+PkyGzErpG3Mz/JBH/wDRrtsiLJsQdDErxfJg8nTxRf0oBY2dHheY9Sef6Ql3ZGd9Mw6TowEEhQQSQBAAQAwC2FgPYCWTYDALYWAwoWQwABbCwAEAAOSJYWAwrCxWArK5Isohogz0yyKJoaKKhvAD0FEUtkWS0IwJsEQiSB0czXzXcot0oxtnQclGLbPK6zUd6yST5YqxzNRl7ptJmTLLdoshJuTZnm7lKjcYtVy//Ciy58clL8mmDIUkhhDQVyR0cOH6mXeP2owY1ujv6eHZDjd8kreJ4R3b/Yqne5ok6iZJvaRluqZPgsrhmZtmmO8ULCJkvtpGabtmmdUjK6Vv0BVEwVfTREwV9iKiYGvHsuDLFGzGZydMW/EdDGznYjoYzm22xZfEzwNMSxF0S9FES5MqLBhEMVEkNDAVFTiI4F9EUZ0u2fsRKgi6gGl2q7RXEtYrGhVRKJYIirYFxTEuRuMV5brWqnjyPHDZ+WeXak+T3Ov0eDUTfet6PPZ+nZcP3QbnH/lElktMpbHMjil4b+Du6TQqenuatlGk0mXNNXBxV22z0fZHHj7Vwkb256eZyvUaOf2zbiV5dZ3fenTaI6nqO/M4xeyOYJJVudirJbdu3YhbOmilG3K9rY3ZrxJLz4MsFbNsFWObsiwqBVZCd2ERoTyzswVQil6HKxRuSOzgl2qU64M2t4x0+lQfZkk15OqUaKNYI7VZpI0ESQSFAAQBAAKQBBZQUVCEjUFAKAwAKSSAFTIGYjZA1g2VdwjmTYu7hkUxZfEolE0SiShaFZYIwM7LIFb5HgGVyCwQBpDK2MxSCCfAIkDFrsijgkrq0eN1OXwd7q2oipKJ5PLNzcvkYzdLdRfhdQk6M3P7mhbYmZuGjbHyEyMrfCHmIVkJ8IUYsxw3XqKNmjwuWRNrg7nbu/EVuzPpcXZjiordbs0zlUexfLM2uuM1GXJO26M897Hm/upFU3dmRSluXwpLnYRKouTGh/UikNJ7UY5XRrfCRkbuW4KqycrYWPA090hEVPq6JrxIyQRsxmK6Rtxm/GYMZvxmW22BoiZYGmIgviWopTLEVFyHRWhkWMrAFQxUAAACisliNkqyBiWK5EWRrSSULY6AeJeimJcjUYrnapPvszR38nRyxuzDLHKLdHOzl1x5ho3Epz5kotWWdxi1G6aSLKnrHFliTWXIzjOe56LWx+lpX7nmWdcHn8vcS5WCFHidHJdjRtl9sEv1ZRgjckW5H3P5MtKl5Y8UJew8Vw2gRpwrx+p0sbTnCPvZhwRbt70dTRY3K5+9IxXTF6PDtjj8FlixVKiSKiybIACbCyCAphQIAtAAKgAAACCSAAhkisBWUSZbIpZmimcqRjlmqRflOdkuzCuthlZuicfRyfDOvA3EWgBJoQLIcSQRmktyzGhJFkALAJIYUjFACAQmbIseOUrLDidU1NJwRB53X5pTyycmc2K7hs0u+Vj4sbbVG5NRi3dNlpQSTM/MnXhGjM02Zk3uhEqv5FluS9g/Hd8mmRtDnk6OixczaObBOcq9Wen0mFJwj/TFWyVrHtqjUYJvlmaT2bL8su6/QyZHZiu0ZHTdsh+Rle8iI817FjKJbQYsB8rvZFd8V5KLn4ML5dm2TXac/L+UQUMVDELYC2BrgZI8myJitxsxm/GYMRuxmG2uBpiZYGmIFyLUylFqKi5MdFSY6KiwkUYqAgkRsBZSM05N7IMkyuG7Zh0kWJDUNEejSbVItihGiyIiVakOKhjTFVtFTiXCsixlljRmliVnQkiiaMNvM9bdYoR9zzDO71vJeWEEzhWdsOnm8n6CLYJt0VpeDVjSjXqzVYkaYpQg35KORpvftQqYjRyyKutyteiLoLczSNePuUFFeWj0enwxxvFBI4eFKUsNXs7Z6PDUskZekTLr1G5IaiEMVC0FEgBFEUMACULRaRQABIAAAAAQSQACMZiMgrZXItYlEGaWPuK3p0/BuUR1EaGXDhUeEbYoFEc1oSBAASJIYSQFMiyJUWxCHFbJIFUoIkCCrPPsxt+h4nX5/qSe92zvdV1ignjT3a3PITcpu2NbpbqEX3M24oqMdyjHFeODZKlFJG3Ngy+SmqjZbN7laV7dyAr93+hS7b5Lp9t8qkThgpy4boqabNBgcpOW+3Hyehx1FNIz6fFLFhgmvuav4NDfbGkc7XbHHSmbVookrW47ttmbNkai0STbSuUr4Q0UkiuGy7mPJpuvYrKrLasrXCHyO362hUqKi3LwYMruSNuTeBgm96ZYlM3uTe4vgEBbFmuBjjya4OjFdI3YjfjOfB8KzbjZittsDREzQNERBeiyJSi6JUWIdFaHRRYmMISVDFchxWBzM8n3UWYzNqbjNMvxyi4p2c+q6/GtMazP9XGuZxX6kLPibpTi38mmNL7seLM/cWxdhNNKHKkyxM1tiwrIJYrClZlyzSiy2cqONr9SseKbvejLTy3Ucv1dTL2MJMncr5IW7O84kjy5XdWQRrh9qbKYRVb0WtxSr0Fak4KwQJgSB1yXxaSSKFQ8d2LCO7oOZOj0WCO1tbnB0OG4pp8tHo4LYw2tRJBJQrIJYoDIkgkCQAAIAAAAAAAgBWwIbFZIpBBKRIyQAkMCJRQIAACAIACbK5McqkwEXJdEzrk0LgIkgkUVQZdVqI4McpNmhujy3VNU5y7VLgyrk6vU/Wk3+5linOkvLEm/BphWLHxc3sbc7ythBJqPlck5XbGxQ7I78vkzZp8uyp0z5Ci9mx5ur3KZP7UhAqt7Lyz0HT9IoxUpJGHQaVyl3tbHosVKGyJlW8cfofN7FM5W+R5z5SM7a88GHUmSfbGktzI0ruX7FuSSim2rZlT7pMrGRpSbf6V8DSdO78FLe9fuGSVNlDSGRWndMte1JkFcr7ZGGavg2ZNkZJmoxQncaCLFi+dg8tAaEacfBki9kzRjZmzh0xb4XaN2Pg5+Nm/Gc66NsGaYsy4zRERWhFkSmJaixFyHRXEdBDoYRDFQwEEgczWY+5XRzYycLjex35xtHOyaa2ZsdMcuGGWHHPdpA9JB8M3RxNbDrGRds+nhmxvtlJyj4s3xdFd9o0E5BK0RkWqRTHE1yy5KjcYukiskqnIIz550jxnUdU8uXtT+1Hc6nrFig/7meRTcpOTNYT6z5LxosluPCI3amy1Uje3KYp/FMQGQVaYZJipNjNkRLfhFkNilMvhvJIEer6bB9p20jn6HF2Yo78o6CMRsxIAUKyCWQBJIABIEAAAAABAEAQKSQQKBIUQShxBjQkCCAGAWwsCWQAABTMuKZhFcWXJ2ZlszRF7EIssUL2Kc2aOGDnIisPUdasEHFfmzxebI5Ntu2zZrM8suSUnyc2rdLc1IlqzDC/ufg1KF9sn44LOxY4U14ttkxdtNoqLJNxgzm5XG/Ju1DpJexzMrLGaqyVsW6bF9XJBdqoodydHXxQ+lCMV+chboxm3ThBL+WuFyy2Uu2NfsRjh9OCRTly06TOT0aI5O6v5KpzSVIHJpOvCMzlyWRLVU25Cp0mvNETklG3y+EJiTcWzblafw2yuT9fNETaTrwgi7qxo21Y4ukD5sfhJL0K5VaWwaVzpmSSpUzXPzsZprZhKqjdksRc8lj3SZUNB7M0Qe7MidM0R2ozW8XRxNs6GPg5mJnQxM5V1jdA0xMsGaIsitCLYlUS1GhchkIhrCHsmyttC/UiNpposLKPqr1IlmjHljZ62rxXEz/wAXi9Q/i8bG43PF5P8AWrHChKHjkUgrcJZZ2VwTRbCKQ9DISM7SQArZULKRg1WoWODdl+XKop2eM6nrnmbhHgSbpbMZusOs1MtRllLwUxRUaYRrd7HbqOG7ldnry6oLsi/JFoiosZKxbQ/dQRMqXi2L4I5ARDI26aPdO2Y0dLTqppeqFWPX6RL6ca9KNqOf09t4IX6HQRiNmACAIYIAQEgSAEABJRAAAECksUAAkkCKJokkBaJJJASgocgCtoRlzRW0AqY1lTDuAtbKJslyK27Aity5FUd2XqkjJEbJWeY6jrXkm4RdRR0dfrOxOEG78s8pnypyrkaLdRRkm5y7YJ8mrTYFF9092hMMbTk0kackowiork2yScu/J2o0Lhe5nhH6eNt0rZox/dcnaSWw0jLqXc5M5mQ3amTtnOlbdLk0y06TGnJ5ZcRO1o8d92af6IxYMTaxYYfMmdecligkjna7YzUJmy0jDb3SQl9+8kSm2JFtS3syn54SHk1wU5W6KzaySk55GafxgVQh95bNutjTCh7vcuwxt2ylGjEqg5N7sEW8iTq7/QZvz6orb2r0MtofgoatM0LhCVyVGJqiY1Q0q3EQQ1FseAUeGMkSusjTie6OlidpHJg6Z0MMjFjUdPGzVExY5GyBiNNMWXRKIFyEFyIIQxRXNScWlyeay59XhyTjM9TwYNZhjkg2RvDmyOHHWZJf1UWRyZcltSTKcun32KVCeN+RdV6fXPHqRtucbtDLK0ZFny1V7DvNBwacaJ6rPNlP1i6eHUV5OnDUQSts8q9TDG1cmaY57Sp7Em43lj4/K9Pi1EcsmkjScTQSuU2dezcrxebDHHOydGbKck6RMpUjg9U18cEHFP7zXbl1GPquvavHjkcDNTxwaXyKm59zk7ZbJ3FbcHSTWnC25VVCC5fI7ZDCyifIVzuLYW2ENfoH6CWSXSbOiQ8AuSCyC3R1enV/FYzmwN/TpVqcT9yVqPU6Busy9J0dFHP0Tueor+86KMxtIABUIyUQyUAwAAEAKxbAsIYWKBAAAEjAiQAAAAJIJACAAAK2OVTZKKpFVhKwiiCeRC7tK6KJh5KdTqFhg99y1zjjjbPN6zV97k/2RlqRj1uSTb9zHh06knkntFF0cUZ3kytljk8vEagjcZyMqpVwlshYpu5z4ZY5VCv3MzyucopfityxCZ8jnk7Vwkbu3shVmPTQllzW+Ltm7PJKL2NThiuTm3lwU4Id2VXdLcM2Tl2atBi7t+Ldkyq4zdjrafG4Rc/LMWfN9Sbj/SuX6mnU5qUVFmPGvL8u2c5y7XiLH6BdWCurfllUp0bctlcm9k92V5JfqyHO38sVK3uwLcUdrfLK8rbk0vBY5VGXq0ZJSrZFRZBK9zUmlCrM2KN3Zc5VcgFnJrYri/uYt3+qIi63C7XLbZjMrVjJ2iG2eaqT2KmapxtGZoI04mml6ov+mzFhdSOvjVoxlw9GHMZZQcXfgvxOq3NKxd0DMoOEjG+Grjp0ccjbCRzMbNuORBvgzRFmOEjXAC5DiIsSKhJFM+GamiqURpZXHzQp34EUYyZ0541JNNGN6ecXsrRi97e7xeWWatZ56WL4Mb0s78M6fe47NEqUWTbrY489D3rdBj0WZOos7y7S/T4025UalrjnccZbrSnS45Y0k0dHwLRRqdRDT4pTm9kV48st3dZ9frIabE5PnwjwmXNPPNzm7bNGs1eTVZnOXHgyqjtjNR58stmWw1tigaZMVymQ52IVm0yZYiuJYgiSUQMhtT1sCW5IIgvivfwatE/5kX7oyxf2GjRtrJD5RL01HsNJHsz51fKTOiYcVLUv1lD/AAbTMbMAAVCMlEMlAOQAAVsrLGRRAAQiQAlEEgMiSESAAAFAAAAAAAQyqSssbFZKKOwZRHolIilaKZUi9mHUZFGL9EKObrs/h8HEbW8pbb7I06jJFttPl8nPncr3tiL1COcs01FN0jXjjxx2oXFjpdsV8k58kccHCLt8NhmRmz5rbiuBcdvZehjk237nSwQax9/+06RitWlXbGbvjYy6qb3N8Ptwf5ORqpmmawZJd0qR3NMlDH3UcHE7nZ3pusSV+Dnm64fWZt5c3Oyd2alFUU4YNRd1dlrlSbJClyT7dkZJuvf0Gb7mRsrs0zpXFNvcslSYd1Mzzm9/kQonkvZCKP3Kt/JXZfhTpyZUaFtGvLM+aX30uEXXXdJmGTtMC6Dtk+SiL7eS+7QpFidrcm1YnBJFh2titq7GTJoNM7TO5pV9TGpL0ONLY6fTpOpQvkxn06ePiuliX27iZcVq/Y3QxpRRDicHdy4xo1QkweJeEItje9s6dCDNkGc/FI2QZUbYlqM0WaIsrKyiGh0BWWZxK6NbiK4IzpqVjeNS/JFD0kPFo6PYSoImm55Mseqw49K7VyZsSUUktkO9jDrNZi0uNzm/hF1pMs8su6sz6jHgg5zlSR4bX6/JrJveoLhC63XZtXP7nUfCMSVHTHHXNefPPfEC4H9RdhbOjCzl0mLK06IjKpJoiTthm0oEDIqHXA6FXA3CIsC5H3EQ8d2SqsfDBA+BkvtAsi/+UX6ZfdyZ03vyXYW4uzNanb2OOT/icD9YSOhZxoP+Zo5WdeyRtYmSV2MVAMhSUA5FkCNgMTQiZYiCsCAALCxQsCxDFaYyKGJIACQAAARsZlMyCHMEzJNts0Q4JtVyBkoGUJNpKzzGv1KclG9kztazURxwbs8hkm5zlK7slWRXOW7YQi2CipS3ujRCopyHRpM5RxY2ovdnMn3dvyy/K3KbtkcR4o0VTixJbzR1El2qKv3OfCVy7fB0sabxOXksc7DZNsVXTbOJqXbZ2s3HwcTNFynRqM2M2FLuO5PeHxRzcOnbkdSCXlGMubHXCcUsVVFUrb2LZvlFKb57W2wFbjFPezP3SkaXF1VUI4pJ/wDJJV9WScpcISSdI07cuiftLs9GTtk6NcY1FIlRhyWKkrLtn1UZ5Ou0x8b8s6Dinv3Kyp4n7MbPViluWY5PhjvGvOwnY1unZrbGquT5GuhB0ZUIsTTRWmhls7RKsLJGjQT7c8Pd0VSimrQYftywvjuRL1Y3Lqx67YEthE6Q6Z53pVuLRTOKZf3bsw6zUxwQb8+CztLZJyvxyaZtxyPJabqU4ZP5iuLZ6jBkx5YqUJJpm9WMY5TLpvizRBmOPJohIFjYhimLLLNRgwEEgRRBJRmyxxwlOTSSQGfWarHpsUpzZ4HWavJq8rnN/C9C/qWvlq8z8QXBzfk6YY65rlnl8iSLIFNue0tgyBqdAAEDBEDIWhgp4kkRJk9yKlDx5EiWRAsLnGsakuLKUapL+VVcJmfrSnf1LsaKEtmaINqIpi9Hjf8AL0r9Gjr2cTHa0UJejR21HZGI3TJjplNNDxZUWoYVDgQyplxW0AsS1MqQ6YCkDBQFYUWUFAVjKxqCgJQxCJAkAIACmZa2Zcs0kxVZptKRog1SOXLK5TNuOVowrcmZ8+ZY4iZMqhBnF1We4ylL02LaSMet1TytxTOeS5KXz5ISb8bIRoyjtS88kZcl/ai2VxTt8mZtQu7KiGlGD7nv6FcpKVbuiqcrZZNuMV8FYtPDbupHUjCoYovy7MGCDl2WdRcpvlRLDTPmt8+TFHE++09jXmkuG9iqMZZYynvHHFc+r9ENpqTsqnGH2xjXg0RxzjJqa7Wle5OmwwxTWTJt5+BNTqo5c0pR4qjO2pd8TplyPeubLMmfK63Sj6ISEPqZUnujpYsEFwkkLU3JWGGny5KVG6PR5yi7kdDHHt4SNkJy4SET3cGfR8yhUZJnLjpM/wBf6Lj957hOXlGTPp1OSzRX3w4Knvk5L6bOEFdbEY+nTnFM62af1XHGuJbyfsdDGkkgnta81LpEzNPpueHB7PZivHF+AsyrwOTBkhtKLT9yhRfye+npozVNJnK1HSsM+E4P1QX2eT4fsRwdLU9Oz4lcfvRzqp0yylSSmCBf/hSLVwVuNMlXEd21aI09Hhknjv2TSGUqVMw6PN3Yl7bfoa/VI4War0S8Fy5FCMpM8nqtRPUZJNnV6pqEorEv1OB8nXx48bcPNl8SbNLrM2mf2vb0MSGZ11K4y2V7fRdSw6lJXU/MTqRZ81hJxacXTR3dJ1rJiqOZd6OWWH9O+Hll7e0jIuTORg6jpc1duVfDOjGa8Mxt0aLJ7jO8iirbo5ep6zpcCajLvkvCLNs3h18mWMIuUmkkeJ6r1R6qTxwdY0Zdb1TUavZvth6I5lm8cf7css/kSyEQB1cqA/8A6HjYGEBbFpwkir9Rk/toKjwMhSUBJJK2QIgaPgK3JQBUrjcsiIixEtVYrbSN2RVCTe10jDFNypep3JYXHSz71vGqMrGGGNPPGLdLtEVw+UzZp4Qyaq3X4q0V6yChlyRS4ew21OnZ01z0M/8A0O3j3xwf+1HH6bc8E4/7Dr6XfT4/aKMztTOIjVGihHEqFiyxMqqhwLBWRYyARogsaFoCLJKrJsCywK7CwHsLK7CwLLCyqybGxbZDkJYkpAE50mc3Plb2TL8krszrHbM0Lije7RqVRV8ExgoqkZs8nKShH9SNqsk5Tb32RxdXk78kYLwdnP24Mbs4EUpSlJcsLBHTy5otqONbvcsexjzZO1P1exYVXlnbuTtmZylJtJMi27Yyi0maY3tCUY8NX5LKuSityIw8uzdhtv8AGqJeDS7DCmXZprHBuTqw7oYMfc/Jx5Snq81Juhu1bxNph3arLvtA60pRuMFShjS/czwhHHsvBTkcp/y4ev7sXhwl97v5C5srzS7Y8Fc4qEVVnRwaKb2e3qzL1CMMc4wi/Ak4WZ7yknQ0UXPJ9qbZ6PFpJySlsr5POaDN2TkrZ6TTzntv4Bl21R0qS3LljSRCmybKmoXI6VIrbUY2+EiE+/I3e0VRVPuzZVjXEd2FRo8MnLJN1Tao6VCY40mW0F0UZJABTQoWSRYFbhWaWGMjgdQ6YpXOG0kenornFSRB85cXBtNVTBqkd/qejULnFHBXoVqIXuSthfJLVrkK24ZuO6ezN086jjc34RysU6YurcvpVHgzcd1uZaxc3Nklkm5vyVEsg6vPQSCJKgXDYAQiBlKmb9Nqs2NqssviznFkGqJYsta8moy5py78kv3M1g7Qt8jS27D3IACsjkABL3KAmiCeEwI2JIAAHSbELYAQ/QIkSZMSC0hXZPhEJEaN+hYVod0BbC+7g7+oyNabJ3R5jHk4umg55YRSttnf19Rwdj3qCSM1rHpm6RivNKcvESzquNxzSmnt2o1dJgvouue4r62qljf+wy18bOmW4qXhwR1NL/pV6Sf+Tg9LyyXbB8cnc0yqM1/vb/cQawIA0FaIGIIgJRBAFhBCZJRRRND0FEFdEFtEUBWQPQrQEEii2QO2VNg2IKFqxlEZRLVCkRVGRqEG2UYMe/c+WPqPvywxfqzQ1UWRXD6lNSairo5kHHdJbXzZp1eS8ko7UjJF1skG4jNKk0jDkv5RfL8nL5KbuW5ZGMkQh/c0iJby7URKV7L18DLnb9WaTg6qKt0bcc1Tk19vJz4xU5b8JhnzN3jQrXzaNTqHnyOnsjfosNRut2YtHpXnyqK/GO8mejjLFhi5PiKLjHDy5f4xizQqocSn/wAIt0sY44ynW/EfZGLuyZ8zm3z/AIN6JbyxxhjpcntVnB17vUV8HdhFyOJr0oav9V/gs3pnCz2Ppcfl3vwz0GC4pdzT25Rx9GlkjKD4TOniWXFkp7x/uXn5JXXmuqn7Ezl2xcuCuGSDRGSUX2r3C+tVq4Y7vc0abF2Q3/KW7ZSv5malVRN8UFkMlsOKSg1ICKGALoEDIiwzQDRFkOaQGTVYllxyx/3HhM0HjzTi+U2fQq+7us8n1vAoZ++P9aCuO1TJ9yVuiYLlX7FVEU0De/sNTTXownB+AMGbFX3JWjMdPentt5Rly4l+UWalc7GdC8jtNciGmQSRXuSwAlMglChwfJABQ9mHsQSiIEM1Q+ODbT8WkXauUXkSXiKAyUDYwODSuuSoUkgAJLlsiqK8jtqqIsINHyVlsPkosG/QgOHZlpK5J8IVcjgdXpMO7WYjb1KlPNHz3GXo77dWm/RnTzYHl1S7vPLMfW506HTcKx6eMvMtzF1vf6LfFM72KChhiq8I5HWYXiw/+9BWLpFd79onoMG0sqf9x53o999XaPRY1WbL+hBpAkCiKAYKAQKGoCoUBqEAckKACKCiQAWhWiwVkGeSKZMvmZnySiLJSBIthHcgaES9rYiKJm+2En7Glc/D9+XNN+tL9C6bdSvhIr0i/lKb87iZ5NQkZV5jLNfVyPl2Vc+jSLJtKTbXkqnL7WyKqy/avW/Jkc9+dyyed1JN34Rn5e8TbNq1bp+pPrFc+oQa4vwPFdrthU2sWNvy+EYt+fMnsTmyOTSLtLieSXe+FwRMq7eCK0+nWNfk95MqyvvccV7flIdypW/AmCDknJ8ydsPNLzbVuOPlLk2QxtkYsTkzpQxKKLIxbclMMfbH3OB1jE7x5V8M9Q47MwarAsuOUH5NrjLLNPPaHOozTb28nq4SUopniJxnp8rjJHb0OsljcYOcXB7RbM16sY7/AGRdp/q0USSTbt7Is+pXKaMrnGeVQT5ZiumnT0uJRxp+WayqNJKh7KmjWMhEyShgIAIYh2SUZM8YvtW8n4CU8mordiqP9T5IhFt98nuO03sGTJbHM6rp/raSdLeLs6gk1cWvVAfOobNosgl3fKofWQ+lqZqvIiErc6WuNoiUrxJ3umXPaDfpv+xnmu1t+HuKqttfkv1KpY0/ux8N/sF7bExkk20qvZosYvLHli1TRQdScXVvh2c+cKba4s1KxlNK1uAEblZTQEh7ASiWQiQqB4r0FOp03ST1GVyraI2RohhxQ6V3y/LvOK229zp6rP24JadLjIzlx3JCrG2q28URO9myzKl9Sk7SFzybkrrZIqKSV5QAgHiqFk02yxbRKQJRbCipWW4+RSLGG4NEkaCLK9rIQz8AdTpSvULh2ep1GGv4ZLlzpnA6DBy1V1sonps6Usmmt8ZLRhpre0Tl9SSePDb27zqT4Ob1OKlgprhphXI6OqzZE+VI9BBP+Iyf+qPP9H/8jNsejX+vL/1QF6JAkogAAAFGEZBNgKSBYBIFEEEkMBWVSkNJmWUiUEpCAWRjZkQkXxRCiWJFgdGfVNrDOvQvRk1z/kTLVJp3/wDFxr2MGvyqMaaN0Go6aHtE89r8jyTM2rGD7223dFOV3sr4GnlqNX+zMeSb7rZYtVvZ7kXSYd360Srk0kVhbj/HjdkZsnbDtHpRXsiim/5kvL+0N/FHa2/dnoMeD6OGEK3MOgwfVz34huztTVsunm8uVl0xyjfbD1ZuxY2Z8auc517I7GmxbWxHG/Iuw4u1GhIlIaiukhaElCLVFvgVNNv2I9GGE1K8/r+mfVi3Hk85GTwScMsG43ufQmcnW6LDli24h3mPt/1ydLr0oqHe5R8blCzyed5FO0pJ2/Q5uo08tPJuN0LjytQT33slhnLjdWPpCppOmMvg8ZpOuywxhjyK4xOrj67pWrnOvZQZGXoBkzz767o7pd8vhCf99UleLT5GNpp6WynLqMOFXkyRijhfW6nqfMNPjfm02W4NBiUu+cpZZXzJXY2jWtVn1NfRX08T/rly/hGrDhhC2k3J8ylu2NDHXES9IRi1KAAKgYst0MK3sB5XrODfvRxIvZM9V1VXBfqeS4bXqrJG8XRh90KZLxp4ld2vBXp58qzY41C/hErccPNCWPuTEcnSkvJu1sN06/pOZUlgX/szePMc85ptwyU04vhmPLFxm0yuORxo6Eks2nc1+UGlIutVjuOU0QNwDRphHBA5DQAhhUq+RgqD1nRqhodXNnlDtY9XN6P+HiqT5JVnbl5X3Tm75ZWvHwTPkR8UX4yYhy7myApgAJcgMiiZukkV8sabtiohUl2MpRfEUhmPHtvfiiKsaKaa2+DLQqnXoWJNpsRu22SrA9J0BNZpuqTiegyr+djfocPosJKUZ+KaO/kjv8GW2iX9Pyc3qTrT5n6JHS5o5PVZNYHXLnFAc/o0bz5ZHoa/m/ocTokftyPzZ3f/ALP0AtJACiBbGFYBYjZNCtEAhhUh6AtIJIKArcqGbM2SdIgWcyhbi3bLYxsyJjE0xiEY0WpFkC0FDgUIZdWrwZPZWayrNFSxTXsBzHkj/DRjzaR5zVzSlXLOxGsehlN+FUTzWeTtt22zE5biic2nzuyh82yxRcvG78lywtLdo0nbN2ydJfsaseOSTfazRhwW040/fcunkx4t3O5enItamLN2Q7W5JtePcy5Z90m1whs+onmlzSLun4Fn1MY1cIu37kkS2OzosP0NLG1Tl9zIyPdmzM0YJJyperOnx4s7vNfpsfd2KvdndhGlRl0uKo2bRFkAyRCHoV1whGcTU556PWRk7cJo7zMOsw49RicJkeiTfEWQyRnFTi7TMWrzrHG6tHJwarJoLw5qlC9pIza3VfXquEzUj2eDx7ym2LX5o5HUeDDVKKNkcTeSDKdRBQyNEvNefz5b8uRcCh9aPfBSjw7VnX+joa/A5WFXlibW+1+jJtvw5YzHl6LS9P0SwY3OKb5st7en4ZPsxpzuzh4s2pz1iwrupJX4R39JoVhqU33TMdvPnnvKtGHGpbuEYxa4SqzYhG1FNvZFUMv1ba2j/kvTHa+xlIqbSGRNmllhZCQxpEUQyWI2ByOpbwPI5E4SpnreoO0jzusxSpTSMfVxvKvTzqaOw8cniVI4OGX3HrNDkhmhDG4/ekL26b04eoxylBKtzkZIuOKEXzuz2mfSOC74bpXZwdfp4prIuPJZfWlntNx5ztfJ0NNk+n/jfz7GRrtYsnUaOvbh1VmbH9LI4v5T9UVL0ZtglqNOlJ/fB1FmJpxdMSlgBjRadjSiVFaQEoCwTyjbpJKLbb4MkOWizHPt7iUnaqbuct/IhL8kL3CJQKiP0GVsokaK2Yr2+R3wRVTdshIhjBDJWy+KRXFclkA0tSuki6TX0x9NiUpxT8j6mMYY0orfvdsx9a1wx3sPB1+6Dt/lwfm2TGL3Kkeo6I3U/eSPQvmXsjg9Ji4zVcOKO5J7Zfgy0tXr6nn+tT2xR9ZOR6DiKXojynU5uep42gqFWOr0jF2adS/ubZ01/qP4RVpMbx4McXyol0d3JgWAAFQEARYAAEgLRJJADkNg2VSlSIFnOjHJuTGnK2KkZtBGNmuEaQkImiKLAyQwIDQggkhgQU5fxaXnYuMmfIoRnK+ESrHmdTlf0pw7/sx2vlnAk3Ju29zZrZvvcbvy/kohFRffL9EYjZsWJrdJ+7Nix4ox7p/cU32pSk/hGfJld7u34QWL82odNLaJz5Ttizkrtsqt+XsakZuTTgwvNNQXHlnp9LhhghKlV7I4vTnR3m2koo1Hm8maub7th8GLvyKkV0uFudjS4Ppw35ZXHGW1ojGlQ6iR3KIjmHeJeXHF9tq/QX68Xsq/dHO1SnCTyU5w9FymcDPlw5MzcMcoviVsSbe7w+DHOTVenzTyST+lKKfycXP1DVYrjlxND6PPbjHd/qdrshNdrSdrii/l6JZ4dTLCWPDTn3t/JTUk7i6fse2n0zTT3+iv0VC/9n0j5xi5Snk8/hzn2V5nDq4UoZo0/E65+TPrOx5O6E1L4PXS6No62gxsHTNFBSlCF3auRh4svS8+1eN00Msp1ii2zvw6NDHiyZNTkbajdRN/TcGOGPHJQVywqzVqMbli+lf2uSpv/Blz3RosMcWnxRUUnRsIjFKKj4SSM2szfRwSkaZ+sOr1PfNY1Ptinuyj/uMbji00e98Xwjh5cuTNNY4223SSPVdN6bHTY05q8j5M6tXa/BhyyVzm2boxUUMSWSQBBJDKIZVJljKZslHL1e8jNqsDno8lLdQv9jVkV5EbIQj2NPdVTXySMy8vAYpVNM9Zp19LR48ijUk1M8jFdmaUfSTW577p1T0Onvf7Ei627W8RtUo5MayR4kv8nL1OlpPa4PY68IRhGEIKopUkRkhGUXGXDFx2zLp821umlgyO+PBzme76t015MMnDwrTPESwzhJpxN435WcpzuLdM/wAkJJ26Y+GLSbZVKVybRfqfIaNIb4Yi355LUnQQi3RDVE8A0UX6WHdmhFq05LY1dU08dLq3CH4uKDpf36zGqNnX7epg/SNGfp8ef8CjP4ZBtEjxX+RC2qj70BEqc3QSuhF7Ey4/UgrHjF2hfJZBFqRYlSZfij3Oihbo6mhwTyZFGKfBi1uR09JpOzFjztcukY9fKpTg4pfdZ6fNjcem4+Lh2s891ZP+XOUalMx9acuSqESxNKM21fDFmo/Tg15bsLaUmvCVlHrNBHszdjfGOLOs6kn8nH0CqP1JTuUoROzGLjGKb3skVObIoY3JvhHksUcmbV07++abO11TPUFiT3kZum4k8jyeiol7HeW0Qx8FUpXsXo0GAAKFZBLIogkkESAEEgUJJmTJItnLkzVZmohItjEiMTTCJJBMUWIEiTYkCAAGKMKQQzl6ypRhB7Xcm/g6UmcXqU/tyL0hGKJWo8hK8mac3xZbHeTk7IaSaSJbpL3ZFhMsmmYpyL8kt9+TNSbLiZF9JSKnlbexORtIRQl2d1OjenK12+kxc8rl4idqU7utl5ZRotOtPpYRfMl3SOlg06klLIqh4j5YebLeWRtFh7v5slSXB0JZPQpcv0S4QtktbxmostjK2Ih0Ro6Mk+naTJN5JQdvmmbEMHTHPLH82wmLDjxKoRpFyIRIW5ZXm2pJIJBAVdiU5SX9XJaV5ZKEJye1JsKyaFfyML/2GqStJNbNlOlh24ca9McUXreXwiQRTj6tf8o8t1nPKWaONS2ij1jPJrTz1nVsyf4RyXJio39G0PZBanIl3y/H2R6BFSi47RWy8Fnd67FNHAVOxgAVk2LYIVlM3sWOymSIM0Vc26NKVQZXHll0FsIzHz7VKMNZmrhZGez6VL/4OI8br9tZqfbK2et6PJT6el6Nh1vUd5EsrxyuN+RrNMI9fQ8j1vp88cnnwxfa+T15RGcMv1cbp06aIbfL5ZZNVwileUd/q/SnppynjVwZ5/hm5WbsyZqxy+0yF0GEWOO+xDQybsZ0FaOm5Hj1eNqjrf8AUP8AqYmcjRYpTzx7N5J2jp9bn3vCrWyM39LPzXnpMhJEtOmCTNsmjG3RMxoXYr5YCK9wltEaKCW6JtSxWw7dIIIOSh4bs930bSrHg+q+ZI8v0rS/xOphFp9vLPoMIqMe1KkkYrUZc8O7RTj7HmurU8Wn34TPVpKWPt9zx/VMTi5O9lOkZ+xpynP7FElPem3wGJJy+5WvIrq6u0a0PT9HuVK9rO/knU16K7OF0O/p93ykHUNTWTNHwlTRlYw6vUfxGdyi/NRPQ6XAsGFR8nH6TpPqyWea2XB6CbukJPqCCt9xoRXDZFllgYCAKAgkgIlEkDAQKEilzpgUt9wJEIsijCnhEvSFiixGkAABQEEkBUWQSKBW+WcDqmVY8WoTVuTo763cjxvVM6lOcEuckv8AhmBzse97+iDJ+UUvCHhtjKcj+6/Sg3GWfJX/AEsvmU/0mozWaW6PS6TR6bPosUnGnZ5yXOx3emZ1/DrF5WWNfDNXpyr0WPFc5TlvHakaHK92wdLZGeTuVGN8uWtLbseKFgtiwujezodIiKHSDciUhkKMg3pKGIAKYCBgoM+p3xSjx3bfuaDPltzgvC5CyHgkoBj/AB7v7nYs6cHFOvUHP0Ivraq1moWnwSmlcntBesmLoNL/AA2BRbucnc36tlU8byarDknP+Xjjaj/vOlFqStMFliSQJKiKT8IO1DAGaSkQxxAEZU1yXMqkRFWP8mXxKMVKTb9B8M3OLb9WITt4HqP/AJ2o95nf/wCnsl6fUQ8po4HUa/jdRX951+g/blzpsO16esh+KfsWoiKqNAVyMczu+l1GUXxkgpJ/GzOkjDrI4/5OSWzjOk/kM1p1GKGXE4yR8+6p06elm5xX2M9/jyd8YKVKV8FWs0sM+OUZK0yXjmN46s0+XeS2Jo1uknpM8oPjwzMnTfydN7jGtVeO06Kk9i5bxCtXT326lS9DHqp92bI1w5GrSunLx9rOdK22T7S9QJDIml2oEjTGjoVosppCMNFXDQ1BdICaBaQsd9rINejwvJmgt6sXoj2PQdMseneRr7pM73qU4IKGKEVxRbZhskHSZ5bqLSvG7+6fcj0ra7GvWzzXXKj9N3vRFcXTK/q1yospi/ysfBPs+r7xaK4mj49NpM6waPFXuUY9PLXZ0lJuF3ORkwxyZliwwW563SaeOmwqC/X3ZjuqtxwjhxRxwVJKkLw7ZdXllUzTNNGRamZoGmIIsQAgKAgkgBgIJAhmdrc0spYFCRfBCQiXpGYqUMQBUAEEAMQQAAK2SVyezFVC2T92fP8AVzb1GRS4jOR76b7cTk/CbPAwvLqGm7cnZlYf+iJi700dDPHslNPwqOTC25fqGutLZrZWUlzVorv7+fUsKommjf0tXqsK/wB6McrV80bOlf8An4SuOcnL2cmVKnK2NJ7MSO6JO3G1d3lkbEgixVZTFahhEMmHcxJArdEWQ/ckHejK5Nght0mDX3Dp2jMmWRl9rIXE05eCokUrUmhYAQyNFNOBVF/JnNWH8X8idpn+VhIAbcUgABlArGFIUhVMtKpkSsk5dsZ26tUItdpdPjX1Mqt+FucLrOaf10nNxglVLyUShp8emWTe5cWZ3oxn1h6g4fxuRxdptP8Ac2dIm8eoSulNROVnk55XL4NuhyxWbF38R2X72W9O3x9FXAMWMk1yN3GnIHK6tX0IePvOnaOd1Lslp+yXli9JWbR51NQUmu+GzOup8XweM0+Z4ssZ+/bM9ampQ2JGZw53V+nfxWBuCucTwTi4ycWqfDs+o4J2u1vc5fVOjY9Ynkx1DN/xITh0/U28JE0R4Kp4smGcseSLUovhlkOGbZTjn2d3wyhJNtVY8n94VTEQeBoJtiF8KSuihZOnSK/AztybEvwBIN7DQV0LJKv0ArVuSPXdM03044pNK5bnA6dpJajNXiO7PY4or68EuIwMZ1vCfXYTVIGxI8Ct8+xFVZXsec65zBnfmtpP0Z5vrOVSnGPhEnauLF7NjxTbpFSNmkh3ZEWo9P0vTLDFT5lOKO3GPqZNLBQgkbExBMjNMtlIpZUqcZpRRA0IEMAAUQBIpAWNZFABDZncty+RklyBsSHIRJQAAtgAEWSAASBFIyqfBcyuXj5Ao1kuzSZn/sZ4bTfbnvj7We41sHPA4o8HCThmj+qM3tYu1jaeTfycmDqTOjr5Wl7s5yW8jUnBe2hFX9RYmmJK+4i1Xk2k2bOk7a/F8syZfDdj6HJ9LWYZPhTRpzz+vazew8I8Ire8kjR+MV6smLzUxKKrHiSumM5i2yUVjIPTpZZTJjtlUnuw1jEIdCLdlsURuhjpbEJFqQTZUKyxoRlIUAGojQiuTRj/ABKa2Gb+0rF5WvJFFi3MJujwixjKSRJBJAc0CjMVgI+Sqb3ZaymW7ZB5br0HenSXLZi1GHLklhio1FQ5Z6vU4IZ8bhJtejXKKYaWCgotd1LlmLvhXiM+N48jiWYLTvwpHQ6th7c8pKNE6bT/AFZZIL+qCmmavTp8eoi5PFGNtbKmWQnNcrgq02SM8EJvlxVo14qlD9RHK9qp6mOKDlN0jz+o1rzyLep5O7O4+IHHyxbT7eVwZtuw+V8++56PSajuwYt+YpHjPquSafKs6eg1E3kgvEDWtMZdPVwk+7Y6MJKcbOLim67ma8GdRnT2TG1x4J1LpeLXQvjKl9sjws8OXT5ZYskWpcM+n8o5fUum49bDwsq/GRY6WbfPZk+CzUYcmDJKGSLUkUrZOzbAttqqNUfxMsN5GuJUUtUmVramXe5W2u6gLIx82RLe6HvZI6PTdB/FZLk6giLHa6To/o6Xvf5TNmnt58j9jY1HFj7eKRy9NPJ9bL2QbOdvLrJw7PckZ8meGKEm2Z/pa3JzNQ+Aj07HzOUpsnNNRz8/U3KLjjTbZw9XHMlCWTbuurPZT0+KPZGMEm5I8713/VhFFkHC2O503Cux5WnfekjiI9T0mFwT8I1WY7cPsil7EfW3ol8GerkQXudgnZWkXQiVmrIFyFikhyqkmxbIsgcBCbKGCiAsBZGV8l8pGZ8k2N1hZV30L3om1XWI2LYrY2LUx0ZlItiyi0BLJsAEd2vkexXygKcm54DOu3N42ySR9AlvJI8P1bG8Wty0tnUyKy6l2+18VZje0ZbF2aVvnlblfOOtizopcT2XFjTVpSM0Np0zSncXYvZj0SSTi9vAunxPNnxwv8nRYi/ptR1XxFlZz6ethvOHlFkpNsqxbpsdOzLz4puho5Izi+0ozPwTp1sR68fHJjtpir2RelT3QmPku5CjstbFE4mpcCTX3JikquOMftplseCaQNk4pIkGqCygFY3sQwsKkPRCGQXaAaJQLdgRGCujRJqKEgvJDuUgzeashdWySSCud7QKMKwiqbozOTeyGyyptv8AQiBEho4x1BbliaKlNWwrg9YwJyUyjSR+llx9vMXKEk/KZ1+oYJZce3g5KhNwWSEbkmnflolal3HWw41jUor8btfDNmm/rM2HJDNBNOmluma8Kce5eWyyxiy7jy08U5Tm+Zd8rKJ6eUbatP34Z6DU6WWPLKaf2Td8cMoWOdcxf6HPeq36vLZ8G99rT8+guGUsMrPR5tJJrav0OLmwZcd/an/n9jpjYxcXo9LmxZ13Q+GvKNixxZ4/SZ5Ys0WdjSaubllTdruuIsc967enw3HHFPxsXGPSylODfuXSlOKteB8dccuHP6p0yGuxWqWWP4s8DmhPHKUJxcZRdNM+o48kckbicrqvSoa2HfClmiWVby8BG00akUTxzxTcJxcZRdNMsi9je2Ey/FlceSydKKRWgLkpOkuT3HTtJ9DBBP8AJ7s8v0vD9bVwTVpOz3iilVGa1iz5saeObYulwqCfua5pOEl7C4LpfBnU20btIrctEKKmt3L0R4vq2ZT1L9Iqj2OomseGc26SR89zZPq5JS9WQTp4OeRKrPaaXAsWNKtzjdH0U3P6klSSPUqIvNPilpsVRNDQlAIWQK2CZUbIgzPHIxlkGxaSiruGTG1OxGyWytsIZSY1lSY1k2pZMqosYJEEyKadl9EUFEUEiSGBUXRZXRZVIBlIO4QrZUaUxb3REeBW94/qArd5or0s8p/1Aq1EZf7T00pVmXwzzPXJd+bjhBXnptbF9f4Koq3A1Taimt/kqObxKiyLXfRXL8uRIzqSZWd6aU1dGvp//mL3TMc/U16D/wAzF72iGV3jXrMO2GI8QfCRL2RHPGbyxZcu7LtPwZ5tOzVplsHsvGMao8ovSK4osQczoSfgcyarUwwPEpuu+VEJ21x4Q6Mem1OLURlKErSbRrTAWb+1mDS6zFqvqdjf2OmR1HWQwYcy8qFL5Zw+luVrFjTt3b9/cNR6qMrtomjHpFqM2XJKdrFB9sU1Tk15OjKNQZU2pRIt7pA2GjoZLYIR2scJtDdIaC2sRbsvSETK6gFJFK5IIfBIsuAjPKCkqZWoPtryXkV+5lGVznVEY77jRSfgmMEiosSTMT0ahOUsTSUuYPg3xQyRK6zpzZaXLkhSqNPZ8stjh1mKL7ZQye0tv+ToIkaVgw6rFnlLBki4ZFzCRly/y216HWljhJpyim07RH0493dVslx2OB/EZG2sWmyz+NkZc8ssqWXQZF6NPdHrBHGMtpKy+rO3zrL3/VlLtafrVDYszhLuXD5R7rJo4ydr9meU6h02ekn3xX8uT/YsrOWErsdJ1csmT6d2nE7GeajB35PPdBh/rTfhUdTVLvlt4RLxGvF49sWp1T0lZcf9X7M6+i1MtTghkljcG/ByJ6PJqM+CEv8ARTuR6FQSVVSGM4XWrXH6t0uGsxucKWZcM8RPHPFkePJFpp00fUO1nI6n0vFrYOSqOaPDNpY8JktpEUk0i2cJwlPHOLUoummJ27bFlZ09N/0/BPJmkerPLdAnvlR6i9uTNbhpbxaKsWyRPcY3PIss4xjwrRNrp0mK9zMp5mk9kjFrs+TDhlLvFppj63rILG8ETzGmwZM2WMIK2ycs5ZZ3u7Z67pOh/h8ffNLvkEdHT4FhxQxrwkaaJSomihKF7UWkAUSiVOLNTRUwitRHolIaiKRorbZaypkVHcw3YyiP2hFaYyZDQu4Fg6EiOioeiKLKCgqqgosoigK2iWh6CgKmhXE0UI4jQRbIre80O0V/1kVRm2y4/e7PMdSd5J7o9HrZ/TcJM8vq5d3c1wFcrFakPOVsXHX3MWTdtm4z0zSSbtFbRLu2LZWG5ruxwfsaem1/GYrMq/FV4Rq6c0tTC/VEXL8vXr7pv2DJwPBUr9SvKZvTPhm82VmrS7IzpWa8EaVGY9eXTWiwrRnnq8UMsMLl907otrk2Wjg9V0mp1mSKxNVBWrOg5ytsSU3KopuNoxc5tZHI0kNRh6fqI/TnF99yNmGGo+hHJDWuEI/05Iprb3Q8NTLTzcZvvgzjdV6i8jjp8NxhEuN3S8G1H/y8qUG5Sb3a4b9kev0mnhp8GPGopUlZ5HpGKb1OOGOXH35Ge2RtKYXI6gx0VTdsqTtnprdhH7mGeVRv3SRZijSsjtvja9CyZKaIinJhg2NbWWADK53lXOSjFtuklbOQ9e3PuUowgvXljdUzNQjijy92cOS4XkzlkzHqcOpw5/wmmy6XB57SYZQampNM7DnKVfAl2XhZZJWkyxFZFXuCQ6Q9DQVIZEpDFdJUUTRJICkkgBFENDgAiM+q08NThyYpOr4ZrFYpHkNLPJ03VvDmX2ZPJ2ZO5OhuqaaObA1W6Mmmt48e97IPX4MJ63J09OrlZuKMC2bLw8+X6oEkh7IZWI5Ot6ZptZ90k4z8TR5nVdH1WmTdd+P1ie57R6VURa+e6DNPDlpM9bpdR9eOzSkuURq+kYM778f8vJ6o4Leo0easqcZriS4YpHpZPKjNnlJduRTp8Ms0usx50oy2mTn0ryxko7WjKsv1ceLFJZMzdHm9ZrJ6iVK+xcI1Zen6rvkjraLo0MUvqZZd7KVR0vpdVlyrd8I9MklsiIpJUhgykkUkoAAgBWVMskVAPEcVDECsqaLhaAiKHolIYQUtFLRpaKWgCJYKkOixFwAAVAAAAAAAENEgBU0Vrd2WSEbqJBxeq5O1Ya/uPOanaK8+rOz1WbaS9JI4Grk7iSdt9RkVrv8AgqbuyxNttX4Krp1tRuOdqliMsZUaYbIO4x+Db06DnqsUPVmHC7x+8Wd7omNSzzk1tjjt8szpvW5XpmUT3VIu9SiX5JMlPD9paUUvYvxbN2Ut7la1EceSEHGT79lSsy7XpfrdVDS4JTl8I5y0+Vw0+R5VKUG25NO6Zz9frfq6qeNwxuGN0nL1OlhnJxi+/lJut1+hnLhiJz6vFpop5JJprg8/qtfl1OeKxNqPbSRp6xjc5JriJx8E+xuXkmGE1stdpNaPBjjKSfmXszlYu/Jlc3V2LlyzzTrt/Q0wxKGfDhtX3rubNyaXt77BjjhxY4pK6VuuTSmZIZYzbipRbjVpM0wKLXsipkt3YpUivIk+0mLZU3cnuWxvwZ26a4izl0XxVITHGkWmo55UCydJtjGPW5OzBOvyku2PywxXAzZHmyznHe3t8DYsNcjfw+SCpZJEfT1K4jF/OxwqxvxRNiSOdpNRGTnjk0skXXbZ0DpOmLTk2KBpFiYyZWhkwH4YwqGRWomySEMG0ASSEQSQFgBFg3QBVWWvpyOdDCscmlw6aOhkx98JQuvKYjhUk/CQdvHn6yza/HtBDlcWlErnkK56tp5TosRRjj5ZeDLU4hiGRZROQTHG2rozi3VoXNgx58coTVpoyS23NWHJ3bMN5+LU3HltXoc+hrJjblBNU/KOjoOqRzKMZ7SO5khGcXGStNHjtfoHpcilB1DwzNjjK9VOKatIbG6VHA0HUmqx5n8M7kXHw9mNtNAEJ2MVEASAEASFAVsQsYgDJDAhgEBEgBKJBAAjKmi1lTIiUMKhyiwAJCgAACCSAAkhgK2BW93Rmz5Ek4miWycmcjUZVFSvazNq4uXr5PJ9Rr8Yo8/mn3dnwdTNmTg4rlu2ceVX8FkayKn9yYk+H6pk91UxIyV78N7mnKqpMQtnHtZUzURr0L/mSi1fcj2HScP09NOXmUzxekfbqMfyfRMUfp4scPSKJW8OabyY8rfhmiMrbRXKH3O0ZrfjnrnZWdSbcVIx6xaqLUscPsjFttSo6iW2y8GTU5FJyxKGWT7f6COmVcTpOnebNPLKKaXrzbOll1OLBJdypNvgr00sWCGRTkotxTUfP6mDV5MeWnKO9ulZizdYk4V6/XRzOsdVW7oxYMGXPPshFtsuyaT6eJTlNdzqo+TvaGEsejj9GNZJLeUjc1JwkwtvLI9Bj0OB5cj7sr2ivFmfS6HV6xWlULtzZ29N01Jueok8krZ1Y0klFJKuBtr1Jo9Ji0kO2HL5k+Wb7pFEWEpckhpY5lH1+61BGGc5aqbhHbEuX/f7I2wihdtTGRbCD8mqEUimCNKLIxladElLzYozWN5IqbVqLe7LLK5pZxdZkU9ZDHb/AJa7v1Z2G1FNs81qZYo9QzOblbUaomXSfY1c+Qyz+jgyZJP8UTgrI9mcvrWpqWPTQ+ZnHGW9rbqOMp5FkWaMmpXyep0XUI5o1kVSR5WNOM4/qacGVxaa5Ru2xxnb2ypq0yTi6bVuNNcPwdiE4zipRLLtuwwyFA1EWJj9yKkzn63M4ZsCT9WW3RvTsElGLIskFJFgdDgIRbAsKpSrj9iHNLm0JKUmtkpINSLIzjLh/oUPN9GajL8X5OTqs+TFNSVr9Nyz+OwajDKGZ/Sn4ctiOvpqS/K7lpoy5501Ex6PUwxYay5lV7PwRnlJueXDWRPhE9mZJMl+TUxhURI5fqT7Uzi6jUQUopwnGdbpq0XQ1EdJgU1iU5f3qWxZXaTD147eki1Soazyq6vq8jqEInR0+bVZuXSN6Yvhy7tjsMzyYyhKtxJQ7d+4iYal7VSY+NyTWxVJFmKbiHez+HDpLdGfUYIZ8U8c1s0XQkpLYYPBY+f58eXRZvpZk2vEvDOppc0lD+XPb0Z2+oaWGpwThJK6uJ4XHknhnttvumZuJM7OK9vh1V0prtdc+DoRlZ5HT9RkvzVo7On1OCX45O1kls7b064GeORpK916otjK+HZplYAtgBDFJZADoYhEgKBIAAADArZWWSKiIZFgiLCiwAIYUAQCAAAAATkZlGRtQkBTlncqvZHB6jLvyJK6grkdf8cU5+VFs8rknKXc2923/kw3GLNN37GOb/wW5ZO/1KJcv4OkYqvnexE0nuthhJcmowujUo9rdrwVSxtWiFtb9C+Le5F7W9MwPJrtPF8d573Kzy/Q0nreOISPUT/qZK6YcVljLtnF+EPnyOMG4K2lsih/kK2Su1xlsrJi12qyzcf4Kaau7ZqU9SseSU1HaNpRtjNtSS8OjBrMs0sMIyr6uSMW1yk/QyXFytP9bNKUcWNuUn+T2o62LpWKMbzzc5/NI34McMWOoRSqJZHdNsJIyYtHgg7hjXy9zoxio/JGJ3It47vZEVAWTJUFLYAy6jFgxueR0v8AJy29VrpfdeHT+I8SkVarVZFldKO0U06tqyp6zOr3XF8Fbx8f13sWOMIqMIpJKkjRFWYNFmnlbjNnUgJ0xnxTRVEzyQxY5Tm0oxVtgjyfWtVmlnlhv7IU6NONXyxT6rqFkrtXC9onc0mhWm3+tkn7N7FXSccYaHE1zK2zpoac6rzdig5S4irPHPPJ6yOolz32en6nJx0WVr2PHqTldpGMrokexebFDBLOq7FDuPnufU5M+RzyP7nNs9LklL/tcIXs50eY1CXJYxl+lik4SjK/Jcpds9jFGTcGmWxbUU/ZCxh18OWnfg7ekzds0r2Z5vHJ/b8HU0sncl6SOfTrjd8PTALjdwg35Q7OsRBweob55u3cDvnJcYz1eaMladp/sSs5fDdP1H9LO2meXUFizwhC6Z6PC28cWxjXTC8LQAVmnREpJLc42fWRhL7Iv9Dq5IqWzODr4rG49od/DhMrqqNT1tNKEtKpetseOTR5/uWGTa2Xe1So85ndTXuztYMs46HG1SZjycSGeMlsjZHO4S+lgxN99WpO1Rtw4MOCLcX293KvazHhxLJOEZN9va216/Jn6rnnjjDFFJRaOcc701ZdVlxSccmjk470478GnFkx58N4mla3818o8rotZqMWaDU27fbT3VHoYYox1f1U2nJO14ZbxWJzzGPLCGizKf1Z23unGos36bU4s6/l3aDqVPRTk0m1RxdDqcuSbTo7eO7mnp8P87616iGSa27iZZr9SiG6i2wkbd548d9NEZJoXhmdSaki7lGWfX1y18rVjm0bHJ3B+Hsc6HBqTf0b9JIPN58Z2vmtjyXU9Koyc+09e+Gee6ztpm/RoV5bxXmVGSXdHdDrM0lXrwNj23Taf/8AhblxQlh+pVSvx8WY+uvxq02vyQf2z/RnWw9QxTacvtl6nj4N82aMc5Pe+I2W4pK93HLavleqLVNPdM8tpc2SPEnsd3FJyxxm+WhKWNjZCK/BCYZaUMVRHKqSAJAkhkkMCqRWPIQIdDlSGCP/2Q=="

/***/ }),

/***/ 19:
/*!*******************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/circleBanner/4.jpg ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 199:
/*!*******************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/icon/add.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"bigCreation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"bigCreation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"bigCreation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"bigCreation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!********************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/boy.jpg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 21:
/*!*******************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/static/image/circleBanner/1.jpg ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 22:
/*!******************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 23));

var _mpShare = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpShare.js */ 24));

var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 25));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 29));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 30));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 31));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 32));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 33));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 34));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 35));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 36));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 37));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 27));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 26));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 28));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 38));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 39));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 40));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 41));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post, put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 23:
/*!*****************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/mixin/mpShare.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  onLoad: function onLoad() {
    // 设置默认的转发参数
    this.$u.mpShare = {
      title: '', // 默认为小程序名称
      path: '', // 默认为当前页面路径
      imageUrl: '' // 默认为当前页面的截图
    };
  },
  onShareAppMessage: function onShareAppMessage() {
    return this.$u.mpShare;
  } };

/***/ }),

/***/ 25:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/request/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 26));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          return false;
        }
        this.options = interceptorReuest;
      }

      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg });

              }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {
        'content-type': 'application/json;charset=UTF-8' },

      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 27:
/*!************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/deepClone.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 对象深度克隆
function deepClone() {var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var o, i, j, k;
  if (typeof object !== "object" || object === null) return object;
  if (object instanceof Array) {
    o = [];
    i = 0;
    j = object.length;
    for (; i < j; i++) {
      if (typeof object[i] === "object" && object[i] != null) {
        o[i] = deepClone(object[i]);
      } else {
        o[i] = object[i];
      }
    }
  } else {
    o = {};
    for (i in object) {
      if (typeof object[i] === "object" && object[i] !== null) {
        o[i] = deepClone(object[i]);
      } else {
        o[i] = object[i];
      }
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 28:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/test.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty };exports.default = _default;

/***/ }),

/***/ 29:
/*!**************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/queryParams.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!********************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/route.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!*************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (timestamp == null) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 32:
/*!***********************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 31));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 33:
/*!****************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 34:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/guid.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 35:
/*!********************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/color.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 36:
/*!************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/type2icon.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 37:
/*!**************************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/randomArray.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 38:
/*!*********************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/random.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 39:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/trim.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 4:
/*!**********************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/pages.json ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!********************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/function/toast.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/config/config.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-06-12
var version = '1.3.4';var _default =

{
  v: version,
  version: version };exports.default = _default;

/***/ }),

/***/ 42:
/*!*******************************************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 43:
/*!***************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/filter/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatTel = formatTel;
/**
                                                                                                           * 转换11位电话号码，给中间加上空格
                                                                                                           */
function formatTel() {var tel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  tel = String(tel);
  if (tel.length != 11) {
    return tel;
  } else {
    var start = tel.substring(0, 3);
    var inter = tel.substring(3, 7);
    var end = tel.substring(7, 11);
    return start + ' ' + inter + ' ' + end;
  }
}

/***/ }),

/***/ 44:
/*!*****************************************************************!*\
  !*** C:/Users/82669/Desktop/uniapp-front-end/store/$u.mixin.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _vuex = __webpack_require__(/*! vuex */ 14);
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
var $uStoreKey = [];
try {
  $uStoreKey = _store.default.state ? Object.keys(_store.default.state) : [];
} catch (e) {}

module.exports = {
  created: function created() {var _this = this;
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
    this.$u.vuex = function (name, value) {
      _this.$store.commit('$uStore', {
        name: name, value: value });

    };
  },
  computed: _objectSpread({},

  (0, _vuex.mapState)($uStoreKey)) };

/***/ }),

/***/ 45:
/*!*******************************************!*\
  !*** ./node_modules/flyio/dist/npm/wx.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + ('%5B' + i + '%5D'));
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    var AjaxEngine = function () {
        function AjaxEngine() {
            _classCallCheck(this, AjaxEngine);

            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0; // 0 stands for no timeout
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _createClass(AjaxEngine, [{
            key: "_call",
            value: function _call(name) {
                this[name] && this[name].apply(this, [].splice.call(arguments, 1));
            }
        }, {
            key: "_changeReadyState",
            value: function _changeReadyState(state) {
                this.readyState = state;
                this._call("onreadystatechange");
            }
        }, {
            key: "open",
            value: function open(method, url) {
                this.method = method;
                if (!url) {
                    url = location.href;
                } else {
                    url = util.trim(url);
                    if (url.indexOf("http") !== 0) {
                        // Normalize the request url
                        if (isBrowser) {
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }
                }
                this.responseURL = url;
                this._changeReadyState(1);
            }
        }, {
            key: "send",
            value: function send(arg) {
                var _this = this;

                arg = arg || null;
                var self = this;
                if (adapter) {
                    var request = {
                        method: self.method,
                        url: self.responseURL,
                        headers: self.requestHeaders || {},
                        body: arg
                    };
                    util.merge(request, self._options || {});
                    if (request.method === "GET") {
                        request.body = null;
                    }
                    self._changeReadyState(3);
                    var timer = void 0;
                    self.timeout = self.timeout || 0;
                    if (self.timeout > 0) {
                        timer = setTimeout(function () {
                            if (self.readyState === 3) {
                                _this._call("onloadend");
                                self._changeReadyState(0);
                                self._call("ontimeout");
                            }
                        }, self.timeout);
                    }
                    request.timeout = self.timeout;
                    adapter(request, function (response) {

                        function getAndDelete(key) {
                            var t = response[key];
                            delete response[key];
                            return t;
                        }

                        // If the request has already timeout, return
                        if (self.readyState !== 3) return;
                        clearTimeout(timer);

                        // Make sure the type of status is integer
                        self.status = getAndDelete("statusCode") - 0;

                        var responseText = getAndDelete("responseText");
                        var statusMessage = getAndDelete("statusMessage");

                        // Network error, set the status code 0
                        if (!self.status) {
                            self.statusText = responseText;
                            self._call("onerror", { msg: statusMessage });
                        } else {
                            // Parsing the response headers to array in a object,  because
                            // there may be multiple values with the same header name
                            var responseHeaders = getAndDelete("headers");
                            var headers = {};
                            for (var field in responseHeaders) {
                                var value = responseHeaders[field];
                                var key = field.toLowerCase();
                                // Is array
                                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                    headers[key] = value;
                                } else {
                                    headers[key] = headers[key] || [];
                                    headers[key].push(value);
                                }
                            }
                            var cookies = headers["set-cookie"];
                            if (isBrowser && cookies) {
                                cookies.forEach(function (e) {
                                    // Remove the http-Only property of the  cookie
                                    // so that JavaScript can operate it.
                                    document.cookie = e.replace(/;\s*httpOnly/ig, "");
                                });
                            }
                            self.responseHeaders = headers;
                            // Set the fields of engine from response
                            self.statusText = statusMessage || "";
                            self.response = self.responseText = responseText;
                            self._response = response;
                            self._changeReadyState(4);
                            self._call("onload");
                        }
                        self._call("onloadend");
                    });
                } else {
                    console.error("Ajax require adapter");
                }
            }
        }, {
            key: "setRequestHeader",
            value: function setRequestHeader(key, value) {
                this.requestHeaders[util.trim(key)] = value;
            }
        }, {
            key: "getResponseHeader",
            value: function getResponseHeader(key) {
                return (this.responseHeaders[key.toLowerCase()] || "").toString() || null;
            }
        }, {
            key: "getAllResponseHeaders",
            value: function getAllResponseHeaders() {
                var str = "";
                for (var key in this.responseHeaders) {
                    str += key + ":" + this.getResponseHeader(key) + "\r\n";
                }
                return str || null;
            }
        }, {
            key: "abort",
            value: function abort(msg) {
                this._changeReadyState(0);
                this._call("onerror", { msg: msg });
                this._call("onloadend");
            }
        }], [{
            key: "setAdapter",
            value: function setAdapter(requestAdapter) {
                adapter = requestAdapter;
            }
        }]);

        return AjaxEngine;
    }();

    return AjaxEngine;
}

// learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = EngineWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve = void 0;
            var reject = void 0;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (needQuery && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (needQuery && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || needQuery)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        try {
                            // The xhr of IE9 has not response field
                            var response = engine.response || engine.responseText;
                            if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                                response = JSON.parse(response);
                            }

                            var headers = engine.responseHeaders;
                            // In browser
                            if (!headers) {
                                headers = {};
                                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                                items.pop();
                                items.forEach(function (e) {
                                    if (!e) return;
                                    var key = e.split(":")[0];
                                    headers[key] = engine.getResponseHeader(key);
                                });
                            }
                            var status = engine.status;
                            var statusText = engine.statusText;
                            var _data = { data: response, headers: headers, status: status, statusText: statusText };
                            // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                            utils.merge(_data, engine._response);
                            if (status >= 200 && status < 300 || status === 304) {
                                _data.engine = engine;
                                _data.request = options;
                                onresult(responseInterceptor.handler, _data, 0);
                            } else {
                                var e = new Err(statusText, status);
                                e.response = _data;
                                onerror(e);
                            }
                        } catch (e) {
                            onerror(new Err(e.msg, engine.status));
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(needQuery ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, JSON.parse(JSON.stringify(_this.config)));
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
["lock", "unlock", "clear"].forEach(function (e) {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    };
});
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序适配器
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType || undefined,
        header: request.headers,
        data: request.body || {},
        responseType: request.responseType || 'text',
        success: function success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            });
        },
        fail: function fail(res) {
            responseCallback({
                statusCode: res.statusCode || 0,
                statusMessage: res.errMsg
            });
        }
    };
    wx.request(con);
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序入口
var _Fly = __webpack_require__(2);
var EngineWrapper = __webpack_require__(1);
var adapter = __webpack_require__(7);
var wxEngine = EngineWrapper(adapter);
module.exports = function (engine) {
    return new _Fly(engine || wxEngine);
};

/***/ })
/******/ ]);
});

/***/ }),

/***/ 68:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 69);

/***/ }),

/***/ 69:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 70);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 70:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map