define("discourse/lib/ember-action-modifier", ["exports", "ember-modifier"], function (_exports, _emberModifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.actionModifier = void 0;
  _exports.isSimpleClick = isSimpleClick;
  0; //eaimeta@70e063a35619d71f0,"ember-modifier"eaimeta@70e063a35619d71f
  /**
   * Creates a replacement for Ember's built-in `action` modifier that uses
   * `addEventListener` directly instead of relying upon classic event delegation.
   *
   * This relies upon a deep override of Ember's rendering internals. If possible,
   * consider eliminating usage of `action` as a modifier instead.
   *
   * Reference: https://github.com/emberjs/ember.js/blob/master/packages/%40ember/-internals/glimmer/lib/helpers/action.ts
   */
  const actionModifier = (0, _emberModifier.modifier)((element, _ref, _ref2) => {
    let [context, callback, ...args] = _ref;
    let {
      on,
      bubbles,
      preventDefault,
      allowedKeys
    } = _ref2;
    const handler = event => {
      let fn;
      if (typeof callback === "string") {
        fn = context.actions?.[callback] ?? context[callback];
      } else if (typeof callback === "function") {
        fn = callback;
      }
      if (fn === undefined) {
        throw new Error("Unexpected callback for `action` modifier. Please provide either a function or the name of a method on the current context.");
      }
      if (!isAllowedEvent(event, allowedKeys)) {
        return true;
      }
      if (preventDefault !== false) {
        event.preventDefault();
      }
      let shouldBubble = bubbles !== false;
      if (!shouldBubble) {
        event.stopPropagation();
      }
      if (args.length > 0) {
        return fn.call(context, ...args);
      } else {
        return fn.call(context, event);
      }
    };
    const eventName = on ?? "click";
    element.addEventListener(eventName, handler);
    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, {
    eager: false
  });
  _exports.actionModifier = actionModifier;
  function isSimpleClick(event) {
    if (!(event instanceof MouseEvent)) {
      return false;
    }
    let modKey = event.shiftKey || event.metaKey || event.altKey || event.ctrlKey;
    let secondaryClick = event.which > 1; // IE9 may return undefined

    return !modKey && !secondaryClick;
  }
  const MODIFIERS = ["alt", "shift", "meta", "ctrl"];
  const POINTER_EVENT_TYPE_REGEX = /^click|mouse|touch/;
  function isAllowedEvent(event, allowedKeys) {
    if (allowedKeys === null || allowedKeys === undefined) {
      if (POINTER_EVENT_TYPE_REGEX.test(event.type)) {
        return isSimpleClick(event);
      } else {
        allowedKeys = "";
      }
    }
    if (allowedKeys.indexOf("any") >= 0) {
      return true;
    }
    for (let i = 0; i < MODIFIERS.length; i++) {
      if (event[MODIFIERS[i] + "Key"] && allowedKeys.indexOf(MODIFIERS[i]) === -1) {
        return false;
      }
    }
    return true;
  }
});