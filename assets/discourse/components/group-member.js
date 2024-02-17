define("discourse/components/group-member", ["exports", "@ember/component", "@ember/template-factory", "@ember/object"], function (_exports, _component, _templateFactory, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a href={{this.member.adminPath}}>
    {{avatar this.member imageSize="small"}}
  </a>
  <span>{{this.member.username}}</span>
  {{#unless this.automatic}}
    <a href {{on "click" this.remove}} class="remove">
      {{d-icon "times"}}
    </a>
  {{/unless}}
  */
  {
    "id": "BwRq/Bxa",
    "block": "[[[10,3],[15,6,[30,0,[\"member\",\"adminPath\"]]],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,0,[\"member\"]]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,1],[12],[1,[30,0,[\"member\",\"username\"]]],[13],[1,\"\\n\"],[41,[51,[30,0,[\"automatic\"]]],[[[1,\"  \"],[11,3],[24,6,\"\"],[24,0,\"remove\"],[4,[38,2],[\"click\",[30,0,[\"remove\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,3],[\"times\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"avatar\",\"unless\",\"on\",\"d-icon\"]]",
    "moduleName": "discourse/components/group-member.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    classNames: ["item"],
    remove(event) {
      event?.preventDefault();
      this.removeAction(this.member);
    }
  }, (_applyDecoratedDescriptor(_obj, "remove", [_object.action], Object.getOwnPropertyDescriptor(_obj, "remove"), _obj)), _obj)));
  _exports.default = _default;
});