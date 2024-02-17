define("discourse/lib/ajax", ["exports", "rsvp", "discourse/models/session", "discourse/models/site", "discourse/models/user", "discourse-common/lib/get-url", "discourse-common/config/environment", "@ember/runloop", "discourse/lib/user-presence"], function (_exports, _rsvp, _session, _site, _user, _getUrl, _environment, _runloop, _userPresence) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ajax = ajax;
  _exports.handleLogoff = handleLogoff;
  _exports.setLogoffCallback = setLogoffCallback;
  _exports.setTransientHeader = setTransientHeader;
  _exports.updateCsrfToken = updateCsrfToken;
  _exports.viewTrackingRequired = viewTrackingRequired;
  0; //eaimeta@70e063a35619d71f0,"rsvp",0,"discourse/models/session",0,"discourse/models/site",0,"discourse/models/user",0,"discourse-common/lib/get-url",0,"discourse-common/config/environment",0,"@ember/runloop",0,"discourse/lib/user-presence"eaimeta@70e063a35619d71f
  let _trackView = false;
  let _transientHeader = null;
  let _logoffCallback;
  function setTransientHeader(key, value) {
    _transientHeader = {
      key,
      value
    };
  }
  function viewTrackingRequired() {
    _trackView = true;
  }
  function setLogoffCallback(cb) {
    _logoffCallback = cb;
  }
  function handleLogoff(xhr) {
    if (xhr && xhr.getResponseHeader("Discourse-Logged-Out") && _logoffCallback) {
      _logoffCallback();
    }
  }
  function handleRedirect(xhr) {
    if (xhr && xhr.getResponseHeader("Discourse-Xhr-Redirect")) {
      window.location = xhr.responseText;
    }
  }
  function updateCsrfToken() {
    return ajax("/session/csrf").then(result => {
      _session.default.currentProp("csrfToken", result.csrf);
    });
  }

  /**
    Our own $.ajax method. Makes sure the .then method executes in an Ember runloop
    for performance reasons. Also automatically adjusts the URL to support installs
    in subfolders.
  **/

  function ajax() {
    let url, args;
    let ajaxObj;
    if (arguments.length === 1) {
      if (typeof arguments[0] === "string") {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }
    let ignoreUnsent = true;
    if (args.ignoreUnsent !== undefined) {
      ignoreUnsent = args.ignoreUnsent;
      delete args.ignoreUnsent;
    }
    function performAjax(resolve, reject) {
      args.headers = args.headers || {};
      if (_user.default.current()) {
        args.headers["Discourse-Logged-In"] = "true";
      }
      if (_transientHeader) {
        args.headers[_transientHeader.key] = _transientHeader.value;
        _transientHeader = null;
      }
      if (_trackView && (!args.type || args.type === "GET")) {
        _trackView = false;
        // DON'T CHANGE: rack is prepending "HTTP_" in the header's name
        args.headers["Discourse-Track-View"] = "true";
      }
      if ((0, _userPresence.default)()) {
        args.headers["Discourse-Present"] = "true";
      }
      args.success = (data, textStatus, xhr) => {
        handleRedirect(xhr);
        handleLogoff(xhr);
        (0, _runloop.run)(() => {
          _site.default.currentProp("isReadOnly", !!(xhr && xhr.getResponseHeader("Discourse-Readonly")));
        });
        if (args.returnXHR) {
          data = {
            result: data,
            xhr
          };
        }
        (0, _runloop.run)(null, resolve, data);
      };
      args.error = (xhr, textStatus, errorThrown) => {
        // 0 represents the `UNSENT` state
        if (ignoreUnsent && xhr.readyState === 0) {
          // Make sure we log pretender errors in test mode
          if (textStatus === "error" && (0, _environment.isTesting)()) {
            throw errorThrown;
          }
          return;
        }
        handleLogoff(xhr);

        // note: for bad CSRF we don't loop an extra request right away.
        //  this allows us to eliminate the possibility of having a loop.
        if (xhr.status === 403 && xhr.responseText === '["BAD CSRF"]') {
          _session.default.current().set("csrfToken", null);
        }

        // If it's a parser error, don't reject
        if (xhr.status === 200) {
          return args.success(xhr);
        }

        // Fill in some extra info
        xhr.jqTextStatus = textStatus;
        xhr.requestedUrl = url;
        (0, _runloop.run)(null, reject, {
          jqXHR: xhr,
          textStatus,
          errorThrown
        });
      };
      if (args.method) {
        args.type = args.method;
        delete args.method;
      }

      // We default to JSON on GET. If we don't, sometimes if the server doesn't return the proper header
      // it will not be parsed as an object.
      if (!args.type) {
        args.type = "GET";
      }
      if (!args.dataType && args.type.toUpperCase() === "GET") {
        args.dataType = "json";
      }
      if (args.dataType === "script") {
        args.headers["Discourse-Script"] = true;
      }
      ajaxObj = $.ajax((0, _getUrl.default)(url), args);
    }
    let promise;

    // For cached pages we strip out CSRF tokens, need to round trip to server prior to sending the
    //  request (bypass for GET, not needed)
    if (args.type && args.type.toUpperCase() !== "GET" && url !== (0, _getUrl.default)("/clicks/track") && !_session.default.currentProp("csrfToken")) {
      promise = new _rsvp.Promise((resolve, reject) => {
        ajaxObj = updateCsrfToken().then(() => {
          performAjax(resolve, reject);
        });
      });
    } else {
      promise = new _rsvp.Promise(performAjax);
    }
    promise.abort = () => {
      if (ajaxObj) {
        ajaxObj.abort();
      }
    };
    return promise;
  }
});