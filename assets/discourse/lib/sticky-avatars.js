define("discourse/lib/sticky-avatars", ["exports", "discourse/components/mount-widget", "discourse/models/site", "discourse-common/utils/decorators", "discourse/lib/offset-calculator", "@ember/runloop"], function (_exports, _mountWidget, _site, _decorators, _offsetCalculator, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/mount-widget",0,"discourse/models/site",0,"discourse-common/utils/decorators",0,"discourse/lib/offset-calculator",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let StickyAvatars = (_class = class StickyAvatars {
    static init(container) {
      return new this(container).init();
    }
    constructor(container) {
      _defineProperty(this, "stickyClass", "sticky-avatar");
      _defineProperty(this, "topicPostSelector", "#topic .post-stream .topic-post");
      _defineProperty(this, "intersectionObserver", null);
      _defineProperty(this, "direction", "⬇️");
      _defineProperty(this, "prevOffset", -1);
      this.container = container;
    }
    init() {
      if (_site.default.currentProp("mobileView") || !("IntersectionObserver" in window)) {
        return;
      }
      const appEvents = this.container.lookup("service:app-events");
      appEvents.on("topic:current-post-scrolled", this._handlePostNodes);
      appEvents.on("topic:scrolled", this._handleScroll);
      appEvents.on("page:topic-loaded", this._initIntersectionObserver);
      (0, _mountWidget.addWidgetCleanCallback)("post-stream", this._clearIntersectionObserver);
      return this;
    }
    destroy() {
      this.container = null;
    }
    _handleScroll(offset) {
      if (offset <= 0) {
        this.direction = "⬇️";
        document.querySelectorAll(`${this.topicPostSelector}.${this.stickyClass}`).forEach(node => node.classList.remove(this.stickyClass));
      } else if (offset > this.prevOffset) {
        this.direction = "⬇️";
      } else {
        this.direction = "⬆️";
      }
      this.prevOffset = offset;
    }
    _handlePostNodes() {
      this._clearIntersectionObserver();
      this._initIntersectionObserver();
      (0, _runloop.schedule)("afterRender", () => {
        document.querySelectorAll(this.topicPostSelector).forEach(postNode => {
          this.intersectionObserver.observe(postNode);
          const topicAvatarNode = postNode.querySelector(".topic-avatar");
          if (!topicAvatarNode || !postNode.querySelector("#post_1")) {
            return;
          }
          const topicMapNode = postNode.querySelector(".topic-map");
          if (!topicMapNode) {
            return;
          }
          topicAvatarNode.style.marginBottom = `${topicMapNode.clientHeight}px`;
        });
      });
    }
    _initIntersectionObserver() {
      (0, _runloop.schedule)("afterRender", () => {
        const headerOffsetInPx = (0, _offsetCalculator.headerOffset)() <= 0 ? "0px" : `-${(0, _offsetCalculator.headerOffset)()}px`;
        this.intersectionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || entry.intersectionRatio === 1) {
              entry.target.classList.remove(this.stickyClass);
              return;
            }
            const postContentHeight = entry.target.querySelector(".contents")?.clientHeight;
            if (this.direction === "⬆️" || postContentHeight > window.innerHeight - (0, _offsetCalculator.headerOffset)()) {
              entry.target.classList.add(this.stickyClass);
            }
          });
        }, {
          threshold: [0.0, 1.0],
          rootMargin: `${headerOffsetInPx} 0px 0px 0px`
        });
      });
    }
    _clearIntersectionObserver() {
      this.intersectionObserver?.disconnect();
      this.intersectionObserver = null;
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "_handleScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_handleScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_handlePostNodes", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_handlePostNodes"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_initIntersectionObserver", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_initIntersectionObserver"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_clearIntersectionObserver", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_clearIntersectionObserver"), _class.prototype)), _class);
  _exports.default = StickyAvatars;
});