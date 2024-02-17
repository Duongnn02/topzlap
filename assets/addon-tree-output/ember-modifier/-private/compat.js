define("ember-modifier/-private/compat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.consumeArgs = void 0;
  _exports.isFactory = isFactory;
  function isFactory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _factoryOrClass) {
    return !true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  /**
   * Consume each positional and named argument to entangle it in autotracking and
   * enable updates.
   *
   * This is a temporary workaround for a change in the autotracking semantics of
   * the args proxy introduced in `v3.22`. What changed is that arguments are no
   * longer eagerly consumed. Didn’t use an argument? Then updates won’t be run
   * when its value changes. This workaround reproduces the previous behaviour to
   * avoid introducing a breaking change until a suitable transition path is made
   * available.
   */
  let consumeArgs = noop;
  _exports.consumeArgs = consumeArgs;
  if (true) {
    _exports.consumeArgs = consumeArgs = function (_ref2) {
      let {
        positional,
        named
      } = _ref2;
      // SAFETY: TS before 4.6 does not correctly/fully resolve the type in a way
      // that allows the type checker to see that `positional` must *always* be
      // something which `extends unknown[]` here, because the underlying
      // machinery is fairly complicated and relies on a fair bit of type
      // recursion. It will stop mattering when we cut v4.0, because we won't be
      // doing this anyway.
      const pos = positional;
      for (let i = 0; i < pos.length; i++) {
        pos[i];
      }

      // SAFETY: TS 4.7 does not see that `named` will always be an object here.
      // However, it is guaranteed to be resolved as such by the types. This *may*
      // be a bug (https://github.com/microsoft/TypeScript/issues/48468), but it
      // *should* also stop being relevant once we ship 4.0.
      Object.values(named);
    };
  }
});