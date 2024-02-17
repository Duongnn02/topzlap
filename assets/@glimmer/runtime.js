define("@glimmer/runtime", ["exports", "@glimmer/util", "@glimmer/reference", "@glimmer/global-context", "@glimmer/destroyable", "@glimmer/vm", "@glimmer/validator", "@glimmer/manager", "@glimmer/program", "@glimmer/owner", "@glimmer/runtime"], function (_exports, _util, _reference, _globalContext, _destroyable2, _vm2, _validator, _manager5, _program, _owner2, _runtime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.array = _exports.UpdatingVM = _exports.UpdatableBlockImpl = _exports.TemplateOnlyComponentManager = _exports.TemplateOnlyComponent = _exports.TEMPLATE_ONLY_COMPONENT_MANAGER = _exports.SimpleDynamicAttribute = _exports.SERIALIZATION_FIRST_NODE_STRING = _exports.RemoteLiveBlock = _exports.RehydrateBuilder = _exports.PartialScopeImpl = _exports.NewElementBuilder = _exports.LowLevelVM = _exports.IDOMChanges = _exports.EnvironmentImpl = _exports.EMPTY_POSITIONAL = _exports.EMPTY_NAMED = _exports.EMPTY_ARGS = _exports.DynamicScopeImpl = _exports.DynamicAttribute = _exports.DOMTreeConstruction = _exports.DOMChanges = _exports.CursorImpl = _exports.CurriedValue = _exports.ConcreteBounds = void 0;
  _exports.clear = clear;
  _exports.clientBuilder = clientBuilder;
  _exports.concat = void 0;
  _exports.createCapturedArgs = createCapturedArgs;
  _exports.curry = curry;
  Object.defineProperty(_exports, "destroy", {
    enumerable: true,
    get: function () {
      return _destroyable2.destroy;
    }
  });
  _exports.dynamicAttribute = dynamicAttribute;
  _exports.hash = _exports.get = _exports.fn = void 0;
  _exports.inTransaction = inTransaction;
  _exports.invokeHelper = invokeHelper;
  Object.defineProperty(_exports, "isDestroyed", {
    enumerable: true,
    get: function () {
      return _destroyable2.isDestroyed;
    }
  });
  Object.defineProperty(_exports, "isDestroying", {
    enumerable: true,
    get: function () {
      return _destroyable2.isDestroying;
    }
  });
  _exports.isSerializationFirstNode = isSerializationFirstNode;
  _exports.isWhitespace = isWhitespace;
  _exports.normalizeProperty = normalizeProperty;
  _exports.on = void 0;
  Object.defineProperty(_exports, "registerDestructor", {
    enumerable: true,
    get: function () {
      return _destroyable2.registerDestructor;
    }
  });
  _exports.rehydrationBuilder = rehydrationBuilder;
  _exports.reifyArgs = reifyArgs;
  _exports.reifyNamed = reifyNamed$1;
  _exports.reifyPositional = reifyPositional$1;
  _exports.renderComponent = renderComponent;
  _exports.renderMain = renderMain;
  _exports.renderSync = renderSync;
  _exports.resetDebuggerCallback = resetDebuggerCallback;
  _exports.runtimeContext = runtimeContext;
  _exports.setDebuggerCallback = setDebuggerCallback;
  _exports.templateOnlyComponent = templateOnlyComponent;
  class DynamicScopeImpl {
    constructor(bucket) {
      if (bucket) {
        this.bucket = (0, _util.assign)({}, bucket);
      } else {
        this.bucket = {};
      }
    }
    get(key) {
      return this.bucket[key];
    }
    set(key, reference) {
      return this.bucket[key] = reference;
    }
    child() {
      return new DynamicScopeImpl(this.bucket);
    }
  }
  _exports.DynamicScopeImpl = DynamicScopeImpl;
  class PartialScopeImpl {
    constructor(
    // the 0th slot is `self`
    slots, owner, callerScope,
    // named arguments and blocks passed to a layout that uses eval
    evalScope,
    // locals in scope when the partial was invoked
    partialMap) {
      this.slots = slots;
      this.owner = owner;
      this.callerScope = callerScope;
      this.evalScope = evalScope;
      this.partialMap = partialMap;
    }
    static root(self, size, owner) {
      if (size === void 0) {
        size = 0;
      }
      var refs = new Array(size + 1);
      for (var i = 0; i <= size; i++) {
        refs[i] = _reference.UNDEFINED_REFERENCE;
      }
      return new PartialScopeImpl(refs, owner, null, null, null).init({
        self
      });
    }
    static sized(size, owner) {
      if (size === void 0) {
        size = 0;
      }
      var refs = new Array(size + 1);
      for (var i = 0; i <= size; i++) {
        refs[i] = _reference.UNDEFINED_REFERENCE;
      }
      return new PartialScopeImpl(refs, owner, null, null, null);
    }
    init(_ref) {
      var {
        self
      } = _ref;
      this.slots[0] = self;
      return this;
    }
    getSelf() {
      return this.get(0);
    }
    getSymbol(symbol$$1) {
      return this.get(symbol$$1);
    }
    getBlock(symbol$$1) {
      var block = this.get(symbol$$1);
      return block === _reference.UNDEFINED_REFERENCE ? null : block;
    }
    getEvalScope() {
      return this.evalScope;
    }
    getPartialMap() {
      return this.partialMap;
    }
    bind(symbol$$1, value) {
      this.set(symbol$$1, value);
    }
    bindSelf(self) {
      this.set(0, self);
    }
    bindSymbol(symbol$$1, value) {
      this.set(symbol$$1, value);
    }
    bindBlock(symbol$$1, value) {
      this.set(symbol$$1, value);
    }
    bindEvalScope(map) {
      this.evalScope = map;
    }
    bindPartialMap(map) {
      this.partialMap = map;
    }
    bindCallerScope(scope) {
      this.callerScope = scope;
    }
    getCallerScope() {
      return this.callerScope;
    }
    child() {
      return new PartialScopeImpl(this.slots.slice(), this.owner, this.callerScope, this.evalScope, this.partialMap);
    }
    get(index) {
      if (index >= this.slots.length) {
        throw new RangeError(`BUG: cannot get $${index} from scope; length=${this.slots.length}`);
      }
      return this.slots[index];
    }
    set(index, value) {
      if (index >= this.slots.length) {
        throw new RangeError(`BUG: cannot get $${index} from scope; length=${this.slots.length}`);
      }
      this.slots[index] = value;
    }
  }

  // the VM in other classes, but are not intended to be a part of
  // Glimmer's API.
  _exports.PartialScopeImpl = PartialScopeImpl;
  var INNER_VM = (0, _util.symbol)('INNER_VM');
  var DESTROYABLE_STACK = (0, _util.symbol)('DESTROYABLE_STACK');
  var STACKS = (0, _util.symbol)('STACKS');
  var REGISTERS = (0, _util.symbol)('REGISTERS');
  var HEAP = (0, _util.symbol)('HEAP');
  var CONSTANTS = (0, _util.symbol)('CONSTANTS');
  var ARGS = (0, _util.symbol)('ARGS');
  var PC = (0, _util.symbol)('PC');
  class CursorImpl {
    constructor(element, nextSibling) {
      this.element = element;
      this.nextSibling = nextSibling;
    }
  }
  _exports.CursorImpl = CursorImpl;
  class ConcreteBounds {
    constructor(parentNode, first, last) {
      this.parentNode = parentNode;
      this.first = first;
      this.last = last;
    }
    parentElement() {
      return this.parentNode;
    }
    firstNode() {
      return this.first;
    }
    lastNode() {
      return this.last;
    }
  }
  _exports.ConcreteBounds = ConcreteBounds;
  class SingleNodeBounds {
    constructor(parentNode, node) {
      this.parentNode = parentNode;
      this.node = node;
    }
    parentElement() {
      return this.parentNode;
    }
    firstNode() {
      return this.node;
    }
    lastNode() {
      return this.node;
    }
  }
  function move(bounds, reference) {
    var parent = bounds.parentElement();
    var first = bounds.firstNode();
    var last = bounds.lastNode();
    var current = first;
    while (true) {
      var next = current.nextSibling;
      parent.insertBefore(current, reference);
      if (current === last) {
        return next;
      }
      current = next;
    }
  }
  function clear(bounds) {
    var parent = bounds.parentElement();
    var first = bounds.firstNode();
    var last = bounds.lastNode();
    var current = first;
    while (true) {
      var next = current.nextSibling;
      parent.removeChild(current);
      if (current === last) {
        return next;
      }
      current = next;
    }
  }
  function normalizeStringValue(value) {
    if (isEmpty(value)) {
      return '';
    }
    return String(value);
  }
  function shouldCoerce(value) {
    return isString(value) || isEmpty(value) || typeof value === 'boolean' || typeof value === 'number';
  }
  function isEmpty(value) {
    return value === null || value === undefined || typeof value.toString !== 'function';
  }
  function isSafeString(value) {
    return typeof value === 'object' && value !== null && typeof value.toHTML === 'function';
  }
  function isNode(value) {
    return typeof value === 'object' && value !== null && typeof value.nodeType === 'number';
  }
  function isFragment(value) {
    return isNode(value) && value.nodeType === 11;
  }
  function isString(value) {
    return typeof value === 'string';
  }

  /*
   * @method normalizeProperty
   * @param element {HTMLElement}
   * @param slotName {String}
   * @returns {Object} { name, type }
   */
  function normalizeProperty(element, slotName) {
    var type, normalized;
    if (slotName in element) {
      normalized = slotName;
      type = 'prop';
    } else {
      var lower = slotName.toLowerCase();
      if (lower in element) {
        type = 'prop';
        normalized = lower;
      } else {
        type = 'attr';
        normalized = slotName;
      }
    }
    if (type === 'prop' && (normalized.toLowerCase() === 'style' || preferAttr(element.tagName, normalized))) {
      type = 'attr';
    }
    return {
      normalized,
      type
    };
  }
  // * browser bug
  // * strange spec outlier

  var ATTR_OVERRIDES = {
    INPUT: {
      form: true,
      // Chrome 46.0.2464.0: 'autocorrect' in document.createElement('input') === false
      // Safari 8.0.7: 'autocorrect' in document.createElement('input') === false
      // Mobile Safari (iOS 8.4 simulator): 'autocorrect' in document.createElement('input') === true
      autocorrect: true,
      // Chrome 54.0.2840.98: 'list' in document.createElement('input') === true
      // Safari 9.1.3: 'list' in document.createElement('input') === false
      list: true
    },
    // element.form is actually a legitimate readOnly property, that is to be
    // mutated, but must be mutated by setAttribute...
    SELECT: {
      form: true
    },
    OPTION: {
      form: true
    },
    TEXTAREA: {
      form: true
    },
    LABEL: {
      form: true
    },
    FIELDSET: {
      form: true
    },
    LEGEND: {
      form: true
    },
    OBJECT: {
      form: true
    },
    OUTPUT: {
      form: true
    },
    BUTTON: {
      form: true
    }
  };
  function preferAttr(tagName, propName) {
    var tag = ATTR_OVERRIDES[tagName.toUpperCase()];
    return tag && tag[propName.toLowerCase()] || false;
  }
  var badProtocols = ['javascript:', 'vbscript:'];
  var badTags = ['A', 'BODY', 'LINK', 'IMG', 'IFRAME', 'BASE', 'FORM'];
  var badTagsForDataURI = ['EMBED'];
  var badAttributes = ['href', 'src', 'background', 'action'];
  var badAttributesForDataURI = ['src'];
  function has(array, item) {
    return array.indexOf(item) !== -1;
  }
  function checkURI(tagName, attribute) {
    return (tagName === null || has(badTags, tagName)) && has(badAttributes, attribute);
  }
  function checkDataURI(tagName, attribute) {
    if (tagName === null) return false;
    return has(badTagsForDataURI, tagName) && has(badAttributesForDataURI, attribute);
  }
  function requiresSanitization(tagName, attribute) {
    return checkURI(tagName, attribute) || checkDataURI(tagName, attribute);
  }
  var protocolForUrl;
  if (typeof URL === 'object' && URL !== null &&
  // this is super annoying, TS thinks that URL **must** be a function so `URL.parse` check
  // thinks it is `never` without this `as unknown as any`
  typeof URL.parse === 'function') {
    // In Ember-land the `fastboot` package sets the `URL` global to `require('url')`
    // ultimately, this should be changed (so that we can either rely on the natural `URL` global
    // that exists) but for now we have to detect the specific `FastBoot` case first
    //
    // a future version of `fastboot` will detect if this legacy URL setup is required (by
    // inspecting Ember version) and if new enough, it will avoid shadowing the `URL` global
    // constructor with `require('url')`.
    var nodeURL = URL;
    protocolForUrl = url => {
      var protocol = null;
      if (typeof url === 'string') {
        protocol = nodeURL.parse(url).protocol;
      }
      return protocol === null ? ':' : protocol;
    };
  } else if (typeof URL === 'function') {
    protocolForUrl = _url => {
      try {
        var url = new URL(_url);
        return url.protocol;
      } catch (error) {
        // any non-fully qualified url string will trigger an error (because there is no
        // baseURI that we can provide; in that case we **know** that the protocol is
        // "safe" because it isn't specifically one of the `badProtocols` listed above
        // (and those protocols can never be the default baseURI)
        return ':';
      }
    };
  } else {
    // fallback for IE11 support
    var parsingNode = document.createElement('a');
    protocolForUrl = url => {
      parsingNode.href = url;
      return parsingNode.protocol;
    };
  }
  function sanitizeAttributeValue(element, attribute, value) {
    var tagName = null;
    if (value === null || value === undefined) {
      return value;
    }
    if (isSafeString(value)) {
      return value.toHTML();
    }
    if (!element) {
      tagName = null;
    } else {
      tagName = element.tagName.toUpperCase();
    }
    var str = normalizeStringValue(value);
    if (checkURI(tagName, attribute)) {
      var protocol = protocolForUrl(str);
      if (has(badProtocols, protocol)) {
        return `unsafe:${str}`;
      }
    }
    if (checkDataURI(tagName, attribute)) {
      return `unsafe:${str}`;
    }
    return str;
  }
  function dynamicAttribute(element, attr, namespace, isTrusting) {
    if (isTrusting === void 0) {
      isTrusting = false;
    }
    var {
      tagName,
      namespaceURI
    } = element;
    var attribute = {
      element,
      name: attr,
      namespace
    };
    if (false /* DEBUG */ && attr === 'style' && !isTrusting) {
      return new DebugStyleAttributeManager(attribute);
    }
    if (namespaceURI === "http://www.w3.org/2000/svg"
    /* SVG */) {
      return buildDynamicAttribute(tagName, attr, attribute);
    }
    var {
      type,
      normalized
    } = normalizeProperty(element, attr);
    if (type === 'attr') {
      return buildDynamicAttribute(tagName, normalized, attribute);
    } else {
      return buildDynamicProperty(tagName, normalized, attribute);
    }
  }
  function buildDynamicAttribute(tagName, name, attribute) {
    if (requiresSanitization(tagName, name)) {
      return new SafeDynamicAttribute(attribute);
    } else {
      return new SimpleDynamicAttribute(attribute);
    }
  }
  function buildDynamicProperty(tagName, name, attribute) {
    if (requiresSanitization(tagName, name)) {
      return new SafeDynamicProperty(name, attribute);
    }
    if (isUserInputValue(tagName, name)) {
      return new InputValueDynamicAttribute(name, attribute);
    }
    if (isOptionSelected(tagName, name)) {
      return new OptionSelectedDynamicAttribute(name, attribute);
    }
    return new DefaultDynamicProperty(name, attribute);
  }
  class DynamicAttribute {
    constructor(attribute) {
      this.attribute = attribute;
    }
  }
  _exports.DynamicAttribute = DynamicAttribute;
  class SimpleDynamicAttribute extends DynamicAttribute {
    set(dom, value, _env) {
      var normalizedValue = normalizeValue(value);
      if (normalizedValue !== null) {
        var {
          name,
          namespace
        } = this.attribute;
        dom.__setAttribute(name, normalizedValue, namespace);
      }
    }
    update(value, _env) {
      var normalizedValue = normalizeValue(value);
      var {
        element,
        name
      } = this.attribute;
      if (normalizedValue === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, normalizedValue);
      }
    }
  }
  _exports.SimpleDynamicAttribute = SimpleDynamicAttribute;
  class DefaultDynamicProperty extends DynamicAttribute {
    constructor(normalizedName, attribute) {
      super(attribute);
      this.normalizedName = normalizedName;
    }
    set(dom, value, _env) {
      if (value !== null && value !== undefined) {
        this.value = value;
        dom.__setProperty(this.normalizedName, value);
      }
    }
    update(value, _env) {
      var {
        element
      } = this.attribute;
      if (this.value !== value) {
        element[this.normalizedName] = this.value = value;
        if (value === null || value === undefined) {
          this.removeAttribute();
        }
      }
    }
    removeAttribute() {
      // TODO this sucks but to preserve properties first and to meet current
      // semantics we must do this.
      var {
        element,
        namespace
      } = this.attribute;
      if (namespace) {
        element.removeAttributeNS(namespace, this.normalizedName);
      } else {
        element.removeAttribute(this.normalizedName);
      }
    }
  }
  class SafeDynamicProperty extends DefaultDynamicProperty {
    set(dom, value, env) {
      var {
        element,
        name
      } = this.attribute;
      var sanitized = sanitizeAttributeValue(element, name, value);
      super.set(dom, sanitized, env);
    }
    update(value, env) {
      var {
        element,
        name
      } = this.attribute;
      var sanitized = sanitizeAttributeValue(element, name, value);
      super.update(sanitized, env);
    }
  }
  class SafeDynamicAttribute extends SimpleDynamicAttribute {
    set(dom, value, env) {
      var {
        element,
        name
      } = this.attribute;
      var sanitized = sanitizeAttributeValue(element, name, value);
      super.set(dom, sanitized, env);
    }
    update(value, env) {
      var {
        element,
        name
      } = this.attribute;
      var sanitized = sanitizeAttributeValue(element, name, value);
      super.update(sanitized, env);
    }
  }
  class InputValueDynamicAttribute extends DefaultDynamicProperty {
    set(dom, value) {
      dom.__setProperty('value', normalizeStringValue(value));
    }
    update(value) {
      var input = this.attribute.element;
      var currentValue = input.value;
      var normalizedValue = normalizeStringValue(value);
      if (currentValue !== normalizedValue) {
        input.value = normalizedValue;
      }
    }
  }
  class OptionSelectedDynamicAttribute extends DefaultDynamicProperty {
    set(dom, value) {
      if (value !== null && value !== undefined && value !== false) {
        dom.__setProperty('selected', true);
      }
    }
    update(value) {
      var option = this.attribute.element;
      if (value) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    }
  }
  function isOptionSelected(tagName, attribute) {
    return tagName === 'OPTION' && attribute === 'selected';
  }
  function isUserInputValue(tagName, attribute) {
    return (tagName === 'INPUT' || tagName === 'TEXTAREA') && attribute === 'value';
  }
  function normalizeValue(value) {
    if (value === false || value === undefined || value === null || typeof value.toString === 'undefined') {
      return null;
    }
    if (value === true) {
      return '';
    } // onclick function etc in SSR

    if (typeof value === 'function') {
      return null;
    }
    return String(value);
  }
  var DebugStyleAttributeManager;
  if (false /* DEBUG */) {
    DebugStyleAttributeManager = class extends SimpleDynamicAttribute {
      set(dom, value, env) {
        (0, _globalContext.warnIfStyleNotTrusted)(value);
        super.set(dom, value, env);
      }
      update(value, env) {
        (0, _globalContext.warnIfStyleNotTrusted)(value);
        super.update(value, env);
      }
    };
  }
  var _a;
  class First {
    constructor(node) {
      this.node = node;
    }
    firstNode() {
      return this.node;
    }
  }
  class Last {
    constructor(node) {
      this.node = node;
    }
    lastNode() {
      return this.node;
    }
  }
  var CURSOR_STACK = (0, _util.symbol)('CURSOR_STACK');
  class NewElementBuilder {
    constructor(env, parentNode, nextSibling) {
      this.constructing = null;
      this.operations = null;
      this[_a] = new _util.Stack();
      this.modifierStack = new _util.Stack();
      this.blockStack = new _util.Stack();
      this.pushElement(parentNode, nextSibling);
      this.env = env;
      this.dom = env.getAppendOperations();
      this.updateOperations = env.getDOM();
    }
    static forInitialRender(env, cursor) {
      return new this(env, cursor.element, cursor.nextSibling).initialize();
    }
    static resume(env, block) {
      var parentNode = block.parentElement();
      var nextSibling = block.reset(env);
      var stack = new this(env, parentNode, nextSibling).initialize();
      stack.pushLiveBlock(block);
      return stack;
    }
    initialize() {
      this.pushSimpleBlock();
      return this;
    }
    debugBlocks() {
      return this.blockStack.toArray();
    }
    get element() {
      return this[CURSOR_STACK].current.element;
    }
    get nextSibling() {
      return this[CURSOR_STACK].current.nextSibling;
    }
    get hasBlocks() {
      return this.blockStack.size > 0;
    }
    block() {
      return this.blockStack.current;
    }
    popElement() {
      this[CURSOR_STACK].pop();
      this[CURSOR_STACK].current;
    }
    pushSimpleBlock() {
      return this.pushLiveBlock(new SimpleLiveBlock(this.element));
    }
    pushUpdatableBlock() {
      return this.pushLiveBlock(new UpdatableBlockImpl(this.element));
    }
    pushBlockList(list) {
      return this.pushLiveBlock(new LiveBlockList(this.element, list));
    }
    pushLiveBlock(block, isRemote) {
      if (isRemote === void 0) {
        isRemote = false;
      }
      var current = this.blockStack.current;
      if (current !== null) {
        if (!isRemote) {
          current.didAppendBounds(block);
        }
      }
      this.__openBlock();
      this.blockStack.push(block);
      return block;
    }
    popBlock() {
      this.block().finalize(this);
      this.__closeBlock();
      return this.blockStack.pop();
    }
    __openBlock() {}
    __closeBlock() {} // todo return seems unused

    openElement(tag) {
      var element = this.__openElement(tag);
      this.constructing = element;
      return element;
    }
    __openElement(tag) {
      return this.dom.createElement(tag, this.element);
    }
    flushElement(modifiers) {
      var parent = this.element;
      var element = this.constructing;
      this.__flushElement(parent, element);
      this.constructing = null;
      this.operations = null;
      this.pushModifiers(modifiers);
      this.pushElement(element, null);
      this.didOpenElement(element);
    }
    __flushElement(parent, constructing) {
      this.dom.insertBefore(parent, constructing, this.nextSibling);
    }
    closeElement() {
      this.willCloseElement();
      this.popElement();
      return this.popModifiers();
    }
    pushRemoteElement(element, guid, insertBefore) {
      return this.__pushRemoteElement(element, guid, insertBefore);
    }
    __pushRemoteElement(element, _guid, insertBefore) {
      this.pushElement(element, insertBefore);
      if (insertBefore === undefined) {
        while (element.lastChild) {
          element.removeChild(element.lastChild);
        }
      }
      var block = new RemoteLiveBlock(element);
      return this.pushLiveBlock(block, true);
    }
    popRemoteElement() {
      this.popBlock();
      this.popElement();
    }
    pushElement(element, nextSibling) {
      if (nextSibling === void 0) {
        nextSibling = null;
      }
      this[CURSOR_STACK].push(new CursorImpl(element, nextSibling));
    }
    pushModifiers(modifiers) {
      this.modifierStack.push(modifiers);
    }
    popModifiers() {
      return this.modifierStack.pop();
    }
    didAppendBounds(bounds) {
      this.block().didAppendBounds(bounds);
      return bounds;
    }
    didAppendNode(node) {
      this.block().didAppendNode(node);
      return node;
    }
    didOpenElement(element) {
      this.block().openElement(element);
      return element;
    }
    willCloseElement() {
      this.block().closeElement();
    }
    appendText(string) {
      return this.didAppendNode(this.__appendText(string));
    }
    __appendText(text) {
      var {
        dom,
        element,
        nextSibling
      } = this;
      var node = dom.createTextNode(text);
      dom.insertBefore(element, node, nextSibling);
      return node;
    }
    __appendNode(node) {
      this.dom.insertBefore(this.element, node, this.nextSibling);
      return node;
    }
    __appendFragment(fragment) {
      var first = fragment.firstChild;
      if (first) {
        var ret = new ConcreteBounds(this.element, first, fragment.lastChild);
        this.dom.insertBefore(this.element, fragment, this.nextSibling);
        return ret;
      } else {
        return new SingleNodeBounds(this.element, this.__appendComment(''));
      }
    }
    __appendHTML(html) {
      return this.dom.insertHTMLBefore(this.element, this.nextSibling, html);
    }
    appendDynamicHTML(value) {
      var bounds = this.trustedContent(value);
      this.didAppendBounds(bounds);
    }
    appendDynamicText(value) {
      var node = this.untrustedContent(value);
      this.didAppendNode(node);
      return node;
    }
    appendDynamicFragment(value) {
      var bounds = this.__appendFragment(value);
      this.didAppendBounds(bounds);
    }
    appendDynamicNode(value) {
      var node = this.__appendNode(value);
      var bounds = new SingleNodeBounds(this.element, node);
      this.didAppendBounds(bounds);
    }
    trustedContent(value) {
      return this.__appendHTML(value);
    }
    untrustedContent(value) {
      return this.__appendText(value);
    }
    appendComment(string) {
      return this.didAppendNode(this.__appendComment(string));
    }
    __appendComment(string) {
      var {
        dom,
        element,
        nextSibling
      } = this;
      var node = dom.createComment(string);
      dom.insertBefore(element, node, nextSibling);
      return node;
    }
    __setAttribute(name, value, namespace) {
      this.dom.setAttribute(this.constructing, name, value, namespace);
    }
    __setProperty(name, value) {
      this.constructing[name] = value;
    }
    setStaticAttribute(name, value, namespace) {
      this.__setAttribute(name, value, namespace);
    }
    setDynamicAttribute(name, value, trusting, namespace) {
      var element = this.constructing;
      var attribute = dynamicAttribute(element, name, namespace, trusting);
      attribute.set(this, value, this.env);
      return attribute;
    }
  }
  _exports.NewElementBuilder = NewElementBuilder;
  _a = CURSOR_STACK;
  class SimpleLiveBlock {
    constructor(parent) {
      this.parent = parent;
      this.first = null;
      this.last = null;
      this.nesting = 0;
    }
    parentElement() {
      return this.parent;
    }
    firstNode() {
      var first = this.first;
      return first.firstNode();
    }
    lastNode() {
      var last = this.last;
      return last.lastNode();
    }
    openElement(element) {
      this.didAppendNode(element);
      this.nesting++;
    }
    closeElement() {
      this.nesting--;
    }
    didAppendNode(node) {
      if (this.nesting !== 0) return;
      if (!this.first) {
        this.first = new First(node);
      }
      this.last = new Last(node);
    }
    didAppendBounds(bounds) {
      if (this.nesting !== 0) return;
      if (!this.first) {
        this.first = bounds;
      }
      this.last = bounds;
    }
    finalize(stack) {
      if (this.first === null) {
        stack.appendComment('');
      }
    }
  }
  class RemoteLiveBlock extends SimpleLiveBlock {
    constructor(parent) {
      super(parent);
      (0, _destroyable2.registerDestructor)(this, () => {
        // In general, you only need to clear the root of a hierarchy, and should never
        // need to clear any child nodes. This is an important constraint that gives us
        // a strong guarantee that clearing a subtree is a single DOM operation.
        //
        // Because remote blocks are not normally physically nested inside of the tree
        // that they are logically nested inside, we manually clear remote blocks when
        // a logical parent is cleared.
        //
        // HOWEVER, it is currently possible for a remote block to be physically nested
        // inside of the block it is logically contained inside of. This happens when
        // the remote block is appended to the end of the application's entire element.
        //
        // The problem with that scenario is that Glimmer believes that it owns more of
        // the DOM than it actually does. The code is attempting to write past the end
        // of the Glimmer-managed root, but Glimmer isn't aware of that.
        //
        // The correct solution to that problem is for Glimmer to be aware of the end
        // of the bounds that it owns, and once we make that change, this check could
        // be removed.
        //
        // For now, a more targeted fix is to check whether the node was already removed
        // and avoid clearing the node if it was. In most cases this shouldn't happen,
        // so this might hide bugs where the code clears nested nodes unnecessarily,
        // so we should eventually try to do the correct fix.
        if (this.parentElement() === this.firstNode().parentNode) {
          clear(this);
        }
      });
    }
  }
  _exports.RemoteLiveBlock = RemoteLiveBlock;
  class UpdatableBlockImpl extends SimpleLiveBlock {
    reset() {
      (0, _destroyable2.destroy)(this);
      var nextSibling = clear(this);
      this.first = null;
      this.last = null;
      this.nesting = 0;
      return nextSibling;
    }
  } // FIXME: All the noops in here indicate a modelling problem
  _exports.UpdatableBlockImpl = UpdatableBlockImpl;
  class LiveBlockList {
    constructor(parent, boundList) {
      this.parent = parent;
      this.boundList = boundList;
      this.parent = parent;
      this.boundList = boundList;
    }
    parentElement() {
      return this.parent;
    }
    firstNode() {
      var head = this.boundList[0];
      return head.firstNode();
    }
    lastNode() {
      var boundList = this.boundList;
      var tail = boundList[boundList.length - 1];
      return tail.lastNode();
    }
    openElement(_element) {}
    closeElement() {}
    didAppendNode(_node) {}
    didAppendBounds(_bounds) {}
    finalize(_stack) {}
  }
  function clientBuilder(env, cursor) {
    return NewElementBuilder.forInitialRender(env, cursor);
  }
  class AppendOpcodes {
    constructor() {
      this.evaluateOpcode = (0, _util.fillNulls)(104
      /* Size */).slice();
    }
    add(name, evaluate, kind) {
      if (kind === void 0) {
        kind = 'syscall';
      }
      this.evaluateOpcode[name] = {
        syscall: kind !== 'machine',
        evaluate
      };
    }
    debugBefore(vm, opcode) {
      var params = undefined;
      var opName = undefined;
      var sp;
      return {
        sp: sp,
        pc: vm.fetchValue(_vm2.$pc),
        name: opName,
        params,
        type: opcode.type,
        isMachine: opcode.isMachine,
        size: opcode.size,
        state: undefined
      };
    }
    debugAfter(vm, pre) {}
    evaluate(vm, opcode, type) {
      var operation = this.evaluateOpcode[type];
      if (operation.syscall) {
        operation.evaluate(vm, opcode);
      } else {
        operation.evaluate(vm[INNER_VM], opcode);
      }
    }
  }
  var APPEND_OPCODES = new AppendOpcodes();
  function createConcatRef(partsRefs) {
    return (0, _reference.createComputeRef)(() => {
      var parts = new Array();
      for (var i = 0; i < partsRefs.length; i++) {
        var value = (0, _reference.valueForRef)(partsRefs[i]);
        if (value !== null && value !== undefined) {
          parts[i] = castToString(value);
        }
      }
      if (parts.length > 0) {
        return parts.join('');
      }
      return null;
    });
  }
  function castToString(value) {
    if (typeof value.toString !== 'function') {
      return '';
    }
    return String(value);
  }
  var TYPE = (0, _util.symbol)('TYPE');
  var INNER = (0, _util.symbol)('INNER');
  var OWNER = (0, _util.symbol)('OWNER');
  var ARGS$1 = (0, _util.symbol)('ARGS');
  var RESOLVED = (0, _util.symbol)('RESOLVED');
  var CURRIED_VALUES = new _util._WeakSet();
  function isCurriedValue(value) {
    return CURRIED_VALUES.has(value);
  }
  function isCurriedType(value, type) {
    return isCurriedValue(value) && value[TYPE] === type;
  }
  class CurriedValue {
    /** @internal */
    constructor(type, inner, owner, args, resolved) {
      if (resolved === void 0) {
        resolved = false;
      }
      CURRIED_VALUES.add(this);
      this[TYPE] = type;
      this[INNER] = inner;
      this[OWNER] = owner;
      this[ARGS$1] = args;
      this[RESOLVED] = resolved;
    }
  }
  _exports.CurriedValue = CurriedValue;
  function resolveCurriedValue(curriedValue) {
    var currentWrapper = curriedValue;
    var positional;
    var named;
    var definition, owner, resolved;
    while (true) {
      var {
        [ARGS$1]: curriedArgs,
        [INNER]: inner
      } = currentWrapper;
      if (curriedArgs !== null) {
        var {
          named: curriedNamed,
          positional: curriedPositional
        } = curriedArgs;
        if (curriedPositional.length > 0) {
          positional = positional === undefined ? curriedPositional : curriedPositional.concat(positional);
        }
        if (named === undefined) {
          named = [];
        }
        named.unshift(curriedNamed);
      }
      if (!isCurriedValue(inner)) {
        // Save off the owner that this helper was curried with. Later on,
        // we'll fetch the value of this register and set it as the owner on the
        // new root scope.
        definition = inner;
        owner = currentWrapper[OWNER];
        resolved = currentWrapper[RESOLVED];
        break;
      }
      currentWrapper = inner;
    }
    return {
      definition,
      owner,
      resolved,
      positional,
      named
    };
  }
  function curry(type, spec, owner, args, resolved) {
    if (resolved === void 0) {
      resolved = false;
    }
    return new CurriedValue(type, spec, owner, args, resolved);
  }
  function createCurryRef(type, inner, owner, args, resolver, isStrict) {
    var lastValue, curriedDefinition;
    return (0, _reference.createComputeRef)(() => {
      var value = (0, _reference.valueForRef)(inner);
      if (value === lastValue) {
        return curriedDefinition;
      }
      if (isCurriedType(value, type)) {
        curriedDefinition = args ? curry(type, value, owner, args) : args;
      } else if (type === 0
      /* Component */ && typeof value === 'string' && value) {
        // Only components should enter this path, as helpers and modifiers do not
        // support string based resolution
        if (false /* DEBUG */) {
          if (isStrict) {
            throw new Error(`Attempted to resolve a dynamic component with a string definition, \`${value}\` in a strict mode template. In strict mode, using strings to resolve component definitions is prohibited. You can instead import the component definition and use it directly.`);
          }
          var resolvedDefinition = resolver.lookupComponent(value, owner);
          if (!resolvedDefinition) {
            throw new Error(`Attempted to resolve \`${value}\`, which was expected to be a component, but nothing was found.`);
          }
        }
        curriedDefinition = curry(type, value, owner, args);
      } else if ((0, _util.isObject)(value)) {
        curriedDefinition = curry(type, value, owner, args);
      } else {
        curriedDefinition = null;
      }
      lastValue = value;
      return curriedDefinition;
    });
  }

  /*
    The calling convention is:
  
    * 0-N block arguments at the bottom
    * 0-N positional arguments next (left-to-right)
    * 0-N named arguments next
  */

  class VMArgumentsImpl {
    constructor() {
      this.stack = null;
      this.positional = new PositionalArgumentsImpl();
      this.named = new NamedArgumentsImpl();
      this.blocks = new BlockArgumentsImpl();
    }
    empty(stack) {
      var base = stack[REGISTERS][_vm2.$sp] + 1;
      this.named.empty(stack, base);
      this.positional.empty(stack, base);
      this.blocks.empty(stack, base);
      return this;
    }
    setup(stack, names, blockNames, positionalCount, atNames) {
      this.stack = stack;
      /*
             | ... | blocks      | positional  | named |
             | ... | b0    b1    | p0 p1 p2 p3 | n0 n1 |
       index | ... | 4/5/6 7/8/9 | 10 11 12 13 | 14 15 |
                     ^             ^             ^  ^
                   bbase         pbase       nbase  sp
      */

      var named = this.named;
      var namedCount = names.length;
      var namedBase = stack[REGISTERS][_vm2.$sp] - namedCount + 1;
      named.setup(stack, namedBase, namedCount, names, atNames);
      var positional = this.positional;
      var positionalBase = namedBase - positionalCount;
      positional.setup(stack, positionalBase, positionalCount);
      var blocks = this.blocks;
      var blocksCount = blockNames.length;
      var blocksBase = positionalBase - blocksCount * 3;
      blocks.setup(stack, blocksBase, blocksCount, blockNames);
    }
    get base() {
      return this.blocks.base;
    }
    get length() {
      return this.positional.length + this.named.length + this.blocks.length * 3;
    }
    at(pos) {
      return this.positional.at(pos);
    }
    realloc(offset) {
      var {
        stack
      } = this;
      if (offset > 0 && stack !== null) {
        var {
          positional,
          named
        } = this;
        var newBase = positional.base + offset;
        var length = positional.length + named.length;
        for (var i = length - 1; i >= 0; i--) {
          stack.copy(i + positional.base, i + newBase);
        }
        positional.base += offset;
        named.base += offset;
        stack[REGISTERS][_vm2.$sp] += offset;
      }
    }
    capture() {
      var positional = this.positional.length === 0 ? EMPTY_POSITIONAL : this.positional.capture();
      var named = this.named.length === 0 ? EMPTY_NAMED : this.named.capture();
      return {
        named,
        positional
      };
    }
    clear() {
      var {
        stack,
        length
      } = this;
      if (length > 0 && stack !== null) stack.pop(length);
    }
  }
  var EMPTY_REFERENCES = (0, _util.emptyArray)();
  class PositionalArgumentsImpl {
    constructor() {
      this.base = 0;
      this.length = 0;
      this.stack = null;
      this._references = null;
    }
    empty(stack, base) {
      this.stack = stack;
      this.base = base;
      this.length = 0;
      this._references = EMPTY_REFERENCES;
    }
    setup(stack, base, length) {
      this.stack = stack;
      this.base = base;
      this.length = length;
      if (length === 0) {
        this._references = EMPTY_REFERENCES;
      } else {
        this._references = null;
      }
    }
    at(position) {
      var {
        base,
        length,
        stack
      } = this;
      if (position < 0 || position >= length) {
        return _reference.UNDEFINED_REFERENCE;
      }
      return stack.get(position, base);
    }
    capture() {
      return this.references;
    }
    prepend(other) {
      var additions = other.length;
      if (additions > 0) {
        var {
          base,
          length,
          stack
        } = this;
        this.base = base = base - additions;
        this.length = length + additions;
        for (var i = 0; i < additions; i++) {
          stack.set(other[i], i, base);
        }
        this._references = null;
      }
    }
    get references() {
      var references = this._references;
      if (!references) {
        var {
          stack,
          base,
          length
        } = this;
        references = this._references = stack.slice(base, base + length);
      }
      return references;
    }
  }
  class NamedArgumentsImpl {
    constructor() {
      this.base = 0;
      this.length = 0;
      this._references = null;
      this._names = _util.EMPTY_STRING_ARRAY;
      this._atNames = _util.EMPTY_STRING_ARRAY;
    }
    empty(stack, base) {
      this.stack = stack;
      this.base = base;
      this.length = 0;
      this._references = EMPTY_REFERENCES;
      this._names = _util.EMPTY_STRING_ARRAY;
      this._atNames = _util.EMPTY_STRING_ARRAY;
    }
    setup(stack, base, length, names, atNames) {
      this.stack = stack;
      this.base = base;
      this.length = length;
      if (length === 0) {
        this._references = EMPTY_REFERENCES;
        this._names = _util.EMPTY_STRING_ARRAY;
        this._atNames = _util.EMPTY_STRING_ARRAY;
      } else {
        this._references = null;
        if (atNames) {
          this._names = null;
          this._atNames = names;
        } else {
          this._names = names;
          this._atNames = null;
        }
      }
    }
    get names() {
      var names = this._names;
      if (!names) {
        names = this._names = this._atNames.map(this.toSyntheticName);
      }
      return names;
    }
    get atNames() {
      var atNames = this._atNames;
      if (!atNames) {
        atNames = this._atNames = this._names.map(this.toAtName);
      }
      return atNames;
    }
    has(name) {
      return this.names.indexOf(name) !== -1;
    }
    get(name, atNames) {
      if (atNames === void 0) {
        atNames = false;
      }
      var {
        base,
        stack
      } = this;
      var names = atNames ? this.atNames : this.names;
      var idx = names.indexOf(name);
      if (idx === -1) {
        return _reference.UNDEFINED_REFERENCE;
      }
      var ref = stack.get(idx, base);
      if (false /* DEBUG */) {
        return (0, _reference.createDebugAliasRef)(atNames ? name : `@${name}`, ref);
      } else {
        return ref;
      }
    }
    capture() {
      var {
        names,
        references
      } = this;
      var map = (0, _util.dict)();
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (false /* DEBUG */) {
          map[name] = (0, _reference.createDebugAliasRef)(`@${name}`, references[i]);
        } else {
          map[name] = references[i];
        }
      }
      return map;
    }
    merge(other) {
      var keys = Object.keys(other);
      if (keys.length > 0) {
        var {
          names,
          length,
          stack
        } = this;
        var newNames = names.slice();
        for (var i = 0; i < keys.length; i++) {
          var name = keys[i];
          var idx = newNames.indexOf(name);
          if (idx === -1) {
            length = newNames.push(name);
            stack.push(other[name]);
          }
        }
        this.length = length;
        this._references = null;
        this._names = newNames;
        this._atNames = null;
      }
    }
    get references() {
      var references = this._references;
      if (!references) {
        var {
          base,
          length,
          stack
        } = this;
        references = this._references = stack.slice(base, base + length);
      }
      return references;
    }
    toSyntheticName(name) {
      return name.slice(1);
    }
    toAtName(name) {
      return `@${name}`;
    }
  }
  function toSymbolName(name) {
    return `&${name}`;
  }
  var EMPTY_BLOCK_VALUES = (0, _util.emptyArray)();
  class BlockArgumentsImpl {
    constructor() {
      this.internalValues = null;
      this._symbolNames = null;
      this.internalTag = null;
      this.names = _util.EMPTY_STRING_ARRAY;
      this.length = 0;
      this.base = 0;
    }
    empty(stack, base) {
      this.stack = stack;
      this.names = _util.EMPTY_STRING_ARRAY;
      this.base = base;
      this.length = 0;
      this._symbolNames = null;
      this.internalTag = _validator.CONSTANT_TAG;
      this.internalValues = EMPTY_BLOCK_VALUES;
    }
    setup(stack, base, length, names) {
      this.stack = stack;
      this.names = names;
      this.base = base;
      this.length = length;
      this._symbolNames = null;
      if (length === 0) {
        this.internalTag = _validator.CONSTANT_TAG;
        this.internalValues = EMPTY_BLOCK_VALUES;
      } else {
        this.internalTag = null;
        this.internalValues = null;
      }
    }
    get values() {
      var values = this.internalValues;
      if (!values) {
        var {
          base,
          length,
          stack
        } = this;
        values = this.internalValues = stack.slice(base, base + length * 3);
      }
      return values;
    }
    has(name) {
      return this.names.indexOf(name) !== -1;
    }
    get(name) {
      var idx = this.names.indexOf(name);
      if (idx === -1) {
        return null;
      }
      var {
        base,
        stack
      } = this;
      var table = stack.get(idx * 3, base);
      var scope = stack.get(idx * 3 + 1, base);
      var handle = stack.get(idx * 3 + 2, base);
      return handle === null ? null : [handle, scope, table];
    }
    capture() {
      return new CapturedBlockArgumentsImpl(this.names, this.values);
    }
    get symbolNames() {
      var symbolNames = this._symbolNames;
      if (symbolNames === null) {
        symbolNames = this._symbolNames = this.names.map(toSymbolName);
      }
      return symbolNames;
    }
  }
  class CapturedBlockArgumentsImpl {
    constructor(names, values) {
      this.names = names;
      this.values = values;
      this.length = names.length;
    }
    has(name) {
      return this.names.indexOf(name) !== -1;
    }
    get(name) {
      var idx = this.names.indexOf(name);
      if (idx === -1) return null;
      return [this.values[idx * 3 + 2], this.values[idx * 3 + 1], this.values[idx * 3]];
    }
  }
  function createCapturedArgs(named, positional) {
    return {
      named,
      positional
    };
  }
  function reifyNamed$1(named) {
    var reified = (0, _util.dict)();
    for (var key in named) {
      reified[key] = (0, _reference.valueForRef)(named[key]);
    }
    return reified;
  }
  function reifyPositional$1(positional) {
    return positional.map(_reference.valueForRef);
  }
  function reifyArgs(args) {
    return {
      named: reifyNamed$1(args.named),
      positional: reifyPositional$1(args.positional)
    };
  }
  var EMPTY_NAMED = Object.freeze(Object.create(null));
  _exports.EMPTY_NAMED = EMPTY_NAMED;
  var EMPTY_POSITIONAL = EMPTY_REFERENCES;
  _exports.EMPTY_POSITIONAL = EMPTY_POSITIONAL;
  var EMPTY_ARGS = createCapturedArgs(EMPTY_NAMED, EMPTY_POSITIONAL);
  _exports.EMPTY_ARGS = EMPTY_ARGS;
  APPEND_OPCODES.add(77
  /* Curry */, (vm, _ref2) => {
    var {
      op1: type,
      op2: _isStrict
    } = _ref2;
    var stack = vm.stack;
    var definition = stack.pop();
    var capturedArgs = stack.pop();
    var owner = vm.getOwner();
    var resolver = vm.runtime.resolver;
    var isStrict = false;
    if (false /* DEBUG */) {
      // strict check only happens in DEBUG builds, no reason to load it otherwise
      isStrict = vm[CONSTANTS].getValue((0, _util.decodeHandle)(_isStrict));
    }
    vm.loadValue(_vm2.$v0, createCurryRef(type, definition, owner, capturedArgs, resolver, isStrict));
  });
  APPEND_OPCODES.add(107
  /* DynamicHelper */, vm => {
    var stack = vm.stack;
    var ref = stack.pop();
    var args = stack.pop().capture();
    var helperRef;
    var initialOwner = vm.getOwner();
    var helperInstanceRef = (0, _reference.createComputeRef)(() => {
      if (helperRef !== undefined) {
        (0, _destroyable2.destroy)(helperRef);
      }
      var definition = (0, _reference.valueForRef)(ref);
      if (isCurriedType(definition, 1
      /* Helper */)) {
        var {
          definition: resolvedDef,
          owner,
          positional,
          named
        } = resolveCurriedValue(definition);
        var _helper = resolveHelper(vm[CONSTANTS], resolvedDef, ref);
        if (named !== undefined) {
          args.named = (0, _util.assign)({}, ...named, args.named);
        }
        if (positional !== undefined) {
          args.positional = positional.concat(args.positional);
        }
        helperRef = _helper(args, owner);
        (0, _destroyable2.associateDestroyableChild)(helperInstanceRef, helperRef);
      } else if ((0, _util.isObject)(definition)) {
        var _helper2 = resolveHelper(vm[CONSTANTS], definition, ref);
        helperRef = _helper2(args, initialOwner);
        if ((0, _destroyable2._hasDestroyableChildren)(helperRef)) {
          (0, _destroyable2.associateDestroyableChild)(helperInstanceRef, helperRef);
        }
      } else {
        helperRef = _reference.UNDEFINED_REFERENCE;
      }
    });
    var helperValueRef = (0, _reference.createComputeRef)(() => {
      (0, _reference.valueForRef)(helperInstanceRef);
      return (0, _reference.valueForRef)(helperRef);
    });
    vm.associateDestroyable(helperInstanceRef);
    vm.loadValue(_vm2.$v0, helperValueRef);
  });
  function resolveHelper(constants, definition, ref) {
    var handle = constants.helper(definition, null, true);
    if (false /* DEBUG */ && handle === null) {
      throw new Error(`Expected a dynamic helper definition, but received an object or function that did not have a helper manager associated with it. The dynamic invocation was \`{{${ref.debugLabel}}}\` or \`(${ref.debugLabel})\`, and the incorrect definition is the value at the path \`${ref.debugLabel}\`, which was: ${(0, _util.debugToString)(definition)}`);
    }
    return constants.getValue(handle);
  }
  APPEND_OPCODES.add(16
  /* Helper */, (vm, _ref3) => {
    var {
      op1: handle
    } = _ref3;
    var stack = vm.stack;
    var helper = vm[CONSTANTS].getValue(handle);
    var args = stack.pop();
    var value = helper(args.capture(), vm.getOwner(), vm.dynamicScope());
    if ((0, _destroyable2._hasDestroyableChildren)(value)) {
      vm.associateDestroyable(value);
    }
    vm.loadValue(_vm2.$v0, value);
  });
  APPEND_OPCODES.add(21
  /* GetVariable */, (vm, _ref4) => {
    var {
      op1: symbol$$1
    } = _ref4;
    var expr = vm.referenceForSymbol(symbol$$1);
    vm.stack.push(expr);
  });
  APPEND_OPCODES.add(19
  /* SetVariable */, (vm, _ref5) => {
    var {
      op1: symbol$$1
    } = _ref5;
    var expr = vm.stack.pop();
    vm.scope().bindSymbol(symbol$$1, expr);
  });
  APPEND_OPCODES.add(20
  /* SetBlock */, (vm, _ref6) => {
    var {
      op1: symbol$$1
    } = _ref6;
    var handle = vm.stack.pop();
    var scope = vm.stack.pop();
    var table = vm.stack.pop();
    vm.scope().bindBlock(symbol$$1, [handle, scope, table]);
  });
  APPEND_OPCODES.add(102
  /* ResolveMaybeLocal */, (vm, _ref7) => {
    var {
      op1: _name
    } = _ref7;
    var name = vm[CONSTANTS].getValue(_name);
    var locals = vm.scope().getPartialMap();
    var ref = locals[name];
    if (ref === undefined) {
      ref = (0, _reference.childRefFor)(vm.getSelf(), name);
    }
    vm.stack.push(ref);
  });
  APPEND_OPCODES.add(37
  /* RootScope */, (vm, _ref8) => {
    var {
      op1: symbols
    } = _ref8;
    vm.pushRootScope(symbols, vm.getOwner());
  });
  APPEND_OPCODES.add(22
  /* GetProperty */, (vm, _ref9) => {
    var {
      op1: _key
    } = _ref9;
    var key = vm[CONSTANTS].getValue(_key);
    var expr = vm.stack.pop();
    vm.stack.push((0, _reference.childRefFor)(expr, key));
  });
  APPEND_OPCODES.add(23
  /* GetBlock */, (vm, _ref10) => {
    var {
      op1: _block
    } = _ref10;
    var {
      stack
    } = vm;
    var block = vm.scope().getBlock(_block);
    stack.push(block);
  });
  APPEND_OPCODES.add(24
  /* SpreadBlock */, vm => {
    var {
      stack
    } = vm;
    var block = stack.pop();
    if (block && !isUndefinedReference(block)) {
      var [handleOrCompilable, scope, table] = block;
      stack.push(table);
      stack.push(scope);
      stack.push(handleOrCompilable);
    } else {
      stack.push(null);
      stack.push(null);
      stack.push(null);
    }
  });
  function isUndefinedReference(input) {
    return input === _reference.UNDEFINED_REFERENCE;
  }
  APPEND_OPCODES.add(25
  /* HasBlock */, vm => {
    var {
      stack
    } = vm;
    var block = stack.pop();
    if (block && !isUndefinedReference(block)) {
      stack.push(_reference.TRUE_REFERENCE);
    } else {
      stack.push(_reference.FALSE_REFERENCE);
    }
  });
  APPEND_OPCODES.add(26
  /* HasBlockParams */, vm => {
    // FIXME(mmun): should only need to push the symbol table
    var block = vm.stack.pop();
    var scope = vm.stack.pop();
    var table = vm.stack.pop();
    var hasBlockParams = table && table.parameters.length;
    vm.stack.push(hasBlockParams ? _reference.TRUE_REFERENCE : _reference.FALSE_REFERENCE);
  });
  APPEND_OPCODES.add(27
  /* Concat */, (vm, _ref11) => {
    var {
      op1: count
    } = _ref11;
    var out = new Array(count);
    for (var i = count; i > 0; i--) {
      var offset = i - 1;
      out[offset] = vm.stack.pop();
    }
    vm.stack.push(createConcatRef(out));
  });
  APPEND_OPCODES.add(109
  /* IfInline */, vm => {
    var condition = vm.stack.pop();
    var truthy = vm.stack.pop();
    var falsy = vm.stack.pop();
    vm.stack.push((0, _reference.createComputeRef)(() => {
      if ((0, _globalContext.toBool)((0, _reference.valueForRef)(condition)) === true) {
        return (0, _reference.valueForRef)(truthy);
      } else {
        return (0, _reference.valueForRef)(falsy);
      }
    }));
  });
  APPEND_OPCODES.add(110
  /* Not */, vm => {
    var ref = vm.stack.pop();
    vm.stack.push((0, _reference.createComputeRef)(() => {
      return !(0, _globalContext.toBool)((0, _reference.valueForRef)(ref));
    }));
  });
  APPEND_OPCODES.add(111
  /* GetDynamicVar */, vm => {
    var scope = vm.dynamicScope();
    var stack = vm.stack;
    var nameRef = stack.pop();
    stack.push((0, _reference.createComputeRef)(() => {
      var name = String((0, _reference.valueForRef)(nameRef));
      return (0, _reference.valueForRef)(scope.get(name));
    }));
  });
  APPEND_OPCODES.add(112
  /* Log */, vm => {
    var {
      positional
    } = vm.stack.pop().capture();
    vm.loadValue(_vm2.$v0, (0, _reference.createComputeRef)(() => {
      // eslint-disable-next-line no-console
      console.log(...reifyPositional$1(positional));
    }));
  });
  function resolveComponent(resolver, constants, name, owner) {
    var definition = resolver.lookupComponent(name, owner);
    if (false /* DEBUG */ && !definition) {
      throw new Error(`Attempted to resolve \`${name}\`, which was expected to be a component, but nothing was found.`);
    }
    return constants.resolvedComponent(definition, name);
  }

  /** @internal */
  function hasCustomDebugRenderTreeLifecycle(manager) {
    return 'getDebugCustomRenderTree' in manager;
  }
  function createClassListRef(list) {
    return (0, _reference.createComputeRef)(() => {
      var ret = [];
      for (var i = 0; i < list.length; i++) {
        var ref = list[i];
        var value = normalizeStringValue(typeof ref === 'string' ? ref : (0, _reference.valueForRef)(list[i]));
        if (value) ret.push(value);
      }
      return ret.length === 0 ? null : ret.join(' ');
    });
  }
  APPEND_OPCODES.add(39
  /* ChildScope */, vm => vm.pushChildScope());
  APPEND_OPCODES.add(40
  /* PopScope */, vm => vm.popScope());
  APPEND_OPCODES.add(59
  /* PushDynamicScope */, vm => vm.pushDynamicScope());
  APPEND_OPCODES.add(60
  /* PopDynamicScope */, vm => vm.popDynamicScope());
  APPEND_OPCODES.add(28
  /* Constant */, (vm, _ref12) => {
    var {
      op1: other
    } = _ref12;
    vm.stack.push(vm[CONSTANTS].getValue((0, _util.decodeHandle)(other)));
  });
  APPEND_OPCODES.add(29
  /* ConstantReference */, (vm, _ref13) => {
    var {
      op1: other
    } = _ref13;
    vm.stack.push((0, _reference.createConstRef)(vm[CONSTANTS].getValue((0, _util.decodeHandle)(other)), false));
  });
  APPEND_OPCODES.add(30
  /* Primitive */, (vm, _ref14) => {
    var {
      op1: primitive
    } = _ref14;
    var stack = vm.stack;
    if ((0, _util.isHandle)(primitive)) {
      // it is a handle which does not already exist on the stack
      var value = vm[CONSTANTS].getValue((0, _util.decodeHandle)(primitive));
      stack.push(value);
    } else {
      // is already an encoded immediate or primitive handle
      stack.push((0, _util.decodeImmediate)(primitive));
    }
  });
  APPEND_OPCODES.add(31
  /* PrimitiveReference */, vm => {
    var stack = vm.stack;
    var value = stack.pop();
    var ref;
    if (value === undefined) {
      ref = _reference.UNDEFINED_REFERENCE;
    } else if (value === null) {
      ref = _reference.NULL_REFERENCE;
    } else if (value === true) {
      ref = _reference.TRUE_REFERENCE;
    } else if (value === false) {
      ref = _reference.FALSE_REFERENCE;
    } else {
      ref = (0, _reference.createPrimitiveRef)(value);
    }
    stack.push(ref);
  });
  APPEND_OPCODES.add(33
  /* Dup */, (vm, _ref15) => {
    var {
      op1: register,
      op2: offset
    } = _ref15;
    var position = vm.fetchValue(register) - offset;
    vm.stack.dup(position);
  });
  APPEND_OPCODES.add(34
  /* Pop */, (vm, _ref16) => {
    var {
      op1: count
    } = _ref16;
    vm.stack.pop(count);
  });
  APPEND_OPCODES.add(35
  /* Load */, (vm, _ref17) => {
    var {
      op1: register
    } = _ref17;
    vm.load(register);
  });
  APPEND_OPCODES.add(36
  /* Fetch */, (vm, _ref18) => {
    var {
      op1: register
    } = _ref18;
    vm.fetch(register);
  });
  APPEND_OPCODES.add(58
  /* BindDynamicScope */, (vm, _ref19) => {
    var {
      op1: _names
    } = _ref19;
    var names = vm[CONSTANTS].getArray(_names);
    vm.bindDynamicScope(names);
  });
  APPEND_OPCODES.add(69
  /* Enter */, (vm, _ref20) => {
    var {
      op1: args
    } = _ref20;
    vm.enter(args);
  });
  APPEND_OPCODES.add(70
  /* Exit */, vm => {
    vm.exit();
  });
  APPEND_OPCODES.add(63
  /* PushSymbolTable */, (vm, _ref21) => {
    var {
      op1: _table
    } = _ref21;
    var stack = vm.stack;
    stack.push(vm[CONSTANTS].getValue(_table));
  });
  APPEND_OPCODES.add(62
  /* PushBlockScope */, vm => {
    var stack = vm.stack;
    stack.push(vm.scope());
  });
  APPEND_OPCODES.add(61
  /* CompileBlock */, vm => {
    var stack = vm.stack;
    var block = stack.pop();
    if (block) {
      stack.push(vm.compile(block));
    } else {
      stack.push(null);
    }
  });
  APPEND_OPCODES.add(64
  /* InvokeYield */, vm => {
    var {
      stack
    } = vm;
    var handle = stack.pop();
    var scope = stack.pop();
    var table = stack.pop();
    var args = stack.pop();
    if (table === null) {
      // To balance the pop{Frame,Scope}
      vm.pushFrame();
      vm.pushScope(scope !== null && scope !== void 0 ? scope : vm.scope());
      return;
    }
    var invokingScope = scope; // If necessary, create a child scope

    {
      var locals = table.parameters;
      var localsCount = locals.length;
      if (localsCount > 0) {
        invokingScope = invokingScope.child();
        for (var i = 0; i < localsCount; i++) {
          invokingScope.bindSymbol(locals[i], args.at(i));
        }
      }
    }
    vm.pushFrame();
    vm.pushScope(invokingScope);
    vm.call(handle);
  });
  APPEND_OPCODES.add(65
  /* JumpIf */, (vm, _ref22) => {
    var {
      op1: target
    } = _ref22;
    var reference = vm.stack.pop();
    var value = Boolean((0, _reference.valueForRef)(reference));
    if ((0, _reference.isConstRef)(reference)) {
      if (value === true) {
        vm.goto(target);
      }
    } else {
      if (value === true) {
        vm.goto(target);
      }
      vm.updateWith(new Assert(reference));
    }
  });
  APPEND_OPCODES.add(66
  /* JumpUnless */, (vm, _ref23) => {
    var {
      op1: target
    } = _ref23;
    var reference = vm.stack.pop();
    var value = Boolean((0, _reference.valueForRef)(reference));
    if ((0, _reference.isConstRef)(reference)) {
      if (value === false) {
        vm.goto(target);
      }
    } else {
      if (value === false) {
        vm.goto(target);
      }
      vm.updateWith(new Assert(reference));
    }
  });
  APPEND_OPCODES.add(67
  /* JumpEq */, (vm, _ref24) => {
    var {
      op1: target,
      op2: comparison
    } = _ref24;
    var other = vm.stack.peek();
    if (other === comparison) {
      vm.goto(target);
    }
  });
  APPEND_OPCODES.add(68
  /* AssertSame */, vm => {
    var reference = vm.stack.peek();
    if ((0, _reference.isConstRef)(reference) === false) {
      vm.updateWith(new Assert(reference));
    }
  });
  APPEND_OPCODES.add(71
  /* ToBoolean */, vm => {
    var {
      stack
    } = vm;
    var valueRef = stack.pop();
    stack.push((0, _reference.createComputeRef)(() => (0, _globalContext.toBool)((0, _reference.valueForRef)(valueRef))));
  });
  class Assert {
    constructor(ref) {
      this.ref = ref;
      this.last = (0, _reference.valueForRef)(ref);
    }
    evaluate(vm) {
      var {
        last,
        ref
      } = this;
      var current = (0, _reference.valueForRef)(ref);
      if (last !== current) {
        vm.throw();
      }
    }
  }
  class AssertFilter {
    constructor(ref, filter) {
      this.ref = ref;
      this.filter = filter;
      this.last = filter((0, _reference.valueForRef)(ref));
    }
    evaluate(vm) {
      var {
        last,
        ref,
        filter
      } = this;
      var current = filter((0, _reference.valueForRef)(ref));
      if (last !== current) {
        vm.throw();
      }
    }
  }
  class JumpIfNotModifiedOpcode {
    constructor() {
      this.tag = _validator.CONSTANT_TAG;
      this.lastRevision = _validator.INITIAL;
    }
    finalize(tag, target) {
      this.target = target;
      this.didModify(tag);
    }
    evaluate(vm) {
      var {
        tag,
        target,
        lastRevision
      } = this;
      if (!vm.alwaysRevalidate && (0, _validator.validateTag)(tag, lastRevision)) {
        (0, _validator.consumeTag)(tag);
        vm.goto(target);
      }
    }
    didModify(tag) {
      this.tag = tag;
      this.lastRevision = (0, _validator.valueForTag)(this.tag);
      (0, _validator.consumeTag)(tag);
    }
  }
  class BeginTrackFrameOpcode {
    constructor(debugLabel) {
      this.debugLabel = debugLabel;
    }
    evaluate() {
      (0, _validator.beginTrackFrame)(this.debugLabel);
    }
  }
  class EndTrackFrameOpcode {
    constructor(target) {
      this.target = target;
    }
    evaluate() {
      var tag = (0, _validator.endTrackFrame)();
      this.target.didModify(tag);
    }
  }
  APPEND_OPCODES.add(41
  /* Text */, (vm, _ref25) => {
    var {
      op1: text
    } = _ref25;
    vm.elements().appendText(vm[CONSTANTS].getValue(text));
  });
  APPEND_OPCODES.add(42
  /* Comment */, (vm, _ref26) => {
    var {
      op1: text
    } = _ref26;
    vm.elements().appendComment(vm[CONSTANTS].getValue(text));
  });
  APPEND_OPCODES.add(48
  /* OpenElement */, (vm, _ref27) => {
    var {
      op1: tag
    } = _ref27;
    vm.elements().openElement(vm[CONSTANTS].getValue(tag));
  });
  APPEND_OPCODES.add(49
  /* OpenDynamicElement */, vm => {
    var tagName = (0, _reference.valueForRef)(vm.stack.pop());
    vm.elements().openElement(tagName);
  });
  APPEND_OPCODES.add(50
  /* PushRemoteElement */, vm => {
    var elementRef = vm.stack.pop();
    var insertBeforeRef = vm.stack.pop();
    var guidRef = vm.stack.pop();
    var element = (0, _reference.valueForRef)(elementRef);
    var insertBefore = (0, _reference.valueForRef)(insertBeforeRef);
    var guid = (0, _reference.valueForRef)(guidRef);
    if (!(0, _reference.isConstRef)(elementRef)) {
      vm.updateWith(new Assert(elementRef));
    }
    if (insertBefore !== undefined && !(0, _reference.isConstRef)(insertBeforeRef)) {
      vm.updateWith(new Assert(insertBeforeRef));
    }
    var block = vm.elements().pushRemoteElement(element, guid, insertBefore);
    if (block) vm.associateDestroyable(block);
  });
  APPEND_OPCODES.add(56
  /* PopRemoteElement */, vm => {
    vm.elements().popRemoteElement();
  });
  APPEND_OPCODES.add(54
  /* FlushElement */, vm => {
    var operations = vm.fetchValue(_vm2.$t0);
    var modifiers = null;
    if (operations) {
      modifiers = operations.flush(vm);
      vm.loadValue(_vm2.$t0, null);
    }
    vm.elements().flushElement(modifiers);
  });
  APPEND_OPCODES.add(55
  /* CloseElement */, vm => {
    var modifiers = vm.elements().closeElement();
    if (modifiers) {
      modifiers.forEach(modifier => {
        vm.env.scheduleInstallModifier(modifier);
        var {
          manager,
          state
        } = modifier;
        var d = manager.getDestroyable(state);
        if (d) {
          vm.associateDestroyable(d);
        }
      });
    }
  });
  APPEND_OPCODES.add(57
  /* Modifier */, (vm, _ref28) => {
    var {
      op1: handle
    } = _ref28;
    if (vm.env.isInteractive === false) {
      return;
    }
    var owner = vm.getOwner();
    var args = vm.stack.pop();
    var definition = vm[CONSTANTS].getValue(handle);
    var {
      manager
    } = definition;
    var {
      constructing
    } = vm.elements();
    var state = manager.create(owner, constructing, definition.state, args.capture());
    var instance = {
      manager,
      state,
      definition
    };
    var operations = vm.fetchValue(_vm2.$t0);
    operations.addModifier(instance);
    var tag = manager.getTag(state);
    if (tag !== null) {
      (0, _validator.consumeTag)(tag);
      return vm.updateWith(new UpdateModifierOpcode(tag, instance));
    }
  });
  APPEND_OPCODES.add(108
  /* DynamicModifier */, vm => {
    if (vm.env.isInteractive === false) {
      return;
    }
    var {
      stack,
      [CONSTANTS]: constants
    } = vm;
    var ref = stack.pop();
    var args = stack.pop().capture();
    var {
      constructing
    } = vm.elements();
    var initialOwner = vm.getOwner();
    var instanceRef = (0, _reference.createComputeRef)(() => {
      var value = (0, _reference.valueForRef)(ref);
      var owner;
      if (!(0, _util.isObject)(value)) {
        return;
      }
      var hostDefinition;
      if (isCurriedType(value, 2
      /* Modifier */)) {
        var {
          definition: resolvedDefinition,
          owner: curriedOwner,
          positional,
          named
        } = resolveCurriedValue(value);
        hostDefinition = resolvedDefinition;
        owner = curriedOwner;
        if (positional !== undefined) {
          args.positional = positional.concat(args.positional);
        }
        if (named !== undefined) {
          args.named = (0, _util.assign)({}, ...named, args.named);
        }
      } else {
        hostDefinition = value;
        owner = initialOwner;
      }
      var handle = constants.modifier(hostDefinition, null, true);
      if (false /* DEBUG */ && handle === null) {
        throw new Error(`Expected a dynamic modifier definition, but received an object or function that did not have a modifier manager associated with it. The dynamic invocation was \`{{${ref.debugLabel}}}\`, and the incorrect definition is the value at the path \`${ref.debugLabel}\`, which was: ${(0, _util.debugToString)(hostDefinition)}`);
      }
      var definition = constants.getValue(handle);
      var {
        manager
      } = definition;
      var state = manager.create(owner, constructing, definition.state, args);
      return {
        manager,
        state,
        definition
      };
    });
    var instance = (0, _reference.valueForRef)(instanceRef);
    var tag = null;
    if (instance !== undefined) {
      var operations = vm.fetchValue(_vm2.$t0);
      operations.addModifier(instance);
      tag = instance.manager.getTag(instance.state);
      if (tag !== null) {
        (0, _validator.consumeTag)(tag);
      }
    }
    if (!(0, _reference.isConstRef)(ref) || tag) {
      return vm.updateWith(new UpdateDynamicModifierOpcode(tag, instance, instanceRef));
    }
  });
  class UpdateModifierOpcode {
    constructor(tag, modifier) {
      this.tag = tag;
      this.modifier = modifier;
      this.lastUpdated = (0, _validator.valueForTag)(tag);
    }
    evaluate(vm) {
      var {
        modifier,
        tag,
        lastUpdated
      } = this;
      (0, _validator.consumeTag)(tag);
      if (!(0, _validator.validateTag)(tag, lastUpdated)) {
        vm.env.scheduleUpdateModifier(modifier);
        this.lastUpdated = (0, _validator.valueForTag)(tag);
      }
    }
  }
  class UpdateDynamicModifierOpcode {
    constructor(tag, instance, instanceRef) {
      this.tag = tag;
      this.instance = instance;
      this.instanceRef = instanceRef;
      this.lastUpdated = (0, _validator.valueForTag)(tag !== null && tag !== void 0 ? tag : _validator.CURRENT_TAG);
    }
    evaluate(vm) {
      var {
        tag,
        lastUpdated,
        instance,
        instanceRef
      } = this;
      var newInstance = (0, _reference.valueForRef)(instanceRef);
      if (newInstance !== instance) {
        if (instance !== undefined) {
          var destroyable = instance.manager.getDestroyable(instance.state);
          if (destroyable !== null) {
            (0, _destroyable2.destroy)(destroyable);
          }
        }
        if (newInstance !== undefined) {
          var {
            manager,
            state
          } = newInstance;
          var _destroyable = manager.getDestroyable(state);
          if (_destroyable !== null) {
            (0, _destroyable2.associateDestroyableChild)(this, _destroyable);
          }
          tag = manager.getTag(state);
          if (tag !== null) {
            this.lastUpdated = (0, _validator.valueForTag)(tag);
          }
          this.tag = tag;
          vm.env.scheduleInstallModifier(newInstance);
        }
        this.instance = newInstance;
      } else if (tag !== null && !(0, _validator.validateTag)(tag, lastUpdated)) {
        vm.env.scheduleUpdateModifier(instance);
        this.lastUpdated = (0, _validator.valueForTag)(tag);
      }
      if (tag !== null) {
        (0, _validator.consumeTag)(tag);
      }
    }
  }
  APPEND_OPCODES.add(51
  /* StaticAttr */, (vm, _ref29) => {
    var {
      op1: _name,
      op2: _value,
      op3: _namespace
    } = _ref29;
    var name = vm[CONSTANTS].getValue(_name);
    var value = vm[CONSTANTS].getValue(_value);
    var namespace = _namespace ? vm[CONSTANTS].getValue(_namespace) : null;
    vm.elements().setStaticAttribute(name, value, namespace);
  });
  APPEND_OPCODES.add(52
  /* DynamicAttr */, (vm, _ref30) => {
    var {
      op1: _name,
      op2: _trusting,
      op3: _namespace
    } = _ref30;
    var name = vm[CONSTANTS].getValue(_name);
    var trusting = vm[CONSTANTS].getValue(_trusting);
    var reference = vm.stack.pop();
    var value = (0, _reference.valueForRef)(reference);
    var namespace = _namespace ? vm[CONSTANTS].getValue(_namespace) : null;
    var attribute = vm.elements().setDynamicAttribute(name, value, trusting, namespace);
    if (!(0, _reference.isConstRef)(reference)) {
      vm.updateWith(new UpdateDynamicAttributeOpcode(reference, attribute, vm.env));
    }
  });
  class UpdateDynamicAttributeOpcode {
    constructor(reference, attribute, env) {
      var initialized = false;
      this.updateRef = (0, _reference.createComputeRef)(() => {
        var value = (0, _reference.valueForRef)(reference);
        if (initialized === true) {
          attribute.update(value, env);
        } else {
          initialized = true;
        }
      });
      (0, _reference.valueForRef)(this.updateRef);
    }
    evaluate() {
      (0, _reference.valueForRef)(this.updateRef);
    }
  }
  APPEND_OPCODES.add(78
  /* PushComponentDefinition */, (vm, _ref31) => {
    var {
      op1: handle
    } = _ref31;
    var definition = vm[CONSTANTS].getValue(handle);
    var {
      manager,
      capabilities
    } = definition;
    var instance = {
      definition,
      manager,
      capabilities,
      state: null,
      handle: null,
      table: null,
      lookup: null
    };
    vm.stack.push(instance);
  });
  APPEND_OPCODES.add(80
  /* ResolveDynamicComponent */, (vm, _ref32) => {
    var {
      op1: _isStrict
    } = _ref32;
    var stack = vm.stack;
    var component = (0, _reference.valueForRef)(stack.pop());
    var constants = vm[CONSTANTS];
    var owner = vm.getOwner();
    var isStrict = constants.getValue(_isStrict);
    vm.loadValue(_vm2.$t1, null); // Clear the temp register

    var definition;
    if (typeof component === 'string') {
      if (false /* DEBUG */ && isStrict) {
        throw new Error(`Attempted to resolve a dynamic component with a string definition, \`${component}\` in a strict mode template. In strict mode, using strings to resolve component definitions is prohibited. You can instead import the component definition and use it directly.`);
      }
      var resolvedDefinition = resolveComponent(vm.runtime.resolver, constants, component, owner);
      definition = resolvedDefinition;
    } else if (isCurriedValue(component)) {
      definition = component;
    } else {
      definition = constants.component(component, owner);
    }
    stack.push(definition);
  });
  APPEND_OPCODES.add(81
  /* ResolveCurriedComponent */, vm => {
    var stack = vm.stack;
    var ref = stack.pop();
    var value = (0, _reference.valueForRef)(ref);
    var constants = vm[CONSTANTS];
    var definition;
    if (false /* DEBUG */ && !(typeof value === 'function' || typeof value === 'object' && value !== null)) {
      throw new Error(`Expected a component definition, but received ${value}. You may have accidentally done <${ref.debugLabel}>, where "${ref.debugLabel}" was a string instead of a curried component definition. You must either use the component definition directly, or use the {{component}} helper to create a curried component definition when invoking dynamically.`);
    }
    if (isCurriedValue(value)) {
      definition = value;
    } else {
      definition = constants.component(value, vm.getOwner(), true);
      if (false /* DEBUG */ && definition === null) {
        throw new Error(`Expected a dynamic component definition, but received an object or function that did not have a component manager associated with it. The dynamic invocation was \`<${ref.debugLabel}>\` or \`{{${ref.debugLabel}}}\`, and the incorrect definition is the value at the path \`${ref.debugLabel}\`, which was: ${(0, _util.debugToString)(value)}`);
      }
    }
    stack.push(definition);
  });
  APPEND_OPCODES.add(79
  /* PushDynamicComponentInstance */, vm => {
    var {
      stack
    } = vm;
    var definition = stack.pop();
    var capabilities, manager;
    if (isCurriedValue(definition)) {
      manager = capabilities = null;
    } else {
      manager = definition.manager;
      capabilities = definition.capabilities;
    }
    stack.push({
      definition,
      capabilities,
      manager,
      state: null,
      handle: null,
      table: null
    });
  });
  APPEND_OPCODES.add(82
  /* PushArgs */, (vm, _ref33) => {
    var {
      op1: _names,
      op2: _blockNames,
      op3: flags
    } = _ref33;
    var stack = vm.stack;
    var names = vm[CONSTANTS].getArray(_names);
    var positionalCount = flags >> 4;
    var atNames = flags & 0b1000;
    var blockNames = flags & 0b0111 ? vm[CONSTANTS].getArray(_blockNames) : _util.EMPTY_STRING_ARRAY;
    vm[ARGS].setup(stack, names, blockNames, positionalCount, !!atNames);
    stack.push(vm[ARGS]);
  });
  APPEND_OPCODES.add(83
  /* PushEmptyArgs */, vm => {
    var {
      stack
    } = vm;
    stack.push(vm[ARGS].empty(stack));
  });
  APPEND_OPCODES.add(86
  /* CaptureArgs */, vm => {
    var stack = vm.stack;
    var args = stack.pop();
    var capturedArgs = args.capture();
    stack.push(capturedArgs);
  });
  APPEND_OPCODES.add(85
  /* PrepareArgs */, (vm, _ref34) => {
    var {
      op1: _state
    } = _ref34;
    var stack = vm.stack;
    var instance = vm.fetchValue(_state);
    var args = stack.pop();
    var {
      definition
    } = instance;
    if (isCurriedType(definition, 0
    /* Component */)) {
      var constants = vm[CONSTANTS];
      var {
        definition: resolvedDefinition,
        owner,
        resolved,
        positional,
        named
      } = resolveCurriedValue(definition);
      if (resolved === true) {
        definition = resolvedDefinition;
      } else if (typeof resolvedDefinition === 'string') {
        var resolvedValue = vm.runtime.resolver.lookupComponent(resolvedDefinition, owner);
        definition = constants.resolvedComponent(resolvedValue, resolvedDefinition);
      } else {
        definition = constants.component(resolvedDefinition, owner);
      }
      if (named !== undefined) {
        args.named.merge((0, _util.assign)({}, ...named));
      }
      if (positional !== undefined) {
        args.realloc(positional.length);
        args.positional.prepend(positional);
      }
      var {
        manager: _manager
      } = definition;
      instance.definition = definition;
      instance.manager = _manager;
      instance.capabilities = definition.capabilities; // Save off the owner that this component was curried with. Later on,
      // we'll fetch the value of this register and set it as the owner on the
      // new root scope.

      vm.loadValue(_vm2.$t1, owner);
    }
    var {
      manager,
      state
    } = definition;
    var capabilities = instance.capabilities;
    if (!(0, _manager5.managerHasCapability)(manager, capabilities, 4
    /* PrepareArgs */)) {
      stack.push(args);
      return;
    }
    var blocks = args.blocks.values;
    var blockNames = args.blocks.names;
    var preparedArgs = manager.prepareArgs(state, args);
    if (preparedArgs) {
      args.clear();
      for (var i = 0; i < blocks.length; i++) {
        stack.push(blocks[i]);
      }
      var {
        positional: _positional,
        named: _named
      } = preparedArgs;
      var positionalCount = _positional.length;
      for (var _i = 0; _i < positionalCount; _i++) {
        stack.push(_positional[_i]);
      }
      var names = Object.keys(_named);
      for (var _i2 = 0; _i2 < names.length; _i2++) {
        stack.push(_named[names[_i2]]);
      }
      args.setup(stack, names, blockNames, positionalCount, false);
    }
    stack.push(args);
  });
  APPEND_OPCODES.add(87
  /* CreateComponent */, (vm, _ref35) => {
    var {
      op1: flags,
      op2: _state
    } = _ref35;
    var instance = vm.fetchValue(_state);
    var {
      definition,
      manager,
      capabilities
    } = instance;
    if (!(0, _manager5.managerHasCapability)(manager, capabilities, 512
    /* CreateInstance */)) {
      // TODO: Closure and Main components are always invoked dynamically, so this
      // opcode may run even if this capability is not enabled. In the future we
      // should handle this in a better way.
      return;
    }
    var dynamicScope = null;
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 64
    /* DynamicScope */)) {
      dynamicScope = vm.dynamicScope();
    }
    var hasDefaultBlock = flags & 1;
    var args = null;
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 8
    /* CreateArgs */)) {
      args = vm.stack.peek();
    }
    var self = null;
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 128
    /* CreateCaller */)) {
      self = vm.getSelf();
    }
    var state = manager.create(vm.getOwner(), definition.state, args, vm.env, dynamicScope, self, !!hasDefaultBlock); // We want to reuse the `state` POJO here, because we know that the opcodes
    // only transition at exactly one place.

    instance.state = state;
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 256
    /* UpdateHook */)) {
      vm.updateWith(new UpdateComponentOpcode(state, manager, dynamicScope));
    }
  });
  APPEND_OPCODES.add(88
  /* RegisterComponentDestructor */, (vm, _ref36) => {
    var {
      op1: _state
    } = _ref36;
    var {
      manager,
      state,
      capabilities
    } = vm.fetchValue(_state);
    var d = manager.getDestroyable(state);
    if (false /* DEBUG */ && !(0, _manager5.managerHasCapability)(manager, capabilities, 2048
    /* WillDestroy */) && d !== null && typeof 'willDestroy' in d) {
      throw new Error('BUG: Destructor has willDestroy, but the willDestroy capability was not enabled for this component. Pre-destruction hooks must be explicitly opted into');
    }
    if (d) vm.associateDestroyable(d);
  });
  APPEND_OPCODES.add(97
  /* BeginComponentTransaction */, (vm, _ref37) => {
    var {
      op1: _state
    } = _ref37;
    var _a;
    var name;
    if (false /* DEBUG */) {
      var {
        definition,
        manager
      } = vm.fetchValue(_state);
      name = (_a = definition.resolvedName) !== null && _a !== void 0 ? _a : manager.getDebugName(definition.state);
    }
    vm.beginCacheGroup(name);
    vm.elements().pushSimpleBlock();
  });
  APPEND_OPCODES.add(89
  /* PutComponentOperations */, vm => {
    vm.loadValue(_vm2.$t0, new ComponentElementOperations());
  });
  APPEND_OPCODES.add(53
  /* ComponentAttr */, (vm, _ref38) => {
    var {
      op1: _name,
      op2: _trusting,
      op3: _namespace
    } = _ref38;
    var name = vm[CONSTANTS].getValue(_name);
    var trusting = vm[CONSTANTS].getValue(_trusting);
    var reference = vm.stack.pop();
    var namespace = _namespace ? vm[CONSTANTS].getValue(_namespace) : null;
    vm.fetchValue(_vm2.$t0).setAttribute(name, reference, trusting, namespace);
  });
  APPEND_OPCODES.add(105
  /* StaticComponentAttr */, (vm, _ref39) => {
    var {
      op1: _name,
      op2: _value,
      op3: _namespace
    } = _ref39;
    var name = vm[CONSTANTS].getValue(_name);
    var value = vm[CONSTANTS].getValue(_value);
    var namespace = _namespace ? vm[CONSTANTS].getValue(_namespace) : null;
    vm.fetchValue(_vm2.$t0).setStaticAttribute(name, value, namespace);
  });
  class ComponentElementOperations {
    constructor() {
      this.attributes = (0, _util.dict)();
      this.classes = [];
      this.modifiers = [];
    }
    setAttribute(name, value, trusting, namespace) {
      var deferred = {
        value,
        namespace,
        trusting
      };
      if (name === 'class') {
        this.classes.push(value);
      }
      this.attributes[name] = deferred;
    }
    setStaticAttribute(name, value, namespace) {
      var deferred = {
        value,
        namespace
      };
      if (name === 'class') {
        this.classes.push(value);
      }
      this.attributes[name] = deferred;
    }
    addModifier(modifier) {
      this.modifiers.push(modifier);
    }
    flush(vm) {
      var type;
      var attributes = this.attributes;
      for (var name in this.attributes) {
        if (name === 'type') {
          type = attributes[name];
          continue;
        }
        var attr = this.attributes[name];
        if (name === 'class') {
          setDeferredAttr(vm, 'class', mergeClasses(this.classes), attr.namespace, attr.trusting);
        } else {
          setDeferredAttr(vm, name, attr.value, attr.namespace, attr.trusting);
        }
      }
      if (type !== undefined) {
        setDeferredAttr(vm, 'type', type.value, type.namespace, type.trusting);
      }
      return this.modifiers;
    }
  }
  function mergeClasses(classes) {
    if (classes.length === 0) {
      return '';
    }
    if (classes.length === 1) {
      return classes[0];
    }
    if (allStringClasses(classes)) {
      return classes.join(' ');
    }
    return createClassListRef(classes);
  }
  function allStringClasses(classes) {
    for (var i = 0; i < classes.length; i++) {
      if (typeof classes[i] !== 'string') {
        return false;
      }
    }
    return true;
  }
  function setDeferredAttr(vm, name, value, namespace, trusting) {
    if (trusting === void 0) {
      trusting = false;
    }
    if (typeof value === 'string') {
      vm.elements().setStaticAttribute(name, value, namespace);
    } else {
      var attribute = vm.elements().setDynamicAttribute(name, (0, _reference.valueForRef)(value), trusting, namespace);
      if (!(0, _reference.isConstRef)(value)) {
        vm.updateWith(new UpdateDynamicAttributeOpcode(value, attribute, vm.env));
      }
    }
  }
  APPEND_OPCODES.add(99
  /* DidCreateElement */, (vm, _ref40) => {
    var {
      op1: _state
    } = _ref40;
    var {
      definition,
      state
    } = vm.fetchValue(_state);
    var {
      manager
    } = definition;
    var operations = vm.fetchValue(_vm2.$t0);
    manager.didCreateElement(state, vm.elements().constructing, operations);
  });
  APPEND_OPCODES.add(90
  /* GetComponentSelf */, (vm, _ref41) => {
    var {
      op1: _state,
      op2: _names
    } = _ref41;
    var _a;
    var instance = vm.fetchValue(_state);
    var {
      definition,
      state
    } = instance;
    var {
      manager
    } = definition;
    var selfRef = manager.getSelf(state);
    if (vm.env.debugRenderTree !== undefined) {
      var _instance = vm.fetchValue(_state);
      var {
        definition: _definition,
        manager: _manager2
      } = _instance;
      var args;
      if (vm.stack.peek() === vm[ARGS]) {
        args = vm[ARGS].capture();
      } else {
        var names = vm[CONSTANTS].getArray(_names);
        vm[ARGS].setup(vm.stack, names, [], 0, true);
        args = vm[ARGS].capture();
      }
      var moduleName;
      var compilable = _definition.compilable;
      if (compilable === null) {
        compilable = _manager2.getDynamicLayout(state, vm.runtime.resolver);
        if (compilable !== null) {
          moduleName = compilable.moduleName;
        } else {
          moduleName = '__default__.hbs';
        }
      } else {
        moduleName = compilable.moduleName;
      } // For tearing down the debugRenderTree

      vm.associateDestroyable(_instance);
      if (hasCustomDebugRenderTreeLifecycle(_manager2)) {
        var nodes = _manager2.getDebugCustomRenderTree(_instance.definition.state, _instance.state, args, moduleName);
        nodes.forEach(node => {
          var {
            bucket
          } = node;
          vm.env.debugRenderTree.create(bucket, node);
          (0, _destroyable2.registerDestructor)(_instance, () => {
            var _a;
            (_a = vm.env.debugRenderTree) === null || _a === void 0 ? void 0 : _a.willDestroy(bucket);
          });
          vm.updateWith(new DebugRenderTreeUpdateOpcode(bucket));
        });
      } else {
        var name = (_a = _definition.resolvedName) !== null && _a !== void 0 ? _a : _manager2.getDebugName(_definition.state);
        vm.env.debugRenderTree.create(_instance, {
          type: 'component',
          name,
          args,
          template: moduleName,
          instance: (0, _reference.valueForRef)(selfRef)
        });
        vm.associateDestroyable(_instance);
        (0, _destroyable2.registerDestructor)(_instance, () => {
          var _a;
          (_a = vm.env.debugRenderTree) === null || _a === void 0 ? void 0 : _a.willDestroy(_instance);
        });
        vm.updateWith(new DebugRenderTreeUpdateOpcode(_instance));
      }
    }
    vm.stack.push(selfRef);
  });
  APPEND_OPCODES.add(91
  /* GetComponentTagName */, (vm, _ref42) => {
    var {
      op1: _state
    } = _ref42;
    var {
      definition,
      state
    } = vm.fetchValue(_state);
    var {
      manager
    } = definition;
    var tagName = manager.getTagName(state); // User provided value from JS, so we don't bother to encode

    vm.stack.push(tagName);
  }); // Dynamic Invocation Only

  APPEND_OPCODES.add(92
  /* GetComponentLayout */, (vm, _ref43) => {
    var {
      op1: _state
    } = _ref43;
    var instance = vm.fetchValue(_state);
    var {
      manager,
      definition
    } = instance;
    var {
      stack
    } = vm;
    var {
      compilable
    } = definition;
    if (compilable === null) {
      var {
        capabilities
      } = instance;
      compilable = manager.getDynamicLayout(instance.state, vm.runtime.resolver);
      if (compilable === null) {
        if ((0, _manager5.managerHasCapability)(manager, capabilities, 1024
        /* Wrapped */)) {
          compilable = (0, _util.unwrapTemplate)(vm[CONSTANTS].defaultTemplate).asWrappedLayout();
        } else {
          compilable = (0, _util.unwrapTemplate)(vm[CONSTANTS].defaultTemplate).asLayout();
        }
      }
    }
    var handle = compilable.compile(vm.context);
    stack.push(compilable.symbolTable);
    stack.push(handle);
  });
  APPEND_OPCODES.add(75
  /* Main */, (vm, _ref44) => {
    var {
      op1: register
    } = _ref44;
    var definition = vm.stack.pop();
    var invocation = vm.stack.pop();
    var {
      manager,
      capabilities
    } = definition;
    var state = {
      definition,
      manager,
      capabilities,
      state: null,
      handle: invocation.handle,
      table: invocation.symbolTable,
      lookup: null
    };
    vm.loadValue(register, state);
  });
  APPEND_OPCODES.add(95
  /* PopulateLayout */, (vm, _ref45) => {
    var {
      op1: _state
    } = _ref45;
    var {
      stack
    } = vm; // In DEBUG handles could be ErrHandle objects

    var handle = stack.pop();
    var table = stack.pop();
    var state = vm.fetchValue(_state);
    state.handle = handle;
    state.table = table;
  });
  APPEND_OPCODES.add(38
  /* VirtualRootScope */, (vm, _ref46) => {
    var {
      op1: _state
    } = _ref46;
    var {
      table,
      manager,
      capabilities,
      state
    } = vm.fetchValue(_state);
    var owner;
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 4096
    /* HasSubOwner */)) {
      owner = manager.getOwner(state);
      vm.loadValue(_vm2.$t1, null); // Clear the temp register
    } else {
      // Check the temp register to see if an owner was resolved from currying
      owner = vm.fetchValue(_vm2.$t1);
      if (owner === null) {
        // If an owner wasn't found, default to using the current owner. This
        // will happen for normal dynamic component invocation,
        // e.g. <SomeClassicEmberComponent/>
        owner = vm.getOwner();
      } else {
        // Else the owner was found, so clear the temp register. This will happen
        // if we are loading a curried component, e.g. <@someCurriedComponent/>
        vm.loadValue(_vm2.$t1, null);
      }
    }
    vm.pushRootScope(table.symbols.length + 1, owner);
  });
  APPEND_OPCODES.add(94
  /* SetupForEval */, (vm, _ref47) => {
    var {
      op1: _state
    } = _ref47;
    var state = vm.fetchValue(_state);
    if (state.table.hasEval) {
      var lookup = state.lookup = (0, _util.dict)();
      vm.scope().bindEvalScope(lookup);
    }
  });
  APPEND_OPCODES.add(17
  /* SetNamedVariables */, (vm, _ref48) => {
    var {
      op1: _state
    } = _ref48;
    var state = vm.fetchValue(_state);
    var scope = vm.scope();
    var args = vm.stack.peek();
    var callerNames = args.named.atNames;
    for (var i = callerNames.length - 1; i >= 0; i--) {
      var atName = callerNames[i];
      var symbol$$1 = state.table.symbols.indexOf(callerNames[i]);
      var value = args.named.get(atName, true);
      if (symbol$$1 !== -1) scope.bindSymbol(symbol$$1 + 1, value);
      if (state.lookup) state.lookup[atName] = value;
    }
  });
  function bindBlock(symbolName, blockName, state, blocks, vm) {
    var symbol$$1 = state.table.symbols.indexOf(symbolName);
    var block = blocks.get(blockName);
    if (symbol$$1 !== -1) vm.scope().bindBlock(symbol$$1 + 1, block);
    if (state.lookup) state.lookup[symbolName] = block;
  }
  APPEND_OPCODES.add(18
  /* SetBlocks */, (vm, _ref49) => {
    var {
      op1: _state
    } = _ref49;
    var state = vm.fetchValue(_state);
    var {
      blocks
    } = vm.stack.peek();
    for (var i = 0; i < blocks.names.length; i++) {
      bindBlock(blocks.symbolNames[i], blocks.names[i], state, blocks, vm);
    }
  }); // Dynamic Invocation Only

  APPEND_OPCODES.add(96
  /* InvokeComponentLayout */, (vm, _ref50) => {
    var {
      op1: _state
    } = _ref50;
    var state = vm.fetchValue(_state);
    vm.call(state.handle);
  });
  APPEND_OPCODES.add(100
  /* DidRenderLayout */, (vm, _ref51) => {
    var {
      op1: _state
    } = _ref51;
    var instance = vm.fetchValue(_state);
    var {
      manager,
      state,
      capabilities
    } = instance;
    var bounds = vm.elements().popBlock();
    if (vm.env.debugRenderTree !== undefined) {
      if (hasCustomDebugRenderTreeLifecycle(manager)) {
        var nodes = manager.getDebugCustomRenderTree(instance.definition.state, state, EMPTY_ARGS);
        nodes.reverse().forEach(node => {
          var {
            bucket
          } = node;
          vm.env.debugRenderTree.didRender(bucket, bounds);
          vm.updateWith(new DebugRenderTreeDidRenderOpcode(bucket, bounds));
        });
      } else {
        vm.env.debugRenderTree.didRender(instance, bounds);
        vm.updateWith(new DebugRenderTreeDidRenderOpcode(instance, bounds));
      }
    }
    if ((0, _manager5.managerHasCapability)(manager, capabilities, 512
    /* CreateInstance */)) {
      var mgr = manager;
      mgr.didRenderLayout(state, bounds);
      vm.env.didCreate(instance);
      vm.updateWith(new DidUpdateLayoutOpcode(instance, bounds));
    }
  });
  APPEND_OPCODES.add(98
  /* CommitComponentTransaction */, vm => {
    vm.commitCacheGroup();
  });
  class UpdateComponentOpcode {
    constructor(component, manager, dynamicScope) {
      this.component = component;
      this.manager = manager;
      this.dynamicScope = dynamicScope;
    }
    evaluate(_vm) {
      var {
        component,
        manager,
        dynamicScope
      } = this;
      manager.update(component, dynamicScope);
    }
  }
  class DidUpdateLayoutOpcode {
    constructor(component, bounds) {
      this.component = component;
      this.bounds = bounds;
    }
    evaluate(vm) {
      var {
        component,
        bounds
      } = this;
      var {
        manager,
        state
      } = component;
      manager.didUpdateLayout(state, bounds);
      vm.env.didUpdate(component);
    }
  }
  class DebugRenderTreeUpdateOpcode {
    constructor(bucket) {
      this.bucket = bucket;
    }
    evaluate(vm) {
      var _a;
      (_a = vm.env.debugRenderTree) === null || _a === void 0 ? void 0 : _a.update(this.bucket);
    }
  }
  class DebugRenderTreeDidRenderOpcode {
    constructor(bucket, bounds) {
      this.bucket = bucket;
      this.bounds = bounds;
    }
    evaluate(vm) {
      var _a;
      (_a = vm.env.debugRenderTree) === null || _a === void 0 ? void 0 : _a.didRender(this.bucket, this.bounds);
    }
  }
  class DynamicTextContent {
    constructor(node, reference, lastValue) {
      this.node = node;
      this.reference = reference;
      this.lastValue = lastValue;
    }
    evaluate() {
      var value = (0, _reference.valueForRef)(this.reference);
      var {
        lastValue
      } = this;
      if (value === lastValue) return;
      var normalized;
      if (isEmpty(value)) {
        normalized = '';
      } else if (isString(value)) {
        normalized = value;
      } else {
        normalized = String(value);
      }
      if (normalized !== lastValue) {
        var textNode = this.node;
        textNode.nodeValue = this.lastValue = normalized;
      }
    }
  }
  function toContentType(value) {
    if (shouldCoerce(value)) {
      return 2
      /* String */;
    } else if (isCurriedType(value, 0
    /* Component */) || (0, _manager5.hasInternalComponentManager)(value)) {
      return 0
      /* Component */;
    } else if (isCurriedType(value, 1
    /* Helper */) || (0, _manager5.hasInternalHelperManager)(value)) {
      return 1
      /* Helper */;
    } else if (isSafeString(value)) {
      return 4
      /* SafeString */;
    } else if (isFragment(value)) {
      return 5
      /* Fragment */;
    } else if (isNode(value)) {
      return 6
      /* Node */;
    } else {
      return 2
      /* String */;
    }
  }

  function toDynamicContentType(value) {
    if (!(0, _util.isObject)(value)) {
      return 2
      /* String */;
    }

    if (isCurriedType(value, 0
    /* Component */) || (0, _manager5.hasInternalComponentManager)(value)) {
      return 0
      /* Component */;
    } else {
      if (false /* DEBUG */ && !isCurriedType(value, 1
      /* Helper */) && !(0, _manager5.hasInternalHelperManager)(value)) {
        throw new Error(`Attempted use a dynamic value as a component or helper, but that value did not have an associated component or helper manager. The value was: ${value}`);
      }
      return 1
      /* Helper */;
    }
  }

  APPEND_OPCODES.add(76
  /* ContentType */, vm => {
    var reference = vm.stack.peek();
    vm.stack.push(toContentType((0, _reference.valueForRef)(reference)));
    if (!(0, _reference.isConstRef)(reference)) {
      vm.updateWith(new AssertFilter(reference, toContentType));
    }
  });
  APPEND_OPCODES.add(106
  /* DynamicContentType */, vm => {
    var reference = vm.stack.peek();
    vm.stack.push(toDynamicContentType((0, _reference.valueForRef)(reference)));
    if (!(0, _reference.isConstRef)(reference)) {
      vm.updateWith(new AssertFilter(reference, toDynamicContentType));
    }
  });
  APPEND_OPCODES.add(43
  /* AppendHTML */, vm => {
    var reference = vm.stack.pop();
    var rawValue = (0, _reference.valueForRef)(reference);
    var value = isEmpty(rawValue) ? '' : String(rawValue);
    vm.elements().appendDynamicHTML(value);
  });
  APPEND_OPCODES.add(44
  /* AppendSafeHTML */, vm => {
    var reference = vm.stack.pop();
    var rawValue = (0, _reference.valueForRef)(reference).toHTML();
    var value = isEmpty(rawValue) ? '' : rawValue;
    vm.elements().appendDynamicHTML(value);
  });
  APPEND_OPCODES.add(47
  /* AppendText */, vm => {
    var reference = vm.stack.pop();
    var rawValue = (0, _reference.valueForRef)(reference);
    var value = isEmpty(rawValue) ? '' : String(rawValue);
    var node = vm.elements().appendDynamicText(value);
    if (!(0, _reference.isConstRef)(reference)) {
      vm.updateWith(new DynamicTextContent(node, reference, value));
    }
  });
  APPEND_OPCODES.add(45
  /* AppendDocumentFragment */, vm => {
    var reference = vm.stack.pop();
    var value = (0, _reference.valueForRef)(reference);
    vm.elements().appendDynamicFragment(value);
  });
  APPEND_OPCODES.add(46
  /* AppendNode */, vm => {
    var reference = vm.stack.pop();
    var value = (0, _reference.valueForRef)(reference);
    vm.elements().appendDynamicNode(value);
  });
  function debugCallback(context, get) {
    // eslint-disable-next-line no-console
    console.info('Use `context`, and `get(<path>)` to debug this template.'); // for example...
    // eslint-disable-next-line no-unused-expressions

    context === get('this'); // eslint-disable-next-line no-debugger

    debugger;
  }
  var callback = debugCallback; // For testing purposes

  function setDebuggerCallback(cb) {
    callback = cb;
  }
  function resetDebuggerCallback() {
    callback = debugCallback;
  }
  class ScopeInspector {
    constructor(scope, symbols, evalInfo) {
      this.scope = scope;
      this.locals = (0, _util.dict)();
      for (var i = 0; i < evalInfo.length; i++) {
        var slot = evalInfo[i];
        var name = symbols[slot - 1];
        var ref = scope.getSymbol(slot);
        this.locals[name] = ref;
      }
    }
    get(path) {
      var {
        scope,
        locals
      } = this;
      var parts = path.split('.');
      var [head, ...tail] = path.split('.');
      var evalScope = scope.getEvalScope();
      var ref;
      if (head === 'this') {
        ref = scope.getSelf();
      } else if (locals[head]) {
        ref = locals[head];
      } else if (head.indexOf('@') === 0 && evalScope[head]) {
        ref = evalScope[head];
      } else {
        ref = this.scope.getSelf();
        tail = parts;
      }
      return tail.reduce((r, part) => (0, _reference.childRefFor)(r, part), ref);
    }
  }
  APPEND_OPCODES.add(103
  /* Debugger */, (vm, _ref52) => {
    var {
      op1: _symbols,
      op2: _evalInfo
    } = _ref52;
    var symbols = vm[CONSTANTS].getArray(_symbols);
    var evalInfo = vm[CONSTANTS].getArray((0, _util.decodeHandle)(_evalInfo));
    var inspector = new ScopeInspector(vm.scope(), symbols, evalInfo);
    callback((0, _reference.valueForRef)(vm.getSelf()), path => (0, _reference.valueForRef)(inspector.get(path)));
  });
  APPEND_OPCODES.add(101
  /* InvokePartial */, (vm, _ref53) => {
    var {
      op1: _symbols,
      op2: _evalInfo
    } = _ref53;
    var {
      [CONSTANTS]: constants,
      stack
    } = vm;
    var name = (0, _reference.valueForRef)(stack.pop());
    var outerScope = vm.scope();
    var owner = outerScope.owner;
    var outerSymbols = constants.getArray(_symbols);
    var evalInfo = constants.getArray((0, _util.decodeHandle)(_evalInfo));
    var definition = vm.runtime.resolver.lookupPartial(name, owner);
    var {
      symbolTable,
      handle: vmHandle
    } = definition.getPartial(vm.context);
    {
      var partialSymbols = symbolTable.symbols;
      var partialScope = vm.pushRootScope(partialSymbols.length, owner);
      var evalScope = outerScope.getEvalScope();
      partialScope.bindEvalScope(evalScope);
      partialScope.bindSelf(outerScope.getSelf());
      var locals = Object.create(outerScope.getPartialMap());
      for (var i = 0; i < evalInfo.length; i++) {
        var slot = evalInfo[i];
        if (slot !== -1) {
          var _name2 = outerSymbols[slot - 1];
          var ref = outerScope.getSymbol(slot);
          locals[_name2] = ref;
        }
      }
      if (evalScope) {
        for (var _i3 = 0; _i3 < partialSymbols.length; _i3++) {
          var _name3 = partialSymbols[_i3];
          var symbol$$1 = _i3 + 1;
          var value = evalScope[_name3];
          if (value !== undefined) partialScope.bind(symbol$$1, value);
        }
      }
      partialScope.bindPartialMap(locals);
      vm.pushFrame(); // sp += 2

      vm.call((0, _util.unwrapHandle)(vmHandle));
    }
  });
  APPEND_OPCODES.add(72
  /* EnterList */, (vm, _ref54) => {
    var {
      op1: relativeStart,
      op2: elseTarget
    } = _ref54;
    var stack = vm.stack;
    var listRef = stack.pop();
    var keyRef = stack.pop();
    var keyValue = (0, _reference.valueForRef)(keyRef);
    var key = keyValue === null ? '@identity' : String(keyValue);
    var iteratorRef = (0, _reference.createIteratorRef)(listRef, key);
    var iterator = (0, _reference.valueForRef)(iteratorRef);
    vm.updateWith(new AssertFilter(iteratorRef, iterator => iterator.isEmpty()));
    if (iterator.isEmpty() === true) {
      // TODO: Fix this offset, should be accurate
      vm.goto(elseTarget + 1);
    } else {
      vm.enterList(iteratorRef, relativeStart);
      vm.stack.push(iterator);
    }
  });
  APPEND_OPCODES.add(73
  /* ExitList */, vm => {
    vm.exitList();
  });
  APPEND_OPCODES.add(74
  /* Iterate */, (vm, _ref55) => {
    var {
      op1: breaks
    } = _ref55;
    var stack = vm.stack;
    var iterator = stack.peek();
    var item = iterator.next();
    if (item !== null) {
      vm.registerItem(vm.enterItem(item));
    } else {
      vm.goto(breaks);
    }
  });
  var CAPABILITIES = {
    dynamicLayout: false,
    dynamicTag: false,
    prepareArgs: false,
    createArgs: false,
    attributeHook: false,
    elementHook: false,
    createCaller: false,
    dynamicScope: false,
    updateHook: false,
    createInstance: false,
    wrapped: false,
    willDestroy: false,
    hasSubOwner: false
  };
  class TemplateOnlyComponentManager {
    getCapabilities() {
      return CAPABILITIES;
    }
    getDebugName(_ref56) {
      var {
        name
      } = _ref56;
      return name;
    }
    getSelf() {
      return _reference.NULL_REFERENCE;
    }
    getDestroyable() {
      return null;
    }
  }
  _exports.TemplateOnlyComponentManager = TemplateOnlyComponentManager;
  var TEMPLATE_ONLY_COMPONENT_MANAGER = new TemplateOnlyComponentManager(); // This is only exported for types, don't use this class directly
  _exports.TEMPLATE_ONLY_COMPONENT_MANAGER = TEMPLATE_ONLY_COMPONENT_MANAGER;
  class TemplateOnlyComponentDefinition {
    constructor(moduleName, name) {
      if (moduleName === void 0) {
        moduleName = '@glimmer/component/template-only';
      }
      if (name === void 0) {
        name = '(unknown template-only component)';
      }
      this.moduleName = moduleName;
      this.name = name;
    }
    toString() {
      return this.moduleName;
    }
  }
  _exports.TemplateOnlyComponent = TemplateOnlyComponentDefinition;
  (0, _manager5.setInternalComponentManager)(TEMPLATE_ONLY_COMPONENT_MANAGER, TemplateOnlyComponentDefinition.prototype);
  /**
    This utility function is used to declare a given component has no backing class. When the rendering engine detects this it
    is able to perform a number of optimizations. Templates that are associated with `templateOnly()` will be rendered _as is_
    without adding a wrapping `<div>` (or any of the other element customization behaviors of [@ember/component](/ember/release/classes/Component)).
    Specifically, this means that the template will be rendered as "outer HTML".
  
    In general, this method will be used by build time tooling and would not be directly written in an application. However,
    at times it may be useful to use directly to leverage the "outer HTML" semantics mentioned above. For example, if an addon would like
    to use these semantics for its templates but cannot be certain it will only be consumed by applications that have enabled the
    `template-only-glimmer-components` optional feature.
  
    @example
  
    ```js
    import { templateOnlyComponent } from '@glimmer/runtime';
  
    export default templateOnlyComponent();
    ```
  
    @public
    @method templateOnly
    @param {String} moduleName the module name that the template only component represents, this will be used for debugging purposes
    @category EMBER_GLIMMER_SET_COMPONENT_TEMPLATE
  */

  function templateOnlyComponent(moduleName, name) {
    return new TemplateOnlyComponentDefinition(moduleName, name);
  }

  // http://www.w3.org/TR/html/syntax.html#html-integration-point
  var SVG_INTEGRATION_POINTS = {
    foreignObject: 1,
    desc: 1,
    title: 1
  }; // http://www.w3.org/TR/html/syntax.html#adjust-svg-attributes
  // TODO: Adjust SVG attributes
  // http://www.w3.org/TR/html/syntax.html#parsing-main-inforeign
  // TODO: Adjust SVG elements
  // http://www.w3.org/TR/html/syntax.html#parsing-main-inforeign

  var BLACKLIST_TABLE = Object.create(null);
  class DOMOperations {
    constructor(document) {
      this.document = document;
      this.setupUselessElement();
    } // split into separate method so that NodeDOMTreeConstruction
    // can override it.

    setupUselessElement() {
      this.uselessElement = this.document.createElement('div');
    }
    createElement(tag, context) {
      var isElementInSVGNamespace, isHTMLIntegrationPoint;
      if (context) {
        isElementInSVGNamespace = context.namespaceURI === "http://www.w3.org/2000/svg"
        /* SVG */ || tag === 'svg';
        isHTMLIntegrationPoint = !!SVG_INTEGRATION_POINTS[context.tagName];
      } else {
        isElementInSVGNamespace = tag === 'svg';
        isHTMLIntegrationPoint = false;
      }
      if (isElementInSVGNamespace && !isHTMLIntegrationPoint) {
        // FIXME: This does not properly handle <font> with color, face, or
        // size attributes, which is also disallowed by the spec. We should fix
        // this.
        if (BLACKLIST_TABLE[tag]) {
          throw new Error(`Cannot create a ${tag} inside an SVG context`);
        }
        return this.document.createElementNS("http://www.w3.org/2000/svg"
        /* SVG */, tag);
      } else {
        return this.document.createElement(tag);
      }
    }
    insertBefore(parent, node, reference) {
      parent.insertBefore(node, reference);
    }
    insertHTMLBefore(parent, nextSibling, html) {
      if (html === '') {
        var comment = this.createComment('');
        parent.insertBefore(comment, nextSibling);
        return new ConcreteBounds(parent, comment, comment);
      }
      var prev = nextSibling ? nextSibling.previousSibling : parent.lastChild;
      var last;
      if (nextSibling === null) {
        parent.insertAdjacentHTML("beforeend"
        /* beforeend */, html);
        last = parent.lastChild;
      } else if (nextSibling instanceof HTMLElement) {
        nextSibling.insertAdjacentHTML('beforebegin', html);
        last = nextSibling.previousSibling;
      } else {
        // Non-element nodes do not support insertAdjacentHTML, so add an
        // element and call it on that element. Then remove the element.
        //
        // This also protects Edge, IE and Firefox w/o the inspector open
        // from merging adjacent text nodes. See ./compat/text-node-merging-fix.ts
        var {
          uselessElement
        } = this;
        parent.insertBefore(uselessElement, nextSibling);
        uselessElement.insertAdjacentHTML("beforebegin"
        /* beforebegin */, html);
        last = uselessElement.previousSibling;
        parent.removeChild(uselessElement);
      }
      var first = prev ? prev.nextSibling : parent.firstChild;
      return new ConcreteBounds(parent, first, last);
    }
    createTextNode(text) {
      return this.document.createTextNode(text);
    }
    createComment(data) {
      return this.document.createComment(data);
    }
  }
  function moveNodesBefore(source, target, nextSibling) {
    var first = source.firstChild;
    var last = first;
    var current = first;
    while (current) {
      var next = current.nextSibling;
      target.insertBefore(current, nextSibling);
      last = current;
      current = next;
    }
    return new ConcreteBounds(target, first, last);
  }
  var SVG_NAMESPACE = "http://www.w3.org/2000/svg"
  /* SVG */; // Patch:    insertAdjacentHTML on SVG Fix
  // Browsers: Safari, IE, Edge, Firefox ~33-34
  // Reason:   insertAdjacentHTML does not exist on SVG elements in Safari. It is
  //           present but throws an exception on IE and Edge. Old versions of
  //           Firefox create nodes in the incorrect namespace.
  // Fix:      Since IE and Edge silently fail to create SVG nodes using
  //           innerHTML, and because Firefox may create nodes in the incorrect
  //           namespace using innerHTML on SVG elements, an HTML-string wrapping
  //           approach is used. A pre/post SVG tag is added to the string, then
  //           that whole string is added to a div. The created nodes are plucked
  //           out and applied to the target location on DOM.

  function applySVGInnerHTMLFix(document, DOMClass, svgNamespace) {
    if (!document) return DOMClass;
    if (!shouldApplyFix(document, svgNamespace)) {
      return DOMClass;
    }
    var div = document.createElement('div');
    return class DOMChangesWithSVGInnerHTMLFix extends DOMClass {
      insertHTMLBefore(parent, nextSibling, html) {
        if (html === '') {
          return super.insertHTMLBefore(parent, nextSibling, html);
        }
        if (parent.namespaceURI !== svgNamespace) {
          return super.insertHTMLBefore(parent, nextSibling, html);
        }
        return fixSVG(parent, div, html, nextSibling);
      }
    };
  }
  function fixSVG(parent, div, html, reference) {
    var source; // This is important, because descendants of the <foreignObject> integration
    // point are parsed in the HTML namespace

    if (parent.tagName.toUpperCase() === 'FOREIGNOBJECT') {
      // IE, Edge: also do not correctly support using `innerHTML` on SVG
      // namespaced elements. So here a wrapper is used.
      var wrappedHtml = '<svg><foreignObject>' + html + '</foreignObject></svg>';
      (0, _util.clearElement)(div);
      div.insertAdjacentHTML("afterbegin"
      /* afterbegin */, wrappedHtml);
      source = div.firstChild.firstChild;
    } else {
      // IE, Edge: also do not correctly support using `innerHTML` on SVG
      // namespaced elements. So here a wrapper is used.
      var _wrappedHtml = '<svg>' + html + '</svg>';
      (0, _util.clearElement)(div);
      div.insertAdjacentHTML("afterbegin"
      /* afterbegin */, _wrappedHtml);
      source = div.firstChild;
    }
    return moveNodesBefore(source, parent, reference);
  }
  function shouldApplyFix(document, svgNamespace) {
    var svg = document.createElementNS(svgNamespace, 'svg');
    try {
      svg.insertAdjacentHTML("beforeend"
      /* beforeend */, '<circle></circle>');
    } catch (e) {// IE, Edge: Will throw, insertAdjacentHTML is unsupported on SVG
      // Safari: Will throw, insertAdjacentHTML is not present on SVG
    } finally {
      // FF: Old versions will create a node in the wrong namespace
      if (svg.childNodes.length === 1 && svg.firstChild.namespaceURI === SVG_NAMESPACE) {
        // The test worked as expected, no fix required
        return false;
      }
      return true;
    }
  }

  // Patch:    Adjacent text node merging fix
  // Browsers: IE, Edge, Firefox w/o inspector open
  // Reason:   These browsers will merge adjacent text nodes. For example given
  //           <div>Hello</div> with div.insertAdjacentHTML(' world') browsers
  //           with proper behavior will populate div.childNodes with two items.
  //           These browsers will populate it with one merged node instead.
  // Fix:      Add these nodes to a wrapper element, then iterate the childNodes
  //           of that wrapper and move the nodes to their target location. Note
  //           that potential SVG bugs will have been handled before this fix.
  //           Note that this fix must only apply to the previous text node, as
  //           the base implementation of `insertHTMLBefore` already handles
  //           following text nodes correctly.
  function applyTextNodeMergingFix(document, DOMClass) {
    if (!document) return DOMClass;
    if (!shouldApplyFix$1(document)) {
      return DOMClass;
    }
    return class DOMChangesWithTextNodeMergingFix extends DOMClass {
      constructor(document) {
        super(document);
        this.uselessComment = document.createComment('');
      }
      insertHTMLBefore(parent, nextSibling, html) {
        if (html === '') {
          return super.insertHTMLBefore(parent, nextSibling, html);
        }
        var didSetUselessComment = false;
        var nextPrevious = nextSibling ? nextSibling.previousSibling : parent.lastChild;
        if (nextPrevious && nextPrevious instanceof Text) {
          didSetUselessComment = true;
          parent.insertBefore(this.uselessComment, nextSibling);
        }
        var bounds = super.insertHTMLBefore(parent, nextSibling, html);
        if (didSetUselessComment) {
          parent.removeChild(this.uselessComment);
        }
        return bounds;
      }
    };
  }
  function shouldApplyFix$1(document) {
    var mergingTextDiv = document.createElement('div');
    mergingTextDiv.appendChild(document.createTextNode('first'));
    mergingTextDiv.insertAdjacentHTML("beforeend"
    /* beforeend */, 'second');
    if (mergingTextDiv.childNodes.length === 2) {
      // It worked as expected, no fix required
      return false;
    }
    return true;
  }
  ['b', 'big', 'blockquote', 'body', 'br', 'center', 'code', 'dd', 'div', 'dl', 'dt', 'em', 'embed', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'i', 'img', 'li', 'listing', 'main', 'meta', 'nobr', 'ol', 'p', 'pre', 'ruby', 's', 'small', 'span', 'strong', 'strike', 'sub', 'sup', 'table', 'tt', 'u', 'ul', 'var'].forEach(tag => BLACKLIST_TABLE[tag] = 1);
  var WHITESPACE = /[\t-\r \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/;
  var doc = typeof document === 'undefined' ? null : document;
  function isWhitespace(string) {
    return WHITESPACE.test(string);
  }
  var DOM;
  (function (DOM) {
    class TreeConstruction extends DOMOperations {
      createElementNS(namespace, tag) {
        return this.document.createElementNS(namespace, tag);
      }
      setAttribute(element, name, value, namespace) {
        if (namespace === void 0) {
          namespace = null;
        }
        if (namespace) {
          element.setAttributeNS(namespace, name, value);
        } else {
          element.setAttribute(name, value);
        }
      }
    }
    DOM.TreeConstruction = TreeConstruction;
    var appliedTreeConstruction = TreeConstruction;
    appliedTreeConstruction = applyTextNodeMergingFix(doc, appliedTreeConstruction);
    appliedTreeConstruction = applySVGInnerHTMLFix(doc, appliedTreeConstruction, "http://www.w3.org/2000/svg"
    /* SVG */);

    DOM.DOMTreeConstruction = appliedTreeConstruction;
  })(DOM || (DOM = {}));
  class DOMChangesImpl extends DOMOperations {
    constructor(document) {
      super(document);
      this.document = document;
      this.namespace = null;
    }
    setAttribute(element, name, value) {
      element.setAttribute(name, value);
    }
    removeAttribute(element, name) {
      element.removeAttribute(name);
    }
    insertAfter(element, node, reference) {
      this.insertBefore(element, node, reference.nextSibling);
    }
  }
  _exports.IDOMChanges = DOMChangesImpl;
  var helper = DOMChangesImpl;
  helper = applyTextNodeMergingFix(doc, helper);
  helper = applySVGInnerHTMLFix(doc, helper, "http://www.w3.org/2000/svg"
  /* SVG */);

  var helper$1 = helper;
  _exports.DOMChanges = helper$1;
  var DOMTreeConstruction = DOM.DOMTreeConstruction;
  _exports.DOMTreeConstruction = DOMTreeConstruction;
  var GUID = 0;
  class Ref {
    constructor(value) {
      this.id = GUID++;
      this.value = value;
    }
    get() {
      return this.value;
    }
    release() {
      if (false /* DEBUG */ && this.value === null) {
        throw new Error('BUG: double release?');
      }
      this.value = null;
    }
    toString() {
      var label = `Ref ${this.id}`;
      if (this.value === null) {
        return `${label} (released)`;
      } else {
        try {
          return `${label}: ${this.value}`;
        } catch (_a) {
          return label;
        }
      }
    }
  }
  class DebugRenderTreeImpl {
    constructor() {
      this.stack = new _util.Stack();
      this.refs = new WeakMap();
      this.roots = new Set();
      this.nodes = new WeakMap();
    }
    begin() {
      this.reset();
    }
    create(state, node) {
      var internalNode = (0, _util.assign)({}, node, {
        bounds: null,
        refs: new Set()
      });
      this.nodes.set(state, internalNode);
      this.appendChild(internalNode, state);
      this.enter(state);
    }
    update(state) {
      this.enter(state);
    }
    didRender(state, bounds) {
      if (false /* DEBUG */ && this.stack.current !== state) {
        throw new Error(`BUG: expecting ${this.stack.current}, got ${state}`);
      }
      this.nodeFor(state).bounds = bounds;
      this.exit();
    }
    willDestroy(state) {
      this.refs.get(state).release();
    }
    commit() {
      this.reset();
    }
    capture() {
      return this.captureRefs(this.roots);
    }
    reset() {
      if (this.stack.size !== 0) {
        // We probably encountered an error during the rendering loop. This will
        // likely trigger undefined behavior and memory leaks as the error left
        // things in an inconsistent state. It is recommended that the user
        // refresh the page.
        // TODO: We could warn here? But this happens all the time in our tests?
        // Clean up the root reference to prevent errors from happening if we
        // attempt to capture the render tree (Ember Inspector may do this)
        var root = this.stack.toArray()[0];
        var ref = this.refs.get(root);
        if (ref !== undefined) {
          this.roots.delete(ref);
        }
        while (!this.stack.isEmpty()) {
          this.stack.pop();
        }
      }
    }
    enter(state) {
      this.stack.push(state);
    }
    exit() {
      if (false /* DEBUG */ && this.stack.size === 0) {
        throw new Error('BUG: unbalanced pop');
      }
      this.stack.pop();
    }
    nodeFor(state) {
      return this.nodes.get(state);
    }
    appendChild(node, state) {
      if (false /* DEBUG */ && this.refs.has(state)) {
        throw new Error('BUG: child already appended');
      }
      var parent = this.stack.current;
      var ref = new Ref(state);
      this.refs.set(state, ref);
      if (parent) {
        var parentNode = this.nodeFor(parent);
        parentNode.refs.add(ref);
        node.parent = parentNode;
      } else {
        this.roots.add(ref);
      }
    }
    captureRefs(refs) {
      var captured = [];
      refs.forEach(ref => {
        var state = ref.get();
        if (state) {
          captured.push(this.captureNode(`render-node:${ref.id}`, state));
        } else {
          refs.delete(ref);
        }
      });
      return captured;
    }
    captureNode(id, state) {
      var node = this.nodeFor(state);
      var {
        type,
        name,
        args,
        instance,
        refs
      } = node;
      var template = this.captureTemplate(node);
      var bounds = this.captureBounds(node);
      var children = this.captureRefs(refs);
      return {
        id,
        type,
        name,
        args: reifyArgs(args),
        instance,
        template,
        bounds,
        children
      };
    }
    captureTemplate(_ref57) {
      var {
        template
      } = _ref57;
      return template || null;
    }
    captureBounds(node) {
      var bounds = node.bounds;
      var parentElement = bounds.parentElement();
      var firstNode = bounds.firstNode();
      var lastNode = bounds.lastNode();
      return {
        parentElement,
        firstNode,
        lastNode
      };
    }
  }
  var _a$1;
  var TRANSACTION = (0, _util.symbol)('TRANSACTION');
  class TransactionImpl {
    constructor() {
      this.scheduledInstallModifiers = [];
      this.scheduledUpdateModifiers = [];
      this.createdComponents = [];
      this.updatedComponents = [];
    }
    didCreate(component) {
      this.createdComponents.push(component);
    }
    didUpdate(component) {
      this.updatedComponents.push(component);
    }
    scheduleInstallModifier(modifier) {
      this.scheduledInstallModifiers.push(modifier);
    }
    scheduleUpdateModifier(modifier) {
      this.scheduledUpdateModifiers.push(modifier);
    }
    commit() {
      var {
        createdComponents,
        updatedComponents
      } = this;
      for (var i = 0; i < createdComponents.length; i++) {
        var {
          manager: _manager3,
          state: _state2
        } = createdComponents[i];
        _manager3.didCreate(_state2);
      }
      for (var _i4 = 0; _i4 < updatedComponents.length; _i4++) {
        var {
          manager: _manager4,
          state: _state3
        } = updatedComponents[_i4];
        _manager4.didUpdate(_state3);
      }
      var {
        scheduledInstallModifiers,
        scheduledUpdateModifiers
      } = this; // Prevent a transpilation issue we guard against in Ember, the
      // throw-if-closure-required issue

      var manager, state;
      for (var _i5 = 0; _i5 < scheduledInstallModifiers.length; _i5++) {
        var modifier = scheduledInstallModifiers[_i5];
        manager = modifier.manager;
        state = modifier.state;
        var modifierTag = manager.getTag(state);
        if (modifierTag !== null) {
          var tag = (0, _validator.track)(
          // eslint-disable-next-line no-loop-func
          () => manager.install(state), false /* DEBUG */ && `- While rendering:\n  (instance of a \`${modifier.definition.resolvedName || manager.getDebugName(modifier.definition.state)}\` modifier)`);
          (0, _validator.updateTag)(modifierTag, tag);
        } else {
          manager.install(state);
        }
      }
      for (var _i6 = 0; _i6 < scheduledUpdateModifiers.length; _i6++) {
        var _modifier = scheduledUpdateModifiers[_i6];
        manager = _modifier.manager;
        state = _modifier.state;
        var _modifierTag = manager.getTag(state);
        if (_modifierTag !== null) {
          var _tag = (0, _validator.track)(
          // eslint-disable-next-line no-loop-func
          () => manager.update(state), false /* DEBUG */ && `- While rendering:\n  (instance of a \`${_modifier.definition.resolvedName || manager.getDebugName(_modifier.definition.state)}\` modifier)`);
          (0, _validator.updateTag)(_modifierTag, _tag);
        } else {
          manager.update(state);
        }
      }
    }
  }
  class EnvironmentImpl {
    constructor(options, delegate) {
      this.delegate = delegate;
      this[_a$1] = null; // Delegate methods and values

      this.isInteractive = this.delegate.isInteractive;
      this.debugRenderTree = this.delegate.enableDebugTooling ? new DebugRenderTreeImpl() : undefined;
      if (options.appendOperations) {
        this.appendOperations = options.appendOperations;
        this.updateOperations = options.updateOperations;
      } else if (options.document) {
        this.appendOperations = new DOMTreeConstruction(options.document);
        this.updateOperations = new DOMChangesImpl(options.document);
      } else if (false /* DEBUG */) {
        throw new Error('you must pass document or appendOperations to a new runtime');
      }
    }
    getAppendOperations() {
      return this.appendOperations;
    }
    getDOM() {
      return this.updateOperations;
    }
    begin() {
      var _b;
      (_b = this.debugRenderTree) === null || _b === void 0 ? void 0 : _b.begin();
      this[TRANSACTION] = new TransactionImpl();
    }
    get transaction() {
      return this[TRANSACTION];
    }
    didCreate(component) {
      this.transaction.didCreate(component);
    }
    didUpdate(component) {
      this.transaction.didUpdate(component);
    }
    scheduleInstallModifier(modifier) {
      if (this.isInteractive) {
        this.transaction.scheduleInstallModifier(modifier);
      }
    }
    scheduleUpdateModifier(modifier) {
      if (this.isInteractive) {
        this.transaction.scheduleUpdateModifier(modifier);
      }
    }
    commit() {
      var _b;
      var transaction = this.transaction;
      this[TRANSACTION] = null;
      transaction.commit();
      (_b = this.debugRenderTree) === null || _b === void 0 ? void 0 : _b.commit();
      this.delegate.onTransactionCommit();
    }
  }
  _exports.EnvironmentImpl = EnvironmentImpl;
  _a$1 = TRANSACTION;
  function runtimeContext(options, delegate, artifacts, resolver) {
    return {
      env: new EnvironmentImpl(options, delegate),
      program: new _program.RuntimeProgramImpl(artifacts.constants, artifacts.heap),
      resolver: resolver
    };
  }
  function inTransaction(env, cb) {
    if (!env[TRANSACTION]) {
      env.begin();
      try {
        cb();
      } finally {
        env.commit();
      }
    } else {
      cb();
    }
  }
  function initializeRegistersWithSP(sp) {
    return [0, -1, sp, 0];
  }
  class LowLevelVM {
    constructor(stack, heap, program, externs, registers) {
      this.stack = stack;
      this.heap = heap;
      this.program = program;
      this.externs = externs;
      this.registers = registers;
      this.currentOpSize = 0;
    }
    fetchRegister(register) {
      return this.registers[register];
    }
    loadRegister(register, value) {
      this.registers[register] = value;
    }
    setPc(pc) {
      this.registers[_vm2.$pc] = pc;
    } // Start a new frame and save $ra and $fp on the stack

    pushFrame() {
      this.stack.push(this.registers[_vm2.$ra]);
      this.stack.push(this.registers[_vm2.$fp]);
      this.registers[_vm2.$fp] = this.registers[_vm2.$sp] - 1;
    } // Restore $ra, $sp and $fp

    popFrame() {
      this.registers[_vm2.$sp] = this.registers[_vm2.$fp] - 1;
      this.registers[_vm2.$ra] = this.stack.get(0);
      this.registers[_vm2.$fp] = this.stack.get(1);
    }
    pushSmallFrame() {
      this.stack.push(this.registers[_vm2.$ra]);
    }
    popSmallFrame() {
      this.registers[_vm2.$ra] = this.stack.pop();
    } // Jump to an address in `program`

    goto(offset) {
      this.setPc(this.target(offset));
    }
    target(offset) {
      return this.registers[_vm2.$pc] + offset - this.currentOpSize;
    } // Save $pc into $ra, then jump to a new address in `program` (jal in MIPS)

    call(handle) {
      this.registers[_vm2.$ra] = this.registers[_vm2.$pc];
      this.setPc(this.heap.getaddr(handle));
    } // Put a specific `program` address in $ra

    returnTo(offset) {
      this.registers[_vm2.$ra] = this.target(offset);
    } // Return to the `program` address stored in $ra

    return() {
      this.setPc(this.registers[_vm2.$ra]);
    }
    nextStatement() {
      var {
        registers,
        program
      } = this;
      var pc = registers[_vm2.$pc];
      if (pc === -1) {
        return null;
      } // We have to save off the current operations size so that
      // when we do a jump we can calculate the correct offset
      // to where we are going. We can't simply ask for the size
      // in a jump because we have have already incremented the
      // program counter to the next instruction prior to executing.

      var opcode = program.opcode(pc);
      var operationSize = this.currentOpSize = opcode.size;
      this.registers[_vm2.$pc] += operationSize;
      return opcode;
    }
    evaluateOuter(opcode, vm) {
      {
        this.evaluateInner(opcode, vm);
      }
    }
    evaluateInner(opcode, vm) {
      if (opcode.isMachine) {
        this.evaluateMachine(opcode);
      } else {
        this.evaluateSyscall(opcode, vm);
      }
    }
    evaluateMachine(opcode) {
      switch (opcode.type) {
        case 0
        /* PushFrame */:
          return this.pushFrame();
        case 1
        /* PopFrame */:
          return this.popFrame();
        case 3
        /* InvokeStatic */:
          return this.call(opcode.op1);
        case 2
        /* InvokeVirtual */:
          return this.call(this.stack.pop());
        case 4
        /* Jump */:
          return this.goto(opcode.op1);
        case 5
        /* Return */:
          return this.return();
        case 6
        /* ReturnTo */:
          return this.returnTo(opcode.op1);
      }
    }
    evaluateSyscall(opcode, vm) {
      APPEND_OPCODES.evaluate(vm, opcode, opcode.type);
    }
  }
  class UpdatingVMImpl {
    constructor(env, _ref58) {
      var {
        alwaysRevalidate = false
      } = _ref58;
      this.frameStack = new _util.Stack();
      this.env = env;
      this.dom = env.getDOM();
      this.alwaysRevalidate = alwaysRevalidate;
    }
    execute(opcodes, handler) {
      if (false /* DEBUG */) {
        var hasErrored = true;
        try {
          (0, _validator.runInTrackingTransaction)(() => this._execute(opcodes, handler), '- While rendering:'); // using a boolean here to avoid breaking ergonomics of "pause on uncaught exceptions"
          // which would happen with a `catch` + `throw`

          hasErrored = false;
        } finally {
          if (hasErrored) {
            // eslint-disable-next-line no-console
            console.error(`\n\nError occurred:\n\n${(0, _validator.resetTracking)()}\n\n`);
          }
        }
      } else {
        this._execute(opcodes, handler);
      }
    }
    _execute(opcodes, handler) {
      var {
        frameStack
      } = this;
      this.try(opcodes, handler);
      while (true) {
        if (frameStack.isEmpty()) break;
        var opcode = this.frame.nextStatement();
        if (opcode === undefined) {
          frameStack.pop();
          continue;
        }
        opcode.evaluate(this);
      }
    }
    get frame() {
      return this.frameStack.current;
    }
    goto(index) {
      this.frame.goto(index);
    }
    try(ops, handler) {
      this.frameStack.push(new UpdatingVMFrame(ops, handler));
    }
    throw() {
      this.frame.handleException();
      this.frameStack.pop();
    }
  }
  _exports.UpdatingVM = UpdatingVMImpl;
  class ResumableVMStateImpl {
    constructor(state, resumeCallback) {
      this.state = state;
      this.resumeCallback = resumeCallback;
    }
    resume(runtime, builder) {
      return this.resumeCallback(runtime, this.state, builder);
    }
  }
  class BlockOpcode {
    constructor(state, runtime, bounds, children) {
      this.state = state;
      this.runtime = runtime;
      this.children = children;
      this.bounds = bounds;
    }
    parentElement() {
      return this.bounds.parentElement();
    }
    firstNode() {
      return this.bounds.firstNode();
    }
    lastNode() {
      return this.bounds.lastNode();
    }
    evaluate(vm) {
      vm.try(this.children, null);
    }
  }
  class TryOpcode extends BlockOpcode {
    constructor() {
      super(...arguments);
      this.type = 'try';
    }
    evaluate(vm) {
      vm.try(this.children, this);
    }
    handleException() {
      var {
        state,
        bounds,
        runtime
      } = this;
      (0, _destroyable2.destroyChildren)(this);
      var elementStack = NewElementBuilder.resume(runtime.env, bounds);
      var vm = state.resume(runtime, elementStack);
      var updating = [];
      var children = this.children = [];
      var result = vm.execute(vm => {
        vm.pushUpdating(updating);
        vm.updateWith(this);
        vm.pushUpdating(children);
      });
      (0, _destroyable2.associateDestroyableChild)(this, result.drop);
    }
  }
  class ListItemOpcode extends TryOpcode {
    constructor(state, runtime, bounds, key, memo, value) {
      super(state, runtime, bounds, []);
      this.key = key;
      this.memo = memo;
      this.value = value;
      this.retained = false;
      this.index = -1;
    }
    updateReferences(item) {
      this.retained = true;
      (0, _reference.updateRef)(this.value, item.value);
      (0, _reference.updateRef)(this.memo, item.memo);
    }
    shouldRemove() {
      return !this.retained;
    }
    reset() {
      this.retained = false;
    }
  }
  class ListBlockOpcode extends BlockOpcode {
    constructor(state, runtime, bounds, children, iterableRef) {
      super(state, runtime, bounds, children);
      this.iterableRef = iterableRef;
      this.type = 'list-block';
      this.opcodeMap = new Map();
      this.marker = null;
      this.lastIterator = (0, _reference.valueForRef)(iterableRef);
    }
    initializeChild(opcode) {
      opcode.index = this.children.length - 1;
      this.opcodeMap.set(opcode.key, opcode);
    }
    evaluate(vm) {
      var iterator = (0, _reference.valueForRef)(this.iterableRef);
      if (this.lastIterator !== iterator) {
        var {
          bounds
        } = this;
        var {
          dom
        } = vm;
        var marker = this.marker = dom.createComment('');
        dom.insertAfter(bounds.parentElement(), marker, bounds.lastNode());
        this.sync(iterator);
        this.parentElement().removeChild(marker);
        this.marker = null;
        this.lastIterator = iterator;
      } // Run now-updated updating opcodes

      super.evaluate(vm);
    }
    sync(iterator) {
      var {
        opcodeMap: itemMap,
        children
      } = this;
      var currentOpcodeIndex = 0;
      var seenIndex = 0;
      this.children = this.bounds.boundList = [];
      while (true) {
        var item = iterator.next();
        if (item === null) break;
        var opcode = children[currentOpcodeIndex];
        var {
          key
        } = item; // Items that have already been found and moved will already be retained,
        // we can continue until we find the next unretained item

        while (opcode !== undefined && opcode.retained === true) {
          opcode = children[++currentOpcodeIndex];
        }
        if (opcode !== undefined && opcode.key === key) {
          this.retainItem(opcode, item);
          currentOpcodeIndex++;
        } else if (itemMap.has(key)) {
          var itemOpcode = itemMap.get(key); // The item opcode was seen already, so we should move it.

          if (itemOpcode.index < seenIndex) {
            this.moveItem(itemOpcode, item, opcode);
          } else {
            // Update the seen index, we are going to be moving this item around
            // so any other items that come before it will likely need to move as
            // well.
            seenIndex = itemOpcode.index;
            var seenUnretained = false; // iterate through all of the opcodes between the current position and
            // the position of the item's opcode, and determine if they are all
            // retained.

            for (var i = currentOpcodeIndex + 1; i < seenIndex; i++) {
              if (children[i].retained === false) {
                seenUnretained = true;
                break;
              }
            } // If we have seen only retained opcodes between this and the matching
            // opcode, it means that all the opcodes in between have been moved
            // already, and we can safely retain this item's opcode.

            if (seenUnretained === false) {
              this.retainItem(itemOpcode, item);
              currentOpcodeIndex = seenIndex + 1;
            } else {
              this.moveItem(itemOpcode, item, opcode);
              currentOpcodeIndex++;
            }
          }
        } else {
          this.insertItem(item, opcode);
        }
      }
      for (var _i7 = 0; _i7 < children.length; _i7++) {
        var _opcode = children[_i7];
        if (_opcode.retained === false) {
          this.deleteItem(_opcode);
        } else {
          _opcode.reset();
        }
      }
    }
    retainItem(opcode, item) {
      var {
        children
      } = this;
      (0, _reference.updateRef)(opcode.memo, item.memo);
      (0, _reference.updateRef)(opcode.value, item.value);
      opcode.retained = true;
      opcode.index = children.length;
      children.push(opcode);
    }
    insertItem(item, before) {
      var {
        opcodeMap,
        bounds,
        state,
        runtime,
        children
      } = this;
      var {
        key
      } = item;
      var nextSibling = before === undefined ? this.marker : before.firstNode();
      var elementStack = NewElementBuilder.forInitialRender(runtime.env, {
        element: bounds.parentElement(),
        nextSibling
      });
      var vm = state.resume(runtime, elementStack);
      vm.execute(vm => {
        vm.pushUpdating();
        var opcode = vm.enterItem(item);
        opcode.index = children.length;
        children.push(opcode);
        opcodeMap.set(key, opcode);
        (0, _destroyable2.associateDestroyableChild)(this, opcode);
      });
    }
    moveItem(opcode, item, before) {
      var {
        children
      } = this;
      (0, _reference.updateRef)(opcode.memo, item.memo);
      (0, _reference.updateRef)(opcode.value, item.value);
      opcode.retained = true;
      var currentSibling, nextSibling;
      if (before === undefined) {
        move(opcode, this.marker);
      } else {
        currentSibling = opcode.lastNode().nextSibling;
        nextSibling = before.firstNode(); // Items are moved throughout the algorithm, so there are cases where the
        // the items already happen to be siblings (e.g. an item in between was
        // moved before this move happened). Check to see if they are siblings
        // first before doing the move.

        if (currentSibling !== nextSibling) {
          move(opcode, nextSibling);
        }
      }
      opcode.index = children.length;
      children.push(opcode);
    }
    deleteItem(opcode) {
      (0, _destroyable2.destroy)(opcode);
      clear(opcode);
      this.opcodeMap.delete(opcode.key);
    }
  }
  class UpdatingVMFrame {
    constructor(ops, exceptionHandler) {
      this.ops = ops;
      this.exceptionHandler = exceptionHandler;
      this.current = 0;
    }
    goto(index) {
      this.current = index;
    }
    nextStatement() {
      return this.ops[this.current++];
    }
    handleException() {
      if (this.exceptionHandler) {
        this.exceptionHandler.handleException();
      }
    }
  }
  class RenderResultImpl {
    constructor(env, updating, bounds, drop) {
      this.env = env;
      this.updating = updating;
      this.bounds = bounds;
      this.drop = drop;
      (0, _destroyable2.associateDestroyableChild)(this, drop);
      (0, _destroyable2.registerDestructor)(this, () => clear(this.bounds));
    }
    rerender(_temp) {
      var {
        alwaysRevalidate = false
      } = _temp === void 0 ? {
        alwaysRevalidate: false
      } : _temp;
      var {
        env,
        updating
      } = this;
      var vm = new UpdatingVMImpl(env, {
        alwaysRevalidate
      });
      vm.execute(updating, this);
    }
    parentElement() {
      return this.bounds.parentElement();
    }
    firstNode() {
      return this.bounds.firstNode();
    }
    lastNode() {
      return this.bounds.lastNode();
    }
    handleException() {
      throw 'this should never happen';
    }
  }
  class EvaluationStackImpl {
    // fp -> sp
    constructor(stack, registers) {
      if (stack === void 0) {
        stack = [];
      }
      this.stack = stack;
      this[REGISTERS] = registers;
    }
    static restore(snapshot) {
      return new this(snapshot.slice(), initializeRegistersWithSP(snapshot.length - 1));
    }
    push(value) {
      this.stack[++this[REGISTERS][_vm2.$sp]] = value;
    }
    dup(position) {
      if (position === void 0) {
        position = this[REGISTERS][_vm2.$sp];
      }
      this.stack[++this[REGISTERS][_vm2.$sp]] = this.stack[position];
    }
    copy(from, to) {
      this.stack[to] = this.stack[from];
    }
    pop(n) {
      if (n === void 0) {
        n = 1;
      }
      var top = this.stack[this[REGISTERS][_vm2.$sp]];
      this[REGISTERS][_vm2.$sp] -= n;
      return top;
    }
    peek(offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return this.stack[this[REGISTERS][_vm2.$sp] - offset];
    }
    get(offset, base) {
      if (base === void 0) {
        base = this[REGISTERS][_vm2.$fp];
      }
      return this.stack[base + offset];
    }
    set(value, offset, base) {
      if (base === void 0) {
        base = this[REGISTERS][_vm2.$fp];
      }
      this.stack[base + offset] = value;
    }
    slice(start, end) {
      return this.stack.slice(start, end);
    }
    capture(items) {
      var end = this[REGISTERS][_vm2.$sp] + 1;
      var start = end - items;
      return this.stack.slice(start, end);
    }
    reset() {
      this.stack.length = 0;
    }
    toArray() {
      return this.stack.slice(this[REGISTERS][_vm2.$fp], this[REGISTERS][_vm2.$sp] + 1);
    }
  }
  var _a$2, _b;
  class Stacks {
    constructor() {
      this.scope = new _util.Stack();
      this.dynamicScope = new _util.Stack();
      this.updating = new _util.Stack();
      this.cache = new _util.Stack();
      this.list = new _util.Stack();
    }
  }
  class VM {
    /**
     * End of migrated.
     */
    constructor(runtime, _ref59, elementStack, context) {
      var {
        pc,
        scope,
        dynamicScope,
        stack
      } = _ref59;
      this.runtime = runtime;
      this.elementStack = elementStack;
      this.context = context;
      this[_a$2] = new Stacks();
      this[_b] = new _util.Stack();
      this.s0 = null;
      this.s1 = null;
      this.t0 = null;
      this.t1 = null;
      this.v0 = null;
      this.resume = initVM(this.context);
      if (false /* DEBUG */) {
        (0, _globalContext.assertGlobalContextWasSet)();
      }
      var evalStack = EvaluationStackImpl.restore(stack);
      evalStack[REGISTERS][_vm2.$pc] = pc;
      evalStack[REGISTERS][_vm2.$sp] = stack.length - 1;
      evalStack[REGISTERS][_vm2.$fp] = -1;
      this[HEAP] = this.program.heap;
      this[CONSTANTS] = this.program.constants;
      this.elementStack = elementStack;
      this[STACKS].scope.push(scope);
      this[STACKS].dynamicScope.push(dynamicScope);
      this[ARGS] = new VMArgumentsImpl();
      this[INNER_VM] = new LowLevelVM(evalStack, this[HEAP], runtime.program, {
        debugBefore: opcode => {
          return APPEND_OPCODES.debugBefore(this, opcode);
        },
        debugAfter: state => {
          APPEND_OPCODES.debugAfter(this, state);
        }
      }, evalStack[REGISTERS]);
      this.destructor = {};
      this[DESTROYABLE_STACK].push(this.destructor);
    }
    get stack() {
      return this[INNER_VM].stack;
    }
    /* Registers */

    get pc() {
      return this[INNER_VM].fetchRegister(_vm2.$pc);
    } // Fetch a value from a register onto the stack

    fetch(register) {
      var value = this.fetchValue(register);
      this.stack.push(value);
    } // Load a value from the stack into a register

    load(register) {
      var value = this.stack.pop();
      this.loadValue(register, value);
    }
    fetchValue(register) {
      if ((0, _vm2.isLowLevelRegister)(register)) {
        return this[INNER_VM].fetchRegister(register);
      }
      switch (register) {
        case _vm2.$s0:
          return this.s0;
        case _vm2.$s1:
          return this.s1;
        case _vm2.$t0:
          return this.t0;
        case _vm2.$t1:
          return this.t1;
        case _vm2.$v0:
          return this.v0;
      }
    } // Load a value into a register

    loadValue(register, value) {
      if ((0, _vm2.isLowLevelRegister)(register)) {
        this[INNER_VM].loadRegister(register, value);
      }
      switch (register) {
        case _vm2.$s0:
          this.s0 = value;
          break;
        case _vm2.$s1:
          this.s1 = value;
          break;
        case _vm2.$t0:
          this.t0 = value;
          break;
        case _vm2.$t1:
          this.t1 = value;
          break;
        case _vm2.$v0:
          this.v0 = value;
          break;
      }
    }
    /**
     * Migrated to Inner
     */
    // Start a new frame and save $ra and $fp on the stack

    pushFrame() {
      this[INNER_VM].pushFrame();
    } // Restore $ra, $sp and $fp

    popFrame() {
      this[INNER_VM].popFrame();
    } // Jump to an address in `program`

    goto(offset) {
      this[INNER_VM].goto(offset);
    } // Save $pc into $ra, then jump to a new address in `program` (jal in MIPS)

    call(handle) {
      this[INNER_VM].call(handle);
    } // Put a specific `program` address in $ra

    returnTo(offset) {
      this[INNER_VM].returnTo(offset);
    } // Return to the `program` address stored in $ra

    return() {
      this[INNER_VM].return();
    }
    static initial(runtime, context, _ref60) {
      var {
        handle,
        self,
        dynamicScope,
        treeBuilder,
        numSymbols,
        owner
      } = _ref60;
      var scope = PartialScopeImpl.root(self, numSymbols, owner);
      var state = vmState(runtime.program.heap.getaddr(handle), scope, dynamicScope);
      var vm = initVM(context)(runtime, state, treeBuilder);
      vm.pushUpdating();
      return vm;
    }
    static empty(runtime, _ref61, context) {
      var {
        handle,
        treeBuilder,
        dynamicScope,
        owner
      } = _ref61;
      var vm = initVM(context)(runtime, vmState(runtime.program.heap.getaddr(handle), PartialScopeImpl.root(_reference.UNDEFINED_REFERENCE, 0, owner), dynamicScope), treeBuilder);
      vm.pushUpdating();
      return vm;
    }
    compile(block) {
      var handle = (0, _util.unwrapHandle)(block.compile(this.context));
      return handle;
    }
    get program() {
      return this.runtime.program;
    }
    get env() {
      return this.runtime.env;
    }
    captureState(args, pc) {
      if (pc === void 0) {
        pc = this[INNER_VM].fetchRegister(_vm2.$pc);
      }
      return {
        pc,
        scope: this.scope(),
        dynamicScope: this.dynamicScope(),
        stack: this.stack.capture(args)
      };
    }
    capture(args, pc) {
      if (pc === void 0) {
        pc = this[INNER_VM].fetchRegister(_vm2.$pc);
      }
      return new ResumableVMStateImpl(this.captureState(args, pc), this.resume);
    }
    beginCacheGroup(name) {
      var opcodes = this.updating();
      var guard = new JumpIfNotModifiedOpcode();
      opcodes.push(guard);
      opcodes.push(new BeginTrackFrameOpcode(name));
      this[STACKS].cache.push(guard);
      (0, _validator.beginTrackFrame)(name);
    }
    commitCacheGroup() {
      var opcodes = this.updating();
      var guard = this[STACKS].cache.pop();
      var tag = (0, _validator.endTrackFrame)();
      opcodes.push(new EndTrackFrameOpcode(guard));
      guard.finalize(tag, opcodes.length);
    }
    enter(args) {
      var updating = [];
      var state = this.capture(args);
      var block = this.elements().pushUpdatableBlock();
      var tryOpcode = new TryOpcode(state, this.runtime, block, updating);
      this.didEnter(tryOpcode);
    }
    enterItem(_ref62) {
      var {
        key,
        value,
        memo
      } = _ref62;
      var {
        stack
      } = this;
      var valueRef = (0, _reference.createIteratorItemRef)(value);
      var memoRef = (0, _reference.createIteratorItemRef)(memo);
      stack.push(valueRef);
      stack.push(memoRef);
      var state = this.capture(2);
      var block = this.elements().pushUpdatableBlock();
      var opcode = new ListItemOpcode(state, this.runtime, block, key, memoRef, valueRef);
      this.didEnter(opcode);
      return opcode;
    }
    registerItem(opcode) {
      this.listBlock().initializeChild(opcode);
    }
    enterList(iterableRef, offset) {
      var updating = [];
      var addr = this[INNER_VM].target(offset);
      var state = this.capture(0, addr);
      var list = this.elements().pushBlockList(updating);
      var opcode = new ListBlockOpcode(state, this.runtime, list, updating, iterableRef);
      this[STACKS].list.push(opcode);
      this.didEnter(opcode);
    }
    didEnter(opcode) {
      this.associateDestroyable(opcode);
      this[DESTROYABLE_STACK].push(opcode);
      this.updateWith(opcode);
      this.pushUpdating(opcode.children);
    }
    exit() {
      this[DESTROYABLE_STACK].pop();
      this.elements().popBlock();
      this.popUpdating();
    }
    exitList() {
      this.exit();
      this[STACKS].list.pop();
    }
    pushUpdating(list) {
      if (list === void 0) {
        list = [];
      }
      this[STACKS].updating.push(list);
    }
    popUpdating() {
      return this[STACKS].updating.pop();
    }
    updateWith(opcode) {
      this.updating().push(opcode);
    }
    listBlock() {
      return this[STACKS].list.current;
    }
    associateDestroyable(child) {
      var parent = this[DESTROYABLE_STACK].current;
      (0, _destroyable2.associateDestroyableChild)(parent, child);
    }
    tryUpdating() {
      return this[STACKS].updating.current;
    }
    updating() {
      return this[STACKS].updating.current;
    }
    elements() {
      return this.elementStack;
    }
    scope() {
      return this[STACKS].scope.current;
    }
    dynamicScope() {
      return this[STACKS].dynamicScope.current;
    }
    pushChildScope() {
      this[STACKS].scope.push(this.scope().child());
    }
    pushDynamicScope() {
      var child = this.dynamicScope().child();
      this[STACKS].dynamicScope.push(child);
      return child;
    }
    pushRootScope(size, owner) {
      var scope = PartialScopeImpl.sized(size, owner);
      this[STACKS].scope.push(scope);
      return scope;
    }
    pushScope(scope) {
      this[STACKS].scope.push(scope);
    }
    popScope() {
      this[STACKS].scope.pop();
    }
    popDynamicScope() {
      this[STACKS].dynamicScope.pop();
    } /// SCOPE HELPERS

    getOwner() {
      return this.scope().owner;
    }
    getSelf() {
      return this.scope().getSelf();
    }
    referenceForSymbol(symbol$$1) {
      return this.scope().getSymbol(symbol$$1);
    } /// EXECUTION

    execute(initialize) {
      if (false /* DEBUG */) {
        var hasErrored = true;
        try {
          var value = this._execute(initialize); // using a boolean here to avoid breaking ergonomics of "pause on uncaught exceptions"
          // which would happen with a `catch` + `throw`

          hasErrored = false;
          return value;
        } finally {
          if (hasErrored) {
            // If any existing blocks are open, due to an error or something like
            // that, we need to close them all and clean things up properly.
            var elements = this.elements();
            while (elements.hasBlocks) {
              elements.popBlock();
            } // eslint-disable-next-line no-console

            console.error(`\n\nError occurred:\n\n${(0, _validator.resetTracking)()}\n\n`);
          }
        }
      } else {
        return this._execute(initialize);
      }
    }
    _execute(initialize) {
      if (initialize) initialize(this);
      var result;
      while (true) {
        result = this.next();
        if (result.done) break;
      }
      return result.value;
    }
    next() {
      var {
        env,
        elementStack
      } = this;
      var opcode = this[INNER_VM].nextStatement();
      var result;
      if (opcode !== null) {
        this[INNER_VM].evaluateOuter(opcode, this);
        result = {
          done: false,
          value: null
        };
      } else {
        // Unload the stack
        this.stack.reset();
        result = {
          done: true,
          value: new RenderResultImpl(env, this.popUpdating(), elementStack.popBlock(), this.destructor)
        };
      }
      return result;
    }
    bindDynamicScope(names) {
      var scope = this.dynamicScope();
      for (var i = names.length - 1; i >= 0; i--) {
        var name = names[i];
        scope.set(name, this.stack.pop());
      }
    }
  }
  _exports.LowLevelVM = VM;
  _a$2 = STACKS, _b = DESTROYABLE_STACK;
  function vmState(pc, scope, dynamicScope) {
    return {
      pc,
      scope,
      dynamicScope,
      stack: []
    };
  }
  function initVM(context) {
    return (runtime, state, builder) => new VM(runtime, state, builder, context);
  }
  class TemplateIteratorImpl {
    constructor(vm) {
      this.vm = vm;
    }
    next() {
      return this.vm.next();
    }
    sync() {
      if (false /* DEBUG */) {
        return (0, _validator.runInTrackingTransaction)(() => this.vm.execute(), '- While rendering:');
      } else {
        return this.vm.execute();
      }
    }
  }
  function renderSync(env, iterator) {
    var result;
    inTransaction(env, () => result = iterator.sync());
    return result;
  }
  function renderMain(runtime, context, owner, self, treeBuilder, layout, dynamicScope) {
    if (dynamicScope === void 0) {
      dynamicScope = new DynamicScopeImpl();
    }
    var handle = (0, _util.unwrapHandle)(layout.compile(context));
    var numSymbols = layout.symbolTable.symbols.length;
    var vm = VM.initial(runtime, context, {
      self,
      dynamicScope,
      treeBuilder,
      handle,
      numSymbols,
      owner
    });
    return new TemplateIteratorImpl(vm);
  }
  function renderInvocation(vm, context, owner, definition, args) {
    // Get a list of tuples of argument names and references, like
    // [['title', reference], ['name', reference]]
    var argList = Object.keys(args).map(key => [key, args[key]]);
    var blockNames = ['main', 'else', 'attrs']; // Prefix argument names with `@` symbol

    var argNames = argList.map(_ref63 => {
      var [name] = _ref63;
      return `@${name}`;
    });
    var reified = vm[CONSTANTS].component(definition, owner);
    vm.pushFrame(); // Push blocks on to the stack, three stack values per block

    for (var i = 0; i < 3 * blockNames.length; i++) {
      vm.stack.push(null);
    }
    vm.stack.push(null); // For each argument, push its backing reference on to the stack

    argList.forEach(_ref64 => {
      var [, reference] = _ref64;
      vm.stack.push(reference);
    }); // Configure VM based on blocks and args just pushed on to the stack.

    vm[ARGS].setup(vm.stack, argNames, blockNames, 0, true);
    var compilable = reified.compilable;
    var layoutHandle = (0, _util.unwrapHandle)(compilable.compile(context));
    var invocation = {
      handle: layoutHandle,
      symbolTable: compilable.symbolTable
    }; // Needed for the Op.Main opcode: arguments, component invocation object, and
    // component definition.

    vm.stack.push(vm[ARGS]);
    vm.stack.push(invocation);
    vm.stack.push(reified);
    return new TemplateIteratorImpl(vm);
  }
  function renderComponent(runtime, treeBuilder, context, owner, definition, args, dynamicScope) {
    if (args === void 0) {
      args = {};
    }
    if (dynamicScope === void 0) {
      dynamicScope = new DynamicScopeImpl();
    }
    var vm = VM.empty(runtime, {
      treeBuilder,
      handle: context.stdlib.main,
      dynamicScope,
      owner
    }, context);
    return renderInvocation(vm, context, owner, definition, recordToReference(args));
  }
  function recordToReference(record) {
    var root = (0, _reference.createConstRef)(record, 'args');
    return Object.keys(record).reduce((acc, key) => {
      acc[key] = (0, _reference.childRefFor)(root, key);
      return acc;
    }, {});
  }
  var SERIALIZATION_FIRST_NODE_STRING = '%+b:0%';
  _exports.SERIALIZATION_FIRST_NODE_STRING = SERIALIZATION_FIRST_NODE_STRING;
  function isSerializationFirstNode(node) {
    return node.nodeValue === SERIALIZATION_FIRST_NODE_STRING;
  }
  class RehydratingCursor extends CursorImpl {
    constructor(element, nextSibling, startingBlockDepth) {
      super(element, nextSibling);
      this.startingBlockDepth = startingBlockDepth;
      this.candidate = null;
      this.injectedOmittedNode = false;
      this.openBlockDepth = startingBlockDepth - 1;
    }
  }
  class RehydrateBuilder extends NewElementBuilder {
    constructor(env, parentNode, nextSibling) {
      super(env, parentNode, nextSibling);
      this.unmatchedAttributes = null;
      this.blockDepth = 0;
      if (nextSibling) throw new Error('Rehydration with nextSibling not supported');
      var node = this.currentCursor.element.firstChild;
      while (node !== null) {
        if (isOpenBlock(node)) {
          break;
        }
        node = node.nextSibling;
      }
      this.candidate = node;
      var startingBlockOffset = getBlockDepth(node);
      if (startingBlockOffset !== 0) {
        // We are rehydrating from a partial tree and not the root component
        // We need to add an extra block before the first block to rehydrate correctly
        // The extra block is needed since the renderComponent API creates a synthetic component invocation which generates the extra block
        var newBlockDepth = startingBlockOffset - 1;
        var newCandidate = this.dom.createComment(`%+b:${newBlockDepth}%`);
        node.parentNode.insertBefore(newCandidate, this.candidate);
        var closingNode = node.nextSibling;
        while (closingNode !== null) {
          if (isCloseBlock(closingNode) && getBlockDepth(closingNode) === startingBlockOffset) {
            break;
          }
          closingNode = closingNode.nextSibling;
        }
        var newClosingBlock = this.dom.createComment(`%-b:${newBlockDepth}%`);
        node.parentNode.insertBefore(newClosingBlock, closingNode.nextSibling);
        this.candidate = newCandidate;
        this.startingBlockOffset = newBlockDepth;
      } else {
        this.startingBlockOffset = 0;
      }
    }
    get currentCursor() {
      return this[CURSOR_STACK].current;
    }
    get candidate() {
      if (this.currentCursor) {
        return this.currentCursor.candidate;
      }
      return null;
    }
    set candidate(node) {
      var currentCursor = this.currentCursor;
      currentCursor.candidate = node;
    }
    disableRehydration(nextSibling) {
      var currentCursor = this.currentCursor; // rehydration will be disabled until we either:
      // * hit popElement (and return to using the parent elements cursor)
      // * hit closeBlock and the next sibling is a close block comment
      //   matching the expected openBlockDepth

      currentCursor.candidate = null;
      currentCursor.nextSibling = nextSibling;
    }
    enableRehydration(candidate) {
      var currentCursor = this.currentCursor;
      currentCursor.candidate = candidate;
      currentCursor.nextSibling = null;
    }
    pushElement(element, nextSibling) {
      if (nextSibling === void 0) {
        nextSibling = null;
      }
      var cursor = new RehydratingCursor(element, nextSibling, this.blockDepth || 0);
      /**
       * <div>   <---------------  currentCursor.element
       *   <!--%+b:1%--> <-------  would have been removed during openBlock
       *   <div> <---------------  currentCursor.candidate -> cursor.element
       *     <!--%+b:2%--> <-----  currentCursor.candidate.firstChild -> cursor.candidate
       *     Foo
       *     <!--%-b:2%-->
       *   </div>
       *   <!--%-b:1%-->  <------  becomes currentCursor.candidate
       */

      if (this.candidate !== null) {
        cursor.candidate = element.firstChild;
        this.candidate = element.nextSibling;
      }
      this[CURSOR_STACK].push(cursor);
    } // clears until the end of the current container
    // either the current open block or higher

    clearMismatch(candidate) {
      var current = candidate;
      var currentCursor = this.currentCursor;
      if (currentCursor !== null) {
        var openBlockDepth = currentCursor.openBlockDepth;
        if (openBlockDepth >= currentCursor.startingBlockDepth) {
          while (current) {
            if (isCloseBlock(current)) {
              var closeBlockDepth = getBlockDepthWithOffset(current, this.startingBlockOffset);
              if (openBlockDepth >= closeBlockDepth) {
                break;
              }
            }
            current = this.remove(current);
          }
        } else {
          while (current !== null) {
            current = this.remove(current);
          }
        } // current cursor parentNode should be openCandidate if element
        // or openCandidate.parentNode if comment

        this.disableRehydration(current);
      }
    }
    __openBlock() {
      var {
        currentCursor
      } = this;
      if (currentCursor === null) return;
      var blockDepth = this.blockDepth;
      this.blockDepth++;
      var {
        candidate
      } = currentCursor;
      if (candidate === null) return;
      var {
        tagName
      } = currentCursor.element;
      if (isOpenBlock(candidate) && getBlockDepthWithOffset(candidate, this.startingBlockOffset) === blockDepth) {
        this.candidate = this.remove(candidate);
        currentCursor.openBlockDepth = blockDepth;
      } else if (tagName !== 'TITLE' && tagName !== 'SCRIPT' && tagName !== 'STYLE') {
        this.clearMismatch(candidate);
      }
    }
    __closeBlock() {
      var {
        currentCursor
      } = this;
      if (currentCursor === null) return; // openBlock is the last rehydrated open block

      var openBlockDepth = currentCursor.openBlockDepth; // this currently is the expected next open block depth

      this.blockDepth--;
      var {
        candidate
      } = currentCursor;
      var isRehydrating = false;
      if (candidate !== null) {
        isRehydrating = true; //assert(
        //  openBlockDepth === this.blockDepth,
        //  'when rehydrating, openBlockDepth should match this.blockDepth here'
        //);

        if (isCloseBlock(candidate) && getBlockDepthWithOffset(candidate, this.startingBlockOffset) === openBlockDepth) {
          var nextSibling = this.remove(candidate);
          this.candidate = nextSibling;
          currentCursor.openBlockDepth--;
        } else {
          // close the block and clear mismatch in parent container
          // we will be either at the end of the element
          // or at the end of our containing block
          this.clearMismatch(candidate);
          isRehydrating = false;
        }
      }
      if (isRehydrating === false) {
        // check if nextSibling matches our expected close block
        // if so, we remove the close block comment and
        // restore rehydration after clearMismatch disabled
        var _nextSibling = currentCursor.nextSibling;
        if (_nextSibling !== null && isCloseBlock(_nextSibling) && getBlockDepthWithOffset(_nextSibling, this.startingBlockOffset) === this.blockDepth) {
          // restore rehydration state
          var _candidate2 = this.remove(_nextSibling);
          this.enableRehydration(_candidate2);
          currentCursor.openBlockDepth--;
        }
      }
    }
    __appendNode(node) {
      var {
        candidate
      } = this; // This code path is only used when inserting precisely one node. It needs more
      // comparison logic, but we can probably lean on the cases where this code path
      // is actually used.

      if (candidate) {
        return candidate;
      } else {
        return super.__appendNode(node);
      }
    }
    __appendHTML(html) {
      var candidateBounds = this.markerBounds();
      if (candidateBounds) {
        var first = candidateBounds.firstNode();
        var last = candidateBounds.lastNode();
        var newBounds = new ConcreteBounds(this.element, first.nextSibling, last.previousSibling);
        var possibleEmptyMarker = this.remove(first);
        this.remove(last);
        if (possibleEmptyMarker !== null && isEmpty$1(possibleEmptyMarker)) {
          this.candidate = this.remove(possibleEmptyMarker);
          if (this.candidate !== null) {
            this.clearMismatch(this.candidate);
          }
        }
        return newBounds;
      } else {
        return super.__appendHTML(html);
      }
    }
    remove(node) {
      var element = node.parentNode;
      var next = node.nextSibling;
      element.removeChild(node);
      return next;
    }
    markerBounds() {
      var _candidate = this.candidate;
      if (_candidate && isMarker(_candidate)) {
        var first = _candidate;
        var last = first.nextSibling;
        while (last && !isMarker(last)) {
          last = last.nextSibling;
        }
        return new ConcreteBounds(this.element, first, last);
      } else {
        return null;
      }
    }
    __appendText(string) {
      var {
        candidate
      } = this;
      if (candidate) {
        if (isTextNode(candidate)) {
          if (candidate.nodeValue !== string) {
            candidate.nodeValue = string;
          }
          this.candidate = candidate.nextSibling;
          return candidate;
        } else if (isSeparator(candidate)) {
          this.candidate = this.remove(candidate);
          return this.__appendText(string);
        } else if (isEmpty$1(candidate) && string === '') {
          this.candidate = this.remove(candidate);
          return this.__appendText(string);
        } else {
          this.clearMismatch(candidate);
          return super.__appendText(string);
        }
      } else {
        return super.__appendText(string);
      }
    }
    __appendComment(string) {
      var _candidate = this.candidate;
      if (_candidate && isComment(_candidate)) {
        if (_candidate.nodeValue !== string) {
          _candidate.nodeValue = string;
        }
        this.candidate = _candidate.nextSibling;
        return _candidate;
      } else if (_candidate) {
        this.clearMismatch(_candidate);
      }
      return super.__appendComment(string);
    }
    __openElement(tag) {
      var _candidate = this.candidate;
      if (_candidate && isElement(_candidate) && isSameNodeType(_candidate, tag)) {
        this.unmatchedAttributes = [].slice.call(_candidate.attributes);
        return _candidate;
      } else if (_candidate) {
        if (isElement(_candidate) && _candidate.tagName === 'TBODY') {
          this.pushElement(_candidate, null);
          this.currentCursor.injectedOmittedNode = true;
          return this.__openElement(tag);
        }
        this.clearMismatch(_candidate);
      }
      return super.__openElement(tag);
    }
    __setAttribute(name, value, namespace) {
      var unmatched = this.unmatchedAttributes;
      if (unmatched) {
        var attr = findByName(unmatched, name);
        if (attr) {
          if (attr.value !== value) {
            attr.value = value;
          }
          unmatched.splice(unmatched.indexOf(attr), 1);
          return;
        }
      }
      return super.__setAttribute(name, value, namespace);
    }
    __setProperty(name, value) {
      var unmatched = this.unmatchedAttributes;
      if (unmatched) {
        var attr = findByName(unmatched, name);
        if (attr) {
          if (attr.value !== value) {
            attr.value = value;
          }
          unmatched.splice(unmatched.indexOf(attr), 1);
          return;
        }
      }
      return super.__setProperty(name, value);
    }
    __flushElement(parent, constructing) {
      var {
        unmatchedAttributes: unmatched
      } = this;
      if (unmatched) {
        for (var i = 0; i < unmatched.length; i++) {
          this.constructing.removeAttribute(unmatched[i].name);
        }
        this.unmatchedAttributes = null;
      } else {
        super.__flushElement(parent, constructing);
      }
    }
    willCloseElement() {
      var {
        candidate,
        currentCursor
      } = this;
      if (candidate !== null) {
        this.clearMismatch(candidate);
      }
      if (currentCursor && currentCursor.injectedOmittedNode) {
        this.popElement();
      }
      super.willCloseElement();
    }
    getMarker(element, guid) {
      var marker = element.querySelector(`script[glmr="${guid}"]`);
      if (marker) {
        return marker;
      }
      return null;
    }
    __pushRemoteElement(element, cursorId, insertBefore) {
      var marker = this.getMarker(element, cursorId);
      if (insertBefore === undefined) {
        while (element.firstChild !== null && element.firstChild !== marker) {
          this.remove(element.firstChild);
        }
        insertBefore = null;
      }
      var cursor = new RehydratingCursor(element, null, this.blockDepth);
      this[CURSOR_STACK].push(cursor);
      if (marker === null) {
        this.disableRehydration(insertBefore);
      } else {
        this.candidate = this.remove(marker);
      }
      var block = new RemoteLiveBlock(element);
      return this.pushLiveBlock(block, true);
    }
    didAppendBounds(bounds) {
      super.didAppendBounds(bounds);
      if (this.candidate) {
        var last = bounds.lastNode();
        this.candidate = last && last.nextSibling;
      }
      return bounds;
    }
  }
  _exports.RehydrateBuilder = RehydrateBuilder;
  function isTextNode(node) {
    return node.nodeType === 3;
  }
  function isComment(node) {
    return node.nodeType === 8;
  }
  function isOpenBlock(node) {
    return node.nodeType === 8
    /* COMMENT_NODE */ && node.nodeValue.lastIndexOf('%+b:', 0) === 0;
  }
  function isCloseBlock(node) {
    return node.nodeType === 8
    /* COMMENT_NODE */ && node.nodeValue.lastIndexOf('%-b:', 0) === 0;
  }
  function getBlockDepth(node) {
    return parseInt(node.nodeValue.slice(4), 10);
  }
  function getBlockDepthWithOffset(node, offset) {
    return getBlockDepth(node) - offset;
  }
  function isElement(node) {
    return node.nodeType === 1;
  }
  function isMarker(node) {
    return node.nodeType === 8 && node.nodeValue === '%glmr%';
  }
  function isSeparator(node) {
    return node.nodeType === 8 && node.nodeValue === '%|%';
  }
  function isEmpty$1(node) {
    return node.nodeType === 8 && node.nodeValue === '% %';
  }
  function isSameNodeType(candidate, tag) {
    if (candidate.namespaceURI === "http://www.w3.org/2000/svg"
    /* SVG */) {
      return candidate.tagName === tag;
    }
    return candidate.tagName === tag.toUpperCase();
  }
  function findByName(array, name) {
    for (var i = 0; i < array.length; i++) {
      var attr = array[i];
      if (attr.name === name) return attr;
    }
    return undefined;
  }
  function rehydrationBuilder(env, cursor) {
    return RehydrateBuilder.forInitialRender(env, cursor);
  }
  var ARGS_CACHES = false /* DEBUG */ ? new WeakMap() : undefined;
  function getArgs(proxy) {
    return (0, _validator.getValue)(false /* DEBUG */ ? ARGS_CACHES.get(proxy) : proxy.argsCache);
  }
  class SimpleArgsProxy {
    constructor(context, computeArgs) {
      if (computeArgs === void 0) {
        computeArgs = () => EMPTY_ARGS;
      }
      var argsCache = (0, _validator.createCache)(() => computeArgs(context));
      if (false /* DEBUG */) {
        ARGS_CACHES.set(this, argsCache);
        Object.freeze(this);
      } else {
        this.argsCache = argsCache;
      }
    }
    get named() {
      return getArgs(this).named || EMPTY_NAMED;
    }
    get positional() {
      return getArgs(this).positional || EMPTY_POSITIONAL;
    }
  } ////////////

  function invokeHelper(context, definition, computeArgs) {
    if (false /* DEBUG */ && (typeof context !== 'object' || context === null)) {
      throw new Error(`Expected a context object to be passed as the first parameter to invokeHelper, got ${context}`);
    }
    var owner = (0, _owner2.getOwner)(context);
    var internalManager = (0, _manager5.getInternalHelperManager)(definition); // TODO: figure out why assert isn't using the TS assert thing

    if (false /* DEBUG */ && !internalManager) {
      throw new Error(`Expected a helper definition to be passed as the second parameter to invokeHelper, but no helper manager was found. The definition value that was passed was \`${(0, _util.debugToString)(definition)}\`. Did you use setHelperManager to associate a helper manager with this value?`);
    }
    if (false /* DEBUG */ && typeof internalManager === 'function') {
      throw new Error('Found a helper manager, but it was an internal built-in helper manager. `invokeHelper` does not support internal helpers yet.');
    }
    var manager = internalManager.getDelegateFor(owner);
    var args = new SimpleArgsProxy(context, computeArgs);
    var bucket = manager.createHelper(definition, args);
    var cache;
    if ((0, _manager5.hasValue)(manager)) {
      cache = (0, _validator.createCache)(() => {
        if (false /* DEBUG */ && ((0, _destroyable2.isDestroying)(cache) || (0, _destroyable2.isDestroyed)(cache))) {
          throw new Error(`You attempted to get the value of a helper after the helper was destroyed, which is not allowed`);
        }
        return manager.getValue(bucket);
      });
      (0, _destroyable2.associateDestroyableChild)(context, cache);
    } else {
      throw new Error('TODO: unreachable, to be implemented with hasScheduledEffect');
    }
    if ((0, _manager5.hasDestroyable)(manager)) {
      var destroyable = manager.getDestroyable(bucket);
      (0, _destroyable2.associateDestroyableChild)(cache, destroyable);
    }
    return cache;
  }
  function internalHelper(helper) {
    return (0, _manager5.setInternalHelperManager)(helper, {});
  }
  var context = (0, _util.buildUntouchableThis)('`fn` helper');
  /**
    The `fn` helper allows you to ensure a function that you are passing off
    to another component, helper, or modifier has access to arguments that are
    available in the template.
  
    For example, if you have an `each` helper looping over a number of items, you
    may need to pass a function that expects to receive the item as an argument
    to a component invoked within the loop. Here's how you could use the `fn`
    helper to pass both the function and its arguments together:
  
      ```app/templates/components/items-listing.hbs
    {{#each @items as |item|}}
      <DisplayItem @item=item @select={{fn this.handleSelected item}} />
    {{/each}}
    ```
  
    ```app/components/items-list.js
    import Component from '@glimmer/component';
    import { action } from '@ember/object';
  
    export default class ItemsList extends Component {
      handleSelected = (item) => {
        // ...snip...
      }
    }
    ```
  
    In this case the `display-item` component will receive a normal function
    that it can invoke. When it invokes the function, the `handleSelected`
    function will receive the `item` and any arguments passed, thanks to the
    `fn` helper.
  
    Let's take look at what that means in a couple circumstances:
  
    - When invoked as `this.args.select()` the `handleSelected` function will
      receive the `item` from the loop as its first and only argument.
    - When invoked as `this.args.select('foo')` the `handleSelected` function
      will receive the `item` from the loop as its first argument and the
      string `'foo'` as its second argument.
  
    In the example above, we used an arrow function to ensure that
    `handleSelected` is properly bound to the `items-list`, but let's explore what
    happens if we left out the arrow function:
  
    ```app/components/items-list.js
    import Component from '@glimmer/component';
  
    export default class ItemsList extends Component {
      handleSelected(item) {
        // ...snip...
      }
    }
    ```
  
    In this example, when `handleSelected` is invoked inside the `display-item`
    component, it will **not** have access to the component instance. In other
    words, it will have no `this` context, so please make sure your functions
    are bound (via an arrow function or other means) before passing into `fn`!
  
    See also [partial application](https://en.wikipedia.org/wiki/Partial_application).
  
    @method fn
    @public
  */

  var fn = internalHelper(_ref65 => {
    var {
      positional
    } = _ref65;
    var callbackRef = positional[0];
    if (false /* DEBUG */) assertCallbackIsFn(callbackRef);
    return (0, _reference.createComputeRef)(() => {
      return function () {
        var [fn, ...args] = (0, _runtime.reifyPositional)(positional);
        if (false /* DEBUG */) assertCallbackIsFn(callbackRef);
        for (var _len = arguments.length, invocationArgs = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
          invocationArgs[_key2] = arguments[_key2];
        }
        if ((0, _reference.isInvokableRef)(callbackRef)) {
          var value = args.length > 0 ? args[0] : invocationArgs[0];
          return (0, _reference.updateRef)(callbackRef, value);
        } else {
          return fn.call(context, ...args, ...invocationArgs);
        }
      };
    }, null, 'fn');
  });
  _exports.fn = fn;
  function assertCallbackIsFn(callbackRef) {
    if (!(callbackRef && ((0, _reference.isInvokableRef)(callbackRef) || typeof (0, _reference.valueForRef)(callbackRef) === 'function'))) {
      throw new Error(`You must pass a function as the \`fn\` helpers first argument, you passed ${callbackRef ? (0, _reference.valueForRef)(callbackRef) : callbackRef}. While rendering:\n\n${callbackRef === null || callbackRef === void 0 ? void 0 : callbackRef.debugLabel}`);
    }
  }
  var wrapHashProxy;
  if (false /* DEBUG */) {
    wrapHashProxy = hash => {
      return new Proxy(hash, {
        set(target, key, value) {
          (true && !(false) && (0, _globalContext.deprecate)(`You set the '${String(key)}' property on a {{hash}} object. Setting properties on objects generated by {{hash}} is deprecated. Please update to use an object created with a tracked property or getter, or with a custom helper.`, false, {
            id: 'setting-on-hash'
          }));
          target[key] = value;
          return true;
        }
      });
    };
  }
  /**
     Use the `{{hash}}` helper to create a hash to pass as an option to your
     components. This is specially useful for contextual components where you can
     just yield a hash:
  
     ```handlebars
     {{yield (hash
        name='Sarah'
        title=office
     )}}
     ```
  
     Would result in an object such as:
  
     ```js
     { name: 'Sarah', title: this.get('office') }
     ```
  
     Where the `title` is bound to updates of the `office` property.
  
     Note that the hash is an empty object with no prototype chain, therefore
     common methods like `toString` are not available in the resulting hash.
     If you need to use such a method, you can use the `call` or `apply`
     approach:
  
     ```js
     function toString(obj) {
       return Object.prototype.toString.apply(obj);
     }
     ```
  
     @method hash
     @param {Object} options
     @return {Object} Hash
     @public
   */

  var hash = internalHelper(_ref66 => {
    var {
      named
    } = _ref66;
    var ref = (0, _reference.createComputeRef)(() => {
      var hash = (0, _runtime.reifyNamed)(named);
      if (false /* DEBUG */ && _util.HAS_NATIVE_PROXY) {
        hash = wrapHashProxy(hash);
      }
      return hash;
    }, null, 'hash'); // Setup the children so that templates can bypass getting the value of
    // the reference and treat children lazily

    var children = new Map();
    for (var name in named) {
      children.set(name, named[name]);
    }
    ref.children = children;
    return ref;
  });

  /**
     Use the `{{array}}` helper to create an array to pass as an option to your
     components.
  
     ```handlebars
     <MyComponent @people={{array
       'Tom Dale'
       'Yehuda Katz'
       this.myOtherPerson}}
     />
     ```
      or
     ```handlebars
     {{my-component people=(array
       'Tom Dale'
       'Yehuda Katz'
       this.myOtherPerson)
     }}
     ```
  
     Would result in an object such as:
  
     ```js
     ['Tom Dale', 'Yehuda Katz', this.get('myOtherPerson')]
     ```
  
     Where the 3rd item in the array is bound to updates of the `myOtherPerson` property.
  
     @method array
     @param {Array} options
     @return {Array} Array
     @public
   */
  _exports.hash = hash;
  var array = internalHelper(_ref67 => {
    var {
      positional
    } = _ref67;
    return (0, _reference.createComputeRef)(() => (0, _runtime.reifyPositional)(positional), null, 'array');
  });

  /**
    Dynamically look up a property on an object. The second argument to `{{get}}`
    should have a string value, although it can be bound.
  
    For example, these two usages are equivalent:
  
    ```app/components/developer-detail.js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';
  
    export default class extends Component {
      @tracked developer = {
        name: "Sandi Metz",
        language: "Ruby"
      }
    }
    ```
  
    ```handlebars
    {{this.developer.name}}
    {{get this.developer "name"}}
    ```
  
    If there were several facts about a person, the `{{get}}` helper can dynamically
    pick one:
  
    ```app/templates/application.hbs
    <DeveloperDetail @factName="language" />
    ```
  
    ```handlebars
    {{get this.developer @factName}}
    ```
  
    For a more complex example, this template would allow the user to switch
    between showing the user's height and weight with a click:
  
    ```app/components/developer-detail.js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';
  
    export default class extends Component {
      @tracked developer = {
        name: "Sandi Metz",
        language: "Ruby"
      }
  
      @tracked currentFact = 'name'
  
      showFact = (fact) => {
        this.currentFact = fact;
      }
    }
    ```
  
    ```app/components/developer-detail.js
    {{get this.developer this.currentFact}}
  
    <button {{on 'click' (fn this.showFact "name")}}>Show name</button>
    <button {{on 'click' (fn this.showFact "language")}}>Show language</button>
    ```
  
    The `{{get}}` helper can also respect mutable values itself. For example:
  
    ```app/components/developer-detail.js
    <Input @value={{mut (get this.person this.currentFact)}} />
  
    <button {{on 'click' (fn this.showFact "name")}}>Show name</button>
    <button {{on 'click' (fn this.showFact "language")}}>Show language</button>
    ```
  
    Would allow the user to swap what fact is being displayed, and also edit
    that fact via a two-way mutable binding.
  
    @public
    @method get
   */
  _exports.array = array;
  var get = internalHelper(_ref68 => {
    var {
      positional
    } = _ref68;
    var _a, _b;
    var sourceRef = (_a = positional[0]) !== null && _a !== void 0 ? _a : _reference.UNDEFINED_REFERENCE;
    var pathRef = (_b = positional[1]) !== null && _b !== void 0 ? _b : _reference.UNDEFINED_REFERENCE;
    return (0, _reference.createComputeRef)(() => {
      var source = (0, _reference.valueForRef)(sourceRef);
      if ((0, _util.isDict)(source)) {
        return (0, _globalContext.getPath)(source, String((0, _reference.valueForRef)(pathRef)));
      }
    }, value => {
      var source = (0, _reference.valueForRef)(sourceRef);
      if ((0, _util.isDict)(source)) {
        return (0, _globalContext.setPath)(source, String((0, _reference.valueForRef)(pathRef)), value);
      }
    }, 'get');
  });
  _exports.get = get;
  var isEmpty$2 = value => {
    return value === null || value === undefined || typeof value.toString !== 'function';
  };
  var normalizeTextValue = value => {
    if (isEmpty$2(value)) {
      return '';
    }
    return String(value);
  };
  /**
    Concatenates the given arguments into a string.
  
    Example:
  
    ```handlebars
    {{some-component name=(concat firstName " " lastName)}}
  
    {{! would pass name="<first name value> <last name value>" to the component}}
    ```
  
    or for angle bracket invocation, you actually don't need concat at all.
  
    ```handlebars
    <SomeComponent @name="{{firstName}} {{lastName}}" />
    ```
  
    @public
    @method concat
  */

  var concat = internalHelper(_ref69 => {
    var {
      positional
    } = _ref69;
    return (0, _reference.createComputeRef)(() => (0, _runtime.reifyPositional)(positional).map(normalizeTextValue).join(''), null, 'concat');
  });
  _exports.concat = concat;
  var untouchableContext = (0, _util.buildUntouchableThis)('`on` modifier');
  /*
    Internet Explorer 11 does not support `once` and also does not support
    passing `eventOptions`. In some situations it then throws a weird script
    error, like:
  
    ```
    Could not complete the operation due to error 80020101
    ```
  
    This flag determines, whether `{ once: true }` and thus also event options in
    general are supported.
  */

  var SUPPORTS_EVENT_OPTIONS = (() => {
    try {
      var div = document.createElement('div');
      var counter = 0;
      div.addEventListener('click', () => counter++, {
        once: true
      });
      var event;
      if (typeof Event === 'function') {
        event = new Event('click');
      } else {
        event = document.createEvent('Event');
        event.initEvent('click', true, true);
      }
      div.dispatchEvent(event);
      div.dispatchEvent(event);
      return counter === 1;
    } catch (error) {
      return false;
    }
  })();
  class OnModifierState {
    constructor(element, args) {
      this.tag = (0, _validator.createUpdatableTag)();
      this.shouldUpdate = true;
      this.element = element;
      this.args = args;
    }
    updateFromArgs() {
      var {
        args
      } = this;
      var {
        once,
        passive,
        capture
      } = (0, _runtime.reifyNamed)(args.named);
      if (once !== this.once) {
        this.once = once;
        this.shouldUpdate = true;
      }
      if (passive !== this.passive) {
        this.passive = passive;
        this.shouldUpdate = true;
      }
      if (capture !== this.capture) {
        this.capture = capture;
        this.shouldUpdate = true;
      }
      var options;
      if (once || passive || capture) {
        options = this.options = {
          once,
          passive,
          capture
        };
      } else {
        this.options = undefined;
      }
      if (false /* DEBUG */ && (args.positional[0] === undefined || typeof (0, _reference.valueForRef)(args.positional[0]) !== 'string')) {
        throw new Error('You must pass a valid DOM event name as the first argument to the `on` modifier');
      }
      var eventName = (0, _reference.valueForRef)(args.positional[0]);
      if (eventName !== this.eventName) {
        this.eventName = eventName;
        this.shouldUpdate = true;
      }
      var userProvidedCallbackReference = args.positional[1];
      if (false /* DEBUG */) {
        if (args.positional[1] === undefined) {
          throw new Error(`You must pass a function as the second argument to the \`on\` modifier.`);
        }
        var value = (0, _reference.valueForRef)(userProvidedCallbackReference);
        if (typeof value !== 'function') {
          throw new Error(`You must pass a function as the second argument to the \`on\` modifier, you passed ${value === null ? 'null' : typeof value}. While rendering:\n\n${userProvidedCallbackReference.debugLabel}`);
        }
      }
      var userProvidedCallback = (0, _reference.valueForRef)(userProvidedCallbackReference);
      if (userProvidedCallback !== this.userProvidedCallback) {
        this.userProvidedCallback = userProvidedCallback;
        this.shouldUpdate = true;
      }
      if (false /* DEBUG */ && args.positional.length !== 2) {
        throw new Error(`You can only pass two positional arguments (event name and callback) to the \`on\` modifier, but you provided ${args.positional.length}. Consider using the \`fn\` helper to provide additional arguments to the \`on\` callback.`);
      }
      var needsCustomCallback = SUPPORTS_EVENT_OPTIONS === false && once || /* needs manual once implementation */
      false /* DEBUG */ && passive;
      /* needs passive enforcement */

      if (this.shouldUpdate) {
        if (needsCustomCallback) {
          var _callback = this.callback = function (event) {
            if (false /* DEBUG */ && passive) {
              event.preventDefault = () => {
                throw new Error(`You marked this listener as 'passive', meaning that you must not call 'event.preventDefault()': \n\n${userProvidedCallback}`);
              };
            }
            if (!SUPPORTS_EVENT_OPTIONS && once) {
              removeEventListener(this, eventName, _callback, options);
            }
            return userProvidedCallback.call(untouchableContext, event);
          };
        } else if (false /* DEBUG */) {
          // prevent the callback from being bound to the element
          this.callback = userProvidedCallback.bind(untouchableContext);
        } else {
          this.callback = userProvidedCallback;
        }
      }
    }
  }
  var adds = 0;
  var removes = 0;
  function removeEventListener(element, eventName, callback, options) {
    removes++;
    if (SUPPORTS_EVENT_OPTIONS) {
      // when options are supported, use them across the board
      element.removeEventListener(eventName, callback, options);
    } else if (options !== undefined && options.capture) {
      // used only in the following case:
      //
      // `{ once: true | false, passive: true | false, capture: true }
      //
      // `once` is handled via a custom callback that removes after first
      // invocation so we only care about capture here as a boolean
      element.removeEventListener(eventName, callback, true);
    } else {
      // used only in the following cases:
      //
      // * where there is no options
      // * `{ once: true | false, passive: true | false, capture: false }
      element.removeEventListener(eventName, callback);
    }
  }
  function addEventListener(element, eventName, callback, options) {
    adds++;
    if (SUPPORTS_EVENT_OPTIONS) {
      // when options are supported, use them across the board
      element.addEventListener(eventName, callback, options);
    } else if (options !== undefined && options.capture) {
      // used only in the following case:
      //
      // `{ once: true | false, passive: true | false, capture: true }
      //
      // `once` is handled via a custom callback that removes after first
      // invocation so we only care about capture here as a boolean
      element.addEventListener(eventName, callback, true);
    } else {
      // used only in the following cases:
      //
      // * where there is no options
      // * `{ once: true | false, passive: true | false, capture: false }
      element.addEventListener(eventName, callback);
    }
  }
  /**
    The `{{on}}` modifier lets you easily add event listeners (it uses
    [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
    internally).
  
    For example, if you'd like to run a function on your component when a `<button>`
    in the components template is clicked you might do something like:
  
    ```app/components/like-post.hbs
    <button {{on 'click' this.saveLike}}>Like this post!</button>
    ```
  
    ```app/components/like-post.js
    import Component from '@glimmer/component';
    import { action } from '@ember/object';
  
    export default class LikePostComponent extends Component {
      saveLike = () => {
        // someone likes your post!
        // better send a request off to your server...
      }
    }
    ```
  
    ### Arguments
  
    `{{on}}` accepts two positional arguments, and a few named arguments.
  
    The positional arguments are:
  
    - `event` -- the name to use when calling `addEventListener`
    - `callback` -- the function to be passed to `addEventListener`
  
    The named arguments are:
  
    - capture -- a `true` value indicates that events of this type will be dispatched
      to the registered listener before being dispatched to any EventTarget beneath it
      in the DOM tree.
    - once -- indicates that the listener should be invoked at most once after being
      added. If true, the listener would be automatically removed when invoked.
    - passive -- if `true`, indicates that the function specified by listener will never
      call preventDefault(). If a passive listener does call preventDefault(), the user
      agent will do nothing other than generate a console warning. See
      [Improving scrolling performance with passive listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners)
      to learn more.
  
    The callback function passed to `{{on}}` will receive any arguments that are passed
    to the event handler. Most commonly this would be the `event` itself.
  
    If you would like to pass additional arguments to the function you should use
    the `{{fn}}` helper.
  
    For example, in our example case above if you'd like to pass in the post that
    was being liked when the button is clicked you could do something like:
  
    ```app/components/like-post.hbs
    <button {{on 'click' (fn this.saveLike @post)}}>Like this post!</button>
    ```
  
    In this case, the `saveLike` function will receive two arguments: the click event
    and the value of `@post`.
  
    ### Function Context
  
    In the example above, we used an arrow function to ensure that `likePost` is
    properly bound to the `items-list`, but let's explore what happens if we
    left out the arrow function:
  
    ```app/components/like-post.js
    import Component from '@glimmer/component';
  
    export default class LikePostComponent extends Component {
      saveLike() {
        // ...snip...
      }
    }
    ```
  
    In this example, when the button is clicked `saveLike` will be invoked,
    it will **not** have access to the component instance. In other
    words, it will have no `this` context, so please make sure your functions
    are bound (via an arrow function or other means) before passing into `on`!
  
    @method on
    @public
  */

  class OnModifierManager {
    constructor() {
      this.SUPPORTS_EVENT_OPTIONS = SUPPORTS_EVENT_OPTIONS;
    }
    getDebugName() {
      return 'on';
    }
    get counters() {
      return {
        adds,
        removes
      };
    }
    create(_owner, element, _state, args) {
      return new OnModifierState(element, args);
    }
    getTag(state) {
      if (state === null) {
        return null;
      }
      return state.tag;
    }
    install(state) {
      if (state === null) {
        return;
      }
      state.updateFromArgs();
      var {
        element,
        eventName,
        callback,
        options
      } = state;
      addEventListener(element, eventName, callback, options);
      (0, _destroyable2.registerDestructor)(state, () => removeEventListener(element, eventName, callback, options));
      state.shouldUpdate = false;
    }
    update(state) {
      if (state === null) {
        return;
      } // stash prior state for el.removeEventListener

      var {
        element,
        eventName,
        callback,
        options
      } = state;
      state.updateFromArgs();
      if (!state.shouldUpdate) {
        return;
      } // use prior state values for removal

      removeEventListener(element, eventName, callback, options); // read updated values from the state object

      addEventListener(state.element, state.eventName, state.callback, state.options);
      state.shouldUpdate = false;
    }
    getDestroyable(state) {
      return state;
    }
  }
  var on = (0, _manager5.setInternalModifierManager)(new OnModifierManager(), {});
  _exports.on = on;
});