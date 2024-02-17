define("discourse/components/cancel-link", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <LinkTo @route={{this.route}} @model={{this.args}} class="cancel">
    {{i18n "cancel"}}
  </LinkTo>
  */
  {
    "id": "r/AlY24q",
    "block": "[[[8,[39,0],[[24,0,\"cancel\"]],[[\"@route\",\"@model\"],[[30,0,[\"route\"]],[30,0,[\"args\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[\"cancel\"],null]],[1,\"\\n\"]],[]]]]]],[],false,[\"link-to\",\"i18n\"]]",
    "moduleName": "discourse/components/cancel-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});