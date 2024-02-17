define("discourse/components/count-i18n", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@ember/template"], function (_exports, _component, _templateFactory, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.i18nCount}}
  */
  {
    "id": "xtZTkig+",
    "block": "[[[1,[30,0,[\"i18nCount\"]]]],[],false,[]]",
    "moduleName": "discourse/components/count-i18n.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "span",
    i18nCount: null,
    didReceiveAttrs() {
      this._super(...arguments);
      let fullKey = this.key + (this.suffix || "");
      if (this.currentUser?.new_new_view_enabled && fullKey === "topic_count_new") {
        fullKey = "topic_count_latest";
      }
      this.set("i18nCount", (0, _template.htmlSafe)(_I18n.default.t(fullKey, {
        count: this.count
      })));
    }
  }));
  _exports.default = _default;
});