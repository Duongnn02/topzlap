define("discourse/templates/modal", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModal
    @modalClass={{this.modalClass}}
    @title={{this.title}}
    @titleAriaElementId={{this.titleAriaElementId}}
    @subtitle={{this.subtitle}}
    @panels={{this.panels}}
    @selectedPanel={{this.selectedPanel}}
    @onSelectPanel={{this.onSelectPanel}}
    @class="hidden"
    @errors={{this.errors}}
    @closeModal={{route-action "closeModal"}}
  >
    {{outlet "modalBody"}}
  </DModal>
  */
  {
    "id": "j+CBLED8",
    "block": "[[[8,[39,0],null,[[\"@modalClass\",\"@title\",\"@titleAriaElementId\",\"@subtitle\",\"@panels\",\"@selectedPanel\",\"@onSelectPanel\",\"@class\",\"@errors\",\"@closeModal\"],[[30,0,[\"modalClass\"]],[30,0,[\"title\"]],[30,0,[\"titleAriaElementId\"]],[30,0,[\"subtitle\"]],[30,0,[\"panels\"]],[30,0,[\"selectedPanel\"]],[30,0,[\"onSelectPanel\"]],\"hidden\",[30,0,[\"errors\"]],[28,[37,1],[\"closeModal\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[46,[28,[37,3],[\"modalBody\"],null],null,null,null],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal\",\"route-action\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/modal.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});