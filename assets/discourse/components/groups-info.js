define("discourse/components/groups-info", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showFullName}}
    <span class="groups-info-name">{{this.group.full_name}}</span>
  {{else}}
    <span class="groups-info-name">{{this.group.displayName}}</span>
  {{/if}}
  */
  {
    "id": "xvzLkauX",
    "block": "[[[41,[30,0,[\"showFullName\"]],[[[1,\"  \"],[10,1],[14,0,\"groups-info-name\"],[12],[1,[30,0,[\"group\",\"full_name\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,1],[14,0,\"groups-info-name\"],[12],[1,[30,0,[\"group\",\"displayName\"]]],[13],[1,\"\\n\"]],[]]]],[],false,[\"if\"]]",
    "moduleName": "discourse/components/groups-info.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("group.full_name"), (_obj = {
    tagName: "span",
    classNames: ["group-info-details"],
    showFullName(fullName) {
      return fullName && fullName.length;
    }
  }, (_applyDecoratedDescriptor(_obj, "showFullName", [_dec], Object.getOwnPropertyDescriptor(_obj, "showFullName"), _obj)), _obj))));
  _exports.default = _default;
});