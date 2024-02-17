define("discourse/components/group-activity-filter", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <LinkTo
    @route={{concat "group.activity." this.filter}}
    @query={{hash category_id=this.categoryId}}
  >
    {{i18n (concat "groups." this.filter)}}
  </LinkTo>
  */
  {
    "id": "BgR64wzx",
    "block": "[[[8,[39,0],null,[[\"@route\",\"@query\"],[[28,[37,1],[\"group.activity.\",[30,0,[\"filter\"]]],null],[28,[37,2],null,[[\"category_id\"],[[30,0,[\"categoryId\"]]]]]]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,3],[[28,[37,1],[\"groups.\",[30,0,[\"filter\"]]],null]],null]],[1,\"\\n\"]],[]]]]]],[],false,[\"link-to\",\"concat\",\"hash\",\"i18n\"]]",
    "moduleName": "discourse/components/group-activity-filter.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "li"
  }));
  _exports.default = _default;
});