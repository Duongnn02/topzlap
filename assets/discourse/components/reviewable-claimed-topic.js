define("discourse/components/reviewable-claimed-topic", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _component, _templateFactory, _ajax, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.enabled}}
    <div class="reviewable-claimed-topic">
      {{#if this.claimedBy}}
        <div class="claimed-by">
          {{avatar this.claimedBy imageSize="small"}}
          <span class="claimed-username">{{this.claimedBy.username}}</span>
        </div>
        <DButton
          @icon="times"
          @class="btn-small unclaim"
          @action={{action "unclaim"}}
          @disabled={{this.unassigning}}
          @title="review.unclaim.help"
        />
      {{else}}
        <DButton
          @icon="user-plus"
          @class="btn-small claim"
          @title="review.claim.title"
          @action={{action "claim"}}
        />
      {{/if}}
    </div>
  {{/if}}
  */
  {
    "id": "qZRJRkIF",
    "block": "[[[41,[30,0,[\"enabled\"]],[[[1,\"  \"],[10,0],[14,0,\"reviewable-claimed-topic\"],[12],[1,\"\\n\"],[41,[30,0,[\"claimedBy\"]],[[[1,\"      \"],[10,0],[14,0,\"claimed-by\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[[30,0,[\"claimedBy\"]]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n        \"],[10,1],[14,0,\"claimed-username\"],[12],[1,[30,0,[\"claimedBy\",\"username\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@icon\",\"@class\",\"@action\",\"@disabled\",\"@title\"],[\"times\",\"btn-small unclaim\",[28,[37,3],[[30,0],\"unclaim\"],null],[30,0,[\"unassigning\"]],\"review.unclaim.help\"]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,2],null,[[\"@icon\",\"@class\",\"@title\",\"@action\"],[\"user-plus\",\"btn-small claim\",\"review.claim.title\",[28,[37,3],[[30,0],\"claim\"],null]]],null],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"avatar\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/reviewable-claimed-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    tagName: "",
    enabled() {
      return this.siteSettings.reviewable_claiming !== "disabled";
    },
    actions: {
      unclaim() {
        (0, _ajax.ajax)(`/reviewable_claimed_topics/${this.topicId}`, {
          type: "DELETE"
        }).then(() => {
          this.set("claimedBy", null);
        });
      },
      claim() {
        let claim = this.store.createRecord("reviewable-claimed-topic");
        claim.save({
          topic_id: this.topicId
        }).then(() => {
          this.set("claimedBy", this.currentUser);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "enabled", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "enabled"), _obj)), _obj)));
  _exports.default = _default;
});