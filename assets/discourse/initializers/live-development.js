define("discourse/initializers/live-development", ["exports", "discourse/lib/url", "discourse-common/config/environment", "discourse-common/lib/later", "discourse-common/utils/decorators"], function (_exports, _url, _environment, _later, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse-common/config/environment",0,"discourse-common/lib/later",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  //  Use the message bus for live reloading of components for faster development.
  var _default = (_obj = {
    name: "live-development",
    initialize(container) {
      this.messageBus = container.lookup("service:message-bus");
      const session = container.lookup("service:session");

      // Preserve preview_theme_id=## and pp=async-flamegraph parameters across pages
      const params = new URLSearchParams(window.location.search);
      const previewThemeId = params.get("preview_theme_id");
      const flamegraph = params.get("pp") === "async-flamegraph";
      if (flamegraph || previewThemeId !== null) {
        ["replaceState", "pushState"].forEach(funcName => {
          const originalFunc = window.history[funcName];
          window.history[funcName] = (stateObj, name, rawUrl) => {
            const url = new URL(rawUrl, window.location);
            if (previewThemeId !== null) {
              url.searchParams.set("preview_theme_id", previewThemeId);
            }
            if (flamegraph) {
              url.searchParams.set("pp", "async-flamegraph");
            }
            return originalFunc.call(window.history, stateObj, name, url.href);
          };
        });
      }

      // Useful to export this for debugging purposes
      if ((0, _environment.isDevelopment)()) {
        window.DiscourseURL = _url.default;
      }

      // Observe file changes
      this.messageBus.subscribe("/file-change", this.onFileChange, session.mbLastFileChangeId);
    },
    teardown() {
      this.messageBus.unsubscribe("/file-change", this.onFileChange);
    },
    onFileChange(data) {
      data.forEach(me => {
        if (me === "refresh") {
          // Refresh if necessary
          document.location.reload(true);
        } else if (me.new_href && me.target) {
          let query = `link[data-target='${me.target}']`;
          if (me.theme_id) {
            query += `[data-theme-id='${me.theme_id}']`;
          }
          const links = document.querySelectorAll(query);
          if (links.length > 0) {
            const lastLink = links[links.length - 1];

            // this check is useful when message-bus has multiple file updates
            // it avoids the browser doing a lot of work for nothing
            // should the filenames be unchanged
            if (lastLink.href.split("/").pop() !== me.new_href.split("/").pop()) {
              this.refreshCSS(lastLink, me.new_href);
            }
          }
        }
      });
    },
    refreshCSS(node, newHref) {
      const reloaded = node.cloneNode(true);
      reloaded.href = newHref;
      node.insertAdjacentElement("afterend", reloaded);
      (0, _later.default)(() => node?.parentNode?.removeChild(node), 500);
    }
  }, (_applyDecoratedDescriptor(_obj, "onFileChange", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onFileChange"), _obj)), _obj);
  _exports.default = _default;
});