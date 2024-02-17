define("discourse/widgets/embedded-post", ["exports", "discourse/widgets/decorator-helper", "discourse/widgets/post-cooked", "discourse/widgets/widget", "virtual-dom"], function (_exports, _decoratorHelper, _postCooked, _widget, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/decorator-helper",0,"discourse/widgets/post-cooked",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse/widgets/hbs-compiler"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("post-link-arrow", {
    tagName: "div.post-link-arrow",
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push("\n      ");
      var _a0 = [];
      _a0.push("\n");
      if (attrs.above) {
        _a0.push("        ");
        _a0.push(__h1("arrow-up"));
        _a0.push("\n");
      } else {
        _a0.push("        ");
        _a0.push(__h1("arrow-down"));
        _a0.push("\n");
      }
      _a0.push("      ");
      _r.push(virtualDom.h('a', {
        "className": "post-info arrow",
        "attributes": {
          "href": attrs.shareUrl,
          "title": I18n.t("topic.jump_reply"),
          "aria-label": I18n.t("topic.jump_reply_aria", {
            "username": attrs.name
          })
        }
      }, _a0));
      _r.push("\n  ");
      return _r;
    }
  });
  var _default = (0, _widget.createWidget)("embedded-post", {
    tagName: "div.reply",
    buildKey: attrs => `embedded-post-${attrs.id}`,
    buildAttributes(attrs) {
      const attributes = {
        "data-post-id": attrs.id
      };
      if (this.state.role) {
        attributes.role = this.state.role;
      }
      if (this.state["aria-label"]) {
        attributes["aria-label"] = this.state["aria-label"];
      }
      return attributes;
    },
    html(attrs, state) {
      attrs.embeddedPost = true;
      return [(0, _virtualDom.h)("div.row", [this.attach("post-avatar", attrs), (0, _virtualDom.h)("div.topic-body", [(0, _virtualDom.h)("div.topic-meta-data.embedded-reply", [this.attach("poster-name", attrs), this.attach("post-link-arrow", {
        name: attrs.username,
        above: state.above,
        shareUrl: attrs.customShare
      })]), new _postCooked.default(attrs, new _decoratorHelper.default(this), this.currentUser)])])];
    },
    init() {
      this.postContentsDestroyCallbacks = [];
    },
    destroy() {
      this.postContentsDestroyCallbacks.forEach(c => c());
    }
  });
  _exports.default = _default;
});