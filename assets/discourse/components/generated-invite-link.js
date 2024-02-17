define("discourse/components/generated-invite-link", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>{{i18n "user.invited.link_generated"}}</p>
  <p>
    <input value={{this.link}} class="invite-link-input" type="text" />
  </p>
  {{#if this.email}}
    <p>{{i18n "user.invited.valid_for" email=this.email}}</p>
  {{/if}}
  */
  {
    "id": "cN5BYJjK",
    "block": "[[[10,2],[12],[1,[28,[35,0],[\"user.invited.link_generated\"],null]],[13],[1,\"\\n\"],[10,2],[12],[1,\"\\n  \"],[10,\"input\"],[15,2,[30,0,[\"link\"]]],[14,0,\"invite-link-input\"],[14,4,\"text\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[41,[30,0,[\"email\"]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,0],[\"user.invited.valid_for\"],[[\"email\"],[[30,0,[\"email\"]]]]]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"i18n\",\"if\"]]",
    "moduleName": "discourse/components/generated-invite-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    didInsertElement() {
      this._super(...arguments);
      const invite = this.element.querySelector(".invite-link-input");
      invite.focus();
      invite.select();
    }
  }));
  _exports.default = _default;
});