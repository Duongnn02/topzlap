define("discourse/components/reviewable-post-edits", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object", "@ember/object/computed", "discourse/widgets/post-edits-indicator", "discourse/lib/formatter", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _decorators, _object, _computed, _postEditsIndicator, _formatter, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object",0,"@ember/object/computed",0,"discourse/widgets/post-edits-indicator",0,"discourse/lib/formatter",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.hasEdits}}
    <a
      href
      {{on "click" this.showEditHistory}}
      class="has-edits {{this.historyClass}}"
      title={{i18n "post.last_edited_on" dateTime=this.editedDate}}
    >
      {{d-icon "pencil-alt"}}
    </a>
  {{/if}}
  */
  {
    "id": "5lZNHzZN",
    "block": "[[[41,[30,0,[\"hasEdits\"]],[[[1,\"  \"],[11,3],[24,6,\"\"],[16,0,[29,[\"has-edits \",[30,0,[\"historyClass\"]]]]],[16,\"title\",[28,[37,1],[\"post.last_edited_on\"],[[\"dateTime\"],[[30,0,[\"editedDate\"]]]]]],[4,[38,2],[\"click\",[30,0,[\"showEditHistory\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,3],[\"pencil-alt\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"i18n\",\"on\",\"d-icon\"]]",
    "moduleName": "discourse/components/reviewable-post-edits.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("reviewable.post_updated_at"), _dec2 = (0, _decorators.default)("reviewable.post_updated_at"), (_obj = {
    hasEdits: (0, _computed.gt)("reviewable.post_version", 1),
    historyClass(updatedAt) {
      return (0, _postEditsIndicator.historyHeat)(this.siteSettings, new Date(updatedAt));
    },
    editedDate(updatedAt) {
      return (0, _formatter.longDate)(updatedAt);
    },
    showEditHistory(event) {
      event?.preventDefault();
      let postId = this.get("reviewable.post_id");
      this.store.find("post", postId).then(post => {
        let historyController = (0, _showModal.default)("history", {
          model: post,
          modalClass: "history-modal"
        });
        historyController.refresh(postId, "latest");
        historyController.set("post", post);
        historyController.set("topicController", null);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "historyClass", [_dec], Object.getOwnPropertyDescriptor(_obj, "historyClass"), _obj), _applyDecoratedDescriptor(_obj, "editedDate", [_dec2], Object.getOwnPropertyDescriptor(_obj, "editedDate"), _obj), _applyDecoratedDescriptor(_obj, "showEditHistory", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showEditHistory"), _obj)), _obj))));
  _exports.default = _default;
});