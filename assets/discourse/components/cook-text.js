define("discourse/components/cook-text", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/ajax", "discourse/lib/text", "discourse/lib/load-oneboxes", "pretty-text/upload-short-url"], function (_exports, _component, _templateFactory, _ajax, _text, _loadOneboxes, _uploadShortUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/ajax",0,"discourse/lib/text",0,"discourse/lib/load-oneboxes",0,"pretty-text/upload-short-url"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.cooked}}
  */
  {
    "id": "H1GBkE6g",
    "block": "[[[1,[30,0,[\"cooked\"]]]],[],false,[]]",
    "moduleName": "discourse/components/cook-text.hbs",
    "isStrictMode": false
  });
  const CookText = _component.default.extend({
    cooked: null,
    didReceiveAttrs() {
      this._super(...arguments);
      (0, _text.cookAsync)(this.rawText).then(cooked => {
        this.set("cooked", cooked);
      });
    },
    didRender() {
      this._super(...arguments);
      if (this.paintOneboxes) {
        (0, _loadOneboxes.loadOneboxes)(this.element, _ajax.ajax, this.topicId, this.categoryId, this.siteSettings.max_oneboxes_per_post, false // refresh
        );
      }

      (0, _uploadShortUrl.resolveAllShortUrls)(_ajax.ajax, this.siteSettings, this.element, this.opts);
    }
  });
  CookText.reopenClass({
    positionalParams: ["rawText"]
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, CookText);
  _exports.default = _default;
});