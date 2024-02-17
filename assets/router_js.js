define("router_js", ["exports", "@ember/polyfills", "rsvp", "route-recognizer"], function (_exports, _polyfills, _rsvp, _routeRecognizer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.TransitionState = _exports.TransitionError = _exports.STATE_SYMBOL = _exports.QUERY_PARAMS_SYMBOL = _exports.PARAMS_SYMBOL = _exports.InternalTransition = _exports.InternalRouteInfo = void 0;
  _exports.logAbort = logAbort;
  function buildTransitionAborted() {
    var error = new Error('TransitionAborted');
    error.name = 'TransitionAborted';
    error.code = 'TRANSITION_ABORTED';
    return error;
  }
  function isTransitionAborted(maybeError) {
    return typeof maybeError === 'object' && maybeError !== null && maybeError.code === 'TRANSITION_ABORTED';
  }
  function isAbortable(maybeAbortable) {
    return typeof maybeAbortable === 'object' && maybeAbortable !== null && typeof maybeAbortable.isAborted === 'boolean';
  }
  function throwIfAborted(maybe) {
    if (isAbortable(maybe) && maybe.isAborted) {
      throw buildTransitionAborted();
    }
  }
  var slice = Array.prototype.slice;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
    Determines if an object is Promise by checking if it is "thenable".
  **/
  function isPromise(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
  }
  function merge(hash, other) {
    for (var prop in other) {
      if (hasOwnProperty.call(other, prop)) {
        hash[prop] = other[prop];
      }
    }
  }
  /**
    @private
  
    Extracts query params from the end of an array
  **/
  function extractQueryParams(array) {
    var len = array && array.length,
      head,
      queryParams;
    if (len && len > 0) {
      var obj = array[len - 1];
      if (isQueryParams(obj)) {
        queryParams = obj.queryParams;
        head = slice.call(array, 0, len - 1);
        return [head, queryParams];
      }
    }
    return [array, null];
  }
  function isQueryParams(obj) {
    return obj && hasOwnProperty.call(obj, 'queryParams');
  }
  /**
    @private
  
    Coerces query param properties and array elements into strings.
  **/
  function coerceQueryParamsToString(queryParams) {
    for (var key in queryParams) {
      var val = queryParams[key];
      if (typeof val === 'number') {
        queryParams[key] = '' + val;
      } else if (Array.isArray(val)) {
        for (var i = 0, l = val.length; i < l; i++) {
          val[i] = '' + val[i];
        }
      }
    }
  }
  /**
    @private
   */
  function log(router) {
    if (!router.log) {
      return;
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (args.length === 2) {
      var [sequence, msg] = args;
      router.log('Transition #' + sequence + ': ' + msg);
    } else {
      var [_msg] = args;
      router.log(_msg);
    }
  }
  function isParam(object) {
    return typeof object === 'string' || object instanceof String || typeof object === 'number' || object instanceof Number;
  }
  function forEach(array, callback) {
    for (var i = 0, l = array.length; i < l && callback(array[i]) !== false; i++) {
      // empty intentionally
    }
  }
  function getChangelist(oldObject, newObject) {
    var key;
    var results = {
      all: {},
      changed: {},
      removed: {}
    };
    merge(results.all, newObject);
    var didChange = false;
    coerceQueryParamsToString(oldObject);
    coerceQueryParamsToString(newObject);
    // Calculate removals
    for (key in oldObject) {
      if (hasOwnProperty.call(oldObject, key)) {
        if (!hasOwnProperty.call(newObject, key)) {
          didChange = true;
          results.removed[key] = oldObject[key];
        }
      }
    }
    // Calculate changes
    for (key in newObject) {
      if (hasOwnProperty.call(newObject, key)) {
        var oldElement = oldObject[key];
        var newElement = newObject[key];
        if (isArray(oldElement) && isArray(newElement)) {
          if (oldElement.length !== newElement.length) {
            results.changed[key] = newObject[key];
            didChange = true;
          } else {
            for (var i = 0, l = oldElement.length; i < l; i++) {
              if (oldElement[i] !== newElement[i]) {
                results.changed[key] = newObject[key];
                didChange = true;
              }
            }
          }
        } else if (oldObject[key] !== newObject[key]) {
          results.changed[key] = newObject[key];
          didChange = true;
        }
      }
    }
    return didChange ? results : undefined;
  }
  function isArray(obj) {
    return Array.isArray(obj);
  }
  function promiseLabel(label) {
    return 'Router: ' + label;
  }
  var STATE_SYMBOL = `__STATE__-2619860001345920-3322w3`;
  _exports.STATE_SYMBOL = STATE_SYMBOL;
  var PARAMS_SYMBOL = `__PARAMS__-261986232992830203-23323`;
  _exports.PARAMS_SYMBOL = PARAMS_SYMBOL;
  var QUERY_PARAMS_SYMBOL = `__QPS__-2619863929824844-32323`;
  /**
    A Transition is a thenable (a promise-like object) that represents
    an attempt to transition to another route. It can be aborted, either
    explicitly via `abort` or by attempting another transition while a
    previous one is still underway. An aborted transition can also
    be `retry()`d later.
  
    @class Transition
    @constructor
    @param {Object} router
    @param {Object} intent
    @param {Object} state
    @param {Object} error
    @private
   */
  _exports.QUERY_PARAMS_SYMBOL = QUERY_PARAMS_SYMBOL;
  class Transition {
    constructor(router, intent, state, error, previousTransition) {
      if (error === void 0) {
        error = undefined;
      }
      if (previousTransition === void 0) {
        previousTransition = undefined;
      }
      this.from = null;
      this.to = undefined;
      this.isAborted = false;
      this.isActive = true;
      this.urlMethod = 'update';
      this.resolveIndex = 0;
      this.queryParamsOnly = false;
      this.isTransition = true;
      this.isCausedByAbortingTransition = false;
      this.isCausedByInitialTransition = false;
      this.isCausedByAbortingReplaceTransition = false;
      this._visibleQueryParams = {};
      this.isIntermediate = false;
      this[STATE_SYMBOL] = state || router.state;
      this.intent = intent;
      this.router = router;
      this.data = intent && intent.data || {};
      this.resolvedModels = {};
      this[QUERY_PARAMS_SYMBOL] = {};
      this.promise = undefined;
      this.error = undefined;
      this[PARAMS_SYMBOL] = {};
      this.routeInfos = [];
      this.targetName = undefined;
      this.pivotHandler = undefined;
      this.sequence = -1;
      if (false /* DEBUG */) {
        var _error = new Error(`Transition creation stack`);
        this.debugCreationStack = () => _error.stack;
        // not aborted yet, will be replaced when `this.isAborted` is set
        this.debugAbortStack = () => undefined;
        this.debugPreviousTransition = previousTransition;
      }
      if (error) {
        this.promise = _rsvp.Promise.reject(error);
        this.error = error;
        return;
      }
      // if you're doing multiple redirects, need the new transition to know if it
      // is actually part of the first transition or not. Any further redirects
      // in the initial transition also need to know if they are part of the
      // initial transition
      this.isCausedByAbortingTransition = !!previousTransition;
      this.isCausedByInitialTransition = !!previousTransition && (previousTransition.isCausedByInitialTransition || previousTransition.sequence === 0);
      // Every transition in the chain is a replace
      this.isCausedByAbortingReplaceTransition = !!previousTransition && previousTransition.urlMethod === 'replace' && (!previousTransition.isCausedByAbortingTransition || previousTransition.isCausedByAbortingReplaceTransition);
      if (state) {
        this[PARAMS_SYMBOL] = state.params;
        this[QUERY_PARAMS_SYMBOL] = state.queryParams;
        this.routeInfos = state.routeInfos;
        var len = state.routeInfos.length;
        if (len) {
          this.targetName = state.routeInfos[len - 1].name;
        }
        for (var i = 0; i < len; ++i) {
          var handlerInfo = state.routeInfos[i];
          // TODO: this all seems hacky
          if (!handlerInfo.isResolved) {
            break;
          }
          this.pivotHandler = handlerInfo.route;
        }
        this.sequence = router.currentSequence++;
        this.promise = state.resolve(this).catch(result => {
          var error = this.router.transitionDidError(result, this);
          throw error;
        }, promiseLabel('Handle Abort'));
      } else {
        this.promise = _rsvp.Promise.resolve(this[STATE_SYMBOL]);
        this[PARAMS_SYMBOL] = {};
      }
    }
    /**
      The Transition's internal promise. Calling `.then` on this property
      is that same as calling `.then` on the Transition object itself, but
      this property is exposed for when you want to pass around a
      Transition's promise, but not the Transition object itself, since
      Transition object can be externally `abort`ed, while the promise
      cannot.
         @property promise
      @type {Object}
      @public
     */
    /**
      Custom state can be stored on a Transition's `data` object.
      This can be useful for decorating a Transition within an earlier
      hook and shared with a later hook. Properties set on `data` will
      be copied to new transitions generated by calling `retry` on this
      transition.
         @property data
      @type {Object}
      @public
     */
    /**
      A standard promise hook that resolves if the transition
      succeeds and rejects if it fails/redirects/aborts.
         Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thenable,
      but not the Transition itself.
         @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
    then(onFulfilled, onRejected, label) {
      return this.promise.then(onFulfilled, onRejected, label);
    }
    /**
         Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thennable,
      but not the Transition itself.
         @method catch
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
    catch(onRejection, label) {
      return this.promise.catch(onRejection, label);
    }
    /**
         Forwards to the internal `promise` property which you can
      use in situations where you want to pass around a thenable,
      but not the Transition itself.
         @method finally
      @param {Function} callback
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
      @public
     */
    finally(callback, label) {
      return this.promise.finally(callback, label);
    }
    /**
      Aborts the Transition. Note you can also implicitly abort a transition
      by initiating another transition while a previous one is underway.
         @method abort
      @return {Transition} this transition
      @public
     */
    abort() {
      this.rollback();
      var transition = new Transition(this.router, undefined, undefined, undefined);
      transition.to = this.from;
      transition.from = this.from;
      transition.isAborted = true;
      this.router.routeWillChange(transition);
      this.router.routeDidChange(transition);
      return this;
    }
    rollback() {
      if (!this.isAborted) {
        log(this.router, this.sequence, this.targetName + ': transition was aborted');
        if (false /* DEBUG */) {
          var error = new Error(`Transition aborted stack`);
          this.debugAbortStack = () => error.stack;
        }
        if (this.intent !== undefined && this.intent !== null) {
          this.intent.preTransitionState = this.router.state;
        }
        this.isAborted = true;
        this.isActive = false;
        this.router.activeTransition = undefined;
      }
    }
    redirect(newTransition) {
      this.rollback();
      this.router.routeWillChange(newTransition);
    }
    /**
         Retries a previously-aborted transition (making sure to abort the
      transition if it's still active). Returns a new transition that
      represents the new attempt to transition.
         @method retry
      @return {Transition} new transition
      @public
     */
    retry() {
      // TODO: add tests for merged state retry()s
      this.abort();
      var newTransition = this.router.transitionByIntent(this.intent, false);
      // inheriting a `null` urlMethod is not valid
      // the urlMethod is only set to `null` when
      // the transition is initiated *after* the url
      // has been updated (i.e. `router.handleURL`)
      //
      // in that scenario, the url method cannot be
      // inherited for a new transition because then
      // the url would not update even though it should
      if (this.urlMethod !== null) {
        newTransition.method(this.urlMethod);
      }
      return newTransition;
    }
    /**
         Sets the URL-changing method to be employed at the end of a
      successful transition. By default, a new Transition will just
      use `updateURL`, but passing 'replace' to this method will
      cause the URL to update using 'replaceWith' instead. Omitting
      a parameter will disable the URL change, allowing for transitions
      that don't update the URL at completion (this is also used for
      handleURL, since the URL has already changed before the
      transition took place).
         @method method
      @param {String} method the type of URL-changing method to use
        at the end of a transition. Accepted values are 'replace',
        falsy values, or any other non-falsy value (which is
        interpreted as an updateURL transition).
         @return {Transition} this transition
      @public
     */
    method(method) {
      this.urlMethod = method;
      return this;
    }
    // Alias 'trigger' as 'send'
    send(ignoreFailure, _name, err, transition, handler) {
      if (ignoreFailure === void 0) {
        ignoreFailure = false;
      }
      this.trigger(ignoreFailure, _name, err, transition, handler);
    }
    /**
         Fires an event on the current list of resolved/resolving
      handlers within this transition. Useful for firing events
      on route hierarchies that haven't fully been entered yet.
         Note: This method is also aliased as `send`
         @method trigger
      @param {Boolean} [ignoreFailure=false] a boolean specifying whether unhandled events throw an error
      @param {String} name the name of the event to fire
      @public
     */
    trigger(ignoreFailure, name) {
      if (ignoreFailure === void 0) {
        ignoreFailure = false;
      }
      // TODO: Deprecate the current signature
      if (typeof ignoreFailure === 'string') {
        name = ignoreFailure;
        ignoreFailure = false;
      }
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      this.router.triggerEvent(this[STATE_SYMBOL].routeInfos.slice(0, this.resolveIndex + 1), ignoreFailure, name, args);
    }
    /**
      Transitions are aborted and their promises rejected
      when redirects occur; this method returns a promise
      that will follow any redirects that occur and fulfill
      with the value fulfilled by any redirecting transitions
      that occur.
         @method followRedirects
      @return {Promise} a promise that fulfills with the same
        value that the final redirecting transition fulfills with
      @public
     */
    followRedirects() {
      var router = this.router;
      return this.promise.catch(function (reason) {
        if (router.activeTransition) {
          return router.activeTransition.followRedirects();
        }
        return _rsvp.Promise.reject(reason);
      });
    }
    toString() {
      return 'Transition (sequence ' + this.sequence + ')';
    }
    /**
      @private
     */
    log(message) {
      log(this.router, this.sequence, message);
    }
  }
  /**
    @private
  
    Logs and returns an instance of TransitionAborted.
   */
  _exports.InternalTransition = Transition;
  function logAbort(transition) {
    log(transition.router, transition.sequence, 'detected abort.');
    return buildTransitionAborted();
  }
  function isTransition(obj) {
    return typeof obj === 'object' && obj instanceof Transition && obj.isTransition;
  }
  function prepareResult(obj) {
    if (isTransition(obj)) {
      return null;
    }
    return obj;
  }
  var ROUTE_INFOS = new WeakMap();
  function toReadOnlyRouteInfo(routeInfos, queryParams, includeAttributes) {
    if (queryParams === void 0) {
      queryParams = {};
    }
    if (includeAttributes === void 0) {
      includeAttributes = false;
    }
    return routeInfos.map((info, i) => {
      var {
        name,
        params,
        paramNames,
        context,
        route
      } = info;
      if (ROUTE_INFOS.has(info) && includeAttributes) {
        var _routeInfo = ROUTE_INFOS.get(info);
        _routeInfo = attachMetadata(route, _routeInfo);
        var routeInfoWithAttribute = createRouteInfoWithAttributes(_routeInfo, context);
        ROUTE_INFOS.set(info, routeInfoWithAttribute);
        return routeInfoWithAttribute;
      }
      var routeInfo = {
        find(predicate, thisArg) {
          var publicInfo;
          var arr = [];
          if (predicate.length === 3) {
            arr = routeInfos.map(info => ROUTE_INFOS.get(info));
          }
          for (var _i = 0; routeInfos.length > _i; _i++) {
            publicInfo = ROUTE_INFOS.get(routeInfos[_i]);
            if (predicate.call(thisArg, publicInfo, _i, arr)) {
              return publicInfo;
            }
          }
          return undefined;
        },
        get name() {
          return name;
        },
        get paramNames() {
          return paramNames;
        },
        get metadata() {
          return buildRouteInfoMetadata(info.route);
        },
        get parent() {
          var parent = routeInfos[i - 1];
          if (parent === undefined) {
            return null;
          }
          return ROUTE_INFOS.get(parent);
        },
        get child() {
          var child = routeInfos[i + 1];
          if (child === undefined) {
            return null;
          }
          return ROUTE_INFOS.get(child);
        },
        get localName() {
          var parts = this.name.split('.');
          return parts[parts.length - 1];
        },
        get params() {
          return params;
        },
        get queryParams() {
          return queryParams;
        }
      };
      if (includeAttributes) {
        routeInfo = createRouteInfoWithAttributes(routeInfo, context);
      }
      ROUTE_INFOS.set(info, routeInfo);
      return routeInfo;
    });
  }
  function createRouteInfoWithAttributes(routeInfo, context) {
    var attributes = {
      get attributes() {
        return context;
      }
    };
    if (!Object.isExtensible(routeInfo) || routeInfo.hasOwnProperty('attributes')) {
      return Object.freeze((0, _polyfills.assign)({}, routeInfo, attributes));
    }
    return (0, _polyfills.assign)(routeInfo, attributes);
  }
  function buildRouteInfoMetadata(route) {
    if (route !== undefined && route !== null && route.buildRouteInfoMetadata !== undefined) {
      return route.buildRouteInfoMetadata();
    }
    return null;
  }
  function attachMetadata(route, routeInfo) {
    var metadata = {
      get metadata() {
        return buildRouteInfoMetadata(route);
      }
    };
    if (!Object.isExtensible(routeInfo) || routeInfo.hasOwnProperty('metadata')) {
      return Object.freeze((0, _polyfills.assign)({}, routeInfo, metadata));
    }
    return (0, _polyfills.assign)(routeInfo, metadata);
  }
  class InternalRouteInfo {
    constructor(router, name, paramNames, route) {
      this._routePromise = undefined;
      this._route = null;
      this.params = {};
      this.isResolved = false;
      this.name = name;
      this.paramNames = paramNames;
      this.router = router;
      if (route) {
        this._processRoute(route);
      }
    }
    getModel(_transition) {
      return _rsvp.Promise.resolve(this.context);
    }
    serialize(_context) {
      return this.params || {};
    }
    resolve(transition) {
      return _rsvp.Promise.resolve(this.routePromise).then(route => {
        throwIfAborted(transition);
        return route;
      }).then(() => this.runBeforeModelHook(transition)).then(() => throwIfAborted(transition)).then(() => this.getModel(transition)).then(resolvedModel => {
        throwIfAborted(transition);
        return resolvedModel;
      }).then(resolvedModel => this.runAfterModelHook(transition, resolvedModel)).then(resolvedModel => this.becomeResolved(transition, resolvedModel));
    }
    becomeResolved(transition, resolvedContext) {
      var params = this.serialize(resolvedContext);
      if (transition) {
        this.stashResolvedModel(transition, resolvedContext);
        transition[PARAMS_SYMBOL] = transition[PARAMS_SYMBOL] || {};
        transition[PARAMS_SYMBOL][this.name] = params;
      }
      var context;
      var contextsMatch = resolvedContext === this.context;
      if ('context' in this || !contextsMatch) {
        context = resolvedContext;
      }
      var cached = ROUTE_INFOS.get(this);
      var resolved = new ResolvedRouteInfo(this.router, this.name, this.paramNames, params, this.route, context);
      if (cached !== undefined) {
        ROUTE_INFOS.set(resolved, cached);
      }
      return resolved;
    }
    shouldSupersede(routeInfo) {
      // Prefer this newer routeInfo over `other` if:
      // 1) The other one doesn't exist
      // 2) The names don't match
      // 3) This route has a context that doesn't match
      //    the other one (or the other one doesn't have one).
      // 4) This route has parameters that don't match the other.
      if (!routeInfo) {
        return true;
      }
      var contextsMatch = routeInfo.context === this.context;
      return routeInfo.name !== this.name || 'context' in this && !contextsMatch || this.hasOwnProperty('params') && !paramsMatch(this.params, routeInfo.params);
    }
    get route() {
      // _route could be set to either a route object or undefined, so we
      // compare against null to know when it's been set
      if (this._route !== null) {
        return this._route;
      }
      return this.fetchRoute();
    }
    set route(route) {
      this._route = route;
    }
    get routePromise() {
      if (this._routePromise) {
        return this._routePromise;
      }
      this.fetchRoute();
      return this._routePromise;
    }
    set routePromise(routePromise) {
      this._routePromise = routePromise;
    }
    log(transition, message) {
      if (transition.log) {
        transition.log(this.name + ': ' + message);
      }
    }
    updateRoute(route) {
      route._internalName = this.name;
      return this.route = route;
    }
    runBeforeModelHook(transition) {
      if (transition.trigger) {
        transition.trigger(true, 'willResolveModel', transition, this.route);
      }
      var result;
      if (this.route) {
        if (this.route.beforeModel !== undefined) {
          result = this.route.beforeModel(transition);
        }
      }
      if (isTransition(result)) {
        result = null;
      }
      return _rsvp.Promise.resolve(result);
    }
    runAfterModelHook(transition, resolvedModel) {
      // Stash the resolved model on the payload.
      // This makes it possible for users to swap out
      // the resolved model in afterModel.
      var name = this.name;
      this.stashResolvedModel(transition, resolvedModel);
      var result;
      if (this.route !== undefined) {
        if (this.route.afterModel !== undefined) {
          result = this.route.afterModel(resolvedModel, transition);
        }
      }
      result = prepareResult(result);
      return _rsvp.Promise.resolve(result).then(() => {
        // Ignore the fulfilled value returned from afterModel.
        // Return the value stashed in resolvedModels, which
        // might have been swapped out in afterModel.
        return transition.resolvedModels[name];
      });
    }
    stashResolvedModel(transition, resolvedModel) {
      transition.resolvedModels = transition.resolvedModels || {};
      transition.resolvedModels[this.name] = resolvedModel;
    }
    fetchRoute() {
      var route = this.router.getRoute(this.name);
      return this._processRoute(route);
    }
    _processRoute(route) {
      // Setup a routePromise so that we can wait for asynchronously loaded routes
      this.routePromise = _rsvp.Promise.resolve(route);
      // Wait until the 'route' property has been updated when chaining to a route
      // that is a promise
      if (isPromise(route)) {
        this.routePromise = this.routePromise.then(r => {
          return this.updateRoute(r);
        });
        // set to undefined to avoid recursive loop in the route getter
        return this.route = undefined;
      } else if (route) {
        return this.updateRoute(route);
      }
      return undefined;
    }
  }
  _exports.InternalRouteInfo = InternalRouteInfo;
  class ResolvedRouteInfo extends InternalRouteInfo {
    constructor(router, name, paramNames, params, route, context) {
      super(router, name, paramNames, route);
      this.params = params;
      this.isResolved = true;
      this.context = context;
    }
    resolve(transition) {
      // A ResolvedRouteInfo just resolved with itself.
      if (transition && transition.resolvedModels) {
        transition.resolvedModels[this.name] = this.context;
      }
      return _rsvp.Promise.resolve(this);
    }
  }
  class UnresolvedRouteInfoByParam extends InternalRouteInfo {
    constructor(router, name, paramNames, params, route) {
      super(router, name, paramNames, route);
      this.params = {};
      this.params = params;
    }
    getModel(transition) {
      var fullParams = this.params;
      if (transition && transition[QUERY_PARAMS_SYMBOL]) {
        fullParams = {};
        merge(fullParams, this.params);
        fullParams.queryParams = transition[QUERY_PARAMS_SYMBOL];
      }
      var route = this.route;
      var result;
      if (route.deserialize) {
        result = route.deserialize(fullParams, transition);
      } else if (route.model) {
        result = route.model(fullParams, transition);
      }
      if (result && isTransition(result)) {
        result = undefined;
      }
      return _rsvp.Promise.resolve(result);
    }
  }
  class UnresolvedRouteInfoByObject extends InternalRouteInfo {
    constructor(router, name, paramNames, context) {
      super(router, name, paramNames);
      this.context = context;
      this.serializer = this.router.getSerializer(name);
    }
    getModel(transition) {
      if (this.router.log !== undefined) {
        this.router.log(this.name + ': resolving provided model');
      }
      return super.getModel(transition);
    }
    /**
      @private
         Serializes a route using its custom `serialize` method or
      by a default that looks up the expected property name from
      the dynamic segment.
         @param {Object} model the model to be serialized for this route
    */
    serialize(model) {
      var {
        paramNames,
        context
      } = this;
      if (!model) {
        model = context;
      }
      var object = {};
      if (isParam(model)) {
        object[paramNames[0]] = model;
        return object;
      }
      // Use custom serialize if it exists.
      if (this.serializer) {
        // invoke this.serializer unbound (getSerializer returns a stateless function)
        return this.serializer.call(null, model, paramNames);
      } else if (this.route !== undefined) {
        if (this.route.serialize) {
          return this.route.serialize(model, paramNames);
        }
      }
      if (paramNames.length !== 1) {
        return;
      }
      var name = paramNames[0];
      if (/_id$/.test(name)) {
        object[name] = model.id;
      } else {
        object[name] = model;
      }
      return object;
    }
  }
  function paramsMatch(a, b) {
    if (!a !== !b) {
      // Only one is null.
      return false;
    }
    if (!a) {
      // Both must be null.
      return true;
    }
    // Note: this assumes that both params have the same
    // number of keys, but since we're comparing the
    // same routes, they should.
    for (var k in a) {
      if (a.hasOwnProperty(k) && a[k] !== b[k]) {
        return false;
      }
    }
    return true;
  }
  class TransitionIntent {
    constructor(router, data) {
      if (data === void 0) {
        data = {};
      }
      this.router = router;
      this.data = data;
    }
  }
  function handleError(currentState, transition, error) {
    // This is the only possible
    // reject value of TransitionState#resolve
    var routeInfos = currentState.routeInfos;
    var errorHandlerIndex = transition.resolveIndex >= routeInfos.length ? routeInfos.length - 1 : transition.resolveIndex;
    var wasAborted = transition.isAborted;
    throw new TransitionError(error, currentState.routeInfos[errorHandlerIndex].route, wasAborted, currentState);
  }
  function resolveOneRouteInfo(currentState, transition) {
    if (transition.resolveIndex === currentState.routeInfos.length) {
      // This is is the only possible
      // fulfill value of TransitionState#resolve
      return;
    }
    var routeInfo = currentState.routeInfos[transition.resolveIndex];
    return routeInfo.resolve(transition).then(proceed.bind(null, currentState, transition), null, currentState.promiseLabel('Proceed'));
  }
  function proceed(currentState, transition, resolvedRouteInfo) {
    var wasAlreadyResolved = currentState.routeInfos[transition.resolveIndex].isResolved;
    // Swap the previously unresolved routeInfo with
    // the resolved routeInfo
    currentState.routeInfos[transition.resolveIndex++] = resolvedRouteInfo;
    if (!wasAlreadyResolved) {
      // Call the redirect hook. The reason we call it here
      // vs. afterModel is so that redirects into child
      // routes don't re-run the model hooks for this
      // already-resolved route.
      var {
        route
      } = resolvedRouteInfo;
      if (route !== undefined) {
        if (route.redirect) {
          route.redirect(resolvedRouteInfo.context, transition);
        }
      }
    }
    // Proceed after ensuring that the redirect hook
    // didn't abort this transition by transitioning elsewhere.
    throwIfAborted(transition);
    return resolveOneRouteInfo(currentState, transition);
  }
  class TransitionState {
    constructor() {
      this.routeInfos = [];
      this.queryParams = {};
      this.params = {};
    }
    promiseLabel(label) {
      var targetName = '';
      forEach(this.routeInfos, function (routeInfo) {
        if (targetName !== '') {
          targetName += '.';
        }
        targetName += routeInfo.name;
        return true;
      });
      return promiseLabel("'" + targetName + "': " + label);
    }
    resolve(transition) {
      // First, calculate params for this state. This is useful
      // information to provide to the various route hooks.
      var params = this.params;
      forEach(this.routeInfos, routeInfo => {
        params[routeInfo.name] = routeInfo.params || {};
        return true;
      });
      transition.resolveIndex = 0;
      // The prelude RSVP.resolve() async moves us into the promise land.
      return _rsvp.Promise.resolve(null, this.promiseLabel('Start transition')).then(resolveOneRouteInfo.bind(null, this, transition), null, this.promiseLabel('Resolve route')).catch(handleError.bind(null, this, transition), this.promiseLabel('Handle error')).then(() => this);
    }
  }
  _exports.TransitionState = TransitionState;
  class TransitionError {
    constructor(error, route, wasAborted, state) {
      this.error = error;
      this.route = route;
      this.wasAborted = wasAborted;
      this.state = state;
    }
  }
  _exports.TransitionError = TransitionError;
  class NamedTransitionIntent extends TransitionIntent {
    constructor(router, name, pivotHandler, contexts, queryParams, data) {
      if (contexts === void 0) {
        contexts = [];
      }
      if (queryParams === void 0) {
        queryParams = {};
      }
      super(router, data);
      this.preTransitionState = undefined;
      this.name = name;
      this.pivotHandler = pivotHandler;
      this.contexts = contexts;
      this.queryParams = queryParams;
    }
    applyToState(oldState, isIntermediate) {
      // TODO: WTF fix me
      var partitionedArgs = extractQueryParams([this.name].concat(this.contexts)),
        pureArgs = partitionedArgs[0],
        handlers = this.router.recognizer.handlersFor(pureArgs[0]);
      var targetRouteName = handlers[handlers.length - 1].handler;
      return this.applyToHandlers(oldState, handlers, targetRouteName, isIntermediate, false);
    }
    applyToHandlers(oldState, parsedHandlers, targetRouteName, isIntermediate, checkingIfActive) {
      var i, len;
      var newState = new TransitionState();
      var objects = this.contexts.slice(0);
      var invalidateIndex = parsedHandlers.length;
      // Pivot handlers are provided for refresh transitions
      if (this.pivotHandler) {
        for (i = 0, len = parsedHandlers.length; i < len; ++i) {
          if (parsedHandlers[i].handler === this.pivotHandler._internalName) {
            invalidateIndex = i;
            break;
          }
        }
      }
      for (i = parsedHandlers.length - 1; i >= 0; --i) {
        var result = parsedHandlers[i];
        var name = result.handler;
        var oldHandlerInfo = oldState.routeInfos[i];
        var newHandlerInfo = null;
        if (result.names.length > 0) {
          if (i >= invalidateIndex) {
            newHandlerInfo = this.createParamHandlerInfo(name, result.names, objects, oldHandlerInfo);
          } else {
            newHandlerInfo = this.getHandlerInfoForDynamicSegment(name, result.names, objects, oldHandlerInfo, targetRouteName, i);
          }
        } else {
          // This route has no dynamic segment.
          // Therefore treat as a param-based handlerInfo
          // with empty params. This will cause the `model`
          // hook to be called with empty params, which is desirable.
          newHandlerInfo = this.createParamHandlerInfo(name, result.names, objects, oldHandlerInfo);
        }
        if (checkingIfActive) {
          // If we're performing an isActive check, we want to
          // serialize URL params with the provided context, but
          // ignore mismatches between old and new context.
          newHandlerInfo = newHandlerInfo.becomeResolved(null, newHandlerInfo.context);
          var oldContext = oldHandlerInfo && oldHandlerInfo.context;
          if (result.names.length > 0 && oldHandlerInfo.context !== undefined && newHandlerInfo.context === oldContext) {
            // If contexts match in isActive test, assume params also match.
            // This allows for flexibility in not requiring that every last
            // handler provide a `serialize` method
            newHandlerInfo.params = oldHandlerInfo && oldHandlerInfo.params;
          }
          newHandlerInfo.context = oldContext;
        }
        var handlerToUse = oldHandlerInfo;
        if (i >= invalidateIndex || newHandlerInfo.shouldSupersede(oldHandlerInfo)) {
          invalidateIndex = Math.min(i, invalidateIndex);
          handlerToUse = newHandlerInfo;
        }
        if (isIntermediate && !checkingIfActive) {
          handlerToUse = handlerToUse.becomeResolved(null, handlerToUse.context);
        }
        newState.routeInfos.unshift(handlerToUse);
      }
      if (objects.length > 0) {
        throw new Error('More context objects were passed than there are dynamic segments for the route: ' + targetRouteName);
      }
      if (!isIntermediate) {
        this.invalidateChildren(newState.routeInfos, invalidateIndex);
      }
      merge(newState.queryParams, this.queryParams || {});
      if (isIntermediate && oldState.queryParams) {
        merge(newState.queryParams, oldState.queryParams);
      }
      return newState;
    }
    invalidateChildren(handlerInfos, invalidateIndex) {
      for (var i = invalidateIndex, l = handlerInfos.length; i < l; ++i) {
        var handlerInfo = handlerInfos[i];
        if (handlerInfo.isResolved) {
          var {
            name,
            params,
            route,
            paramNames
          } = handlerInfos[i];
          handlerInfos[i] = new UnresolvedRouteInfoByParam(this.router, name, paramNames, params, route);
        }
      }
    }
    getHandlerInfoForDynamicSegment(name, names, objects, oldHandlerInfo, _targetRouteName, i) {
      var objectToUse;
      if (objects.length > 0) {
        // Use the objects provided for this transition.
        objectToUse = objects[objects.length - 1];
        if (isParam(objectToUse)) {
          return this.createParamHandlerInfo(name, names, objects, oldHandlerInfo);
        } else {
          objects.pop();
        }
      } else if (oldHandlerInfo && oldHandlerInfo.name === name) {
        // Reuse the matching oldHandlerInfo
        return oldHandlerInfo;
      } else {
        if (this.preTransitionState) {
          var preTransitionHandlerInfo = this.preTransitionState.routeInfos[i];
          objectToUse = preTransitionHandlerInfo && preTransitionHandlerInfo.context;
        } else {
          // Ideally we should throw this error to provide maximal
          // information to the user that not enough context objects
          // were provided, but this proves too cumbersome in Ember
          // in cases where inner template helpers are evaluated
          // before parent helpers un-render, in which cases this
          // error somewhat prematurely fires.
          //throw new Error("Not enough context objects were provided to complete a transition to " + targetRouteName + ". Specifically, the " + name + " route needs an object that can be serialized into its dynamic URL segments [" + names.join(', ') + "]");
          return oldHandlerInfo;
        }
      }
      return new UnresolvedRouteInfoByObject(this.router, name, names, objectToUse);
    }
    createParamHandlerInfo(name, names, objects, oldHandlerInfo) {
      var params = {};
      // Soak up all the provided string/numbers
      var numNames = names.length;
      var missingParams = [];
      while (numNames--) {
        // Only use old params if the names match with the new handler
        var oldParams = oldHandlerInfo && name === oldHandlerInfo.name && oldHandlerInfo.params || {};
        var peek = objects[objects.length - 1];
        var paramName = names[numNames];
        if (isParam(peek)) {
          params[paramName] = '' + objects.pop();
        } else {
          // If we're here, this means only some of the params
          // were string/number params, so try and use a param
          // value from a previous handler.
          if (oldParams.hasOwnProperty(paramName)) {
            params[paramName] = oldParams[paramName];
          } else {
            missingParams.push(paramName);
          }
        }
      }
      if (missingParams.length > 0) {
        throw new Error(`You didn't provide enough string/numeric parameters to satisfy all of the dynamic segments for route ${name}.` + ` Missing params: ${missingParams}`);
      }
      return new UnresolvedRouteInfoByParam(this.router, name, names, params);
    }
  }
  var UnrecognizedURLError = function () {
    UnrecognizedURLError.prototype = Object.create(Error.prototype);
    UnrecognizedURLError.prototype.constructor = UnrecognizedURLError;
    function UnrecognizedURLError(message) {
      var error = Error.call(this, message);
      this.name = 'UnrecognizedURLError';
      this.message = message || 'UnrecognizedURL';
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UnrecognizedURLError);
      } else {
        this.stack = error.stack;
      }
    }
    return UnrecognizedURLError;
  }();
  class URLTransitionIntent extends TransitionIntent {
    constructor(router, url, data) {
      super(router, data);
      this.url = url;
      this.preTransitionState = undefined;
    }
    applyToState(oldState) {
      var newState = new TransitionState();
      var results = this.router.recognizer.recognize(this.url),
        i,
        len;
      if (!results) {
        throw new UnrecognizedURLError(this.url);
      }
      var statesDiffer = false;
      var _url = this.url;
      // Checks if a handler is accessible by URL. If it is not, an error is thrown.
      // For the case where the handler is loaded asynchronously, the error will be
      // thrown once it is loaded.
      function checkHandlerAccessibility(handler) {
        if (handler && handler.inaccessibleByURL) {
          throw new UnrecognizedURLError(_url);
        }
        return handler;
      }
      for (i = 0, len = results.length; i < len; ++i) {
        var result = results[i];
        var name = result.handler;
        var paramNames = [];
        if (this.router.recognizer.hasRoute(name)) {
          paramNames = this.router.recognizer.handlersFor(name)[i].names;
        }
        var newRouteInfo = new UnresolvedRouteInfoByParam(this.router, name, paramNames, result.params);
        var route = newRouteInfo.route;
        if (route) {
          checkHandlerAccessibility(route);
        } else {
          // If the handler is being loaded asynchronously, check if we can
          // access it after it has resolved
          newRouteInfo.routePromise = newRouteInfo.routePromise.then(checkHandlerAccessibility);
        }
        var oldRouteInfo = oldState.routeInfos[i];
        if (statesDiffer || newRouteInfo.shouldSupersede(oldRouteInfo)) {
          statesDiffer = true;
          newState.routeInfos[i] = newRouteInfo;
        } else {
          newState.routeInfos[i] = oldRouteInfo;
        }
      }
      merge(newState.queryParams, results.queryParams);
      return newState;
    }
  }
  class Router {
    constructor(logger) {
      this._lastQueryParams = {};
      this.state = undefined;
      this.oldState = undefined;
      this.activeTransition = undefined;
      this.currentRouteInfos = undefined;
      this._changedQueryParams = undefined;
      this.currentSequence = 0;
      this.log = logger;
      this.recognizer = new _routeRecognizer.default();
      this.reset();
    }
    /**
      The main entry point into the router. The API is essentially
      the same as the `map` method in `route-recognizer`.
         This method extracts the String handler at the last `.to()`
      call and uses it as the name of the whole route.
         @param {Function} callback
    */
    map(callback) {
      this.recognizer.map(callback, function (recognizer, routes) {
        for (var i = routes.length - 1, _proceed = true; i >= 0 && _proceed; --i) {
          var route = routes[i];
          var handler = route.handler;
          recognizer.add(routes, {
            as: handler
          });
          _proceed = route.path === '/' || route.path === '' || handler.slice(-6) === '.index';
        }
      });
    }
    hasRoute(route) {
      return this.recognizer.hasRoute(route);
    }
    queryParamsTransition(changelist, wasTransitioning, oldState, newState) {
      this.fireQueryParamDidChange(newState, changelist);
      if (!wasTransitioning && this.activeTransition) {
        // One of the routes in queryParamsDidChange
        // caused a transition. Just return that transition.
        return this.activeTransition;
      } else {
        // Running queryParamsDidChange didn't change anything.
        // Just update query params and be on our way.
        // We have to return a noop transition that will
        // perform a URL update at the end. This gives
        // the user the ability to set the url update
        // method (default is replaceState).
        var newTransition = new Transition(this, undefined, undefined);
        newTransition.queryParamsOnly = true;
        oldState.queryParams = this.finalizeQueryParamChange(newState.routeInfos, newState.queryParams, newTransition);
        newTransition[QUERY_PARAMS_SYMBOL] = newState.queryParams;
        this.toReadOnlyInfos(newTransition, newState);
        this.routeWillChange(newTransition);
        newTransition.promise = newTransition.promise.then(result => {
          if (!newTransition.isAborted) {
            this._updateURL(newTransition, oldState);
            this.didTransition(this.currentRouteInfos);
            this.toInfos(newTransition, newState.routeInfos, true);
            this.routeDidChange(newTransition);
          }
          return result;
        }, null, promiseLabel('Transition complete'));
        return newTransition;
      }
    }
    transitionByIntent(intent, isIntermediate) {
      try {
        return this.getTransitionByIntent(intent, isIntermediate);
      } catch (e) {
        return new Transition(this, intent, undefined, e, undefined);
      }
    }
    recognize(url) {
      var intent = new URLTransitionIntent(this, url);
      var newState = this.generateNewState(intent);
      if (newState === null) {
        return newState;
      }
      var readonlyInfos = toReadOnlyRouteInfo(newState.routeInfos, newState.queryParams);
      return readonlyInfos[readonlyInfos.length - 1];
    }
    recognizeAndLoad(url) {
      var intent = new URLTransitionIntent(this, url);
      var newState = this.generateNewState(intent);
      if (newState === null) {
        return _rsvp.Promise.reject(`URL ${url} was not recognized`);
      }
      var newTransition = new Transition(this, intent, newState, undefined);
      return newTransition.then(() => {
        var routeInfosWithAttributes = toReadOnlyRouteInfo(newState.routeInfos, newTransition[QUERY_PARAMS_SYMBOL], true);
        return routeInfosWithAttributes[routeInfosWithAttributes.length - 1];
      });
    }
    generateNewState(intent) {
      try {
        return intent.applyToState(this.state, false);
      } catch (e) {
        return null;
      }
    }
    getTransitionByIntent(intent, isIntermediate) {
      var wasTransitioning = !!this.activeTransition;
      var oldState = wasTransitioning ? this.activeTransition[STATE_SYMBOL] : this.state;
      var newTransition;
      var newState = intent.applyToState(oldState, isIntermediate);
      var queryParamChangelist = getChangelist(oldState.queryParams, newState.queryParams);
      if (routeInfosEqual(newState.routeInfos, oldState.routeInfos)) {
        // This is a no-op transition. See if query params changed.
        if (queryParamChangelist) {
          var _newTransition = this.queryParamsTransition(queryParamChangelist, wasTransitioning, oldState, newState);
          _newTransition.queryParamsOnly = true;
          return _newTransition;
        }
        // No-op. No need to create a new transition.
        return this.activeTransition || new Transition(this, undefined, undefined);
      }
      if (isIntermediate) {
        var transition = new Transition(this, undefined, newState);
        transition.isIntermediate = true;
        this.toReadOnlyInfos(transition, newState);
        this.setupContexts(newState, transition);
        this.routeWillChange(transition);
        return this.activeTransition;
      }
      // Create a new transition to the destination route.
      newTransition = new Transition(this, intent, newState, undefined, this.activeTransition);
      // transition is to same route with same params, only query params differ.
      // not caught above probably because refresh() has been used
      if (routeInfosSameExceptQueryParams(newState.routeInfos, oldState.routeInfos)) {
        newTransition.queryParamsOnly = true;
      }
      this.toReadOnlyInfos(newTransition, newState);
      // Abort and usurp any previously active transition.
      if (this.activeTransition) {
        this.activeTransition.redirect(newTransition);
      }
      this.activeTransition = newTransition;
      // Transition promises by default resolve with resolved state.
      // For our purposes, swap out the promise to resolve
      // after the transition has been finalized.
      newTransition.promise = newTransition.promise.then(result => {
        return this.finalizeTransition(newTransition, result);
      }, null, promiseLabel('Settle transition promise when transition is finalized'));
      if (!wasTransitioning) {
        this.notifyExistingHandlers(newState, newTransition);
      }
      this.fireQueryParamDidChange(newState, queryParamChangelist);
      return newTransition;
    }
    /**
    @private
       Begins and returns a Transition based on the provided
    arguments. Accepts arguments in the form of both URL
    transitions and named transitions.
       @param {Router} router
    @param {Array[Object]} args arguments passed to transitionTo,
      replaceWith, or handleURL
    */
    doTransition(name, modelsArray, isIntermediate) {
      if (modelsArray === void 0) {
        modelsArray = [];
      }
      if (isIntermediate === void 0) {
        isIntermediate = false;
      }
      var lastArg = modelsArray[modelsArray.length - 1];
      var queryParams = {};
      if (lastArg !== undefined && lastArg.hasOwnProperty('queryParams')) {
        queryParams = modelsArray.pop().queryParams;
      }
      var intent;
      if (name === undefined) {
        log(this, 'Updating query params');
        // A query param update is really just a transition
        // into the route you're already on.
        var {
          routeInfos
        } = this.state;
        intent = new NamedTransitionIntent(this, routeInfos[routeInfos.length - 1].name, undefined, [], queryParams);
      } else if (name.charAt(0) === '/') {
        log(this, 'Attempting URL transition to ' + name);
        intent = new URLTransitionIntent(this, name);
      } else {
        log(this, 'Attempting transition to ' + name);
        intent = new NamedTransitionIntent(this, name, undefined, modelsArray, queryParams);
      }
      return this.transitionByIntent(intent, isIntermediate);
    }
    /**
    @private
       Updates the URL (if necessary) and calls `setupContexts`
    to update the router's array of `currentRouteInfos`.
    */
    finalizeTransition(transition, newState) {
      try {
        log(transition.router, transition.sequence, 'Resolved all models on destination route; finalizing transition.');
        var routeInfos = newState.routeInfos;
        // Run all the necessary enter/setup/exit hooks
        this.setupContexts(newState, transition);
        // Check if a redirect occurred in enter/setup
        if (transition.isAborted) {
          // TODO: cleaner way? distinguish b/w targetRouteInfos?
          this.state.routeInfos = this.currentRouteInfos;
          return _rsvp.Promise.reject(logAbort(transition));
        }
        this._updateURL(transition, newState);
        transition.isActive = false;
        this.activeTransition = undefined;
        this.triggerEvent(this.currentRouteInfos, true, 'didTransition', []);
        this.didTransition(this.currentRouteInfos);
        this.toInfos(transition, newState.routeInfos, true);
        this.routeDidChange(transition);
        log(this, transition.sequence, 'TRANSITION COMPLETE.');
        // Resolve with the final route.
        return routeInfos[routeInfos.length - 1].route;
      } catch (e) {
        if (!isTransitionAborted(e)) {
          var infos = transition[STATE_SYMBOL].routeInfos;
          transition.trigger(true, 'error', e, transition, infos[infos.length - 1].route);
          transition.abort();
        }
        throw e;
      }
    }
    /**
    @private
       Takes an Array of `RouteInfo`s, figures out which ones are
    exiting, entering, or changing contexts, and calls the
    proper route hooks.
       For example, consider the following tree of routes. Each route is
    followed by the URL segment it handles.
       ```
    |~index ("/")
    | |~posts ("/posts")
    | | |-showPost ("/:id")
    | | |-newPost ("/new")
    | | |-editPost ("/edit")
    | |~about ("/about/:id")
    ```
       Consider the following transitions:
       1. A URL transition to `/posts/1`.
       1. Triggers the `*model` callbacks on the
          `index`, `posts`, and `showPost` routes
       2. Triggers the `enter` callback on the same
       3. Triggers the `setup` callback on the same
    2. A direct transition to `newPost`
       1. Triggers the `exit` callback on `showPost`
       2. Triggers the `enter` callback on `newPost`
       3. Triggers the `setup` callback on `newPost`
    3. A direct transition to `about` with a specified
       context object
       1. Triggers the `exit` callback on `newPost`
          and `posts`
       2. Triggers the `serialize` callback on `about`
       3. Triggers the `enter` callback on `about`
       4. Triggers the `setup` callback on `about`
       @param {Router} transition
    @param {TransitionState} newState
    */
    setupContexts(newState, transition) {
      var partition = this.partitionRoutes(this.state, newState);
      var i, l, route;
      for (i = 0, l = partition.exited.length; i < l; i++) {
        route = partition.exited[i].route;
        delete route.context;
        if (route !== undefined) {
          if (route._internalReset !== undefined) {
            route._internalReset(true, transition);
          }
          if (route.exit !== undefined) {
            route.exit(transition);
          }
        }
      }
      var oldState = this.oldState = this.state;
      this.state = newState;
      var currentRouteInfos = this.currentRouteInfos = partition.unchanged.slice();
      try {
        for (i = 0, l = partition.reset.length; i < l; i++) {
          route = partition.reset[i].route;
          if (route !== undefined) {
            if (route._internalReset !== undefined) {
              route._internalReset(false, transition);
            }
          }
        }
        for (i = 0, l = partition.updatedContext.length; i < l; i++) {
          this.routeEnteredOrUpdated(currentRouteInfos, partition.updatedContext[i], false, transition);
        }
        for (i = 0, l = partition.entered.length; i < l; i++) {
          this.routeEnteredOrUpdated(currentRouteInfos, partition.entered[i], true, transition);
        }
      } catch (e) {
        this.state = oldState;
        this.currentRouteInfos = oldState.routeInfos;
        throw e;
      }
      this.state.queryParams = this.finalizeQueryParamChange(currentRouteInfos, newState.queryParams, transition);
    }
    /**
    @private
       Fires queryParamsDidChange event
    */
    fireQueryParamDidChange(newState, queryParamChangelist) {
      // If queryParams changed trigger event
      if (queryParamChangelist) {
        // This is a little hacky but we need some way of storing
        // changed query params given that no activeTransition
        // is guaranteed to have occurred.
        this._changedQueryParams = queryParamChangelist.all;
        this.triggerEvent(newState.routeInfos, true, 'queryParamsDidChange', [queryParamChangelist.changed, queryParamChangelist.all, queryParamChangelist.removed]);
        this._changedQueryParams = undefined;
      }
    }
    /**
    @private
       Helper method used by setupContexts. Handles errors or redirects
    that may happen in enter/setup.
    */
    routeEnteredOrUpdated(currentRouteInfos, routeInfo, enter, transition) {
      var route = routeInfo.route,
        context = routeInfo.context;
      function _routeEnteredOrUpdated(route) {
        if (enter) {
          if (route.enter !== undefined) {
            route.enter(transition);
          }
        }
        throwIfAborted(transition);
        route.context = context;
        if (route.contextDidChange !== undefined) {
          route.contextDidChange();
        }
        if (route.setup !== undefined) {
          route.setup(context, transition);
        }
        throwIfAborted(transition);
        currentRouteInfos.push(routeInfo);
        return route;
      }
      // If the route doesn't exist, it means we haven't resolved the route promise yet
      if (route === undefined) {
        routeInfo.routePromise = routeInfo.routePromise.then(_routeEnteredOrUpdated);
      } else {
        _routeEnteredOrUpdated(route);
      }
      return true;
    }
    /**
    @private
       This function is called when transitioning from one URL to
    another to determine which routes are no longer active,
    which routes are newly active, and which routes remain
    active but have their context changed.
       Take a list of old routes and new routes and partition
    them into four buckets:
       * unchanged: the route was active in both the old and
      new URL, and its context remains the same
    * updated context: the route was active in both the
      old and new URL, but its context changed. The route's
      `setup` method, if any, will be called with the new
      context.
    * exited: the route was active in the old URL, but is
      no longer active.
    * entered: the route was not active in the old URL, but
      is now active.
       The PartitionedRoutes structure has four fields:
       * `updatedContext`: a list of `RouteInfo` objects that
      represent routes that remain active but have a changed
      context
    * `entered`: a list of `RouteInfo` objects that represent
      routes that are newly active
    * `exited`: a list of `RouteInfo` objects that are no
      longer active.
    * `unchanged`: a list of `RouteInfo` objects that remain active.
       @param {Array[InternalRouteInfo]} oldRoutes a list of the route
      information for the previous URL (or `[]` if this is the
      first handled transition)
    @param {Array[InternalRouteInfo]} newRoutes a list of the route
      information for the new URL
       @return {Partition}
    */
    partitionRoutes(oldState, newState) {
      var oldRouteInfos = oldState.routeInfos;
      var newRouteInfos = newState.routeInfos;
      var routes = {
        updatedContext: [],
        exited: [],
        entered: [],
        unchanged: [],
        reset: []
      };
      var routeChanged,
        contextChanged = false,
        i,
        l;
      for (i = 0, l = newRouteInfos.length; i < l; i++) {
        var oldRouteInfo = oldRouteInfos[i],
          newRouteInfo = newRouteInfos[i];
        if (!oldRouteInfo || oldRouteInfo.route !== newRouteInfo.route) {
          routeChanged = true;
        }
        if (routeChanged) {
          routes.entered.push(newRouteInfo);
          if (oldRouteInfo) {
            routes.exited.unshift(oldRouteInfo);
          }
        } else if (contextChanged || oldRouteInfo.context !== newRouteInfo.context) {
          contextChanged = true;
          routes.updatedContext.push(newRouteInfo);
        } else {
          routes.unchanged.push(oldRouteInfo);
        }
      }
      for (i = newRouteInfos.length, l = oldRouteInfos.length; i < l; i++) {
        routes.exited.unshift(oldRouteInfos[i]);
      }
      routes.reset = routes.updatedContext.slice();
      routes.reset.reverse();
      return routes;
    }
    _updateURL(transition, state) {
      var urlMethod = transition.urlMethod;
      if (!urlMethod) {
        return;
      }
      var {
        routeInfos
      } = state;
      var {
        name: routeName
      } = routeInfos[routeInfos.length - 1];
      var params = {};
      for (var i = routeInfos.length - 1; i >= 0; --i) {
        var routeInfo = routeInfos[i];
        merge(params, routeInfo.params);
        if (routeInfo.route.inaccessibleByURL) {
          urlMethod = null;
        }
      }
      if (urlMethod) {
        params.queryParams = transition._visibleQueryParams || state.queryParams;
        var url = this.recognizer.generate(routeName, params);
        // transitions during the initial transition must always use replaceURL.
        // When the app boots, you are at a url, e.g. /foo. If some route
        // redirects to bar as part of the initial transition, you don't want to
        // add a history entry for /foo. If you do, pressing back will immediately
        // hit the redirect again and take you back to /bar, thus killing the back
        // button
        var initial = transition.isCausedByInitialTransition;
        // say you are at / and you click a link to route /foo. In /foo's
        // route, the transition is aborted using replaceWith('/bar').
        // Because the current url is still /, the history entry for / is
        // removed from the history. Clicking back will take you to the page
        // you were on before /, which is often not even the app, thus killing
        // the back button. That's why updateURL is always correct for an
        // aborting transition that's not the initial transition
        var replaceAndNotAborting = urlMethod === 'replace' && !transition.isCausedByAbortingTransition;
        // because calling refresh causes an aborted transition, this needs to be
        // special cased - if the initial transition is a replace transition, the
        // urlMethod should be honored here.
        var isQueryParamsRefreshTransition = transition.queryParamsOnly && urlMethod === 'replace';
        // say you are at / and you a `replaceWith(/foo)` is called. Then, that
        // transition is aborted with `replaceWith(/bar)`. At the end, we should
        // end up with /bar replacing /. We are replacing the replace. We only
        // will replace the initial route if all subsequent aborts are also
        // replaces. However, there is some ambiguity around the correct behavior
        // here.
        var replacingReplace = urlMethod === 'replace' && transition.isCausedByAbortingReplaceTransition;
        if (initial || replaceAndNotAborting || isQueryParamsRefreshTransition || replacingReplace) {
          this.replaceURL(url);
        } else {
          this.updateURL(url);
        }
      }
    }
    finalizeQueryParamChange(resolvedHandlers, newQueryParams, transition) {
      // We fire a finalizeQueryParamChange event which
      // gives the new route hierarchy a chance to tell
      // us which query params it's consuming and what
      // their final values are. If a query param is
      // no longer consumed in the final route hierarchy,
      // its serialized segment will be removed
      // from the URL.
      for (var k in newQueryParams) {
        if (newQueryParams.hasOwnProperty(k) && newQueryParams[k] === null) {
          delete newQueryParams[k];
        }
      }
      var finalQueryParamsArray = [];
      this.triggerEvent(resolvedHandlers, true, 'finalizeQueryParamChange', [newQueryParams, finalQueryParamsArray, transition]);
      if (transition) {
        transition._visibleQueryParams = {};
      }
      var finalQueryParams = {};
      for (var i = 0, len = finalQueryParamsArray.length; i < len; ++i) {
        var qp = finalQueryParamsArray[i];
        finalQueryParams[qp.key] = qp.value;
        if (transition && qp.visible !== false) {
          transition._visibleQueryParams[qp.key] = qp.value;
        }
      }
      return finalQueryParams;
    }
    toReadOnlyInfos(newTransition, newState) {
      var oldRouteInfos = this.state.routeInfos;
      this.fromInfos(newTransition, oldRouteInfos);
      this.toInfos(newTransition, newState.routeInfos);
      this._lastQueryParams = newState.queryParams;
    }
    fromInfos(newTransition, oldRouteInfos) {
      if (newTransition !== undefined && oldRouteInfos.length > 0) {
        var fromInfos = toReadOnlyRouteInfo(oldRouteInfos, (0, _polyfills.assign)({}, this._lastQueryParams), true);
        newTransition.from = fromInfos[fromInfos.length - 1] || null;
      }
    }
    toInfos(newTransition, newRouteInfos, includeAttributes) {
      if (includeAttributes === void 0) {
        includeAttributes = false;
      }
      if (newTransition !== undefined && newRouteInfos.length > 0) {
        var toInfos = toReadOnlyRouteInfo(newRouteInfos, (0, _polyfills.assign)({}, newTransition[QUERY_PARAMS_SYMBOL]), includeAttributes);
        newTransition.to = toInfos[toInfos.length - 1] || null;
      }
    }
    notifyExistingHandlers(newState, newTransition) {
      var oldRouteInfos = this.state.routeInfos,
        i,
        oldRouteInfoLen,
        oldHandler,
        newRouteInfo;
      oldRouteInfoLen = oldRouteInfos.length;
      for (i = 0; i < oldRouteInfoLen; i++) {
        oldHandler = oldRouteInfos[i];
        newRouteInfo = newState.routeInfos[i];
        if (!newRouteInfo || oldHandler.name !== newRouteInfo.name) {
          break;
        }
        if (!newRouteInfo.isResolved) {}
      }
      this.triggerEvent(oldRouteInfos, true, 'willTransition', [newTransition]);
      this.routeWillChange(newTransition);
      this.willTransition(oldRouteInfos, newState.routeInfos, newTransition);
    }
    /**
      Clears the current and target route routes and triggers exit
      on each of them starting at the leaf and traversing up through
      its ancestors.
    */
    reset() {
      if (this.state) {
        forEach(this.state.routeInfos.slice().reverse(), function (routeInfo) {
          var route = routeInfo.route;
          if (route !== undefined) {
            if (route.exit !== undefined) {
              route.exit();
            }
          }
          return true;
        });
      }
      this.oldState = undefined;
      this.state = new TransitionState();
      this.currentRouteInfos = undefined;
    }
    /**
      let handler = routeInfo.handler;
      The entry point for handling a change to the URL (usually
      via the back and forward button).
         Returns an Array of handlers and the parameters associated
      with those parameters.
         @param {String} url a URL to process
         @return {Array} an Array of `[handler, parameter]` tuples
    */
    handleURL(url) {
      // Perform a URL-based transition, but don't change
      // the URL afterward, since it already happened.
      if (url.charAt(0) !== '/') {
        url = '/' + url;
      }
      return this.doTransition(url).method(null);
    }
    /**
      Transition into the specified named route.
         If necessary, trigger the exit callback on any routes
      that are no longer represented by the target route.
         @param {String} name the name of the route
    */
    transitionTo(name) {
      for (var _len3 = arguments.length, contexts = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        contexts[_key3 - 1] = arguments[_key3];
      }
      if (typeof name === 'object') {
        contexts.push(name);
        return this.doTransition(undefined, contexts, false);
      }
      return this.doTransition(name, contexts);
    }
    intermediateTransitionTo(name) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      return this.doTransition(name, args, true);
    }
    refresh(pivotRoute) {
      var previousTransition = this.activeTransition;
      var state = previousTransition ? previousTransition[STATE_SYMBOL] : this.state;
      var routeInfos = state.routeInfos;
      if (pivotRoute === undefined) {
        pivotRoute = routeInfos[0].route;
      }
      log(this, 'Starting a refresh transition');
      var name = routeInfos[routeInfos.length - 1].name;
      var intent = new NamedTransitionIntent(this, name, pivotRoute, [], this._changedQueryParams || state.queryParams);
      var newTransition = this.transitionByIntent(intent, false);
      // if the previous transition is a replace transition, that needs to be preserved
      if (previousTransition && previousTransition.urlMethod === 'replace') {
        newTransition.method(previousTransition.urlMethod);
      }
      return newTransition;
    }
    /**
      Identical to `transitionTo` except that the current URL will be replaced
      if possible.
         This method is intended primarily for use with `replaceState`.
         @param {String} name the name of the route
    */
    replaceWith(name) {
      return this.doTransition(name).method('replace');
    }
    /**
      Take a named route and context objects and generate a
      URL.
         @param {String} name the name of the route to generate
        a URL for
      @param {...Object} objects a list of objects to serialize
         @return {String} a URL
    */
    generate(routeName) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      var partitionedArgs = extractQueryParams(args),
        suppliedParams = partitionedArgs[0],
        queryParams = partitionedArgs[1];
      // Construct a TransitionIntent with the provided params
      // and apply it to the present state of the router.
      var intent = new NamedTransitionIntent(this, routeName, undefined, suppliedParams);
      var state = intent.applyToState(this.state, false);
      var params = {};
      for (var i = 0, len = state.routeInfos.length; i < len; ++i) {
        var routeInfo = state.routeInfos[i];
        var routeParams = routeInfo.serialize();
        merge(params, routeParams);
      }
      params.queryParams = queryParams;
      return this.recognizer.generate(routeName, params);
    }
    applyIntent(routeName, contexts) {
      var intent = new NamedTransitionIntent(this, routeName, undefined, contexts);
      var state = this.activeTransition && this.activeTransition[STATE_SYMBOL] || this.state;
      return intent.applyToState(state, false);
    }
    isActiveIntent(routeName, contexts, queryParams, _state) {
      var state = _state || this.state,
        targetRouteInfos = state.routeInfos,
        routeInfo,
        len;
      if (!targetRouteInfos.length) {
        return false;
      }
      var targetHandler = targetRouteInfos[targetRouteInfos.length - 1].name;
      var recognizerHandlers = this.recognizer.handlersFor(targetHandler);
      var index = 0;
      for (len = recognizerHandlers.length; index < len; ++index) {
        routeInfo = targetRouteInfos[index];
        if (routeInfo.name === routeName) {
          break;
        }
      }
      if (index === recognizerHandlers.length) {
        // The provided route name isn't even in the route hierarchy.
        return false;
      }
      var testState = new TransitionState();
      testState.routeInfos = targetRouteInfos.slice(0, index + 1);
      recognizerHandlers = recognizerHandlers.slice(0, index + 1);
      var intent = new NamedTransitionIntent(this, targetHandler, undefined, contexts);
      var newState = intent.applyToHandlers(testState, recognizerHandlers, targetHandler, true, true);
      var routesEqual = routeInfosEqual(newState.routeInfos, testState.routeInfos);
      if (!queryParams || !routesEqual) {
        return routesEqual;
      }
      // Get a hash of QPs that will still be active on new route
      var activeQPsOnNewHandler = {};
      merge(activeQPsOnNewHandler, queryParams);
      var activeQueryParams = state.queryParams;
      for (var key in activeQueryParams) {
        if (activeQueryParams.hasOwnProperty(key) && activeQPsOnNewHandler.hasOwnProperty(key)) {
          activeQPsOnNewHandler[key] = activeQueryParams[key];
        }
      }
      return routesEqual && !getChangelist(activeQPsOnNewHandler, queryParams);
    }
    isActive(routeName) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }
      var partitionedArgs = extractQueryParams(args);
      return this.isActiveIntent(routeName, partitionedArgs[0], partitionedArgs[1]);
    }
    trigger(name) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }
      this.triggerEvent(this.currentRouteInfos, false, name, args);
    }
  }
  function routeInfosEqual(routeInfos, otherRouteInfos) {
    if (routeInfos.length !== otherRouteInfos.length) {
      return false;
    }
    for (var i = 0, len = routeInfos.length; i < len; ++i) {
      if (routeInfos[i] !== otherRouteInfos[i]) {
        return false;
      }
    }
    return true;
  }
  function routeInfosSameExceptQueryParams(routeInfos, otherRouteInfos) {
    if (routeInfos.length !== otherRouteInfos.length) {
      return false;
    }
    for (var i = 0, len = routeInfos.length; i < len; ++i) {
      if (routeInfos[i].name !== otherRouteInfos[i].name) {
        return false;
      }
      if (!paramsEqual(routeInfos[i].params, otherRouteInfos[i].params)) {
        return false;
      }
    }
    return true;
  }
  function paramsEqual(params, otherParams) {
    if (!params && !otherParams) {
      return true;
    } else if (!params && !!otherParams || !!params && !otherParams) {
      // one is falsy but other is not;
      return false;
    }
    var keys = Object.keys(params);
    var otherKeys = Object.keys(otherParams);
    if (keys.length !== otherKeys.length) {
      return false;
    }
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i];
      if (params[key] !== otherParams[key]) {
        return false;
      }
    }
    return true;
  }
  var _default = Router;
  _exports.default = _default;
});