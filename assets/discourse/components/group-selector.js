define("discourse/components/group-selector", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "discourse-common/lib/raw-templates", "@ember/utils"], function (_exports, _component, _templateFactory, _decorators, _I18n, _rawTemplates, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"discourse-common/lib/raw-templates",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <input
    placeholder={{this.placeholder}}
    class="group-selector"
    type="text"
    name="groups"
  />
  */
  {
    "id": "xrzpIVwv",
    "block": "[[[10,\"input\"],[15,\"placeholder\",[30,0,[\"placeholder\"]]],[14,0,\"group-selector\"],[14,3,\"groups\"],[14,4,\"text\"],[12],[13]],[],false,[]]",
    "moduleName": "discourse/components/group-selector.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("placeholderKey"), _dec2 = (0, _decorators.observes)("groupNames"), _dec3 = (0, _decorators.on)("didInsertElement"), (_obj = {
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
      let selectedGroups;
      let groupNames = this.groupNames;
      $(this.element.querySelector("input")).autocomplete({
        debounced: true,
        allowAny: false,
        items: Array.isArray(groupNames) ? groupNames : (0, _utils.isEmpty)(groupNames) ? [] : [groupNames],
        single: this.single,
        fullWidthWrap: this.fullWidthWrap,
        updateData: opts && opts.updateData ? opts.updateData : false,
        onChangeItems: items => {
          selectedGroups = items;
          if (this.onChangeCallback) {
            this.onChangeCallback(this.groupNames, selectedGroups);
          } else {
            this.set("groupNames", items.join(","));
          }
        },
        transformComplete: g => {
          return g.name;
        },
        dataSource: term => {
          return this.groupFinder(term).then(groups => {
            if (!selectedGroups) {
              return groups;
            }
            return groups.filter(group => {
              return !selectedGroups.any(s => s === group.name);
            });
          });
        },
        template: (0, _rawTemplates.findRawTemplate)("group-selector-autocomplete")
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj), _applyDecoratedDescriptor(_obj, "_update", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_update"), _obj), _applyDecoratedDescriptor(_obj, "_initializeAutocomplete", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_initializeAutocomplete"), _obj)), _obj))));
  _exports.default = _default;
});