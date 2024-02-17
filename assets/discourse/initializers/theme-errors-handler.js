define("discourse/initializers/theme-errors-handler", ["exports", "discourse-common/config/environment", "discourse/app", "discourse-common/lib/get-url", "I18n", "discourse-common/utils/decorators", "pretty-text/sanitizer", "discourse/lib/source-identifier", "ember"], function (_exports, _environment, _app, _getUrl, _I18n, _decorators, _sanitizer, _sourceIdentifier, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment",0,"discourse/app",0,"discourse-common/lib/get-url",0,"I18n",0,"discourse-common/utils/decorators",0,"pretty-text/sanitizer",0,"discourse/lib/source-identifier",0,"ember"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const showingErrors = new Set();
  var _default = (_obj = {
    name: "theme-errors-handler",
    after: "export-application-global",
    initialize(container) {
      if ((0, _environment.isTesting)()) {
        return;
      }
      this.currentUser = container.lookup("service:current-user");
      (0, _app.getAndClearUnhandledThemeErrors)().forEach(e => this.reportThemeError(e));
      document.addEventListener("discourse-error", this.handleDiscourseError);
    },
    teardown() {
      document.removeEventListener("discourse-error", this.handleDiscourseError);
      delete this.currentUser;
    },
    handleDiscourseError(e) {
      if (e.detail?.themeId) {
        this.reportThemeError(e);
      } else {
        this.reportGenericError(e);
      }
      e.preventDefault(); // Mark as handled
    },

    reportThemeError(e) {
      const {
        themeId,
        error
      } = e.detail;
      const source = {
        type: "theme",
        ...(0, _sourceIdentifier.getThemeInfo)(themeId)
      };
      reportToConsole(error, source);
      reportToLogster(source.name, error);
      const message = _I18n.default.t("themes.broken_theme_alert");
      this.displayErrorNotice(this.currentUser, message, source);
    },
    reportGenericError(e) {
      const {
        messageKey,
        error
      } = e.detail;
      const message = _I18n.default.t(messageKey);
      const source = (0, _sourceIdentifier.default)(error);
      reportToConsole(error, source);
      if (messageKey && !showingErrors.has(messageKey)) {
        showingErrors.add(messageKey);
        this.displayErrorNotice(message, source);
      }
    },
    displayErrorNotice(message, source) {
      if (!this.currentUser?.admin) {
        return;
      }
      let html = `⚠️ ${message}`;
      if (source && source.type === "theme") {
        html += `<br/>${_I18n.default.t("themes.error_caused_by", {
          name: (0, _sanitizer.escape)(source.name),
          path: source.path
        })}`;
      }
      html += `<br/><span class='theme-error-suffix'>${_I18n.default.t("themes.only_admins")}</span>`;
      const alertDiv = document.createElement("div");
      alertDiv.classList.add("broken-theme-alert");
      alertDiv.innerHTML = html;
      document.body.prepend(alertDiv);
    }
  }, (_applyDecoratedDescriptor(_obj, "handleDiscourseError", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "handleDiscourseError"), _obj)), _obj);
  _exports.default = _default;
  function reportToLogster(name, error) {
    const data = {
      message: `${name} theme/component is throwing errors:\n${error.name}: ${error.message}`,
      stacktrace: error.stack
    };

    // TODO: To be moved out into a logster-provided lib
    _ember.default.$.ajax((0, _getUrl.default)("/logs/report_js_error"), {
      data,
      type: "POST"
    });
  }
  function reportToConsole(error, source) {
    const prefix = (0, _sourceIdentifier.consolePrefix)(error, source);
    if (prefix) {
      /* eslint-disable-next-line no-console */
      console.error(prefix, error);
    } else {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
  }
});