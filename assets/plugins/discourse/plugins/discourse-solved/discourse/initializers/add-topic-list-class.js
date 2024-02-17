define("discourse/plugins/discourse-solved/discourse/initializers/add-topic-list-class", ["exports", "discourse-common/utils/decorators", "discourse/components/topic-list-item"], function (_exports, _decorators, _topicListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/components/topic-list-item"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = {
    name: "add-topic-list-class",
    initialize() {
      var _dec, _obj;
      _topicListItem.default.reopen((_dec = (0, _decorators.default)(), (_obj = {
        unboundClassNames() {
          let classList = this._super(...arguments);
          if (this.topic.has_accepted_answer) {
            classList += " status-solved";
          }
          return classList;
        }
      }, (_applyDecoratedDescriptor(_obj, "unboundClassNames", [_dec], Object.getOwnPropertyDescriptor(_obj, "unboundClassNames"), _obj)), _obj)));
    }
  };
  _exports.default = _default;
});