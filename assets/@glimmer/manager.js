define("@glimmer/manager", ["exports", "@glimmer/util", "@glimmer/reference", "@glimmer/validator", "@glimmer/destroyable", "@glimmer/owner"], function (_exports, _util, _reference, _validator, _destroyable, _owner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CustomModifierManager = _exports.CustomHelperManager = _exports.CustomComponentManager = void 0;
  _exports.capabilityFlagsFrom = capabilityFlagsFrom;
  _exports.componentCapabilities = componentCapabilities;
  _exports.getComponentTemplate = getComponentTemplate;
  _exports.getCustomTagFor = getCustomTagFor;
  _exports.getInternalComponentManager = getInternalComponentManager;
  _exports.getInternalHelperManager = getInternalHelperManager;
  _exports.getInternalModifierManager = getInternalModifierManager;
  _exports.hasCapability = hasCapability;
  _exports.hasDestroyable = hasDestroyable;
  _exports.hasInternalComponentManager = hasInternalComponentManager;
  _exports.hasInternalHelperManager = hasInternalHelperManager;
  _exports.hasInternalModifierManager = hasInternalModifierManager;
  _exports.hasValue = hasValue;
  _exports.helperCapabilities = helperCapabilities;
  _exports.managerHasCapability = managerHasCapability;
  _exports.modifierCapabilities = modifierCapabilities;
  _exports.setComponentManager = setComponentManager;
  _exports.setComponentTemplate = setComponentTemplate;
  _exports.setCustomTagFor = setCustomTagFor;
  _exports.setHelperManager = setHelperManager;
  _exports.setInternalComponentManager = setInternalComponentManager;
  _exports.setInternalHelperManager = setInternalHelperManager;
  _exports.setInternalModifierManager = setInternalModifierManager;
  _exports.setModifierManager = setModifierManager;
  var COMPONENT_MANAGERS = new WeakMap();
  var MODIFIER_MANAGERS = new WeakMap();
  var HELPER_MANAGERS = new WeakMap(); ///////////

  var getPrototypeOf = Object.getPrototypeOf;
  function setManager(map, manager, obj) {
    if (false /* DEBUG */ && (typeof obj !== 'object' || obj === null) && typeof obj !== 'function') {
      throw new Error(`Attempted to set a manager on a non-object value. Managers can only be associated with objects or functions. Value was ${(0, _util.debugToString)(obj)}`);
    }
    if (false /* DEBUG */ && map.has(obj)) {
      throw new Error(`Attempted to set the same type of manager multiple times on a value. You can only associate one manager of each type with a given value. Value was ${(0, _util.debugToString)(obj)}`);
    }
    map.set(obj, manager);
    return obj;
  }
  function getManager(map, obj) {
    var pointer = obj;
    while (pointer !== undefined && pointer !== null) {
      var manager = map.get(pointer);
      if (manager !== undefined) {
        return manager;
      }
      pointer = getPrototypeOf(pointer);
    }
    return undefined;
  } ///////////

  function setInternalModifierManager(manager, definition) {
    return setManager(MODIFIER_MANAGERS, manager, definition);
  }
  function getInternalModifierManager(definition, isOptional) {
    if (false /* DEBUG */ && typeof definition !== 'function' && (typeof definition !== 'object' || definition === null)) {
      throw new Error(`Attempted to use a value as a modifier, but it was not an object or function. Modifier definitions must be objects or functions with an associated modifier manager. The value was: ${definition}`);
    }
    var manager = getManager(MODIFIER_MANAGERS, definition);
    if (manager === undefined) {
      if (isOptional === true) {
        return null;
      } else if (false /* DEBUG */) {
        throw new Error(`Attempted to load a modifier, but there wasn't a modifier manager associated with the definition. The definition was: ${(0, _util.debugToString)(definition)}`);
      }
    }
    return manager;
  }
  function setInternalHelperManager(manager, definition) {
    return setManager(HELPER_MANAGERS, manager, definition);
  }
  function getInternalHelperManager(definition, isOptional) {
    if (false /* DEBUG */ && typeof definition !== 'function' && (typeof definition !== 'object' || definition === null)) {
      throw new Error(`Attempted to use a value as a helper, but it was not an object or function. Helper definitions must be objects or functions with an associated helper manager. The value was: ${definition}`);
    }
    var manager = getManager(HELPER_MANAGERS, definition);
    if (manager === undefined) {
      if (isOptional === true) {
        return null;
      } else if (false /* DEBUG */) {
        throw new Error(`Attempted to load a helper, but there wasn't a helper manager associated with the definition. The definition was: ${(0, _util.debugToString)(definition)}`);
      }
    }
    return manager;
  }
  function setInternalComponentManager(factory, obj) {
    return setManager(COMPONENT_MANAGERS, factory, obj);
  }
  function getInternalComponentManager(definition, isOptional) {
    if (false /* DEBUG */ && typeof definition !== 'function' && (typeof definition !== 'object' || definition === null)) {
      throw new Error(`Attempted to use a value as a component, but it was not an object or function. Component definitions must be objects or functions with an associated component manager. The value was: ${definition}`);
    }
    var manager = getManager(COMPONENT_MANAGERS, definition);
    if (manager === undefined) {
      if (isOptional === true) {
        return null;
      } else if (false /* DEBUG */) {
        throw new Error(`Attempted to load a component, but there wasn't a component manager associated with the definition. The definition was: ${(0, _util.debugToString)(definition)}`);
      }
    }
    return manager;
  } ///////////

  function hasInternalComponentManager(definition) {
    return getManager(COMPONENT_MANAGERS, definition) !== undefined;
  }
  function hasInternalHelperManager(definition) {
    return getManager(HELPER_MANAGERS, definition) !== undefined;
  }
  function hasInternalModifierManager(definition) {
    return getManager(MODIFIER_MANAGERS, definition) !== undefined;
  }
  var FROM_CAPABILITIES = false /* DEBUG */ ? new _util._WeakSet() : undefined;
  function buildCapabilities(capabilities) {
    if (false /* DEBUG */) {
      FROM_CAPABILITIES.add(capabilities);
      Object.freeze(capabilities);
    }
    return capabilities;
  }
  /**
   * Converts a ComponentCapabilities object into a 32-bit integer representation.
   */

  function capabilityFlagsFrom(capabilities) {
    return 0 | (capabilities.dynamicLayout ? 1
    /* DynamicLayout */ : 0) | (capabilities.dynamicTag ? 2
    /* DynamicTag */ : 0) | (capabilities.prepareArgs ? 4
    /* PrepareArgs */ : 0) | (capabilities.createArgs ? 8
    /* CreateArgs */ : 0) | (capabilities.attributeHook ? 16
    /* AttributeHook */ : 0) | (capabilities.elementHook ? 32
    /* ElementHook */ : 0) | (capabilities.dynamicScope ? 64
    /* DynamicScope */ : 0) | (capabilities.createCaller ? 128
    /* CreateCaller */ : 0) | (capabilities.updateHook ? 256
    /* UpdateHook */ : 0) | (capabilities.createInstance ? 512
    /* CreateInstance */ : 0) | (capabilities.wrapped ? 1024
    /* Wrapped */ : 0) | (capabilities.willDestroy ? 2048
    /* WillDestroy */ : 0) | (capabilities.hasSubOwner ? 4096
    /* HasSubOwner */ : 0);
  }
  function managerHasCapability(_manager, capabilities, capability) {
    return !!(capabilities & capability);
  }
  function hasCapability(capabilities, capability) {
    return !!(capabilities & capability);
  }
  var CUSTOM_TAG_FOR = new WeakMap();
  function getCustomTagFor(obj) {
    return CUSTOM_TAG_FOR.get(obj);
  }
  function setCustomTagFor(obj, customTagFn) {
    CUSTOM_TAG_FOR.set(obj, customTagFn);
  }
  function convertToInt(prop) {
    if (typeof prop === 'symbol') return null;
    var num = Number(prop);
    if (isNaN(num)) return null;
    return num % 1 === 0 ? num : null;
  }
  function tagForNamedArg(namedArgs, key) {
    return (0, _validator.track)(() => {
      if (key in namedArgs) {
        (0, _reference.valueForRef)(namedArgs[key]);
      }
    });
  }
  function tagForPositionalArg(positionalArgs, key) {
    return (0, _validator.track)(() => {
      if (key === '[]') {
        // consume all of the tags in the positional array
        positionalArgs.forEach(_reference.valueForRef);
      }
      var parsed = convertToInt(key);
      if (parsed !== null && parsed < positionalArgs.length) {
        // consume the tag of the referenced index
        (0, _reference.valueForRef)(positionalArgs[parsed]);
      }
    });
  }
  var argsProxyFor;
  class NamedArgsProxy {
    constructor(named) {
      this.named = named;
    }
    get(_target, prop) {
      var ref = this.named[prop];
      if (ref !== undefined) {
        return (0, _reference.valueForRef)(ref);
      }
    }
    has(_target, prop) {
      return prop in this.named;
    }
    ownKeys() {
      return Object.keys(this.named);
    }
    isExtensible() {
      return false;
    }
    getOwnPropertyDescriptor(_target, prop) {
      if (false /* DEBUG */ && !(prop in this.named)) {
        throw new Error(`args proxies do not have real property descriptors, so you should never need to call getOwnPropertyDescriptor yourself. This code exists for enumerability, such as in for-in loops and Object.keys(). Attempted to get the descriptor for \`${String(prop)}\``);
      }
      return {
        enumerable: true,
        configurable: true
      };
    }
  }
  class PositionalArgsProxy {
    constructor(positional) {
      this.positional = positional;
    }
    get(target, prop) {
      var {
        positional
      } = this;
      if (prop === 'length') {
        return positional.length;
      }
      var parsed = convertToInt(prop);
      if (parsed !== null && parsed < positional.length) {
        return (0, _reference.valueForRef)(positional[parsed]);
      }
      return target[prop];
    }
    isExtensible() {
      return false;
    }
    has(_target, prop) {
      var parsed = convertToInt(prop);
      return parsed !== null && parsed < this.positional.length;
    }
  }
  if (_util.HAS_NATIVE_PROXY) {
    argsProxyFor = (capturedArgs, type) => {
      var {
        named,
        positional
      } = capturedArgs;
      var getNamedTag = (_obj, key) => tagForNamedArg(named, key);
      var getPositionalTag = (_obj, key) => tagForPositionalArg(positional, key);
      var namedHandler = new NamedArgsProxy(named);
      var positionalHandler = new PositionalArgsProxy(positional);
      var namedTarget = Object.create(null);
      var positionalTarget = [];
      if (false /* DEBUG */) {
        var setHandler = function (_target, prop) {
          throw new Error(`You attempted to set ${String(prop)} on the arguments of a component, helper, or modifier. Arguments are immutable and cannot be updated directly, they always represent the values that is passed down. If you want to set default values, you should use a getter and local tracked state instead.`);
        };
        var forInDebugHandler = () => {
          throw new Error(`Object.keys() was called on the positional arguments array for a ${type}, which is not supported. This function is a low-level function that should not need to be called for positional argument arrays. You may be attempting to iterate over the array using for...in instead of for...of.`);
        };
        namedHandler.set = setHandler;
        positionalHandler.set = setHandler;
        positionalHandler.ownKeys = forInDebugHandler;
      }
      var namedProxy = new Proxy(namedTarget, namedHandler);
      var positionalProxy = new Proxy(positionalTarget, positionalHandler);
      setCustomTagFor(namedProxy, getNamedTag);
      setCustomTagFor(positionalProxy, getPositionalTag);
      return {
        named: namedProxy,
        positional: positionalProxy
      };
    };
  } else {
    argsProxyFor = (capturedArgs, _type) => {
      var {
        named,
        positional
      } = capturedArgs;
      var getNamedTag = (_obj, key) => tagForNamedArg(named, key);
      var getPositionalTag = (_obj, key) => tagForPositionalArg(positional, key);
      var namedProxy = {};
      var positionalProxy = [];
      setCustomTagFor(namedProxy, getNamedTag);
      setCustomTagFor(positionalProxy, getPositionalTag);
      Object.keys(named).forEach(name => {
        Object.defineProperty(namedProxy, name, {
          enumerable: true,
          configurable: true,
          get() {
            return (0, _reference.valueForRef)(named[name]);
          }
        });
      });
      positional.forEach((ref, index) => {
        Object.defineProperty(positionalProxy, index, {
          enumerable: true,
          configurable: true,
          get() {
            return (0, _reference.valueForRef)(ref);
          }
        });
      });
      if (false /* DEBUG */) {
        // Prevent mutations in development mode. This will not prevent the
        // proxy from updating, but will prevent assigning new values or pushing
        // for instance.
        Object.freeze(namedProxy);
        Object.freeze(positionalProxy);
      }
      return {
        named: namedProxy,
        positional: positionalProxy
      };
    };
  }
  var CAPABILITIES = {
    dynamicLayout: false,
    dynamicTag: false,
    prepareArgs: false,
    createArgs: true,
    attributeHook: false,
    elementHook: false,
    createCaller: false,
    dynamicScope: true,
    updateHook: true,
    createInstance: true,
    wrapped: false,
    willDestroy: false,
    hasSubOwner: false
  };
  function componentCapabilities(managerAPI, options) {
    if (options === void 0) {
      options = {};
    }
    if (false /* DEBUG */ && managerAPI !== '3.4' && managerAPI !== '3.13') {
      throw new Error('Invalid component manager compatibility specified');
    }
    var updateHook = true;
    if (managerAPI === '3.13') {
      updateHook = Boolean(options.updateHook);
    }
    return buildCapabilities({
      asyncLifeCycleCallbacks: Boolean(options.asyncLifecycleCallbacks),
      destructor: Boolean(options.destructor),
      updateHook
    });
  }
  function hasAsyncLifeCycleCallbacks(delegate) {
    return delegate.capabilities.asyncLifeCycleCallbacks;
  }
  function hasUpdateHook(delegate) {
    return delegate.capabilities.updateHook;
  }
  function hasAsyncUpdateHook(delegate) {
    return hasAsyncLifeCycleCallbacks(delegate) && hasUpdateHook(delegate);
  }
  function hasDestructors(delegate) {
    return delegate.capabilities.destructor;
  }
  /**
    The CustomComponentManager allows addons to provide custom component
    implementations that integrate seamlessly into Ember. This is accomplished
    through a delegate, registered with the custom component manager, which
    implements a set of hooks that determine component behavior.
  
    To create a custom component manager, instantiate a new CustomComponentManager
    class and pass the delegate as the first argument:
  
    ```js
    let manager = new CustomComponentManager({
      // ...delegate implementation...
    });
    ```
  
    ## Delegate Hooks
  
    Throughout the lifecycle of a component, the component manager will invoke
    delegate hooks that are responsible for surfacing those lifecycle changes to
    the end developer.
  
    * `create()` - invoked when a new instance of a component should be created
    * `update()` - invoked when the arguments passed to a component change
    * `getContext()` - returns the object that should be
  */

  class CustomComponentManager {
    constructor(factory) {
      this.factory = factory;
      this.componentManagerDelegates = new WeakMap();
    }
    getDelegateFor(owner) {
      var {
        componentManagerDelegates
      } = this;
      var delegate = componentManagerDelegates.get(owner);
      if (delegate === undefined) {
        var {
          factory
        } = this;
        delegate = factory(owner);
        if (false /* DEBUG */ && !FROM_CAPABILITIES.has(delegate.capabilities)) {
          // TODO: This error message should make sense in both Ember and Glimmer https://github.com/glimmerjs/glimmer-vm/issues/1200
          throw new Error(`Custom component managers must have a \`capabilities\` property that is the result of calling the \`capabilities('3.4' | '3.13')\` (imported via \`import { capabilities } from '@ember/component';\`). Received: \`${JSON.stringify(delegate.capabilities)}\` for: \`${delegate}\``);
        }
        componentManagerDelegates.set(owner, delegate);
      }
      return delegate;
    }
    create(owner, definition, vmArgs) {
      var delegate = this.getDelegateFor(owner);
      var args = argsProxyFor(vmArgs.capture(), 'component');
      var component;
      if (false /* DEBUG */ && _validator.deprecateMutationsInTrackingTransaction !== undefined) {
        (0, _validator.deprecateMutationsInTrackingTransaction)(() => {
          component = delegate.createComponent(definition, args);
        });
      } else {
        component = delegate.createComponent(definition, args);
      }
      return new CustomComponentState(component, delegate, args);
    }
    getDebugName(definition) {
      return typeof definition === 'function' ? definition.name : definition.toString();
    }
    update(bucket) {
      var {
        delegate
      } = bucket;
      if (hasUpdateHook(delegate)) {
        var {
          component,
          args
        } = bucket;
        delegate.updateComponent(component, args);
      }
    }
    didCreate(_ref) {
      var {
        component,
        delegate
      } = _ref;
      if (hasAsyncLifeCycleCallbacks(delegate)) {
        delegate.didCreateComponent(component);
      }
    }
    didUpdate(_ref2) {
      var {
        component,
        delegate
      } = _ref2;
      if (hasAsyncUpdateHook(delegate)) {
        delegate.didUpdateComponent(component);
      }
    }
    didRenderLayout() {}
    didUpdateLayout() {}
    getSelf(_ref3) {
      var {
        component,
        delegate
      } = _ref3;
      return (0, _reference.createConstRef)(delegate.getContext(component), 'this');
    }
    getDestroyable(bucket) {
      var {
        delegate
      } = bucket;
      if (hasDestructors(delegate)) {
        var {
          component
        } = bucket;
        (0, _destroyable.registerDestructor)(bucket, () => delegate.destroyComponent(component));
        return bucket;
      }
      return null;
    }
    getCapabilities() {
      return CAPABILITIES;
    }
  }
  /**
   * Stores internal state about a component instance after it's been created.
   */
  _exports.CustomComponentManager = CustomComponentManager;
  class CustomComponentState {
    constructor(component, delegate, args) {
      this.component = component;
      this.delegate = delegate;
      this.args = args;
    }
  }
  function modifierCapabilities(managerAPI, optionalFeatures) {
    if (optionalFeatures === void 0) {
      optionalFeatures = {};
    }
    if (false /* DEBUG */ && managerAPI !== '3.13' && managerAPI !== '3.22') {
      throw new Error('Invalid modifier manager compatibility specified');
    }
    return buildCapabilities({
      disableAutoTracking: Boolean(optionalFeatures.disableAutoTracking),
      useArgsProxy: managerAPI === '3.13' ? false : true,
      // This capability is used in Ember, exclusively in resolution mode. See the
      // Ember glimmer resolver for details.
      passFactoryToCreate: managerAPI === '3.13'
    });
  }
  /**
    The CustomModifierManager allows addons to provide custom modifier
    implementations that integrate seamlessly into Ember. This is accomplished
    through a delegate, registered with the custom modifier manager, which
    implements a set of hooks that determine modifier behavior.
    To create a custom modifier manager, instantiate a new CustomModifierManager
    class and pass the delegate as the first argument:
  
    ```js
    let manager = new CustomModifierManager({
      // ...delegate implementation...
    });
    ```
  
    ## Delegate Hooks
  
    Throughout the lifecycle of a modifier, the modifier manager will invoke
    delegate hooks that are responsible for surfacing those lifecycle changes to
    the end developer.
    * `createModifier()` - invoked when a new instance of a modifier should be created
    * `installModifier()` - invoked when the modifier is installed on the element
    * `updateModifier()` - invoked when the arguments passed to a modifier change
    * `destroyModifier()` - invoked when the modifier is about to be destroyed
  */

  class CustomModifierManager {
    constructor(factory) {
      this.factory = factory;
      this.componentManagerDelegates = new WeakMap();
    }
    getDelegateFor(owner) {
      var {
        componentManagerDelegates
      } = this;
      var delegate = componentManagerDelegates.get(owner);
      if (delegate === undefined) {
        var {
          factory
        } = this;
        delegate = factory(owner);
        if (false /* DEBUG */ && !FROM_CAPABILITIES.has(delegate.capabilities)) {
          // TODO: This error message should make sense in both Ember and Glimmer https://github.com/glimmerjs/glimmer-vm/issues/1200
          throw new Error(`Custom modifier managers must have a \`capabilities\` property that is the result of calling the \`capabilities('3.13' | '3.22')\` (imported via \`import { capabilities } from '@ember/modifier';\`). Received: \`${JSON.stringify(delegate.capabilities)}\` for: \`${delegate}\``);
        }
        componentManagerDelegates.set(owner, delegate);
      }
      return delegate;
    }
    create(owner, element, definition, capturedArgs) {
      var delegate = this.getDelegateFor(owner);
      var {
        useArgsProxy,
        passFactoryToCreate
      } = delegate.capabilities;
      var argsProxy = argsProxyFor(capturedArgs, 'modifier');
      var args = useArgsProxy ? argsProxy : reifyArgs(capturedArgs);
      var instance;
      var factoryOrDefinition = definition;
      if (passFactoryToCreate) {
        // Make a fake factory. While not perfect, this should generally prevent
        // breakage in users of older modifier capabilities.
        factoryOrDefinition = {
          create(args) {
            var params = (0, _util.assign)({}, args);
            (0, _owner.setOwner)(params, owner);
            return definition.create(args);
          },
          class: definition
        };
      }
      if (false /* DEBUG */ && _validator.deprecateMutationsInTrackingTransaction !== undefined) {
        (0, _validator.deprecateMutationsInTrackingTransaction)(() => {
          instance = delegate.createModifier(factoryOrDefinition, args);
        });
      } else {
        instance = delegate.createModifier(factoryOrDefinition, args);
      }
      var tag = (0, _validator.createUpdatableTag)();
      var state;
      if (useArgsProxy) {
        state = {
          tag,
          element,
          delegate,
          args,
          modifier: instance
        };
      } else {
        state = {
          tag,
          element,
          modifier: instance,
          delegate,
          get args() {
            return reifyArgs(capturedArgs);
          }
        };
      }
      if (false /* DEBUG */) {
        state.debugName = typeof definition === 'function' ? definition.name : definition.toString();
      }
      (0, _destroyable.registerDestructor)(state, () => delegate.destroyModifier(instance, argsProxy));
      return state;
    }
    getDebugName(_ref4) {
      var {
        debugName
      } = _ref4;
      return debugName;
    }
    getTag(_ref5) {
      var {
        tag
      } = _ref5;
      return tag;
    }
    install(_ref6) {
      var {
        element,
        args,
        modifier,
        delegate
      } = _ref6;
      var {
        capabilities
      } = delegate;
      if (capabilities.disableAutoTracking === true) {
        (0, _validator.untrack)(() => delegate.installModifier(modifier, element, args));
      } else {
        delegate.installModifier(modifier, element, args);
      }
    }
    update(_ref7) {
      var {
        args,
        modifier,
        delegate
      } = _ref7;
      var {
        capabilities
      } = delegate;
      if (capabilities.disableAutoTracking === true) {
        (0, _validator.untrack)(() => delegate.updateModifier(modifier, args));
      } else {
        delegate.updateModifier(modifier, args);
      }
    }
    getDestroyable(state) {
      return state;
    }
  }
  _exports.CustomModifierManager = CustomModifierManager;
  function reifyArgs(_ref8) {
    var {
      named,
      positional
    } = _ref8;
    var reifiedNamed = (0, _util.dict)();
    for (var key in named) {
      reifiedNamed[key] = (0, _reference.valueForRef)(named[key]);
    }
    var reifiedPositional = positional.map(_reference.valueForRef);
    return {
      named: reifiedNamed,
      positional: reifiedPositional
    };
  }
  function helperCapabilities(managerAPI, options) {
    if (options === void 0) {
      options = {};
    }
    if (false /* DEBUG */ && managerAPI !== '3.23') {
      throw new Error('Invalid helper manager compatibility specified');
    }
    if (false /* DEBUG */ && (!(options.hasValue || options.hasScheduledEffect) || options.hasValue && options.hasScheduledEffect)) {
      throw new Error('You must pass either the `hasValue` OR the `hasScheduledEffect` capability when defining a helper manager. Passing neither, or both, is not permitted.');
    }
    if (false /* DEBUG */ && options.hasScheduledEffect) {
      throw new Error('The `hasScheduledEffect` capability has not yet been implemented for helper managers. Please pass `hasValue` instead');
    }
    return buildCapabilities({
      hasValue: Boolean(options.hasValue),
      hasDestroyable: Boolean(options.hasDestroyable),
      hasScheduledEffect: Boolean(options.hasScheduledEffect)
    });
  } ////////////

  function hasValue(manager) {
    return manager.capabilities.hasValue;
  }
  function hasDestroyable(manager) {
    return manager.capabilities.hasDestroyable;
  } ////////////

  class CustomHelperManager {
    constructor(factory) {
      this.factory = factory;
      this.helperManagerDelegates = new WeakMap();
      this.undefinedDelegate = null;
    }
    getDelegateForOwner(owner) {
      var delegate = this.helperManagerDelegates.get(owner);
      if (delegate === undefined) {
        var {
          factory
        } = this;
        delegate = factory(owner);
        if (false /* DEBUG */ && !FROM_CAPABILITIES.has(delegate.capabilities)) {
          // TODO: This error message should make sense in both Ember and Glimmer https://github.com/glimmerjs/glimmer-vm/issues/1200
          throw new Error(`Custom helper managers must have a \`capabilities\` property that is the result of calling the \`capabilities('3.23')\` (imported via \`import { capabilities } from '@ember/helper';\`). Received: \`${JSON.stringify(delegate.capabilities)}\` for: \`${delegate}\``);
        }
        this.helperManagerDelegates.set(owner, delegate);
      }
      return delegate;
    }
    getDelegateFor(owner) {
      if (owner === undefined) {
        var {
          undefinedDelegate
        } = this;
        if (undefinedDelegate === null) {
          var {
            factory
          } = this;
          this.undefinedDelegate = undefinedDelegate = factory(undefined);
        }
        return undefinedDelegate;
      } else {
        return this.getDelegateForOwner(owner);
      }
    }
    getHelper(definition) {
      return (capturedArgs, owner) => {
        var _a, _b;
        var manager = this.getDelegateFor(owner);
        var args = argsProxyFor(capturedArgs, 'helper');
        var bucket = manager.createHelper(definition, args);
        if (hasValue(manager)) {
          var cache = (0, _reference.createComputeRef)(() => manager.getValue(bucket), null, false /* DEBUG */ && manager.getDebugName && manager.getDebugName(definition));
          if (hasDestroyable(manager)) {
            (0, _destroyable.associateDestroyableChild)(cache, manager.getDestroyable(bucket));
          }
          return cache;
        } else if (hasDestroyable(manager)) {
          var ref = (0, _reference.createConstRef)(undefined, false /* DEBUG */ && ((_b = (_a = manager.getDebugName) === null || _a === void 0 ? void 0 : _a.call(manager, definition)) !== null && _b !== void 0 ? _b : 'unknown helper'));
          (0, _destroyable.associateDestroyableChild)(ref, manager.getDestroyable(bucket));
          return ref;
        } else {
          return _reference.UNDEFINED_REFERENCE;
        }
      };
    }
  }
  _exports.CustomHelperManager = CustomHelperManager;
  function setComponentManager(factory, obj) {
    return setInternalComponentManager(new CustomComponentManager(factory), obj);
  }
  function setModifierManager(factory, obj) {
    return setInternalModifierManager(new CustomModifierManager(factory), obj);
  }
  function setHelperManager(factory, obj) {
    return setInternalHelperManager(new CustomHelperManager(factory), obj);
  }
  var TEMPLATES = new WeakMap();
  var getPrototypeOf$1 = Object.getPrototypeOf;
  function setComponentTemplate(factory, obj) {
    if (false /* DEBUG */ && !(obj !== null && (typeof obj === 'object' || typeof obj === 'function'))) {
      throw new Error(`Cannot call \`setComponentTemplate\` on \`${(0, _util.debugToString)(obj)}\``);
    }
    if (false /* DEBUG */ && TEMPLATES.has(obj)) {
      throw new Error(`Cannot call \`setComponentTemplate\` multiple times on the same class (\`${(0, _util.debugToString)(obj)}\`)`);
    }
    TEMPLATES.set(obj, factory);
    return obj;
  }
  function getComponentTemplate(obj) {
    var pointer = obj;
    while (pointer !== null) {
      var template = TEMPLATES.get(pointer);
      if (template !== undefined) {
        return template;
      }
      pointer = getPrototypeOf$1(pointer);
    }
    return undefined;
  }
});