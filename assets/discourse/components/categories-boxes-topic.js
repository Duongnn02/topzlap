define("discourse/components/categories-boxes-topic", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
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
    {{d-icon this.topicStatusIcon}}
  
  <a href={{this.topic.lastUnreadUrl}} class="title">
    {{html-safe this.topic.fancyTitle}}
  </a>
  */
  {
    "id": "A/xiz0vg",
    "block": "[[[1,[28,[35,0],[[30,0,[\"topicStatusIcon\"]]],null]],[1,\"\\n\\n\"],[10,3],[15,6,[30,0,[\"topic\",\"lastUnreadUrl\"]]],[14,0,\"title\"],[12],[1,\"\\n  \"],[1,[28,[35,1],[[30,0,[\"topic\",\"fancyTitle\"]]],null]],[1,\"\\n\"],[13]],[],false,[\"d-icon\",\"html-safe\"]]",
    "moduleName": "discourse/components/categories-boxes-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic.pinned", "topic.closed", "topic.archived"), (_obj = {
    tagName: "li",
    attributeBindings: ["topic.id:data-topic-id"],
    topicStatusIcon(pinned, closed, archived) {
      if (pinned) {
        return "thumbtack";
      }
      if (closed || archived) {
        return "lock";
      }
      return "far-file-alt";
    }
  }, (_applyDecoratedDescriptor(_obj, "topicStatusIcon", [_dec], Object.getOwnPropertyDescriptor(_obj, "topicStatusIcon"), _obj)), _obj))));
  _exports.default = _default;
});