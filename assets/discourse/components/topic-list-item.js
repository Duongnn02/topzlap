define("discourse/components/topic-list-item", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse/lib/url", "I18n", "discourse-common/lib/raw-handlebars-helpers", "@ember/object/computed", "discourse-common/lib/raw-templates", "@ember/object/evented", "@ember/runloop", "discourse/components/topic-title", "discourse/lib/intercept-click", "@ember/template"], function (_exports, _component, _templateFactory, _decorators, _url, _I18n, _rawHandlebarsHelpers, _computed, _rawTemplates, _evented, _runloop, _topicTitle, _interceptClick, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.navigateToTopic = navigateToTopic;
  _exports.showEntrance = showEntrance;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"discourse/lib/url",0,"I18n",0,"discourse-common/lib/raw-handlebars-helpers",0,"@ember/object/computed",0,"discourse-common/lib/raw-templates",0,"@ember/object/evented",0,"@ember/runloop",0,"discourse/components/topic-title",0,"discourse/lib/intercept-click",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.topicListItemContents}}
  */
  {
    "id": "TXziJ4Z2",
    "block": "[[[1,[30,0,[\"topicListItemContents\"]]]],[],false,[]]",
    "moduleName": "discourse/components/topic-list-item.hbs",
    "isStrictMode": false
  });
  function showEntrance(e) {
    let target = $(e.target);
    if (target.hasClass("posts-map") || target.parents(".posts-map").length > 0) {
      if (target.prop("tagName") !== "A") {
        target = target.find("a");
        if (target.length === 0) {
          target = target.end();
        }
      }
      this.appEvents.trigger("topic-entrance:show", {
        topic: this.topic,
        position: target.offset()
      });
      return false;
    }
  }
  function navigateToTopic(topic, href) {
    this.appEvents.trigger("header:update-topic", topic);
    _url.default.routeTo(href || topic.get("url"));
    return false;
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.observes)("topic.pinned"), _dec2 = (0, _decorators.default)("topic.id"), _dec3 = (0, _decorators.default)("topic.unread_by_group_member"), _dec4 = (0, _decorators.default)("topic.unread_by_group_member"), _dec5 = (0, _decorators.default)("topic", "lastVisitedTopic"), (_obj = {
    tagName: "tr",
    classNameBindings: [":topic-list-item", "unboundClassNames", "topic.visited"],
    attributeBindings: ["data-topic-id", "role", "ariaLevel:aria-level"],
    "data-topic-id": (0, _computed.alias)("topic.id"),
    didReceiveAttrs() {
      this._super(...arguments);
      this.renderTopicListItem();
    },
    renderTopicListItem() {
      const template = (0, _rawTemplates.findRawTemplate)("list/topic-list-item");
      if (template) {
        this.set("topicListItemContents", (0, _template.htmlSafe)(template(this, _rawHandlebarsHelpers.RUNTIME_OPTIONS)));
        (0, _runloop.schedule)("afterRender", () => {
          if (this.selected && this.selected.includes(this.topic)) {
            this.element.querySelector("input.bulk-select").checked = true;
          }
          if (this._shouldFocusLastVisited()) {
            const title = this._titleElement();
            if (title) {
              title.addEventListener("focus", this._onTitleFocus);
              title.addEventListener("blur", this._onTitleBlur);
            }
          }
        });
      }
    },
    didInsertElement() {
      this._super(...arguments);
      if (this.includeUnreadIndicator) {
        this.messageBus.subscribe(this.unreadIndicatorChannel, this.onMessage);
      }
      (0, _runloop.schedule)("afterRender", () => {
        if (this.element && !this.isDestroying && !this.isDestroyed) {
          const rawTopicLink = this.element.querySelector(".raw-topic-link");
          rawTopicLink && _topicTitle.topicTitleDecorators?.forEach(cb => cb(this.topic, rawTopicLink, "topic-list-item-title"));
        }
      });
    },
    willDestroyElement() {
      this._super(...arguments);
      this.messageBus.unsubscribe(this.unreadIndicatorChannel, this.onMessage);
      if (this._shouldFocusLastVisited()) {
        const title = this._titleElement();
        if (title) {
          title.removeEventListener("focus", this._onTitleFocus);
          title.removeEventListener("blur", this._onTitleBlur);
        }
      }
    },
    onMessage(data) {
      const nodeClassList = document.querySelector(`.indicator-topic-${data.topic_id}`).classList;
      nodeClassList.toggle("read", !data.show_indicator);
    },
    unreadIndicatorChannel(topicId) {
      return `/private-messages/unread-indicator/${topicId}`;
    },
    unreadClass(unreadByGroupMember) {
      return unreadByGroupMember ? "" : "read";
    },
    includeUnreadIndicator(unreadByGroupMember) {
      return typeof unreadByGroupMember !== "undefined";
    },
    newDotText() {
      return this.currentUser && this.currentUser.trust_level > 0 ? "" : _I18n.default.t("filters.new.lower_title");
    },
    unboundClassNames(topic, lastVisitedTopic) {
      let classes = [];
      if (topic.get("category")) {
        classes.push("category-" + topic.get("category.fullSlug"));
      }
      if (topic.get("tags")) {
        topic.get("tags").forEach(tagName => classes.push("tag-" + tagName));
      }
      if (topic.get("hasExcerpt")) {
        classes.push("has-excerpt");
      }
      if (topic.get("unseen")) {
        classes.push("unseen-topic");
      }
      if (topic.unread_posts) {
        classes.push("unread-posts");
      }
      ["liked", "archived", "bookmarked", "pinned", "closed"].forEach(name => {
        if (topic.get(name)) {
          classes.push(name);
        }
      });
      if (topic === lastVisitedTopic) {
        classes.push("last-visit");
      }
      return classes.join(" ");
    },
    hasLikes() {
      return this.get("topic.like_count") > 0;
    },
    hasOpLikes() {
      return this.get("topic.op_like_count") > 0;
    },
    expandPinned() {
      const pinned = this.get("topic.pinned");
      if (!pinned) {
        return false;
      }
      if (this.site.mobileView) {
        if (!this.siteSettings.show_pinned_excerpt_mobile) {
          return false;
        }
      } else {
        if (!this.siteSettings.show_pinned_excerpt_desktop) {
          return false;
        }
      }
      if (this.expandGloballyPinned && this.get("topic.pinned_globally")) {
        return true;
      }
      if (this.expandAllPinned) {
        return true;
      }
      return false;
    },
    showEntrance,
    click(e) {
      const result = this.showEntrance(e);
      if (result === false) {
        return result;
      }
      const topic = this.topic;
      if (e.target.classList.contains("bulk-select")) {
        const selected = this.selected;
        if (e.target.checked) {
          selected.addObject(topic);
          if (this.lastChecked && e.shiftKey) {
            const bulkSelects = Array.from(document.querySelectorAll("input.bulk-select")),
              from = bulkSelects.indexOf(e.target),
              to = bulkSelects.findIndex(el => el.id === this.lastChecked.id),
              start = Math.min(from, to),
              end = Math.max(from, to);
            bulkSelects.slice(start, end).filter(el => el.checked !== true).forEach(checkbox => {
              checkbox.click();
            });
          }
          this.set("lastChecked", e.target);
        } else {
          selected.removeObject(topic);
          this.set("lastChecked", null);
        }
      }
      if (e.target.classList.contains("raw-topic-link")) {
        if ((0, _interceptClick.wantsNewWindow)(e)) {
          return true;
        }
        e.preventDefault();
        return this.navigateToTopic(topic, e.target.getAttribute("href"));
      }

      // make full row click target on mobile, due to size constraints
      if (this.site.mobileView && e.target.matches(".topic-list-data, .main-link, .right, .topic-item-stats, .topic-item-stats__category-tags, .discourse-tags")) {
        if ((0, _interceptClick.wantsNewWindow)(e)) {
          return true;
        }
        e.preventDefault();
        return this.navigateToTopic(topic, topic.lastUnreadUrl);
      }
      if (e.target.closest("a.topic-status")) {
        this.topic.togglePinnedForUser();
        return false;
      }
      return this.unhandledRowClick(e, topic);
    },
    unhandledRowClick() {},
    navigateToTopic,
    highlight() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        isLastViewedTopic: false
      };
      (0, _runloop.schedule)("afterRender", () => {
        if (!this.element || this.isDestroying || this.isDestroyed) {
          return;
        }
        this.element.classList.add("highlighted");
        this.element.setAttribute("data-islastviewedtopic", opts.isLastViewedTopic);
        this.element.addEventListener("animationend", () => {
          this.element.classList.remove("highlighted");
        });
        if (opts.isLastViewedTopic && this._shouldFocusLastVisited()) {
          this._titleElement()?.focus();
        }
      });
    },
    _highlightIfNeeded: (0, _evented.on)("didInsertElement", function () {
      // highlight the last topic viewed
      if (this.session.get("lastTopicIdViewed") === this.get("topic.id")) {
        this.session.set("lastTopicIdViewed", null);
        this.highlight({
          isLastViewedTopic: true
        });
      } else if (this.get("topic.highlight")) {
        // highlight new topics that have been loaded from the server or the one we just created
        this.set("topic.highlight", false);
        this.highlight();
      }
    }),
    _onTitleFocus() {
      if (this.element && !this.isDestroying && !this.isDestroyed) {
        this._mainLinkElement().classList.add("focused");
      }
    },
    _onTitleBlur() {
      if (this.element && !this.isDestroying && !this.isDestroyed) {
        this._mainLinkElement().classList.remove("focused");
      }
    },
    _shouldFocusLastVisited() {
      return !this.site.mobileView && this.focusLastVisitedTopic;
    },
    _mainLinkElement() {
      return this.element.querySelector(".main-link");
    },
    _titleElement() {
      return this.element.querySelector(".main-link .title");
    }
  }, (_applyDecoratedDescriptor(_obj, "renderTopicListItem", [_dec], Object.getOwnPropertyDescriptor(_obj, "renderTopicListItem"), _obj), _applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj), _applyDecoratedDescriptor(_obj, "unreadIndicatorChannel", [_dec2], Object.getOwnPropertyDescriptor(_obj, "unreadIndicatorChannel"), _obj), _applyDecoratedDescriptor(_obj, "unreadClass", [_dec3], Object.getOwnPropertyDescriptor(_obj, "unreadClass"), _obj), _applyDecoratedDescriptor(_obj, "includeUnreadIndicator", [_dec4], Object.getOwnPropertyDescriptor(_obj, "includeUnreadIndicator"), _obj), _applyDecoratedDescriptor(_obj, "newDotText", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "newDotText"), _obj), _applyDecoratedDescriptor(_obj, "unboundClassNames", [_dec5], Object.getOwnPropertyDescriptor(_obj, "unboundClassNames"), _obj), _applyDecoratedDescriptor(_obj, "expandPinned", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "expandPinned"), _obj), _applyDecoratedDescriptor(_obj, "_onTitleFocus", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_onTitleFocus"), _obj), _applyDecoratedDescriptor(_obj, "_onTitleBlur", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_onTitleBlur"), _obj)), _obj))));
  _exports.default = _default;
});