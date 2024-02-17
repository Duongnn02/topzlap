define("discourse-common/lib/raw-handlebars-helpers", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.RUNTIME_OPTIONS = void 0;
  _exports.registerRawHelpers = registerRawHelpers;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  const RUNTIME_OPTIONS = {
    allowProtoPropertiesByDefault: true
  };
  _exports.RUNTIME_OPTIONS = RUNTIME_OPTIONS;
  function registerRawHelpers(hbs, handlebarsClass) {
    if (!hbs.helpers) {
      hbs.helpers = Object.create(handlebarsClass.helpers);
    }
    if (hbs.__helpers_registered) {
      return;
    }
    hbs.__helpers_registered = true;
    hbs.helpers["get"] = function (context, options) {
      if (!context || !options.contexts) {
        return;
      }
      if (typeof context !== "string") {
        return context;
      }
      let firstContext = options.contexts[0];
      let val = firstContext[context];
      if (context.toString().startsWith("controller.")) {
        context = context.slice(context.indexOf(".") + 1);
      }
      return val === undefined ? (0, _object.get)(firstContext, context) : val;
    };

    // #each .. in support (as format is transformed to this)
    hbs.registerHelper("each", function (localName, inKeyword, contextName, options) {
      if (typeof contextName === "undefined") {
        return;
      }
      let list = (0, _object.get)(this, contextName);
      let output = [];
      for (let i = 0; i < list.length; i++) {
        let innerContext = {};
        innerContext[localName] = list[i];
        output.push(options.fn(innerContext));
      }
      return output.join("");
    });
    function stringCompatHelper(fn) {
      const old = hbs.helpers[fn];
      hbs.helpers[fn] = function (context, options) {
        return old.apply(this, [hbs.helpers.get(context, options), options]);
      };
    }

    // HACK: Ensure that the variable is resolved only once.
    // The "get" function will be called twice because both `if` and `unless`
    // helpers are patched to resolve the variable and `unless` is implemented
    // as not `if`. For example, for {{#unless var}} will generate a stack
    // trace like:
    //
    // - patched-unless("var")  "var" is resolved to its value, val
    // - unless(val)            unless is implemented as !if
    // - !patched-if(val)       val is already resolved, but it is resolved again
    // - !if(???)               at this point, ??? usually stands for undefined
    //
    // The following code ensures that patched-unless will call `if` directly,
    // `patched-unless("var")` will return `!if(val)`.
    const oldIf = hbs.helpers["if"];
    hbs.helpers["unless"] = function (context, options) {
      return oldIf.apply(this, [hbs.helpers.get(context, options), {
        fn: options.inverse,
        inverse: options.fn,
        hash: options.hash
      }]);
    };
    stringCompatHelper("if");
    stringCompatHelper("with");
  }
});