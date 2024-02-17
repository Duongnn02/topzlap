define("discourse/plugins/discourse-lazy-videos/initializers/lazy-videos", ["exports", "@ember/template-factory", "discourse/lib/plugin-api", "discourse/plugins/discourse-lazy-videos/lib/lazy-video-attributes"], function (_exports, _templateFactory, _pluginApi, _lazyVideoAttributes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"discourse/plugins/discourse-lazy-videos/lib/lazy-video-attributes",0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  function initLazyEmbed(api) {
    api.decorateCookedElement((cooked, helper) => {
      if (cooked.classList.contains("d-editor-preview")) {
        return;
      }
      const lazyContainers = cooked.querySelectorAll(".lazy-video-container");
      lazyContainers.forEach(container => {
        const siteSettings = api.container.lookup("site-settings:main");
        const videoAttributes = (0, _lazyVideoAttributes.default)(container);
        if (siteSettings[`lazy_${videoAttributes.providerName}_enabled`]) {
          const onLoadedVideo = () => {
            const postId = cooked.closest("article")?.dataset?.postId;
            if (postId) {
              api.preventCloak(parseInt(postId, 10));
            }
          };
          const lazyVideo = helper.renderGlimmer("p.lazy-video-wrapper", (0, _templateFactory.createTemplateFactory)(
          /*
            <LazyVideo @videoAttributes={{@data.param}} @onLoadedVideo={{@data.onLoadedVideo}}/>
          */
          {
            "id": "BIb4XPBx",
            "block": "[[[8,[39,0],null,[[\"@videoAttributes\",\"@onLoadedVideo\"],[[30,1,[\"param\"]],[30,1,[\"onLoadedVideo\"]]]],null]],[\"@data\"],false,[\"lazy-video\"]]",
            "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-lazy-videos/initializers/lazy-videos.js",
            "isStrictMode": false
          }), {
            param: videoAttributes,
            onLoadedVideo
          });
          container.replaceWith(lazyVideo);
        }
      });
    }, {
      onlyStream: true,
      id: "discourse-lazy-videos"
    });
  }
  var _default = {
    name: "discourse-lazy-videos",
    initialize() {
      (0, _pluginApi.withPluginApi)("1.6.0", initLazyEmbed);
    }
  };
  _exports.default = _default;
});