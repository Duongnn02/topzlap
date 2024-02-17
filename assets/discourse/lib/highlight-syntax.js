define("discourse/lib/highlight-syntax", ["exports", "discourse/lib/load-script", "discourse/lib/highlight-syntax-merge-html-plugin"], function (_exports, _loadScript, _highlightSyntaxMergeHtmlPlugin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = highlightSyntax;
  _exports.registerHighlightJSLanguage = registerHighlightJSLanguage;
  _exports.registerHighlightJSPlugin = registerHighlightJSPlugin;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/load-script",0,"discourse/lib/highlight-syntax-merge-html-plugin"eaimeta@70e063a35619d71f
  /*global hljs:true */
  let _moreLanguages = [];
  let _plugins = [];
  let _initialized = false;
  function highlightSyntax(elem, siteSettings, session) {
    if (!elem) {
      return;
    }
    const selector = siteSettings.autohighlight_all_code ? "pre code" : "pre code[class]";
    const codeblocks = elem.querySelectorAll(selector);
    if (!codeblocks.length) {
      return;
    }
    const path = session.highlightJsPath;
    if (!path) {
      return;
    }
    return (0, _loadScript.default)(path).then(() => {
      initializer();
      codeblocks.forEach(e => {
        // Large code blocks can cause crashes or slowdowns
        if (e.innerHTML.length > 30000) {
          return;
        }
        e.classList.remove("lang-auto");
        hljs.highlightElement(e);
      });
    });
  }
  function registerHighlightJSLanguage(name, fn) {
    _moreLanguages.push({
      name,
      fn
    });
  }
  function registerHighlightJSPlugin(plugin) {
    _plugins.push(plugin);
  }
  function customHighlightJSLanguages() {
    _moreLanguages.forEach(l => {
      if (hljs.getLanguage(l.name) === undefined) {
        hljs.registerLanguage(l.name, l.fn);
      }
    });
  }
  function customHighlightJSPlugins() {
    _plugins.forEach(p => {
      hljs.addPlugin(p);
    });
  }
  function initializer() {
    if (!_initialized) {
      customHighlightJSLanguages();
      customHighlightJSPlugins();
      hljs.addPlugin(_highlightSyntaxMergeHtmlPlugin.default);
      hljs.configure({
        ignoreUnescapedHTML: true
      });
      _initialized = true;
    }
  }
});