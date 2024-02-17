define("discourse/components/user-field", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse/components/user-fields/confirm", "discourse/components/user-fields/dropdown", "discourse/components/user-fields/multiselect", "discourse/components/user-fields/text"], function (_exports, _component, _templateFactory, _component2, _confirm, _dropdown, _multiselect, _text) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse/components/user-fields/confirm",0,"discourse/components/user-fields/dropdown",0,"discourse/components/user-fields/multiselect",0,"discourse/components/user-fields/text"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <this.userFieldComponent
    @field={{@field}}
    @value={{@value}}
    @class={{@class}}
    @validation={{@validation}}
  />
  */
  {
    "id": "tvh/FzsS",
    "block": "[[[8,[30,0,[\"userFieldComponent\"]],null,[[\"@field\",\"@value\",\"@class\",\"@validation\"],[[30,1],[30,2],[30,3],[30,4]]],null]],[\"@field\",\"@value\",\"@class\",\"@validation\"],false,[]]",
    "moduleName": "discourse/components/user-field.hbs",
    "isStrictMode": false
  });
  const COMPONENTS = {
    confirm: _confirm.default,
    dropdown: _dropdown.default,
    multiselect: _multiselect.default,
    text: _text.default
  };
  class UserFieldComponent extends _component2.default {
    get userFieldComponent() {
      return COMPONENTS[this.args.field.field_type];
    }
  }
  _exports.default = UserFieldComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserFieldComponent);
});