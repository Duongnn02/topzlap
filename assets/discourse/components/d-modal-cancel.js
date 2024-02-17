define("discourse/components/d-modal-cancel", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @class="btn-flat d-modal-cancel"
    @action={{action this.close}}
    @translatedLabel={{i18n "cancel"}}
  />
  */
  {
    "id": "Cf3i/s6Z",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@action\",\"@translatedLabel\"],[\"btn-flat d-modal-cancel\",[28,[37,1],[[30,0],[30,0,[\"close\"]]],null],[28,[37,2],[\"cancel\"],null]]],null]],[],false,[\"d-button\",\"action\",\"i18n\"]]",
    "moduleName": "discourse/components/d-modal-cancel.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: ""
  }));
  _exports.default = _default;
});