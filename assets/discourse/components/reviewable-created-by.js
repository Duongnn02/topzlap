define("discourse/components/reviewable-created-by", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="created-by">
    {{#if this.user}}
      <UserLink @user={{this.user}}>{{avatar
          this.user
          imageSize="large"
        }}</UserLink>
    {{else}}
      {{d-icon "far-trash-alt" class="deleted-user-avatar"}}
    {{/if}}
  </div>
  */
  {
    "id": "1b0dD0sL",
    "block": "[[[10,0],[14,0,\"created-by\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\"]],[[[1,\"    \"],[8,[39,1],null,[[\"@user\"],[[30,0,[\"user\"]]]],[[\"default\"],[[[[1,[28,[35,2],[[30,0,[\"user\"]]],[[\"imageSize\"],[\"large\"]]]]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,3],[\"far-trash-alt\"],[[\"class\"],[\"deleted-user-avatar\"]]]],[1,\"\\n\"]],[]]],[13]],[],false,[\"if\",\"user-link\",\"avatar\",\"d-icon\"]]",
    "moduleName": "discourse/components/reviewable-created-by.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});