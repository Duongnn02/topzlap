define("discourse/components/custom-html", ["exports", "@ember/template-factory", "@ember/component", "discourse/helpers/custom-html", "discourse-common/lib/get-owner", "discourse-common/lib/deprecated"], function (_exports, _templateFactory, _component, _customHtml, _getOwner, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/helpers/custom-html",0,"discourse-common/lib/get-owner",0,"ember-cli-htmlbars",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    triggerAppEvent: null,
    init() {
      this._super(...arguments);
      const name = this.name;
      const html = (0, _customHtml.getCustomHTML)(name);
      if (html) {
        this.set("html", html);
        this.set("layout", (0, _templateFactory.createTemplateFactory)(
        /*
          {{this.html}}
        */
        {
          "id": "vq7QF/DL",
          "block": "[[[1,[30,0,[\"html\"]]]],[],false,[]]",
          "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/components/custom-html.js",
          "isStrictMode": false
        }));
      } else {
        const template = (0, _getOwner.getOwner)(this).lookup(`template:${name}`);
        if (template) {
          (0, _deprecated.default)("Defining an hbs template for CustomHTML rendering is deprecated. Use plugin outlets instead.", {
            id: "discourse.custom_html_template"
          });
          this.set("layout", template);
        }
      }
    },
    didInsertElement() {
      this._super(...arguments);
      if (this.triggerAppEvent === "true") {
        this.appEvents.trigger(`inserted-custom-html:${this.name}`);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      if (this.triggerAppEvent === "true") {
        this.appEvents.trigger(`destroyed-custom-html:${this.name}`);
      }
    }
  });
  _exports.default = _default;
});