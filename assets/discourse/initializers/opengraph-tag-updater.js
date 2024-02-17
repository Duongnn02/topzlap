define("discourse/initializers/opengraph-tag-updater", ["exports", "discourse-common/lib/get-url"], function (_exports, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  var _default = {
    name: "opengraph-tag-updater",
    initialize(container) {
      // workaround for Safari on iOS 14.3
      // seems it has started using opengraph tags when sharing
      const ogTitle = document.querySelector("meta[property='og:title']");
      const ogUrl = document.querySelector("meta[property='og:url']");
      const twitterTitle = document.querySelector("meta[property='twitter:title']");
      const twitterUrl = document.querySelector("meta[property='twitter:url']");
      if (!ogTitle || !ogUrl || !twitterTitle || !twitterUrl) {
        return;
      }
      const appEvents = container.lookup("service:app-events");
      appEvents.on("page:changed", _ref => {
        let {
          title,
          url
        } = _ref;
        ogTitle.setAttribute("content", title);
        ogUrl.setAttribute("content", (0, _getUrl.getAbsoluteURL)(url));
        twitterTitle.setAttribute("content", title);
        twitterUrl.setAttribute("content", (0, _getUrl.getAbsoluteURL)(url));
      });
    }
  };
  _exports.default = _default;
});