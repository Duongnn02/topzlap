define("discourse/controllers/auth-token", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "@ember/object", "@ember/runloop", "discourse/lib/url"], function (_exports, _controller, _modalFunctionality, _ajax, _object, _runloop, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"@ember/object",0,"@ember/runloop",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    expanded: false,
    onShow() {
      (0, _ajax.ajax)((0, _url.userPath)(`${this.get("currentUser.username_lower")}/activity.json`)).then(posts => {
        if (posts.length > 0) {
          this.set("latest_post", posts[0]);
          // slightly hacky, but default d-modal focus gets reset
          document.querySelector(".d-modal .modal-close")?.focus();
        }
      });
    },
    toggleExpanded(event) {
      event?.preventDefault();
      this.set("expanded", !this.expanded);
    },
    actions: {
      highlightSecure() {
        this.send("closeModal");
        (0, _runloop.next)(() => {
          const $prefPasswordDiv = $(".pref-password");
          $prefPasswordDiv.addClass("highlighted");
          $prefPasswordDiv.on("animationend", () => $prefPasswordDiv.removeClass("highlighted"));
          window.scrollTo({
            top: $prefPasswordDiv.offset().top,
            behavior: "smooth"
          });
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "toggleExpanded", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleExpanded"), _obj)), _obj));
  _exports.default = _default;
});