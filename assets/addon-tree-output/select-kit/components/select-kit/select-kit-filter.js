define("select-kit/components/select-kit/select-kit-filter", ["exports", "@ember/component", "I18n", "select-kit/mixins/utils", "@ember/object", "discourse-common/utils/decorators", "@ember/utils", "select-kit/templates/components/select-kit/select-kit-filter", "@ember/object/computed"], function (_exports, _component, _I18n, _utils, _object, _decorators, _utils2, _selectKitFilter, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"select-kit/mixins/utils",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"select-kit/templates/components/select-kit/select-kit-filter",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend(_utils.default, (_dec = (0, _decorators.default)("selectKit.options.filterPlaceholder", "selectKit.options.translatedFilterPlaceholder", "selectKit.options.allowAny"), (_obj = {
    layout: _selectKitFilter.default,
    classNames: ["select-kit-filter"],
    classNameBindings: ["isExpanded:is-expanded"],
    attributeBindings: ["role"],
    tabIndex: -1,
    isHidden: (0, _object.computed)("selectKit.options.{filterable,allowAny,autoFilterable}", "content.[]", function () {
      return !this.selectKit.options.filterable && !this.selectKit.options.allowAny && !this.selectKit.options.autoFilterable;
    }),
    isExpanded: (0, _computed.not)("isHidden"),
    placeholder(placeholder, translatedPlaceholder) {
      if ((0, _utils2.isPresent)(translatedPlaceholder)) {
        return translatedPlaceholder;
      }
      if ((0, _utils2.isPresent)(placeholder)) {
        return _I18n.default.t(placeholder);
      }
      return _I18n.default.t(this.selectKit.options.allowAny ? "select_kit.filter_placeholder_with_any" : "select_kit.filter_placeholder");
    },
    onPaste() {},
    onInput(event) {
      this.selectKit.onInput(event);
      return true;
    },
    onKeyup(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return true;
    },
    onKeydown(event) {
      if (!this.selectKit.onKeydown(event)) {
        return false;
      }
      if (event.key === "Tab" && this.selectKit.isLoading) {
        this.selectKit.cancelSearch();
        this.selectKit.close(event);
        return true;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        return true;
      }
      if (event.key === "ArrowUp") {
        this.selectKit.highlightLast();
        event.preventDefault();
        return false;
      }
      if (event.key === "ArrowDown") {
        this.selectKit.highlightFirst();
        event.preventDefault();
        return false;
      }
      if (event.key === "Escape") {
        this.selectKit.close(event);
        this.selectKit.headerElement().focus();
        return false;
      }
      if (event.key === "Enter" && this.selectKit.highlighted) {
        this.selectKit.select(this.getValue(this.selectKit.highlighted), this.selectKit.highlighted);
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
      if (event.key === "Enter" && (!this.selectKit.highlighted || this.selectKit.enterDisabled)) {
        this.element.querySelector("input").focus();
        if (this.selectKit.enterDisabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
        return false;
      }
      this.selectKit.set("highlighted", null);
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj), _applyDecoratedDescriptor(_obj, "onPaste", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onPaste"), _obj), _applyDecoratedDescriptor(_obj, "onInput", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onInput"), _obj), _applyDecoratedDescriptor(_obj, "onKeyup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onKeyup"), _obj), _applyDecoratedDescriptor(_obj, "onKeydown", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onKeydown"), _obj)), _obj)));
  _exports.default = _default;
});