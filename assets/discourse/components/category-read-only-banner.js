define("discourse/components/category-read-only-banner", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _computed, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.shouldShow}}
    <div class="row">
      <div class="alert alert-info category-read-only-banner">
        {{html-safe this.category.read_only_banner}}
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "/z0WbsYv",
    "block": "[[[41,[30,0,[\"shouldShow\"]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"alert alert-info category-read-only-banner\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[[30,0,[\"category\",\"read_only_banner\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"html-safe\"]]",
    "moduleName": "discourse/components/category-read-only-banner.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    user() {
      return this.currentUser;
    },
    shouldShow: (0, _computed.and)("category.read_only_banner", "readOnly", "user")
  }, (_applyDecoratedDescriptor(_obj, "user", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "user"), _obj)), _obj)));
  _exports.default = _default;
});