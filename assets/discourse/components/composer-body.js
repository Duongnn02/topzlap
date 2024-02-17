define("discourse/components/composer-body", ["exports", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators", "@ember/component", "discourse/models/composer", "discourse/mixins/key-enter-escape", "discourse-common/lib/debounce", "discourse/lib/offset-calculator", "discourse/lib/safari-hacks"], function (_exports, _runloop, _later, _decorators, _component, _composer, _keyEnterEscape, _debounce, _offsetCalculator, _safariHacks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse-common/utils/decorators",0,"@ember/component",0,"discourse/models/composer",0,"discourse/mixins/key-enter-escape",0,"discourse-common/lib/debounce",0,"discourse/lib/offset-calculator",0,"discourse/lib/safari-hacks"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const START_DRAG_EVENTS = ["touchstart", "mousedown"];
  const DRAG_EVENTS = ["touchmove", "mousemove"];
  const END_DRAG_EVENTS = ["touchend", "mouseup"];
  const THROTTLE_RATE = 20;
  function mouseYPos(e) {
    return e.clientY || e.touches && e.touches[0] && e.touches[0].clientY;
  }
  var _default = _component.default.extend(_keyEnterEscape.default, (_dec = (0, _decorators.default)("composer.action"), _dec2 = (0, _decorators.default)("currentUser.primary_group_name"), _dec3 = (0, _decorators.default)("composer.composeState"), _dec4 = (0, _decorators.observes)("composeState"), _dec5 = (0, _decorators.observes)("composeState", "composer.{action,canEditTopicFeaturedLink}"), (_obj = {
    elementId: "reply-control",
    classNameBindings: ["composer.creatingPrivateMessage:private-message", "composeState", "composer.loading", "prefixedComposerAction", "composer.canEditTitle:edit-title", "composer.createdPost:created-post", "composer.creatingTopic:topic", "composer.whisper:composing-whisper", "composer.sharedDraft:composing-shared-draft", "showPreview:show-preview:hide-preview", "currentUserPrimaryGroupClass"],
    prefixedComposerAction(action) {
      return action ? `composer-action-${action}` : "";
    },
    currentUserPrimaryGroupClass(primaryGroupName) {
      return primaryGroupName && `group-${primaryGroupName}`;
    },
    composeState(composeState) {
      return composeState || _composer.default.CLOSED;
    },
    keyUp() {
      this.typed();
      const lastKeyUp = new Date();
      this._lastKeyUp = lastKeyUp;

      // One second from now, check to see if the last key was hit when
      // we recorded it. If it was, the user paused typing.
      (0, _runloop.cancel)(this._lastKeyTimeout);
      this._lastKeyTimeout = (0, _later.default)(() => {
        if (lastKeyUp !== this._lastKeyUp) {
          return;
        }
        this.appEvents.trigger("composer:find-similar");
      }, 1000);
    },
    disableFullscreen() {
      if (this.composeState !== _composer.default.OPEN && _safariHacks.default.blur) {
        _safariHacks.default.blur();
      }
    },
    setupComposerResizeEvents() {
      this.origComposerSize = 0;
      this.lastMousePos = 0;
      START_DRAG_EVENTS.forEach(startDragEvent => {
        this.element.querySelector(".grippie")?.addEventListener(startDragEvent, this.startDragHandler, {
          passive: false
        });
      });
    },
    performDragHandler() {
      this.appEvents.trigger("composer:div-resizing");
      this.element.classList.add("clear-transitions");
      const currentMousePos = mouseYPos(event);
      let size = this.origComposerSize + (this.lastMousePos - currentMousePos);
      size = Math.min(size, window.innerHeight - (0, _offsetCalculator.headerOffset)());
      const minHeight = parseInt(getComputedStyle(this.element).minHeight, 10);
      size = Math.max(minHeight, size);
      this.set("composer.composerHeight", `${size}px`);
      this.keyValueStore.set({
        key: "composerHeight",
        value: this.get("composer.composerHeight")
      });
      document.documentElement.style.setProperty("--composer-height", size ? `${size}px` : "");
      this._triggerComposerResized();
    },
    _triggerComposerResized() {
      (0, _runloop.schedule)("afterRender", () => {
        if (!this.element || this.isDestroying || this.isDestroyed) {
          return;
        }
        (0, _debounce.default)(this, this.composerResized, 300);
      });
    },
    composerResized() {
      this.appEvents.trigger("composer:resized");
    },
    startDragHandler(event) {
      event.preventDefault();
      this.origComposerSize = this.element.offsetHeight;
      this.lastMousePos = mouseYPos(event);
      DRAG_EVENTS.forEach(dragEvent => {
        document.addEventListener(dragEvent, this.throttledPerformDrag);
      });
      END_DRAG_EVENTS.forEach(endDragEvent => {
        document.addEventListener(endDragEvent, this.endDragHandler);
      });
      this.appEvents.trigger("composer:resize-started");
    },
    endDragHandler() {
      this.appEvents.trigger("composer:resize-ended");
      DRAG_EVENTS.forEach(dragEvent => {
        document.removeEventListener(dragEvent, this.throttledPerformDrag);
      });
      END_DRAG_EVENTS.forEach(endDragEvent => {
        document.removeEventListener(endDragEvent, this.endDragHandler);
      });
      this.element.classList.remove("clear-transitions");
      this.element.focus();
    },
    throttledPerformDrag(event) {
      event.preventDefault();
      (0, _runloop.throttle)(this, this.performDragHandler, event, THROTTLE_RATE);
    },
    didInsertElement() {
      this._super(...arguments);
      this.setupComposerResizeEvents();
      const triggerOpen = () => {
        if (this.get("composer.composeState") === _composer.default.OPEN) {
          this.appEvents.trigger("composer:opened");
        }
      };
      triggerOpen();
      this.element.addEventListener("transitionend", () => {
        triggerOpen();
      });
      (0, _safariHacks.default)(this.element);
    },
    willDestroyElement() {
      this._super(...arguments);
      START_DRAG_EVENTS.forEach(startDragEvent => {
        this.element.querySelector(".grippie")?.removeEventListener(startDragEvent, this.startDragHandler);
      });
      (0, _runloop.cancel)(this._lastKeyTimeout);
    },
    click() {
      this.openIfDraft();
    }
  }, (_applyDecoratedDescriptor(_obj, "prefixedComposerAction", [_dec], Object.getOwnPropertyDescriptor(_obj, "prefixedComposerAction"), _obj), _applyDecoratedDescriptor(_obj, "currentUserPrimaryGroupClass", [_dec2], Object.getOwnPropertyDescriptor(_obj, "currentUserPrimaryGroupClass"), _obj), _applyDecoratedDescriptor(_obj, "composeState", [_dec3], Object.getOwnPropertyDescriptor(_obj, "composeState"), _obj), _applyDecoratedDescriptor(_obj, "disableFullscreen", [_dec4], Object.getOwnPropertyDescriptor(_obj, "disableFullscreen"), _obj), _applyDecoratedDescriptor(_obj, "performDragHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "performDragHandler"), _obj), _applyDecoratedDescriptor(_obj, "_triggerComposerResized", [_dec5], Object.getOwnPropertyDescriptor(_obj, "_triggerComposerResized"), _obj), _applyDecoratedDescriptor(_obj, "startDragHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "startDragHandler"), _obj), _applyDecoratedDescriptor(_obj, "endDragHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "endDragHandler"), _obj), _applyDecoratedDescriptor(_obj, "throttledPerformDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "throttledPerformDrag"), _obj)), _obj)));
  _exports.default = _default;
});