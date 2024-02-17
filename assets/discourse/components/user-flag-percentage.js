define("discourse/components/user-flag-percentage", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showPercentage}}
    <div title={{this.percentage.title}} class="user-flag-percentage">
      <span
        class="percentage-label {{this.percentage.className}}"
      >{{this.percentage.label}}</span>
      {{d-icon this.percentage.icon}}
    </div>
  {{/if}}
  */
  {
    "id": "PzzJcGil",
    "block": "[[[41,[30,0,[\"showPercentage\"]],[[[1,\"  \"],[10,0],[15,\"title\",[30,0,[\"percentage\",\"title\"]]],[14,0,\"user-flag-percentage\"],[12],[1,\"\\n    \"],[10,1],[15,0,[29,[\"percentage-label \",[30,0,[\"percentage\",\"className\"]]]]],[12],[1,[30,0,[\"percentage\",\"label\"]]],[13],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"percentage\",\"icon\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-icon\"]]",
    "moduleName": "discourse/components/user-flag-percentage.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("percentage"), _dec2 = (0, _decorators.default)("agreed", "disagreed", "ignored"), (_obj = {
    tagName: "",
    showPercentage(percentage) {
      return percentage.total >= 3;
    },
    percentage(agreed, disagreed, ignored) {
      let total = agreed + disagreed + ignored;
      let result = {
        total
      };
      if (total > 0) {
        result.agreed = Math.round(agreed / total * 100);
        result.disagreed = Math.round(disagreed / total * 100);
        result.ignored = Math.round(ignored / total * 100);
      }
      let highest = Math.max(agreed, disagreed, ignored);
      if (highest === agreed) {
        result.icon = "thumbs-up";
        result.className = "agreed";
        result.label = `${result.agreed}%`;
      } else if (highest === disagreed) {
        result.icon = "thumbs-down";
        result.className = "disagreed";
        result.label = `${result.disagreed}%`;
      } else {
        result.icon = "external-link-alt";
        result.className = "ignored";
        result.label = `${result.ignored}%`;
      }
      result.title = _I18n.default.t("review.user_percentage.summary", {
        agreed: _I18n.default.t("review.user_percentage.agreed", {
          count: result.agreed
        }),
        disagreed: _I18n.default.t("review.user_percentage.disagreed", {
          count: result.disagreed
        }),
        ignored: _I18n.default.t("review.user_percentage.ignored", {
          count: result.ignored
        }),
        count: total
      });
      return result;
    }
  }, (_applyDecoratedDescriptor(_obj, "showPercentage", [_dec], Object.getOwnPropertyDescriptor(_obj, "showPercentage"), _obj), _applyDecoratedDescriptor(_obj, "percentage", [_dec2], Object.getOwnPropertyDescriptor(_obj, "percentage"), _obj)), _obj))));
  _exports.default = _default;
});