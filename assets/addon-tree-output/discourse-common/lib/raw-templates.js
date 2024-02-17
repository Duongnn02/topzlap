define("discourse-common/lib/raw-templates", ["exports", "discourse-common/resolver"], function (_exports, _resolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__DISCOURSE_RAW_TEMPLATES = void 0;
  _exports.addRawTemplate = addRawTemplate;
  _exports.buildRawConnectorCache = buildRawConnectorCache;
  _exports.eagerLoadRawTemplateModules = eagerLoadRawTemplateModules;
  _exports.findRawTemplate = findRawTemplate;
  _exports.removeRawTemplate = removeRawTemplate;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/resolver"eaimeta@70e063a35619d71f
  const __DISCOURSE_RAW_TEMPLATES = {};
  _exports.__DISCOURSE_RAW_TEMPLATES = __DISCOURSE_RAW_TEMPLATES;
  function addRawTemplate(name, template) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // Core templates should never overwrite themes / plugins
    if (opts.core && __DISCOURSE_RAW_TEMPLATES[name]) {
      return;
    }
    __DISCOURSE_RAW_TEMPLATES[name] = template;
  }
  function removeRawTemplate(name) {
    delete __DISCOURSE_RAW_TEMPLATES[name];
  }
  function findRawTemplate(name) {
    if ((0, _resolver.getResolverOption)("mobileView")) {
      return __DISCOURSE_RAW_TEMPLATES[`javascripts/mobile/${name}`] || __DISCOURSE_RAW_TEMPLATES[`javascripts/${name}`] || __DISCOURSE_RAW_TEMPLATES[`mobile/${name}`] || __DISCOURSE_RAW_TEMPLATES[name];
    }
    return __DISCOURSE_RAW_TEMPLATES[`javascripts/${name}`] || __DISCOURSE_RAW_TEMPLATES[name];
  }
  function buildRawConnectorCache(findOutlets) {
    let result = {};
    findOutlets(Object.keys(__DISCOURSE_RAW_TEMPLATES), (outletName, resource) => {
      result[outletName] ??= [];
      result[outletName].push({
        template: __DISCOURSE_RAW_TEMPLATES[resource]
      });
    });
    return result;
  }
  function eagerLoadRawTemplateModules() {
    for (const [key, value] of Object.entries(requirejs.entries)) {
      if (key.includes("/templates/") && value.deps.includes("discourse-common/lib/raw-templates")) {
        require(key);
      }
    }
  }
});