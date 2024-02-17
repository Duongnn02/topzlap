define("discourse/controllers/share-topic", ["exports", "@ember/controller", "@ember/object", "discourse-common/lib/get-url", "discourse-common/utils/decorators", "discourse/lib/formatter", "discourse/lib/sharing", "discourse/lib/show-modal", "discourse/mixins/buffered-content", "discourse/mixins/modal-functionality", "I18n", "discourse/models/category", "discourse-common/lib/get-owner"], function (_exports, _controller, _object, _getUrl, _decorators, _formatter, _sharing, _showModal, _bufferedContent, _modalFunctionality, _I18n, _category, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"discourse-common/lib/get-url",0,"discourse-common/utils/decorators",0,"discourse/lib/formatter",0,"discourse/lib/sharing",0,"discourse/lib/show-modal",0,"discourse/mixins/buffered-content",0,"discourse/mixins/modal-functionality",0,"I18n",0,"discourse/models/category",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (0, _bufferedContent.bufferedProperty)("invite"), (_dec = (0, _decorators.default)("post.shareUrl", "topic.shareUrl"), _dec2 = (0, _decorators.default)("post.created_at", "post.wiki", "post.last_wiki_edit"), _dec3 = (0, _decorators.default)("topic.{isPrivateMessage,invisible,category.read_restricted}"), (_obj = {
    topic: null,
    post: null,
    allowInvites: false,
    onShow() {
      this.setProperties({
        topic: null,
        post: null,
        allowInvites: false
      });
      this._showRestrictedGroupWarning();
      this._selectUrl();
    },
    _showRestrictedGroupWarning() {
      if (!this.model) {
        return;
      }
      _category.default.fetchVisibleGroups(this.model.id).then(result => {
        if (result.groups.length > 0) {
          this.flash(_I18n.default.t("topic.share.restricted_groups", {
            count: result.groups.length,
            groupNames: result.groups.join(", ")
          }), "warning");
        }
      });
    },
    _selectUrl() {
      const input = document.querySelector("input.invite-link");
      if (input && !this.site.mobileView) {
        // if the input is auto-focused on mobile, iOS requires two taps of the copy button
        input.setSelectionRange(0, this.url.length);
        input.focus();
      }
    },
    url(postUrl, topicUrl) {
      if (postUrl) {
        return (0, _getUrl.getAbsoluteURL)(postUrl);
      } else if (topicUrl) {
        return (0, _getUrl.getAbsoluteURL)(topicUrl);
      }
    },
    displayDate(createdAt, wiki, lastWikiEdit) {
      const date = wiki && lastWikiEdit ? lastWikiEdit : createdAt;
      return (0, _formatter.longDateNoYear)(new Date(date));
    },
    sources(topic) {
      const privateContext = this.siteSettings.login_required || topic?.isPrivateMessage || topic?.invisible || topic?.category?.read_restricted;
      return _sharing.default.activeSources(this.siteSettings.share_links, privateContext);
    },
    share(source) {
      _sharing.default.shareSource(source, {
        title: this.topic.title,
        url: this.url
      });
    },
    inviteUsers() {
      const controller = (0, _showModal.default)("create-invite");
      controller.setProperties({
        inviteToTopic: true,
        topics: [this.topic]
      });
      controller.buffered.setProperties({
        topicId: this.topic.id,
        topicTitle: this.topic.title
      });
    },
    replyAsNewTopic() {
      const postStream = this.topic.postStream;
      const postId = this.post?.id || postStream.findPostIdForPostNumber(1);
      const post = postStream.findLoadedPost(postId);
      const topicController = (0, _getOwner.getOwner)(this).lookup("controller:topic");
      topicController.actions.replyAsNewTopic.call(topicController, post);
      this.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "_showRestrictedGroupWarning", [_decorators.afterRender], Object.getOwnPropertyDescriptor(_obj, "_showRestrictedGroupWarning"), _obj), _applyDecoratedDescriptor(_obj, "_selectUrl", [_decorators.afterRender], Object.getOwnPropertyDescriptor(_obj, "_selectUrl"), _obj), _applyDecoratedDescriptor(_obj, "url", [_dec], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "displayDate", [_dec2], Object.getOwnPropertyDescriptor(_obj, "displayDate"), _obj), _applyDecoratedDescriptor(_obj, "sources", [_dec3], Object.getOwnPropertyDescriptor(_obj, "sources"), _obj), _applyDecoratedDescriptor(_obj, "share", [_object.action], Object.getOwnPropertyDescriptor(_obj, "share"), _obj), _applyDecoratedDescriptor(_obj, "inviteUsers", [_object.action], Object.getOwnPropertyDescriptor(_obj, "inviteUsers"), _obj), _applyDecoratedDescriptor(_obj, "replyAsNewTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "replyAsNewTopic"), _obj)), _obj)));
  _exports.default = _default;
});