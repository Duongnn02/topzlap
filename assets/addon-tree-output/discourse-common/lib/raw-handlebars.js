define("discourse-common/lib/raw-handlebars", ["exports", "handlebars"], function (_exports, _handlebars) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.compile = compile;
  _exports.default = void 0;
  _exports.precompile = precompile;
  _exports.template = template;
  0; //eaimeta@70e063a35619d71f0,"handlebars"eaimeta@70e063a35619d71f
  // This is a mechanism for quickly rendering templates which is Ember aware
  // templates are highly compatible with Ember so you don't need to worry about calling "get"
  // and discourseComputed properties function, additionally it uses stringParams like Ember does
  const RawHandlebars = _handlebars.default.create();
  function buildPath(blk, args) {
    let result = {
      type: "PathExpression",
      data: false,
      depth: blk.path.depth,
      loc: blk.path.loc
    };

    // Server side precompile doesn't have jquery.extend
    Object.keys(args).forEach(function (a) {
      result[a] = args[a];
    });
    return result;
  }
  function replaceGet(ast) {
    let visitor = new _handlebars.default.Visitor();
    visitor.mutating = true;
    visitor.MustacheStatement = function (mustache) {
      if (!(mustache.params.length || mustache.hash)) {
        mustache.params[0] = mustache.path;
        mustache.path = buildPath(mustache, {
          parts: ["get"],
          original: "get",
          strict: true,
          falsy: true
        });
      }
      return _handlebars.default.Visitor.prototype.MustacheStatement.call(this, mustache);
    };

    // rewrite `each x as |y|` as each y in x`
    // This allows us to use the same syntax in all templates
    visitor.BlockStatement = function (block) {
      if (block.path.original === "each" && block.params.length === 1) {
        let paramName = block.program.blockParams[0];
        block.params = [buildPath(block, {
          original: paramName
        }), {
          type: "CommentStatement",
          value: "in"
        }, block.params[0]];
        delete block.program.blockParams;
      }
      return _handlebars.default.Visitor.prototype.BlockStatement.call(this, block);
    };
    visitor.accept(ast);
  }
  if (_handlebars.default.Compiler) {
    RawHandlebars.Compiler = function () {};
    RawHandlebars.Compiler.prototype = Object.create(_handlebars.default.Compiler.prototype);
    RawHandlebars.Compiler.prototype.compiler = RawHandlebars.Compiler;
    RawHandlebars.JavaScriptCompiler = function () {};
    RawHandlebars.JavaScriptCompiler.prototype = Object.create(_handlebars.default.JavaScriptCompiler.prototype);
    RawHandlebars.JavaScriptCompiler.prototype.compiler = RawHandlebars.JavaScriptCompiler;
    RawHandlebars.JavaScriptCompiler.prototype.namespace = "RawHandlebars";
    RawHandlebars.precompile = function (value, asObject) {
      let {
        plugins = []
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let ast = _handlebars.default.parse(value);
      replaceGet(ast);
      plugins.forEach(plugin => plugin(ast));
      let options = {
        knownHelpers: {
          get: true
        },
        data: true,
        stringParams: true
      };
      asObject = asObject === undefined ? true : asObject;
      let environment = new RawHandlebars.Compiler().compile(ast, options);
      return new RawHandlebars.JavaScriptCompiler().compile(environment, options, undefined, asObject);
    };
    RawHandlebars.compile = function (string) {
      let {
        plugins = []
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let ast = _handlebars.default.parse(string);
      replaceGet(ast);
      plugins.forEach(plugin => plugin(ast));

      // this forces us to rewrite helpers
      let options = {
        data: true,
        stringParams: true
      };
      let environment = new RawHandlebars.Compiler().compile(ast, options);
      let templateSpec = new RawHandlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
      let t = RawHandlebars.template(templateSpec);
      t.isMethod = false;
      return t;
    };
  }
  function template() {
    return RawHandlebars.template.apply(this, arguments);
  }
  function precompile() {
    return RawHandlebars.precompile.apply(this, arguments);
  }
  function compile() {
    return RawHandlebars.compile.apply(this, arguments);
  }
  var _default = RawHandlebars;
  _exports.default = _default;
});