define("@ember/test-waiters/build-waiter", ["exports", "@ember/debug", "@ember/test-waiters/token", "@ember/test-waiters/waiter-manager"], function (_exports, _debug, _token, _waiterManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports._resetWaiterNames = _resetWaiterNames;
  _exports.default = buildWaiter;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const WAITER_NAME_PATTERN = /^[^:]*:?.*/;
  let WAITER_NAMES = false /* DEBUG */ ? new Set() : undefined;
  function _resetWaiterNames() {
    WAITER_NAMES = new Set();
  }
  function getNextToken() {
    return new _token.default();
  }
  class TestWaiterImpl {
    constructor(name, nextToken) {
      _defineProperty(this, "isRegistered", false);
      _defineProperty(this, "items", new Map());
      _defineProperty(this, "completedOperationsForTokens", new WeakMap());
      _defineProperty(this, "completedOperationsForPrimitives", new Map());
      this.name = name; // @ts-ignore

      this.nextToken = nextToken || getNextToken;
    }
    beginAsync() {
      let token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.nextToken();
      let label = arguments.length > 1 ? arguments[1] : undefined;
      this._register();
      if (this.items.has(token)) {
        throw new Error(`beginAsync called for ${token} but it is already pending.`);
      }
      let error = new Error();
      this.items.set(token, {
        get stack() {
          return error.stack;
        },
        label
      });
      return token;
    }
    endAsync(token) {
      if (!this.items.has(token) && !this._getCompletedOperations(token).has(token)) {
        throw new Error(`testWaiter.endAsync called with no preceding testWaiter.beginAsync call.
        Test waiter calls should always be paired. This can occur when a test waiter's paired calls are invoked in a non-deterministic order.

        See https://github.com/emberjs/ember-test-waiters#keep-beginasyncendasync-in-same-block-scope for more information.`);
      }
      this.items.delete(token); // Mark when a waiter operation has completed so we can distinguish
      // whether endAsync is being called before a prior beginAsync call above.

      this._getCompletedOperations(token).set(token, true);
    }
    waitUntil() {
      return this.items.size === 0;
    }
    debugInfo() {
      let result = [];
      this.items.forEach(value => {
        result.push(value);
      });
      return result;
    }
    reset() {
      this.items.clear();
    }
    _register() {
      if (!this.isRegistered) {
        (0, _waiterManager.register)(this);
        this.isRegistered = true;
      }
    }
    _getCompletedOperations(token) {
      let type = typeof token;
      let isFunction = type === 'function';
      let isObject = token !== null && type === 'object';
      let isPrimitive = !isFunction && !isObject;
      return isPrimitive ? this.completedOperationsForPrimitives : this.completedOperationsForTokens;
    }
  }
  class NoopTestWaiter {
    constructor(name) {
      this.name = name;
    }
    beginAsync() {
      return this;
    }
    endAsync() {}
    waitUntil() {
      return true;
    }
    debugInfo() {
      return [];
    }
    reset() {}
  }
  /**
   * Builds and returns a test waiter. The type of the
   * returned waiter is dependent on whether the app or
   * addon is in `DEBUG` mode or not.
   *
   * @public
   *
   * @param name {string} The name of the test waiter
   * @returns {TestWaiter}
   *
   * @example
   *
   * import Component from '@ember/component';
   * import { buildWaiter } from '@ember/test-waiters';
   *
   * if (DEBUG) {
   *   let waiter = buildWaiter('friend-waiter');
   * }
   *
   * export default class Friendz extends Component {
   *   didInsertElement() {
   *     let token = waiter.beginAsync(this);
   *
   *     someAsyncWork().then(() => {
   *       waiter.endAsync(token);
   *     });
   *   }
   * }
   */

  function buildWaiter(name) {
    if (false /* DEBUG */) {
      (false && (0, _debug.warn)(`The waiter name '${name}' is already in use`, !WAITER_NAMES.has(name), {
        id: '@ember/test-waiters.duplicate-waiter-name'
      }));
      WAITER_NAMES.add(name);
    }
    if (!false /* DEBUG */) {
      return new NoopTestWaiter(name);
    } else {
      (false && (0, _debug.warn)(`You must provide a name that contains a descriptive prefix separated by a colon.

        Example: ember-fictitious-addon:some-file

        You passed: ${name}`, WAITER_NAME_PATTERN.test(name), {
        id: '@ember/test-waiters.invalid-waiter-name'
      }));
      return new TestWaiterImpl(name);
    }
  }
});