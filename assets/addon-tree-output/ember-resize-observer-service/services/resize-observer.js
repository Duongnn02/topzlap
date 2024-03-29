define("ember-resize-observer-service/services/resize-observer", ["exports", "@ember/service", "@ember/object", "@ember/debug", "ember-resize-observer-service/utils/ignore-ro-error"], function (_exports, _service, _object, _debug, _ignoreRoError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const addonName = 'resize-observer-service';

  /**
   * ResizeObserverService allows to use a single ResizeObserver instance
   * for observing multiple elements to achieve better performance.
   */
  let ResizeObserverService = (_class = class ResizeObserverService extends _service.default {
    constructor() {
      super(...arguments);
      this._setup();
    }
    _setup() {
      this.callbacks = null;
      this.observer = null;
      if (typeof FastBoot !== 'undefined' || typeof window === 'undefined') {
        return;
      }
      if (!window.ResizeObserver) {
        (false && (0, _debug.warn)(`${addonName}: ResizeObserver is not available`, {
          id: addonName
        }));
        return;
      }
      (0, _ignoreRoError.default)();
      this.callbacks = new WeakMap();
      this.observer = new window.ResizeObserver(this.handleResize);
    }

    /**
     * `isEnabled` is `true` if the ResizeObserver API is available,
     * otherwise the service will ignore any method calls.
     */
    get isEnabled() {
      return !!this.observer;
    }

    /**
     * Initiate the observing of the `element` or add an additional `callback`
     * if the `element` is already observed.
     *
     * @param {object} element
     * @param {function} callback The `callback` is called whenever the size of
     *    the `element` changes. It is called with `ResizeObserverEntry` object
     *    for the particular `element`.
     */
    observe(element, callback) {
      if (!this.isEnabled) {
        return;
      }
      const callbacks = this.callbacks.get(element);
      if (callbacks) {
        callbacks.add(callback);
      } else {
        this.callbacks.set(element, new Set([callback]));
        this.observer.observe(element);
      }
    }

    /**
     * End the observing of the `element` or just remove the provided `callback`.
     *
     * It will unobserve the `element` if the `callback` is not provided
     * or there are no more callbacks left for this `element`.
     *
     * @param {object} element
     * @param {function?} callback - The `callback` to remove from the listeners
     *   of the `element` size changes.
     */
    unobserve(element, callback) {
      if (!this.isEnabled) {
        return;
      }
      const callbacks = this.callbacks.get(element);
      if (!callbacks) {
        return;
      }
      callbacks.delete(callback);
      if (!callback || !callbacks.size) {
        this.callbacks.delete(element);
        this.observer.unobserve(element);
      }
    }

    /**
     * Unobserve all observed elements.
     */
    clear() {
      if (!this.isEnabled) {
        return;
      }
      this.callbacks = new WeakMap();
      this.observer.disconnect();
    }
    willDestroy() {
      this.clear();
    }
    handleResize(entries) {
      for (const entry of entries) {
        const callbacks = this.callbacks.get(entry.target);
        if (callbacks) {
          for (const callback of callbacks) {
            callback(entry);
          }
        }
      }
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "handleResize", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleResize"), _class.prototype)), _class);
  _exports.default = ResizeObserverService;
});