define("discourse-common/utils/decorators", ["exports", "@ember/object/evented", "@ember-decorators/object", "@ember/object", "@ember/object/computed", "@ember/runloop", "discourse-common/utils/decorator-alias", "discourse-common/utils/extract-value", "discourse-common/utils/handle-descriptor", "discourse-common/utils/is-descriptor", "discourse-common/utils/macro-alias", "discourse-common/lib/debounce", "@ember/object/core", "discourse-common/lib/deprecated"], function (_exports, _evented, _object, _object2, _computed, _runloop, _decoratorAlias, _extractValue, _handleDescriptor, _isDescriptor, _macroAlias, _debounce, _core, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.afterRender = afterRender;
  _exports.and = _exports.alias = void 0;
  _exports.bind = bind;
  _exports.collect = _exports.bool = void 0;
  _exports.debounce = debounce;
  _exports.default = discourseComputedDecorator;
  _exports.notEmpty = _exports.not = _exports.none = _exports.min = _exports.max = _exports.match = _exports.mapBy = _exports.map = _exports.lte = _exports.lt = _exports.gte = _exports.gt = _exports.filterBy = _exports.filter = _exports.equal = _exports.empty = void 0;
  _exports.observes = observes;
  _exports.on = on;
  _exports.or = _exports.oneWay = void 0;
  _exports.readOnly = readOnly;
  _exports.uniq = _exports.union = _exports.sum = _exports.sort = _exports.setDiff = _exports.reads = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/evented",0,"@ember-decorators/object",0,"@ember/object",0,"@ember/object/computed",0,"@ember/runloop",0,"discourse-common/utils/decorator-alias",0,"discourse-common/utils/extract-value",0,"discourse-common/utils/handle-descriptor",0,"discourse-common/utils/is-descriptor",0,"discourse-common/utils/macro-alias",0,"discourse-common/lib/debounce",0,"@ember/object/core",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function discourseComputedDecorator() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    // determine if user called as @discourseComputed('blah', 'blah') or @discourseComputed
    if ((0, _isDescriptor.default)(params[params.length - 1])) {
      return (0, _handleDescriptor.default)(...arguments);
    } else {
      return function /* target, key, desc */
      () {
        return (0, _handleDescriptor.default)(...arguments, params);
      };
    }
  }
  function afterRender(target, name, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function () {
      (0, _runloop.schedule)("afterRender", () => {
        if (!this.isDestroying && !this.isDestroyed) {
          return originalFunction.apply(this, arguments);
        }
      });
    };
  }
  function bind(target, name, descriptor) {
    return {
      configurable: true,
      get() {
        const bound = (0, _runloop.bind)(this, descriptor.value);
        const attributes = Object.assign({}, descriptor, {
          value: bound
        });
        Object.defineProperty(this, name, attributes);
        return bound;
      }
    };
  }
  function readOnly(target, name, desc) {
    return {
      writable: false,
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      initializer() {
        let value = (0, _extractValue.default)(desc);
        return value.readOnly();
      }
    };
  }
  function debounce(delay) {
    let immediate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function (target, name, descriptor) {
      return {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        get: function () {
          var _this = this;
          const originalFunction = descriptor.value;
          const debounced = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return (0, _debounce.default)(_this, originalFunction, ...args, delay, immediate);
          };

          // Memoize on instance for future access
          Object.defineProperty(this, name, {
            value: debounced,
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable
          });
          return debounced;
        }
      };
    };
  }
  function on() {
    for (var _len3 = arguments.length, onParams = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      onParams[_key3] = arguments[_key3];
    }
    return function (target) {
      if (target instanceof _core.default) {
        (0, _deprecated.default)(`Using 'on' from 'discourse-common/utils/decorators' as a class property decorator is deprecated. You should import it from '@ember-decorators/object' instead.`, {
          id: "discourse.utils-decorators-on",
          from: "3.1.0.beta2"
        });
        return (0, _object.on)(...onParams)(...arguments);
      } else {
        return (0, _decoratorAlias.default)(_evented.on, "Can not `on` without event names")(...onParams)(...arguments);
      }
    };
  }
  function observes() {
    for (var _len4 = arguments.length, observeParams = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      observeParams[_key4] = arguments[_key4];
    }
    return function (target) {
      if (target instanceof _core.default) {
        (0, _deprecated.default)(`Using 'observes' from 'discourse-common/utils/decorators' as a class property decorator is deprecated. You should import it from '@ember-decorators/object' instead.`, {
          id: "discourse.utils-decorators-observes",
          from: "3.1.0.beta2"
        });
        return (0, _object.observes)(...observeParams)(...arguments);
      } else {
        return (0, _decoratorAlias.default)(_object2.observer, "Can not `observe` without property names")(...observeParams)(...arguments);
      }
    };
  }
  const alias = (0, _macroAlias.default)(_computed.alias);
  _exports.alias = alias;
  const and = (0, _macroAlias.default)(_computed.and);
  _exports.and = and;
  const bool = (0, _macroAlias.default)(_computed.bool);
  _exports.bool = bool;
  const collect = (0, _macroAlias.default)(_computed.collect);
  _exports.collect = collect;
  const empty = (0, _macroAlias.default)(_computed.empty);
  _exports.empty = empty;
  const equal = (0, _macroAlias.default)(_computed.equal);
  _exports.equal = equal;
  const filter = (0, _macroAlias.default)(_computed.filter);
  _exports.filter = filter;
  const filterBy = (0, _macroAlias.default)(_computed.filterBy);
  _exports.filterBy = filterBy;
  const gt = (0, _macroAlias.default)(_computed.gt);
  _exports.gt = gt;
  const gte = (0, _macroAlias.default)(_computed.gte);
  _exports.gte = gte;
  const lt = (0, _macroAlias.default)(_computed.lt);
  _exports.lt = lt;
  const lte = (0, _macroAlias.default)(_computed.lte);
  _exports.lte = lte;
  const map = (0, _macroAlias.default)(_computed.map);
  _exports.map = map;
  const mapBy = (0, _macroAlias.default)(_computed.mapBy);
  _exports.mapBy = mapBy;
  const match = (0, _macroAlias.default)(_computed.match);
  _exports.match = match;
  const max = (0, _macroAlias.default)(_computed.max);
  _exports.max = max;
  const min = (0, _macroAlias.default)(_computed.min);
  _exports.min = min;
  const none = (0, _macroAlias.default)(_computed.none);
  _exports.none = none;
  const not = (0, _macroAlias.default)(_computed.not);
  _exports.not = not;
  const notEmpty = (0, _macroAlias.default)(_computed.notEmpty);
  _exports.notEmpty = notEmpty;
  const oneWay = (0, _macroAlias.default)(_computed.oneWay);
  _exports.oneWay = oneWay;
  const or = (0, _macroAlias.default)(_computed.or);
  _exports.or = or;
  const reads = (0, _macroAlias.default)(_computed.reads);
  _exports.reads = reads;
  const setDiff = (0, _macroAlias.default)(_computed.setDiff);
  _exports.setDiff = setDiff;
  const sort = (0, _macroAlias.default)(_computed.sort);
  _exports.sort = sort;
  const sum = (0, _macroAlias.default)(_computed.sum);
  _exports.sum = sum;
  const union = (0, _macroAlias.default)(_computed.union);
  _exports.union = union;
  const uniq = (0, _macroAlias.default)(_computed.uniq);
  _exports.uniq = uniq;
});