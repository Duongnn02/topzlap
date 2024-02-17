define("discourse-common/lib/helpers", ["exports", "@ember/component/helper", "discourse-common/lib/raw-handlebars", "@ember/object", "@ember/template", "@ember/string"], function (_exports, _helper, _rawHandlebars, _object, _template, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createHelperContext = createHelperContext;
  _exports.findHelper = findHelper;
  _exports.helperContext = helperContext;
  _exports.htmlHelper = htmlHelper;
  _exports.makeArray = makeArray;
  _exports.registerHelper = registerHelper;
  _exports.registerHelpers = registerHelpers;
  _exports.registerUnbound = registerUnbound;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"discourse-common/lib/raw-handlebars",0,"@ember/object",0,"@ember/template",0,"@ember/string"eaimeta@70e063a35619d71f
  function makeArray(obj) {
    if (obj === null || obj === undefined) {
      return [];
    }
    return Array.isArray(obj) ? obj : [obj];
  }
  function htmlHelper(fn) {
    return _helper.default.helper(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      args = args.length > 1 ? args[0].concat({
        hash: args[args.length - 1]
      }) : args;
      return (0, _template.htmlSafe)(fn.apply(this, args) || "");
    });
  }
  const _helpers = {};
  function rawGet(ctx, property, options) {
    if (options.types && options.data.view) {
      let view = options.data.view;
      return view.getStream ? view.getStream(property).value() : view.getAttr(property);
    } else {
      return (0, _object.get)(ctx, property);
    }
  }
  function registerHelper(name, fn) {
    _helpers[name] = _helper.default.helper(fn);
  }
  function findHelper(name) {
    return _helpers[name] || _helpers[(0, _string.dasherize)(name)];
  }
  function registerHelpers(registry) {
    Object.keys(_helpers).forEach(name => {
      registry.register(`helper:${name}`, _helpers[name], {
        singleton: false
      });
    });
  }
  let _helperContext;
  function createHelperContext(ctx) {
    _helperContext = ctx;
  }

  // This can be used by a helper to get the SiteSettings. Note you should not
  // be using it outside of helpers (or lib code that helpers use!)
  function helperContext() {
    return _helperContext;
  }
  function resolveParams(ctx, options) {
    let params = {};
    const hash = options.hash;
    if (hash) {
      if (options.hashTypes) {
        Object.keys(hash).forEach(function (k) {
          const type = options.hashTypes[k];
          if (type === "STRING" || type === "StringLiteral" || type === "SubExpression") {
            params[k] = hash[k];
          } else if (type === "ID" || type === "PathExpression") {
            params[k] = rawGet(ctx, hash[k], options);
          }
        });
      } else {
        params = hash;
      }
    }
    return params;
  }
  function registerUnbound(name, fn) {
    const func = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const options = args.pop();
      const properties = args;
      for (let i = 0; i < properties.length; i++) {
        if (options.types && (options.types[i] === "ID" || options.types[i] === "PathExpression")) {
          properties[i] = rawGet(this, properties[i], options);
        }
      }
      return fn.call(this, ...properties, resolveParams(this, options));
    };
    _helpers[name] = _helper.default.extend({
      compute: (params, args) => fn(...params, args)
    });
    _rawHandlebars.default.registerHelper(name, func);
  }
});