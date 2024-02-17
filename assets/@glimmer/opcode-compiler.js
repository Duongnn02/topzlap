define("@glimmer/opcode-compiler", ["exports", "@glimmer/util", "@glimmer/vm", "@glimmer/global-context", "@glimmer/manager", "@glimmer/encoder"], function (_exports, _util, _vm, _globalContext, _manager, _encoder) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.WrappedBuilder = _exports.StdLib = _exports.PartialDefinitionImpl = _exports.MINIMAL_CAPABILITIES = _exports.EMPTY_BLOCKS = _exports.DEFAULT_CAPABILITIES = _exports.CompileTimeCompilationContextImpl = void 0;
  _exports.compilable = compilable;
  _exports.compileStatements = compileStatements;
  _exports.compileStd = compileStd;
  _exports.debugCompiler = void 0;
  _exports.invokeStaticBlock = InvokeStaticBlock;
  _exports.invokeStaticBlockWithStack = InvokeStaticBlockWithStack;
  _exports.meta = meta;
  _exports.programCompilationContext = programCompilationContext;
  _exports.templateCacheCounters = void 0;
  _exports.templateCompilationContext = templateCompilationContext;
  _exports.templateFactory = templateFactory;
  class NamedBlocksImpl {
    constructor(blocks) {
      this.blocks = blocks;
      this.names = blocks ? Object.keys(blocks) : [];
    }
    get(name) {
      if (!this.blocks) return null;
      return this.blocks[name] || null;
    }
    has(name) {
      var {
        blocks
      } = this;
      return blocks !== null && name in blocks;
    }
    with(name, block) {
      var {
        blocks
      } = this;
      if (blocks) {
        return new NamedBlocksImpl((0, _util.assign)({}, blocks, {
          [name]: block
        }));
      } else {
        return new NamedBlocksImpl({
          [name]: block
        });
      }
    }
    get hasAny() {
      return this.blocks !== null;
    }
  }
  var EMPTY_BLOCKS = new NamedBlocksImpl(null);
  _exports.EMPTY_BLOCKS = EMPTY_BLOCKS;
  function namedBlocks(blocks) {
    if (blocks === null) {
      return EMPTY_BLOCKS;
    }
    var out = (0, _util.dict)();
    var [keys, values] = blocks;
    for (var i = 0; i < keys.length; i++) {
      out[keys[i]] = values[i];
    }
    return new NamedBlocksImpl(out);
  }
  function labelOperand(value) {
    return {
      type: 1
      /* Label */,

      value
    };
  }
  function evalSymbolsOperand() {
    return {
      type: 3
      /* EvalSymbols */,

      value: undefined
    };
  }
  function isStrictMode() {
    return {
      type: 2
      /* IsStrictMode */,

      value: undefined
    };
  }
  function blockOperand(value) {
    return {
      type: 4
      /* Block */,

      value
    };
  }
  function stdlibOperand(value) {
    return {
      type: 5
      /* StdLib */,

      value
    };
  }
  function nonSmallIntOperand(value) {
    return {
      type: 6
      /* NonSmallInt */,

      value
    };
  }
  function symbolTableOperand(value) {
    return {
      type: 7
      /* SymbolTable */,

      value
    };
  }
  function layoutOperand(value) {
    return {
      type: 8
      /* Layout */,

      value
    };
  }
  function isGetLikeTuple(opcode) {
    return Array.isArray(opcode) && opcode.length === 2;
  }
  function makeResolutionTypeVerifier(typeToVerify) {
    return opcode => {
      if (!isGetLikeTuple(opcode)) return false;
      var type = opcode[0];
      return type === 31
      /* GetStrictFree */ || type === 32
      /* GetTemplateSymbol */ || type === typeToVerify;
    };
  }
  var isGetFreeComponent = makeResolutionTypeVerifier(39
  /* GetFreeAsComponentHead */);

  var isGetFreeModifier = makeResolutionTypeVerifier(38
  /* GetFreeAsModifierHead */);

  var isGetFreeHelper = makeResolutionTypeVerifier(37
  /* GetFreeAsHelperHead */);

  var isGetFreeComponentOrHelper = makeResolutionTypeVerifier(35
  /* GetFreeAsComponentOrHelperHead */);

  var isGetFreeOptionalComponentOrHelper = makeResolutionTypeVerifier(34
  /* GetFreeAsComponentOrHelperHeadOrThisFallback */);

  function assertResolverInvariants(meta) {
    if (false /* DEBUG */) {
      if (!meta.upvars) {
        throw new Error('Attempted to resolve a component, helper, or modifier, but no free vars were found');
      }
      if (!meta.owner) {
        throw new Error('Attempted to resolve a component, helper, or modifier, but no owner was associated with the template it was being resolved from');
      }
    }
    return meta;
  }
  /**
   * <Foo/>
   * <Foo></Foo>
   * <Foo @arg={{true}} />
   */

  function resolveComponent(resolver, constants, meta, _ref) {
    var [, expr, then] = _ref;
    var type = expr[0];
    if (false /* DEBUG */ && expr[0] === 31
    /* GetStrictFree */) {
      throw new Error(`Attempted to resolve a component in a strict mode template, but that value was not in scope: ${meta.upvars[expr[1]]}`);
    }
    if (type === 32
    /* GetTemplateSymbol */) {
      var {
        scopeValues,
        owner
      } = meta;
      var definition = scopeValues[expr[1]];
      then(constants.component(definition, owner));
    } else {
      var {
        upvars,
        owner: _owner
      } = assertResolverInvariants(meta);
      var name = upvars[expr[1]];
      var _definition = resolver.lookupComponent(name, _owner);
      if (false /* DEBUG */ && (typeof _definition !== 'object' || _definition === null)) {
        throw new Error(`Attempted to resolve \`${name}\`, which was expected to be a component, but nothing was found.`);
      }
      then(constants.resolvedComponent(_definition, name));
    }
  }
  /**
   * (helper)
   * (helper arg)
   */

  function resolveHelper(resolver, constants, meta, _ref2) {
    var [, expr, then] = _ref2;
    var type = expr[0];
    if (type === 32
    /* GetTemplateSymbol */) {
      var {
        scopeValues
      } = meta;
      var definition = scopeValues[expr[1]];
      then(constants.helper(definition));
    } else if (type === 31
    /* GetStrictFree */) {
      then(lookupBuiltInHelper(expr, resolver, meta, constants, 'helper'));
    } else {
      var {
        upvars,
        owner
      } = assertResolverInvariants(meta);
      var name = upvars[expr[1]];
      var helper = resolver.lookupHelper(name, owner);
      if (false /* DEBUG */ && helper === null) {
        throw new Error(`Attempted to resolve \`${name}\`, which was expected to be a helper, but nothing was found.`);
      }
      then(constants.helper(helper, name));
    }
  }
  /**
   * <div {{modifier}}/>
   * <div {{modifier arg}}/>
   * <Foo {{modifier}}/>
   */

  function resolveModifier(resolver, constants, meta, _ref3) {
    var [, expr, then] = _ref3;
    var type = expr[0];
    if (type === 32
    /* GetTemplateSymbol */) {
      var {
        scopeValues
      } = meta;
      var definition = scopeValues[expr[1]];
      then(constants.modifier(definition));
    } else if (type === 31
    /* GetStrictFree */) {
      var {
        upvars
      } = assertResolverInvariants(meta);
      var name = upvars[expr[1]];
      var modifier = resolver.lookupBuiltInModifier(name);
      if (false /* DEBUG */ && modifier === null) {
        throw new Error(`Attempted to resolve a modifier in a strict mode template, but it was not in scope: ${name}`);
      }
      then(constants.modifier(modifier, name));
    } else {
      var {
        upvars: _upvars,
        owner
      } = assertResolverInvariants(meta);
      var _name2 = _upvars[expr[1]];
      var _modifier = resolver.lookupModifier(_name2, owner);
      if (false /* DEBUG */ && _modifier === null) {
        throw new Error(`Attempted to resolve \`${_name2}\`, which was expected to be a modifier, but nothing was found.`);
      }
      then(constants.modifier(_modifier, _name2));
    }
  }
  /**
   * {{component-or-helper arg}}
   */

  function resolveComponentOrHelper(resolver, constants, meta, _ref4) {
    var [, expr, {
      ifComponent,
      ifHelper
    }] = _ref4;
    var type = expr[0];
    if (type === 32
    /* GetTemplateSymbol */) {
      var {
        scopeValues,
        owner
      } = meta;
      var definition = scopeValues[expr[1]];
      var component = constants.component(definition, owner, true);
      if (component !== null) {
        ifComponent(component);
        return;
      }
      var helper = constants.helper(definition, null, true);
      if (false /* DEBUG */ && helper === null) {
        throw new Error(`Attempted to use a value as either a component or helper, but it did not have a component manager or helper manager associated with it. The value was: ${(0, _util.debugToString)(definition)}`);
      }
      ifHelper(helper);
    } else if (type === 31
    /* GetStrictFree */) {
      ifHelper(lookupBuiltInHelper(expr, resolver, meta, constants, 'component or helper'));
    } else {
      var {
        upvars,
        owner: _owner2
      } = assertResolverInvariants(meta);
      var name = upvars[expr[1]];
      var _definition2 = resolver.lookupComponent(name, _owner2);
      if (_definition2 !== null) {
        ifComponent(constants.resolvedComponent(_definition2, name));
      } else {
        var _helper = resolver.lookupHelper(name, _owner2);
        if (false /* DEBUG */ && _helper === null) {
          throw new Error(`Attempted to resolve \`${name}\`, which was expected to be a component or helper, but nothing was found.`);
        }
        ifHelper(constants.helper(_helper, name));
      }
    }
  }
  /**
   * <Foo @arg={{helper}}>
   */

  function resolveOptionalHelper(resolver, constants, meta, _ref5) {
    var [, expr, {
      ifHelper,
      ifFallback
    }] = _ref5;
    var {
      upvars,
      owner
    } = assertResolverInvariants(meta);
    var name = upvars[expr[1]];
    var helper = resolver.lookupHelper(name, owner);
    if (helper === null) {
      ifFallback(name, meta.moduleName);
    } else {
      ifHelper(constants.helper(helper, name), name, meta.moduleName);
    }
  }
  /**
   * {{maybeHelperOrComponent}}
   */

  function resolveOptionalComponentOrHelper(resolver, constants, meta, _ref6) {
    var [, expr, {
      ifComponent,
      ifHelper,
      ifValue,
      ifFallback
    }] = _ref6;
    var type = expr[0];
    if (type === 32
    /* GetTemplateSymbol */) {
      var {
        scopeValues,
        owner
      } = meta;
      var definition = scopeValues[expr[1]];
      if (typeof definition !== 'function' && (typeof definition !== 'object' || definition === null)) {
        // The value is not an object, so it can't be a component or helper.
        ifValue(constants.value(definition));
        return;
      }
      var component = constants.component(definition, owner, true);
      if (component !== null) {
        ifComponent(component);
        return;
      }
      var helper = constants.helper(definition, null, true);
      if (helper !== null) {
        ifHelper(helper);
        return;
      }
      ifValue(constants.value(definition));
    } else if (type === 31
    /* GetStrictFree */) {
      ifHelper(lookupBuiltInHelper(expr, resolver, meta, constants, 'value'));
    } else {
      var {
        upvars,
        owner: _owner3
      } = assertResolverInvariants(meta);
      var name = upvars[expr[1]];
      var _definition3 = resolver.lookupComponent(name, _owner3);
      if (_definition3 !== null) {
        ifComponent(constants.resolvedComponent(_definition3, name));
        return;
      }
      var _helper2 = resolver.lookupHelper(name, _owner3);
      if (_helper2 !== null) {
        ifHelper(constants.helper(_helper2, name));
        return;
      }
      ifFallback(name);
    }
  }
  function lookupBuiltInHelper(expr, resolver, meta, constants, type) {
    var {
      upvars
    } = assertResolverInvariants(meta);
    var name = upvars[expr[1]];
    var helper = resolver.lookupBuiltInHelper(name);
    if (false /* DEBUG */ && helper === null) {
      // Keyword helper did not exist, which means that we're attempting to use a
      // value of some kind that is not in scope
      throw new Error(`Attempted to resolve a ${type} in a strict mode template, but that value was not in scope: ${meta.upvars[expr[1]]}`);
    }
    return constants.helper(helper, name);
  }
  class Compilers {
    constructor() {
      this.names = {};
      this.funcs = [];
    }
    add(name, func) {
      this.names[name] = this.funcs.push(func) - 1;
    }
    compile(op, sexp) {
      var name = sexp[0];
      var index = this.names[name];
      var func = this.funcs[index];
      func(op, sexp);
    }
  }
  var EXPRESSIONS = new Compilers();
  EXPRESSIONS.add(29
  /* Concat */, (op, _ref7) => {
    var [, parts] = _ref7;
    for (var part of parts) {
      expr(op, part);
    }
    op(27
    /* Concat */, parts.length);
  });
  EXPRESSIONS.add(28
  /* Call */, (op, _ref8) => {
    var [, expression, positional, named] = _ref8;
    if (isGetFreeHelper(expression)) {
      op(1005
      /* ResolveHelper */, expression, handle => {
        Call(op, handle, positional, named);
      });
    } else {
      expr(op, expression);
      CallDynamic(op, positional, named);
    }
  });
  EXPRESSIONS.add(50
  /* Curry */, (op, _ref9) => {
    var [, expr$$1, type, positional, named] = _ref9;
    Curry(op, type, expr$$1, positional, named);
  });
  EXPRESSIONS.add(30
  /* GetSymbol */, (op, _ref10) => {
    var [, sym, path] = _ref10;
    op(21
    /* GetVariable */, sym);
    withPath(op, path);
  });
  EXPRESSIONS.add(32
  /* GetTemplateSymbol */, (op, _ref11) => {
    var [, sym, path] = _ref11;
    op(1011
    /* ResolveTemplateLocal */, sym, handle => {
      op(29
      /* ConstantReference */, handle);
      withPath(op, path);
    });
  });
  EXPRESSIONS.add(31
  /* GetStrictFree */, (op, _ref12) => {
    var [, sym, _path] = _ref12;
    op(1009
    /* ResolveFree */, sym, _handle => {// TODO: Implement in strict mode
    });
  });
  EXPRESSIONS.add(33
  /* GetFreeAsFallback */, (op, _ref13) => {
    var [, freeVar, path] = _ref13;
    op(1010
    /* ResolveLocal */, freeVar, (name, moduleName) => {
      if (false /* DEBUG */) {
        var propertyPath = path ? [name, ...path].join('.') : name;
        (true && !(false) && (0, _globalContext.deprecate)(`The \`${propertyPath}\` property path was used in the \`${moduleName}\` template without using \`this\`. This fallback behavior has been deprecated, all properties must be looked up on \`this\` when used in the template: {{this.${propertyPath}}}`, false, {
          id: 'this-property-fallback'
        }));
      }
      op(21
      /* GetVariable */, 0);
      op(22
      /* GetProperty */, name);
    });
    withPath(op, path);
  });
  EXPRESSIONS.add(34
  /* GetFreeAsComponentOrHelperHeadOrThisFallback */, () => {
    // TODO: The logic for this opcode currently exists in STATEMENTS.Append, since
    // we want different wrapping logic depending on if we are invoking a component,
    // helper, or {{this}} fallback. Eventually we fix the opcodes so that we can
    // traverse the subexpression tree like normal in this location.
    throw new Error('unimplemented opcode');
  });
  EXPRESSIONS.add(36
  /* GetFreeAsHelperHeadOrThisFallback */, (op, expr$$1) => {
    // <div id={{baz}}>
    op(1010
    /* ResolveLocal */, expr$$1[1], _name => {
      op(1006
      /* ResolveOptionalHelper */, expr$$1, {
        ifHelper: handle => {
          Call(op, handle, null, null);
        },
        ifFallback: (name, moduleName) => {
          (true && !(false) && (0, _globalContext.deprecate)(`The \`${name}\` property was used in the \`${moduleName}\` template without using \`this\`. This fallback behavior has been deprecated, all properties must be looked up on \`this\` when used in the template: {{this.${name}}}`, false, {
            id: 'this-property-fallback'
          }));
          op(21
          /* GetVariable */, 0);
          op(22
          /* GetProperty */, name);
        }
      });
    });
  });
  EXPRESSIONS.add(99
  /* GetFreeAsDeprecatedHelperHeadOrThisFallback */, (op, expr$$1) => {
    // <Foo @bar={{baz}}>
    op(1010
    /* ResolveLocal */, expr$$1[1], _name => {
      op(1006
      /* ResolveOptionalHelper */, expr$$1, {
        ifHelper: (handle, name, moduleName) => {
          (false && (0, _globalContext.assert)(expr$$1[2] && expr$$1[2].length === 1, '[BUG] Missing argument name'));
          var arg = expr$$1[2][0];
          (true && !(false) && (0, _globalContext.deprecate)(`The \`${name}\` helper was used in the \`${moduleName}\` template as \`${arg}={{${name}}}\`. ` + `This is ambigious between wanting the \`${arg}\` argument to be the \`${name}\` helper itself, ` + `or the result of invoking the \`${name}\` helper (current behavior). ` + `This implicit invocation behavior has been deprecated.\n\n` + `Instead, please explicitly invoke the helper with parenthesis, i.e. \`${arg}={{(${name})}}\`.\n\n` + `Note: the parenthesis are only required in this exact scenario where an ambiguity is present – where ` + `\`${name}\` referes to a global helper (as opposed to a local variable), AND ` + `the \`${name}\` helper invocation does not take any arguments, AND ` + `this occurs in a named argument position of a component invocation.\n\n` + `We expect this combination to be quite rare, as most helpers require at least one argument. ` + `There is no need to refactor helper invocations in cases where this deprecation was not triggered.`, false, {
            id: 'argument-less-helper-paren-less-invocation'
          }));
          Call(op, handle, null, null);
        },
        ifFallback: (name, moduleName) => {
          (true && !(false) && (0, _globalContext.deprecate)(`The \`${name}\` property was used in the \`${moduleName}\` template without using \`this\`. This fallback behavior has been deprecated, all properties must be looked up on \`this\` when used in the template: {{this.${name}}}`, false, {
            id: 'this-property-fallback'
          }));
          op(21
          /* GetVariable */, 0);
          op(22
          /* GetProperty */, name);
        }
      });
    });
  });
  function withPath(op, path) {
    if (path === undefined || path.length === 0) return;
    for (var i = 0; i < path.length; i++) {
      op(22
      /* GetProperty */, path[i]);
    }
  }
  EXPRESSIONS.add(27
  /* Undefined */, op => PushPrimitiveReference(op, undefined));
  EXPRESSIONS.add(48
  /* HasBlock */, (op, _ref14) => {
    var [, block] = _ref14;
    expr(op, block);
    op(25
    /* HasBlock */);
  });

  EXPRESSIONS.add(49
  /* HasBlockParams */, (op, _ref15) => {
    var [, block] = _ref15;
    expr(op, block);
    op(24
    /* SpreadBlock */);

    op(61
    /* CompileBlock */);

    op(26
    /* HasBlockParams */);
  });

  EXPRESSIONS.add(52
  /* IfInline */, (op, _ref16) => {
    var [, condition, truthy, falsy] = _ref16;
    // Push in reverse order
    expr(op, falsy);
    expr(op, truthy);
    expr(op, condition);
    op(109
    /* IfInline */);
  });

  EXPRESSIONS.add(51
  /* Not */, (op, _ref17) => {
    var [, value] = _ref17;
    expr(op, value);
    op(110
    /* Not */);
  });

  EXPRESSIONS.add(53
  /* GetDynamicVar */, (op, _ref18) => {
    var [, expression] = _ref18;
    expr(op, expression);
    op(111
    /* GetDynamicVar */);
  });

  EXPRESSIONS.add(54
  /* Log */, (op, _ref19) => {
    var [, positional] = _ref19;
    op(0
    /* PushFrame */);

    SimpleArgs(op, positional, null, false);
    op(112
    /* Log */);

    op(1
    /* PopFrame */);

    op(36
    /* Fetch */, _vm.$v0);
  });
  function expr(op, expression) {
    if (Array.isArray(expression)) {
      EXPRESSIONS.compile(op, expression);
    } else {
      PushPrimitive(op, expression);
      op(31
      /* PrimitiveReference */);
    }
  }

  /**
   * Compile arguments, pushing an Arguments object onto the stack.
   *
   * @param args.params
   * @param args.hash
   * @param args.blocks
   * @param args.atNames
   */

  function CompileArgs(op, positional, named, blocks, atNames) {
    var blockNames = blocks.names;
    for (var i = 0; i < blockNames.length; i++) {
      PushYieldableBlock(op, blocks.get(blockNames[i]));
    }
    var count = CompilePositional(op, positional);
    var flags = count << 4;
    if (atNames) flags |= 0b1000;
    if (blocks) {
      flags |= 0b111;
    }
    var names = _util.EMPTY_ARRAY;
    if (named) {
      names = named[0];
      var val = named[1];
      for (var _i = 0; _i < val.length; _i++) {
        expr(op, val[_i]);
      }
    }
    op(82
    /* PushArgs */, names, blockNames, flags);
  }
  function SimpleArgs(op, positional, named, atNames) {
    if (positional === null && named === null) {
      op(83
      /* PushEmptyArgs */);

      return;
    }
    var count = CompilePositional(op, positional);
    var flags = count << 4;
    if (atNames) flags |= 0b1000;
    var names = _util.EMPTY_STRING_ARRAY;
    if (named) {
      names = named[0];
      var val = named[1];
      for (var i = 0; i < val.length; i++) {
        expr(op, val[i]);
      }
    }
    op(82
    /* PushArgs */, names, _util.EMPTY_STRING_ARRAY, flags);
  }
  /**
   * Compile an optional list of positional arguments, which pushes each argument
   * onto the stack and returns the number of parameters compiled
   *
   * @param positional an optional list of positional arguments
   */

  function CompilePositional(op, positional) {
    if (positional === null) return 0;
    for (var i = 0; i < positional.length; i++) {
      expr(op, positional[i]);
    }
    return positional.length;
  }
  function meta(layout) {
    var _a, _b;
    var [, symbols,, upvars] = layout.block;
    return {
      asPartial: layout.asPartial || false,
      evalSymbols: evalSymbols(layout),
      upvars: upvars,
      scopeValues: (_b = (_a = layout.scope) === null || _a === void 0 ? void 0 : _a.call(layout)) !== null && _b !== void 0 ? _b : null,
      isStrictMode: layout.isStrictMode,
      moduleName: layout.moduleName,
      owner: layout.owner,
      size: symbols.length
    };
  }
  function evalSymbols(layout) {
    var {
      block
    } = layout;
    var [, symbols, hasEval] = block;
    return hasEval ? symbols : null;
  }

  /**
   * Push a reference onto the stack corresponding to a statically known primitive
   * @param value A JavaScript primitive (undefined, null, boolean, number or string)
   */

  function PushPrimitiveReference(op, value) {
    PushPrimitive(op, value);
    op(31
    /* PrimitiveReference */);
  }
  /**
   * Push an encoded representation of a JavaScript primitive on the stack
   *
   * @param value A JavaScript primitive (undefined, null, boolean, number or string)
   */

  function PushPrimitive(op, primitive) {
    var p = primitive;
    if (typeof p === 'number') {
      p = (0, _util.isSmallInt)(p) ? (0, _util.encodeImmediate)(p) : nonSmallIntOperand(p);
    }
    op(30
    /* Primitive */, p);
  }
  /**
   * Invoke a foreign function (a "helper") based on a statically known handle
   *
   * @param op The op creation function
   * @param handle A handle
   * @param positional An optional list of expressions to compile
   * @param named An optional list of named arguments (name + expression) to compile
   */

  function Call(op, handle, positional, named) {
    op(0
    /* PushFrame */);

    SimpleArgs(op, positional, named, false);
    op(16
    /* Helper */, handle);
    op(1
    /* PopFrame */);

    op(36
    /* Fetch */, _vm.$v0);
  }
  /**
   * Invoke a foreign function (a "helper") based on a dynamically loaded definition
   *
   * @param op The op creation function
   * @param positional An optional list of expressions to compile
   * @param named An optional list of named arguments (name + expression) to compile
   */

  function CallDynamic(op, positional, named, append) {
    op(0
    /* PushFrame */);

    SimpleArgs(op, positional, named, false);
    op(33
    /* Dup */, _vm.$fp, 1);
    op(107
    /* DynamicHelper */);

    if (append) {
      op(36
      /* Fetch */, _vm.$v0);
      append();
      op(1
      /* PopFrame */);

      op(34
      /* Pop */, 1);
    } else {
      op(1
      /* PopFrame */);

      op(34
      /* Pop */, 1);
      op(36
      /* Fetch */, _vm.$v0);
    }
  }
  /**
   * Evaluate statements in the context of new dynamic scope entries. Move entries from the
   * stack into named entries in the dynamic scope, then evaluate the statements, then pop
   * the dynamic scope
   *
   * @param names a list of dynamic scope names
   * @param block a function that returns a list of statements to evaluate
   */

  function DynamicScope(op, names, block) {
    op(59
    /* PushDynamicScope */);

    op(58
    /* BindDynamicScope */, names);
    block();
    op(60
    /* PopDynamicScope */);
  }

  function Curry(op, type, definition, positional, named) {
    op(0
    /* PushFrame */);

    SimpleArgs(op, positional, named, false);
    op(86
    /* CaptureArgs */);

    expr(op, definition);
    op(77
    /* Curry */, type, isStrictMode());
    op(1
    /* PopFrame */);

    op(36
    /* Fetch */, _vm.$v0);
  }

  /**
   * Yield to a block located at a particular symbol location.
   *
   * @param to the symbol containing the block to yield to
   * @param params optional block parameters to yield to the block
   */

  function YieldBlock(op, to, positional) {
    SimpleArgs(op, positional, null, true);
    op(23
    /* GetBlock */, to);
    op(24
    /* SpreadBlock */);

    op(61
    /* CompileBlock */);

    op(64
    /* InvokeYield */);

    op(40
    /* PopScope */);

    op(1
    /* PopFrame */);
  }
  /**
   * Push an (optional) yieldable block onto the stack. The yieldable block must be known
   * statically at compile time.
   *
   * @param block An optional Compilable block
   */

  function PushYieldableBlock(op, block) {
    PushSymbolTable(op, block && block[1]);
    op(62
    /* PushBlockScope */);

    PushCompilable(op, block);
  }
  /**
   * Invoke a block that is known statically at compile time.
   *
   * @param block a Compilable block
   */

  function InvokeStaticBlock(op, block) {
    op(0
    /* PushFrame */);

    PushCompilable(op, block);
    op(61
    /* CompileBlock */);

    op(2
    /* InvokeVirtual */);

    op(1
    /* PopFrame */);
  }
  /**
   * Invoke a static block, preserving some number of stack entries for use in
   * updating.
   *
   * @param block A compilable block
   * @param callerCount A number of stack entries to preserve
   */

  function InvokeStaticBlockWithStack(op, block, callerCount) {
    var parameters = block[1];
    var calleeCount = parameters.length;
    var count = Math.min(callerCount, calleeCount);
    if (count === 0) {
      InvokeStaticBlock(op, block);
      return;
    }
    op(0
    /* PushFrame */);

    if (count) {
      op(39
      /* ChildScope */);

      for (var i = 0; i < count; i++) {
        op(33
        /* Dup */, _vm.$fp, callerCount - i);
        op(19
        /* SetVariable */, parameters[i]);
      }
    }
    PushCompilable(op, block);
    op(61
    /* CompileBlock */);

    op(2
    /* InvokeVirtual */);

    if (count) {
      op(40
      /* PopScope */);
    }

    op(1
    /* PopFrame */);
  }

  function PushSymbolTable(op, parameters) {
    if (parameters !== null) {
      op(63
      /* PushSymbolTable */, symbolTableOperand({
        parameters
      }));
    } else {
      PushPrimitive(op, null);
    }
  }
  function PushCompilable(op, _block) {
    if (_block === null) {
      PushPrimitive(op, null);
    } else {
      op(28
      /* Constant */, blockOperand(_block));
    }
  }
  function SwitchCases(op, bootstrap, callback) {
    // Setup the switch DSL
    var clauses = [];
    var count = 0;
    function when(match, callback) {
      clauses.push({
        match,
        callback,
        label: `CLAUSE${count++}`
      });
    } // Call the callback

    callback(when); // Emit the opcodes for the switch

    op(69
    /* Enter */, 1);
    bootstrap();
    op(1001
    /* StartLabels */); // First, emit the jump opcodes. We don't need a jump for the last
    // opcode, since it bleeds directly into its clause.

    for (var clause of clauses.slice(0, -1)) {
      op(67
      /* JumpEq */, labelOperand(clause.label), clause.match);
    } // Enumerate the clauses in reverse order. Earlier matches will
    // require fewer checks.

    for (var i = clauses.length - 1; i >= 0; i--) {
      var _clause = clauses[i];
      op(1000
      /* Label */, _clause.label);
      op(34
      /* Pop */, 1);
      _clause.callback(); // The first match is special: it is placed directly before the END
      // label, so no additional jump is needed at the end of it.

      if (i !== 0) {
        op(4
        /* Jump */, labelOperand('END'));
      }
    }
    op(1000
    /* Label */, 'END');
    op(1002
    /* StopLabels */);

    op(70
    /* Exit */);
  }
  /**
   * A convenience for pushing some arguments on the stack and
   * running some code if the code needs to be re-executed during
   * updating execution if some of the arguments have changed.
   *
   * # Initial Execution
   *
   * The `args` function should push zero or more arguments onto
   * the stack and return the number of arguments pushed.
   *
   * The `body` function provides the instructions to execute both
   * during initial execution and during updating execution.
   *
   * Internally, this function starts by pushing a new frame, so
   * that the body can return and sets the return point ($ra) to
   * the ENDINITIAL label.
   *
   * It then executes the `args` function, which adds instructions
   * responsible for pushing the arguments for the block to the
   * stack. These arguments will be restored to the stack before
   * updating execution.
   *
   * Next, it adds the Enter opcode, which marks the current position
   * in the DOM, and remembers the current $pc (the next instruction)
   * as the first instruction to execute during updating execution.
   *
   * Next, it runs `body`, which adds the opcodes that should
   * execute both during initial execution and during updating execution.
   * If the `body` wishes to finish early, it should Jump to the
   * `FINALLY` label.
   *
   * Next, it adds the FINALLY label, followed by:
   *
   * - the Exit opcode, which finalizes the marked DOM started by the
   *   Enter opcode.
   * - the Return opcode, which returns to the current return point
   *   ($ra).
   *
   * Finally, it adds the ENDINITIAL label followed by the PopFrame
   * instruction, which restores $fp, $sp and $ra.
   *
   * # Updating Execution
   *
   * Updating execution for this `replayable` occurs if the `body` added an
   * assertion, via one of the `JumpIf`, `JumpUnless` or `AssertSame` opcodes.
   *
   * If, during updating executon, the assertion fails, the initial VM is
   * restored, and the stored arguments are pushed onto the stack. The DOM
   * between the starting and ending markers is cleared, and the VM's cursor
   * is set to the area just cleared.
   *
   * The return point ($ra) is set to -1, the exit instruction.
   *
   * Finally, the $pc is set to to the instruction saved off by the
   * Enter opcode during initial execution, and execution proceeds as
   * usual.
   *
   * The only difference is that when a `Return` instruction is
   * encountered, the program jumps to -1 rather than the END label,
   * and the PopFrame opcode is not needed.
   */

  function Replayable(op, args, body) {
    // Start a new label frame, to give END and RETURN
    // a unique meaning.
    op(1001
    /* StartLabels */);

    op(0
    /* PushFrame */); // If the body invokes a block, its return will return to
    // END. Otherwise, the return in RETURN will return to END.

    op(6
    /* ReturnTo */, labelOperand('ENDINITIAL')); // Push the arguments onto the stack. The args() function
    // tells us how many stack elements to retain for re-execution
    // when updating.

    var count = args(); // Start a new updating closure, remembering `count` elements
    // from the stack. Everything after this point, and before END,
    // will execute both initially and to update the block.
    //
    // The enter and exit opcodes also track the area of the DOM
    // associated with this block. If an assertion inside the block
    // fails (for example, the test value changes from true to false
    // in an #if), the DOM is cleared and the program is re-executed,
    // restoring `count` elements to the stack and executing the
    // instructions between the enter and exit.

    op(69
    /* Enter */, count); // Evaluate the body of the block. The body of the block may
    // return, which will jump execution to END during initial
    // execution, and exit the updating routine.

    body(); // All execution paths in the body should run the FINALLY once
    // they are done. It is executed both during initial execution
    // and during updating execution.

    op(1000
    /* Label */, 'FINALLY'); // Finalize the DOM.

    op(70
    /* Exit */); // In initial execution, this is a noop: it returns to the
    // immediately following opcode. In updating execution, this
    // exits the updating routine.

    op(5
    /* Return */); // Cleanup code for the block. Runs on initial execution
    // but not on updating.

    op(1000
    /* Label */, 'ENDINITIAL');
    op(1
    /* PopFrame */);

    op(1002
    /* StopLabels */);
  }
  /**
   * A specialized version of the `replayable` convenience that allows the
   * caller to provide different code based upon whether the item at
   * the top of the stack is true or false.
   *
   * As in `replayable`, the `ifTrue` and `ifFalse` code can invoke `return`.
   *
   * During the initial execution, a `return` will continue execution
   * in the cleanup code, which finalizes the current DOM block and pops
   * the current frame.
   *
   * During the updating execution, a `return` will exit the updating
   * routine, as it can reuse the DOM block and is always only a single
   * frame deep.
   */

  function ReplayableIf(op, args, ifTrue, ifFalse) {
    return Replayable(op, args, () => {
      // If the conditional is false, jump to the ELSE label.
      op(66
      /* JumpUnless */, labelOperand('ELSE')); // Otherwise, execute the code associated with the true branch.

      ifTrue(); // We're done, so return. In the initial execution, this runs
      // the cleanup code. In the updating VM, it exits the updating
      // routine.

      op(4
      /* Jump */, labelOperand('FINALLY'));
      op(1000
      /* Label */, 'ELSE'); // If the conditional is false, and code associatied ith the
      // false branch was provided, execute it. If there was no code
      // associated with the false branch, jumping to the else statement
      // has no other behavior.

      if (ifFalse !== undefined) {
        ifFalse();
      }
    });
  }
  var ATTRS_BLOCK = '&attrs';
  function InvokeComponent(op, component, _elementBlock, positional, named, _blocks) {
    var {
      compilable,
      capabilities,
      handle
    } = component;
    var elementBlock = _elementBlock ? [_elementBlock, []] : null;
    var blocks = Array.isArray(_blocks) || _blocks === null ? namedBlocks(_blocks) : _blocks;
    if (compilable) {
      op(78
      /* PushComponentDefinition */, handle);
      InvokeStaticComponent(op, {
        capabilities: capabilities,
        layout: compilable,
        elementBlock,
        positional,
        named,
        blocks
      });
    } else {
      op(78
      /* PushComponentDefinition */, handle);
      InvokeNonStaticComponent(op, {
        capabilities: capabilities,
        elementBlock,
        positional,
        named,
        atNames: true,
        blocks
      });
    }
  }
  function InvokeDynamicComponent(op, definition, _elementBlock, positional, named, _blocks, atNames, curried) {
    var elementBlock = _elementBlock ? [_elementBlock, []] : null;
    var blocks = Array.isArray(_blocks) || _blocks === null ? namedBlocks(_blocks) : _blocks;
    Replayable(op, () => {
      expr(op, definition);
      op(33
      /* Dup */, _vm.$sp, 0);
      return 2;
    }, () => {
      op(66
      /* JumpUnless */, labelOperand('ELSE'));
      if (curried) {
        op(81
        /* ResolveCurriedComponent */);
      } else {
        op(80
        /* ResolveDynamicComponent */, isStrictMode());
      }
      op(79
      /* PushDynamicComponentInstance */);

      InvokeNonStaticComponent(op, {
        capabilities: true,
        elementBlock,
        positional,
        named,
        atNames,
        blocks
      });
      op(1000
      /* Label */, 'ELSE');
    });
  }
  function InvokeStaticComponent(op, _ref20) {
    var {
      capabilities,
      layout,
      elementBlock,
      positional,
      named,
      blocks
    } = _ref20;
    var {
      symbolTable
    } = layout;
    var bailOut = symbolTable.hasEval || (0, _manager.hasCapability)(capabilities, 4
    /* PrepareArgs */);

    if (bailOut) {
      InvokeNonStaticComponent(op, {
        capabilities,
        elementBlock,
        positional,
        named,
        atNames: true,
        blocks,
        layout
      });
      return;
    }
    op(36
    /* Fetch */, _vm.$s0);
    op(33
    /* Dup */, _vm.$sp, 1);
    op(35
    /* Load */, _vm.$s0);
    op(0
    /* PushFrame */); // Setup arguments

    var {
      symbols
    } = symbolTable; // As we push values onto the stack, we store the symbols associated  with them
    // so that we can set them on the scope later on with SetVariable and SetBlock

    var blockSymbols = [];
    var argSymbols = [];
    var argNames = []; // First we push the blocks onto the stack

    var blockNames = blocks.names; // Starting with the attrs block, if it exists and is referenced in the component

    if (elementBlock !== null) {
      var symbol = symbols.indexOf(ATTRS_BLOCK);
      if (symbol !== -1) {
        PushYieldableBlock(op, elementBlock);
        blockSymbols.push(symbol);
      }
    } // Followed by the other blocks, if they exist and are referenced in the component.
    // Also store the index of the associated symbol.

    for (var i = 0; i < blockNames.length; i++) {
      var name = blockNames[i];
      var _symbol = symbols.indexOf(`&${name}`);
      if (_symbol !== -1) {
        PushYieldableBlock(op, blocks.get(name));
        blockSymbols.push(_symbol);
      }
    } // Next up we have arguments. If the component has the `createArgs` capability,
    // then it wants access to the arguments in JavaScript. We can't know whether
    // or not an argument is used, so we have to give access to all of them.

    if ((0, _manager.hasCapability)(capabilities, 8
    /* CreateArgs */)) {
      // First we push positional arguments
      var count = CompilePositional(op, positional); // setup the flags with the count of positionals, and to indicate that atNames
      // are used

      var flags = count << 4;
      flags |= 0b1000;
      var names = _util.EMPTY_STRING_ARRAY; // Next, if named args exist, push them all. If they have an associated symbol
      // in the invoked component (e.g. they are used within its template), we push
      // that symbol. If not, we still push the expression as it may be used, and
      // we store the symbol as -1 (this is used later).

      if (named !== null) {
        names = named[0];
        var val = named[1];
        for (var _i2 = 0; _i2 < val.length; _i2++) {
          var _symbol2 = symbols.indexOf(names[_i2]);
          expr(op, val[_i2]);
          argSymbols.push(_symbol2);
        }
      } // Finally, push the VM arguments themselves. These args won't need access
      // to blocks (they aren't accessible from userland anyways), so we push an
      // empty array instead of the actual block names.

      op(82
      /* PushArgs */, names, _util.EMPTY_STRING_ARRAY, flags); // And push an extra pop operation to remove the args before we begin setting
      // variables on the local context

      argSymbols.push(-1);
    } else if (named !== null) {
      // If the component does not have the `createArgs` capability, then the only
      // expressions we need to push onto the stack are those that are actually
      // referenced in the template of the invoked component (e.g. have symbols).
      var _names = named[0];
      var _val = named[1];
      for (var _i3 = 0; _i3 < _val.length; _i3++) {
        var _name3 = _names[_i3];
        var _symbol3 = symbols.indexOf(_name3);
        if (_symbol3 !== -1) {
          expr(op, _val[_i3]);
          argSymbols.push(_symbol3);
          argNames.push(_name3);
        }
      }
    }
    op(97
    /* BeginComponentTransaction */, _vm.$s0);
    if ((0, _manager.hasCapability)(capabilities, 64
    /* DynamicScope */)) {
      op(59
      /* PushDynamicScope */);
    }

    if ((0, _manager.hasCapability)(capabilities, 512
    /* CreateInstance */)) {
      op(87
      /* CreateComponent */, blocks.has('default') | 0, _vm.$s0);
    }
    op(88
    /* RegisterComponentDestructor */, _vm.$s0);
    if ((0, _manager.hasCapability)(capabilities, 8
    /* CreateArgs */)) {
      op(90
      /* GetComponentSelf */, _vm.$s0);
    } else {
      op(90
      /* GetComponentSelf */, _vm.$s0, argNames);
    } // Setup the new root scope for the component

    op(37
    /* RootScope */, symbols.length + 1, Object.keys(blocks).length > 0 ? 1 : 0); // Pop the self reference off the stack and set it to the symbol for `this`
    // in the new scope. This is why all subsequent symbols are increased by one.

    op(19
    /* SetVariable */, 0); // Going in reverse, now we pop the args/blocks off the stack, starting with
    // arguments, and assign them to their symbols in the new scope.

    for (var _i4 = argSymbols.length - 1; _i4 >= 0; _i4--) {
      var _symbol4 = argSymbols[_i4];
      if (_symbol4 === -1) {
        // The expression was not bound to a local symbol, it was only pushed to be
        // used with VM args in the javascript side
        op(34
        /* Pop */, 1);
      } else {
        op(19
        /* SetVariable */, _symbol4 + 1);
      }
    } // if any positional params exist, pop them off the stack as well

    if (positional !== null) {
      op(34
      /* Pop */, positional.length);
    } // Finish up by popping off and assigning blocks

    for (var _i5 = blockSymbols.length - 1; _i5 >= 0; _i5--) {
      var _symbol5 = blockSymbols[_i5];
      op(20
      /* SetBlock */, _symbol5 + 1);
    }
    op(28
    /* Constant */, layoutOperand(layout));
    op(61
    /* CompileBlock */);

    op(2
    /* InvokeVirtual */);

    op(100
    /* DidRenderLayout */, _vm.$s0);
    op(1
    /* PopFrame */);

    op(40
    /* PopScope */);

    if ((0, _manager.hasCapability)(capabilities, 64
    /* DynamicScope */)) {
      op(60
      /* PopDynamicScope */);
    }

    op(98
    /* CommitComponentTransaction */);

    op(35
    /* Load */, _vm.$s0);
  }
  function InvokeNonStaticComponent(op, _ref21) {
    var {
      capabilities,
      elementBlock,
      positional,
      named,
      atNames,
      blocks: namedBlocks$$1,
      layout
    } = _ref21;
    var bindableBlocks = !!namedBlocks$$1;
    var bindableAtNames = capabilities === true || (0, _manager.hasCapability)(capabilities, 4
    /* PrepareArgs */) || !!(named && named[0].length !== 0);
    var blocks = namedBlocks$$1.with('attrs', elementBlock);
    op(36
    /* Fetch */, _vm.$s0);
    op(33
    /* Dup */, _vm.$sp, 1);
    op(35
    /* Load */, _vm.$s0);
    op(0
    /* PushFrame */);

    CompileArgs(op, positional, named, blocks, atNames);
    op(85
    /* PrepareArgs */, _vm.$s0);
    invokePreparedComponent(op, blocks.has('default'), bindableBlocks, bindableAtNames, () => {
      if (layout) {
        op(63
        /* PushSymbolTable */, symbolTableOperand(layout.symbolTable));
        op(28
        /* Constant */, layoutOperand(layout));
        op(61
        /* CompileBlock */);
      } else {
        op(92
        /* GetComponentLayout */, _vm.$s0);
      }
      op(95
      /* PopulateLayout */, _vm.$s0);
    });
    op(35
    /* Load */, _vm.$s0);
  }
  function WrappedComponent(op, layout, attrsBlockNumber) {
    op(1001
    /* StartLabels */);

    WithSavedRegister(op, _vm.$s1, () => {
      op(91
      /* GetComponentTagName */, _vm.$s0);
      op(31
      /* PrimitiveReference */);

      op(33
      /* Dup */, _vm.$sp, 0);
    });
    op(66
    /* JumpUnless */, labelOperand('BODY'));
    op(36
    /* Fetch */, _vm.$s1);
    op(89
    /* PutComponentOperations */);

    op(49
    /* OpenDynamicElement */);

    op(99
    /* DidCreateElement */, _vm.$s0);
    YieldBlock(op, attrsBlockNumber, null);
    op(54
    /* FlushElement */);

    op(1000
    /* Label */, 'BODY');
    InvokeStaticBlock(op, [layout.block[0], []]);
    op(36
    /* Fetch */, _vm.$s1);
    op(66
    /* JumpUnless */, labelOperand('END'));
    op(55
    /* CloseElement */);

    op(1000
    /* Label */, 'END');
    op(35
    /* Load */, _vm.$s1);
    op(1002
    /* StopLabels */);
  }

  function invokePreparedComponent(op, hasBlock, bindableBlocks, bindableAtNames, populateLayout) {
    if (populateLayout === void 0) {
      populateLayout = null;
    }
    op(97
    /* BeginComponentTransaction */, _vm.$s0);
    op(59
    /* PushDynamicScope */);

    op(87
    /* CreateComponent */, hasBlock | 0, _vm.$s0); // this has to run after createComponent to allow
    // for late-bound layouts, but a caller is free
    // to populate the layout earlier if it wants to
    // and do nothing here.

    if (populateLayout) {
      populateLayout();
    }
    op(88
    /* RegisterComponentDestructor */, _vm.$s0);
    op(90
    /* GetComponentSelf */, _vm.$s0);
    op(38
    /* VirtualRootScope */, _vm.$s0);
    op(19
    /* SetVariable */, 0);
    op(94
    /* SetupForEval */, _vm.$s0);
    if (bindableAtNames) op(17
    /* SetNamedVariables */, _vm.$s0);
    if (bindableBlocks) op(18
    /* SetBlocks */, _vm.$s0);
    op(34
    /* Pop */, 1);
    op(96
    /* InvokeComponentLayout */, _vm.$s0);
    op(100
    /* DidRenderLayout */, _vm.$s0);
    op(1
    /* PopFrame */);

    op(40
    /* PopScope */);

    op(60
    /* PopDynamicScope */);

    op(98
    /* CommitComponentTransaction */);
  }

  function InvokeBareComponent(op) {
    op(36
    /* Fetch */, _vm.$s0);
    op(33
    /* Dup */, _vm.$sp, 1);
    op(35
    /* Load */, _vm.$s0);
    op(0
    /* PushFrame */);

    op(83
    /* PushEmptyArgs */);

    op(85
    /* PrepareArgs */, _vm.$s0);
    invokePreparedComponent(op, false, false, true, () => {
      op(92
      /* GetComponentLayout */, _vm.$s0);
      op(95
      /* PopulateLayout */, _vm.$s0);
    });
    op(35
    /* Load */, _vm.$s0);
  }
  function WithSavedRegister(op, register, block) {
    op(36
    /* Fetch */, register);
    block();
    op(35
    /* Load */, register);
  }
  class StdLib {
    constructor(main, trustingGuardedAppend, cautiousGuardedAppend, trustingNonDynamicAppend, cautiousNonDynamicAppend) {
      this.main = main;
      this.trustingGuardedAppend = trustingGuardedAppend;
      this.cautiousGuardedAppend = cautiousGuardedAppend;
      this.trustingNonDynamicAppend = trustingNonDynamicAppend;
      this.cautiousNonDynamicAppend = cautiousNonDynamicAppend;
    }
    get 'trusting-append'() {
      return this.trustingGuardedAppend;
    }
    get 'cautious-append'() {
      return this.cautiousGuardedAppend;
    }
    get 'trusting-non-dynamic-append'() {
      return this.trustingNonDynamicAppend;
    }
    get 'cautious-non-dynamic-append'() {
      return this.cautiousNonDynamicAppend;
    }
    getAppend(trusting) {
      return trusting ? this.trustingGuardedAppend : this.cautiousGuardedAppend;
    }
  }
  _exports.StdLib = StdLib;
  function programCompilationContext(artifacts, resolver) {
    return new CompileTimeCompilationContextImpl(artifacts, resolver);
  }
  function templateCompilationContext(program, meta) {
    var encoder = new EncoderImpl(program.heap, meta, program.stdlib);
    return {
      program,
      encoder,
      meta
    };
  }
  var debugCompiler;
  _exports.debugCompiler = debugCompiler;
  var STATEMENTS = new Compilers();
  var INFLATE_ATTR_TABLE = ['class', 'id', 'value', 'name', 'type', 'style', 'href'];
  var INFLATE_TAG_TABLE = ['div', 'span', 'p', 'a'];
  function inflateTagName(tagName) {
    return typeof tagName === 'string' ? tagName : INFLATE_TAG_TABLE[tagName];
  }
  function inflateAttrName(attrName) {
    return typeof attrName === 'string' ? attrName : INFLATE_ATTR_TABLE[attrName];
  }
  STATEMENTS.add(3
  /* Comment */, (op, sexp) => op(42
  /* Comment */, sexp[1]));
  STATEMENTS.add(13
  /* CloseElement */, op => op(55
  /* CloseElement */));

  STATEMENTS.add(12
  /* FlushElement */, op => op(54
  /* FlushElement */));

  STATEMENTS.add(4
  /* Modifier */, (op, _ref22) => {
    var [, expression, positional, named] = _ref22;
    if (isGetFreeModifier(expression)) {
      op(1003
      /* ResolveModifier */, expression, handle => {
        op(0
        /* PushFrame */);

        SimpleArgs(op, positional, named, false);
        op(57
        /* Modifier */, handle);
        op(1
        /* PopFrame */);
      });
    } else {
      expr(op, expression);
      op(0
      /* PushFrame */);

      SimpleArgs(op, positional, named, false);
      op(33
      /* Dup */, _vm.$fp, 1);
      op(108
      /* DynamicModifier */);

      op(1
      /* PopFrame */);
    }
  });

  STATEMENTS.add(14
  /* StaticAttr */, (op, _ref23) => {
    var [, name, value, namespace] = _ref23;
    op(51
    /* StaticAttr */, inflateAttrName(name), value, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(24
  /* StaticComponentAttr */, (op, _ref24) => {
    var [, name, value, namespace] = _ref24;
    op(105
    /* StaticComponentAttr */, inflateAttrName(name), value, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(15
  /* DynamicAttr */, (op, _ref25) => {
    var [, name, value, namespace] = _ref25;
    expr(op, value);
    op(52
    /* DynamicAttr */, inflateAttrName(name), false, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(22
  /* TrustingDynamicAttr */, (op, _ref26) => {
    var [, name, value, namespace] = _ref26;
    expr(op, value);
    op(52
    /* DynamicAttr */, inflateAttrName(name), true, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(16
  /* ComponentAttr */, (op, _ref27) => {
    var [, name, value, namespace] = _ref27;
    expr(op, value);
    op(53
    /* ComponentAttr */, inflateAttrName(name), false, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(23
  /* TrustingComponentAttr */, (op, _ref28) => {
    var [, name, value, namespace] = _ref28;
    expr(op, value);
    op(53
    /* ComponentAttr */, inflateAttrName(name), true, namespace !== null && namespace !== void 0 ? namespace : null);
  });
  STATEMENTS.add(10
  /* OpenElement */, (op, _ref29) => {
    var [, tag] = _ref29;
    op(48
    /* OpenElement */, inflateTagName(tag));
  });
  STATEMENTS.add(11
  /* OpenElementWithSplat */, (op, _ref30) => {
    var [, tag] = _ref30;
    op(89
    /* PutComponentOperations */);

    op(48
    /* OpenElement */, inflateTagName(tag));
  });
  STATEMENTS.add(8
  /* Component */, (op, _ref31) => {
    var [, expr$$1, elementBlock, named, blocks] = _ref31;
    if (isGetFreeComponent(expr$$1)) {
      op(1004
      /* ResolveComponent */, expr$$1, component => {
        InvokeComponent(op, component, elementBlock, null, named, blocks);
      });
    } else {
      // otherwise, the component name was an expression, so resolve the expression
      // and invoke it as a dynamic component
      InvokeDynamicComponent(op, expr$$1, elementBlock, null, named, blocks, true, true);
    }
  });
  STATEMENTS.add(19
  /* Partial */, (op, _ref32) => {
    var [, name, evalInfo] = _ref32;
    ReplayableIf(op, () => {
      expr(op, name);
      op(33
      /* Dup */, _vm.$sp, 0);
      return 2;
    }, () => {
      op(101
      /* InvokePartial */, evalSymbolsOperand(), evalInfo);
      op(40
      /* PopScope */);

      op(1
      /* PopFrame */);
    });
  });

  STATEMENTS.add(18
  /* Yield */, (op, _ref33) => {
    var [, to, params] = _ref33;
    return YieldBlock(op, to, params);
  });
  STATEMENTS.add(17
  /* AttrSplat */, (op, _ref34) => {
    var [, to] = _ref34;
    return YieldBlock(op, to, null);
  });
  STATEMENTS.add(26
  /* Debugger */, (op, _ref35) => {
    var [, evalInfo] = _ref35;
    return op(103
    /* Debugger */, evalSymbolsOperand(), evalInfo);
  });
  STATEMENTS.add(1
  /* Append */, (op, _ref36) => {
    var [, value] = _ref36;
    // Special case for static values
    if (!Array.isArray(value)) {
      op(41
      /* Text */, value === null || value === undefined ? '' : String(value));
    } else if (isGetFreeOptionalComponentOrHelper(value)) {
      op(1008
      /* ResolveOptionalComponentOrHelper */, value, {
        ifComponent(component) {
          InvokeComponent(op, component, null, null, null, null);
        },
        ifHelper(handle) {
          op(0
          /* PushFrame */);

          Call(op, handle, null, null);
          op(3
          /* InvokeStatic */, stdlibOperand('cautious-non-dynamic-append'));
          op(1
          /* PopFrame */);
        },

        ifValue(handle) {
          op(0
          /* PushFrame */);

          op(29
          /* ConstantReference */, handle);
          op(3
          /* InvokeStatic */, stdlibOperand('cautious-non-dynamic-append'));
          op(1
          /* PopFrame */);
        },

        ifFallback(_name) {
          op(0
          /* PushFrame */);

          op(1010
          /* ResolveLocal */, value[1], (name, moduleName) => {
            (true && !(false) && (0, _globalContext.deprecate)(`The \`${name}\` property was used in the \`${moduleName}\` template without using \`this\`. This fallback behavior has been deprecated, all properties must be looked up on \`this\` when used in the template: {{this.${name}}}`, false, {
              id: 'this-property-fallback'
            }));
            op(21
            /* GetVariable */, 0);
            op(22
            /* GetProperty */, name);
          });
          op(3
          /* InvokeStatic */, stdlibOperand('cautious-append'));
          op(1
          /* PopFrame */);
        }
      });
    } else if (value[0] === 28
    /* Call */) {
      var [, expression, positional, named] = value;
      if (isGetFreeComponentOrHelper(expression)) {
        op(1007
        /* ResolveComponentOrHelper */, expression, {
          ifComponent(component) {
            InvokeComponent(op, component, null, positional, hashToArgs(named), null);
          },
          ifHelper(handle) {
            op(0
            /* PushFrame */);

            Call(op, handle, positional, named);
            op(3
            /* InvokeStatic */, stdlibOperand('cautious-non-dynamic-append'));
            op(1
            /* PopFrame */);
          }
        });
      } else {
        SwitchCases(op, () => {
          expr(op, expression);
          op(106
          /* DynamicContentType */);
        }, when => {
          when(0
          /* Component */, () => {
            op(81
            /* ResolveCurriedComponent */);

            op(79
            /* PushDynamicComponentInstance */);

            InvokeNonStaticComponent(op, {
              capabilities: true,
              elementBlock: null,
              positional,
              named,
              atNames: false,
              blocks: namedBlocks(null)
            });
          });
          when(1
          /* Helper */, () => {
            CallDynamic(op, positional, named, () => {
              op(3
              /* InvokeStatic */, stdlibOperand('cautious-non-dynamic-append'));
            });
          });
        });
      }
    } else {
      op(0
      /* PushFrame */);

      expr(op, value);
      op(3
      /* InvokeStatic */, stdlibOperand('cautious-append'));
      op(1
      /* PopFrame */);
    }
  });

  STATEMENTS.add(2
  /* TrustingAppend */, (op, _ref37) => {
    var [, value] = _ref37;
    if (!Array.isArray(value)) {
      op(41
      /* Text */, value === null || value === undefined ? '' : String(value));
    } else {
      op(0
      /* PushFrame */);

      expr(op, value);
      op(3
      /* InvokeStatic */, stdlibOperand('trusting-append'));
      op(1
      /* PopFrame */);
    }
  });

  STATEMENTS.add(6
  /* Block */, (op, _ref38) => {
    var [, expr$$1, positional, named, blocks] = _ref38;
    if (isGetFreeComponent(expr$$1)) {
      op(1004
      /* ResolveComponent */, expr$$1, component => {
        InvokeComponent(op, component, null, positional, hashToArgs(named), blocks);
      });
    } else {
      InvokeDynamicComponent(op, expr$$1, null, positional, named, blocks, false, false);
    }
  });
  STATEMENTS.add(40
  /* InElement */, (op, _ref39) => {
    var [, block, guid, destination, insertBefore] = _ref39;
    ReplayableIf(op, () => {
      expr(op, guid);
      if (insertBefore === undefined) {
        PushPrimitiveReference(op, undefined);
      } else {
        expr(op, insertBefore);
      }
      expr(op, destination);
      op(33
      /* Dup */, _vm.$sp, 0);
      return 4;
    }, () => {
      op(50
      /* PushRemoteElement */);

      InvokeStaticBlock(op, block);
      op(56
      /* PopRemoteElement */);
    });
  });

  STATEMENTS.add(41
  /* If */, (op, _ref40) => {
    var [, condition, block, inverse] = _ref40;
    return ReplayableIf(op, () => {
      expr(op, condition);
      op(71
      /* ToBoolean */);

      return 1;
    }, () => {
      InvokeStaticBlock(op, block);
    }, inverse ? () => {
      InvokeStaticBlock(op, inverse);
    } : undefined);
  });
  STATEMENTS.add(42
  /* Each */, (op, _ref41) => {
    var [, value, key, block, inverse] = _ref41;
    return Replayable(op, () => {
      if (key) {
        expr(op, key);
      } else {
        PushPrimitiveReference(op, null);
      }
      expr(op, value);
      return 2;
    }, () => {
      op(72
      /* EnterList */, labelOperand('BODY'), labelOperand('ELSE'));
      op(0
      /* PushFrame */);

      op(33
      /* Dup */, _vm.$fp, 1);
      op(6
      /* ReturnTo */, labelOperand('ITER'));
      op(1000
      /* Label */, 'ITER');
      op(74
      /* Iterate */, labelOperand('BREAK'));
      op(1000
      /* Label */, 'BODY');
      InvokeStaticBlockWithStack(op, block, 2);
      op(34
      /* Pop */, 2);
      op(4
      /* Jump */, labelOperand('FINALLY'));
      op(1000
      /* Label */, 'BREAK');
      op(1
      /* PopFrame */);

      op(73
      /* ExitList */);

      op(4
      /* Jump */, labelOperand('FINALLY'));
      op(1000
      /* Label */, 'ELSE');
      if (inverse) {
        InvokeStaticBlock(op, inverse);
      }
    });
  });
  STATEMENTS.add(43
  /* With */, (op, _ref42) => {
    var [, value, block, inverse] = _ref42;
    ReplayableIf(op, () => {
      expr(op, value);
      op(33
      /* Dup */, _vm.$sp, 0);
      op(71
      /* ToBoolean */);

      return 2;
    }, () => {
      InvokeStaticBlockWithStack(op, block, 1);
    }, () => {
      if (inverse) {
        InvokeStaticBlock(op, inverse);
      }
    });
  });
  STATEMENTS.add(44
  /* Let */, (op, _ref43) => {
    var [, positional, block] = _ref43;
    var count = CompilePositional(op, positional);
    InvokeStaticBlockWithStack(op, block, count);
  });
  STATEMENTS.add(45
  /* WithDynamicVars */, (op, _ref44) => {
    var [, named, block] = _ref44;
    if (named) {
      var [names, expressions] = named;
      CompilePositional(op, expressions);
      DynamicScope(op, names, () => {
        InvokeStaticBlock(op, block);
      });
    } else {
      InvokeStaticBlock(op, block);
    }
  });
  STATEMENTS.add(46
  /* InvokeComponent */, (op, _ref45) => {
    var [, expr$$1, positional, named, blocks] = _ref45;
    if (isGetFreeComponent(expr$$1)) {
      op(1004
      /* ResolveComponent */, expr$$1, component => {
        InvokeComponent(op, component, null, positional, hashToArgs(named), blocks);
      });
    } else {
      InvokeDynamicComponent(op, expr$$1, null, positional, named, blocks, false, false);
    }
  });
  function hashToArgs(hash) {
    if (hash === null) return null;
    var names = hash[0].map(key => `@${key}`);
    return [names, hash[1]];
  }
  var PLACEHOLDER_HANDLE = -1;
  class CompilableTemplateImpl {
    constructor(statements, meta$$1,
    // Part of CompilableTemplate
    symbolTable,
    // Used for debugging
    moduleName) {
      if (moduleName === void 0) {
        moduleName = 'plain block';
      }
      this.statements = statements;
      this.meta = meta$$1;
      this.symbolTable = symbolTable;
      this.moduleName = moduleName;
      this.compiled = null;
    } // Part of CompilableTemplate

    compile(context) {
      return maybeCompile(this, context);
    }
  }
  function compilable(layout, moduleName) {
    var [statements, symbols, hasEval] = layout.block;
    return new CompilableTemplateImpl(statements, meta(layout), {
      symbols,
      hasEval
    }, moduleName);
  }
  function maybeCompile(compilable, context) {
    if (compilable.compiled !== null) return compilable.compiled;
    compilable.compiled = PLACEHOLDER_HANDLE;
    var {
      statements,
      meta: meta$$1
    } = compilable;
    var result = compileStatements(statements, meta$$1, context);
    compilable.compiled = result;
    return result;
  }
  function compileStatements(statements, meta$$1, syntaxContext) {
    var sCompiler = STATEMENTS;
    var context = templateCompilationContext(syntaxContext, meta$$1);
    var {
      encoder,
      program: {
        constants,
        resolver
      }
    } = context;
    function pushOp() {
      for (var _len = arguments.length, op = new Array(_len), _key = 0; _key < _len; _key++) {
        op[_key] = arguments[_key];
      }
      encodeOp(encoder, constants, resolver, meta$$1, op);
    }
    for (var i = 0; i < statements.length; i++) {
      sCompiler.compile(pushOp, statements[i]);
    }
    var handle = context.encoder.commit(meta$$1.size);
    return handle;
  }
  function compilableBlock(block, containing) {
    return new CompilableTemplateImpl(block[0], containing, {
      parameters: block[1] || _util.EMPTY_ARRAY
    });
  }
  class Labels {
    constructor() {
      this.labels = (0, _util.dict)();
      this.targets = [];
    }
    label(name, index) {
      this.labels[name] = index;
    }
    target(at, target) {
      this.targets.push({
        at,
        target
      });
    }
    patch(heap) {
      var {
        targets,
        labels
      } = this;
      for (var i = 0; i < targets.length; i++) {
        var {
          at,
          target
        } = targets[i];
        var address = labels[target] - at;
        heap.setbyaddr(at, address);
      }
    }
  }
  function encodeOp(encoder, constants, resolver, meta, op) {
    if (isBuilderOpcode(op[0])) {
      var [type, ...operands] = op;
      encoder.push(constants, type, ...operands);
    } else {
      switch (op[0]) {
        case 1000
        /* Label */:
          return encoder.label(op[1]);
        case 1001
        /* StartLabels */:
          return encoder.startLabels();
        case 1002
        /* StopLabels */:
          return encoder.stopLabels();
        case 1004
        /* ResolveComponent */:
          return resolveComponent(resolver, constants, meta, op);
        case 1003
        /* ResolveModifier */:
          return resolveModifier(resolver, constants, meta, op);
        case 1005
        /* ResolveHelper */:
          return resolveHelper(resolver, constants, meta, op);
        case 1007
        /* ResolveComponentOrHelper */:
          return resolveComponentOrHelper(resolver, constants, meta, op);
        case 1006
        /* ResolveOptionalHelper */:
          return resolveOptionalHelper(resolver, constants, meta, op);
        case 1008
        /* ResolveOptionalComponentOrHelper */:
          return resolveOptionalComponentOrHelper(resolver, constants, meta, op);
        case 1010
        /* ResolveLocal */:
          var freeVar = op[1];
          var name = meta.upvars[freeVar];
          if (meta.asPartial === true) {
            encoder.push(constants, 102
            /* ResolveMaybeLocal */, name);
          } else {
            var _then = op[2];
            _then(name, meta.moduleName);
          }
          break;
        case 1011
        /* ResolveTemplateLocal */:
          var [, valueIndex, then] = op;
          var value = meta.scopeValues[valueIndex];
          then(constants.value(value));
          break;
        case 1009
        /* ResolveFree */:
          if (false /* DEBUG */) {
            var [, upvarIndex] = op;
            var freeName = meta.upvars[upvarIndex];
            throw new Error(`Attempted to resolve a value in a strict mode template, but that value was not in scope: ${freeName}`);
          }
          break;
        default:
          throw new Error(`Unexpected high level opcode ${op[0]}`);
      }
    }
  }
  class EncoderImpl {
    constructor(heap, meta, stdlib) {
      this.heap = heap;
      this.meta = meta;
      this.stdlib = stdlib;
      this.labelsStack = new _util.Stack();
      this.encoder = new _encoder.InstructionEncoderImpl([]);
      this.errors = [];
      this.handle = heap.malloc();
    }
    error(error) {
      this.encoder.encode(30
      /* Primitive */, 0);
      this.errors.push(error);
    }
    commit(size) {
      var handle = this.handle;
      this.heap.push(5
      /* Return */ | 1024
      /* MACHINE_MASK */);

      this.heap.finishMalloc(handle, size);
      if (this.errors.length) {
        return {
          errors: this.errors,
          handle
        };
      } else {
        return handle;
      }
    }
    push(constants, type) {
      var {
        heap
      } = this;
      if (false /* DEBUG */ && type > 255
      /* TYPE_SIZE */) {
        throw new Error(`Opcode type over 8-bits. Got ${type}.`);
      }
      var machine = (0, _vm.isMachineOp)(type) ? 1024
      /* MACHINE_MASK */ : 0;
      var first = type | machine | (arguments.length <= 2 ? 0 : arguments.length - 2) << 8
      /* ARG_SHIFT */;

      heap.push(first);
      for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
        var op = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];
        heap.push(this.operand(constants, op));
      }
    }
    operand(constants, operand) {
      if (typeof operand === 'number') {
        return operand;
      }
      if (typeof operand === 'object' && operand !== null) {
        if (Array.isArray(operand)) {
          return (0, _util.encodeHandle)(constants.array(operand));
        } else {
          switch (operand.type) {
            case 1
            /* Label */:
              this.currentLabels.target(this.heap.offset, operand.value);
              return -1;
            case 2
            /* IsStrictMode */:
              return (0, _util.encodeHandle)(constants.value(this.meta.isStrictMode));
            case 3
            /* EvalSymbols */:
              return (0, _util.encodeHandle)(constants.array(this.meta.evalSymbols || _util.EMPTY_STRING_ARRAY));
            case 4
            /* Block */:
              return (0, _util.encodeHandle)(constants.value(compilableBlock(operand.value, this.meta)));
            case 5
            /* StdLib */:
              return this.stdlib[operand.value];
            case 6
            /* NonSmallInt */:

            case 7
            /* SymbolTable */:

            case 8
            /* Layout */:
              return constants.value(operand.value);
          }
        }
      }
      return (0, _util.encodeHandle)(constants.value(operand));
    }
    get currentLabels() {
      return this.labelsStack.current;
    }
    label(name) {
      this.currentLabels.label(name, this.heap.offset + 1);
    }
    startLabels() {
      this.labelsStack.push(new Labels());
    }
    stopLabels() {
      var label = this.labelsStack.pop();
      label.patch(this.heap);
    }
  }
  function isBuilderOpcode(op) {
    return op < 1000
    /* Start */;
  }

  function main(op) {
    op(75
    /* Main */, _vm.$s0);
    invokePreparedComponent(op, false, false, true);
  }
  /**
   * Append content to the DOM. This standard function triages content and does the
   * right thing based upon whether it's a string, safe string, component, fragment
   * or node.
   *
   * @param trusting whether to interpolate a string as raw HTML (corresponds to
   * triple curlies)
   */

  function StdAppend(op, trusting, nonDynamicAppend) {
    SwitchCases(op, () => op(76
    /* ContentType */), when => {
      when(2
      /* String */, () => {
        if (trusting) {
          op(68
          /* AssertSame */);

          op(43
          /* AppendHTML */);
        } else {
          op(47
          /* AppendText */);
        }
      });

      if (typeof nonDynamicAppend === 'number') {
        when(0
        /* Component */, () => {
          op(81
          /* ResolveCurriedComponent */);

          op(79
          /* PushDynamicComponentInstance */);

          InvokeBareComponent(op);
        });
        when(1
        /* Helper */, () => {
          CallDynamic(op, null, null, () => {
            op(3
            /* InvokeStatic */, nonDynamicAppend);
          });
        });
      } else {
        // when non-dynamic, we can no longer call the value (potentially because we've already called it)
        // this prevents infinite loops. We instead coerce the value, whatever it is, into the DOM.
        when(0
        /* Component */, () => {
          op(47
          /* AppendText */);
        });

        when(1
        /* Helper */, () => {
          op(47
          /* AppendText */);
        });
      }

      when(4
      /* SafeString */, () => {
        op(68
        /* AssertSame */);

        op(44
        /* AppendSafeHTML */);
      });

      when(5
      /* Fragment */, () => {
        op(68
        /* AssertSame */);

        op(45
        /* AppendDocumentFragment */);
      });

      when(6
      /* Node */, () => {
        op(68
        /* AssertSame */);

        op(46
        /* AppendNode */);
      });
    });
  }

  function compileStd(context) {
    var mainHandle = build(context, op => main(op));
    var trustingGuardedNonDynamicAppend = build(context, op => StdAppend(op, true, null));
    var cautiousGuardedNonDynamicAppend = build(context, op => StdAppend(op, false, null));
    var trustingGuardedDynamicAppend = build(context, op => StdAppend(op, true, trustingGuardedNonDynamicAppend));
    var cautiousGuardedDynamicAppend = build(context, op => StdAppend(op, false, cautiousGuardedNonDynamicAppend));
    return new StdLib(mainHandle, trustingGuardedDynamicAppend, cautiousGuardedDynamicAppend, trustingGuardedNonDynamicAppend, cautiousGuardedNonDynamicAppend);
  }
  var STDLIB_META = {
    asPartial: false,
    evalSymbols: null,
    upvars: null,
    moduleName: 'stdlib',
    // TODO: ??
    scopeValues: null,
    isStrictMode: true,
    owner: null,
    size: 0
  };
  function build(program, callback) {
    var {
      constants,
      heap,
      resolver
    } = program;
    var encoder = new EncoderImpl(heap, STDLIB_META);
    function pushOp() {
      for (var _len2 = arguments.length, op = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        op[_key2] = arguments[_key2];
      }
      encodeOp(encoder, constants, resolver, STDLIB_META, op);
    }
    callback(pushOp);
    var result = encoder.commit(0);
    if (typeof result !== 'number') {
      // This shouldn't be possible
      throw new Error(`Unexpected errors compiling std`);
    } else {
      return result;
    }
  }
  class CompileTimeCompilationContextImpl {
    constructor(_ref46, resolver) {
      var {
        constants,
        heap
      } = _ref46;
      this.resolver = resolver;
      this.constants = constants;
      this.heap = heap;
      this.stdlib = compileStd(this);
    }
  }
  _exports.CompileTimeCompilationContextImpl = CompileTimeCompilationContextImpl;
  var DEFAULT_CAPABILITIES = {
    dynamicLayout: true,
    dynamicTag: true,
    prepareArgs: true,
    createArgs: true,
    attributeHook: false,
    elementHook: false,
    dynamicScope: true,
    createCaller: false,
    updateHook: true,
    createInstance: true,
    wrapped: false,
    willDestroy: false,
    hasSubOwner: false
  };
  _exports.DEFAULT_CAPABILITIES = DEFAULT_CAPABILITIES;
  var MINIMAL_CAPABILITIES = {
    dynamicLayout: false,
    dynamicTag: false,
    prepareArgs: false,
    createArgs: false,
    attributeHook: false,
    elementHook: false,
    dynamicScope: false,
    createCaller: false,
    updateHook: false,
    createInstance: false,
    wrapped: false,
    willDestroy: false,
    hasSubOwner: false
  };
  _exports.MINIMAL_CAPABILITIES = MINIMAL_CAPABILITIES;
  class PartialDefinitionImpl {
    constructor(name,
    // for debugging
    template) {
      this.name = name;
      this.template = template;
    }
    getPartial(context) {
      var partial = (0, _util.unwrapTemplate)(this.template).asPartial();
      var handle = partial.compile(context);
      return {
        symbolTable: partial.symbolTable,
        handle
      };
    }
  }
  _exports.PartialDefinitionImpl = PartialDefinitionImpl;
  class WrappedBuilder {
    constructor(layout, moduleName) {
      this.layout = layout;
      this.moduleName = moduleName;
      this.compiled = null;
      var {
        block
      } = layout;
      var [, symbols, hasEval] = block;
      symbols = symbols.slice(); // ensure ATTRS_BLOCK is always included (only once) in the list of symbols

      var attrsBlockIndex = symbols.indexOf(ATTRS_BLOCK);
      if (attrsBlockIndex === -1) {
        this.attrsBlockNumber = symbols.push(ATTRS_BLOCK);
      } else {
        this.attrsBlockNumber = attrsBlockIndex + 1;
      }
      this.symbolTable = {
        hasEval,
        symbols
      };
    }
    compile(syntax) {
      if (this.compiled !== null) return this.compiled;
      var m = meta(this.layout);
      var context = templateCompilationContext(syntax, m);
      var {
        encoder,
        program: {
          constants,
          resolver
        }
      } = context;
      function pushOp() {
        for (var _len3 = arguments.length, op = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          op[_key3] = arguments[_key3];
        }
        encodeOp(encoder, constants, resolver, m, op);
      }
      WrappedComponent(pushOp, this.layout, this.attrsBlockNumber);
      var handle = context.encoder.commit(m.size);
      if (typeof handle !== 'number') {
        return handle;
      }
      this.compiled = handle;
      return handle;
    }
  }
  _exports.WrappedBuilder = WrappedBuilder;
  var clientId = 0;
  var templateCacheCounters = {
    cacheHit: 0,
    cacheMiss: 0
  };
  /**
   * Wraps a template js in a template module to change it into a factory
   * that handles lazy parsing the template and to create per env singletons
   * of the template.
   */
  _exports.templateCacheCounters = templateCacheCounters;
  function templateFactory(_ref47) {
    var {
      id: templateId,
      moduleName,
      block,
      scope,
      isStrictMode
    } = _ref47;
    // TODO(template-refactors): This should be removed in the near future, as it
    // appears that id is unused. It is currently kept for backwards compat reasons.
    var id = templateId || `client-${clientId++}`; // TODO: This caches JSON serialized output once in case a template is
    // compiled by multiple owners, but we haven't verified if this is actually
    // helpful. We should benchmark this in the future.

    var parsedBlock;
    var ownerlessTemplate = null;
    var templateCache = new WeakMap();
    var factory = owner => {
      if (parsedBlock === undefined) {
        parsedBlock = JSON.parse(block);
      }
      if (owner === undefined) {
        if (ownerlessTemplate === null) {
          templateCacheCounters.cacheMiss++;
          ownerlessTemplate = new TemplateImpl({
            id,
            block: parsedBlock,
            moduleName,
            owner: null,
            scope,
            isStrictMode
          });
        } else {
          templateCacheCounters.cacheHit++;
        }
        return ownerlessTemplate;
      }
      var result = templateCache.get(owner);
      if (result === undefined) {
        templateCacheCounters.cacheMiss++;
        result = new TemplateImpl({
          id,
          block: parsedBlock,
          moduleName,
          owner,
          scope,
          isStrictMode
        });
        templateCache.set(owner, result);
      } else {
        templateCacheCounters.cacheHit++;
      }
      return result;
    };
    factory.__id = id;
    factory.__meta = {
      moduleName
    };
    return factory;
  }
  class TemplateImpl {
    constructor(parsedLayout) {
      this.parsedLayout = parsedLayout;
      this.result = 'ok';
      this.layout = null;
      this.partial = null;
      this.wrappedLayout = null;
    }
    get moduleName() {
      return this.parsedLayout.moduleName;
    }
    get id() {
      return this.parsedLayout.id;
    } // TODO(template-refactors): This should be removed in the near future, it is
    // only being exposed for backwards compatibility

    get referrer() {
      return {
        moduleName: this.parsedLayout.moduleName,
        owner: this.parsedLayout.owner
      };
    }
    asLayout() {
      if (this.layout) return this.layout;
      return this.layout = compilable((0, _util.assign)({}, this.parsedLayout, {
        asPartial: false
      }), this.moduleName);
    }
    asPartial() {
      if (this.partial) return this.partial;
      return this.partial = compilable((0, _util.assign)({}, this.parsedLayout, {
        asPartial: true
      }), this.moduleName);
    }
    asWrappedLayout() {
      if (this.wrappedLayout) return this.wrappedLayout;
      return this.wrappedLayout = new WrappedBuilder((0, _util.assign)({}, this.parsedLayout, {
        asPartial: false
      }), this.moduleName);
    }
  }
});