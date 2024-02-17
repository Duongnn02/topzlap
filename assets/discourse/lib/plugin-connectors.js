define("discourse/lib/plugin-connectors", ["exports", "discourse-common/lib/raw-templates", "discourse-common/lib/deprecated", "discourse-common/lib/discourse-template-map", "@glimmer/manager", "@ember/component/template-only"], function (_exports, _rawTemplates, _deprecated, _discourseTemplateMap, _manager, _templateOnly2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildArgsWithDeprecations = buildArgsWithDeprecations;
  _exports.clearCache = clearCache;
  _exports.connectorsFor = connectorsFor;
  _exports.expireConnectorCache = expireConnectorCache;
  _exports.extraConnectorClass = extraConnectorClass;
  _exports.rawConnectorsFor = rawConnectorsFor;
  _exports.renderedConnectorsFor = renderedConnectorsFor;
  _exports.resetExtraClasses = resetExtraClasses;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/discourse-template-map",0,"@glimmer/manager",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  let _connectorCache;
  let _rawConnectorCache;
  let _extraConnectorClasses = {};
  let _classPaths;
  function resetExtraClasses() {
    _extraConnectorClasses = {};
    _classPaths = undefined;
  }

  // Note: In plugins, define a class by path and it will be wired up automatically
  // eg: discourse/connectors/<OUTLET NAME>/<CONNECTOR NAME>
  function extraConnectorClass(name, obj) {
    _extraConnectorClasses[name] = obj;
  }
  function findOutlets(keys, callback) {
    keys.forEach(function (res) {
      const segments = res.split("/");
      if (segments.includes("connectors")) {
        const outletName = segments[segments.length - 2];
        const uniqueName = segments[segments.length - 1];
        callback(outletName, res, uniqueName);
      }
    });
  }
  function clearCache() {
    _connectorCache = null;
    _rawConnectorCache = null;
  }
  function findClass(outletName, uniqueName) {
    if (!_classPaths) {
      _classPaths = {};
      findOutlets(Object.keys(require._eak_seen), (outlet, res, un) => {
        const possibleConnectorClass = requirejs(res).default;
        if (possibleConnectorClass.__id) {
          // This is the template, not the connector class
          return;
        }
        _classPaths[`${outlet}/${un}`] = possibleConnectorClass;
      });
    }
    const id = `${outletName}/${uniqueName}`;
    let foundClass = _extraConnectorClasses[id] || _classPaths[id];
    return foundClass;
  }

  /**
   * Sets component template, ignoring errors if it's already set to the same template
   */
  function safeSetComponentTemplate(template, component) {
    try {
      (0, _manager.setComponentTemplate)(template, component);
    } catch (e) {
      if ((0, _manager.getComponentTemplate)(component) !== template) {
        throw e;
      }
    }
  }

  /**
   * Clear the cache of connectors. Should only be used in tests when
   * `requirejs.entries` is changed.
   */
  function expireConnectorCache() {
    _connectorCache = null;
  }
  var _componentClass = /*#__PURE__*/new WeakMap();
  var _templateOnly = /*#__PURE__*/new WeakMap();
  var _buildComponentClass = /*#__PURE__*/new WeakSet();
  var _buildTemplateOnlyClass = /*#__PURE__*/new WeakSet();
  var _warnUnusableHooks = /*#__PURE__*/new WeakSet();
  class ConnectorInfo {
    constructor(outletName, connectorName, connectorClass, template) {
      _classPrivateMethodInitSpec(this, _warnUnusableHooks);
      _classPrivateMethodInitSpec(this, _buildTemplateOnlyClass);
      _classPrivateMethodInitSpec(this, _buildComponentClass);
      _classPrivateFieldInitSpec(this, _componentClass, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _templateOnly, {
        writable: true,
        value: void 0
      });
      this.outletName = outletName;
      this.connectorName = connectorName;
      this.connectorClass = connectorClass;
      this.template = template;
    }
    get componentClass() {
      return _classPrivateFieldGet(this, _componentClass) ?? _classPrivateFieldSet(this, _componentClass, _classPrivateMethodGet(this, _buildComponentClass, _buildComponentClass2).call(this));
    }
    get templateOnly() {
      return _classPrivateFieldGet(this, _templateOnly) ?? _classPrivateFieldSet(this, _templateOnly, _classPrivateMethodGet(this, _buildTemplateOnlyClass, _buildTemplateOnlyClass2).call(this));
    }
    get classicClassNames() {
      return `${this.outletName}-outlet ${this.connectorName}`;
    }
  }
  function _buildComponentClass2() {
    const klass = this.connectorClass;
    if (klass && (0, _manager.hasInternalComponentManager)(klass)) {
      safeSetComponentTemplate(this.template, klass);
      _classPrivateMethodGet(this, _warnUnusableHooks, _warnUnusableHooks2).call(this);
      return klass;
    } else {
      return false;
    }
  }
  function _buildTemplateOnlyClass2() {
    const component = (0, _templateOnly2.default)();
    (0, _manager.setComponentTemplate)(this.template, component);
    _classPrivateMethodGet(this, _warnUnusableHooks, _warnUnusableHooks2).call(this);
    return component;
  }
  function _warnUnusableHooks2() {
    for (const methodName of ["actions", "setupComponent", "teardownComponent"]) {
      if (this.connectorClass?.[methodName]) {
        (0, _deprecated.default)(`actions, setupComponent and teardownComponent hooks cannot be used with Glimmer plugin outlets. Define a component class instead. (${this.outletName}/${this.connectorName}).`, {
          id: "discourse.plugin-outlet-classic-hooks"
        });
      }
    }
  }
  function buildConnectorCache() {
    _connectorCache = {};
    findOutlets(_discourseTemplateMap.default.keys(), (outletName, resource, connectorName) => {
      _connectorCache[outletName] ||= [];
      const template = require(_discourseTemplateMap.default.resolve(resource)).default;
      const connectorClass = findClass(outletName, connectorName);
      _connectorCache[outletName].push(new ConnectorInfo(outletName, connectorName, connectorClass, template));
    });
  }
  function connectorsFor(outletName) {
    if (!_connectorCache) {
      buildConnectorCache();
    }
    return _connectorCache[outletName] || [];
  }
  function renderedConnectorsFor(outletName, args, context) {
    return connectorsFor(outletName).filter(con => {
      const shouldRender = con.connectorClass?.shouldRender;
      return !shouldRender || shouldRender(args, context);
    });
  }
  function rawConnectorsFor(outletName) {
    if (!_rawConnectorCache) {
      _rawConnectorCache = (0, _rawTemplates.buildRawConnectorCache)(findOutlets);
    }
    return _rawConnectorCache[outletName] || [];
  }
  function buildArgsWithDeprecations(args, deprecatedArgs) {
    const output = {};
    Object.keys(args).forEach(key => {
      Object.defineProperty(output, key, {
        value: args[key]
      });
    });
    Object.keys(deprecatedArgs).forEach(key => {
      Object.defineProperty(output, key, {
        get() {
          (0, _deprecated.default)(`${key} is deprecated`, {
            id: "discourse.plugin-connector.deprecated-arg"
          });
          return deprecatedArgs[key];
        }
      });
    });
    return output;
  }
});