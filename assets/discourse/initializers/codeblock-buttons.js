define("discourse/initializers/codeblock-buttons", ["exports", "discourse/lib/plugin-api", "@ember/runloop", "discourse/lib/codeblock-buttons"], function (_exports, _pluginApi, _runloop, _codeblockButtons2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"@ember/runloop",0,"discourse/lib/codeblock-buttons"eaimeta@70e063a35619d71f
  let _codeblockButtons = [];
  var _default = {
    name: "codeblock-buttons",
    initialize(container) {
      const siteSettings = container.lookup("service:site-settings");
      (0, _pluginApi.withPluginApi)("0.8.7", api => {
        function _cleanUp() {
          _codeblockButtons.forEach(cb => cb.cleanup());
          _codeblockButtons.length = 0;
        }
        function _attachCommands(postElement, helper) {
          if (!helper) {
            return;
          }
          if (!siteSettings.show_copy_button_on_codeblocks) {
            return;
          }
          const post = helper.getModel();
          const cb = new _codeblockButtons2.default({
            showFullscreen: true,
            showCopy: true
          });
          cb.attachToPost(post, postElement);
          _codeblockButtons.push(cb);
        }
        api.decorateCookedElement((postElement, helper) => {
          // must be done after render so we can check the scroll width
          // of the code blocks
          (0, _runloop.schedule)("afterRender", () => {
            _attachCommands(postElement, helper);
          });
        }, {
          onlyStream: true,
          id: "codeblock-buttons"
        });
        api.cleanupStream(_cleanUp);
      });
    }
  };
  _exports.default = _default;
});