define("ember-modifier/-private/function-based/modifier-manager", ["exports", "@ember/modifier", "ember-modifier/-private/compat"], function (_exports, _modifier, _compat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  class FunctionBasedModifierManager {
    constructor(options) {
      _defineProperty(this, "capabilities", (0, _modifier.capabilities)(true ? '3.22' : '3.13'));
      _defineProperty(this, "options", void 0);
      this.options = {
        eager: options?.eager ?? true
      };
    }
    createModifier(factoryOrClass) {
      const instance = (0, _compat.isFactory)(factoryOrClass) ? factoryOrClass.class : factoryOrClass;
      return {
        element: null,
        instance: instance
      };
    }
    installModifier(createdState, element, args) {
      const state = installElement(createdState, element);
      const {
        positional,
        named
      } = args;
      const teardown = createdState.instance(element, positional, named);
      if (typeof teardown === 'function') {
        state.teardown = teardown;
      }
      if (true && this.options.eager) {
        (0, _compat.consumeArgs)(args);
      }
    }
    updateModifier(state, args) {
      if (state.teardown) {
        state.teardown();
      }
      const teardown = state.instance(state.element, args.positional, args.named);
      if (typeof teardown === 'function') {
        state.teardown = teardown;
      }
      if (true && this.options.eager) {
        (0, _compat.consumeArgs)(args);
      }
    }
    destroyModifier(state) {
      if (typeof state.teardown === 'function') {
        state.teardown();
      }
    }
  }
  _exports.default = FunctionBasedModifierManager;
});