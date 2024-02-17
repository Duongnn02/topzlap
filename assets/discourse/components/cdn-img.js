define("discourse/components/cdn-img", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/template"], function (_exports, _component, _templateFactory, _decorators, _getUrl, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.src}}
    <img
      src={{this.cdnSrc}}
      width={{this.width}}
      height={{this.height}}
      style={{this.style}}
      alt=""
    />
  {{/if}}
  */
  {
    "id": "o771xwmc",
    "block": "[[[41,[30,0,[\"src\"]],[[[1,\"  \"],[10,\"img\"],[15,\"src\",[30,0,[\"cdnSrc\"]]],[15,\"width\",[30,0,[\"width\"]]],[15,\"height\",[30,0,[\"height\"]]],[15,5,[30,0,[\"style\"]]],[14,\"alt\",\"\"],[12],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\"]]",
    "moduleName": "discourse/components/cdn-img.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("src"), _dec2 = (0, _decorators.default)("width", "height"), (_obj = {
    tagName: "",
    cdnSrc(src) {
      return (0, _getUrl.getURLWithCDN)(src);
    },
    style(width, height) {
      if (width && height) {
        return (0, _template.htmlSafe)(`--aspect-ratio: ${width / height};`);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "cdnSrc", [_dec], Object.getOwnPropertyDescriptor(_obj, "cdnSrc"), _obj), _applyDecoratedDescriptor(_obj, "style", [_dec2], Object.getOwnPropertyDescriptor(_obj, "style"), _obj)), _obj))));
  _exports.default = _default;
});