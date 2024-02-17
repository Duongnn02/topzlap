define("discourse/models/login-method", ["exports", "@ember/object", "I18n", "rsvp", "discourse/models/session", "discourse/models/site", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "discourse/lib/ajax"], function (_exports, _object, _I18n, _rsvp, _session, _site, _decorators, _getUrl, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clearAuthMethods = clearAuthMethods;
  _exports.default = void 0;
  _exports.findAll = findAll;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"I18n",0,"rsvp",0,"discourse/models/session",0,"discourse/models/site",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const LoginMethod = _object.default.extend((_obj = {
    title() {
      return this.title_override || _I18n.default.t(`login.${this.name}.title`);
    },
    screenReaderTitle() {
      return this.title_override || _I18n.default.t(`login.${this.name}.sr_title`, {
        defaultValue: this.title
      });
    },
    prettyName() {
      return this.pretty_name_override || _I18n.default.t(`login.${this.name}.name`);
    },
    doLogin() {
      let {
        reconnect = false,
        signup = false,
        params = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this.customLogin) {
        this.customLogin();
        return _rsvp.Promise.resolve();
      }
      if (this.custom_url) {
        window.location = this.custom_url;
        return _rsvp.Promise.resolve();
      }
      let authUrl = (0, _getUrl.default)(`/auth/${this.name}`);
      if (reconnect) {
        params["reconnect"] = true;
      }
      if (signup) {
        params["signup"] = true;
      }
      const paramKeys = Object.keys(params);
      if (paramKeys.length > 0) {
        authUrl += "?";
        authUrl += paramKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
      }
      return LoginMethod.buildPostForm(authUrl).then(form => form.submit());
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "screenReaderTitle", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "screenReaderTitle"), _obj), _applyDecoratedDescriptor(_obj, "prettyName", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "prettyName"), _obj)), _obj));
  LoginMethod.reopenClass({
    buildPostForm(url) {
      // Login always happens in an anonymous context, with no CSRF token
      // So we need to fetch it before sending a POST request
      return (0, _ajax.updateCsrfToken)().then(() => {
        const form = document.createElement("form");
        form.setAttribute("style", "display:none;");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);
        const input = document.createElement("input");
        input.setAttribute("name", "authenticity_token");
        input.setAttribute("value", _session.default.currentProp("csrfToken"));
        form.appendChild(input);
        document.body.appendChild(form);
        return form;
      });
    }
  });
  let methods;
  function findAll() {
    if (methods) {
      return methods;
    }
    methods = _site.default.currentProp("auth_providers").map(provider => LoginMethod.create(provider));

    // exclude FA icon for Google, uses custom SVG
    methods.forEach(m => m.set("isGoogle", m.name === "google_oauth2"));
    return methods;
  }
  function clearAuthMethods() {
    methods = undefined;
  }
  var _default = LoginMethod;
  _exports.default = _default;
});