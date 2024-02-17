define("discourse/plugins/docker_manager/discourse/components/docker-manager/console", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _component2, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class="console-logs"
    {{did-insert this.scrollToBottom}}
    {{did-update this.scrollToBottom @output}}
  >
    {{~@output~}}
  </div>
  */
  {
    "id": "E4gmFwOC",
    "block": "[[[11,0],[24,0,\"console-logs\"],[4,[38,0],[[30,0,[\"scrollToBottom\"]]],null],[4,[38,1],[[30,0,[\"scrollToBottom\"]],[30,1]],null],[12],[1,[30,1]],[13]],[\"@output\"],false,[\"did-insert\",\"did-update\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/console.hbs",
    "isStrictMode": false
  });
  let Console = (_class = class Console extends _component2.default {
    scrollToBottom(element) {
      if (this.args.followOutput) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "scrollToBottom", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "scrollToBottom"), _class.prototype)), _class);
  _exports.default = Console;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, Console);
});