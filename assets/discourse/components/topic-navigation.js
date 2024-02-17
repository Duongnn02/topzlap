define("discourse/components/topic-navigation", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/pan-events", "@ember/object", "discourse-common/lib/debounce", "discourse/lib/offset-calculator", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _panEvents, _object, _debounce, _offsetCalculator, _runloop, _later, _decorators, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/mixins/pan-events",0,"@ember/component",0,"@ember/object",0,"discourse-common/lib/debounce",0,"discourse/lib/offset-calculator",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse-common/utils/decorators",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canRender}}
    {{yield this.info}}
  {{/if}}
  */
  {
    "id": "Je3pbzQj",
    "block": "[[[41,[30,0,[\"canRender\"]],[[[1,\"  \"],[18,1,[[30,0,[\"info\"]]]],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"if\",\"yield\"]]",
    "moduleName": "discourse/components/topic-navigation.hbs",
    "isStrictMode": false
  });
  const MIN_WIDTH_TIMELINE = 924,
    MIN_HEIGHT_TIMELINE = 325;
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_panEvents.default, (_dec = (0, _decorators.observes)("info.topicProgressExpanded"), (_obj = {
    classNameBindings: ["info.topicProgressExpanded:topic-progress-expanded", "info.renderTimeline:with-timeline:with-topic-progress"],
    composerOpen: null,
    info: null,
    isPanning: false,
    canRender: true,
    _lastTopicId: null,
    init() {
      this._super(...arguments);
      this.set("info", _object.default.create());
    },
    didUpdateAttrs() {
      this._super(...arguments);
      if (this._lastTopicId !== this.topic.id) {
        this._lastTopicId = this.topic.id;
        this.set("canRender", false);
        (0, _runloop.next)(() => this.set("canRender", true));
      }
    },
    _performCheckSize() {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      let info = this.info;

      // Safari's window.innerWidth doesn't match CSS media queries
      let windowWidth = this.capabilities.isSafari ? document.documentElement.clientWidth : window.innerWidth;
      if (info.get("topicProgressExpanded")) {
        info.set("renderTimeline", true);
      } else {
        let renderTimeline = !this.site.mobileView;
        if (renderTimeline) {
          const composer = document.getElementById("reply-control");
          if (composer) {
            renderTimeline = windowWidth > MIN_WIDTH_TIMELINE && window.innerHeight - composer.offsetHeight - (0, _offsetCalculator.headerOffset)() > MIN_HEIGHT_TIMELINE;
          }
        }
        info.set("renderTimeline", renderTimeline);
      }
    },
    _checkSize() {
      (0, _debounce.default)(this, this._performCheckSize, 300, true);
    },
    // we need to store this so topic progress has something to init with
    _topicScrolled(event) {
      this.set("info.prevEvent", event);
    },
    _expanded() {
      if (this.get("info.topicProgressExpanded")) {
        $(window).on("click.hide-fullscreen", e => {
          let $target = $(e.target);
          let $parents = $target.parents();
          if (!$target.is(".widget-button") && !$parents.is(".widget-button") && !$parents.is("#discourse-modal") && !$target.is("#discourse-modal") && !$parents.is(".modal-footer") && ($target.is(".topic-timeline") || !$parents.is("#topic-progress-wrapper")) && !$parents.is(".timeline-open-jump-to-post-prompt-btn") && !$target.is(".timeline-open-jump-to-post-prompt-btn")) {
            this._collapseFullscreen();
          }
        });
      } else {
        $(window).off("click.hide-fullscreen");
      }
      this._checkSize();
    },
    composerOpened() {
      this.set("composerOpen", true);
      this._checkSize();
    },
    composerClosed() {
      this.set("composerOpen", false);
      this._checkSize();
    },
    _collapseFullscreen() {
      if (this.get("info.topicProgressExpanded")) {
        $(".timeline-fullscreen").removeClass("show");
        (0, _later.default)(() => {
          if (!this.element || this.isDestroying || this.isDestroyed) {
            return;
          }
          this.set("info.topicProgressExpanded", false);
          this._checkSize();
        }, 500);
      }
    },
    keyboardTrigger(e) {
      if (e.type === "jump") {
        const controller = (0, _showModal.default)("jump-to-post", {
          modalClass: "jump-to-post-modal"
        });
        controller.setProperties({
          topic: this.topic,
          jumpToIndex: this.attrs.jumpToIndex,
          jumpToDate: this.attrs.jumpToDate
        });
      }
    },
    _handlePanDone(offset, event) {
      const $timelineContainer = $(".timeline-container");
      const maxOffset = parseInt($timelineContainer.css("height"), 10);
      $timelineContainer.addClass("animate");
      if (this._shouldPanClose(event)) {
        $timelineContainer.css("--offset", `${maxOffset}px`);
        (0, _later.default)(() => {
          this._collapseFullscreen();
          $timelineContainer.removeClass("animate");
        }, 200);
      } else {
        $timelineContainer.css("--offset", 0);
        (0, _later.default)(() => {
          $timelineContainer.removeClass("animate");
        }, 200);
      }
    },
    _shouldPanClose(e) {
      return e.deltaY > _panEvents.SWIPE_DISTANCE_THRESHOLD && e.velocityY > -_panEvents.SWIPE_VELOCITY_THRESHOLD || e.velocityY > _panEvents.SWIPE_VELOCITY_THRESHOLD;
    },
    panStart(e) {
      const target = e.originalEvent.target;
      if (target.classList.contains("docked") || !target.closest(".timeline-container")) {
        return;
      }
      e.originalEvent.preventDefault();
      const centeredElement = document.elementFromPoint(e.center.x, e.center.y);
      if (centeredElement.closest(".timeline-scrollarea-wrapper")) {
        this.isPanning = false;
      } else if (e.direction === "up" || e.direction === "down") {
        this.isPanning = true;
      }
    },
    panEnd(e) {
      if (!this.isPanning) {
        return;
      }
      e.originalEvent.preventDefault();
      this.isPanning = false;
      this._handlePanDone(e.deltaY, e);
    },
    panMove(e) {
      if (!this.isPanning) {
        return;
      }
      e.originalEvent.preventDefault();
      $(".timeline-container").css("--offset", `${Math.max(0, e.deltaY)}px`);
    },
    didInsertElement() {
      this._super(...arguments);
      this._lastTopicId = this.topic.id;
      this.appEvents.on("topic:current-post-scrolled", this, this._topicScrolled).on("topic:jump-to-post", this, this._collapseFullscreen).on("topic:keyboard-trigger", this, this.keyboardTrigger);
      if (!this.site.mobileView) {
        $(window).on("resize.discourse-topic-navigation", () => this._checkSize());
        this.appEvents.on("composer:opened", this, this.composerOpened);
        this.appEvents.on("composer:resize-ended", this, this.composerOpened);
        this.appEvents.on("composer:closed", this, this.composerClosed);
        $("#reply-control").on("div-resized.discourse-topic-navigation", () => this._checkSize());
      }
      this._checkSize();
    },
    willDestroyElement() {
      this._super(...arguments);
      this.appEvents.off("topic:current-post-scrolled", this, this._topicScrolled).off("topic:jump-to-post", this, this._collapseFullscreen).off("topic:keyboard-trigger", this, this.keyboardTrigger);
      $(window).off("click.hide-fullscreen");
      if (!this.site.mobileView) {
        $(window).off("resize.discourse-topic-navigation");
        this.appEvents.off("composer:opened", this, this.composerOpened);
        this.appEvents.off("composer:resize-ended", this, this.composerOpened);
        this.appEvents.off("composer:closed", this, this.composerClosed);
        $("#reply-control").off("div-resized.discourse-topic-navigation");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_expanded", [_dec], Object.getOwnPropertyDescriptor(_obj, "_expanded"), _obj)), _obj))));
  _exports.default = _default;
});