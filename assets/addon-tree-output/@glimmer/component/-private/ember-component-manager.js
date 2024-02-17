define("@glimmer/component/-private/ember-component-manager", ["exports", "ember", "@ember/object", "@ember/application", "@ember/component", "@ember/runloop", "@glimmer/component/-private/base-component-manager", "@glimmer/component/-private/destroyables"], function (_exports, _ember, _object, _application, _component, _runloop, _baseComponentManager, destroyables) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    setDestroyed,
    setDestroying
  } = destroyables;
  const CAPABILITIES = true // @ts-ignore
  // @ts-ignore
  ? (0, _component.capabilities)('3.13', {
    destructor: true,
    asyncLifecycleCallbacks: false,
    updateHook: false
  }) : (0, _component.capabilities)('3.4', {
    destructor: true,
    asyncLifecycleCallbacks: false
  });
  const scheduledDestroyComponent = true ? undefined : (component, meta) => {
    if (component.isDestroyed) {
      return;
    }
    _ember.default.destroy(component);
    meta.setSourceDestroyed();
    setDestroyed(component);
  };
  const destroy = true ? _ember.default.destroy : component => {
    if (component.isDestroying) {
      return;
    }
    let meta = _ember.default.meta(component);
    meta.setSourceDestroying();
    setDestroying(component);
    (0, _runloop.schedule)('actions', component, component.willDestroy);
    (0, _runloop.schedule)('destroy', void 0, scheduledDestroyComponent, component, meta);
  };
  const registerDestructor = true ? _ember.default._registerDestructor : true ? _ember.default.__loader.require('@glimmer/runtime').registerDestructor : undefined;

  /**
   * This component manager runs in Ember.js environments and extends the base component manager to:
   *
   * 1. Properly destroy the component's associated `meta` data structure
   * 2. Schedule destruction using Ember's runloop
   */
  class EmberGlimmerComponentManager extends (0, _baseComponentManager.default)(_application.setOwner, _application.getOwner, CAPABILITIES) {
    createComponent(ComponentClass, args) {
      const component = super.createComponent(ComponentClass, args);
      if (true) {
        registerDestructor(component, () => {
          component.willDestroy();
        });
      }
      return component;
    }
    destroyComponent(component) {
      destroy(component);
    }
  }
  // In Ember 3.12 and earlier, the updateComponent hook was mandatory.
  // As of Ember 3.13, the `args` object is stable and each property of the
  // object participates in the autotrack stack on its own. This means we do not
  // need to set the `args` property on the component instance to invalidate
  // tracked getters that rely on `args`, and therefore don't require the `updateComponent`
  // hook at all.
  if (!true) {
    EmberGlimmerComponentManager.prototype.updateComponent = function updateComponent(component, args) {
      let argSnapshot = args.named;
      if (false /* DEBUG */) {
        argSnapshot = Object.freeze(argSnapshot);
      }
      (0, _object.set)(component, 'args', argSnapshot);
    };
  }
  var _default = EmberGlimmerComponentManager;
  _exports.default = _default;
});