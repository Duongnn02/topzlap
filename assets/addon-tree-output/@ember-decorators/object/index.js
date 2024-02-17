define("@ember-decorators/object/index", ["exports", "@ember/debug", "@ember/object", "@ember/object/computed", "@ember/object/events", "@ember/object/observers", "@ember-decorators/utils/decorator"], function (_exports, _debug, _object, _computed, _events, _observers, _decorator) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.unobserves = _exports.on = _exports.off = _exports.observes = void 0;
  /**
    Triggers the target function when the dependent properties have changed. Note,
    `@observes` _must_ be used on EmberObject based classes only, otherwise there
    may be subtle issues and breakage.
  
    ```javascript
    import { observes } from '@ember-decorators/object';
  
    class Foo {
      @observes('foo')
      bar() {
        //...
      }
    }
    ```
  
    @function
    @param {...String} propertyNames - Names of the properties that trigger the function
   */
  const observes = (0, _decorator.decoratorWithRequiredParams)((target, key, desc, params) => {
    (false && !(desc && typeof desc.value === 'function') && (0, _debug.assert)('The @observes decorator must be applied to functions', desc && typeof desc.value === 'function'));
    (false && !(target instanceof _object.default) && (0, _debug.assert)(`You attempted to use @observes on ${target.constructor.name}#${key}, which does not extend from EmberObject. Unfortunately this does not work with stage 1 decorator transforms, and will break in subtle ways. You must rewrite your class to extend from EmberObject.`, target instanceof _object.default));
    for (let path of params) {
      (0, _computed.expandProperties)(path, expandedPath => {
        (0, _observers.addObserver)(target, expandedPath, null, key);
      });
    }
    return desc;
  }, 'observes');

  /**
    Removes observers from the target function.
  
    ```javascript
    import { observes, unobserves } from '@ember-decorators/object';
  
    class Foo {
      @observes('foo')
      bar() {
        //...
      }
    }
  
    class Bar extends Foo {
      @unobserves('foo') bar;
    }
    ```
  
    @function
    @param {...String} propertyNames - Names of the properties that no longer trigger the function
   */
  _exports.observes = observes;
  const unobserves = (0, _decorator.decoratorWithRequiredParams)((target, key, desc, params) => {
    for (let path of params) {
      (0, _computed.expandProperties)(path, expandedPath => {
        (0, _observers.removeObserver)(target, expandedPath, null, key);
      });
    }
    return desc;
  }, 'unobserves');

  /**
    Adds an event listener to the target function.
  
    ```javascript
    import { on } from '@ember-decorators/object';
  
    class Foo {
      @on('fooEvent', 'barEvent')
      bar() {
        //...
      }
    }
    ```
  
    @function
    @param {...String} eventNames - Names of the events that trigger the function
   */
  _exports.unobserves = unobserves;
  const on = (0, _decorator.decoratorWithRequiredParams)((target, key, desc, params) => {
    (false && !(desc && typeof desc.value === 'function') && (0, _debug.assert)('The @on decorator must be applied to functions', desc && typeof desc.value === 'function'));
    for (let eventName of params) {
      (0, _events.addListener)(target, eventName, null, key);
    }
    return desc;
  }, 'on');

  /**
    Removes an event listener from the target function.
  
    ```javascript
    import { on, off } from '@ember-decorators/object';
  
    class Foo {
      @on('fooEvent', 'barEvent')
      bar() {
        //...
      }
    }
  
    class Bar extends Foo {
      @off('fooEvent', 'barEvent') bar;
    }
    ```
  
    @function
    @param {...String} eventNames - Names of the events that no longer trigger the function
   */
  _exports.on = on;
  const off = (0, _decorator.decoratorWithRequiredParams)((target, key, desc, params) => {
    for (let eventName of params) {
      (0, _events.removeListener)(target, eventName, null, key);
    }
    return desc;
  }, 'off');
  _exports.off = off;
});