define("discourse/components/composer-title", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "@ember/runloop", "@ember/object", "I18n", "discourse/lib/ajax", "discourse-common/lib/debounce", "discourse-common/config/environment", "pretty-text/oneboxer", "pretty-text/oneboxer-cache", "discourse/lib/put-cursor-at-end"], function (_exports, _component, _templateFactory, _computed, _decorators, _runloop, _object, _I18n, _ajax, _debounce, _environment, _oneboxer, _oneboxerCache, _putCursorAtEnd) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/runloop",0,"@ember/component",0,"@ember/object",0,"I18n",0,"discourse/lib/ajax",0,"discourse-common/lib/debounce",0,"discourse-common/config/environment",0,"pretty-text/oneboxer",0,"pretty-text/oneboxer-cache",0,"discourse/lib/put-cursor-at-end"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <TextField
    @value={{this.composer.title}}
    @id="reply-title"
    @maxLength={{this.titleMaxLength}}
    @placeholderKey={{this.composer.titlePlaceholder}}
    @aria-label={{I18n this.composer.titlePlaceholder}}
    @disabled={{this.disabled}}
    @autocomplete="off"
  />
  
  <PopupInputTip @validation={{this.validation}} />
  */
  {
    "id": "D8lYh/AJ",
    "block": "[[[8,[39,0],null,[[\"@value\",\"@id\",\"@maxLength\",\"@placeholderKey\",\"@aria-label\",\"@disabled\",\"@autocomplete\"],[[30,0,[\"composer\",\"title\"]],\"reply-title\",[30,0,[\"titleMaxLength\"]],[30,0,[\"composer\",\"titlePlaceholder\"]],[28,[37,1],[[30,0,[\"composer\",\"titlePlaceholder\"]]],null],[30,0,[\"disabled\"]],\"off\"]],null],[1,\"\\n\\n\"],[8,[39,2],null,[[\"@validation\"],[[30,0,[\"validation\"]]]],null]],[],false,[\"text-field\",\"I18n\",\"popup-input-tip\"]]",
    "moduleName": "discourse/components/composer-title.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("composer.titleLength", "composer.missingTitleCharacters", "composer.minimumTitleLength", "lastValidatedAt"), _dec2 = (0, _decorators.default)("watchForLink"), _dec3 = (0, _decorators.observes)("composer.titleLength", "watchForLink"), _dec4 = (0, _decorators.observes)("composer.replyLength"), _dec5 = (0, _decorators.default)("composer.title", "composer.titleLength"), (_obj = {
    classNames: ["title-input"],
    watchForLink: (0, _computed.alias)("composer.canEditTopicFeaturedLink"),
    disabled: (0, _computed.or)("composer.loading", "composer.disableTitleInput"),
    didInsertElement() {
      this._super(...arguments);
      if (this.focusTarget === "title") {
        (0, _putCursorAtEnd.default)(this.element.querySelector("input"));
      }
      if (this.get("composer.titleLength") > 0) {
        (0, _debounce.default)(this, this._titleChanged, 10);
      }
    },
    validation(titleLength, missingTitleChars, minimumTitleLength, lastValidatedAt) {
      let reason;
      if (titleLength < 1) {
        reason = _I18n.default.t("composer.error.title_missing");
      } else if (missingTitleChars > 0) {
        reason = _I18n.default.t("composer.error.title_too_short", {
          count: minimumTitleLength
        });
      } else if (titleLength > this.siteSettings.max_topic_title_length) {
        reason = _I18n.default.t("composer.error.title_too_long", {
          count: this.siteSettings.max_topic_title_length
        });
      }
      if (reason) {
        return _object.default.create({
          failed: true,
          reason,
          lastShownAt: lastValidatedAt
        });
      }
    },
    titleMaxLength(watchForLink) {
      // maxLength gets in the way of pasting long links, so don't use it if featured links are allowed.
      // Validation will display a message if titles are too long.
      return watchForLink ? null : this.siteSettings.max_topic_title_length;
    },
    _titleChanged() {
      if (this.get("composer.titleLength") === 0) {
        this.set("autoPosted", false);
      }
      if (this.autoPosted || !this.watchForLink) {
        return;
      }
      if ((0, _environment.isTesting)()) {
        (0, _runloop.next)(() =>
        // not ideal but we don't want to run this in current
        // runloop to avoid an error in console
        this._checkForUrl());
      } else {
        (0, _debounce.default)(this, this._checkForUrl, 500);
      }
    },
    _clearFeaturedLink() {
      if (this.watchForLink && this.bodyIsDefault()) {
        this.set("composer.featuredLink", null);
      }
    },
    _checkForUrl() {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      if (this.isAbsoluteUrl && this.bodyIsDefault()) {
        // only feature links to external sites
        if (this.get("composer.title").match(new RegExp("^https?:\\/\\/" + window.location.hostname, "i"))) {
          return;
        }

        // Try to onebox. If success, update post body and title.
        this.set("composer.loading", true);
        const link = document.createElement("a");
        link.href = this.get("composer.title");
        const loadOnebox = (0, _oneboxer.load)({
          elem: link,
          refresh: false,
          ajax: _ajax.ajax,
          synchronous: true,
          categoryId: this.get("composer.category.id"),
          topicId: this.get("composer.topic.id")
        });
        if (loadOnebox && loadOnebox.then) {
          loadOnebox.then(() => {
            const v = (0, _oneboxerCache.lookupCache)(this.get("composer.title"));
            this._updatePost(v ? v : link);
          }).finally(() => {
            this.set("composer.loading", false);
            (0, _runloop.schedule)("afterRender", () => {
              (0, _putCursorAtEnd.default)(this.element.querySelector("input"));
            });
          });
        } else {
          this._updatePost(loadOnebox);
          this.set("composer.loading", false);
          (0, _runloop.schedule)("afterRender", () => {
            (0, _putCursorAtEnd.default)(this.element.querySelector("input"));
          });
        }
      }
    },
    _updatePost(html) {
      if (html) {
        const frag = document.createRange().createContextualFragment(html),
          composer = this.composer;
        this.set("autoPosted", true);
        this.set("composer.featuredLink", this.get("composer.title"));
        composer.appendText(this.get("composer.title"), null, {
          block: true
        });
        if (frag.querySelector(".twitterstatus")) {
          this.set("composer.title", "");
          return;
        }
        const heading = frag.querySelector("h3, h4");
        const title = heading && heading.textContent || frag.firstElementChild && frag.firstElementChild.title;
        if (title) {
          this.changeTitle(title);
        } else {
          const firstTitle = frag.firstChild && frag.firstChild.attributes && frag.firstChild.attributes.title || frag.querySelector("[title]") && frag.querySelector("[title]").attributes.title;
          if (firstTitle) {
            this.changeTitle(firstTitle);
          }
        }
      }
    },
    changeTitle(val) {
      if (val && val.length > 0) {
        this.set("composer.title", val.trim());
      }
    },
    isAbsoluteUrl(title, titleLength) {
      return titleLength > 0 && /^(https?:)?\/\/[\w\.\-]+/i.test(title) && !/\s/.test(title);
    },
    bodyIsDefault() {
      const reply = this.get("composer.reply") || "";
      return reply.length === 0 || reply === (this.get("composer.category.topic_template") || "");
    }
  }, (_applyDecoratedDescriptor(_obj, "validation", [_dec], Object.getOwnPropertyDescriptor(_obj, "validation"), _obj), _applyDecoratedDescriptor(_obj, "titleMaxLength", [_dec2], Object.getOwnPropertyDescriptor(_obj, "titleMaxLength"), _obj), _applyDecoratedDescriptor(_obj, "_titleChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_titleChanged"), _obj), _applyDecoratedDescriptor(_obj, "_clearFeaturedLink", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_clearFeaturedLink"), _obj), _applyDecoratedDescriptor(_obj, "isAbsoluteUrl", [_dec5], Object.getOwnPropertyDescriptor(_obj, "isAbsoluteUrl"), _obj)), _obj))));
  _exports.default = _default;
});