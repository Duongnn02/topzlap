define("discourse/components/reviewable-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/category", "I18n", "discourse/lib/ajax", "@ember/string", "discourse-common/utils/decorators", "discourse/lib/optional-service", "discourse/lib/ajax-error", "@ember/object", "discourse/lib/show-modal", "@ember/service", "discourse-common/lib/get-owner"], function (_exports, _component, _templateFactory, _category, _I18n, _ajax, _string, _decorators, _optionalService, _ajaxError, _object, _showModal, _service, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addPluginReviewableParam = addPluginReviewableParam;
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/models/category",0,"@ember/component",0,"I18n",0,"discourse/lib/ajax",0,"@ember/string",0,"discourse-common/utils/decorators",0,"discourse/lib/optional-service",0,"discourse/lib/ajax-error",0,"@ember/object",0,"discourse/lib/show-modal",0,"@ember/service",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    data-reviewable-id={{this.reviewable.id}}
    class="reviewable-item {{this.customClasses}}"
  >
    <div class="reviewable-meta-data">
      <span
        class={{concat-class "reviewable-type" this.reviewable.humanTypeCssClass}}
      >{{this.reviewable.humanType}}</span>
      {{#if this.reviewable.reply_count}}
        <span class="reply-count">{{i18n
            "review.replies"
            count=this.reviewable.reply_count
          }}</span>
      {{/if}}
      <span class="created-at">
        <LinkTo
          @route="review.show"
          @model={{this.reviewable.id}}
        >{{age-with-tooltip this.reviewable.created_at}}</LinkTo>
      </span>
      <span class="status">
        {{reviewable-status this.reviewable.status this.reviewable.type}}
      </span>
      <a
        href
        {{on "click" (fn this.explainReviewable this.reviewable)}}
        title={{i18n "review.explain.why"}}
        class="explain"
      >
        {{d-icon "question-circle"}}
      </a>
    </div>
  
    <div class="reviewable-contents">
      {{#if this.editing}}
        <div class="editable-fields">
          {{#if this.reviewable.created_by}}
            <div class="editable-created-by">
              {{avatar this.reviewable.created_by imageSize="tiny"}}
              <ReviewableCreatedByName
                @user={{this.reviewable.created_by}}
                @tagName=""
              />
            </div>
          {{/if}}
  
          {{#each this.reviewable.editable_fields as |f|}}
            <div class="editable-field {{dasherize f.id}}">
              {{component
                (concat "reviewable-field-" f.type)
                tagName=""
                value=(editable-value this.reviewable f.id)
                tagCategoryId=this.tagCategoryId
                valueChanged=(action "valueChanged" f.id)
                categoryChanged=(action "categoryChanged")
              }}
            </div>
          {{/each}}
        </div>
      {{else}}
        {{#component
          this.reviewableComponent
          reviewable=this.reviewable
          tagName=""
        }}
          <ReviewableScores @reviewable={{this.reviewable}} @tagName="" />
        {{/component}}
      {{/if}}
    </div>
  
    {{#if (eq this.reviewable.type "ReviewableFlaggedPost")}}
      {{#if (eq this.reviewable.status 0)}}
        <h3 class="reviewable-item__context-question">
          {{this.reviewable.flaggedPostContextQuestion}}
        </h3>
      {{/if}}
    {{/if}}
  
    <div class="reviewable-actions">
      {{#if this.reviewable.last_performing_username}}
        <div class="stale-help">{{html-safe
            (i18n
              "review.stale_help"
              username=this.reviewable.last_performing_username
            )
          }}</div>
      {{else}}
        {{#if this.claimEnabled}}
          <div class="claimed-actions">
            <span class="help">{{html-safe this.claimHelp}}</span>
            <ReviewableClaimedTopic
              @topicId={{this.topicId}}
              @claimedBy={{this.reviewable.claimed_by}}
            />
          </div>
        {{/if}}
  
        {{#if this.canPerform}}
          {{#if this.editing}}
            <DButton
              @class="btn-primary reviewable-action save-edit"
              @disabled={{this.disabled}}
              @icon="check"
              @action={{action "saveEdit"}}
              @label="review.save"
            />
            <DButton
              @class="btn-danger reviewable-action cancel-edit"
              @disabled={{this.disabled}}
              @icon="times"
              @action={{action "cancelEdit"}}
              @label="review.cancel"
            />
          {{else}}
            {{#each this.reviewable.bundled_actions as |bundle|}}
              <ReviewableBundledAction
                @bundle={{bundle}}
                @performAction={{action "perform"}}
                @reviewableUpdating={{this.disabled}}
              />
            {{/each}}
  
            {{#if this.reviewable.can_edit}}
              <DButton
                @class="reviewable-action edit"
                @disabled={{this.disabled}}
                @icon="pencil-alt"
                @action={{action "edit"}}
                @label="review.edit"
              />
            {{/if}}
          {{/if}}
        {{/if}}
      {{/if}}
    </div>
  
  </div>
  */
  {
    "id": "rYujlEaP",
    "block": "[[[10,0],[15,\"data-reviewable-id\",[30,0,[\"reviewable\",\"id\"]]],[15,0,[29,[\"reviewable-item \",[30,0,[\"customClasses\"]]]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-meta-data\"],[12],[1,\"\\n    \"],[10,1],[15,0,[28,[37,0],[\"reviewable-type\",[30,0,[\"reviewable\",\"humanTypeCssClass\"]]],null]],[12],[1,[30,0,[\"reviewable\",\"humanType\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"reply_count\"]],[[[1,\"      \"],[10,1],[14,0,\"reply-count\"],[12],[1,[28,[35,2],[\"review.replies\"],[[\"count\"],[[30,0,[\"reviewable\",\"reply_count\"]]]]]],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,1],[14,0,\"created-at\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@route\",\"@model\"],[\"review.show\",[30,0,[\"reviewable\",\"id\"]]]],[[\"default\"],[[[[1,[28,[35,4],[[30,0,[\"reviewable\",\"created_at\"]]],null]]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,1],[14,0,\"status\"],[12],[1,\"\\n      \"],[1,[28,[35,5],[[30,0,[\"reviewable\",\"status\"]],[30,0,[\"reviewable\",\"type\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[11,3],[24,6,\"\"],[16,\"title\",[28,[37,2],[\"review.explain.why\"],null]],[24,0,\"explain\"],[4,[38,6],[\"click\",[28,[37,7],[[30,0,[\"explainReviewable\"]],[30,0,[\"reviewable\"]]],null]],null],[12],[1,\"\\n      \"],[1,[28,[35,8],[\"question-circle\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"reviewable-contents\"],[12],[1,\"\\n\"],[41,[30,0,[\"editing\"]],[[[1,\"      \"],[10,0],[14,0,\"editable-fields\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"created_by\"]],[[[1,\"          \"],[10,0],[14,0,\"editable-created-by\"],[12],[1,\"\\n            \"],[1,[28,[35,9],[[30,0,[\"reviewable\",\"created_by\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n            \"],[8,[39,10],null,[[\"@user\",\"@tagName\"],[[30,0,[\"reviewable\",\"created_by\"]],\"\"]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,12],[[28,[37,12],[[30,0,[\"reviewable\",\"editable_fields\"]]],null]],null],null,[[[1,\"          \"],[10,0],[15,0,[29,[\"editable-field \",[28,[37,13],[[30,1,[\"id\"]]],null]]]],[12],[1,\"\\n            \"],[46,[28,[37,15],[\"reviewable-field-\",[30,1,[\"type\"]]],null],null,[[\"tagName\",\"value\",\"tagCategoryId\",\"valueChanged\",\"categoryChanged\"],[\"\",[28,[37,16],[[30,0,[\"reviewable\"]],[30,1,[\"id\"]]],null],[30,0,[\"tagCategoryId\"]],[28,[37,17],[[30,0],\"valueChanged\",[30,1,[\"id\"]]],null],[28,[37,17],[[30,0],\"categoryChanged\"],null]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],[[[46,[30,0,[\"reviewableComponent\"]],null,[[\"reviewable\",\"tagName\"],[[30,0,[\"reviewable\"]],\"\"]],[[\"default\"],[[[[1,\"        \"],[8,[39,18],null,[[\"@reviewable\",\"@tagName\"],[[30,0,[\"reviewable\"]],\"\"]],null],[1,\"\\n\"]],[]]]]]],[]]],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[28,[37,19],[[30,0,[\"reviewable\",\"type\"]],\"ReviewableFlaggedPost\"],null],[[[41,[28,[37,19],[[30,0,[\"reviewable\",\"status\"]],0],null],[[[1,\"      \"],[10,\"h3\"],[14,0,\"reviewable-item__context-question\"],[12],[1,\"\\n        \"],[1,[30,0,[\"reviewable\",\"flaggedPostContextQuestion\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-actions\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"last_performing_username\"]],[[[1,\"      \"],[10,0],[14,0,\"stale-help\"],[12],[1,[28,[35,20],[[28,[37,2],[\"review.stale_help\"],[[\"username\"],[[30,0,[\"reviewable\",\"last_performing_username\"]]]]]],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"claimEnabled\"]],[[[1,\"        \"],[10,0],[14,0,\"claimed-actions\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"help\"],[12],[1,[28,[35,20],[[30,0,[\"claimHelp\"]]],null]],[13],[1,\"\\n          \"],[8,[39,21],null,[[\"@topicId\",\"@claimedBy\"],[[30,0,[\"topicId\"]],[30,0,[\"reviewable\",\"claimed_by\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canPerform\"]],[[[41,[30,0,[\"editing\"]],[[[1,\"          \"],[8,[39,22],null,[[\"@class\",\"@disabled\",\"@icon\",\"@action\",\"@label\"],[\"btn-primary reviewable-action save-edit\",[30,0,[\"disabled\"]],\"check\",[28,[37,17],[[30,0],\"saveEdit\"],null],\"review.save\"]],null],[1,\"\\n          \"],[8,[39,22],null,[[\"@class\",\"@disabled\",\"@icon\",\"@action\",\"@label\"],[\"btn-danger reviewable-action cancel-edit\",[30,0,[\"disabled\"]],\"times\",[28,[37,17],[[30,0],\"cancelEdit\"],null],\"review.cancel\"]],null],[1,\"\\n\"]],[]],[[[42,[28,[37,12],[[28,[37,12],[[30,0,[\"reviewable\",\"bundled_actions\"]]],null]],null],null,[[[1,\"            \"],[8,[39,23],null,[[\"@bundle\",\"@performAction\",\"@reviewableUpdating\"],[[30,2],[28,[37,17],[[30,0],\"perform\"],null],[30,0,[\"disabled\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"can_edit\"]],[[[1,\"            \"],[8,[39,22],null,[[\"@class\",\"@disabled\",\"@icon\",\"@action\",\"@label\"],[\"reviewable-action edit\",[30,0,[\"disabled\"]],\"pencil-alt\",[28,[37,17],[[30,0],\"edit\"],null],\"review.edit\"]],null],[1,\"\\n\"]],[]],null]],[]]]],[]],null]],[]]],[1,\"  \"],[13],[1,\"\\n\\n\"],[13]],[\"f\",\"bundle\"],false,[\"concat-class\",\"if\",\"i18n\",\"link-to\",\"age-with-tooltip\",\"reviewable-status\",\"on\",\"fn\",\"d-icon\",\"avatar\",\"reviewable-created-by-name\",\"each\",\"-track-array\",\"dasherize\",\"component\",\"concat\",\"editable-value\",\"action\",\"reviewable-scores\",\"eq\",\"html-safe\",\"reviewable-claimed-topic\",\"d-button\",\"reviewable-bundled-action\"]]",
    "moduleName": "discourse/components/reviewable-item.hbs",
    "isStrictMode": false
  });
  let _components = {};
  const pluginReviewableParams = {};
  function addPluginReviewableParam(reviewableType, param) {
    pluginReviewableParams[reviewableType] ? pluginReviewableParams[reviewableType].push(param) : pluginReviewableParams[reviewableType] = [param];
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("reviewable.type", "reviewable.last_performing_username", "siteSettings.blur_tl0_flagged_posts_media", "reviewable.target_created_by_trust_level"), _dec2 = (0, _decorators.default)("reviewable.topic", "reviewable.topic_id", "reviewable.removed_topic_id"), _dec3 = (0, _decorators.default)("siteSettings.reviewable_claiming", "topicId"), _dec4 = (0, _decorators.default)("claimEnabled", "siteSettings.reviewable_claiming", "reviewable.claimed_by"), _dec5 = (0, _decorators.default)("siteSettings.reviewable_claiming", "reviewable.claimed_by"), _dec6 = (0, _decorators.default)("reviewable.type"), _dec7 = (0, _decorators.default)("_updates.category_id", "reviewable.category.id"), (_obj = {
    adminTools: (0, _optionalService.default)(),
    dialog: (0, _service.inject)(),
    tagName: "",
    updating: null,
    editing: false,
    _updates: null,
    customClasses(type, lastPerformingUsername, blurEnabled, trustLevel) {
      let classes = (0, _string.dasherize)(type);
      if (lastPerformingUsername) {
        classes = `${classes} reviewable-stale`;
      }
      if (blurEnabled && trustLevel === 0) {
        classes = `${classes} blur-images`;
      }
      return classes;
    },
    topicId(topic, topicId, removedTopicId) {
      return topic && topic.id || topicId || removedTopicId;
    },
    claimEnabled(claimMode, topicId) {
      return claimMode !== "disabled" && !!topicId;
    },
    canPerform(claimEnabled, claimMode, claimedBy) {
      if (!claimEnabled) {
        return true;
      }
      if (claimedBy) {
        return claimedBy.id === this.currentUser.id;
      }
      return claimMode !== "required";
    },
    claimHelp(claimMode, claimedBy) {
      if (claimedBy) {
        return claimedBy.id === this.currentUser.id ? _I18n.default.t("review.claim_help.claimed_by_you") : _I18n.default.t("review.claim_help.claimed_by_other", {
          username: claimedBy.username
        });
      }
      return claimMode === "optional" ? _I18n.default.t("review.claim_help.optional") : _I18n.default.t("review.claim_help.required");
    },
    reviewableComponent(type) {
      if (_components[type] !== undefined) {
        return _components[type];
      }
      const dasherized = (0, _string.dasherize)(type);
      const owner = (0, _getOwner.getOwner)(this);
      const componentExists = owner.hasRegistration(`component:${dasherized}`) || owner.hasRegistration(`template:components/${dasherized}`);
      _components[type] = componentExists ? dasherized : null;
      return _components[type];
    },
    tagCategoryId(updatedCategoryId, categoryId) {
      return updatedCategoryId || categoryId;
    },
    _performConfirmed(performableAction) {
      let reviewable = this.reviewable;
      let performAction = () => {
        let version = reviewable.get("version");
        this.set("updating", true);
        const data = {
          send_email: reviewable.sendEmail,
          reject_reason: reviewable.rejectReason
        };
        (pluginReviewableParams[reviewable.type] || []).forEach(param => {
          if (reviewable[param]) {
            data[param] = reviewable[param];
          }
        });
        return (0, _ajax.ajax)(`/review/${reviewable.id}/perform/${performableAction.id}?version=${version}`, {
          type: "PUT",
          data
        }).then(result => {
          let performResult = result.reviewable_perform_result;

          // "fast track" to update the current user's reviewable count before the message bus finds out.
          if (performResult.reviewable_count !== undefined) {
            this.currentUser.updateReviewableCount(performResult.reviewable_count);
          }
          if (performResult.unseen_reviewable_count !== undefined) {
            this.currentUser.set("unseen_reviewable_count", performResult.unseen_reviewable_count);
          }
          if (this.attrs.remove) {
            this.attrs.remove(performResult.remove_reviewable_ids);
          } else {
            return this.store.find("reviewable", reviewable.id);
          }
        }).catch(_ajaxError.popupAjaxError).finally(() => this.set("updating", false));
      };
      if (performableAction.client_action) {
        let actionMethod = this[`client${(0, _string.classify)(performableAction.client_action)}`];
        if (actionMethod) {
          return actionMethod.call(this, reviewable, performAction);
        } else {
          // eslint-disable-next-line no-console
          console.error(`No handler for ${performableAction.client_action} found`);
          return;
        }
      } else {
        return performAction();
      }
    },
    clientSuspend(reviewable, performAction) {
      this._penalize("showSuspendModal", reviewable, performAction);
    },
    clientSilence(reviewable, performAction) {
      this._penalize("showSilenceModal", reviewable, performAction);
    },
    _penalize(adminToolMethod, reviewable, performAction) {
      let adminTools = this.adminTools;
      if (adminTools) {
        let createdBy = reviewable.get("target_created_by");
        let postId = reviewable.get("post_id");
        let postEdit = reviewable.get("raw");
        return adminTools[adminToolMethod](createdBy, {
          postId,
          postEdit,
          before: performAction
        });
      }
    },
    explainReviewable(reviewable, event) {
      event?.preventDefault();
      (0, _showModal.default)("explain-reviewable", {
        title: "review.explain.title",
        model: reviewable
      });
    },
    actions: {
      edit() {
        this.set("editing", true);
        this.set("_updates", {
          payload: {}
        });
      },
      cancelEdit() {
        this.set("editing", false);
      },
      saveEdit() {
        let updates = this._updates;

        // Remove empty objects
        Object.keys(updates).forEach(name => {
          let attr = updates[name];
          if (typeof attr === "object" && Object.keys(attr).length === 0) {
            delete updates[name];
          }
        });
        this.set("updating", true);
        return this.reviewable.update(updates).then(() => this.set("editing", false)).catch(_ajaxError.popupAjaxError).finally(() => this.set("updating", false));
      },
      categoryChanged(categoryId) {
        let category = _category.default.findById(categoryId);
        if (!category) {
          category = _category.default.findUncategorized();
        }
        (0, _object.set)(this._updates, "category_id", category.id);
      },
      valueChanged(fieldId, event) {
        (0, _object.set)(this._updates, fieldId, event.target.value);
      },
      perform(performableAction) {
        if (this.updating) {
          return;
        }
        const message = performableAction.get("confirm_message");
        let requireRejectReason = performableAction.get("require_reject_reason");
        let customModal = performableAction.get("custom_modal");
        if (message) {
          this.dialog.confirm({
            message,
            didConfirm: () => this._performConfirmed(performableAction)
          });
        } else if (requireRejectReason) {
          (0, _showModal.default)("reject-reason-reviewable", {
            title: "review.reject_reason.title",
            model: this.reviewable
          }).setProperties({
            performConfirmed: this._performConfirmed,
            action: performableAction
          });
        } else if (customModal) {
          (0, _showModal.default)(customModal, {
            title: `review.${customModal}.title`,
            model: this.reviewable
          }).setProperties({
            performConfirmed: this._performConfirmed,
            action: performableAction
          });
        } else {
          return this._performConfirmed(performableAction);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "customClasses", [_dec], Object.getOwnPropertyDescriptor(_obj, "customClasses"), _obj), _applyDecoratedDescriptor(_obj, "topicId", [_dec2], Object.getOwnPropertyDescriptor(_obj, "topicId"), _obj), _applyDecoratedDescriptor(_obj, "claimEnabled", [_dec3], Object.getOwnPropertyDescriptor(_obj, "claimEnabled"), _obj), _applyDecoratedDescriptor(_obj, "canPerform", [_dec4], Object.getOwnPropertyDescriptor(_obj, "canPerform"), _obj), _applyDecoratedDescriptor(_obj, "claimHelp", [_dec5], Object.getOwnPropertyDescriptor(_obj, "claimHelp"), _obj), _applyDecoratedDescriptor(_obj, "reviewableComponent", [_dec6], Object.getOwnPropertyDescriptor(_obj, "reviewableComponent"), _obj), _applyDecoratedDescriptor(_obj, "tagCategoryId", [_dec7], Object.getOwnPropertyDescriptor(_obj, "tagCategoryId"), _obj), _applyDecoratedDescriptor(_obj, "_performConfirmed", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_performConfirmed"), _obj), _applyDecoratedDescriptor(_obj, "explainReviewable", [_object.action], Object.getOwnPropertyDescriptor(_obj, "explainReviewable"), _obj)), _obj))));
  _exports.default = _default;
});