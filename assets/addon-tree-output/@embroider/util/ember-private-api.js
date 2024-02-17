define("@embroider/util/ember-private-api", ["exports", "@embroider/macros/es-compat"], function (_exports, _esCompat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isCurriedComponentDefinition = void 0;
  _exports.lookupCurriedComponentDefinition = lookupCurriedComponentDefinition;
  let runtime;
  {
    // new enough ember has a real module we can import
    runtime = (0, _esCompat.default)(require("@glimmer/runtime"));
  }
  let {
    isCurriedComponentDefinition,
    CurriedComponentDefinition,
    curry,
    CurriedValue
  } = runtime;

  // older embers have isCurriedComponentDefinition, new ones have CurriedValue
  // and instanceof CurriedValue seems good enough.
  _exports.isCurriedComponentDefinition = isCurriedComponentDefinition;
  if (!isCurriedComponentDefinition) {
    _exports.isCurriedComponentDefinition = isCurriedComponentDefinition = function (value) {
      return value instanceof CurriedValue;
    };
  }
  function runtimeResolver(owner) {
    let resolver = owner.lookup('renderer:-dom')._runtimeResolver;
    if (resolver) {
      return resolver;
    }
    let entry = Object.entries(owner.__container__.cache).find(e => e[0].startsWith('template-compiler:main-'));
    if (entry) {
      return entry[1].resolver.resolver;
    }
    throw new Error(`@embroider/util couldn't locate the runtime resolver on this ember version`);
  }
  function lookupCurriedComponentDefinition(name, owner) {
    let resolver = runtimeResolver(owner);
    if (typeof resolver.lookupComponentHandle === 'function') {
      let handle = resolver.lookupComponentHandle(name, contextForLookup(owner));
      if (handle != null) {
        return new CurriedComponentDefinition(resolver.resolve(handle), null);
      }
    }

    // here we're doing the same thing the internal currying does, in order to
    // generate a sane error message (even though we don't actually use
    // resolvedDefinition as part of our return value).
    let resolvedDefinition = resolver.lookupComponent(name, owner);
    if (!resolvedDefinition) {
      throw new Error(`Attempted to resolve \`${name}\` via ensureSafeComponent, but nothing was found.`);
    }
    return curry(0, name, owner, {
      named: {},
      positional: []
    });
  }
  function contextForLookup(owner) {
    {
      return owner;
    }
  }
});