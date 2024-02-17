define("discourse/mixins/open-composer", ["exports", "discourse/models/composer", "@ember/object/mixin", "discourse-common/lib/get-owner"], function (_exports, _composer, _mixin, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"@ember/object/mixin",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  // This mixin allows a route to open the composer
  var _default = _mixin.default.create({
    openComposer(controller) {
      let categoryId = controller.get("category.id");
      if (categoryId && controller.category.isUncategorizedCategory && !this.siteSettings.allow_uncategorized_topics) {
        categoryId = null;
      }
      (0, _getOwner.getOwner)(this).lookup("service:composer").open({
        prioritizedCategoryId: categoryId,
        topicCategoryId: categoryId,
        action: _composer.default.CREATE_TOPIC,
        draftKey: controller.get("model.draft_key") || _composer.default.NEW_TOPIC_KEY,
        draftSequence: controller.get("model.draft_sequence") || 0
      });
    },
    openComposerWithTopicParams(controller, topicTitle, topicBody, topicCategoryId, topicTags) {
      (0, _getOwner.getOwner)(this).lookup("service:composer").open({
        action: _composer.default.CREATE_TOPIC,
        topicTitle,
        topicBody,
        topicCategoryId,
        topicTags,
        draftKey: controller.get("model.draft_key") || _composer.default.NEW_TOPIC_KEY,
        draftSequence: controller.get("model.draft_sequence")
      });
    },
    openComposerWithMessageParams() {
      let {
        recipients = [],
        topicTitle = "",
        topicBody = "",
        hasGroups = false
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _getOwner.getOwner)(this).lookup("service:composer").open({
        action: _composer.default.PRIVATE_MESSAGE,
        recipients,
        topicTitle,
        topicBody,
        archetypeId: "private_message",
        draftKey: _composer.default.NEW_PRIVATE_MESSAGE_KEY,
        hasGroups
      });
    }
  });
  _exports.default = _default;
});