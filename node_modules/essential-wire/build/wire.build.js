(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wire"] = factory();
	else
		root["wire"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _context = __webpack_require__(2);
	
	var _context2 = _interopRequireDefault(_context);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var wire, rootContext, rootOptions;
	var rootSpec = {};
	
	wire.version = '0.10.11';
	
	rootOptions = { require: __webpack_require__(61) };
	
	function wire(spec, options) {
	
		// If the root context is not yet wired, wire it first
		if (!rootContext) {
			rootContext = (0, _context2.default)(rootSpec, null, rootOptions);
		}
	
		// Use the rootContext to wire all new contexts.
		return rootContext.then(function (root) {
			return root.wire(spec, options);
		});
	}
	
	wire.load = function amdLoad(name, require, done /*, config */) {
		// If it's a string, try to split on ',' since it could be a comma-separated
		// list of spec module ids
		wire(name.split(','), { require: require }).then(done, done.error).otherwise(crash);
	
		function crash(e) {
			// Throw uncatchable exception for loaders that don't support
			// AMD error handling.  This will propagate up to the host environment
			setTimeout(function () {
				throw e;
			}, 0);
		}
	};
	
	module.exports = wire;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, mixin, loaderAdapter, relativeLoader, Container, specUtils;
	
			when = __webpack_require__(3);
			mixin = __webpack_require__(24).mixin;
			loaderAdapter = __webpack_require__(25);
			relativeLoader = __webpack_require__(26);
			Container = __webpack_require__(28);
			specUtils = __webpack_require__(44);
	
			/**
	   * Creates a new context from the supplied specs, with the supplied
	   * parent context. If specs is an {Array}, it may be a mixed array
	   * of string module ids, and object literal specs.  All spec module
	   * ids will be loaded, and then all specs will be merged from
	   * left-to-right (rightmost wins), and the resulting, merged spec will
	   * be wired.
	   * @private
	   *
	   * @param {String|Object|String[]|Object[]} specs
	   * @param {Object} parent context
	   * @param {Object} [options]
	   *
	   * @return {Promise} a promise for the new context
	   */
			return function createContext(specs, parent, options) {
				// Do the actual wiring after all specs have been loaded
	
				if (!options) {
					options = {};
				}
				if (!parent) {
					parent = {};
				}
	
				options.createContext = createContext;
	
				var specLoader = createSpecLoader(parent.moduleLoader, options.require);
	
				return when(specs, function (specs) {
					options.moduleLoader = createContextLoader(specLoader, findBaseId(specs));
	
					return specUtils.mergeSpecs(specLoader, specs).then(function (spec) {
	
						var container = new Container(parent, options);
	
						// Expose only the component instances and controlled API
						return container.init(spec).then(function (context) {
							return context.instances;
						});
					});
				});
			};
	
			function createContextLoader(parentLoader, baseId) {
				return baseId ? relativeLoader(parentLoader, baseId) : parentLoader;
			}
	
			/**
	   * Create a module loader
	   * @param {function} [platformLoader] platform require function with which
	   *  to configure the module loader
	   * @param {function} [parentLoader] existing module loader from which
	   *  the new module loader will inherit, if provided.
	   * @return {Object} module loader with load() and merge() methods
	   */
			var _require = __webpack_require__(58);
			function createSpecLoader(parentLoader, platformLoader) {
				var loadModule = typeof platformLoader == 'function' ? loaderAdapter(platformLoader) : parentLoader || loaderAdapter(_require);
	
				return loadModule;
			}
	
			function findBaseId(specs) {
				var firstId;
	
				if (typeof specs === 'string') {
					return specs;
				}
	
				if (!Array.isArray(specs)) {
					return;
				}
	
				specs.some(function (spec) {
					if (typeof spec === 'string') {
						firstId = spec;
						return true;
					}
				});
	
				return firstId;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	
	/**
	 * Promises/A+ and when() implementation
	 * when is part of the cujoJS family of libraries (http://cujojs.com/)
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var timed = __webpack_require__(4);
		var array = __webpack_require__(10);
		var flow = __webpack_require__(13);
		var fold = __webpack_require__(14);
		var inspect = __webpack_require__(15);
		var generate = __webpack_require__(16);
		var progress = __webpack_require__(17);
		var withThis = __webpack_require__(18);
		var unhandledRejection = __webpack_require__(19);
		var TimeoutError = __webpack_require__(9);
	
		var Promise = [array, flow, fold, generate, progress,
			inspect, withThis, timed, unhandledRejection]
			.reduce(function(Promise, feature) {
				return feature(Promise);
			}, __webpack_require__(21));
	
		var apply = __webpack_require__(12)(Promise);
	
		// Public API
	
		when.promise     = promise;              // Create a pending promise
		when.resolve     = Promise.resolve;      // Create a resolved promise
		when.reject      = Promise.reject;       // Create a rejected promise
	
		when.lift        = lift;                 // lift a function to return promises
		when['try']      = attempt;              // call a function and return a promise
		when.attempt     = attempt;              // alias for when.try
	
		when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
		when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	
		when.join        = join;                 // Join 2 or more promises
	
		when.all         = all;                  // Resolve a list of promises
		when.settle      = settle;               // Settle a list of promises
	
		when.any         = lift(Promise.any);    // One-winner race
		when.some        = lift(Promise.some);   // Multi-winner race
		when.race        = lift(Promise.race);   // First-to-settle race
	
		when.map         = map;                  // Array.map() for promises
		when.filter      = filter;               // Array.filter() for promises
		when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
		when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises
	
		when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable
	
		when.Promise     = Promise;              // Promise constructor
		when.defer       = defer;                // Create a {promise, resolve, reject} tuple
	
		// Error types
	
		when.TimeoutError = TimeoutError;
	
		/**
		 * Get a trusted promise for x, or by transforming x with onFulfilled
		 *
		 * @param {*} x
		 * @param {function?} onFulfilled callback to be called when x is
		 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
		 *   will be invoked immediately.
		 * @param {function?} onRejected callback to be called when x is
		 *   rejected.
		 * @param {function?} onProgress callback to be called when progress updates
		 *   are issued for x. @deprecated
		 * @returns {Promise} a new promise that will fulfill with the return
		 *   value of callback or errback or the completion value of promiseOrValue if
		 *   callback and/or errback is not supplied.
		 */
		function when(x, onFulfilled, onRejected, onProgress) {
			var p = Promise.resolve(x);
			if (arguments.length < 2) {
				return p;
			}
	
			return p.then(onFulfilled, onRejected, onProgress);
		}
	
		/**
		 * Creates a new promise whose fate is determined by resolver.
		 * @param {function} resolver function(resolve, reject, notify)
		 * @returns {Promise} promise whose fate is determine by resolver
		 */
		function promise(resolver) {
			return new Promise(resolver);
		}
	
		/**
		 * Lift the supplied function, creating a version of f that returns
		 * promises, and accepts promises as arguments.
		 * @param {function} f
		 * @returns {Function} version of f that returns promises
		 */
		function lift(f) {
			return function() {
				for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
					a[i] = arguments[i];
				}
				return apply(f, this, a);
			};
		}
	
		/**
		 * Call f in a future turn, with the supplied args, and return a promise
		 * for the result.
		 * @param {function} f
		 * @returns {Promise}
		 */
		function attempt(f /*, args... */) {
			/*jshint validthis:true */
			for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i+1];
			}
			return apply(f, this, a);
		}
	
		/**
		 * Creates a {promise, resolver} pair, either or both of which
		 * may be given out safely to consumers.
		 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
		 */
		function defer() {
			return new Deferred();
		}
	
		function Deferred() {
			var p = Promise._defer();
	
			function resolve(x) { p._handler.resolve(x); }
			function reject(x) { p._handler.reject(x); }
			function notify(x) { p._handler.notify(x); }
	
			this.promise = p;
			this.resolve = resolve;
			this.reject = reject;
			this.notify = notify;
			this.resolver = { resolve: resolve, reject: reject, notify: notify };
		}
	
		/**
		 * Determines if x is promise-like, i.e. a thenable object
		 * NOTE: Will return true for *any thenable object*, and isn't truly
		 * safe, since it may attempt to access the `then` property of x (i.e.
		 *  clever/malicious getters may do weird things)
		 * @param {*} x anything
		 * @returns {boolean} true if x is promise-like
		 */
		function isPromiseLike(x) {
			return x && typeof x.then === 'function';
		}
	
		/**
		 * Return a promise that will resolve only once all the supplied arguments
		 * have resolved. The resolution value of the returned promise will be an array
		 * containing the resolution values of each of the arguments.
		 * @param {...*} arguments may be a mix of promises and values
		 * @returns {Promise}
		 */
		function join(/* ...promises */) {
			return Promise.all(arguments);
		}
	
		/**
		 * Return a promise that will fulfill once all input promises have
		 * fulfilled, or reject when any one input promise rejects.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise}
		 */
		function all(promises) {
			return when(promises, Promise.all);
		}
	
		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will only reject if `promises` itself is a rejected promise.
		 * @param {array|Promise} promises array (or promise for an array) of promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return when(promises, Promise.settle);
		}
	
		/**
		 * Promise-aware array map function, similar to `Array.prototype.map()`,
		 * but input array may contain promises or values.
		 * @param {Array|Promise} promises array of anything, may contain promises and values
		 * @param {function(x:*, index:Number):*} mapFunc map function which may
		 *  return a promise or value
		 * @returns {Promise} promise that will fulfill with an array of mapped values
		 *  or reject if any input promise rejects.
		 */
		function map(promises, mapFunc) {
			return when(promises, function(promises) {
				return Promise.map(promises, mapFunc);
			});
		}
	
		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array|Promise} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			return when(promises, function(promises) {
				return Promise.filter(promises, predicate);
			});
		}
	
		return when;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var env = __webpack_require__(5);
		var TimeoutError = __webpack_require__(9);
	
		function setTimeout(f, ms, x, y) {
			return env.setTimer(function() {
				f(x, y, ms);
			}, ms);
		}
	
		return function timed(Promise) {
			/**
			 * Return a new promise whose fulfillment value is revealed only
			 * after ms milliseconds
			 * @param {number} ms milliseconds
			 * @returns {Promise}
			 */
			Promise.prototype.delay = function(ms) {
				var p = this._beget();
				this._handler.fold(handleDelay, ms, void 0, p._handler);
				return p;
			};
	
			function handleDelay(ms, x, h) {
				setTimeout(resolveDelay, ms, x, h);
			}
	
			function resolveDelay(x, h) {
				h.resolve(x);
			}
	
			/**
			 * Return a new promise that rejects after ms milliseconds unless
			 * this promise fulfills earlier, in which case the returned promise
			 * fulfills with the same value.
			 * @param {number} ms milliseconds
			 * @param {Error|*=} reason optional rejection reason to use, defaults
			 *   to a TimeoutError if not provided
			 * @returns {Promise}
			 */
			Promise.prototype.timeout = function(ms, reason) {
				var p = this._beget();
				var h = p._handler;
	
				var t = setTimeout(onTimeout, ms, reason, p._handler);
	
				this._handler.visit(h,
					function onFulfill(x) {
						env.clearTimer(t);
						this.resolve(x); // this = h
					},
					function onReject(x) {
						env.clearTimer(t);
						this.reject(x); // this = h
					},
					h.notify);
	
				return p;
			};
	
			function onTimeout(reason, h, ms) {
				var e = typeof reason === 'undefined'
					? new TimeoutError('timed out after ' + ms + 'ms')
					: reason;
				h.reject(e);
			}
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		/*jshint maxcomplexity:6*/
	
		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout
	
		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;
	
		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };
	
		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };
	
		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);
	
		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = __webpack_require__(7);
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}
	
		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};
	
		function isNode () {
			return typeof process !== 'undefined' &&
				Object.prototype.toString.call(process) === '[object process]';
		}
	
		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}
	
		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });
	
			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}
	
			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		/**
		 * Custom error type for promises rejected by promise.timeout
		 * @param {string} message
		 * @constructor
		 */
		function TimeoutError (message) {
			Error.call(this);
			this.message = message;
			this.name = TimeoutError.name;
			if (typeof Error.captureStackTrace === 'function') {
				Error.captureStackTrace(this, TimeoutError);
			}
		}
	
		TimeoutError.prototype = Object.create(Error.prototype);
		TimeoutError.prototype.constructor = TimeoutError;
	
		return TimeoutError;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var state = __webpack_require__(11);
		var applier = __webpack_require__(12);
	
		return function array(Promise) {
	
			var applyFold = applier(Promise);
			var toPromise = Promise.resolve;
			var all = Promise.all;
	
			var ar = Array.prototype.reduce;
			var arr = Array.prototype.reduceRight;
			var slice = Array.prototype.slice;
	
			// Additional array combinators
	
			Promise.any = any;
			Promise.some = some;
			Promise.settle = settle;
	
			Promise.map = map;
			Promise.filter = filter;
			Promise.reduce = reduce;
			Promise.reduceRight = reduceRight;
	
			/**
			 * When this promise fulfills with an array, do
			 * onFulfilled.apply(void 0, array)
			 * @param {function} onFulfilled function to apply
			 * @returns {Promise} promise for the result of applying onFulfilled
			 */
			Promise.prototype.spread = function(onFulfilled) {
				return this.then(all).then(function(array) {
					return onFulfilled.apply(this, array);
				});
			};
	
			return Promise;
	
			/**
			 * One-winner competitive race.
			 * Return a promise that will fulfill when one of the promises
			 * in the input array fulfills, or will reject when all promises
			 * have rejected.
			 * @param {array} promises
			 * @returns {Promise} promise for the first fulfilled value
			 */
			function any(promises) {
				var p = Promise._defer();
				var resolver = p._handler;
				var l = promises.length>>>0;
	
				var pending = l;
				var errors = [];
	
				for (var h, x, i = 0; i < l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					h = Promise._handler(x);
					if(h.state() > 0) {
						resolver.become(h);
						Promise._visitRemaining(promises, i, h);
						break;
					} else {
						h.visit(resolver, handleFulfill, handleReject);
					}
				}
	
				if(pending === 0) {
					resolver.reject(new RangeError('any(): array must not be empty'));
				}
	
				return p;
	
				function handleFulfill(x) {
					/*jshint validthis:true*/
					errors = null;
					this.resolve(x); // this === resolver
				}
	
				function handleReject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--pending === 0) {
						this.reject(errors);
					}
				}
			}
	
			/**
			 * N-winner competitive race
			 * Return a promise that will fulfill when n input promises have
			 * fulfilled, or will reject when it becomes impossible for n
			 * input promises to fulfill (ie when promises.length - n + 1
			 * have rejected)
			 * @param {array} promises
			 * @param {number} n
			 * @returns {Promise} promise for the earliest n fulfillment values
			 *
			 * @deprecated
			 */
			function some(promises, n) {
				/*jshint maxcomplexity:7*/
				var p = Promise._defer();
				var resolver = p._handler;
	
				var results = [];
				var errors = [];
	
				var l = promises.length>>>0;
				var nFulfill = 0;
				var nReject;
				var x, i; // reused in both for() loops
	
				// First pass: count actual array items
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
					++nFulfill;
				}
	
				// Compute actual goals
				n = Math.max(n, 0);
				nReject = (nFulfill - n + 1);
				nFulfill = Math.min(n, nFulfill);
	
				if(n > nFulfill) {
					resolver.reject(new RangeError('some(): array must contain at least '
					+ n + ' item(s), but had ' + nFulfill));
				} else if(nFulfill === 0) {
					resolver.resolve(results);
				}
	
				// Second pass: observe each array item, make progress toward goals
				for(i=0; i<l; ++i) {
					x = promises[i];
					if(x === void 0 && !(i in promises)) {
						continue;
					}
	
					Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
				}
	
				return p;
	
				function fulfill(x) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					results.push(x);
					if(--nFulfill === 0) {
						errors = null;
						this.resolve(results);
					}
				}
	
				function reject(e) {
					/*jshint validthis:true*/
					if(this.resolved) { // this === resolver
						return;
					}
	
					errors.push(e);
					if(--nReject === 0) {
						results = null;
						this.reject(errors);
					}
				}
			}
	
			/**
			 * Apply f to the value of each promise in a list of promises
			 * and return a new list containing the results.
			 * @param {array} promises
			 * @param {function(x:*, index:Number):*} f mapping function
			 * @returns {Promise}
			 */
			function map(promises, f) {
				return Promise._traverse(f, promises);
			}
	
			/**
			 * Filter the provided array of promises using the provided predicate.  Input may
			 * contain promises and values
			 * @param {Array} promises array of promises and values
			 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
			 *  Must return truthy (or promise for truthy) for items to retain.
			 * @returns {Promise} promise that will fulfill with an array containing all items
			 *  for which predicate returned truthy.
			 */
			function filter(promises, predicate) {
				var a = slice.call(promises);
				return Promise._traverse(predicate, a).then(function(keep) {
					return filterSync(a, keep);
				});
			}
	
			function filterSync(promises, keep) {
				// Safe because we know all promises have fulfilled if we've made it this far
				var l = keep.length;
				var filtered = new Array(l);
				for(var i=0, j=0; i<l; ++i) {
					if(keep[i]) {
						filtered[j++] = Promise._handler(promises[i]).value;
					}
				}
				filtered.length = j;
				return filtered;
	
			}
	
			/**
			 * Return a promise that will always fulfill with an array containing
			 * the outcome states of all input promises.  The returned promise
			 * will never reject.
			 * @param {Array} promises
			 * @returns {Promise} promise for array of settled state descriptors
			 */
			function settle(promises) {
				return all(promises.map(settleOne));
			}
	
			function settleOne(p) {
				var h = Promise._handler(p);
				if(h.state() === 0) {
					return toPromise(p).then(state.fulfilled, state.rejected);
				}
	
				h._unreport();
				return state.inspect(h);
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduce(promises, f /*, initialValue */) {
				return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
						: ar.call(promises, liftCombine(f));
			}
	
			/**
			 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
			 * input may contain promises and/or values, and reduceFunc
			 * may return either a value or a promise, *and* initialValue may
			 * be a promise for the starting value.
			 * @param {Array|Promise} promises array or promise for an array of anything,
			 *      may contain a mix of promises and values.
			 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
			 * @returns {Promise} that will resolve to the final reduced value
			 */
			function reduceRight(promises, f /*, initialValue */) {
				return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
						: arr.call(promises, liftCombine(f));
			}
	
			function liftCombine(f) {
				return function(z, x, i) {
					return applyFold(f, void 0, [z,x,i]);
				};
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			pending: toPendingState,
			fulfilled: toFulfilledState,
			rejected: toRejectedState,
			inspect: inspect
		};
	
		function toPendingState() {
			return { state: 'pending' };
		}
	
		function toRejectedState(e) {
			return { state: 'rejected', reason: e };
		}
	
		function toFulfilledState(x) {
			return { state: 'fulfilled', value: x };
		}
	
		function inspect(handler) {
			var state = handler.state();
			return state === 0 ? toPendingState()
				 : state > 0   ? toFulfilledState(handler.value)
				               : toRejectedState(handler.value);
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		makeApply.tryCatchResolve = tryCatchResolve;
	
		return makeApply;
	
		function makeApply(Promise, call) {
			if(arguments.length < 2) {
				call = tryCatchResolve;
			}
	
			return apply;
	
			function apply(f, thisArg, args) {
				var p = Promise._defer();
				var l = args.length;
				var params = new Array(l);
				callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);
	
				return p;
			}
	
			function callAndResolve(c, h) {
				if(c.i < 0) {
					return call(c.f, c.thisArg, c.params, h);
				}
	
				var handler = Promise._handler(c.args[c.i]);
				handler.fold(callAndResolveNext, c, void 0, h);
			}
	
			function callAndResolveNext(c, x, h) {
				c.params[c.i] = x;
				c.i -= 1;
				callAndResolve(c, h);
			}
		}
	
		function tryCatchResolve(f, thisArg, args, resolver) {
			try {
				resolver.resolve(f.apply(thisArg, args));
			} catch(e) {
				resolver.reject(e);
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));
	
	


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function flow(Promise) {
	
			var resolve = Promise.resolve;
			var reject = Promise.reject;
			var origCatch = Promise.prototype['catch'];
	
			/**
			 * Handle the ultimate fulfillment value or rejection reason, and assume
			 * responsibility for all errors.  If an error propagates out of result
			 * or handleFatalError, it will be rethrown to the host, resulting in a
			 * loud stack track on most platforms and a crash on some.
			 * @param {function?} onResult
			 * @param {function?} onError
			 * @returns {undefined}
			 */
			Promise.prototype.done = function(onResult, onError) {
				this._handler.visit(this._handler.receiver, onResult, onError);
			};
	
			/**
			 * Add Error-type and predicate matching to catch.  Examples:
			 * promise.catch(TypeError, handleTypeError)
			 *   .catch(predicate, handleMatchedErrors)
			 *   .catch(handleRemainingErrors)
			 * @param onRejected
			 * @returns {*}
			 */
			Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
				if (arguments.length < 2) {
					return origCatch.call(this, onRejected);
				}
	
				if(typeof onRejected !== 'function') {
					return this.ensure(rejectInvalidPredicate);
				}
	
				return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
			};
	
			/**
			 * Wraps the provided catch handler, so that it will only be called
			 * if the predicate evaluates truthy
			 * @param {?function} handler
			 * @param {function} predicate
			 * @returns {function} conditional catch handler
			 */
			function createCatchFilter(handler, predicate) {
				return function(e) {
					return evaluatePredicate(e, predicate)
						? handler.call(this, e)
						: reject(e);
				};
			}
	
			/**
			 * Ensures that onFulfilledOrRejected will be called regardless of whether
			 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
			 * receive the promises' value or reason.  Any returned value will be disregarded.
			 * onFulfilledOrRejected may throw or return a rejected promise to signal
			 * an additional error.
			 * @param {function} handler handler to be called regardless of
			 *  fulfillment or rejection
			 * @returns {Promise}
			 */
			Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
				if(typeof handler !== 'function') {
					return this;
				}
	
				return this.then(function(x) {
					return runSideEffect(handler, this, identity, x);
				}, function(e) {
					return runSideEffect(handler, this, reject, e);
				});
			};
	
			function runSideEffect (handler, thisArg, propagate, value) {
				var result = handler.call(thisArg);
				return maybeThenable(result)
					? propagateValue(result, propagate, value)
					: propagate(value);
			}
	
			function propagateValue (result, propagate, x) {
				return resolve(result).then(function () {
					return propagate(x);
				});
			}
	
			/**
			 * Recover from a failure by returning a defaultValue.  If defaultValue
			 * is a promise, it's fulfillment value will be used.  If defaultValue is
			 * a promise that rejects, the returned promise will reject with the
			 * same reason.
			 * @param {*} defaultValue
			 * @returns {Promise} new promise
			 */
			Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
				return this.then(void 0, function() {
					return defaultValue;
				});
			};
	
			/**
			 * Shortcut for .then(function() { return value; })
			 * @param  {*} value
			 * @return {Promise} a promise that:
			 *  - is fulfilled if value is not a promise, or
			 *  - if value is a promise, will fulfill with its value, or reject
			 *    with its reason.
			 */
			Promise.prototype['yield'] = function(value) {
				return this.then(function() {
					return value;
				});
			};
	
			/**
			 * Runs a side effect when this promise fulfills, without changing the
			 * fulfillment value.
			 * @param {function} onFulfilledSideEffect
			 * @returns {Promise}
			 */
			Promise.prototype.tap = function(onFulfilledSideEffect) {
				return this.then(onFulfilledSideEffect)['yield'](this);
			};
	
			return Promise;
		};
	
		function rejectInvalidPredicate() {
			throw new TypeError('catch predicate must be a function');
		}
	
		function evaluatePredicate(e, predicate) {
			return isError(predicate) ? e instanceof predicate : predicate(e);
		}
	
		function isError(predicate) {
			return predicate === Error
				|| (predicate != null && predicate.prototype instanceof Error);
		}
	
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}
	
		function identity(x) {
			return x;
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	/** @author Jeff Escalante */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function fold(Promise) {
	
			Promise.prototype.fold = function(f, z) {
				var promise = this._beget();
	
				this._handler.fold(function(z, x, to) {
					Promise._handler(z).fold(function(x, z, to) {
						to.resolve(f.call(this, z, x));
					}, x, this, to);
				}, z, promise._handler.receiver, promise._handler);
	
				return promise;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var inspect = __webpack_require__(11).inspect;
	
		return function inspection(Promise) {
	
			Promise.prototype.inspect = function() {
				return inspect(Promise._handler(this));
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function generate(Promise) {
	
			var resolve = Promise.resolve;
	
			Promise.iterate = iterate;
			Promise.unfold = unfold;
	
			return Promise;
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.iterate
			 * Generate a (potentially infinite) stream of promised values:
			 * x, f(x), f(f(x)), etc. until condition(x) returns true
			 * @param {function} f function to generate a new x from the previous x
			 * @param {function} condition function that, given the current x, returns
			 *  truthy when the iterate should stop
			 * @param {function} handler function to handle the value produced by f
			 * @param {*|Promise} x starting value, may be a promise
			 * @return {Promise} the result of the last call to f before
			 *  condition returns true
			 */
			function iterate(f, condition, handler, x) {
				return unfold(function(x) {
					return [x, f(x)];
				}, condition, handler, x);
			}
	
			/**
			 * @deprecated Use github.com/cujojs/most streams and most.unfold
			 * Generate a (potentially infinite) stream of promised values
			 * by applying handler(generator(seed)) iteratively until
			 * condition(seed) returns true.
			 * @param {function} unspool function that generates a [value, newSeed]
			 *  given a seed.
			 * @param {function} condition function that, given the current seed, returns
			 *  truthy when the unfold should stop
			 * @param {function} handler function to handle the value produced by unspool
			 * @param x {*|Promise} starting value, may be a promise
			 * @return {Promise} the result of the last value produced by unspool before
			 *  condition returns true
			 */
			function unfold(unspool, condition, handler, x) {
				return resolve(x).then(function(seed) {
					return resolve(condition(seed)).then(function(done) {
						return done ? seed : resolve(unspool(seed)).spread(next);
					});
				});
	
				function next(item, newSeed) {
					return resolve(handler(item)).then(function() {
						return unfold(unspool, condition, handler, newSeed);
					});
				}
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function progress(Promise) {
	
			/**
			 * @deprecated
			 * Register a progress handler for this promise
			 * @param {function} onProgress
			 * @returns {Promise}
			 */
			Promise.prototype.progress = function(onProgress) {
				return this.then(void 0, void 0, onProgress);
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function addWith(Promise) {
			/**
			 * Returns a promise whose handlers will be called with `this` set to
			 * the supplied receiver.  Subsequent promises derived from the
			 * returned promise will also have their handlers called with receiver
			 * as `this`. Calling `with` with undefined or no arguments will return
			 * a promise whose handlers will again be called in the usual Promises/A+
			 * way (no `this`) thus safely undoing any previous `with` in the
			 * promise chain.
			 *
			 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
			 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
			 *
			 * @param {object} receiver `this` value for all handlers attached to
			 *  the returned promise.
			 * @returns {Promise}
			 */
			Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
				var p = this._beget();
				var child = p._handler;
				child.receiver = receiver;
				this._handler.chain(child, receiver);
				return p;
			};
	
			return Promise;
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));
	


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var setTimer = __webpack_require__(5).setTimer;
		var format = __webpack_require__(20);
	
		return function unhandledRejection(Promise) {
	
			var logError = noop;
			var logInfo = noop;
			var localConsole;
	
			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };
	
				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}
	
			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};
	
			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};
	
			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};
	
			var tasks = [];
			var reported = [];
			var running = null;
	
			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}
	
			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}
	
			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}
	
			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}
	
			return Promise;
		};
	
		function throwit(e) {
			throw e;
		}
	
		function noop() {}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};
	
		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}
	
		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}
	
		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var makePromise = __webpack_require__(22);
		var Scheduler = __webpack_require__(23);
		var async = __webpack_require__(5).asap;
	
		return makePromise({
			scheduler: new Scheduler(async)
		});
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function makePromise(environment) {
	
			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();
	
			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};
	
			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}
	
			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();
	
				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}
	
				return handler;
	
				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}
	
				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}
	
			// Creation
	
			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;
	
			Promise._defer = defer;
			Promise._handler = getHandler;
	
			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}
	
			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}
	
			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}
	
			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}
	
			// Transformation and flow control
	
			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();
	
				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}
	
				var p = this._beget();
				var child = p._handler;
	
				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);
	
				return p;
			};
	
			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};
	
			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};
	
			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}
	
			// Array combinators
	
			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;
	
			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}
	
			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}
	
			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;
	
				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);
	
				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];
	
					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					traverseAt(promises, handler, i, x, resolver);
				}
	
				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}
	
				return new Promise(Handler, resolver);
	
				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}
	
				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}
	
			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();
	
					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}
	
			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}
	
			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}
	
				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}
	
			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}
	
				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}
	
			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}
	
					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}
	
			// Promise internals
			// Below this, everything is @private
	
			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}
	
			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}
	
			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}
	
			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}
	
			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;
	
			Handler.prototype._state = 0;
	
			Handler.prototype.state = function() {
				return this._state;
			};
	
			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};
	
			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};
	
			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};
	
			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};
	
			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}
	
			inherit(Handler, FailIfRejected);
	
			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};
	
			var failIfRejected = new FailIfRejected();
	
			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);
	
				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}
	
			inherit(Handler, Pending);
	
			Pending.prototype._state = 0;
	
			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};
	
			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}
	
				this.become(new Rejected(x));
			};
	
			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}
	
				var h = this;
	
				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}
	
				return h;
			};
	
			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;
	
				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};
	
			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}
	
				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}
	
				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};
	
			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};
	
			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};
	
			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};
	
			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};
	
			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};
	
			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}
	
			inherit(Handler, Async);
	
			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};
	
			Async.prototype._report = function(context) {
				this.join()._report(context);
			};
	
			Async.prototype._unreport = function() {
				this.join()._unreport();
			};
	
			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}
	
			inherit(Pending, Thenable);
	
			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}
	
			inherit(Handler, Fulfilled);
	
			Fulfilled.prototype._state = 1;
	
			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};
	
			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};
	
			var errorId = 0;
	
			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);
	
				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;
	
				this._report();
			}
	
			inherit(Handler, Rejected);
	
			Rejected.prototype._state = -1;
	
			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};
	
			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};
	
			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};
	
			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};
	
			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};
	
			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}
	
			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};
	
			function UnreportTask(rejection) {
				this.rejection = rejection;
			}
	
			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};
	
			// Unhandled rejection hooks
			// By default, everything is a noop
	
			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;
	
			// Errors and singletons
	
			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);
	
			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}
	
			// Task runners
	
			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}
	
			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};
	
			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}
	
			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}
	
				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};
	
			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}
	
			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);
	
				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};
	
			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}
	
			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}
	
			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};
	
			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};
	
			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};
	
			// Other helpers
	
			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}
	
			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}
	
			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}
	
			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}
	
				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}
	
			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}
	
			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}
	
			function snd(x, y) {
				return y;
			}
	
			function noop() {}
	
			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}
	
						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});
	
							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}
	
				return noop;
			}
	
			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.
	
		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;
	
			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;
	
			var self = this;
			this.drain = function() {
				self._drain();
			};
		}
	
		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};
	
		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};
	
		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};
	
		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}
	
			this._queueLen = 0;
			this._running = false;
	
			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}
	
			this._afterQueueLen = 0;
		};
	
		return Scheduler;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(8)));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			var hasOwn;
	
			hasOwn = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
	
			return {
				hasOwn: hasOwn,
				isObject: isObject,
				inherit: inherit,
				mixin: mixin,
				extend: extend
			};
	
			function isObject(it) {
				// In IE7 tos.call(null) is '[object Object]'
				// so we need to check to see if 'it' is
				// even set
				return it && Object.prototype.toString.call(it) == '[object Object]';
			}
	
			function inherit(parent) {
				return parent ? Object.create(parent) : {};
			}
	
			/**
	   * Brute force copy own properties from -> to. Effectively an
	   * ES6 Object.assign polyfill, usable with Array.prototype.reduce.
	   * @param {object} to
	   * @param {object} from
	   * @returns {object} to
	   */
			function mixin(to, from) {
				if (!from) {
					return to;
				}
	
				return Object.keys(from).reduce(function (to, key) {
					to[key] = from[key];
					return to;
				}, to);
			}
	
			/**
	   * Beget a new object from base and then mixin own properties from
	   * extensions.  Equivalent to mixin(inherit(base), extensions)
	   * @param {object} base
	   * @param {object} extensions
	   * @returns {object}
	   */
			function extend(base, extensions) {
				return mixin(inherit(base), extensions);
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when = __webpack_require__(3);
	
			// Sniff for the platform's loader
			return ( false ? 'undefined' : _typeof(exports)) == 'object' ? function (require) {
				return function (moduleId) {
					try {
						return when.resolve(require(moduleId));
					} catch (e) {
						return when.reject(e);
					}
				};
			} : function (require) {
				return function (moduleId) {
					var deferred = when.defer();
					require([moduleId], deferred.resolve, deferred.reject);
					return deferred.promise;
				};
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var mid = __webpack_require__(27);
	
			return function relativeLoader(loader, referenceId) {
				referenceId = mid.base(referenceId);
				return function (moduleId) {
					return loader(mid.resolve(referenceId, moduleId));
				};
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			return {
				base: base,
				resolve: resolve
			};
	
			/**
	   * Given a moduleId, returns the "basename".  For example:
	   * base('foo/bar/baz') -> 'foo/bar'
	   * base('foo') -> 'foo'
	   * @param id
	   * @returns {*}
	   */
			function base(id) {
				if (!id) {
					return '';
				}
	
				var split = id.lastIndexOf('/');
				return split >= 0 ? id.slice(0, split) : id;
			}
	
			/**
	   * Resolve id against base (which is also an id), such that the
	   * returned resolved id contains no leading '.' or '..'
	   * components.  Id may be relative or absolute, and may also
	   * be an AMD plugin plus resource id, in which case both the
	   * plugin id and the resource id may be relative or absolute.
	   * @param {string} base module id against which id will be resolved
	   * @param {string} id module id to resolve, may be an
	   *  AMD plugin+resource id.
	   * @returns {string} resolved id with no leading '.' or '..'
	   *  components.  If the input id was an AMD plugin+resource id,
	   *  both the plugin id and the resource id will be resolved in
	   *  the returned id (thus neither will have leading '.' or '..'
	   *  components)
	   */
			function resolve(base, id) {
				if (typeof id != 'string') {
					return base;
				}
	
				return id.split('!').map(function (part) {
					return resolveId(base, part.trim());
				}).join('!');
			}
	
			function resolveId(base, id) {
				var up, prefix;
	
				if (id === '' || id === '.' || id === './') {
					return base;
				}
	
				if (id[0] != '.') {
					return id;
				}
	
				prefix = base;
	
				if (id == '..' || id == '../') {
					up = 1;
					id = '';
				} else {
					up = 0;
					id = id.replace(/^(\.\.?\/)+/, function (s) {
						s.replace(/\.\./g, function (s) {
							up++;
							return s;
						});
						return '';
					});
	
					if (id == '..') {
						up++;
						id = '';
					} else if (id == '.') {
						id = '';
					}
				}
	
				if (up > 0) {
					prefix = prefix.split('/');
					up = Math.max(0, prefix.length - up);
					prefix = prefix.slice(0, up).join('/');
				}
	
				if (id.length && id[0] !== '/' && prefix[prefix.length - 1] !== '/') {
					prefix += '/';
				}
	
				if (prefix[0] == '/') {
					prefix = prefix.slice(1);
				}
	
				return prefix + id;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	var _when = __webpack_require__(3);
	
	var _when2 = _interopRequireDefault(_when);
	
	var _advice = __webpack_require__(29);
	
	var _advice2 = _interopRequireDefault(_advice);
	
	var _object = __webpack_require__(24);
	
	var _object2 = _interopRequireDefault(_object);
	
	var _WireContext = __webpack_require__(30);
	
	var _WireContext2 = _interopRequireDefault(_WireContext);
	
	var _scope = __webpack_require__(31);
	
	var _scope2 = _interopRequireDefault(_scope);
	
	var _registry = __webpack_require__(41);
	
	var _registry2 = _interopRequireDefault(_registry);
	
	var _defaultPlugins = __webpack_require__(49);
	
	var _defaultPlugins2 = _interopRequireDefault(_defaultPlugins);
	
	var _DirectedGraph = __webpack_require__(45);
	
	var _DirectedGraph2 = _interopRequireDefault(_DirectedGraph);
	
	var _trackInflightRefs = __webpack_require__(56);
	
	var _trackInflightRefs2 = _interopRequireDefault(_trackInflightRefs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var undef = undefined;
	
	var slice = Array.prototype.slice;
	
	var scopeProto = _scope2.default.prototype;
	
	function Container() {
		_scope2.default.apply(this, arguments);
	}
	
	/**
	 * Container inherits from Scope, adding plugin support and
	 * context level events.
	 */
	Container.prototype = _object2.default.extend(scopeProto, {
		_inheritInstances: function _inheritInstances(parent) {
			var publicApi = {
				wire: this._createChildContext.bind(this),
				destroy: this.destroy.bind(this),
				resolve: this._resolveRef.bind(this)
			};
	
			return _WireContext2.default.inherit(parent.instances, publicApi);
		},
	
		_init: _advice2.default.after(scopeProto._init, function () {
			this.plugins = new _registry2.default();
			return this._installDefaultPlugins();
		}),
	
		_startup: _advice2.default.after(scopeProto._startup, function (started) {
			var self = this;
			return _when2.default.resolve(started).otherwise(function (e) {
				return self._contextEvent('error', e).yield(started);
			});
		}),
	
		_installDefaultPlugins: function _installDefaultPlugins() {
			return this._installPlugins(_defaultPlugins2.default);
		},
	
		_installPlugins: function _installPlugins(plugins) {
			if (!plugins) {
				return _when2.default.resolve();
			}
	
			var self, registry, installed;
	
			self = this;
			registry = this.plugins;
	
			if (Array.isArray(plugins)) {
				installed = plugins.map(function (plugin) {
					return installPlugin(plugin);
				});
			} else {
				installed = Object.keys(plugins).map(function (namespace) {
					return installPlugin(plugins[namespace], namespace);
				});
			}
	
			return _when2.default.all(installed);
	
			function installPlugin(pluginSpec, namespace) {
				var module, t;
	
				t = typeof pluginSpec === 'undefined' ? 'undefined' : _typeof(pluginSpec);
				if (t == 'string') {
					module = pluginSpec;
					pluginSpec = {};
				} else if (typeof pluginSpec.module == 'string') {
					module = pluginSpec.module;
				} else {
					module = pluginSpec;
				}
	
				return self.getModule(module).then(function (plugin) {
					return registry.scanModule(plugin, pluginSpec, namespace);
				});
			}
		},
	
		_createResolver: _advice2.default.after(scopeProto._createResolver, function (resolver) {
			return (0, _trackInflightRefs2.default)(new _DirectedGraph2.default(), resolver, this.refCycleTimeout);
		}),
	
		_contextEvent: function _contextEvent(type, data) {
			var api, listeners;
	
			if (!this.contextEventApi) {
				this.contextEventApi = this._pluginApi.contextualize(this.path);
			}
	
			api = this.contextEventApi;
			listeners = this.plugins.contextListeners;
	
			return _when2.default.reduce(listeners, function (undef, listener) {
				var d;
	
				if (listener[type]) {
					d = _when2.default.defer();
					listener[type](d.resolver, api, data);
					return d.promise;
				}
	
				return undef;
			}, undef);
		},
	
		_createComponents: _advice2.default.beforeAsync(scopeProto._createComponents, function (parsed) {
			var self = this;
			return this._installPlugins(parsed.plugins).then(function () {
				return self._contextEvent('initialize');
			});
		}),
	
		_awaitInstances: _advice2.default.afterAsync(scopeProto._awaitInstances, function () {
			return this._contextEvent('ready');
		}),
	
		_destroyComponents: _advice2.default.beforeAsync(scopeProto._destroyComponents, function () {
			return this._contextEvent('shutdown');
		}),
	
		_releaseResources: _advice2.default.beforeAsync(scopeProto._releaseResources, function () {
			return this._contextEvent('destroy');
		})
	});
	
	module.exports = Container;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _when = __webpack_require__(3);
	
	var _when2 = _interopRequireDefault(_when);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Execute advice before f, passing same arguments to both, and
	 * discarding advice's return value.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute before f
	 * @returns {function} advised function
	 */
	var before = function before(f, advice) {
		return function () {
			advice.apply(this, arguments);
			return f.apply(this, arguments);
		};
	};
	
	/**
	 * Execute advice after f, passing f's return value to advice
	 * @param {function} f function to advise
	 * @param {function} advice function to execute after f
	 * @returns {function} advised function
	 */
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	var after = function after(f, advice) {
		return function () {
			return advice.call(this, f.apply(this, arguments));
		};
	};
	
	/**
	 * Execute f after a promise returned by advice fulfills. The same args
	 * will be passed to both advice and f.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute before f
	 * @returns {function} advised function which always returns a promise
	 */
	var beforeAsync = function beforeAsync(f, advice) {
		return function () {
			var _this = this;
	
			var args = arguments;
	
			return (0, _when2.default)(args, function () {
				return advice.apply(_this, args);
			}).then(function () {
				return f.apply(_this, args);
			});
		};
	};
	
	/**
	 * Execute advice after a promise returned by f fulfills. The same args
	 * will be passed to both advice and f.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute after f
	 * @returns {function} advised function which always returns a promise
	 */
	var afterAsync = function afterAsync(f, advice) {
		return function () {
			var _this2 = this;
	
			return (0, _when2.default)(arguments, function (args) {
				return f.apply(_this2, args);
			}).then(function (result) {
				return advice.call(_this2, result);
			});
		};
	};
	
	// Very simple advice functions for internal wire use only.
	// This is NOT a replacement for meld.  These advices stack
	// differently and will not be as efficient.
	exports.default = {
		before: before,
		after: after,
		beforeAsync: beforeAsync,
		afterAsync: afterAsync
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var object, undef;
	
			object = __webpack_require__(24);
	
			function WireContext() {}
	
			WireContext.inherit = function (parent, api) {
				var contextApi, context;
	
				contextApi = object.inherit(parent);
				object.mixin(contextApi, api);
	
				WireContext.prototype = contextApi;
	
				context = new WireContext();
				WireContext.prototype = undef;
	
				return context;
			};
	
			return WireContext;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author brian@hovercraftstudios.com
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, defer, sequence, array, object, loader, Map, ComponentFactory, Lifecycle, Resolver, WireProxy, PluginRegistry, undef, specUtils, DirectedGraph, cyclesTracker;
	
			when = __webpack_require__(3);
			sequence = __webpack_require__(32);
			array = __webpack_require__(33);
			object = __webpack_require__(24);
			Map = __webpack_require__(34);
			loader = __webpack_require__(25);
			ComponentFactory = __webpack_require__(35);
			Lifecycle = __webpack_require__(39);
			Resolver = __webpack_require__(40);
			WireProxy = __webpack_require__(36);
			PluginRegistry = __webpack_require__(41);
			specUtils = __webpack_require__(44);
			DirectedGraph = __webpack_require__(45);
			cyclesTracker = __webpack_require__(46);
	
			defer = when.defer;
	
			function Scope(parent, options) {
				this.parent = parent || {};
				object.mixin(this, options);
			}
	
			Scope.prototype = {
	
				init: function init(spec) {
	
					this._inherit(this.parent);
					this._init();
					this._configure();
	
					return this._startup(spec).yield(this);
				},
	
				_inherit: function _inherit(parent) {
	
					this._instanceToProxy = new Map();
	
					this.instances = this._inheritInstances(parent);
					this.components = object.inherit(parent.components);
	
					this.path = this._createPath(this.name, parent.path);
	
					this.plugins = parent.plugins;
	
					this.initializers = array.delegate(this.initializers);
					this.destroyers = array.delegate(this.destroyers);
					this.postDestroy = array.delegate(this.postDestroy);
	
					if (!this.moduleLoader) {
						this.moduleLoader = parent.moduleLoader;
					}
				},
	
				_inheritInstances: function _inheritInstances(parent) {
					return object.inherit(parent.instances);
				},
	
				_addDependent: function _addDependent(dependant, tasks) {
					return dependant.then(function (dependant) {
						tasks.push(function () {
							return dependant.destroy();
						});
						return dependant;
					});
				},
	
				_createNestedScope: function _createNestedScope(spec) {
					var options = { createContext: this.createContext };
					return this._addDependent(new Scope(this, options).init(spec), this.postDestroy);
				},
	
				_createChildContext: function _createChildContext(spec, options) {
					// Create child and arrange for it to be destroyed just before
					// this scope is destroyed
					return this._addDependent(this.createContext(spec, this, options), this.destroyers);
				},
	
				_init: function _init() {
					this._pluginApi = this._initPluginApi();
				},
	
				_initPluginApi: function _initPluginApi() {
					// Plugin API
					// wire() API that is passed to plugins.
					var self, pluginApi;
	
					self = this;
					pluginApi = {};
	
					pluginApi.contextualize = function (name) {
						function contextualApi(spec, id) {
							return self._resolveInstance(self._createComponentDef(id, spec));
						}
	
						contextualApi.createChild = self._createChildContext.bind(self);
						contextualApi.loadModule = self.getModule.bind(self);
						contextualApi.resolver = self.resolver;
						contextualApi.addComponent = addComponent;
						contextualApi.addInstance = addInstance;
	
						contextualApi.resolveRef = function (ref) {
							var onBehalfOf = arguments.length > 1 ? arguments[2] : name;
							return self._resolveRef(ref, onBehalfOf);
						};
	
						contextualApi.getProxy = function (nameOrComponent) {
							var onBehalfOf = arguments.length > 1 ? arguments[2] : name;
							return self.getProxy(nameOrComponent, onBehalfOf);
						};
	
						return contextualApi;
					};
	
					return pluginApi;
	
					function addComponent(component, id) {
						var def, instance;
	
						def = self._createComponentDef(id);
						instance = self.componentFactory.processComponent(def, component);
	
						return self._makeResolvable(def, instance);
					}
	
					function addInstance(instance, id) {
						self._makeResolvable(self._createComponentDef(id), instance);
						return when.resolve(instance);
					}
				},
	
				_configure: function _configure() {
					var plugins, pluginApi;
	
					plugins = this.plugins;
					pluginApi = this._pluginApi;
	
					this.resolver = this._createResolver(plugins, pluginApi);
					this.componentFactory = this._createComponentFactory(plugins, pluginApi);
	
					this._destroy = function () {
						this._destroy = noop;
	
						return this._executeDestroyers().then(this._destroyComponents.bind(this)).then(this._releaseResources.bind(this)).then(this._executePostDestroy.bind(this));
					};
				},
	
				_startup: function _startup(spec) {
					var self = this;
	
					return this._executeInitializers().then(function () {
						return self._parseSpec(spec).then(function (parsed) {
							return self._createComponents(parsed).then(function () {
								return self._awaitInstances(parsed);
							});
						});
					});
				},
	
				destroy: function destroy() {
					return this._destroy();
				},
	
				_destroy: noop,
	
				_destroyComponents: function _destroyComponents() {
					var instances = this.instances;
	
					return this.componentFactory.destroy().then(function () {
						for (var p in instances) {
							delete instances[p];
						}
					});
				},
	
				_releaseResources: function _releaseResources() {
					// Free Objects
					this.instances = this.components = this.parent = this.resolver = this.componentFactory = this._instanceToProxy = this._pluginApi = this.plugins = undef;
				},
	
				getModule: function getModule(moduleId) {
					return typeof moduleId == 'string' ? this.moduleLoader(moduleId) : when.resolve(moduleId);
				},
	
				getProxy: function getProxy(nameOrInstance, onBehalfOf) {
					var self = this;
	
					if (typeof nameOrInstance === 'string') {
						return this._resolveRefName(nameOrInstance, {}, onBehalfOf).then(function (instance) {
							return self._getProxyForInstance(instance);
						});
					} else {
						return self._getProxyForInstance(nameOrInstance);
					}
				},
	
				_getProxyForInstance: function _getProxyForInstance(instance) {
					var componentFactory = this.componentFactory;
	
					return getProxyRecursive(this, instance).otherwise(function () {
						// Last ditch, create a new proxy
						return componentFactory.createProxy(instance);
					});
				},
	
				_createResolver: function _createResolver(plugins, pluginApi) {
					return new Resolver(plugins.resolvers, pluginApi);
				},
	
				_createComponentFactory: function _createComponentFactory(plugins, pluginApi) {
					var self, factory, init, lifecycle;
	
					self = this;
	
					lifecycle = new Lifecycle(plugins, pluginApi);
					factory = new ComponentFactory(lifecycle, plugins, pluginApi);
	
					init = factory.initInstance;
					factory.initInstance = function () {
						return when(init.apply(factory, arguments), function (proxy) {
							return self._makeResolvable(proxy.metadata, proxy);
						});
					};
	
					return factory;
				},
	
				_executeInitializers: function _executeInitializers() {
					return sequence(this.initializers, this);
				},
	
				_executeDestroyers: function _executeDestroyers() {
					return sequence(this.destroyers, this);
				},
	
				_executePostDestroy: function _executePostDestroy() {
					return sequence(this.postDestroy, this);
				},
	
				_parseSpec: function _parseSpec(spec) {
					var self = this;
	
					// instantiate the imports graph
					var importsGraph = new DirectedGraph();
	
					return processImports(self, spec, importsGraph).then(function (specImports) {
						// modules of importing spec overrides modules of imported spec.
						return processSpec(self, object.mixin(specImports, spec));
					});
				},
	
				_createComponentDef: function _createComponentDef(id, spec, initialized, ready) {
					return {
						id: id,
						spec: spec,
						path: this._createPath(id, this.path),
						initialized: initialized,
						ready: ready
					};
				},
	
				_createComponents: function _createComponents(parsed) {
					// Process/create each item in scope and resolve its
					// promise when completed.
					var self, components;
	
					self = this;
					components = parsed.components;
					return when.map(Object.keys(components), function (name) {
						return self._createScopeItem(components[name]);
					});
				},
	
				_awaitInstances: function _awaitInstances(parsed) {
					var ready = parsed.ready;
					return when.map(Object.keys(ready), function (id) {
						return ready[id];
					});
				},
	
				_createScopeItem: function _createScopeItem(component) {
					// NOTE: Order is important here.
					// The object & local property assignment MUST happen before
					// the chain resolves so that the concrete item is in place.
					// Otherwise, the whole scope can be marked as resolved before
					// the final item has been resolved.
					var self, item;
	
					self = this;
					item = this._resolveItem(component).then(function (resolved) {
						self._makeResolvable(component, resolved);
						return WireProxy.getTarget(resolved);
					});
	
					component.ready.resolve(item);
					return item;
				},
	
				_makeResolvable: function _makeResolvable(component, instance) {
					var id, inst;
	
					id = component.id;
					if (id != null) {
						inst = WireProxy.getTarget(instance);
						this.instances[id] = inst;
						if (component.proxy) {
							this._instanceToProxy.set(inst, component.proxy);
						}
						if (component.initialized) {
							component.initialized.resolve(inst);
						}
					}
	
					return instance;
				},
	
				_resolveInstance: function _resolveInstance(component) {
					return this._resolveItem(component).then(WireProxy.getTarget);
				},
	
				_resolveItem: function _resolveItem(component) {
					var item, spec;
	
					spec = component.spec;
	
					if (this.resolver.isRef(spec)) {
						// Reference
						item = this._resolveRef(spec, component.id);
					} else {
						// Component
						item = this._createItem(component);
					}
	
					return item;
				},
	
				_createItem: function _createItem(component) {
					var created, spec;
	
					spec = component.spec;
	
					if (Array.isArray(spec)) {
						// Array
						created = this._createArray(component);
					} else if (object.isObject(spec)) {
						// component spec, create the component
						created = this._createComponent(component);
					} else {
						// Plain value
						created = when.resolve(spec);
					}
	
					return created;
				},
	
				_createArray: function _createArray(component) {
					var self, id, i;
	
					self = this;
					id = component.id;
					i = 0;
	
					// Minor optimization, if it's an empty array spec, just return an empty array.
					return when.map(component.spec, function (item) {
						var componentDef = self._createComponentDef(id + '[' + i++ + ']', item);
						return self._resolveInstance(componentDef);
					});
				},
	
				_createComponent: function _createComponent(component) {
					var self = this;
	
					return this.componentFactory.create(component).otherwise(function (reason) {
						if (reason !== component) {
							throw reason;
						}
	
						// No factory found, treat object spec as a nested scope
						return self._createNestedScope(component.spec).then(function (childScope) {
							// TODO: find a lighter weight solution
							// We're paying the cost of creating a complete scope,
							// then discarding everything except the instance map.
							return object.mixin({}, childScope.instances);
						});
					});
				},
	
				_resolveRef: function _resolveRef(ref, onBehalfOf) {
					var scope;
	
					ref = this.resolver.parse(ref);
					scope = onBehalfOf == ref.name && this.parent.instances ? this.parent : this;
	
					return this._doResolveRef(ref, scope.instances, onBehalfOf);
				},
	
				_resolveRefName: function _resolveRefName(refName, options, onBehalfOf) {
					var ref = this.resolver.create(refName, options);
	
					return this._doResolveRef(ref, this.instances, onBehalfOf);
				},
	
				_doResolveRef: function _doResolveRef(ref, scope, onBehalfOf) {
					return ref.resolve(function (name) {
						return resolveDeepName(name, scope);
					}, onBehalfOf);
				},
	
				_createPath: function _createPath(name, basePath) {
					var path = basePath || this.path;
					return path && name ? path + '.' + name : name;
				}
			};
	
			return Scope;
	
			function resolveDeepName(name, scope) {
				var parts = name.split('.');
	
				return when.reduce(parts, function (scope, segment) {
					return segment in scope ? scope[segment] : when.reject(new Error('Cannot resolve ref: ' + name));
				}, scope);
			}
	
			function getProxyRecursive(scope, instance) {
				var proxy;
	
				if (scope._instanceToProxy) {
					proxy = scope._instanceToProxy.get(instance);
				}
	
				if (!proxy) {
					if (scope.parent) {
						return getProxyRecursive(scope.parent, instance);
					} else {
						return when.reject(new Error('No proxy found'));
					}
				}
	
				return when.resolve(proxy);
			}
	
			function noop() {}
	
			function processImports(scope, spec, importsGraph, importingModuleId) {
				if (!spec || !spec.$imports) {
					return when({});
				}
	
				if (typeof spec.$imports === 'string') {
					spec.$imports = [spec.$imports];
				}
	
				importingModuleId = importingModuleId || (typeof spec === 'string' ? spec : undefined);
	
				return when.reduce(spec.$imports, function (currentSpecImports, importedModuleId) {
					// make sure that there is no cycles
					cyclesTracker.ensureNoCycles(importsGraph, importedModuleId, importingModuleId);
	
					// go ahead with the import
					return when(scope.getModule(importedModuleId), function (importedSpec) {
						return processImports(scope, importedSpec, importsGraph, importedModuleId).then(function (importedSpecImports) {
							// modules of importing spec overrides modules of imported specs.
							var importedSpecAndItsImports = object.mixin(importedSpecImports, importedSpec);
	
							// modules in the right overrides modules in the left
							currentSpecImports = object.mixin(currentSpecImports, importedSpecAndItsImports);
	
							return currentSpecImports;
						});
					});
				}, {});
			}
	
			function processSpec(scope, spec) {
				var instances, components, ready, plugins, id, initialized;
	
				instances = scope.instances;
				components = scope.components;
				ready = {};
	
				// Setup a promise for each item in this scope
				for (id in spec) {
					if (id === '$plugins' || id === 'plugins') {
						plugins = spec[id];
					} else if (!object.hasOwn(instances, id)) {
						// An initializer may have inserted concrete components
						// into the context.  If so, they override components of the
						// same name from the input spec
						initialized = defer();
						ready = defer();
						components[id] = scope._createComponentDef(id, spec[id], initialized, ready);
						instances[id] = initialized.promise;
						ready[id] = ready.promise;
					}
				}
	
				return when.resolve({
					plugins: plugins,
					components: components,
					instances: instances,
					ready: ready
				});
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2011-2013 original author or authors */
	
	/**
	 * sequence.js
	 *
	 * Run a set of task functions in sequence.  All tasks will
	 * receive the same args.
	 *
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	
	(function(define) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var when = __webpack_require__(3);
		var all = when.Promise.all;
		var slice = Array.prototype.slice;
	
		/**
		 * Run array of tasks in sequence with no overlap
		 * @param tasks {Array|Promise} array or promiseForArray of task functions
		 * @param [args] {*} arguments to be passed to all tasks
		 * @return {Promise} promise for an array containing
		 * the result of each task in the array position corresponding
		 * to position of the task in the tasks array
		 */
		return function sequence(tasks /*, args... */) {
			var results = [];
	
			return all(slice.call(arguments, 1)).then(function(args) {
				return when.reduce(tasks, function(results, task) {
					return when(task.apply(void 0, args), addResult);
				}, results);
			});
	
			function addResult(result) {
				results.push(result);
				return results;
			}
		};
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));
	
	


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			var slice = [].slice;
	
			return {
				delegate: delegateArray,
				fromArguments: fromArguments,
				union: union
			};
	
			/**
	   * Creates a new {Array} with the same contents as array
	   * @param array {Array}
	   * @return {Array} a new {Array} with the same contents as array. If array is falsey,
	   *  returns a new empty {Array}
	   */
			function delegateArray(array) {
				return array ? [].concat(array) : [];
			}
	
			function fromArguments(args, index) {
				return slice.call(args, index || 0);
			}
	
			/**
	   * Returns a new set that is the union of the two supplied sets
	   * @param {Array} a1 set
	   * @param {Array} a2 set
	   * @returns {Array} union of a1 and a2
	   */
			function union(a1, a2) {
				// If either is empty, return the other
				if (!a1.length) {
					return a2.slice();
				} else if (!a2.length) {
					return a1.slice();
				}
	
				return a2.reduce(function (union, a2item) {
					if (union.indexOf(a2item) === -1) {
						union.push(a2item);
					}
					return union;
				}, a1.slice());
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			function Map() {
				this.clear();
			}
	
			Map.prototype = {
				get: function get(key) {
					var value, found;
					found = this._data.some(function (entry) {
						if (entry.key === key) {
							value = entry.value;
							return true;
						}
					});
	
					return found ? value : arguments[1];
				},
	
				set: function set(key, value) {
					var replaced = this._data.some(function (entry) {
						if (entry.key === key) {
							entry.value = value;
							return true;
						}
					});
	
					if (!replaced) {
						this._data.push({ key: key, value: value });
					}
				},
	
				has: function has(key) {
					return this._data.some(function (entry) {
						return entry.key === key;
					});
				},
	
				'delete': function _delete(key) {
					var value, found;
					found = this._data.some(function (entry, i, array) {
						if (entry.key === key) {
							value = entry.value;
							array.splice(i, 1);
							return true;
						}
					});
				},
	
				clear: function clear() {
					this._data = [];
				}
			};
	
			return Map;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, object, WireProxy, ObjectProxy, undef;
	
			when = __webpack_require__(3);
			object = __webpack_require__(24);
			WireProxy = __webpack_require__(36);
			ObjectProxy = __webpack_require__(37);
	
			function ComponentFactory(lifecycle, plugins, pluginApi) {
				this.plugins = plugins;
				this.pluginApi = pluginApi;
				this.lifecycle = lifecycle;
				this.proxies = [];
			}
	
			ComponentFactory.prototype = {
	
				create: function create(component) {
					var found;
	
					// Look for a factory, then use it to create the object
					found = this.getFactory(component.spec);
					return found ? this._create(component, found.factory, found.options) : when.reject(component);
				},
	
				_create: function _create(component, factory, options) {
					var instance, self;
	
					instance = when.defer();
					self = this;
	
					factory(instance.resolver, options, this.pluginApi.contextualize(component.id));
	
					return instance.promise.then(function (instance) {
						return self.processComponent(component, instance);
					});
				},
	
				processComponent: function processComponent(component, instance) {
					var self, proxy;
	
					self = this;
					proxy = this.createProxy(instance, component);
	
					return self.initInstance(proxy).then(function (proxy) {
						return self.startupInstance(proxy);
					});
				},
	
				initInstance: function initInstance(proxy) {
					return this.lifecycle.init(proxy);
				},
	
				startupInstance: function startupInstance(proxy) {
					return this.lifecycle.startup(proxy);
				},
	
				createProxy: function createProxy(instance, component) {
					var proxy;
	
					if (WireProxy.isProxy(instance)) {
						proxy = instance;
						instance = WireProxy.getTarget(proxy);
					} else {
						proxy = new ObjectProxy(instance);
					}
	
					proxy = this.initProxy(proxy);
	
					if (component) {
						component.proxy = proxy;
						proxy.id = component.id;
						proxy.metadata = component;
					}
	
					this._registerProxy(proxy);
	
					return proxy;
				},
	
				initProxy: function initProxy(proxy) {
	
					var proxiers = this.plugins.proxiers;
	
					// Allow proxy plugins to process/modify the proxy
					proxy = proxiers.reduce(function (proxy, proxier) {
						var overridden = proxier(proxy);
						return WireProxy.isProxy(overridden) ? overridden : proxy;
					}, proxy);
	
					return proxy;
				},
	
				destroy: function destroy() {
					var proxies, lifecycle;
	
					proxies = this.proxies;
					lifecycle = this.lifecycle;
	
					return shutdownComponents().then(destroyComponents);
	
					function shutdownComponents() {
						return when.reduce(proxies, function (_, proxy) {
							return lifecycle.shutdown(proxy);
						}, undef);
					}
	
					function destroyComponents() {
						return when.reduce(proxies, function (_, proxy) {
							return proxy.destroy();
						}, undef);
					}
				},
	
				_registerProxy: function _registerProxy(proxy) {
					if (proxy.metadata) {
						proxy.path = proxy.metadata.path;
						this.proxies.push(proxy);
					}
				},
	
				getFactory: function getFactory(spec) {
					var f, factories, found;
	
					factories = this.plugins.factories;
	
					for (f in factories) {
						if (object.hasOwn(spec, f)) {
							found = {
								factory: factories[f],
								options: {
									options: spec[f],
									spec: spec
								}
							};
							break;
						}
					}
	
					// Intentionally returns undefined if no factory found
					return found;
				}
			};
	
			return ComponentFactory;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var object, array;
	
			object = __webpack_require__(24);
			array = __webpack_require__(33);
	
			/**
	   * A base proxy for all components that wire creates.  It allows wire's
	   * internals and plugins to work with components using a standard interface.
	   * WireProxy instances may be extended to specialize the behavior of the
	   * interface for a particular type of component.  For example, there is a
	   * specialized version for DOM Nodes.
	   * @param {*} target value to be proxied
	   * @constructor
	   */
			function WireProxy(target) {
				// read-only target
				Object.defineProperty(this, 'target', { value: target });
			}
	
			WireProxy.prototype = {
				/**
	    * Get the value of the named property. Sub-types should
	    * override to get properties from their targets in whatever
	    * specialized way is necessary.
	    * @param {string} property
	    * @returns {*} the value or undefined
	    */
				get: function get(property) {
					return this.target[property];
				},
	
				/**
	    * Set the value of the named property. Sub-types should
	    * override to set properties on their targets in whatever
	    * specialized way is necessary.
	    * @param {string} property
	    * @param {*} value
	    * @returns {*}
	    */
				set: function set(property, value) {
					this.target[property] = value;
					return value;
				},
	
				/**
	    * Invoke the method, with the supplied args, on the proxy's
	    * target. Sub-types should override to invoke methods their
	    * targets in whatever specialized way is necessary.
	    * @param {string|function} method name of method to invoke or
	    *  a function to call using proxy's target as the thisArg
	    * @param {array} args arguments to pass to method
	    * @returns {*} the method's return value
	    */
				invoke: function invoke(method, args) {
					var target = this.target;
	
					if (typeof method === 'string') {
						method = target[method];
					}
	
					return method.apply(target, array.fromArguments(args));
				},
	
				/**
	    * Add an aspect to the proxy's target. Sub-types should
	    * override to add aspects in whatever specialized way is
	    * necessary.
	    * @param {String|Array|RegExp|Function} pointcut
	    *  expression matching methods to be advised
	    * @param {Object} aspect aspect to add
	    * @returns {{remove:function}} object with remove() that
	    *  will remove the aspect.
	    */
				advise: function advise(pointcut, aspect) {
					/*jshint unused:false*/
					throw new TypeError('Advice not supported on component type: ' + this.target);
				},
	
				/**
	    * Destroy the proxy's target.  Sub-types should override
	    * to destroy their targets in whatever specialized way is
	    * necessary.
	    */
				destroy: function destroy() {},
	
				/**
	    * Attempt to clone this proxy's target. Sub-types should
	    * override to clone their targets in whatever specialized
	    * way is necessary.
	    * @param {object|array|function} thing thing to clone
	    * @param {object} options
	    * @param {boolean} options.deep if true and thing is an Array, try to deep clone its contents
	    * @param {boolean} options.inherited if true and thing is an object, clone inherited and own properties.
	    * @returns {*}
	    */
				clone: function clone(options) {
					// don't try to clone a primitive
					var target = this.target;
	
					if (typeof target == 'function') {
						// cloneThing doesn't clone functions, so clone here:
						return target.bind();
					} else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) != 'object') {
						return target;
					}
	
					return cloneThing(target, options || {});
				}
			};
	
			WireProxy.isProxy = isProxy;
			WireProxy.getTarget = getTarget;
			WireProxy.extend = extendProxy;
	
			return WireProxy;
	
			/**
	   * Returns a new WireProxy, whose prototype is proxy, with extensions
	   * as own properties.  This is the "official" way to extend the functionality
	   * of an existing WireProxy.
	   * @param {WireProxy} proxy proxy to extend
	   * @param extensions
	   * @returns {*}
	   */
			function extendProxy(proxy, extensions) {
				if (!isProxy(proxy)) {
					throw new Error('Cannot extend non-WireProxy');
				}
	
				return object.extend(proxy, extensions);
			}
	
			/**
	   * Returns true if it is a WireProxy
	   * @param {*} it
	   * @returns {boolean}
	   */
			function isProxy(it) {
				return it instanceof WireProxy;
			}
	
			/**
	   * If it is a WireProxy (see isProxy), returns it's target.  Otherwise,
	   * returns it;
	   * @param {*} it
	   * @returns {*}
	   */
			function getTarget(it) {
				return isProxy(it) ? it.target : it;
			}
	
			/**
	   * Try to clone thing, which can be an object, Array, or Function
	   * @param {object|array|function} thing thing to clone
	   * @param {object} options
	   * @param {boolean} options.deep if true and thing is an Array, try to deep clone its contents
	   * @param {boolean} options.inherited if true and thing is an object, clone inherited and own properties.
	   * @returns {array|object|function} cloned thing
	   */
			function cloneThing(thing, options) {
				var deep, inherited, clone, prop;
				deep = options.deep;
				inherited = options.inherited;
	
				// Note: this filters out primitive properties and methods
				if ((typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) != 'object') {
					return thing;
				} else if (thing instanceof Date) {
					return new Date(thing.getTime());
				} else if (thing instanceof RegExp) {
					return new RegExp(thing);
				} else if (Array.isArray(thing)) {
					return deep ? thing.map(function (i) {
						return cloneThing(i, options);
					}) : thing.slice();
				} else {
					clone = thing.constructor ? new thing.constructor() : {};
					for (prop in thing) {
						if (inherited || object.hasOwn(thing, prop)) {
							clone[prop] = deep ? cloneThing(thing[prop], options) : thing[prop];
						}
					}
					return clone;
				}
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var WireProxy, extend, before, meld, _advise, superDestroy;
	
			WireProxy = __webpack_require__(36);
			extend = __webpack_require__(24).extend;
			before = __webpack_require__(29).before;
			meld = __webpack_require__(38);
	
			// FIXME: Remove support for meld.add after deprecation period
			_advise = typeof meld === 'function' ? meld : meld.add;
	
			superDestroy = WireProxy.prototype.destroy;
	
			function ObjectProxy(target) {
				/*jshint unused:false*/
				WireProxy.apply(this, arguments);
			}
	
			ObjectProxy.prototype = extend(WireProxy.prototype, {
				/**
	    * Add an aspect to the proxy's target. Sub-types should
	    * override to add aspects in whatever specialized way is
	    * necessary.
	    * @param {String|Array|RegExp|Function} pointcut
	    *  expression matching methods to be advised
	    * @param {Object} aspect aspect to add
	    * @returns {{remove:function}} object with remove() that
	    *  will remove the aspect.
	    */
				advise: function advise(pointcut, aspect) {
					return _advise(this.target, pointcut, aspect);
				}
	
			});
	
			return ObjectProxy;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2011-2013 original author or authors */
	
	/**
	 * meld
	 * Aspect Oriented Programming for Javascript
	 *
	 * meld is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author Brian Cavalier
	 * @author John Hann
	 * @version 1.3.1
	 */
	(function (define) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
		//
		// Public API
		//
	
		// Add a single, specific type of advice
		// returns a function that will remove the newly-added advice
		meld.before =         adviceApi('before');
		meld.around =         adviceApi('around');
		meld.on =             adviceApi('on');
		meld.afterReturning = adviceApi('afterReturning');
		meld.afterThrowing =  adviceApi('afterThrowing');
		meld.after =          adviceApi('after');
	
		// Access to the current joinpoint in advices
		meld.joinpoint =      joinpoint;
	
		// DEPRECATED: meld.add(). Use meld() instead
		// Returns a function that will remove the newly-added aspect
		meld.add =            function() { return meld.apply(null, arguments); };
	
		/**
		 * Add an aspect to all matching methods of target, or to target itself if
		 * target is a function and no pointcut is provided.
		 * @param {object|function} target
		 * @param {string|array|RegExp|function} [pointcut]
		 * @param {object} aspect
		 * @param {function?} aspect.before
		 * @param {function?} aspect.on
		 * @param {function?} aspect.around
		 * @param {function?} aspect.afterReturning
		 * @param {function?} aspect.afterThrowing
		 * @param {function?} aspect.after
		 * @returns {{ remove: function }|function} if target is an object, returns a
		 *  remover { remove: function } whose remove method will remove the added
		 *  aspect. If target is a function, returns the newly advised function.
		 */
		function meld(target, pointcut, aspect) {
			var pointcutType, remove;
	
			if(arguments.length < 3) {
				return addAspectToFunction(target, pointcut);
			} else {
				if (isArray(pointcut)) {
					remove = addAspectToAll(target, pointcut, aspect);
				} else {
					pointcutType = typeof pointcut;
	
					if (pointcutType === 'string') {
						if (typeof target[pointcut] === 'function') {
							remove = addAspectToMethod(target, pointcut, aspect);
						}
	
					} else if (pointcutType === 'function') {
						remove = addAspectToAll(target, pointcut(target), aspect);
	
					} else {
						remove = addAspectToMatches(target, pointcut, aspect);
					}
				}
	
				return remove;
			}
	
		}
	
		function Advisor(target, func) {
	
			var orig, advisor, advised;
	
			this.target = target;
			this.func = func;
			this.aspects = {};
	
			orig = this.orig = target[func];
			advisor = this;
	
			advised = this.advised = function() {
				var context, joinpoint, args, callOrig, afterType;
	
				// If called as a constructor (i.e. using "new"), create a context
				// of the correct type, so that all advice types (including before!)
				// are called with the correct context.
				if(this instanceof advised) {
					// shamelessly derived from https://github.com/cujojs/wire/blob/c7c55fe50238ecb4afbb35f902058ab6b32beb8f/lib/component.js#L25
					context = objectCreate(orig.prototype);
					callOrig = function (args) {
						return applyConstructor(orig, context, args);
					};
	
				} else {
					context = this;
					callOrig = function(args) {
						return orig.apply(context, args);
					};
	
				}
	
				args = slice.call(arguments);
				afterType = 'afterReturning';
	
				// Save the previous joinpoint and set the current joinpoint
				joinpoint = pushJoinpoint({
					target: context,
					method: func,
					args: args
				});
	
				try {
					advisor._callSimpleAdvice('before', context, args);
	
					try {
						joinpoint.result = advisor._callAroundAdvice(context, func, args, callOrigAndOn);
					} catch(e) {
						joinpoint.result = joinpoint.exception = e;
						// Switch to afterThrowing
						afterType = 'afterThrowing';
					}
	
					args = [joinpoint.result];
	
					callAfter(afterType, args);
					callAfter('after', args);
	
					if(joinpoint.exception) {
						throw joinpoint.exception;
					}
	
					return joinpoint.result;
	
				} finally {
					// Restore the previous joinpoint, if necessary.
					popJoinpoint();
				}
	
				function callOrigAndOn(args) {
					var result = callOrig(args);
					advisor._callSimpleAdvice('on', context, args);
	
					return result;
				}
	
				function callAfter(afterType, args) {
					advisor._callSimpleAdvice(afterType, context, args);
				}
			};
	
			defineProperty(advised, '_advisor', { value: advisor, configurable: true });
		}
	
		Advisor.prototype = {
	
			/**
			 * Invoke all advice functions in the supplied context, with the supplied args
			 *
			 * @param adviceType
			 * @param context
			 * @param args
			 */
			_callSimpleAdvice: function(adviceType, context, args) {
	
				// before advice runs LIFO, from most-recently added to least-recently added.
				// All other advice is FIFO
				var iterator, advices;
	
				advices = this.aspects[adviceType];
				if(!advices) {
					return;
				}
	
				iterator = iterators[adviceType];
	
				iterator(this.aspects[adviceType], function(aspect) {
					var advice = aspect.advice;
					advice && advice.apply(context, args);
				});
			},
	
			/**
			 * Invoke all around advice and then the original method
			 *
			 * @param context
			 * @param method
			 * @param args
			 * @param applyOriginal
			 */
			_callAroundAdvice: function (context, method, args, applyOriginal) {
				var len, aspects;
	
				aspects = this.aspects.around;
				len = aspects ? aspects.length : 0;
	
				/**
				 * Call the next function in the around chain, which will either be another around
				 * advice, or the orig method.
				 * @param i {Number} index of the around advice
				 * @param args {Array} arguments with with to call the next around advice
				 */
				function callNext(i, args) {
					// If we exhausted all aspects, finally call the original
					// Otherwise, if we found another around, call it
					return i < 0
						? applyOriginal(args)
						: callAround(aspects[i].advice, i, args);
				}
	
				function callAround(around, i, args) {
					var proceedCalled, joinpoint;
	
					proceedCalled = 0;
	
					// Joinpoint is immutable
					// TODO: Use Object.freeze once v8 perf problem is fixed
					joinpoint = pushJoinpoint({
						target: context,
						method: method,
						args: args,
						proceed: proceedCall,
						proceedApply: proceedApply,
						proceedCount: proceedCount
					});
	
					try {
						// Call supplied around advice function
						return around.call(context, joinpoint);
					} finally {
						popJoinpoint();
					}
	
					/**
					 * The number of times proceed() has been called
					 * @return {Number}
					 */
					function proceedCount() {
						return proceedCalled;
					}
	
					/**
					 * Proceed to the original method/function or the next around
					 * advice using original arguments or new argument list if
					 * arguments.length > 0
					 * @return {*} result of original method/function or next around advice
					 */
					function proceedCall(/* newArg1, newArg2... */) {
						return proceed(arguments.length > 0 ? slice.call(arguments) : args);
					}
	
					/**
					 * Proceed to the original method/function or the next around
					 * advice using original arguments or new argument list if
					 * newArgs is supplied
					 * @param [newArgs] {Array} new arguments with which to proceed
					 * @return {*} result of original method/function or next around advice
					 */
					function proceedApply(newArgs) {
						return proceed(newArgs || args);
					}
	
					/**
					 * Create proceed function that calls the next around advice, or
					 * the original.  May be called multiple times, for example, in retry
					 * scenarios
					 * @param [args] {Array} optional arguments to use instead of the
					 * original arguments
					 */
					function proceed(args) {
						proceedCalled++;
						return callNext(i - 1, args);
					}
	
				}
	
				return callNext(len - 1, args);
			},
	
			/**
			 * Adds the supplied aspect to the advised target method
			 *
			 * @param aspect
			 */
			add: function(aspect) {
	
				var advisor, aspects;
	
				advisor = this;
				aspects = advisor.aspects;
	
				insertAspect(aspects, aspect);
	
				return {
					remove: function () {
						var remaining = removeAspect(aspects, aspect);
	
						// If there are no aspects left, restore the original method
						if (!remaining) {
							advisor.remove();
						}
					}
				};
			},
	
			/**
			 * Removes the Advisor and thus, all aspects from the advised target method, and
			 * restores the original target method, copying back all properties that may have
			 * been added or updated on the advised function.
			 */
			remove: function () {
				delete this.advised._advisor;
				this.target[this.func] = this.orig;
			}
		};
	
		/**
		 * Returns the advisor for the target object-function pair.  A new advisor
		 * will be created if one does not already exist.
		 * @param target {*} target containing a method with the supplied methodName
		 * @param methodName {String} name of method on target for which to get an advisor
		 * @return {Object|undefined} existing or newly created advisor for the supplied method
		 */
		Advisor.get = function(target, methodName) {
			if(!(methodName in target)) {
				return;
			}
	
			var advisor, advised;
	
			advised = target[methodName];
	
			if(typeof advised !== 'function') {
				throw new Error('Advice can only be applied to functions: ' + methodName);
			}
	
			advisor = advised._advisor;
			if(!advisor) {
				advisor = new Advisor(target, methodName);
				target[methodName] = advisor.advised;
			}
	
			return advisor;
		};
	
		/**
		 * Add an aspect to a pure function, returning an advised version of it.
		 * NOTE: *only the returned function* is advised.  The original (input) function
		 * is not modified in any way.
		 * @param func {Function} function to advise
		 * @param aspect {Object} aspect to add
		 * @return {Function} advised function
		 */
		function addAspectToFunction(func, aspect) {
			var name, placeholderTarget;
	
			name = func.name || '_';
	
			placeholderTarget = {};
			placeholderTarget[name] = func;
	
			addAspectToMethod(placeholderTarget, name, aspect);
	
			return placeholderTarget[name];
	
		}
	
		function addAspectToMethod(target, method, aspect) {
			var advisor = Advisor.get(target, method);
	
			return advisor && advisor.add(aspect);
		}
	
		function addAspectToAll(target, methodArray, aspect) {
			var removers, added, f, i;
	
			removers = [];
			i = 0;
	
			while((f = methodArray[i++])) {
				added = addAspectToMethod(target, f, aspect);
				added && removers.push(added);
			}
	
			return createRemover(removers);
		}
	
		function addAspectToMatches(target, pointcut, aspect) {
			var removers = [];
			// Assume the pointcut is a an object with a .test() method
			for (var p in target) {
				// TODO: Decide whether hasOwnProperty is correct here
				// Only apply to own properties that are functions, and match the pointcut regexp
				if (typeof target[p] == 'function' && pointcut.test(p)) {
					// if(object.hasOwnProperty(p) && typeof object[p] === 'function' && pointcut.test(p)) {
					removers.push(addAspectToMethod(target, p, aspect));
				}
			}
	
			return createRemover(removers);
		}
	
		function createRemover(removers) {
			return {
				remove: function() {
					for (var i = removers.length - 1; i >= 0; --i) {
						removers[i].remove();
					}
				}
			};
		}
	
		// Create an API function for the specified advice type
		function adviceApi(type) {
			return function(target, method, adviceFunc) {
				var aspect = {};
	
				if(arguments.length === 2) {
					aspect[type] = method;
					return meld(target, aspect);
				} else {
					aspect[type] = adviceFunc;
					return meld(target, method, aspect);
				}
			};
		}
	
		/**
		 * Insert the supplied aspect into aspectList
		 * @param aspectList {Object} list of aspects, categorized by advice type
		 * @param aspect {Object} aspect containing one or more supported advice types
		 */
		function insertAspect(aspectList, aspect) {
			var adviceType, advice, advices;
	
			for(adviceType in iterators) {
				advice = aspect[adviceType];
	
				if(advice) {
					advices = aspectList[adviceType];
					if(!advices) {
						aspectList[adviceType] = advices = [];
					}
	
					advices.push({
						aspect: aspect,
						advice: advice
					});
				}
			}
		}
	
		/**
		 * Remove the supplied aspect from aspectList
		 * @param aspectList {Object} list of aspects, categorized by advice type
		 * @param aspect {Object} aspect containing one or more supported advice types
		 * @return {Number} Number of *advices* left on the advised function.  If
		 *  this returns zero, then it is safe to remove the advisor completely.
		 */
		function removeAspect(aspectList, aspect) {
			var adviceType, advices, remaining;
	
			remaining = 0;
	
			for(adviceType in iterators) {
				advices = aspectList[adviceType];
				if(advices) {
					remaining += advices.length;
	
					for (var i = advices.length - 1; i >= 0; --i) {
						if (advices[i].aspect === aspect) {
							advices.splice(i, 1);
							--remaining;
							break;
						}
					}
				}
			}
	
			return remaining;
		}
	
		function applyConstructor(C, instance, args) {
			try {
				// Try to define a constructor, but don't care if it fails
				defineProperty(instance, 'constructor', {
					value: C,
					enumerable: false
				});
			} catch(e) {
				// ignore
			}
	
			C.apply(instance, args);
	
			return instance;
		}
	
		var currentJoinpoint, joinpointStack,
			ap, prepend, append, iterators, slice, isArray, defineProperty, objectCreate;
	
		// TOOD: Freeze joinpoints when v8 perf problems are resolved
	//	freeze = Object.freeze || function (o) { return o; };
	
		joinpointStack = [];
	
		ap      = Array.prototype;
		prepend = ap.unshift;
		append  = ap.push;
		slice   = ap.slice;
	
		isArray = Array.isArray || function(it) {
			return Object.prototype.toString.call(it) == '[object Array]';
		};
	
		// Check for a *working* Object.defineProperty, fallback to
		// simple assignment.
		defineProperty = definePropertyWorks()
			? Object.defineProperty
			: function(obj, prop, descriptor) {
			obj[prop] = descriptor.value;
		};
	
		objectCreate = Object.create ||
			(function() {
				function F() {}
				return function(proto) {
					F.prototype = proto;
					var instance = new F();
					F.prototype = null;
					return instance;
				};
			}());
	
		iterators = {
			// Before uses reverse iteration
			before: forEachReverse,
			around: false
		};
	
		// All other advice types use forward iteration
		// Around is a special case that uses recursion rather than
		// iteration.  See Advisor._callAroundAdvice
		iterators.on
			= iterators.afterReturning
			= iterators.afterThrowing
			= iterators.after
			= forEach;
	
		function forEach(array, func) {
			for (var i = 0, len = array.length; i < len; i++) {
				func(array[i]);
			}
		}
	
		function forEachReverse(array, func) {
			for (var i = array.length - 1; i >= 0; --i) {
				func(array[i]);
			}
		}
	
		function joinpoint() {
			return currentJoinpoint;
		}
	
		function pushJoinpoint(newJoinpoint) {
			joinpointStack.push(currentJoinpoint);
			return currentJoinpoint = newJoinpoint;
		}
	
		function popJoinpoint() {
			return currentJoinpoint = joinpointStack.pop();
		}
	
		function definePropertyWorks() {
			try {
				return 'x' in Object.defineProperty({}, 'x', {});
			} catch (e) { /* return falsey */ }
		}
	
		return meld;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8)
	);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _when = __webpack_require__(3);
	
	var _when2 = _interopRequireDefault(_when);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var safeNonFacetNames = {
		id: { value: 1 }
	}; /** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	function Lifecycle(plugins, pluginApi) {
		this._plugins = plugins;
		this._pluginApi = pluginApi;
	}
	
	Lifecycle.prototype = {
		init: createLifecyclePhase(['create', 'configure', 'initialize']),
		startup: createLifecyclePhase(['connect', 'ready']),
		shutdown: createLifecyclePhase(['destroy'])
	};
	
	module.exports = Lifecycle;
	
	/**
	 * Generate a method to process all steps in a lifecycle phase
	 * @return {Function}
	*/
	function createLifecyclePhase(steps) {
		steps = generateSteps(steps);
	
		return function (proxy) {
			var plugins = undefined,
			    pluginApi = undefined;
	
			plugins = this._plugins;
			pluginApi = this._pluginApi.contextualize(proxy.id);
	
			return _when2.default.reduce(steps, function (unused, step) {
				return processFacets(step, proxy, pluginApi, plugins);
			}, proxy);
		};
	}
	
	function processFacets(step, proxy, api, plugins) {
		var promises, metadata, options, name, spec, facets, safeNames, unprocessed;
	
		promises = [];
		metadata = proxy.metadata;
		spec = metadata.spec;
		facets = plugins.facets;
		safeNames = Object.create(plugins.factories, safeNonFacetNames);
		unprocessed = [];
	
		for (name in spec) {
			if (name in facets) {
				options = spec[name];
				if (options) {
					processStep(promises, facets[name], step, proxy, options, api);
				}
			} else if (!(name in safeNames)) {
				unprocessed.push(name);
			}
		}
	
		if (unprocessed.length) {
			return _when2.default.reject(unrecognizedFacets(proxy, unprocessed, spec));
		} else {
			return _when2.default.all(promises).then(function () {
				return processListeners(step, proxy, api, plugins.listeners);
			}).yield(proxy);
		}
	}
	
	function processListeners(step, proxy, api, listeners) {
		var listenerPromises = [];
	
		for (var i = 0; i < listeners.length; i++) {
			processStep(listenerPromises, listeners[i], step, proxy, {}, api);
		}
	
		return _when2.default.all(listenerPromises);
	}
	
	function processStep(promises, processor, step, proxy, options, api) {
		var facet = undefined,
		    pendingFacet = undefined;
	
		if (processor && processor[step]) {
			pendingFacet = _when2.default.defer();
			promises.push(pendingFacet.promise);
	
			facet = Object.create(proxy);
			facet.options = options;
			processor[step](pendingFacet.resolver, facet, api);
		}
	}
	
	function generateSteps(steps) {
		return steps.reduce(reduceSteps, []);
	}
	
	function reduceSteps(lifecycle, step) {
		lifecycle.push(step + ':before');
		lifecycle.push(step);
		lifecycle.push(step + ':after');
		return lifecycle;
	}
	
	function unrecognizedFacets(proxy, unprocessed, spec) {
		return new Error('unrecognized facets in ' + proxy.id + ', maybe you forgot a plugin? ' + unprocessed.join(', ') + '\n' + JSON.stringify(spec));
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, object;
	
			when = __webpack_require__(3);
			object = __webpack_require__(24);
	
			/**
	   * Create a reference resolve that uses the supplied plugins and pluginApi
	   * @param {object} config
	   * @param {object} config.plugins plugin registry
	   * @param {object} config.pluginApi plugin Api to provide to resolver plugins
	   *  when resolving references
	   * @constructor
	   */
			function Resolver(resolvers, pluginApi) {
				this._resolvers = resolvers;
				this._pluginApi = pluginApi;
			}
	
			Resolver.prototype = {
	
				/**
	    * Determine if it is a reference spec that can be resolved by this resolver
	    * @param {*} it
	    * @return {boolean} true iff it is a reference
	    */
				isRef: function isRef(it) {
					return it && object.hasOwn(it, '$ref');
				},
	
				/**
	    * Parse it, which must be a reference spec, into a reference object
	    * @param {object|string} it
	    * @param {string?} it.$ref
	    * @return {object} reference object
	    */
				parse: function parse(it) {
					return this.isRef(it) ? this.create(it.$ref, it) : this.create(it, {});
				},
	
				/**
	    * Creates a reference object
	    * @param {string} name reference name
	    * @param {object} options
	    * @return {{resolver: String, name: String, options: object, resolve: Function}}
	    */
				create: function create(name, options) {
					var self, split, resolver;
	
					self = this;
	
					split = name.indexOf('!');
					resolver = name.substring(0, split);
					name = name.substring(split + 1);
	
					return {
						resolver: resolver,
						name: name,
						options: options,
						resolve: function resolve(fallback, onBehalfOf) {
							return this.resolver ? self._resolve(resolver, name, options, onBehalfOf) : fallback(name, options);
						}
					};
				},
	
				/**
	    * Do the work of resolving a reference using registered plugins
	    * @param {string} resolverName plugin resolver name (e.g. "dom"), the part before the "!"
	    * @param {string} name reference name, the part after the "!"
	    * @param {object} options additional options to pass thru to a resolver plugin
	    * @param {string|*} onBehalfOf some indication of another component on whose behalf this
	    *  reference is being resolved.  Used to build a reference graph and detect cycles
	    * @return {object} promise for the resolved reference
	    * @private
	    */
				_resolve: function _resolve(resolverName, name, options, onBehalfOf) {
					var deferred, resolver, api;
	
					deferred = when.defer();
	
					if (resolverName) {
						resolver = this._resolvers[resolverName];
	
						if (resolver) {
							api = this._pluginApi.contextualize(onBehalfOf);
							resolver(deferred.resolver, name, options || {}, api);
						} else {
							deferred.reject(new Error('No resolver plugin found: ' + resolverName));
						}
					} else {
						deferred.reject(new Error('Cannot resolve ref: ' + name));
					}
	
					return deferred.promise;
				}
			};
	
			return Resolver;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * plugins
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 * @author: brian@hovercraftstudios.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, array, object, priority, instantiate, nsKey, nsSeparator;
	
			when = __webpack_require__(3);
			array = __webpack_require__(33);
			object = __webpack_require__(24);
			priority = __webpack_require__(42);
			instantiate = __webpack_require__(43);
	
			nsKey = '$ns';
			nsSeparator = ':';
	
			function PluginRegistry() {
				this.plugins = [];
				this._namespaces = {};
	
				this.contextListeners = [];
				this.listeners = [];
				this.proxiers = [];
				this.resolvers = {};
				this.factories = {};
				this.facets = {};
			}
	
			PluginRegistry.prototype = {
				scanModule: function scanModule(module, spec, namespace) {
					var self, pluginFactory;
	
					pluginFactory = discoverPlugin(module);
	
					if (!allowPlugin(pluginFactory, this.plugins)) {
						return when.resolve();
					}
	
					// Add to singleton plugins list to only allow one instance
					// of this plugin in the current context.
					this.plugins.push(pluginFactory);
	
					// Initialize the plugin for this context
					self = this;
					return when(instantiate(pluginFactory, [spec]), function (plugin) {
						plugin && self.registerPlugin(plugin, namespace || getNamespace(spec));
					}).yield();
				},
	
				registerPlugin: function registerPlugin(plugin, namespace) {
					addNamespace(namespace, this._namespaces);
	
					addPlugin(plugin.resolvers, this.resolvers, namespace);
					addPlugin(plugin.factories, this.factories, namespace);
					addPlugin(plugin.facets, this.facets, namespace);
	
					this.listeners.push(plugin);
					if (plugin.context) {
						this.contextListeners.push(plugin.context);
					}
	
					this._registerProxies(plugin.proxies);
				},
	
				_registerProxies: function _registerProxies(proxiesToAdd) {
					if (!proxiesToAdd) {
						return;
					}
	
					this.proxiers = priority.sortReverse(array.union(this.proxiers, proxiesToAdd));
				}
			};
	
			return PluginRegistry;
	
			function discoverPlugin(module) {
				var plugin;
	
				// Prefer deprecated legacy wire$plugin format over newer
				// plain function format.
				// TODO: Remove support for wire$plugin
				if (typeof module.wire$plugin === 'function') {
					plugin = module.wire$plugin;
				} else if (typeof module === 'function') {
					plugin = module;
				}
	
				return plugin;
			}
	
			function getNamespace(spec) {
				var namespace;
				if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === 'object' && nsKey in spec) {
					// A namespace was provided
					namespace = spec[nsKey];
				}
	
				return namespace;
			}
	
			function addNamespace(namespace, namespaces) {
				if (namespace && namespace in namespaces) {
					throw new Error('plugin namespace already in use: ' + namespace);
				} else {
					namespaces[namespace] = 1;
				}
			}
	
			function allowPlugin(plugin, existing) {
				return typeof plugin === 'function' && existing.indexOf(plugin) === -1;
			}
	
			function addPlugin(src, registry, namespace) {
				var newPluginName, namespacedName;
				for (newPluginName in src) {
					namespacedName = makeNamespace(newPluginName, namespace);
					if (object.hasOwn(registry, namespacedName)) {
						throw new Error('Two plugins for same type in scope: ' + namespacedName);
					}
	
					registry[namespacedName] = src[newPluginName];
				}
			}
	
			function makeNamespace(pluginName, namespace) {
				return namespace ? namespace + nsSeparator + pluginName : pluginName;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			var basePriority, defaultPriority;
	
			basePriority = -99;
			defaultPriority = 0;
	
			return {
				basePriority: basePriority,
				sortReverse: prioritizeReverse
			};
	
			function prioritizeReverse(list) {
				return list.sort(byReversePriority);
			}
	
			function byReversePriority(a, b) {
				var aPriority, bPriority;
	
				aPriority = a.priority || defaultPriority;
				bPriority = b.priority || defaultPriority;
	
				return aPriority < bPriority ? -1 : aPriority > bPriority ? 1 : 0;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			var undef;
	
			/**
	   * Creates an object by either invoking ctor as a function and returning the result,
	   * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
	   * is the "right" one.
	   *
	   * @param ctor {Function} function or constructor to invoke
	   * @param args {Array} array of arguments to pass to ctor in either case
	   *
	   * @return The result of invoking ctor with args, with or without new, depending on
	   * the strategy selected.
	   */
			return function instantiate(ctor, args, forceConstructor) {
	
				var begotten, ctorResult;
	
				if (forceConstructor || forceConstructor === undef && isConstructor(ctor)) {
					begotten = Object.create(ctor.prototype);
					defineConstructorIfPossible(begotten, ctor);
					ctorResult = ctor.apply(begotten, args);
					if (ctorResult !== undef) {
						begotten = ctorResult;
					}
				} else {
					begotten = ctor.apply(undef, args);
				}
	
				return begotten === undef ? null : begotten;
			};
	
			/**
	   * Carefully sets the instance's constructor property to the supplied
	   * constructor, using Object.defineProperty if available.  If it can't
	   * set the constructor in a safe way, it will do nothing.
	   *
	   * @param instance {Object} component instance
	   * @param ctor {Function} constructor
	   */
			function defineConstructorIfPossible(instance, ctor) {
				try {
					Object.defineProperty(instance, 'constructor', {
						value: ctor,
						enumerable: false
					});
				} catch (e) {
					// If we can't define a constructor, oh well.
					// This can happen if in envs where Object.defineProperty is not
					// available, or when using cujojs/poly or other ES5 shims
				}
			}
	
			/**
	   * Determines whether the supplied function should be invoked directly or
	   * should be invoked using new in order to create the object to be wired.
	   *
	   * @param func {Function} determine whether this should be called using new or not
	   *
	   * @returns {Boolean} true iff func should be invoked using new, false otherwise.
	   */
			function isConstructor(func) {
				var is = false,
				    p;
				for (p in func.prototype) {
					if (p !== undef) {
						is = true;
						break;
					}
				}
	
				return is;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var object, when;
	
			when = __webpack_require__(3);
			object = __webpack_require__(24);
	
			function mergeSpecs(moduleLoader, specs) {
				return when(specs, function (specs) {
					return when.resolve(Array.isArray(specs) ? mergeAll(moduleLoader, specs) : typeof specs === 'string' ? moduleLoader(specs) : specs);
				});
			}
	
			function mergeAll(moduleLoader, specs) {
				return when.reduce(specs, function (merged, module) {
					return typeof module == 'string' ? when(moduleLoader(module), function (spec) {
						return object.mixin(merged, spec);
					}) : object.mixin(merged, module);
				}, {});
			}
	
			return {
				mergeSpecs: mergeSpecs,
				mergeAll: mergeAll
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * DirectedGraph
	 * @author: brian@hovercraftstudios.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			/**
	   * A simple directed graph
	   * @constructor
	   */
			function DirectedGraph() {
				this.vertices = {};
			}
	
			DirectedGraph.prototype = {
				/**
	    * Add a new edge from one vertex to another
	    * @param {string} from vertex at the tail of the edge
	    * @param {string} to vertex at the head of the edge
	    */
				addEdge: function addEdge(from, to) {
					this._getOrCreateVertex(to);
					this._getOrCreateVertex(from).edges[to] = 1;
				},
	
				/**
	    * Adds and initializes new vertex, or returns an existing vertex
	    * if one with the supplied name already exists
	    * @param {string} name vertex name
	    * @return {object} the new vertex, with an empty edge set
	    * @private
	    */
				_getOrCreateVertex: function _getOrCreateVertex(name) {
					var v = this.vertices[name];
					if (!v) {
						v = this.vertices[name] = { name: name, edges: {} };
					}
	
					return v;
				},
	
				/**
	    * Removes an edge, if it exits
	    * @param {string} from vertex at the tail of the edge
	    * @param {string} to vertex at the head of the edge
	    */
				removeEdge: function removeEdge(from, to) {
					var outbound = this.vertices[from];
					if (outbound) {
						delete outbound.edges[to];
					}
				},
	
				/**
	    * Calls lambda once for each vertex in the graph passing
	    * the vertex as the only param.
	    * @param {function} lambda
	    */
				eachVertex: function eachVertex(lambda) {
					var vertices, v;
	
					vertices = this.vertices;
					for (v in vertices) {
						lambda(vertices[v]);
					}
				},
	
				/**
	    * Calls lambda once for every outbound edge of the supplied vertex
	    * @param {string} vertex vertex name whose edges will be passed to lambda
	    * @param {function} lambda
	    */
				eachEdgeFrom: function eachEdgeFrom(vertex, lambda) {
					var v, e, vertices;
	
					vertices = this.vertices;
					v = vertices[vertex];
	
					if (!v) {
						return;
					}
	
					for (e in v.edges) {
						lambda(v, vertices[e]);
					}
				}
			};
	
			return DirectedGraph;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * cyclesTracker
	 * @author: brian@hovercraftstudios.com
	 * @author: younes.ouadi@gmail.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var findStronglyConnected, formatCycles;
	
			findStronglyConnected = __webpack_require__(47);
			formatCycles = __webpack_require__(48);
	
			/**
	   * Make sure that the new name doesn't introduce a cycle.
	   * 
	   * @param {string} name the name being used.
	   * @param {string} onBehalfOf some indication of another name on whose behalf this
	   *  name is being used.  Used to build graph and detect cycles
	   * @return {string} the name being used.
	   */
			function ensureNoCycles(namesGraph, name, onBehalfOf) {
				var stronglyConnected, cycles;
	
				// add the name to the graph
				onBehalfOf = onBehalfOf || '?';
				namesGraph.addEdge(onBehalfOf, name);
	
				// compute cycles
				stronglyConnected = findStronglyConnected(namesGraph);
				cycles = stronglyConnected.filter(function (node) {
					// Only consider cycles that:
					// * have more than one node
					// * have one node and that node is not self-referenced
					return node.length > 1 || node.length === 1 && Object.keys(node[0].edges).indexOf(node[0].name) !== -1;
				});
	
				// is there a cycle?
				if (cycles.length) {
					// Cycles detected
					throw new Error('Possible circular usage:\n' + formatCycles(cycles));
				}
	
				return name;
			}
	
			return {
				ensureNoCycles: ensureNoCycles
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Tarjan directed graph cycle detection
	 * @author: brian@hovercraftstudios.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			var undef;
	
			/**
	   * Tarjan directed graph cycle detection.
	   * See http://en.wikipedia.org/wiki/Tarjan's_strongly_connected_components_algorithm
	   *
	   * WARNING: For efficiency, this adds properties to the vertices in the
	   * graph.  It doesn't really matter for wire's internal purposes.
	   *
	   * @param {DirectedGraph} digraph
	   * @return {Array} each element is a set (Array) of vertices involved
	   * in a cycle.
	   */
			return function tarjan(digraph) {
	
				var index, stack, scc;
	
				index = 0;
				stack = [];
	
				scc = [];
	
				// Clear out any old cruft that may be hanging around
				// from a previous run.  Maybe should do this afterward?
				digraph.eachVertex(function (v) {
					delete v.index;
					delete v.lowlink;
					delete v.onStack;
				});
	
				// Start the depth first search
				digraph.eachVertex(function (v) {
					if (v.index === undef) {
						findStronglyConnected(digraph, v);
					}
				});
	
				// Tarjan algorithm for a single node
				function findStronglyConnected(dg, v) {
					var vertices, vertex;
	
					v.index = v.lowlink = index;
					index += 1;
					pushStack(stack, v);
	
					dg.eachEdgeFrom(v.name, function (v, w) {
	
						if (w.index === undef) {
							// Continue depth first search
							findStronglyConnected(dg, w);
							v.lowlink = Math.min(v.lowlink, w.lowlink);
						} else if (w.onStack) {
							v.lowlink = Math.min(v.lowlink, w.index);
						}
					});
	
					if (v.lowlink === v.index) {
						vertices = [];
						if (stack.length) {
							do {
								vertex = popStack(stack);
								vertices.push(vertex);
							} while (v !== vertex);
						}
	
						if (vertices.length) {
							scc.push(vertices);
						}
					}
				}
	
				return scc;
			};
	
			/**
	   * Push a vertex on the supplied stack, but also tag the
	   * vertex as being on the stack so we don't have to scan the
	   * stack later in order to tell.
	   * @param {Array} stack
	   * @param {object} vertex
	   */
			function pushStack(stack, vertex) {
				stack.push(vertex);
				vertex.onStack = 1;
			}
	
			/**
	   * Pop an item off the supplied stack, being sure to un-tag it
	   * @param {Array} stack
	   * @return {object|undefined} vertex
	   */
			function popStack(stack) {
				var v = stack.pop();
				if (v) {
					delete v.onStack;
				}
	
				return v;
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * formatCycles
	 * @author: brian@hovercraftstudios.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			/**
	   * If there are cycles, format them for output
	   * @param {Array} cycles array of reference resolution cycles
	   * @return {String} formatted string
	   */
			return function formatCycles(cycles) {
				return cycles.map(function (sc) {
					return '[' + sc.map(function (v) {
						return v.name;
					}).join(', ') + ']';
				}).join(', ');
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/**
	 * defaultPlugins
	 * @author: brian
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			return [__webpack_require__(50), __webpack_require__(51)];
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Plugin that allows wire to be used as a plugin within a wire spec
	 *
	 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, object;
	
			when = __webpack_require__(3);
			object = __webpack_require__(24);
	
			return function () /* options */{
	
				var _ready = when.defer();
	
				return {
					context: {
						ready: function ready(resolver) {
							_ready.resolve();
							resolver.resolve();
						}
					},
					resolvers: {
						wire: wireResolver
					},
					factories: {
						wire: wireFactory
					}
				};
	
				/**
	    * Factory that creates either a child context, or a *function* that will create
	    * that child context.  In the case that a child is created, this factory returns
	    * a promise that will resolve when the child has completed wiring.
	    *
	    * @param {Object} resolver used to resolve with the created component
	    * @param {Object} componentDef component spec for the component to be created
	    * @param {function} wire scoped wire function
	    */
				function wireFactory(resolver, componentDef, wire) {
					var options, module, provide, defer, waitParent, result;
	
					options = componentDef.options;
	
					// Get child spec and options
					if (object.isObject(options) && 'spec' in options) {
						module = options.spec;
						waitParent = options.waitParent;
						defer = options.defer;
						provide = options.provide;
					} else {
						module = options;
					}
	
					function init(context) {
						var initialized;
	
						if (provide) {
							initialized = when(wire(provide), function (provides) {
								object.mixin(context.instances, provides);
							});
						}
	
						return initialized;
					}
	
					/**
	     * Create a child context of the current context
	     * @param {object?} mixin additional spec to be mixed into
	     *  the child being wired
	     * @returns {Promise} promise for child context
	     */
					function createChild( /** {Object|String}? */mixin) {
						var spec, config;
	
						spec = mixin ? [].concat(module, mixin) : module;
						config = { initializers: [init] };
	
						var child = wire.createChild(spec, config);
						return defer ? child : when(child, function (child) {
							return object.hasOwn(child, '$exports') ? child.$exports : child;
						});
					}
	
					if (defer) {
						// Resolve with the createChild *function* itself
						// which can be used later to wire the spec
						result = createChild;
					} else if (waitParent) {
	
						var childPromise = when(_ready.promise, function () {
							// ensure nothing is passed to createChild here
							return createChild();
						});
	
						result = wrapChild(childPromise);
					} else {
						result = createChild();
					}
	
					resolver.resolve(result);
				}
			};
	
			function wrapChild(promise) {
				return { promise: promise };
			}
	
			/**
	   * Builtin reference resolver that resolves to the context-specific
	   * wire function.
	   */
			function wireResolver(resolver, _, __, wire) {
				resolver.resolve(wire.createChild);
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * Base wire plugin that provides properties, init, and destroy facets, and
	 * a proxy for plain JS objects.
	 *
	 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, object, functional, pipeline, instantiate, createInvoker, whenAll, obj, pluginInstance, undef;
	
			when = __webpack_require__(3);
			object = __webpack_require__(24);
			functional = __webpack_require__(52);
			pipeline = __webpack_require__(54);
			instantiate = __webpack_require__(43);
			createInvoker = __webpack_require__(55);
	
			whenAll = when.all;
	
			obj = {};
	
			function asArray(it) {
				return Array.isArray(it) ? it : [it];
			}
	
			function invoke(func, proxy, args, wire) {
				return when(wire(args, func, proxy.path), function (resolvedArgs) {
					return proxy.invoke(func, asArray(resolvedArgs));
				});
			}
	
			function invokeAll(facet, wire) {
				var options = facet.options;
	
				if (typeof options == 'string') {
					return invoke(options, facet, [], wire);
				} else {
					var promises, funcName;
					promises = [];
	
					for (funcName in options) {
						promises.push(invoke(funcName, facet, options[funcName], wire));
					}
	
					return whenAll(promises);
				}
			}
	
			//
			// Mixins
			//
	
			function mixin(target, src) {
				var name, s;
	
				for (name in src) {
					s = src[name];
					if (!(name in target) || target[name] !== s && (!(name in obj) || obj[name] !== s)) {
						target[name] = s;
					}
				}
	
				return target;
			}
	
			function doMixin(target, introduction, wire) {
				introduction = typeof introduction == 'string' ? wire.resolveRef(introduction) : wire(introduction);
	
				return when(introduction, mixin.bind(null, target));
			}
	
			function mixinFacet(resolver, facet, wire) {
				var target, intros;
	
				target = facet.target;
				intros = facet.options;
	
				if (!Array.isArray(intros)) {
					intros = [intros];
				}
	
				resolver.resolve(when.reduce(intros, function (target, intro) {
					return doMixin(target, intro, wire);
				}, target));
			}
	
			/**
	   * Factory that handles cases where you need to create an object literal
	   * that has a property whose name would trigger another wire factory.
	   * For example, if you need an object literal with a property named "create",
	   * which would normally cause wire to try to construct an instance using
	   * a constructor or other function, and will probably result in an error,
	   * or an unexpected result:
	   * myObject: {
	   *      create: "foo"
	   *    ...
	   * }
	   *
	   * You can use the literal factory to force creation of an object literal:
	   * myObject: {
	   *    literal: {
	   *      create: "foo"
	   *    }
	   * }
	   *
	   * which will result in myObject.create == "foo" rather than attempting
	   * to create an instance of an AMD module whose id is "foo".
	   */
			function literalFactory(resolver, spec /*, wire */) {
				resolver.resolve(spec.options);
			}
	
			/**
	   * @deprecated Use create (instanceFactory) instead
	   * @param resolver
	   * @param componentDef
	   * @param wire
	   */
			function protoFactory(resolver, componentDef, wire) {
				var parentRef, promise;
	
				parentRef = componentDef.options;
	
				promise = typeof parentRef === 'string' ? wire.resolveRef(parentRef) : wire(parentRef);
	
				resolver.resolve(promise.then(Object.create));
			}
	
			function propertiesFacet(resolver, facet, wire) {
	
				var properties, path, setProperty, propertiesSet;
	
				properties = facet.options;
				path = facet.path;
				setProperty = facet.set.bind(facet);
	
				propertiesSet = when.map(Object.keys(facet.options), function (key) {
					return wire(properties[key], facet.path).then(function (wiredProperty) {
						setProperty(key, wiredProperty);
					});
				});
	
				resolver.resolve(propertiesSet);
			}
	
			function invokerFactory(resolver, componentDef, wire) {
	
				var invoker = wire(componentDef.options).then(function (invokerContext) {
					// It'd be nice to use wire.getProxy() then proxy.invoke()
					// here, but that means the invoker must always return
					// a promise.  Not sure that's best, so for now, just
					// call the method directly
					return createInvoker(invokerContext.method, invokerContext.args);
				});
	
				resolver.resolve(invoker);
			}
	
			function invokerFacet(resolver, facet, wire) {
				resolver.resolve(invokeAll(facet, wire));
			}
	
			function cloneFactory(resolver, componentDef, wire) {
				var sourceRef, options, cloned;
	
				if (wire.resolver.isRef(componentDef.options.source)) {
					sourceRef = componentDef.options.source;
					options = componentDef.options;
				} else {
					sourceRef = componentDef.options;
					options = {};
				}
	
				cloned = wire(sourceRef).then(function (ref) {
					return when(wire.getProxy(ref), function (proxy) {
						if (!proxy.clone) {
							throw new Error('No clone function found for ' + componentDef.id);
						}
	
						return proxy.clone(options);
					});
				});
	
				resolver.resolve(cloned);
			}
	
			function getArgs(create, wire) {
				return create.args ? wire(asArray(create.args)) : [];
			}
	
			function moduleFactory(resolver, componentDef, wire) {
				resolver.resolve(wire.loadModule(componentDef.options));
			}
	
			/**
	   * Factory that uses an AMD module either directly, or as a
	   * constructor or plain function to create the resulting item.
	   *
	   * @param {Object} resolver resolver to resolve with the created component
	   * @param {Object} componentDef portion of the spec for the component to be created
	   * @param {function} wire
	   */
			function instanceFactory(resolver, componentDef, wire) {
				var create, args, isConstructor, module, instance;
	
				create = componentDef.options;
	
				if (typeof create == 'string') {
					module = wire.loadModule(create);
				} else if (wire.resolver.isRef(create)) {
					module = wire(create);
					args = getArgs(create, wire);
				} else if (object.isObject(create) && create.module) {
					module = wire.resolver.isRef(create.module) ? wire(create.module) : wire.loadModule(create.module);
					args = getArgs(create, wire);
					isConstructor = create.isConstructor;
				} else {
					module = create;
				}
	
				instance = when.join(module, args).spread(createInstance);
	
				resolver.resolve(instance);
	
				// Load the module, and use it to create the object
				function createInstance(module, args) {
					// We'll either use the module directly, or we need
					// to instantiate/invoke it.
					return typeof module == 'function' ? instantiate(module, args, isConstructor) : Object.create(module);
				}
			}
	
			function composeFactory(resolver, componentDef, wire) {
				var options, promise;
	
				options = componentDef.options;
	
				if (typeof options == 'string') {
					promise = pipeline(undef, options, wire);
				} else {
					// Assume it's an array of things that will wire to functions
					promise = when(wire(options), function (funcArray) {
						return functional.compose(funcArray);
					});
				}
	
				resolver.resolve(promise);
			}
	
			pluginInstance = {
				factories: {
					module: moduleFactory,
					create: instanceFactory,
					literal: literalFactory,
					prototype: protoFactory,
					clone: cloneFactory,
					compose: composeFactory,
					invoker: invokerFactory
				},
				facets: {
					// properties facet.  Sets properties on components
					// after creation.
					properties: {
						configure: propertiesFacet
					},
					mixin: {
						configure: mixinFacet
					},
					// init facet.  Invokes methods on components during
					// the "init" stage.
					init: {
						initialize: invokerFacet
					},
					// ready facet.  Invokes methods on components during
					// the "ready" stage.
					ready: {
						ready: invokerFacet
					},
					// destroy facet.  Registers methods to be invoked
					// on components when the enclosing context is destroyed
					destroy: {
						destroy: invokerFacet
					}
				}
			};
	
			// "introduce" is deprecated, but preserved here for now.
			pluginInstance.facets.introduce = pluginInstance.facets.mixin;
	
			return function () /* options */{
				return pluginInstance;
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _asap = __webpack_require__(53);
	
	var _asap2 = _interopRequireDefault(_asap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var slice = [].slice;
	
	/**
	 * Create a partial function
	 * @param f {Function}
	 * @param [args] {*} additional arguments will be bound to the returned partial
	 * @return {Function}
	*/
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * functional
	 * Helper library for working with pure functions in wire and wire plugins
	 *
	 * NOTE: This lib assumes Function.prototype.bind is available
	 *
	 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	function partial(f, args /*...*/) {
		// Optimization: return f if no args provided
		if (arguments.length == 1) {
			return f;
		}
	
		args = slice.call(arguments, 1);
	
		return function () {
			return f.apply(this, args.concat(slice.call(arguments)));
		};
	}
	
	/**
	 * Promise-aware function composition. If any function in
	 * the composition returns a promise, the entire composition
	 * will be lifted to return a promise.
	 * @param funcs {Array} array of functions to compose
	 * @return {Function} composed function
	*/
	function compose(funcs) {
		var first = undefined;
	
		first = funcs[0];
		funcs = funcs.slice(1);
	
		return function composed() {
			var context = this;
			return funcs.reduce(function (result, f) {
				return (0, _asap2.default)(result, function (result) {
					return f.call(context, result);
				});
			}, first.apply(this, arguments));
		};
	}
	
	module.exports = {
		compose: compose,
		partial: partial
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2011-2013 original author or authors */
	
	/**
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when = __webpack_require__(3);
	
			/**
	   * WARNING: This is not the function you're looking for. You
	   * probably want when().
	   * This function *conditionally* executes onFulfill synchronously
	   * if promiseOrValue is a non-promise, or calls when(promiseOrValue,
	   * onFulfill, onReject) otherwise.
	   * @return {Promise|*} returns a promise if promiseOrValue is
	   *  a promise, or the return value of calling onFulfill
	   *  synchronously otherwise.
	   */
			return function asap(promiseOrValue, onFulfill, onReject) {
				return when.isPromiseLike(promiseOrValue) ? when(promiseOrValue, onFulfill, onReject) : onFulfill(promiseOrValue);
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2010-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @author: Brian Cavalier
	 * @author: John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, compose, pipelineSplitRx;
	
			when = __webpack_require__(3);
			compose = __webpack_require__(52).compose;
			pipelineSplitRx = /\s*\|\s*/;
	
			return function pipeline(proxy, composeString, wire) {
	
				var bindSpecs, resolveRef, getProxy;
	
				if (typeof composeString != 'string') {
					return wire(composeString).then(function (func) {
						return createProxyInvoker(proxy, func);
					});
				}
	
				bindSpecs = composeString.split(pipelineSplitRx);
				resolveRef = wire.resolveRef;
				getProxy = wire.getProxy;
	
				function createProxyInvoker(proxy, method) {
					return function () {
						return proxy.invoke(method, arguments);
					};
				}
	
				function createBound(proxy, bindSpec) {
					var target, method;
	
					target = bindSpec.split('.');
	
					if (target.length > 2) {
						throw new Error('Only 1 "." is allowed in refs: ' + bindSpec);
					}
	
					if (target.length > 1) {
						method = target[1];
						target = target[0];
						return when(getProxy(target), function (proxy) {
							return createProxyInvoker(proxy, method);
						});
					} else {
						if (proxy && typeof proxy.get(bindSpec) == 'function') {
							return createProxyInvoker(proxy, bindSpec);
						} else {
							return resolveRef(bindSpec);
						}
					}
				}
	
				// First, resolve each transform function, stuffing it into an array
				// The result of this reduce will an array of concrete functions
				// Then add the final context[method] to the array of funcs and
				// return the composition.
				return when.reduce(bindSpecs, function (funcs, bindSpec) {
					return when(createBound(proxy, bindSpec), function (func) {
						funcs.push(func);
						return funcs;
					});
				}, []).then(function (funcs) {
					var context = proxy && proxy.target;
					return (funcs.length == 1 ? funcs[0] : compose(funcs)).bind(context);
				});
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
			return function (methodName, args) {
				return function (target) {
					return target[methodName].apply(target, args);
				};
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/**
	 * trackInflightRefs
	 * @author: brian@hovercraftstudios.com
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var timeout, findStronglyConnected, formatCycles, refCycleCheckTimeout;
	
			timeout = __webpack_require__(57);
			findStronglyConnected = __webpack_require__(47);
			formatCycles = __webpack_require__(48);
	
			refCycleCheckTimeout = 5000;
	
			/**
	   * Advice to track inflight refs using a directed graph
	   * @param {DirectedGraph} graph
	   * @param {Resolver} resolver
	   * @param {number} cycleTimeout how long to wait for any one reference to resolve
	   *  before performing cycle detection. This basically debounces cycle detection
	   */
			return function trackInflightRefs(graph, resolver, cycleTimeout) {
				var create = resolver.create;
	
				if (typeof cycleTimeout != 'number') {
					cycleTimeout = refCycleCheckTimeout;
				}
	
				resolver.create = function () {
					var ref, resolve;
	
					ref = create.apply(resolver, arguments);
	
					resolve = ref.resolve;
					ref.resolve = function () {
						var inflight = resolve.apply(ref, arguments);
						return trackInflightRef(graph, cycleTimeout, inflight, ref.name, arguments[1]);
					};
	
					return ref;
				};
	
				return resolver;
			};
	
			/**
	   * Add this reference to the reference graph, and setup a timeout that will fire if the refPromise
	   * has not resolved in a reasonable amount.  If the timeout fires, check the current graph for cycles
	   * and fail wiring if we find any.
	   * @param {DirectedGraph} refGraph graph to use to track cycles
	   * @param {number} cycleTimeout how long to wait for any one reference to resolve
	   *  before performing cycle detection. This basically debounces cycle detection
	   * @param {object} refPromise promise for reference resolution
	   * @param {string} refName reference being resolved
	   * @param {string} onBehalfOf some indication of another component on whose behalf this
	   *  reference is being resolved.  Used to build a reference graph and detect cycles
	   * @return {object} promise equivalent to refPromise but that may be rejected if cycles are detected
	   */
			function trackInflightRef(refGraph, cycleTimeout, refPromise, refName, onBehalfOf) {
	
				onBehalfOf = onBehalfOf || '?';
				refGraph.addEdge(onBehalfOf, refName);
	
				return timeout(cycleTimeout, refPromise).then(function (resolved) {
					refGraph.removeEdge(onBehalfOf, refName);
					return resolved;
				}, function () {
					var stronglyConnected, cycles;
	
					stronglyConnected = findStronglyConnected(refGraph);
					cycles = stronglyConnected.filter(function (node) {
						return node.length > 1;
					});
	
					if (cycles.length) {
						// Cycles detected
						throw new Error('Possible circular refs:\n' + formatCycles(cycles));
					}
	
					return refPromise;
				});
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2011-2013 original author or authors */
	
	/**
	 * timeout.js
	 *
	 * Helper that returns a promise that rejects after a specified timeout,
	 * if not explicitly resolved or rejected before that.
	 *
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	
	(function(define) {
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var when = __webpack_require__(3);
	
	    /**
		 * @deprecated Use when(trigger).timeout(ms)
	     */
	    return function timeout(msec, trigger) {
			return when(trigger).timeout(msec);
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));
	
	


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./ComponentFactory.js": 35,
		"./Container.js": 28,
		"./Map.js": 34,
		"./ObjectProxy.js": 37,
		"./WireContext.js": 30,
		"./WireProxy.js": 36,
		"./advice.js": 29,
		"./array.js": 33,
		"./asap.js": 53,
		"./connection.js": 59,
		"./context.js": 2,
		"./dom/base.js": 60,
		"./functional.js": 52,
		"./graph/DirectedGraph.js": 45,
		"./graph/cyclesTracker.js": 46,
		"./graph/formatCycles.js": 48,
		"./graph/tarjan.js": 47,
		"./graph/trackInflightRefs.js": 56,
		"./instantiate.js": 43,
		"./invoker.js": 55,
		"./lifecycle.js": 39,
		"./loader/adapter.js": 25,
		"./loader/moduleId.js": 27,
		"./loader/relative.js": 26,
		"./object.js": 24,
		"./pipeline.js": 54,
		"./plugin/basePlugin.js": 51,
		"./plugin/defaultPlugins.js": 49,
		"./plugin/priority.js": 42,
		"./plugin/registry.js": 41,
		"./plugin/wirePlugin.js": 50,
		"./resolver.js": 40,
		"./scope.js": 31,
		"./specUtils.js": 44
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 58;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/** @license MIT License (c) copyright 2011-2013 original author or authors */
	
	/**
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * Helper module that parses incoming and outgoing method-call-based
	 * connection specs. This module is used by wire plugins to parse connections.
	 *
	 * Incoming connection forms:
	 *
	 * 'srcComponent.triggerMethod': 'method'
	 * 'srcComponent.triggerMethod': 'transforms | method'
	 * srcComponent: {
	 *   triggerMethod1: 'method',
	 *   triggerMethod2: 'transforms | method',
	 *   ...
	 * }
	 *
	 * Outgoing connection forms:
	 *
	 * eventName: 'destComponent.method'
	 * eventName: 'transforms | destComponent.method'
	 * eventName: {
	 *   destComponent1: 'method',
	 *   destComponent2: 'transforms | method',
	 *   ...
	 * }
	 *
	 * @author Brian Cavalier
	 * @author John Hann
	 */
	
	(function (define) {
		'use strict';
	
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var when, array, pipeline;
	
			when = __webpack_require__(3);
			array = __webpack_require__(33);
			pipeline = __webpack_require__(54);
	
			return {
				parse: parse,
				parseIncoming: parseIncoming,
				parseOutgoing: parseOutgoing,
				removeAll: removeAll
			};
	
			function removeAll(connections) {
				connections.forEach(function (c) {
					c.remove();
				});
			}
	
			/**
	   * Determines if the connections are incoming or outgoing, and invokes parseIncoming
	   * or parseOutgoing accordingly.
	   * @param proxy
	   * @param connect
	   * @param options
	   * @param wire {Function} wire function to use to wire, resolve references, and get proxies
	   * @param createConnection {Function} callback that will do the work of creating
	   *  the actual connection from the parsed information
	   * @return {Promise} promise that resolves when connections have been created, or
	   *  rejects if an error occurs.
	   */
			function parse(proxy, connect, options, wire, createConnection) {
				var source, eventName;
	
				// First, determine the direction of the connection(s)
				// If ref is a method on target, connect it to another object's method, i.e. calling a method on target
				// causes a method on the other object to be called.
				// If ref is a reference to another object, connect that object's method to a method on target, i.e.
				// calling a method on the other object causes a method on target to be called.
	
				source = connect.split('.');
				eventName = source[1];
				source = source[0];
	
				return when(wire.getProxy(source), function (srcProxy) {
					return parseIncoming(srcProxy, eventName, proxy, connect, options, wire, createConnection);
				}, function () {
					return parseOutgoing(proxy, connect, options, wire, createConnection);
				});
			}
	
			/**
	   * Parse incoming connections and call createConnection to do the work of
	   * creating the connection.
	   *
	   * @param source
	   * @param eventName
	   * @param targetProxy
	   * @param connect
	   * @param options
	   * @param wire {Function} wire function to use to wire, resolve references, and get proxies
	   * @param createConnection {Function} callback that will do the work of creating
	   *  the actual connection from the parsed information
	   * @return {Promise} promise that resolves when connections have been created, or
	   *  rejects if an error occurs.
	   */
			function parseIncoming(source, eventName, targetProxy, connect, options, wire, createConnection) {
				var promise, methodNames;
	
				if (eventName) {
					// 'component.eventName': 'methodName'
					// 'component.eventName': 'transform | methodName'
	
					methodNames = Array.isArray(options) ? options : [options];
	
					promise = when.map(methodNames, function (methodName) {
						return pipeline(targetProxy, methodName, wire).then(function (func) {
							var invoker = proxyInvoker(targetProxy, func);
	
							return createConnection(source, eventName, invoker);
						});
					});
				} else {
					// componentName: {
					//   eventName: 'methodName'
					//   eventName: 'transform | methodName'
					// }
	
					promise = wire.getProxy(connect).then(function (srcProxy) {
						var name, promises;
	
						function createConnectionFactory(srcProxy, name, targetProxy) {
							return function (func) {
								var invoker = proxyInvoker(targetProxy, func);
	
								return createConnection(srcProxy, name, invoker);
							};
						}
	
						promises = [];
						for (name in options) {
							var connectionFactory, composed;
	
							connectionFactory = createConnectionFactory(srcProxy, name, targetProxy);
							composed = pipeline(targetProxy, options[name], wire);
	
							promises.push(composed.then(connectionFactory));
						}
	
						return when.all(promises);
					});
				}
	
				return promise;
			}
	
			/**
	   * Parse outgoing connections and call createConnection to do the actual work of
	   * creating the connection.  Supported forms:
	   *
	   * @param proxy
	   * @param connect
	   * @param options
	   * @param wire {Function} wire function to use to wire, resolve references, and get proxies
	   * @param createConnection {Function} callback that will do the work of creating
	   *  the actual connection from the parsed information
	   * @return {Promise} promise that resolves when connections have been created, or
	   *  rejects if an error occurs.
	   */
			function parseOutgoing(proxy, connect, options, wire, createConnection) {
				return createOutgoing(proxy, connect, proxy, options, wire, createConnection);
			}
	
			function createOutgoing(sourceProxy, eventName, targetProxy, options, wire, createConnection) {
				var promise, promises, resolveAndConnectOneOutgoing, name;
	
				function connectOneOutgoing(targetProxy, targetMethodSpec) {
					return when(pipeline(targetProxy, targetMethodSpec, wire), function (func) {
						var invoker = proxyInvoker(targetProxy, func);
						return createConnection(sourceProxy, eventName, invoker);
					});
				}
	
				if (typeof options == 'string') {
					// eventName: 'transform | componentName.methodName'
					promise = connectOneOutgoing(targetProxy, options);
				} else {
					promises = [];
	
					resolveAndConnectOneOutgoing = function resolveAndConnectOneOutgoing(targetRef, targetMethodSpec) {
						return when(wire.getProxy(targetRef), function (targetProxy) {
							return connectOneOutgoing(targetProxy, targetMethodSpec);
						});
					};
	
					if (Array.isArray(options)) {
						// eventName: [ 'methodName1', 'methodName2' ]
						for (var i = 0, t = options.length; i < t; i++) {
							promises.push(connectOneOutgoing(targetProxy, options[i]));
						}
					} else {
						// eventName: {
						//   componentName: 'methodName'
						//   componentName: 'transform | methodName'
						// }
						for (name in options) {
							promises.push(resolveAndConnectOneOutgoing(name, options[name]));
						}
					}
	
					promise = when.all(promises);
				}
	
				return promise;
			}
	
			function proxyInvoker(proxy, method) {
				return function () {
					return proxy.invoke(method, arguments);
				};
			}
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright B Cavalier & J Hann */
	
	/**
	 * wire/dom/base
	 * provides basic dom creation capabilities for plugins.
	 *
	 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
	 *
	 * Licensed under the MIT License at:
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	(function (define) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
			var WireProxy, priority, classRx, trimLeadingRx, splitClassNamesRx, nodeProxyInvoke;
	
			WireProxy = __webpack_require__(36);
			priority = __webpack_require__(42);
	
			classRx = '(\\s+|^)(classNames)(\\b(?![\\-_])|$)';
			trimLeadingRx = /^\s+/;
			splitClassNamesRx = /(\b\s+\b)|(\s+)/g;
	
			/**
	   * Adds one or more css classes to a dom element.
	   * @param el {HTMLElement}
	   * @param className {String} a single css class or several, space-delimited
	   *   css classes.
	   */
			function addClass(el, className) {
				var newClass;
	
				newClass = _stripClass(el.className, className);
	
				el.className = newClass + (newClass && className ? ' ' : '') + className;
			}
	
			/**
	   * Removes one or more css classes from a dom element.
	   * @param el {HTMLElement}
	   * @param className {String} a single css class or several, space-delimited
	   *   css classes.
	   */
			function removeClass(el, className) {
				el.className = _stripClass(el.className, className);
			}
	
			/**
	   * Adds or removes one or more css classes from a dom element.
	   * @param el {HTMLElement}
	   * @param className {String} a single css class or several, space-delimited
	   *   css classes.
	   */
			function toggleClass(el, className) {
				var unalteredClass;
	
				// save copy of what _stripClass would return if className
				// was not found
				unalteredClass = el.className.replace(trimLeadingRx, '');
	
				// remove className
				el.className = _stripClass(el.className, className);
	
				// add className if it wasn't removed
				if (unalteredClass == el.className) {
					el.className = unalteredClass + (unalteredClass && className ? ' ' : '') + className;
				}
			}
	
			/**
	   * Super fast, one-pass, non-looping routine to remove one or more
	   * space-delimited tokens from another space-delimited set of tokens.
	   * @private
	   * @param tokens
	   * @param removes
	   */
			function _stripClass(tokens, removes) {
				var rx;
	
				if (!removes) {
					return tokens;
				}
	
				// convert space-delimited tokens with bar-delimited (regexp `or`)
				removes = removes.replace(splitClassNamesRx, function (m, inner, edge) {
					// only replace inner spaces with |
					return edge ? '' : '|';
				});
	
				// create one-pass regexp
				rx = new RegExp(classRx.replace('classNames', removes), 'g');
	
				// remove all tokens in one pass (wish we could trim leading
				// spaces in the same pass! at least the trim is not a full
				// scan of the string)
				return tokens.replace(rx, '').replace(trimLeadingRx, '');
			}
	
			if (document && document.appendChild.apply) {
				// normal browsers
				nodeProxyInvoke = function jsInvoke(node, method, args) {
					if (typeof method == 'string') {
						method = node[method];
					}
					return method.apply(node, args);
				};
			} else {
				// IE 6-8 ('native' methods don't have .apply()) so we have
				// to use eval())
				nodeProxyInvoke = function evalInvoke(node, method, args) {
					var argsList;
	
					if (typeof method == 'function') {
						return method.apply(node, args);
					}
	
					// iirc, no node methods have more than 4 parameters
					// (addEventListener), so 5 should be safe. Note: IE needs
					// the exact number of arguments or it will throw!
					argsList = ['a', 'b', 'c', 'd', 'e'].slice(0, args.length).join(',');
	
					// function to execute eval (no need for global eval here
					// since the code snippet doesn't reference out-of-scope vars).
					function invoke(a, b, c, d, e) {
						/*jshint evil:true*/
						/*jshint unused:false*/
						return eval('node.' + method + '(' + argsList + ');');
					}
	
					// execute and return result
					return invoke.apply(this, args);
				};
			}
	
			function byId(id) {
				return document.getElementById(id);
			}
	
			function queryAll(selector, root) {
				return (root || document).querySelectorAll(selector);
			}
	
			function query(selector, root) {
				return (root || document).querySelector(selector);
			}
	
			/**
	   * Places a node into the DOM at the location specified around
	   * a reference node.
	   * Note: replace is problematic if the dev expects to use the node
	   * as a wire component.  The component reference will still point
	   * at the node that was replaced.
	   * @param node {HTMLElement}
	   * @param refNode {HTMLElement}
	   * @param location {String} or {Number} 'before', 'after', 'first', 'last',
	   *   or the position within the children of refNode
	   */
			function placeAt(node, refNode, location) {
				var parent, i;
	
				if ('length' in refNode) {
					for (i = 0; i < refNode.length; i++) {
						placeAt(i === 0 ? node : node.cloneNode(true), refNode[i], location);
					}
					return node;
				}
	
				parent = refNode.parentNode;
	
				// `if else` is more compressible than switch
				if (!isNaN(location)) {
					if (location < 0) {
						location = 0;
					}
					_insertBefore(refNode, node, refNode.childNodes[location]);
				} else if (location == 'at') {
					refNode.innerHTML = '';
					_appendChild(refNode, node);
				} else if (location == 'last') {
					_appendChild(refNode, node);
				} else if (location == 'first') {
					_insertBefore(refNode, node, refNode.firstChild);
				} else if (location == 'before') {
					// TODO: throw if parent missing?
					_insertBefore(parent, node, refNode);
				} else if (location == 'after') {
					// TODO: throw if parent missing?
					if (refNode == parent.lastChild) {
						_appendChild(parent, node);
					} else {
						_insertBefore(parent, node, refNode.nextSibling);
					}
				} else {
					throw new Error('Unknown dom insertion command: ' + location);
				}
	
				return node;
			}
	
			// these are for better compressibility since compressors won't
			// compress native DOM methods.
			function _insertBefore(parent, node, refNode) {
				parent.insertBefore(node, refNode);
			}
	
			function _appendChild(parent, node) {
				parent.appendChild(node);
			}
	
			function isNode(it) {
				return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? it instanceof Node : it && (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' && typeof it.nodeType === 'number' && typeof it.nodeName === 'string';
			}
	
			function NodeProxy() {}
	
			NodeProxy.prototype = {
				get: function get(name) {
					var node = this.target;
	
					if (name in node) {
						return node[name];
					} else {
						return node.getAttribute(name);
					}
				},
	
				set: function set(name, value) {
					var node = this.target;
	
					if (name in node) {
						return node[name] = value;
					} else {
						return node.setAttribute(name, value);
					}
				},
	
				invoke: function invoke(method, args) {
					return nodeProxyInvoke(this.target, method, args);
				},
	
				destroy: function destroy() {
					var node = this.target;
	
					// if we added a destroy method on the node, call it.
					// TODO: find a better way to release events instead of using this mechanism
					if (node.destroy) {
						node.destroy();
					}
					// removal from document will destroy node as soon as all
					// references to it go out of scope.
					var parent = node.parentNode;
					if (parent) {
						parent.removeChild(node);
					}
				},
	
				clone: function clone(options) {
					if (!options) {
						options = {};
					}
					// default is to clone deep (when would anybody not want deep?)
					return this.target.cloneNode(!('deep' in options) || options.deep);
				}
			};
	
			proxyNode.priority = priority.basePriority;
			function proxyNode(proxy) {
	
				if (!isNode(proxy.target)) {
					return proxy;
				}
	
				return WireProxy.extend(proxy, NodeProxy.prototype);
			}
	
			return {
	
				byId: byId,
				querySelector: query,
				querySelectorAll: queryAll,
				placeAt: placeAt,
				addClass: addClass,
				removeClass: removeClass,
				toggleClass: toggleClass,
				proxyNode: proxyNode
	
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(8));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./lib/ComponentFactory": 35,
		"./lib/ComponentFactory.js": 35,
		"./lib/Container": 28,
		"./lib/Container.js": 28,
		"./lib/Map": 34,
		"./lib/Map.js": 34,
		"./lib/ObjectProxy": 37,
		"./lib/ObjectProxy.js": 37,
		"./lib/WireContext": 30,
		"./lib/WireContext.js": 30,
		"./lib/WireProxy": 36,
		"./lib/WireProxy.js": 36,
		"./lib/advice": 29,
		"./lib/advice.js": 29,
		"./lib/array": 33,
		"./lib/array.js": 33,
		"./lib/asap": 53,
		"./lib/asap.js": 53,
		"./lib/connection": 59,
		"./lib/connection.js": 59,
		"./lib/context": 2,
		"./lib/context.js": 2,
		"./lib/dom/base": 60,
		"./lib/dom/base.js": 60,
		"./lib/functional": 52,
		"./lib/functional.js": 52,
		"./lib/graph/DirectedGraph": 45,
		"./lib/graph/DirectedGraph.js": 45,
		"./lib/graph/cyclesTracker": 46,
		"./lib/graph/cyclesTracker.js": 46,
		"./lib/graph/formatCycles": 48,
		"./lib/graph/formatCycles.js": 48,
		"./lib/graph/tarjan": 47,
		"./lib/graph/tarjan.js": 47,
		"./lib/graph/trackInflightRefs": 56,
		"./lib/graph/trackInflightRefs.js": 56,
		"./lib/instantiate": 43,
		"./lib/instantiate.js": 43,
		"./lib/invoker": 55,
		"./lib/invoker.js": 55,
		"./lib/lifecycle": 39,
		"./lib/lifecycle.js": 39,
		"./lib/loader/adapter": 25,
		"./lib/loader/adapter.js": 25,
		"./lib/loader/moduleId": 27,
		"./lib/loader/moduleId.js": 27,
		"./lib/loader/relative": 26,
		"./lib/loader/relative.js": 26,
		"./lib/object": 24,
		"./lib/object.js": 24,
		"./lib/pipeline": 54,
		"./lib/pipeline.js": 54,
		"./lib/plugin/basePlugin": 51,
		"./lib/plugin/basePlugin.js": 51,
		"./lib/plugin/defaultPlugins": 49,
		"./lib/plugin/defaultPlugins.js": 49,
		"./lib/plugin/priority": 42,
		"./lib/plugin/priority.js": 42,
		"./lib/plugin/registry": 41,
		"./lib/plugin/registry.js": 41,
		"./lib/plugin/wirePlugin": 50,
		"./lib/plugin/wirePlugin.js": 50,
		"./lib/resolver": 40,
		"./lib/resolver.js": 40,
		"./lib/scope": 31,
		"./lib/scope.js": 31,
		"./lib/specUtils": 44,
		"./lib/specUtils.js": 44
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 61;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=wire.build.js.map