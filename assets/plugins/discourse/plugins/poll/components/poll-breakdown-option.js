define("discourse/plugins/poll/components/poll-breakdown-option", ["exports", "@ember/component", "I18n", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/plugins/poll/lib/chart-colors", "@ember/template", "discourse/lib/computed"], function (_exports, _component, _I18n, _object, _decorators, _computed, _chartColors, _template, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/plugins/poll/lib/chart-colors",0,"@ember/template",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("option.votes", "totalVotes"), _dec2 = (0, _decorators.default)("optionsCount"), _dec3 = (0, _decorators.default)("highlighted"), _dec4 = (0, _decorators.default)("highlighted", "optionColors", "index"), (_obj = {
    // Arguments:
    option: null,
    index: null,
    totalVotes: null,
    optionsCount: null,
    displayMode: null,
    highlightedOption: null,
    onMouseOver: null,
    onMouseOut: null,
    tagName: "",
    highlighted: (0, _computed2.propertyEqual)("highlightedOption", "index"),
    showPercentage: (0, _computed.equal)("displayMode", "percentage"),
    percent(votes, total) {
      return _I18n.default.toNumber(votes / total * 100.0, {
        precision: 1
      });
    },
    optionColors(optionsCount) {
      return (0, _chartColors.getColors)(optionsCount);
    },
    colorBackgroundStyle(highlighted) {
      if (highlighted) {
        // TODO: Use CSS variables (#10341)
        return (0, _template.htmlSafe)("background: rgba(0, 0, 0, 0.1);");
      }
    },
    colorPreviewStyle(highlighted, optionColors, index) {
      const color = highlighted ? window.Chart.helpers.getHoverColor(optionColors[index]) : optionColors[index];
      return (0, _template.htmlSafe)(`background: ${color};`);
    },
    onHover(active) {
      if (active) {
        this.onMouseOver();
      } else {
        this.onMouseOut();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "percent", [_dec], Object.getOwnPropertyDescriptor(_obj, "percent"), _obj), _applyDecoratedDescriptor(_obj, "optionColors", [_dec2], Object.getOwnPropertyDescriptor(_obj, "optionColors"), _obj), _applyDecoratedDescriptor(_obj, "colorBackgroundStyle", [_dec3], Object.getOwnPropertyDescriptor(_obj, "colorBackgroundStyle"), _obj), _applyDecoratedDescriptor(_obj, "colorPreviewStyle", [_dec4], Object.getOwnPropertyDescriptor(_obj, "colorPreviewStyle"), _obj), _applyDecoratedDescriptor(_obj, "onHover", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onHover"), _obj)), _obj)));
  _exports.default = _default;
});