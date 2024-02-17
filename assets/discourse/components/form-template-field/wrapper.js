define("discourse/components/form-template-field/wrapper", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "js-yaml", "@glimmer/tracking"], function (_exports, _component, _templateFactory, _component2, _jsYaml, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"js-yaml",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canShowContent}}
    {{#each this.parsedContent as |content|}}
      {{component
        (concat "form-template-field/" content.type)
        attributes=content.attributes
        choices=content.choices
        validations=content.validations
      }}
    {{/each}}
  {{else}}
    <div class="alert alert-error">
      {{this.error}}
    </div>
  {{/if}}
  */
  {
    "id": "gqyWuw8o",
    "block": "[[[41,[30,0,[\"canShowContent\"]],[[[42,[28,[37,2],[[28,[37,2],[[30,0,[\"parsedContent\"]]],null]],null],null,[[[1,\"    \"],[46,[28,[37,4],[\"form-template-field/\",[30,1,[\"type\"]]],null],null,[[\"attributes\",\"choices\",\"validations\"],[[30,1,[\"attributes\"]],[30,1,[\"choices\"]],[30,1,[\"validations\"]]]],null],[1,\"\\n\"]],[1]],null]],[]],[[[1,\"  \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n    \"],[1,[30,0,[\"error\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"content\"],false,[\"if\",\"each\",\"-track-array\",\"component\",\"concat\"]]",
    "moduleName": "discourse/components/form-template-field/wrapper.hbs",
    "isStrictMode": false
  });
  let FormTemplateFieldWrapper = (_class = class FormTemplateFieldWrapper extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "error", _descriptor, this);
    }
    get canShowContent() {
      try {
        const parsedContent = _jsYaml.default.load(this.args.content);
        this.parsedContent = parsedContent;
        return true;
      } catch (e) {
        this.error = e;
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  })), _class);
  _exports.default = FormTemplateFieldWrapper;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, FormTemplateFieldWrapper);
});