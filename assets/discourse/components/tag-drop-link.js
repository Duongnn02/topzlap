define("discourse/components/tag-drop-link", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/url", "discourse-common/utils/decorators", "discourse-common/lib/get-url"], function (_exports, _component, _templateFactory, _url, _decorators, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/url",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.tagId}}
  */
  {
    "id": "vzIVmx5d",
    "block": "[[[1,[30,0,[\"tagId\"]]]],[],false,[]]",
    "moduleName": "discourse/components/tag-drop-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("tagId", "category"), _dec2 = (0, _decorators.default)("tagId"), (_obj = {
    tagName: "a",
    classNameBindings: [":tag-badge-wrapper", ":badge-wrapper", ":bullet", "tagClass"],
    attributeBindings: ["href"],
    href(tagId, category) {
      let path;
      if (category) {
        path = "/tags" + category.path + "/" + tagId;
      } else {
        path = "/tag/" + tagId;
      }
      return (0, _getUrl.default)(path);
    },
    tagClass(tagId) {
      return "tag-" + tagId;
    },
    click(e) {
      e.preventDefault();
      _url.default.routeTo(this.href);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "href", [_dec], Object.getOwnPropertyDescriptor(_obj, "href"), _obj), _applyDecoratedDescriptor(_obj, "tagClass", [_dec2], Object.getOwnPropertyDescriptor(_obj, "tagClass"), _obj)), _obj))));
  _exports.default = _default;
});