define("discourse/components/discourse-topic", ["exports", "@ember/utils", "@ember/runloop", "discourse-common/lib/later", "discourse/mixins/add-archetype-class", "discourse/lib/click-track", "@ember/component", "discourse/lib/url", "discourse/mixins/mobile-scroll-direction", "discourse/mixins/scrolling", "@ember/object/computed", "discourse/lib/utilities", "discourse-common/utils/decorators"], function (_exports, _utils, _runloop, _later, _addArchetypeClass, _clickTrack, _component, _url, _mobileScrollDirection, _scrolling, _computed, _utilities, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/utils",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/mixins/add-archetype-class",0,"discourse/lib/click-track",0,"@ember/component",0,"discourse/lib/url",0,"discourse/mixins/mobile-scroll-direction",0,"discourse/mixins/scrolling",0,"@ember/object/computed",0,"discourse/lib/utilities",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const MOBILE_SCROLL_DIRECTION_CHECK_THROTTLE = 300;
  var _default = _component.default.extend(_addArchetypeClass.default, _scrolling.default, _mobileScrollDirection.default, (_dec = (0, _decorators.observes)("enteredAt"), _dec2 = (0, _decorators.observes)("mobileScrollDirection"), (_obj = {
    userFilters: (0, _computed.alias)("topic.userFilters"),
    classNameBindings: ["multiSelect", "topic.archetype", "topic.is_warning", "topic.category.read_restricted:read_restricted", "topic.deleted:deleted-topic"],
    menuVisible: true,
    SHORT_POST: 1200,
    postStream: (0, _computed.alias)("topic.postStream"),
    archetype: (0, _computed.alias)("topic.archetype"),
    dockAt: 0,
    _lastShowTopic: null,
    mobileScrollDirection: null,
    pauseHeaderTopicUpdate: false,
    _enteredTopic() {
      // Ember is supposed to only call observers when values change but something
      // in our view set up is firing this observer with the same value. This check
      // prevents scrolled from being called twice
      if (this.enteredAt && this.lastEnteredAt !== this.enteredAt) {
        this._lastShowTopic = null;
        (0, _runloop.schedule)("afterRender", this.scrolled);
        this.set("lastEnteredAt", this.enteredAt);
      }
    },
    _highlightPost(postNumber) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if ((0, _utils.isBlank)(options.jump) || options.jump !== false) {
        (0, _runloop.scheduleOnce)("afterRender", null, _utilities.highlightPost, postNumber);
      }
    },
    _hideTopicInHeader() {
      this.appEvents.trigger("header:hide-topic");
      this._lastShowTopic = false;
    },
    _showTopicInHeader(topic) {
      if (this.pauseHeaderTopicUpdate) {
        return;
      }
      this.appEvents.trigger("header:show-topic", topic);
      this._lastShowTopic = true;
    },
    _updateTopic(topic, debounceDuration) {
      if (topic === null) {
        this._hideTopicInHeader();
        if (debounceDuration && !this.pauseHeaderTopicUpdate) {
          this.pauseHeaderTopicUpdate = true;
          this._lastShowTopic = true;
          (0, _later.default)(() => {
            this._lastShowTopic = false;
            this.pauseHeaderTopicUpdate = false;
          }, debounceDuration);
        }
        return;
      }
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      this._lastShowTopic = this.shouldShowTopicInHeader(topic, offset);
      if (this._lastShowTopic) {
        this._showTopicInHeader(topic);
      } else {
        this._hideTopicInHeader();
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.bindScrolling();
      window.addEventListener("resize", this.scrolled);
      $(this.element).on("click.discourse-redirect", ".cooked a, a.track-link", e => _clickTrack.default.trackClick(e, this.siteSettings));
      this.appEvents.on("discourse:focus-changed", this, "gotFocus");
      this.appEvents.on("post:highlight", this, "_highlightPost");
      this.appEvents.on("header:update-topic", this, "_updateTopic");
    },
    willDestroyElement() {
      this._super(...arguments);
      this.unbindScrolling();
      window.removeEventListener("resize", this.scrolled);

      // Unbind link tracking
      $(this.element).off("click.discourse-redirect", ".cooked a, a.track-link");
      this.resetExamineDockCache();

      // this happens after route exit, stuff could have trickled in
      this._hideTopicInHeader();
      this.appEvents.off("discourse:focus-changed", this, "gotFocus");
      this.appEvents.off("post:highlight", this, "_highlightPost");
      this.appEvents.off("header:update-topic", this, "_updateTopic");
    },
    gotFocus(hasFocus) {
      if (hasFocus) {
        this.scrolled();
      }
    },
    resetExamineDockCache() {
      this.set("dockAt", 0);
    },
    shouldShowTopicInHeader(topic, offset) {
      // On mobile, we show the header topic if the user has scrolled past the topic
      // title and the current scroll direction is down
      // On desktop the user only needs to scroll past the topic title.
      return offset > this.dockAt && (!this.site.mobileView || this.mobileScrollDirection === "down");
    },
    scrolled() {
      if (this.isDestroyed || this.isDestroying || this._state !== "inDOM") {
        return;
      }
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      if (this.dockAt === 0) {
        const title = document.querySelector("#topic-title");
        if (title) {
          this.set("dockAt", title.getBoundingClientRect().top + window.scrollY);
        }
      }
      this.set("hasScrolled", offset > 0);
      const showTopic = this.shouldShowTopicInHeader(this.topic, offset);
      if (showTopic !== this._lastShowTopic) {
        if (showTopic) {
          this._showTopicInHeader(this.topic);
        } else {
          if (!_url.default.isJumpScheduled()) {
            const loadingNear = this.topic.get("postStream.loadingNearPost") || 1;
            if (loadingNear === 1) {
              this._hideTopicInHeader();
            }
          }
        }
      }

      // Since the user has scrolled, we need to check the scroll direction on mobile.
      // We use throttle instead of debounce because we want the switch to occur
      // at the start of the scroll. This feels a lot more snappy compared to waiting
      // for the scroll to end if we debounce.
      if (this.site.mobileView && this.hasScrolled) {
        (0, _runloop.throttle)(this, this.calculateDirection, offset, MOBILE_SCROLL_DIRECTION_CHECK_THROTTLE);
      }

      // Trigger a scrolled event
      this.appEvents.trigger("topic:scrolled", offset);
    },
    toggleMobileHeaderTopic() {
      return this.appEvents.trigger("header:update-topic", this.mobileScrollDirection === "down" ? this.topic : null);
    }
  }, (_applyDecoratedDescriptor(_obj, "_enteredTopic", [_dec], Object.getOwnPropertyDescriptor(_obj, "_enteredTopic"), _obj), _applyDecoratedDescriptor(_obj, "scrolled", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "scrolled"), _obj), _applyDecoratedDescriptor(_obj, "toggleMobileHeaderTopic", [_dec2], Object.getOwnPropertyDescriptor(_obj, "toggleMobileHeaderTopic"), _obj)), _obj)));
  _exports.default = _default;
});