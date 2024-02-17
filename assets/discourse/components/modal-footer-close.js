define("discourse/components/modal-footer-close", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{route-action "closeModal"}}
      @label="close"
    />
  </div>
  */
  {
    "id": "GXOYbIIB",
    "block": "[[[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,1],[\"closeModal\"],null],\"close\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/components/modal-footer-close.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});