define("discourse/components/search-text-field", ["exports", "discourse-common/utils/decorators", "I18n", "discourse/components/text-field", "discourse/lib/search"], function (_exports, _decorators, _I18n, _textField, _search) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"I18n",0,"discourse/components/text-field",0,"discourse/lib/search"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _textField.default.extend((_dec = (0, _decorators.default)("searchService.searchContextEnabled"), _dec2 = (0, _decorators.on)("didInsertElement"), (_obj = {
    autocomplete: "off",
    placeholder(searchContextEnabled) {
      return searchContextEnabled ? "" : _I18n.default.t("search.full_page_title");
    },
    becomeFocused() {
      const $searchInput = $(this.element);
      (0, _search.applySearchAutocomplete)($searchInput, this.siteSettings);
      if (!this.hasAutofocus) {
        return;
      }
      // iOS is crazy, without this we will not be
      // at the top of the page
      $(window).scrollTop(0);
      $searchInput.focus();
    }
  }, (_applyDecoratedDescriptor(_obj, "placeholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj), _applyDecoratedDescriptor(_obj, "becomeFocused", [_dec2], Object.getOwnPropertyDescriptor(_obj, "becomeFocused"), _obj)), _obj)));
  _exports.default = _default;
});