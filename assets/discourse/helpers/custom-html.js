define("discourse/helpers/custom-html", ["exports", "discourse/lib/preload-store", "@ember/template"], function (_exports, _preloadStore, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clearHTMLCache = clearHTMLCache;
  _exports.getCustomHTML = getCustomHTML;
  _exports.setCustomHTML = setCustomHTML;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/preload-store",0,"@ember/template"eaimeta@70e063a35619d71f
  let _customizations = {};
  function getCustomHTML(key) {
    const c = _customizations[key];
    if (c) {
      return (0, _template.htmlSafe)(c);
    }
    const html = _preloadStore.default.get("customHTML");
    if (html && html[key] && html[key].length) {
      return (0, _template.htmlSafe)(html[key]);
    }
  }
  function clearHTMLCache() {
    _customizations = {};
  }

  // Set a fragment of HTML by key. It can then be looked up with `getCustomHTML(key)`.
  function setCustomHTML(key, html) {
    _customizations[key] = html;
  }
});