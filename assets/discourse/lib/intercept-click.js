define("discourse/lib/intercept-click", ["exports", "discourse/lib/url"], function (_exports, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = interceptClick;
  _exports.wantsNewWindow = wantsNewWindow;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function wantsNewWindow(e) {
    return e.defaultPrevented || e.isDefaultPrevented && e.isDefaultPrevented() || e.shiftKey || e.metaKey || e.ctrlKey || e.button && e.button !== 0 || e.currentTarget && e.currentTarget.target === "_blank";
  }

  /**
    Discourse does some server side rendering of HTML, such as the `cooked` contents of
    posts. The downside of this in an Ember app is the links will not go through the router.
    This jQuery code intercepts clicks on those links and routes them properly.
  **/
  function interceptClick(e) {
    if (wantsNewWindow(e)) {
      return;
    }
    const currentTarget = e.currentTarget;
    const href = currentTarget.getAttribute("href");
    if (!href || href.startsWith("#") || currentTarget.getAttribute("target") || currentTarget.dataset.emberAction || currentTarget.dataset.autoRoute || currentTarget.dataset.shareUrl || currentTarget.classList.contains("widget-link") || currentTarget.classList.contains("raw-link") || currentTarget.classList.contains("mention") || !currentTarget.classList.contains("d-link") && !currentTarget.dataset.userCard && currentTarget.classList.contains("ember-view") || currentTarget.classList.contains("lightbox") || href.startsWith("mailto:") || href.match(/^http[s]?:\/\//i) && !href.match(new RegExp("^https?:\\/\\/" + window.location.hostname, "i"))) {
      return;
    }
    e.preventDefault();
    _url.default.routeTo(href);
    return false;
  }
});