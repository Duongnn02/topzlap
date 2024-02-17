define("discourse/mixins/card-contents-base", ["exports", "@ember/object/computed", "@ember/runloop", "discourse/lib/url", "@ember/object/mixin", "discourse/lib/utilities", "@ember/service", "discourse/lib/intercept-click", "discourse-common/utils/decorators", "discourse-common/lib/later", "@popperjs/core", "discourse/lib/offset-calculator"], function (_exports, _computed, _runloop, _url, _mixin, _utilities, _service, _interceptClick, _decorators, _later, _core, _offsetCalculator) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addCardClickListenerSelector = addCardClickListenerSelector;
  _exports.default = void 0;
  _exports.resetCardClickListenerSelector = resetCardClickListenerSelector;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/runloop",0,"discourse/lib/url",0,"@ember/object/mixin",0,"discourse/lib/utilities",0,"@ember/service",0,"discourse/lib/intercept-click",0,"discourse-common/utils/decorators",0,"discourse-common/lib/later",0,"@popperjs/core",0,"discourse/lib/offset-calculator"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const DEFAULT_SELECTOR = "#main-outlet";
  let _cardClickListenerSelectors = [DEFAULT_SELECTOR];
  function addCardClickListenerSelector(selector) {
    _cardClickListenerSelectors.push(selector);
  }
  function resetCardClickListenerSelector() {
    _cardClickListenerSelectors = [DEFAULT_SELECTOR];
  }
  var _default = _mixin.default.create((_obj = {
    router: (0, _service.inject)(),
    elementId: null,
    //click detection added for data-{elementId}
    triggeringLinkClass: null,
    //the <a> classname where this card should appear
    _showCallback: null,
    //username, $target - load up data for when show is called, should call this._positionCard($target) when it's done.

    postStream: (0, _computed.alias)("topic.postStream"),
    viewingTopic: (0, _computed.match)("router.currentRouteName", /^topic\./),
    visible: false,
    username: null,
    loading: null,
    cardTarget: null,
    post: null,
    isDocked: false,
    _popperReference: null,
    _show(username, target, event) {
      // No user card for anon
      if (this.siteSettings.hide_user_profiles_from_public && !this.currentUser) {
        return false;
      }
      username = (0, _utilities.escapeExpression)(username.toString());

      // Don't show if nested
      if (target.closest(".card-content")) {
        this._close();
        _url.default.routeTo(target.href);
        return false;
      }
      this.appEvents.trigger("card:show", username, target, event);
      const closestArticle = target.closest("article");
      const postId = closestArticle?.dataset?.postId || null;
      const wasVisible = this.visible;
      const previousTarget = this.cardTarget;
      if (wasVisible) {
        this._close();
        if (target === previousTarget) {
          return;
        }
      }
      const post = this.viewingTopic && postId ? this.postStream.findLoadedPost(postId) : null;
      this.setProperties({
        username,
        loading: username,
        cardTarget: target,
        post
      });
      document.querySelector(".card-cloak")?.classList.remove("hidden");
      this.appEvents.trigger("user-card:show", {
        username
      });
      this._showCallback(username, $(target)).then(user => {
        this.appEvents.trigger("user-card:after-show", {
          user
        });
        this._positionCard($(target), event);
      });

      // We bind scrolling on mobile after cards are shown to hide them if user scrolls
      if (this.site.mobileView) {
        this._bindMobileScroll();
      }
      return false;
    },
    didInsertElement() {
      this._super(...arguments);
      const id = this.elementId;
      const triggeringLinkClass = this.triggeringLinkClass;
      const previewClickEvent = `click.discourse-preview-${id}-${triggeringLinkClass}`;
      const mobileScrollEvent = "scroll.mobile-card-cloak";
      this.setProperties({
        boundCardClickHandler: this._cardClickHandler,
        previewClickEvent,
        mobileScrollEvent
      });
      document.addEventListener("mousedown", this._clickOutsideHandler);
      document.addEventListener("keyup", this._escListener);
      _cardClickListenerSelectors.forEach(selector => {
        document.querySelector(selector).addEventListener("click", this.boundCardClickHandler);
      });
      this.appEvents.on(previewClickEvent, this, "_previewClick");
      this.appEvents.on(`topic-header:trigger-${id}`, this, "_topicHeaderTrigger");
      this.appEvents.on("card:close", this, "_close");
    },
    _cardClickHandler(event) {
      if (this.avatarSelector) {
        let matched = this._showCardOnClick(event, this.avatarSelector, el => el.dataset[this.avatarDataAttrKey]);
        if (matched) {
          return; // Don't need to check for mention click; it's an avatar click
        }
      }

      // Mention click
      this._showCardOnClick(event, this.mentionSelector, el => el.innerText.replace(/^@/, ""));
    },
    _showCardOnClick(event, selector, transformText) {
      let matchingEl = event.target.closest(selector);
      if (matchingEl) {
        if ((0, _interceptClick.wantsNewWindow)(event)) {
          return true;
        }
        event.preventDefault();
        event.stopPropagation();
        return this._show(transformText(matchingEl), matchingEl, event);
      }
      return false;
    },
    _topicHeaderTrigger(username, target) {
      this.setProperties({
        isDocked: true
      });
      return this._show(username, target);
    },
    _bindMobileScroll() {
      const mobileScrollEvent = this.mobileScrollEvent;
      const onScroll = () => {
        (0, _runloop.throttle)(this, this._close, 1000);
      };
      $(window).on(mobileScrollEvent, onScroll);
    },
    _unbindMobileScroll() {
      const mobileScrollEvent = this.mobileScrollEvent;
      $(window).off(mobileScrollEvent);
    },
    _previewClick($target) {
      return this._show($target.text().replace(/^@/, ""), $target);
    },
    _positionCard(target, event) {
      this._popperReference?.destroy();
      (0, _runloop.schedule)("afterRender", () => {
        if (!target) {
          return;
        }
        if (this.site.desktopView) {
          const avatarOverflowSize = 44;
          this._popperReference = (0, _core.createPopper)(target[0], this.element, {
            placement: "right",
            modifiers: [{
              name: "preventOverflow",
              options: {
                padding: {
                  top: (0, _offsetCalculator.headerOffset)() + avatarOverflowSize,
                  right: 10,
                  bottom: 10,
                  left: 10
                }
              }
            }, {
              name: "eventListeners",
              enabled: false
            }, {
              name: "offset",
              options: {
                offset: [10, 10]
              }
            }]
          });
        } else {
          this._popperReference = (0, _core.createPopper)(target[0], this.element, {
            modifiers: [{
              name: "eventListeners",
              enabled: false
            }, {
              name: "computeStyles",
              enabled: true,
              fn(_ref) {
                let {
                  state
                } = _ref;
                // mimics our modal top of the screen positioning
                state.styles.popper = {
                  ...state.styles.popper,
                  position: "fixed",
                  left: `${(window.innerWidth - state.rects.popper.width) / 2}px`,
                  top: "10%",
                  transform: "translateY(-10%)"
                };
                return state;
              }
            }]
          });
        }
        this.element.classList.toggle("docked-card", this.isDocked);

        // After the card is shown, focus on the first link
        //
        // note: we DO NOT use afterRender here cause _positionCard may
        // run afterwards, if we allowed this to happen the usercard
        // may be offscreen and we may scroll all the way to it on focus
        if (event?.pointerId === -1) {
          (0, _later.default)(() => {
            this.element.querySelector("a")?.focus();
          }, 350);
        }
      });
    },
    _hide() {
      if (!this.visible) {
        $(this.element).css({
          left: -9999,
          top: -9999
        });
        if (this.site.mobileView) {
          $(".card-cloak").addClass("hidden");
        }
      }
    },
    _close() {
      this.setProperties({
        visible: false,
        username: null,
        loading: null,
        cardTarget: null,
        post: null,
        isDocked: false
      });

      // Card will be removed, so we unbind mobile scrolling
      if (this.site.mobileView) {
        this._unbindMobileScroll();
      }
      this._hide();
      this.appEvents.trigger("card:hide");
    },
    willDestroyElement() {
      this._super(...arguments);
      document.removeEventListener("mousedown", this._clickOutsideHandler);
      document.removeEventListener("keyup", this._escListener);
      _cardClickListenerSelectors.forEach(selector => {
        document.querySelector(selector).removeEventListener("click", this.boundCardClickHandler);
      });
      const previewClickEvent = this.previewClickEvent;
      this.appEvents.off(previewClickEvent, this, "_previewClick");
      this.appEvents.off(`topic-header:trigger-${this.elementId}`, this, "_topicHeaderTrigger");
      this.appEvents.off("card:close", this, "_close");
      this._hide();
    },
    _clickOutsideHandler(event) {
      if (this.visible) {
        if (event.target.closest(`[data-${this.elementId}]`)?.getAttribute(`data-${this.elementId}`) || event.target.closest(`a.${this.triggeringLinkClass}`) || event.target.closest(`#${this.elementId}`)) {
          return;
        }
        this._close();
      }
      return true;
    },
    _escListener(event) {
      if (this.visible && event.key === "Escape") {
        this.cardTarget?.focus();
        this._close();
        return;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_cardClickHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_cardClickHandler"), _obj), _applyDecoratedDescriptor(_obj, "_hide", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_hide"), _obj), _applyDecoratedDescriptor(_obj, "_clickOutsideHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_clickOutsideHandler"), _obj), _applyDecoratedDescriptor(_obj, "_escListener", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_escListener"), _obj)), _obj));
  _exports.default = _default;
});