define("discourse/components/topic-timeline/back-button", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @type="button"
    @class="btn-primary btn-small back-button"
    @title={{i18n "topic.timeline.back_description"}}
    @action={{@onGoBack}}
  >
    {{i18n "topic.timeline.back"}}
  </DButton>
  */
  {
    "id": "tOeW8raQ",
    "block": "[[[8,[39,0],null,[[\"@type\",\"@class\",\"@title\",\"@action\"],[\"button\",\"btn-primary btn-small back-button\",[28,[37,1],[\"topic.timeline.back_description\"],null],[30,1]]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[\"topic.timeline.back\"],null]],[1,\"\\n\"]],[]]]]]],[\"@onGoBack\"],false,[\"d-button\",\"i18n\"]]",
    "moduleName": "discourse/components/topic-timeline/back-button.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});