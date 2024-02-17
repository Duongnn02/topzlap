define("select-kit/components/tags-intersection-chooser", ["exports", "discourse/lib/url", "select-kit/components/mini-tag-chooser", "discourse-common/lib/helpers", "@ember/object"], function (_exports, _url, _miniTagChooser, _helpers, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"select-kit/components/mini-tag-chooser",0,"discourse-common/lib/helpers",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _miniTagChooser.default.extend((_obj = {
    pluginApiIdentifiers: ["tags-intersection-chooser"],
    attributeBindings: ["selectKit.options.categoryId:category-id"],
    classNames: ["tags-intersection-chooser"],
    mainTag: null,
    additionalTags: null,
    didReceiveAttrs() {
      this._super(...arguments);
      this.set("value", (0, _helpers.makeArray)(this.mainTag).concat((0, _helpers.makeArray)(this.additionalTags)));
    },
    onChange(tags) {
      if (tags.includes(this.mainTag)) {
        const remainingTags = tags.filter(t => t !== this.mainTag);
        if (remainingTags.length >= 1) {
          _url.default.routeTo(`/tags/intersection/${this.mainTag}/${remainingTags.join("/")}`);
        } else {
          _url.default.routeTo("/tags");
        }
      } else {
        if (tags.length >= 2) {
          _url.default.routeTo(`/tags/intersection/${tags.join("/")}`);
        } else {
          _url.default.routeTo("/tags");
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChange"), _obj)), _obj));
  _exports.default = _default;
});