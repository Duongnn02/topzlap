define("discourse/components/scroll-tracker", ["exports", "@ember/component", "discourse/mixins/scrolling", "@ember/runloop"], function (_exports, _component, _scrolling, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/mixins/scrolling",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_scrolling.default, {
    didReceiveAttrs() {
      this._super(...arguments);
      this.set("trackerName", `scroll-tracker-${this.name}`);
    },
    didInsertElement() {
      this._super(...arguments);
      this.bindScrolling();
    },
    didRender() {
      this._super(...arguments);
      const data = this.session.get(this.trackerName);
      if (data && data.position >= 0 && data.tag === this.tag) {
        (0, _runloop.next)(() => $(window).scrollTop(data.position + 1));
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this.unbindScrolling();
    },
    scrolled() {
      this._super(...arguments);
      this.session.set(this.trackerName, {
        position: $(window).scrollTop(),
        tag: this.tag
      });
    }
  });
  _exports.default = _default;
});