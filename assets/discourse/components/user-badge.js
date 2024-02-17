define("discourse/components/user-badge", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a class="user-card-badge-link" href={{this.badgeUrl}}>
    <BadgeButton @badge={{@badge}}>
      {{#if this.showGrantCount}}
        <span class="count">&nbsp;(&times;{{@count}})</span>
      {{/if}}
    </BadgeButton>
  </a>
  */
  {
    "id": "dzTGBxDW",
    "block": "[[[10,3],[14,0,\"user-card-badge-link\"],[15,6,[30,0,[\"badgeUrl\"]]],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@badge\"],[[30,1]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"showGrantCount\"]],[[[1,\"      \"],[10,1],[14,0,\"count\"],[12],[1,\" (×\"],[1,[30,2]],[1,\")\"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"],[13]],[\"@badge\",\"@count\"],false,[\"badge-button\",\"if\"]]",
    "moduleName": "discourse/components/user-badge.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("count"), _dec2 = (0, _decorators.default)("badge", "user"), (_obj = {
    tagName: "",
    showGrantCount(count) {
      return count && count > 1;
    },
    badgeUrl() {
      // NOTE: I tried using a link-to helper here but the queryParams mean it fails
      let username = this.get("user.username_lower") || "";
      username = username !== "" ? "?username=" + username : "";
      return this.get("badge.url") + username;
    }
  }, (_applyDecoratedDescriptor(_obj, "showGrantCount", [_dec], Object.getOwnPropertyDescriptor(_obj, "showGrantCount"), _obj), _applyDecoratedDescriptor(_obj, "badgeUrl", [_dec2], Object.getOwnPropertyDescriptor(_obj, "badgeUrl"), _obj)), _obj))));
  _exports.default = _default;
});