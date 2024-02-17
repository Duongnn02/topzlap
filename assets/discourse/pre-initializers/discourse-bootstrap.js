define("discourse/pre-initializers/discourse-bootstrap", ["exports", "discourse-common/config/environment", "discourse-common/lib/get-url", "I18n", "discourse/lib/preload-store", "rsvp", "discourse/models/session", "discourse-common/lib/get-owner", "discourse-common/lib/icon-library", "discourse/lib/url", "@ember/runloop"], function (_exports, _environment, _getUrl, _I18n, _preloadStore, _rsvp, _session, _getOwner, _iconLibrary, _url, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment",0,"discourse-common/lib/get-url",0,"I18n",0,"discourse/lib/preload-store",0,"rsvp",0,"discourse/models/session",0,"discourse-common/lib/get-owner",0,"discourse-common/lib/icon-library",0,"discourse/lib/url",0,"@ember/runloop",0,"@glimmer/env"eaimeta@70e063a35619d71f
  var _default = {
    name: "discourse-bootstrap",
    // The very first initializer to run
    initialize(container) {
      if (false /* DEBUG */) {
        _runloop.default._backburner.ASYNC_STACKS = true;
      }
      (0, _url.setURLContainer)(container);
      (0, _getOwner.setDefaultOwner)(container);

      // Our test environment has its own bootstrap code
      if ((0, _environment.isTesting)()) {
        return;
      }
      let setupData;
      const setupDataElement = document.getElementById("data-discourse-setup");
      if (setupDataElement) {
        setupData = setupDataElement.dataset;
      }
      let preloaded;
      const preloadedDataElement = document.getElementById("data-preloaded");
      if (preloadedDataElement) {
        preloaded = JSON.parse(preloadedDataElement.dataset.preloaded);
      }
      const keys = Object.keys(preloaded);
      if (keys.length === 0) {
        throw "No preload data found in #data-preloaded. Unable to boot Discourse.";
      }
      keys.forEach(function (key) {
        _preloadStore.default.store(key, JSON.parse(preloaded[key]));
        if (setupData.debugPreloadedAppData === "true") {
          // eslint-disable-next-line no-console
          console.log(key, _preloadStore.default.get(key));
        }
      });
      (0, _getUrl.setupURL)(setupData.cdn, setupData.baseUrl, setupData.baseUri);
      (0, _environment.setEnvironment)(setupData.environment);
      _I18n.default.defaultLocale = setupData.defaultLocale;
      window.Logster = window.Logster || {};
      window.Logster.enabled = setupData.enableJsErrorReporting === "true";
      let session = _session.default.current();
      session.serviceWorkerURL = setupData.serviceWorkerUrl;
      session.assetVersion = setupData.assetVersion;
      session.disableCustomCSS = setupData.disableCustomCss === "true";
      session.markdownItURL = setupData.markdownItUrl;
      if (setupData.mbLastFileChangeId) {
        session.mbLastFileChangeId = parseInt(setupData.mbLastFileChangeId, 10);
      }
      if (setupData.safeMode) {
        session.safe_mode = setupData.safeMode;
      }
      session.darkModeAvailable = document.querySelectorAll('link[media="(prefers-color-scheme: dark)"]').length > 0;
      session.defaultColorSchemeIsDark = setupData.colorSchemeIsDark === "true";
      session.highlightJsPath = setupData.highlightJsPath;
      session.svgSpritePath = setupData.svgSpritePath;
      session.userColorSchemeId = parseInt(setupData.userColorSchemeId, 10) || null;
      session.userDarkSchemeId = parseInt(setupData.userDarkSchemeId, 10) || -1;
      let iconList = setupData.svgIconList;
      if ((0, _environment.isDevelopment)() && iconList) {
        (0, _iconLibrary.setIconList)(typeof iconList === "string" ? JSON.parse(iconList) : iconList);
      }
      if (setupData.s3BaseUrl) {
        (0, _getUrl.setupS3CDN)(setupData.s3BaseUrl, setupData.s3Cdn);
      }
      _rsvp.default.configure("onerror", function (e) {
        // Ignore TransitionAborted exceptions that bubble up
        if (e && e.message === "TransitionAborted") {
          return;
        }
        if (!(0, _environment.isProduction)()) {
          /* eslint-disable no-console  */
          if (e) {
            if (e.message || e.stack) {
              console.log(e.message);
              console.log(e.stack);
            } else {
              console.log("Uncaught promise: ", e);
            }
          } else {
            console.log("A promise failed but was not caught.");
          }
          /* eslint-enable no-console  */
        }

        window.onerror(e && e.message, null, null, null, e);
      });
    }
  };
  _exports.default = _default;
});