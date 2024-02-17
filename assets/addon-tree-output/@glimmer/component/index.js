define("@glimmer/component/index", ["exports", "@ember/component", "@glimmer/component/-private/ember-component-manager", "@glimmer/component/-private/component"], function (_exports, _component, _emberComponentManager, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // Hax because the old version of `@types/ember__component` the `1.x` branch
  // uses does not provide any types for `setComponentManager` *and* because we
  // are using a very old version of `setComponentManager` for versions before
  // Ember 3.8.
  let GlimmerComponent = _component2.default;
  if (false /* DEBUG */) {
    // Add assertions against using Glimmer.js only APIs

    // TODO: Add GlimmerComponent API docs link to these messages once API docs are live
    function throwMethodUseError(methodName) {
      throw new Error(`You attempted to define the '${methodName}' method on a Glimmer Component, but that lifecycle hook does not exist in Ember.js applications, it only exists in Glimmer.js apps. You can rename this method, and you can trigger it using a modifier such as {{did-insert}} from '@ember/render-modifiers': https://github.com/emberjs/ember-render-modifiers.`);
    }
    function throwPropertyUseError(propertyName) {
      throw new Error(`You attempted to access the '${propertyName}' property on a Glimmer Component, but that property does not exist in Ember.js applications, it only exists in Glimmer.js apps. You define a class field with the same name on your component class and it will overwrite this error message, but it will not be used by the framework.`);
    }
    GlimmerComponent = class GlimmerDebugComponent extends GlimmerComponent {
      constructor(owner, args) {
        super(owner, args);
        if (typeof this['didInsertElement'] === 'function') {
          throwMethodUseError('didInsertElement');
        }
        if (typeof this['didUpdate'] === 'function') {
          throwMethodUseError('didUpdate');
        }
      }
    };
    let proto = GlimmerComponent.prototype;
    function defineErrorProp(proto, key, getterMethod) {
      Object.defineProperty(proto, key, {
        get: () => getterMethod(key),
        set(value) {
          Object.defineProperty(this, key, {
            value
          });
        }
      });
    }

    // Methods should still throw whenever they are accessed
    defineErrorProp(proto, 'bounds', throwPropertyUseError);
    defineErrorProp(proto, 'element', throwPropertyUseError);
    defineErrorProp(proto, 'debugName', throwPropertyUseError);
  }
  if (true) {
    (0, _component.setComponentManager)(owner => {
      return new _emberComponentManager.default(owner);
    }, GlimmerComponent);
  } else {
    (0, _component.setComponentManager)('glimmer', GlimmerComponent);
  }
  var _default = GlimmerComponent;
  _exports.default = _default;
});