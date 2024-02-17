define("discourse/lib/load-script", ["exports", "discourse-common/lib/get-url", "discourse/lib/public-js-versions", "rsvp", "discourse/lib/ajax", "@ember/runloop", "discourse-common/config/environment", "@ember/test"], function (_exports, _getUrl, _publicJsVersions, _rsvp, _ajax, _runloop, _environment, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cacheBuster = cacheBuster;
  _exports.default = loadScript;
  _exports.loadCSS = loadCSS;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url",0,"discourse/lib/public-js-versions",0,"rsvp",0,"discourse/lib/ajax",0,"@ember/runloop",0,"discourse-common/config/environment",0,"@ember/test"eaimeta@70e063a35619d71f
  const _loaded = {};
  const _loading = {};
  function loadWithTag(path, cb) {
    const head = document.getElementsByTagName("head")[0];
    let finished = false;
    let s = document.createElement("script");
    s.src = path;
    if ((0, _environment.isTesting)()) {
      (0, _test.registerWaiter)(() => finished);
    }

    // Don't leave it hanging if something goes wrong
    s.onerror = function () {
      finished = true;
    };
    s.onload = s.onreadystatechange = function (_, abort) {
      finished = true;
      if (abort || !s.readyState || s.readyState === "loaded" || s.readyState === "complete") {
        s = s.onload = s.onreadystatechange = null;
        if (!abort) {
          (0, _runloop.run)(null, cb);
        }
      }
    };
    head.appendChild(s);
  }
  function loadCSS(url) {
    return loadScript(url, {
      css: true
    });
  }
  function loadScript(url) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (_loaded[url]) {
      return _rsvp.Promise.resolve();
    }
    url = cacheBuster(url);

    // Scripts should always load from CDN
    // CSS is type text, to accept it from a CDN we would need to handle CORS
    const fullUrl = opts.css ? (0, _getUrl.default)(url) : (0, _getUrl.getURLWithCDN)(url);
    document.querySelectorAll("script").forEach(element => {
      const src = element.getAttribute("src");
      if (src && src !== fullUrl && !_loading[src]) {
        _loaded[src] = true;
      }
    });
    return new _rsvp.Promise(function (resolve) {
      // If we already loaded this url
      if (_loaded[fullUrl]) {
        return resolve();
      }
      if (_loading[fullUrl]) {
        return _loading[fullUrl].then(resolve);
      }
      let done;
      _loading[fullUrl] = new _rsvp.Promise(function (_done) {
        done = _done;
      });
      _loading[fullUrl].then(function () {
        delete _loading[fullUrl];
      });
      const cb = function (data) {
        if (opts?.css) {
          const style = document.createElement("style");
          style.innerText = data;
          document.querySelector("head").appendChild(style);
        }
        done();
        resolve();
        _loaded[url] = true;
        _loaded[fullUrl] = true;
      };
      if (opts.css) {
        (0, _ajax.ajax)({
          url: fullUrl,
          dataType: "text"
        }).then(cb);
      } else {
        // Always load JavaScript with script tag to avoid Content Security Policy inline violations
        loadWithTag(fullUrl, cb);
      }
    });
  }
  function cacheBuster(url) {
    if (_publicJsVersions.PUBLIC_JS_VERSIONS) {
      let [folder, ...lib] = url.split("/").filter(Boolean);
      if (folder === "javascripts") {
        lib = lib.join("/").toLowerCase();
        const versionedPath = _publicJsVersions.PUBLIC_JS_VERSIONS[lib];
        if (versionedPath) {
          return `/javascripts/${versionedPath}`;
        }
      }
    }
    return url;
  }
});