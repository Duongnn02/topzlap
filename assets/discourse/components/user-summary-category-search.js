define("discourse/components/user-summary-category-search", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @count}}
    <LinkTo @route="full-page-search" @query={{hash q=this.searchParams}}>
      {{@count}}
    </LinkTo>
  {{else}}
    &ndash;
  {{/if}}
  */
  {
    "id": "flfRzyWe",
    "block": "[[[41,[30,1],[[[1,\"  \"],[8,[39,1],null,[[\"@route\",\"@query\"],[\"full-page-search\",[28,[37,2],null,[[\"q\"],[[30,0,[\"searchParams\"]]]]]]],[[\"default\"],[[[[1,\"\\n    \"],[1,[30,1]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"  –\\n\"]],[]]]],[\"@count\"],false,[\"if\",\"link-to\",\"hash\"]]",
    "moduleName": "discourse/components/user-summary-category-search.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("user", "category"), (_obj = {
    tagName: "",
    searchParams() {
      return `@${this.get("user.username")} #${this.get("category.slug")}`;
    }
  }, (_applyDecoratedDescriptor(_obj, "searchParams", [_dec], Object.getOwnPropertyDescriptor(_obj, "searchParams"), _obj)), _obj))));
  _exports.default = _default;
});