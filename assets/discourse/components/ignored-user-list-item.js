define("discourse/components/ignored-user-list-item", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="ignored-user-list-item">
    <span class="ignored-user-name">{{this.item}}</span>
    <DButton
      @class="remove-ignored-user no-text btn-icon"
      @action={{action "removeIgnoredUser" this.item}}
      @icon="times"
    />
  </div>
  */
  {
    "id": "+uqZF9Fq",
    "block": "[[[10,0],[14,0,\"ignored-user-list-item\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"ignored-user-name\"],[12],[1,[30,0,[\"item\"]]],[13],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@icon\"],[\"remove-ignored-user no-text btn-icon\",[28,[37,1],[[30,0],\"removeIgnoredUser\",[30,0,[\"item\"]]],null],\"times\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/ignored-user-list-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "div",
    items: null,
    actions: {
      removeIgnoredUser(item) {
        this.onRemoveIgnoredUser(item);
      }
    }
  }));
  _exports.default = _default;
});