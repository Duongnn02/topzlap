define("discourse/controllers/exception", ["exports", "@embroider/macros/es-compat", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/url", "@ember/controller", "I18n", "@ember/runloop", "@ember/object", "@glimmer/tracking"], function (_exports, _esCompat, _computed, _decorators, _url, _controller, _I18n, _runloop, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/url",0,"@ember/controller",0,"I18n",0,"@ember/runloop",0,"@ember/object",0,"@glimmer/tracking",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // The controller for the nice error page
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("thrown"), _dec2 = (0, _decorators.on)("init"), _dec3 = (0, _decorators.default)("isNetwork", "thrown.status", "thrown"), _dec4 = (0, _decorators.default)("networkFixed", "isNetwork", "thrown.status", "thrown.statusText", "thrown"), _dec5 = (0, _decorators.default)("networkFixed", "isNetwork", "lastTransition"), (_obj = {
    thrown: null,
    lastTransition: null,
    isNetwork(thrown) {
      // never made it on the wire
      if (thrown && thrown.readyState === 0) {
        return true;
      }

      // timed out
      if (thrown && thrown.jqTextStatus === "timeout") {
        return true;
      }
      return false;
    },
    isNotFound: (0, _computed.equal)("thrown.status", 404),
    isForbidden: (0, _computed.equal)("thrown.status", 403),
    isServer: (0, _computed.gte)("thrown.status", 500),
    isUnknown: (0, _computed.none)("isNetwork", "isServer"),
    // Handling for the detailed_404 setting (which actually creates 403s)
    errorHtml: (0, _computed.alias)("thrown.responseJSON.extras.html"),
    // TODO
    // make ajax requests to /srv/status with exponential backoff
    // if one succeeds, set networkFixed to true, which puts a "Fixed!" message on the page
    networkFixed: false,
    loading: false,
    _init() {
      this.set("loading", false);
    },
    reason(isNetwork, thrownStatus, thrown) {
      if (isNetwork) {
        return _I18n.default.t("errors.reasons.network");
      } else if (thrownStatus >= 500) {
        return _I18n.default.t("errors.reasons.server");
      } else if (thrownStatus === 404) {
        return _I18n.default.t("errors.reasons.not_found");
      } else if (thrownStatus === 403) {
        return _I18n.default.t("errors.reasons.forbidden");
      } else if (thrown === null) {
        return _I18n.default.t("errors.reasons.unknown");
      } else {
        // TODO
        return _I18n.default.t("errors.reasons.unknown");
      }
    },
    requestUrl: (0, _computed.alias)("thrown.requestedUrl"),
    desc(networkFixed, isNetwork, thrownStatus, thrownStatusText, thrown) {
      if (networkFixed) {
        return _I18n.default.t("errors.desc.network_fixed");
      } else if (isNetwork) {
        return _I18n.default.t("errors.desc.network");
      } else if (thrownStatus === 404) {
        return _I18n.default.t("errors.desc.not_found");
      } else if (thrownStatus === 403) {
        return _I18n.default.t("errors.desc.forbidden");
      } else if (thrownStatus >= 500) {
        return _I18n.default.t("errors.desc.server", {
          status: thrownStatus + " " + thrownStatusText
        });
      } else if (thrown === null) {
        return _I18n.default.t("errors.desc.unknown");
      } else {
        // TODO
        return _I18n.default.t("errors.desc.unknown");
      }
    },
    get buttons() {
      return {
        ButtonBackBright: {
          classes: "btn-primary",
          action: this.back,
          key: "errors.buttons.back"
        },
        ButtonBackDim: {
          classes: "",
          action: this.back,
          key: "errors.buttons.back"
        },
        ButtonTryAgain: {
          classes: "btn-primary",
          action: this.tryLoading,
          key: "errors.buttons.again",
          icon: "sync"
        },
        ButtonLoadPage: {
          classes: "btn-primary",
          action: this.tryLoading,
          key: "errors.buttons.fixed"
        }
      };
    },
    enabledButtons(networkFixed, isNetwork, lastTransition) {
      if (networkFixed) {
        return [this.buttons.ButtonLoadPage];
      } else if (isNetwork) {
        return [this.buttons.ButtonBackDim, this.buttons.ButtonTryAgain];
      } else if (!lastTransition) {
        return [this.buttons.ButtonBackBright];
      } else {
        return [this.buttons.ButtonBackBright, this.buttons.ButtonTryAgain];
      }
    },
    back() {
      // Strip off subfolder
      const currentURL = _url.default.router.location.getURL();
      if (this.lastTransition && currentURL !== "/exception") {
        this.lastTransition.abort();
        this.setProperties({
          lastTransition: null,
          thrown: null
        });
        // Can't use routeTo because it handles navigation to the same page
        _url.default.handleURL(currentURL);
      } else {
        window.history.back();
      }
    },
    tryLoading() {
      this.set("loading", true);
      (0, _runloop.schedule)("afterRender", () => {
        const transition = this.lastTransition;
        this.setProperties({
          lastTransition: null,
          thrown: null
        });
        transition.retry();
        this.set("loading", false);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "isNetwork", [_dec], Object.getOwnPropertyDescriptor(_obj, "isNetwork"), _obj), _applyDecoratedDescriptor(_obj, "_init", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_init"), _obj), _applyDecoratedDescriptor(_obj, "reason", [_dec3], Object.getOwnPropertyDescriptor(_obj, "reason"), _obj), _applyDecoratedDescriptor(_obj, "desc", [_dec4], Object.getOwnPropertyDescriptor(_obj, "desc"), _obj), _applyDecoratedDescriptor(_obj, "buttons", [cached], Object.getOwnPropertyDescriptor(_obj, "buttons"), _obj), _applyDecoratedDescriptor(_obj, "enabledButtons", [_dec5], Object.getOwnPropertyDescriptor(_obj, "enabledButtons"), _obj), _applyDecoratedDescriptor(_obj, "back", [_object.action], Object.getOwnPropertyDescriptor(_obj, "back"), _obj), _applyDecoratedDescriptor(_obj, "tryLoading", [_object.action], Object.getOwnPropertyDescriptor(_obj, "tryLoading"), _obj)), _obj)));
  _exports.default = _default;
});