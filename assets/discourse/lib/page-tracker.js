define("discourse/lib/page-tracker", ["exports", "discourse-common/lib/get-url", "@ember/runloop"], function (_exports, _getUrl, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addGTMPageChangedCallback = addGTMPageChangedCallback;
  _exports.getTransient = getTransient;
  _exports.googleTagManagerPageChanged = googleTagManagerPageChanged;
  _exports.resetPageTracking = resetPageTracking;
  _exports.setTransient = setTransient;
  _exports.startPageTracking = startPageTracking;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url",0,"@ember/runloop"eaimeta@70e063a35619d71f
  let _started = false;
  let cache = {};
  let transitionCount = 0;
  function setTransient(key, data, count) {
    cache[key] = {
      data,
      target: transitionCount + count
    };
  }
  function getTransient(key) {
    return cache[key];
  }
  function resetPageTracking() {
    _started = false;
    transitionCount = 0;
    cache = {};
  }
  function startPageTracking(router, appEvents, documentTitle) {
    if (_started) {
      return;
    }
    router.on("routeDidChange", transition => {
      if (transition.isAborted) {
        return;
      }

      // we occasionally prevent tracking of replaced pages when only query params changed
      // eg: google analytics
      const replacedOnlyQueryParams = transition.urlMethod === "replace" && transition.queryParamsOnly;
      router.send("refreshTitle");
      const url = (0, _getUrl.default)(router.get("url"));

      // Refreshing the title is debounced, so we need to trigger this in the
      // next runloop to have the correct title.
      (0, _runloop.next)(() => {
        appEvents.trigger("page:changed", {
          url,
          title: documentTitle.getTitle(),
          currentRouteName: router.currentRouteName,
          replacedOnlyQueryParams
        });
      });
      transitionCount++;
      Object.keys(cache).forEach(k => {
        const v = cache[k];
        if (v && v.target && v.target < transitionCount) {
          delete cache[k];
        }
      });
    });
    _started = true;
  }
  const _gtmPageChangedCallbacks = [];
  function addGTMPageChangedCallback(callback) {
    _gtmPageChangedCallbacks.push(callback);
  }
  function googleTagManagerPageChanged(data) {
    let gtmData = {
      event: "virtualPageView",
      page: {
        title: data.title,
        url: data.url
      }
    };
    _gtmPageChangedCallbacks.forEach(callback => callback(gtmData));
    window.dataLayer.push(gtmData);
  }
});