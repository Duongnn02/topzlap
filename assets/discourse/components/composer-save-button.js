define("discourse/components/composer-save-button", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "I18n", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _component2, _I18n, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"I18n",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @translatedTitle={{this.translatedTitle}}
    @label={{@label}}
    @action={{@action}}
    @icon={{@icon}}
    @forwardEvent={{@forwardEvent}}
    class="btn-primary create {{if @disabledSubmit 'disabled'}}"
    ...attributes
  />
  */
  {
    "id": "WCQq3SOQ",
    "block": "[[[8,[39,0],[[16,0,[29,[\"btn-primary create \",[52,[30,1],\"disabled\"]]]],[17,2]],[[\"@translatedTitle\",\"@label\",\"@action\",\"@icon\",\"@forwardEvent\"],[[30,0,[\"translatedTitle\"]],[30,3],[30,4],[30,5],[30,6]]],null]],[\"@disabledSubmit\",\"&attrs\",\"@label\",\"@action\",\"@icon\",\"@forwardEvent\"],false,[\"d-button\",\"if\"]]",
    "moduleName": "discourse/components/composer-save-button.hbs",
    "isStrictMode": false
  });
  class ComposerSaveButton extends _component2.default {
    get translatedTitle() {
      return _I18n.default.t("composer.title", {
        modifier: (0, _utilities.translateModKey)("Meta+")
      });
    }
  }
  _exports.default = ComposerSaveButton;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ComposerSaveButton);
});