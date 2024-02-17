define("discourse/components/google-search", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "discourse-common/lib/get-url"], function (_exports, _component, _templateFactory, _computed, _decorators, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <form action="//google.com/search" id="google-search" class="inline-form">
    <input
      type="text"
      name="q"
      aria-label={{i18n "search.search_google"}}
      value={{this.searchTerm}}
    />
    <input name="as_sitesearch" value={{this.siteUrl}} type="hidden" />
    <button class="btn btn-primary" type="submit">{{i18n
        "search.search_google_button"
      }}</button>
  </form>
  */
  {
    "id": "g2bohitX",
    "block": "[[[10,\"form\"],[14,\"action\",\"//google.com/search\"],[14,1,\"google-search\"],[14,0,\"inline-form\"],[12],[1,\"\\n  \"],[10,\"input\"],[14,3,\"q\"],[15,\"aria-label\",[28,[37,0],[\"search.search_google\"],null]],[15,2,[30,0,[\"searchTerm\"]]],[14,4,\"text\"],[12],[13],[1,\"\\n  \"],[10,\"input\"],[14,3,\"as_sitesearch\"],[15,2,[30,0,[\"siteUrl\"]]],[14,4,\"hidden\"],[12],[13],[1,\"\\n  \"],[10,\"button\"],[14,0,\"btn btn-primary\"],[14,4,\"submit\"],[12],[1,[28,[35,0],[\"search.search_google_button\"],null]],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\"]]",
    "moduleName": "discourse/components/google-search.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    classNames: ["google-search-form"],
    classNameBindings: ["hidden:hidden"],
    hidden: (0, _computed.alias)("siteSettings.login_required"),
    siteUrl() {
      return `${location.protocol}//${location.host}${(0, _getUrl.default)("/")}`;
    }
  }, (_applyDecoratedDescriptor(_obj, "siteUrl", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "siteUrl"), _obj)), _obj)));
  _exports.default = _default;
});