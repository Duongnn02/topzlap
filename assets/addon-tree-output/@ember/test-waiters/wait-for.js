define("@ember/test-waiters/wait-for", ["exports", "@ember/test-waiters/wait-for-promise", "@ember/test-waiters/build-waiter"], function (_exports, _waitForPromise, _buildWaiter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = waitFor;
  function waitFor() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    let isFunction = args.length < 3;
    if (isFunction) {
      let [fn, label] = args;
      return wrapFunction(fn, label);
    } else {
      let [,, descriptor, label] = args;
      if (!false /* DEBUG */) {
        return descriptor;
      }
      let fn = descriptor.value;
      descriptor.value = wrapFunction(fn, label);
      return descriptor;
    }
  }
  function wrapFunction(fn, label) {
    if (!false /* DEBUG */) {
      return fn;
    }
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      let result = fn.call(this, ...args);
      if (isThenable(result)) {
        return (0, _waitForPromise.default)(result, label);
      } else if (isGenerator(result)) {
        return waitForGenerator(result, label);
      } else {
        return result;
      }
    };
  }
  function isThenable(maybePromise) {
    let type = typeof maybePromise;
    return (maybePromise !== null && type === 'object' || type === 'function') && typeof maybePromise.then === 'function';
  }
  function isGenerator(maybeGenerator) {
    // Because we don't have Symbol.iterator in IE11
    return typeof maybeGenerator.next === 'function' && typeof maybeGenerator.return === 'function' && typeof maybeGenerator.throw === 'function';
  }
  const GENERATOR_WAITER = (0, _buildWaiter.default)('@ember/test-waiters:generator-waiter');
  function waitForGenerator(generator, label) {
    GENERATOR_WAITER.beginAsync(generator, label);
    let isWaiting = true;
    function stopWaiting() {
      if (isWaiting) {
        GENERATOR_WAITER.endAsync(generator);
        isWaiting = false;
      }
    }
    return {
      next() {
        let hasErrored = true;
        try {
          let val = generator.next(...arguments);
          hasErrored = false;
          if (val.done) {
            stopWaiting();
          }
          return val;
        } finally {
          // If generator.next() throws, we need to stop waiting. But if we catch
          // and re-throw exceptions, it could move the location from which the
          // uncaught exception is thrown, interfering with the developer
          // debugging experience if they have break-on-exceptions enabled. So we
          // use a boolean flag and a finally block to emulate a catch block.
          if (hasErrored) {
            stopWaiting();
          }
        }
      },
      return() {
        stopWaiting();
        return generator.return(...arguments);
      },
      throw() {
        stopWaiting();
        return generator.throw(...arguments);
      }
    };
  }
});