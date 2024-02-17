define("discourse/widgets/post-gap", ["exports", "I18n", "discourse/widgets/widget"], function (_exports, _I18n, _widget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("post-gap", {
    tagName: "div.gap",
    buildKey: attrs => `post-gap-${attrs.pos}-${attrs.postId}`,
    defaultState() {
      return {
        loading: false
      };
    },
    html(attrs, state) {
      return state.loading ? _I18n.default.t("loading") : _I18n.default.t("post.gap", {
        count: attrs.gap.length
      });
    },
    click() {
      const {
        attrs,
        state
      } = this;
      if (state.loading) {
        return;
      }
      state.loading = true;
      const args = {
        gap: attrs.gap,
        post: this.model
      };
      return this.sendWidgetAction(attrs.pos === "before" ? "fillGapBefore" : "fillGapAfter", args).then(() => {
        state.loading = false;
        this.appEvents.trigger("post-stream:gap-expanded", {
          post_id: this.model.id
        });
      });
    }
  });
  _exports.default = _default;
});