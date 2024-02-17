define("discourse/components/composer-fullscreen-prompt", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class="composer-fullscreen-prompt"
    {{on "animationend" @removeFullScreenExitPrompt}}
  >
    {{html-safe (i18n "composer.exit_fullscreen_prompt")}}
  </div>
  */
  {
    "id": "inbDeZ+q",
    "block": "[[[11,0],[24,0,\"composer-fullscreen-prompt\"],[4,[38,0],[\"animationend\",[30,1]],null],[12],[1,\"\\n  \"],[1,[28,[35,1],[[28,[37,2],[\"composer.exit_fullscreen_prompt\"],null]],null]],[1,\"\\n\"],[13]],[\"@removeFullScreenExitPrompt\"],false,[\"on\",\"html-safe\",\"i18n\"]]",
    "moduleName": "discourse/components/composer-fullscreen-prompt.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});