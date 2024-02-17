define("discourse/components/add-topic-status-classes", ["exports", "@ember/component", "@ember/runloop"], function (_exports, _component, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    tagName: "",
    didInsertElement() {
      this._super(...arguments);
      this.refreshClass();
    },
    _updateClass() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      const body = document.getElementsByTagName("body")[0];
      this._removeClass();
      if (this.topic.invisible) {
        body.classList.add("topic-status-unlisted");
      }
      if (this.topic.pinned) {
        body.classList.add("topic-status-pinned");
      }
      if (this.topic.unpinned) {
        body.classList.add("topic-status-unpinned");
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this.refreshClass();
    },
    refreshClass() {
      (0, _runloop.scheduleOnce)("afterRender", this, this._updateClass);
    },
    _removeClass() {
      const regx = new RegExp(/\btopic-status-\S+/, "g");
      const body = document.getElementsByTagName("body")[0];
      body.className = body.className.replace(regx, "");
    },
    willDestroyElement() {
      this._super(...arguments);
      this._removeClass();
    }
  });
  _exports.default = _default;
});