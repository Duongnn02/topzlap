define("discourse-common/lib/get-url", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getURL;
  _exports.getAbsoluteURL = getAbsoluteURL;
  _exports.getURLWithCDN = getURLWithCDN;
  _exports.isAbsoluteURL = isAbsoluteURL;
  _exports.restoreBaseUri = restoreBaseUri;
  _exports.samePrefix = samePrefix;
  _exports.setPrefix = setPrefix;
  _exports.setupS3CDN = setupS3CDN;
  _exports.setupURL = setupURL;
  _exports.withoutPrefix = withoutPrefix;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  let cdn, baseUrl, baseUri, baseUriMatcher;
  let S3BaseUrl, S3CDN;
  let snapshot;
  function getURL(url) {
    if (baseUri === undefined) {
      setPrefix(document.querySelector('meta[name="discourse-base-uri"]')?.getAttribute("content") || "");
    }
    if (!url) {
      return baseUri === "/" ? "" : baseUri;
    }

    // if it's a non relative URL, return it.
    if (url !== "/" && !/^\/[^\/]/.test(url)) {
      return url;
    }
    const found = baseUriMatcher.test(url);
    if (found) {
      return url;
    }
    if (url[0] !== "/") {
      url = "/" + url;
    }
    return baseUri + url;
  }
  function getURLWithCDN(url) {
    url = getURL(url);
    // only relative urls
    if (cdn && /^\/[^\/]/.test(url)) {
      url = cdn + url;
    } else if (S3CDN && url.startsWith(S3BaseUrl)) {
      url = url.replace(S3BaseUrl, S3CDN);
    }
    return url;
  }
  function getAbsoluteURL(path) {
    return baseUrl + withoutPrefix(path);
  }
  function isAbsoluteURL(url) {
    return url.startsWith(baseUrl);
  }
  function withoutPrefix(path) {
    if (!baseUri) {
      return path;
    } else {
      return path.replace(baseUriMatcher, "$1");
    }
  }
  function setPrefix(configBaseUri) {
    baseUri = configBaseUri;
    baseUriMatcher = new RegExp(`^${baseUri}(/|$)`);
  }
  function setupURL(configCdn, configBaseUrl, configBaseUri, opts) {
    opts = opts || {};
    cdn = configCdn;
    baseUrl = configBaseUrl;
    setPrefix(configBaseUri);
    if (opts?.snapshot) {
      snapshot = {
        cdn,
        baseUri,
        baseUrl,
        configBaseUrl,
        baseUriMatcher
      };
    }
  }

  // In a test environment we might change these values and, after tests, want to restore them.
  function restoreBaseUri() {
    if (snapshot) {
      cdn = snapshot.cdn;
      baseUri = snapshot.baseUri;
      baseUrl = snapshot.baseUrl;
      baseUriMatcher = snapshot.baseUriMatcher;
      S3BaseUrl = snapshot.S3BaseUrl;
      S3CDN = snapshot.S3CDN;
    }
  }
  function setupS3CDN(configS3BaseUrl, configS3CDN, opts) {
    S3BaseUrl = configS3BaseUrl;
    S3CDN = configS3CDN;
    if (opts?.snapshot) {
      snapshot = snapshot || {};
      snapshot.S3BaseUrl = S3BaseUrl;
      snapshot.S3CDN = S3CDN;
    }
  }

  // We can use this to identify when navigating on the same host but outside of the
  // prefix directory. For example from `/forum` to `/about-us` which is not discourse
  function samePrefix(url) {
    if (baseUri === undefined) {
      setPrefix(document.querySelector('meta[name="discourse-base-uri"]')?.getAttribute("content") || "");
    }
    let origin = window.location.origin;
    let cmp = url[0] === "/" ? baseUri || "/" : origin + baseUri || origin;
    return url.startsWith(cmp);
  }
});