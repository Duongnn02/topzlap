define("ember-modifier/-private/function-based/modifier", ["exports", "@ember/debug", "@ember/modifier", "ember-modifier/-private/class/modifier", "ember-modifier/-private/function-based/modifier-manager"], function (_exports, _debug, _modifier, _modifier2, _modifierManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = modifier;
  // Provide a singleton manager for each of the options. (If we extend this to
  // many more options in the future, we can revisit, but for now this means we
  // only ever allocate two managers.)
  const EAGER_MANAGER = new _modifierManager.default({
    eager: true
  });
  const LAZY_MANAGER = new _modifierManager.default({
    eager: false
  });

  // This type exists to provide a non-user-constructible, non-subclassable
  // type representing the conceptual "instance type" of a function modifier.
  // The abstract field of type `never` prevents subclassing in userspace of
  // the value returned from `modifier()`. By extending `Modifier<S>`, any
  // augmentations of the `Modifier` type performed by tools like Glint will
  // also apply to function-based modifiers as well.
  // This provides a type whose only purpose here is to represent the runtime
  // type of a function-based modifier: a virtually opaque item. The fact that it's
  // a bare constructor type allows `modifier()` to preserve type parameters from
  // a generic function it's passed, and by making it abstract and impossible to
  // subclass (see above) we prevent users from attempting to instantiate the return
  // value from a `modifier()` call.
  /**
   * The (optional) return type for a modifier which needs to perform some kind of
   * cleanup or teardown -- for example, removing an event listener from an
   * element besides the one passed into the modifier.
   */
  /**
   * An API for writing simple modifiers.
   *
   * This function runs the first time when the element the modifier was applied
   * to is inserted into the DOM, and it *autotracks* while running. Any values
   * that it accesses will be tracked, and if any of them changes, the function
   * will run again.
   *
   * **Note:** this will rerun if any of its arguments change, *whether or not you
   * access them*. This is legacy behavior and you should switch to using the
   * `{ eager: false }` variant, which has normal auto-tracking semantics.
   *
   * The modifier can also optionally return a *destructor*. The destructor
   * function will be run just before the next update, and when the element is
   * being removed entirely. It should generally clean up the changes that the
   * modifier made in the first place.
   *
   * @deprecated Until 4.0. Calling `modifier()` without an options argument is
   *   deprecated. It is supported until 4.0 so that existing modifiers can be
   *   migrated individually. Please update your function-based modifiers to pass
   *   `{ eager: false }`.
   *
   * @param fn The function which defines the modifier.
   */
  // This overload allows users to write types directly on the callback passed to
  // the `modifier` function and infer the resulting type correctly.
  /**
   * An API for writing simple modifiers.
   *
   * This function runs the first time when the element the modifier was applied
   * to is inserted into the DOM, and it *autotracks* while running. Any values
   * that it accesses will be tracked, and if any of them changes, the function
   * will run again.
   *
   * **Note:** this will rerun if any of its arguments change, *whether or not you
   * access them*. This is legacy behavior and you should switch to using the
   * `{ eager: false }` variant, which has normal auto-tracking semantics.
   *
   * The modifier can also optionally return a *destructor*. The destructor
   * function will be run just before the next update, and when the element is
   * being removed entirely. It should generally clean up the changes that the
   * modifier made in the first place.
   *
   * @deprecated Until 4.0. Calling `modifier()` with `{ eager: true }` is
   *   deprecated. It is supported until 4.0 so that existing modifiers can be
   *   migrated individually. Please update your function-based modifiers to pass
   *   `{ eager: false }`.
   *
   * @param fn The function which defines the modifier.
   * @param options Configuration for the modifier.
   */
  // This overload allows users to write types directly on the callback passed to
  // the `modifier` function and infer the resulting type correctly.
  /**
   * An API for writing simple modifiers.
   *
   * This function runs the first time when the element the modifier was applied
   * to is inserted into the DOM, and it *autotracks* while running. Any values
   * that it accesses will be tracked, including any of its arguments that it
   * accesses, and if any of them changes, the function will run again.
   *
   * **Note:** this will *not* automatically rerun because an argument changes. It
   * will only rerun if it is *using* that argument (the same as with auto-tracked
   * state in general).
   *
   * The modifier can also optionally return a *destructor*. The destructor
   * function will be run just before the next update, and when the element is
   * being removed entirely. It should generally clean up the changes that the
   * modifier made in the first place.
   *
   * @param fn The function which defines the modifier.
   * @param options Configuration for the modifier.
   */
  // This overload allows users to write types directly on the callback passed to
  // the `modifier` function and infer the resulting type correctly.
  /**
   * An API for writing simple modifiers.
   *
   * This function runs the first time when the element the modifier was applied
   * to is inserted into the DOM, and it *autotracks* while running. Any values
   * that it accesses will be tracked, including any of its arguments that it
   * accesses, and if any of them changes, the function will run again.
   *
   * **Note:** this will *not* automatically rerun because an argument changes. It
   * will only rerun if it is *using* that argument (the same as with auto-tracked
   * state in general).
   *
   * The modifier can also optionally return a *destructor*. The destructor
   * function will be run just before the next update, and when the element is
   * being removed entirely. It should generally clean up the changes that the
   * modifier made in the first place.
   *
   * @param fn The function which defines the modifier.
   * @param options Configuration for the modifier.
   */
  // This overload allows users to provide a `Signature` type explicitly at the
  // modifier definition site, e.g. `modifier<Sig>((el, pos, named) => {...})`.
  // **Note:** this overload must appear second, since TS' inference engine will
  // not correctly infer the type of `S` here from the types on the supplied
  // callback.
  // This is the runtime signature; it performs no inference whatsover and just
  // uses the simplest version of the invocation possible since, for the case of
  // setting it on the modifier manager, we don't *need* any of that info, and
  // the two previous overloads capture all invocations from a type perspective.
  function modifier(fn) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      eager: true
    };
    (true && !(options !== undefined) && (0, _debug.deprecate)(`ember-modifier (for ${fn.name ?? fn} at ${new Error().stack}): creating a function-based modifier without options is deprecated and will be removed at v4.0`, options !== undefined, {
      id: 'ember-modifier.function-based-options',
      for: 'ember-modifier',
      since: {
        available: '3.2.0',
        enabled: '3.2.0'
      },
      until: '4.0.0'
    }));
    (true && !(options?.eager === false) && (0, _debug.deprecate)(`ember-modifier (for ${fn.name ?? fn} at ${new Error().stack}): creating a function-based modifier with \`{ eager: true }\` is deprecated and will be removed at v4.0`, options?.eager === false, {
      id: 'ember-modifier.function-based-options',
      for: 'ember-modifier',
      since: {
        available: '3.2.0',
        enabled: '3.2.0'
      },
      until: '4.0.0'
    })); // SAFETY: the cast here is a *lie*, but it is a useful one. The actual return
    // type of `setModifierManager` today is `void`; we pretend it actually
    // returns an opaque `Modifier` type so that we can provide a result from this
    // type which is useful to TS-aware tooling (e.g. Glint).
    return (0, _modifier.setModifierManager)(() => options.eager ? EAGER_MANAGER : LAZY_MANAGER, fn);
  }

  /**
   * @internal
   */

  /**
   * @deprecated Instead of defining a function to match this type, simply define
   *   a function-based modifier either using a `Signature` or by defining the
   *   types on the callback passed to the `modifier`.
   */
});