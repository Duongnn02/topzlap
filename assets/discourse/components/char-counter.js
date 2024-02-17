define("discourse/components/char-counter", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class={{concat-class "char-counter" (if (gt @value.length @max) "exceeded")}}
    ...attributes
  >
    {{yield}}
    <small class="char-counter__ratio">
      {{@value.length}}/{{@max}}
    </small>
    <span aria-live="polite" class="sr-only">
      {{if (gt @value.length @max) (i18n "char_counter.exceeded")}}
    </span>
  </div>
  */
  {
    "id": "V+rYmbch",
    "block": "[[[11,0],[16,0,[28,[37,0],[\"char-counter\",[52,[28,[37,2],[[30,1,[\"length\"]],[30,2]],null],\"exceeded\"]],null]],[17,3],[12],[1,\"\\n  \"],[18,4,null],[1,\"\\n  \"],[10,\"small\"],[14,0,\"char-counter__ratio\"],[12],[1,\"\\n    \"],[1,[30,1,[\"length\"]]],[1,\"/\"],[1,[30,2]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[14,\"aria-live\",\"polite\"],[14,0,\"sr-only\"],[12],[1,\"\\n    \"],[1,[52,[28,[37,2],[[30,1,[\"length\"]],[30,2]],null],[28,[37,4],[\"char_counter.exceeded\"],null]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@value\",\"@max\",\"&attrs\",\"&default\"],false,[\"concat-class\",\"if\",\"gt\",\"yield\",\"i18n\"]]",
    "moduleName": "discourse/components/char-counter.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});