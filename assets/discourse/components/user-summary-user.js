define("discourse/components/user-summary-user", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <UserInfo @user={{@user}}>
    {{d-icon @icon}}
    <span class={{@countClass}}>{{number @user.count}}</span>
  </UserInfo>
  */
  {
    "id": "YVbucpIN",
    "block": "[[[8,[39,0],null,[[\"@user\"],[[30,1]]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[[30,2]],null]],[1,\"\\n  \"],[10,1],[15,0,[30,3]],[12],[1,[28,[35,2],[[30,1,[\"count\"]]],null]],[13],[1,\"\\n\"]],[]]]]]],[\"@user\",\"@icon\",\"@countClass\"],false,[\"user-info\",\"d-icon\",\"number\"]]",
    "moduleName": "discourse/components/user-summary-user.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "li"
  }));
  _exports.default = _default;
});