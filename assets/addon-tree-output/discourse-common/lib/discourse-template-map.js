define("discourse-common/lib/discourse-template-map", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  const pluginRegex = /^discourse\/plugins\/([^\/]+)\/(.*)$/;
  const themeRegex = /^discourse\/theme-([^\/]+)\/(.*)$/;
  function appendToCache(cache, key, value) {
    let cachedValue = cache.get(key);
    cachedValue ??= [];
    cachedValue.push(value);
    cache.set(key, cachedValue);
  }
  const NAMESPACES = ["discourse/", "wizard/", "admin/"];
  function isInRecognisedNamespace(moduleName) {
    for (const ns of NAMESPACES) {
      if (moduleName.startsWith(ns)) {
        return true;
      }
    }
    return false;
  }
  function isTemplate(moduleName) {
    return moduleName.includes("/templates/");
  }

  /**
   * This class provides takes set of core/plugin/theme modules, finds the template modules,
   * and makes an efficient lookup table for the resolver to use. It takes care of sourcing
   * component/route templates from themes/plugins, and also handles template overrides.
   */
  var _add = /*#__PURE__*/new WeakSet();
  class DiscourseTemplateMap {
    constructor() {
      _classPrivateMethodInitSpec(this, _add);
      _defineProperty(this, "coreTemplates", new Map());
      _defineProperty(this, "pluginTemplates", new Map());
      _defineProperty(this, "themeTemplates", new Map());
      _defineProperty(this, "prioritizedCaches", [this.themeTemplates, this.pluginTemplates, this.coreTemplates]);
    }
    /**
     * Reset the TemplateMap to use the supplied module names. It is expected that the list
     * will be generated using `Object.keys(requirejs.entries)`.
     */
    setModuleNames(moduleNames) {
      this.coreTemplates.clear();
      this.pluginTemplates.clear();
      this.themeTemplates.clear();
      for (const moduleName of moduleNames) {
        if (isInRecognisedNamespace(moduleName) && isTemplate(moduleName)) {
          _classPrivateMethodGet(this, _add, _add2).call(this, moduleName);
        }
      }
    }
    /**
     * Resolve a template name to a module name, taking into account
     * theme/plugin namespaces and overrides.
     */
    resolve(name) {
      for (const cache of this.prioritizedCaches) {
        const val = cache.get(name);
        if (val) {
          return val[val.length - 1];
        }
      }
    }

    /**
     * List all available template keys, after theme/plugin namespaces have
     * been stripped.
     */
    keys() {
      const uniqueKeys = new Set([...this.coreTemplates.keys(), ...this.pluginTemplates.keys(), ...this.themeTemplates.keys()]);
      return [...uniqueKeys];
    }
  }
  function _add2(originalPath) {
    let path = originalPath;
    let pluginMatch, themeMatch, cache;
    if (pluginMatch = path.match(pluginRegex)) {
      path = pluginMatch[2];
      cache = this.pluginTemplates;
    } else if (themeMatch = path.match(themeRegex)) {
      path = themeMatch[2];
      cache = this.themeTemplates;
    } else {
      cache = this.coreTemplates;
    }
    path = path.replace(/^discourse\/templates\//, "");
    appendToCache(cache, path, originalPath);
  }
  var _default = new DiscourseTemplateMap();
  _exports.default = _default;
});