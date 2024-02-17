define("discourse/controllers/history", ["exports", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/computed", "discourse/models/category", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "discourse/models/post", "discourse/helpers/category-link", "discourse-common/lib/icon-library", "discourse/lib/text", "@ember/service"], function (_exports, _object, _computed, _decorators, _computed2, _category, _controller, _I18n, _modalFunctionality, _post, _categoryLink, _iconLibrary, _text, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/computed",0,"discourse/models/category",0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/post",0,"discourse/helpers/category-link",0,"discourse-common/lib/icon-library",0,"discourse/lib/text",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function customTagArray(val) {
    if (!val) {
      return [];
    }
    if (!Array.isArray(val)) {
      val = [val];
    }
    return val;
  }

  // This controller handles displaying of history
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("model.tags_changes.previous", "model.tags_changes.current"), _dec3 = (0, _decorators.default)("model.tags_changes.previous", "model.tags_changes.current"), _dec4 = (0, _decorators.default)("post.version"), _dec5 = (0, _decorators.default)("previousVersion", "model.current_version", "model.version_count"), _dec6 = (0, _decorators.default)("previousVersion"), _dec7 = (0, _decorators.default)("model.created_at"), _dec8 = (0, _decorators.default)("model.current_version"), _dec9 = (0, _decorators.default)("model.current_revision", "model.previous_revision"), _dec10 = (0, _decorators.default)("model.previous_hidden"), _dec11 = (0, _decorators.default)("model.previous_hidden"), _dec12 = (0, _decorators.default)("model.last_revision", "model.current_revision", "model.can_edit", "topicController"), _dec13 = (0, _decorators.default)("model.wiki"), _dec14 = (0, _decorators.default)(), _dec15 = (0, _decorators.default)("model.previous_hidden"), _dec16 = (0, _decorators.default)("model.previous_hidden", "model.current_hidden", "displayingInline"), _dec17 = (0, _decorators.default)("displayingInline"), _dec18 = (0, _decorators.default)("displayingSideBySide"), _dec19 = (0, _decorators.default)("displayingSideBySideMarkdown"), _dec20 = (0, _decorators.default)("model.category_id_changes"), _dec21 = (0, _decorators.default)("model.category_id_changes"), _dec22 = (0, _decorators.default)("model.wiki_changes"), _dec23 = (0, _decorators.default)("model.post_type_changes"), _dec24 = (0, _decorators.default)("viewMode", "model.title_changes"), _dec25 = (0, _decorators.observes)("viewMode", "model.body_changes"), (_obj = {
    dialog: (0, _service.inject)(),
    loading: true,
    viewMode: "side_by_side",
    _changeViewModeOnMobile() {
      if (this.site && this.site.mobileView) {
        this.set("viewMode", "inline");
      }
    },
    previousFeaturedLink: (0, _computed.alias)("model.featured_link_changes.previous"),
    currentFeaturedLink: (0, _computed.alias)("model.featured_link_changes.current"),
    previousTagChanges(previous, current) {
      const previousArray = customTagArray(previous);
      const currentSet = new Set(customTagArray(current));
      return previousArray.map(name => ({
        name,
        deleted: !currentSet.has(name)
      }));
    },
    currentTagChanges(previous, current) {
      const previousSet = new Set(customTagArray(previous));
      const currentArray = customTagArray(current);
      return currentArray.map(name => ({
        name,
        inserted: !previousSet.has(name)
      }));
    },
    modalTitleKey(version) {
      if (version > 100) {
        return "history_capped_revisions";
      } else {
        return "history";
      }
    },
    revisionsText(previous, current, total) {
      return _I18n.default.t("post.revisions.controls.comparing_previous_to_current_out_of_total", {
        previous,
        icon: (0, _iconLibrary.iconHTML)("arrows-alt-h"),
        current,
        total
      });
    },
    revertToRevisionText(revision) {
      return _I18n.default.t("post.revisions.controls.revert", {
        revision
      });
    },
    refresh(postId, postVersion) {
      this.set("loading", true);
      _post.default.loadRevision(postId, postVersion).then(result => {
        this.setProperties({
          loading: false,
          model: result
        });
      });
    },
    hide(postId, postVersion) {
      _post.default.hideRevision(postId, postVersion).then(() => this.refresh(postId, postVersion));
    },
    permanentlyDeleteRevisions(postId) {
      this.dialog.yesNoConfirm({
        message: _I18n.default.t("post.revisions.controls.destroy_confirm"),
        didConfirm: () => {
          _post.default.permanentlyDeleteRevisions(postId).then(() => {
            this.send("closeModal");
          });
        }
      });
    },
    show(postId, postVersion) {
      _post.default.showRevision(postId, postVersion).then(() => this.refresh(postId, postVersion));
    },
    revert(post, postVersion) {
      post.revertToRevision(postVersion).then(result => {
        this.refresh(post.get("id"), postVersion);
        if (result.topic) {
          post.set("topic.slug", result.topic.slug);
          post.set("topic.title", result.topic.title);
          post.set("topic.fancy_title", result.topic.fancy_title);
        }
        if (result.category_id) {
          post.set("topic.category", _category.default.findById(result.category_id));
        }
        this.send("closeModal");
      }).catch(function (e) {
        if (e.jqXHR.responseJSON && e.jqXHR.responseJSON.errors && e.jqXHR.responseJSON.errors[0]) {
          this.dialog.alert(e.jqXHR.responseJSON.errors[0]);
        }
      });
    },
    createdAtDate(createdAt) {
      return moment(createdAt).format("LLLL");
    },
    previousVersion(current) {
      return current - 1;
    },
    displayGoToPrevious(current, prev) {
      return prev && current > prev;
    },
    displayRevisions: (0, _computed.gt)("model.version_count", 2),
    displayGoToFirst: (0, _computed2.propertyGreaterThan)("model.current_revision", "model.first_revision"),
    displayGoToNext: (0, _computed2.propertyLessThan)("model.current_revision", "model.next_revision"),
    displayGoToLast: (0, _computed2.propertyLessThan)("model.current_revision", "model.next_revision"),
    hideGoToFirst: (0, _computed.not)("displayGoToFirst"),
    hideGoToPrevious: (0, _computed.not)("displayGoToPrevious"),
    hideGoToNext: (0, _computed.not)("displayGoToNext"),
    hideGoToLast: (0, _computed.not)("displayGoToLast"),
    loadFirstDisabled: (0, _computed.or)("loading", "hideGoToFirst"),
    loadPreviousDisabled: (0, _computed.or)("loading", "hideGoToPrevious"),
    loadNextDisabled: (0, _computed.or)("loading", "hideGoToNext"),
    loadLastDisabled: (0, _computed.or)("loading", "hideGoToLast"),
    displayShow(prevHidden) {
      return prevHidden && this.currentUser && this.currentUser.get("staff");
    },
    displayHide(prevHidden) {
      return !prevHidden && this.currentUser && this.currentUser.get("staff");
    },
    displayEdit(lastRevision, currentRevision, canEdit, topicController) {
      return !!(canEdit && topicController && lastRevision === currentRevision);
    },
    editButtonLabel(wiki) {
      return `post.revisions.controls.${wiki ? "edit_wiki" : "edit_post"}`;
    },
    displayRevert() {
      return this.currentUser && this.currentUser.get("staff");
    },
    displayPermanentlyDeleteButton(previousHidden) {
      return this.siteSettings.can_permanently_delete && this.currentUser?.staff && previousHidden;
    },
    isEitherRevisionHidden: (0, _computed.or)("model.previous_hidden", "model.current_hidden"),
    hiddenClasses(prevHidden, currentHidden, displayingInline) {
      if (displayingInline) {
        return this.isEitherRevisionHidden ? "hidden-revision-either" : null;
      } else {
        let result = [];
        if (prevHidden) {
          result.push("hidden-revision-previous");
        }
        if (currentHidden) {
          result.push("hidden-revision-current");
        }
        return result.join(" ");
      }
    },
    displayingInline: (0, _computed.equal)("viewMode", "inline"),
    displayingSideBySide: (0, _computed.equal)("viewMode", "side_by_side"),
    displayingSideBySideMarkdown: (0, _computed.equal)("viewMode", "side_by_side_markdown"),
    inlineClass(displayingInline) {
      return displayingInline ? "active" : "";
    },
    sideBySideClass(displayingSideBySide) {
      return displayingSideBySide ? "active" : "";
    },
    sideBySideMarkdownClass(displayingSideBySideMarkdown) {
      return displayingSideBySideMarkdown ? "active" : "";
    },
    previousCategory(changes) {
      if (changes) {
        let category = _category.default.findById(changes["previous"]);
        return (0, _categoryLink.categoryBadgeHTML)(category, {
          allowUncategorized: true
        });
      }
    },
    currentCategory(changes) {
      if (changes) {
        let category = _category.default.findById(changes["current"]);
        return (0, _categoryLink.categoryBadgeHTML)(category, {
          allowUncategorized: true
        });
      }
    },
    wikiDisabled(changes) {
      return changes && !changes["current"];
    },
    postTypeDisabled(changes) {
      return changes && changes["current"] !== this.site.get("post_types.moderator_action");
    },
    titleDiff(viewMode) {
      if (viewMode === "side_by_side_markdown") {
        viewMode = "side_by_side";
      }
      return this.get("model.title_changes." + viewMode);
    },
    bodyDiffChanged() {
      const viewMode = this.viewMode;
      const html = this.get(`model.body_changes.${viewMode}`);
      if (viewMode === "side_by_side_markdown") {
        this.set("bodyDiff", html);
      } else {
        const opts = {
          features: {
            editHistory: true,
            historyOneboxes: true
          },
          allowListed: {
            editHistory: {
              custom: (tag, attr) => attr === "class"
            },
            historyOneboxes: ["header", "article", "div[style]"]
          }
        };
        return (0, _text.sanitizeAsync)(html, opts).then(result => this.set("bodyDiff", result));
      }
    },
    displayInline(event) {
      event?.preventDefault();
      this.set("viewMode", "inline");
    },
    displaySideBySide(event) {
      event?.preventDefault();
      this.set("viewMode", "side_by_side");
    },
    displaySideBySideMarkdown(event) {
      event?.preventDefault();
      this.set("viewMode", "side_by_side_markdown");
    },
    actions: {
      loadFirstVersion() {
        this.refresh(this.get("model.post_id"), this.get("model.first_revision"));
      },
      loadPreviousVersion() {
        this.refresh(this.get("model.post_id"), this.get("model.previous_revision"));
      },
      loadNextVersion() {
        this.refresh(this.get("model.post_id"), this.get("model.next_revision"));
      },
      loadLastVersion() {
        this.refresh(this.get("model.post_id"), this.get("model.last_revision"));
      },
      hideVersion() {
        this.hide(this.get("model.post_id"), this.get("model.current_revision"));
      },
      permanentlyDeleteVersions() {
        this.permanentlyDeleteRevisions(this.get("model.post_id"));
      },
      showVersion() {
        this.show(this.get("model.post_id"), this.get("model.current_revision"));
      },
      editPost() {
        this.topicController.send("editPost", this.post);
        this.send("closeModal");
      },
      revertToVersion() {
        this.revert(this.post, this.get("model.current_revision"));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_changeViewModeOnMobile", [_dec], Object.getOwnPropertyDescriptor(_obj, "_changeViewModeOnMobile"), _obj), _applyDecoratedDescriptor(_obj, "previousTagChanges", [_dec2], Object.getOwnPropertyDescriptor(_obj, "previousTagChanges"), _obj), _applyDecoratedDescriptor(_obj, "currentTagChanges", [_dec3], Object.getOwnPropertyDescriptor(_obj, "currentTagChanges"), _obj), _applyDecoratedDescriptor(_obj, "modalTitleKey", [_dec4], Object.getOwnPropertyDescriptor(_obj, "modalTitleKey"), _obj), _applyDecoratedDescriptor(_obj, "revisionsText", [_dec5], Object.getOwnPropertyDescriptor(_obj, "revisionsText"), _obj), _applyDecoratedDescriptor(_obj, "revertToRevisionText", [_dec6], Object.getOwnPropertyDescriptor(_obj, "revertToRevisionText"), _obj), _applyDecoratedDescriptor(_obj, "createdAtDate", [_dec7], Object.getOwnPropertyDescriptor(_obj, "createdAtDate"), _obj), _applyDecoratedDescriptor(_obj, "previousVersion", [_dec8], Object.getOwnPropertyDescriptor(_obj, "previousVersion"), _obj), _applyDecoratedDescriptor(_obj, "displayGoToPrevious", [_dec9], Object.getOwnPropertyDescriptor(_obj, "displayGoToPrevious"), _obj), _applyDecoratedDescriptor(_obj, "displayShow", [_dec10], Object.getOwnPropertyDescriptor(_obj, "displayShow"), _obj), _applyDecoratedDescriptor(_obj, "displayHide", [_dec11], Object.getOwnPropertyDescriptor(_obj, "displayHide"), _obj), _applyDecoratedDescriptor(_obj, "displayEdit", [_dec12], Object.getOwnPropertyDescriptor(_obj, "displayEdit"), _obj), _applyDecoratedDescriptor(_obj, "editButtonLabel", [_dec13], Object.getOwnPropertyDescriptor(_obj, "editButtonLabel"), _obj), _applyDecoratedDescriptor(_obj, "displayRevert", [_dec14], Object.getOwnPropertyDescriptor(_obj, "displayRevert"), _obj), _applyDecoratedDescriptor(_obj, "displayPermanentlyDeleteButton", [_dec15], Object.getOwnPropertyDescriptor(_obj, "displayPermanentlyDeleteButton"), _obj), _applyDecoratedDescriptor(_obj, "hiddenClasses", [_dec16], Object.getOwnPropertyDescriptor(_obj, "hiddenClasses"), _obj), _applyDecoratedDescriptor(_obj, "inlineClass", [_dec17], Object.getOwnPropertyDescriptor(_obj, "inlineClass"), _obj), _applyDecoratedDescriptor(_obj, "sideBySideClass", [_dec18], Object.getOwnPropertyDescriptor(_obj, "sideBySideClass"), _obj), _applyDecoratedDescriptor(_obj, "sideBySideMarkdownClass", [_dec19], Object.getOwnPropertyDescriptor(_obj, "sideBySideMarkdownClass"), _obj), _applyDecoratedDescriptor(_obj, "previousCategory", [_dec20], Object.getOwnPropertyDescriptor(_obj, "previousCategory"), _obj), _applyDecoratedDescriptor(_obj, "currentCategory", [_dec21], Object.getOwnPropertyDescriptor(_obj, "currentCategory"), _obj), _applyDecoratedDescriptor(_obj, "wikiDisabled", [_dec22], Object.getOwnPropertyDescriptor(_obj, "wikiDisabled"), _obj), _applyDecoratedDescriptor(_obj, "postTypeDisabled", [_dec23], Object.getOwnPropertyDescriptor(_obj, "postTypeDisabled"), _obj), _applyDecoratedDescriptor(_obj, "titleDiff", [_dec24], Object.getOwnPropertyDescriptor(_obj, "titleDiff"), _obj), _applyDecoratedDescriptor(_obj, "bodyDiffChanged", [_dec25], Object.getOwnPropertyDescriptor(_obj, "bodyDiffChanged"), _obj), _applyDecoratedDescriptor(_obj, "displayInline", [_object.action], Object.getOwnPropertyDescriptor(_obj, "displayInline"), _obj), _applyDecoratedDescriptor(_obj, "displaySideBySide", [_object.action], Object.getOwnPropertyDescriptor(_obj, "displaySideBySide"), _obj), _applyDecoratedDescriptor(_obj, "displaySideBySideMarkdown", [_object.action], Object.getOwnPropertyDescriptor(_obj, "displaySideBySideMarkdown"), _obj)), _obj)));
  _exports.default = _default;
});