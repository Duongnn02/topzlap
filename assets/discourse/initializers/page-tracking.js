define("discourse/initializers/page-tracking", ["exports", "discourse/lib/page-tracker", "discourse/lib/ajax"], function (_exports, _pageTracker, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/page-tracker",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = {
    name: "page-tracking",
    after: "inject-objects",
    initialize(container) {
      // Tell our AJAX system to track a page transition
      const router = container.lookup("router:main");
      router.on("routeWillChange", _ajax.viewTrackingRequired);
      let appEvents = container.lookup("service:app-events");
      let documentTitle = container.lookup("service:document-title");
      (0, _pageTracker.startPageTracking)(router, appEvents, documentTitle);

      // Out of the box, Discourse tries to track google analytics
      // if it is present
      if (typeof window._gaq !== "undefined") {
        appEvents.on("page:changed", data => {
          if (!data.replacedOnlyQueryParams) {
            window._gaq.push(["_set", "title", data.title]);
            window._gaq.push(["_trackPageview", data.url]);
          }
        });
        return;
      }

      // Use Universal Analytics v3 if it is present
      if (typeof window.ga !== "undefined" && typeof window.gtag === "undefined") {
        appEvents.on("page:changed", data => {
          if (!data.replacedOnlyQueryParams) {
            window.ga("send", "pageview", {
              page: data.url,
              title: data.title
            });
          }
        });
      }

      // And Universal Analytics v4 if we're upgraded
      if (typeof window.gtag !== "undefined") {
        appEvents.on("page:changed", data => {
          if (!data.replacedOnlyQueryParams) {
            window.gtag("event", "page_view", {
              page_location: data.url,
              page_title: data.title
            });
          }
        });
      }

      // Google Tag Manager too
      if (typeof window.dataLayer !== "undefined") {
        appEvents.on("page:changed", data => {
          if (!data.replacedOnlyQueryParams) {
            (0, _pageTracker.googleTagManagerPageChanged)(data);
          }
        });
      }
    },
    teardown() {
      (0, _pageTracker.resetPageTracking)();
    }
  };
  _exports.default = _default;
});