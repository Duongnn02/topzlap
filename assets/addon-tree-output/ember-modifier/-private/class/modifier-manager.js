define("ember-modifier/-private/class/modifier-manager", ["exports", "@ember/modifier", "@ember/destroyable", "ember-modifier/-private/class/modifier", "ember-modifier/-private/compat"], function (_exports, _modifier, _destroyable, _modifier2, _compat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function destroyModifier(modifier) {
    modifier.willRemove();
    modifier.willDestroy();
  }

  /**
   * The state bucket used throughout the life-cycle of the modifier. Basically a
   * state *machine*, where the framework calls us with the version we hand back
   * to it at each phase. The two states are the two `extends` versions of this
   * below.
   *
   * @internal
   */

  /**
   * The `State` after calling `createModifier`, and therefore the state available
   * at the start of `InstallModifier`.
   * @internal
   */

  /**
   * The `State` after calling `installModifier`, and therefore the state
   * available in all `updateModifier` calls and in `destroyModifier`.
   * @internal
   */

  // Wraps the unsafe (b/c it mutates, rather than creating new state) code that
  // TS does not yet understand.
  function installElement(state, element) {
    // SAFETY: this cast represents how we are actually handling the state machine
    // transition: from this point forward in the lifecycle of the modifier, it
    // always behaves as `InstalledState<S>`. It is safe because, and *only*
    // because, we immediately initialize `element`. (We cannot create a new state
    // from the old one because the modifier manager API expects mutation of a
    // single state bucket rather than updating it at hook calls.)
    const installedState = state;
    installedState.element = element;
    return installedState;
  }
  function installElementOnInstance(instance, element) {
    // SAFETY: we use the internal API for all class-based modifiers to set this
    // in a way which lets us issue the deprecation warning for anyone accessing
    // `element` as a getter while allowing types to continue working for any
    // existing subclasses (see the discussion on the class definition).
    instance[_modifier2.Element] = element;
  }
  function updateArgsOnInstance(instance, args) {
    // SAFETY: we use the internal API for all class-based modifiers to set this
    // in a way which lets us issue the deprecation warning for anyone accessing
    // `args` as a getter while allowing types to continue working for any
    // existing subclasses (see the discussion on the class definition).
    instance[_modifier2.Args] = args;
  }
  class ClassBasedModifierManager {
    constructor(owner) {
      _defineProperty(this, "capabilities", (0, _modifier.capabilities)(true ? '3.22' : '3.13'));
      this.owner = owner;
    }
    createModifier(factoryOrClass, args) {
      const Modifier = (0, _compat.isFactory)(factoryOrClass) ? factoryOrClass.class : factoryOrClass;
      const modifier = new Modifier(this.owner, args);
      (0, _destroyable.registerDestructor)(modifier, destroyModifier);
      return {
        instance: modifier,
        implementsModify: (0, _modifier2._implementsModify)(modifier),
        element: null
      };
    }
    installModifier(createdState, element, args) {
      const state = installElement(createdState, element);

      // TODO: this can be deleted entirely at v4.
      const {
        instance
      } = state;
      installElementOnInstance(instance, element);
      if (state.implementsModify) {
        instance.modify(element, args.positional, args.named);
      } else {
        // The `consumeArgs()` call provides backwards compatibility on v3 for the
        // deprecated legacy lifecycle hooks (`didInstall`, `didReceiveArguments`,
        // and `didUpdateArguments`), which accidentally had eager consumption
        // semantics prior to Ember 3.22. The new, recommended `modify` hook has
        // the updated lazy semantics associated with normal auto-tracking.
        if (true) {
          (0, _compat.consumeArgs)(args);
        }
        instance.didReceiveArguments();
        instance.didInstall();
      }
    }
    updateModifier(state, args) {
      const {
        instance
      } = state;

      // TODO: remove at 4.0
      updateArgsOnInstance(state.instance, args);
      if (state.implementsModify) {
        instance.modify(state.element, args.positional, args.named);
      } else {
        // The `consumeArgs()` call provides backwards compatibility on v3 for the
        // deprecated legacy lifecycle hooks (`didInstall`, `didReceiveArguments`,
        // and `didUpdateArguments`), which accidentally had eager consumption
        // semantics prior to Ember 3.22. The new, recommended `modify` hook has
        // the updated lazy semantics associated with normal auto-tracking.
        if (true) {
          (0, _compat.consumeArgs)(args);
        }
        instance.didUpdateArguments();
        instance.didReceiveArguments();
      }
    }
    destroyModifier(state) {
      (0, _destroyable.destroy)(state.instance);
    }
  }
  _exports.default = ClassBasedModifierManager;
});