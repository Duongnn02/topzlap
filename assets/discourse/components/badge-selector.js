define("discourse/components/badge-selector", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "discourse-common/lib/raw-templates", "discourse-common/lib/helpers"], function (_exports, _component, _templateFactory, _decorators, _I18n, _rawTemplates, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <input
    type="text"
    placeholder={{this.placeholder}}
    name="badges"
    class="ember-text-field badge-names"
  />
  */
  {
    "id": "H35wL86O",
    "block": "[[[10,\"input\"],[15,\"placeholder\",[30,0,[\"placeholder\"]]],[14,3,\"badges\"],[14,0,\"ember-text-field badge-names\"],[14,4,\"text\"],[12],[13]],[],false,[]]",
    "moduleName": "discourse/components/badge-selector.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("placeholderKey"), _dec2 = (0, _decorators.observes)("badgeNames"), _dec3 = (0, _decorators.on)("didInsertElement"), (_obj = {
    placeholder(placeholderKey) {
      return placeholderKey ? _I18n.default.t(placeholderKey) : "";
    },
    _update() {
      if (this.canReceiveUpdates === "true") {
        this._initializeAutocomplete({
          updateData: true
        });
      }
    },
    _initializeAutocomplete(opts) {
      let selectedBadges;
      $(this.element.querySelector("input")).autocomplete({
        allowAny: false,
        items: (0, _helpers.makeArray)(this.badgeNames),
        single: this.single,
        updateData: opts && opts.updateData ? opts.updateData : false,
        template: (0, _rawTemplates.findRawTemplate)("badge-selector-autocomplete"),
        onChangeItems(items) {
          selectedBadges = items;
          this.set("badgeNames", items.join(","));
        },
        transformComplete(g) {
          return g.name;
        },
        dataSource(term) {
          return this.badgeFinder(term).then(badges => {
            if (!selectedBadges) {
              return badges;
            }
            return badges.filter(badge => !selectedBadges.any(s => s === badge.name));
          });
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj), _applyDecoratedDescriptor(_obj, "_update", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_update"), _obj), _applyDecoratedDescriptor(_obj, "_initializeAutocomplete", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_initializeAutocomplete"), _obj)), _obj))));
  _exports.default = _default;
});