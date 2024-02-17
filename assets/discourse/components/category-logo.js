define("discourse/components/category-logo", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="category-logo aspect-image">
    {{#if (and @category.uploaded_logo.url @category.uploaded_logo_dark.url)}}
      <picture>
        <source
          srcset={{@category.uploaded_logo_dark.url}}
          width={{@category.uploaded_logo_dark.width}}
          height={{@category.uploaded_logo_dark.height}}
          media="(prefers-color-scheme: dark)"
        />
        <CdnImg
          @src={{this.defaultCategoryLogo.url}}
          @width={{this.defaultCategoryLogo.width}}
          @height={{this.defaultCategoryLogo.height}}
        />
      </picture>
    {{else if @category.uploaded_logo.url}}
      <CdnImg
        @src={{@category.uploaded_logo.url}}
        @width={{@category.uploaded_logo.width}}
        @height={{@category.uploaded_logo.height}}
      />
    {{/if}}
  </div>
  */
  {
    "id": "6dTe8CI5",
    "block": "[[[10,0],[14,0,\"category-logo aspect-image\"],[12],[1,\"\\n\"],[41,[28,[37,1],[[30,1,[\"uploaded_logo\",\"url\"]],[30,1,[\"uploaded_logo_dark\",\"url\"]]],null],[[[1,\"    \"],[10,\"picture\"],[12],[1,\"\\n      \"],[10,\"source\"],[15,\"srcset\",[30,1,[\"uploaded_logo_dark\",\"url\"]]],[15,\"width\",[30,1,[\"uploaded_logo_dark\",\"width\"]]],[15,\"height\",[30,1,[\"uploaded_logo_dark\",\"height\"]]],[14,\"media\",\"(prefers-color-scheme: dark)\"],[12],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@src\",\"@width\",\"@height\"],[[30,0,[\"defaultCategoryLogo\",\"url\"]],[30,0,[\"defaultCategoryLogo\",\"width\"]],[30,0,[\"defaultCategoryLogo\",\"height\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[30,1,[\"uploaded_logo\",\"url\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@src\",\"@width\",\"@height\"],[[30,1,[\"uploaded_logo\",\"url\"]],[30,1,[\"uploaded_logo\",\"width\"]],[30,1,[\"uploaded_logo\",\"height\"]]]],null],[1,\"\\n  \"]],[]],null]],[]]],[13]],[\"@category\"],false,[\"if\",\"and\",\"cdn-img\"]]",
    "moduleName": "discourse/components/category-logo.hbs",
    "isStrictMode": false
  });
  let CategoryLogo = (_class = class CategoryLogo extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    get defaultCategoryLogo() {
      // use dark logo by default in edge case
      // when scheme is dark and dark logo is present
      if (this.session.defaultColorSchemeIsDark && this.args.category.uploaded_logo_dark) {
        return this.args.category.uploaded_logo_dark;
      }
      return this.args.category.uploaded_logo;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = CategoryLogo;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, CategoryLogo);
});