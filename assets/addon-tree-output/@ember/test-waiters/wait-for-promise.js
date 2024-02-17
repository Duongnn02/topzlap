define("@ember/test-waiters/wait-for-promise", ["exports", "@ember/test-waiters/build-waiter"], function (_exports, _buildWaiter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = waitForPromise;
  const PROMISE_WAITER = (0, _buildWaiter.default)('@ember/test-waiters:promise-waiter');
  /**
   * A convenient utility function to simplify waiting for a promise.
   *
   * @public
   * @param promise {Promise<T> | RSVP.Promise<T>} The promise to track async operations for
   * @param label {string} An optional string to identify the promise
   *
   * @example
   *
   * import Component from '@ember/component';
   * import { waitForPromise } from '@ember/test-waiters';
   *
   * export default class Friendz extends Component {
   *   didInsertElement() {
   *     waitForPromise(new Promise(resolve => {
   *       doSomeWork();
   *       resolve();
   *     }));
   *   }
   * }
   */

  function waitForPromise(promise, label) {
    let result = promise;
    if (false /* DEBUG */) {
      PROMISE_WAITER.beginAsync(promise, label);
      result = promise.then(value => {
        PROMISE_WAITER.endAsync(promise);
        return value;
      }, error => {
        PROMISE_WAITER.endAsync(promise);
        throw error;
      });
    }
    return result;
  }
});