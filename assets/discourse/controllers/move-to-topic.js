define("discourse/controllers/move-to-topic", ["exports", "@ember/controller", "@ember/object/computed", "discourse/models/topic", "discourse/lib/url", "I18n", "discourse/mixins/modal-functionality", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "@ember/utils", "@ember/runloop"], function (_exports, _controller, _computed, _topic, _url, _I18n, _modalFunctionality, _decorators, _ajaxError, _utils, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object/computed",0,"discourse/models/topic",0,"discourse/lib/url",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"@ember/utils",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("saving", "selectedTopicId", "topicName"), _dec2 = (0, _decorators.default)("saving", "newTopic", "existingTopic", "newMessage", "existingMessage"), _dec3 = (0, _decorators.default)("selectedAllPosts", "selectedPosts", "selectedPosts.[]"), _dec4 = (0, _decorators.default)("canSplitTopic"), (_obj = {
    topicName: null,
    saving: false,
    categoryId: null,
    tags: null,
    canAddTags: (0, _computed.alias)("site.can_create_tag"),
    canTagMessages: (0, _computed.alias)("site.can_tag_pms"),
    selectedTopicId: null,
    newTopic: (0, _computed.equal)("selection", "new_topic"),
    existingTopic: (0, _computed.equal)("selection", "existing_topic"),
    newMessage: (0, _computed.equal)("selection", "new_message"),
    existingMessage: (0, _computed.equal)("selection", "existing_message"),
    participants: null,
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["newTopic", "existingTopic", "newMessage", "existingMessage"];
      this.moveTypes = ["newTopic", "existingTopic", "newMessage", "existingMessage"];
    },
    topicController: (0, _controller.inject)("topic"),
    selectedPostsCount: (0, _computed.alias)("topicController.selectedPostsCount"),
    selectedAllPosts: (0, _computed.alias)("topicController.selectedAllPosts"),
    selectedPosts: (0, _computed.alias)("topicController.selectedPosts"),
    buttonDisabled(saving, selectedTopicId, topicName) {
      return saving || (0, _utils.isEmpty)(selectedTopicId) && (0, _utils.isEmpty)(topicName);
    },
    buttonTitle(saving, newTopic, existingTopic, newMessage, existingMessage) {
      if (newTopic) {
        return _I18n.default.t("topic.split_topic.title");
      } else if (existingTopic) {
        return _I18n.default.t("topic.merge_topic.title");
      } else if (newMessage) {
        return _I18n.default.t("topic.move_to_new_message.title");
      } else if (existingMessage) {
        return _I18n.default.t("topic.move_to_existing_message.title");
      } else {
        return _I18n.default.t("saving");
      }
    },
    onShow() {
      this.setProperties({
        "modal.modalClass": "choose-topic-modal",
        saving: false,
        selection: "new_topic",
        categoryId: null,
        topicName: "",
        tags: null,
        participants: []
      });
      const isPrivateMessage = this.get("model.isPrivateMessage");
      if (isPrivateMessage) {
        this.set("selection", this.canSplitToPM ? "new_message" : "existing_message");
      } else if (!this.canSplitTopic) {
        this.set("selection", "existing_topic");
        (0, _runloop.next)(() => $("#choose-topic-title").focus());
      }
    },
    canSplitTopic(selectedAllPosts, selectedPosts) {
      return !selectedAllPosts && selectedPosts.length > 0 && selectedPosts.sort((a, b) => a.post_number - b.post_number)[0].post_type === this.site.get("post_types.regular");
    },
    canSplitToPM(canSplitTopic) {
      return canSplitTopic && this.currentUser && this.currentUser.admin;
    },
    actions: {
      performMove() {
        this.moveTypes.forEach(type => {
          if (this.get(type)) {
            this.send("movePostsTo", type);
          }
        });
      },
      movePostsTo(type) {
        this.set("saving", true);
        const topicId = this.get("model.id");
        let mergeOptions, moveOptions;
        if (type === "existingTopic") {
          mergeOptions = {
            destination_topic_id: this.selectedTopicId
          };
          moveOptions = Object.assign({
            post_ids: this.get("topicController.selectedPostIds")
          }, mergeOptions);
        } else if (type === "existingMessage") {
          mergeOptions = {
            destination_topic_id: this.selectedTopicId,
            participants: this.participants.join(","),
            archetype: "private_message"
          };
          moveOptions = Object.assign({
            post_ids: this.get("topicController.selectedPostIds")
          }, mergeOptions);
        } else if (type === "newTopic") {
          mergeOptions = {};
          moveOptions = {
            title: this.topicName,
            post_ids: this.get("topicController.selectedPostIds"),
            category_id: this.categoryId,
            tags: this.tags
          };
        } else {
          mergeOptions = {};
          moveOptions = {
            title: this.topicName,
            post_ids: this.get("topicController.selectedPostIds"),
            tags: this.tags,
            archetype: "private_message"
          };
        }
        const promise = this.get("topicController.selectedAllPosts") ? (0, _topic.mergeTopic)(topicId, mergeOptions) : (0, _topic.movePosts)(topicId, moveOptions);
        promise.then(result => {
          this.send("closeModal");
          this.topicController.send("toggleMultiSelect");
          _url.default.routeTo(result.url);
        }).catch((0, _ajaxError.flashAjaxError)(this, _I18n.default.t("topic.move_to.error"))).finally(() => {
          this.set("saving", false);
        });
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "buttonDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "buttonDisabled"), _obj), _applyDecoratedDescriptor(_obj, "buttonTitle", [_dec2], Object.getOwnPropertyDescriptor(_obj, "buttonTitle"), _obj), _applyDecoratedDescriptor(_obj, "canSplitTopic", [_dec3], Object.getOwnPropertyDescriptor(_obj, "canSplitTopic"), _obj), _applyDecoratedDescriptor(_obj, "canSplitToPM", [_dec4], Object.getOwnPropertyDescriptor(_obj, "canSplitToPM"), _obj)), _obj)));
  _exports.default = _default;
});