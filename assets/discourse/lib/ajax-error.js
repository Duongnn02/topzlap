define("discourse/lib/ajax-error", ["exports", "I18n", "discourse-common/lib/get-owner", "@ember/template"], function (_exports, _I18n, _getOwner, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.extractError = extractError;
  _exports.flashAjaxError = flashAjaxError;
  _exports.popupAjaxError = popupAjaxError;
  _exports.throwAjaxError = throwAjaxError;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/get-owner",0,"@ember/template"eaimeta@70e063a35619d71f
  function extractErrorInfo(error, defaultMessage) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(error.stack);
    }
    if (typeof error === "string") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    if (error.jqXHR) {
      error = error.jqXHR;
    }
    let html = false,
      parsedError,
      parsedJSON;
    if (error.responseJSON) {
      parsedJSON = error.responseJSON;
    }
    if (!parsedJSON && error.responseText) {
      try {
        parsedJSON = $.parseJSON(error.responseText);
      } catch (ex) {
        // in case the JSON doesn't parse
        // eslint-disable-next-line no-console
        console.error(ex.stack);
      }
    }
    if (parsedJSON) {
      if (parsedJSON.html_message) {
        html = true;
      }
      if (parsedJSON.errors?.length > 1) {
        parsedError = _I18n.default.t("multiple_errors", {
          errors: parsedJSON.errors.map((e, i) => `${i + 1}) ${e}`).join(" ")
        });
      } else if (parsedJSON.errors?.length > 0) {
        parsedError = _I18n.default.t("generic_error_with_reason", {
          error: parsedJSON.errors[0]
        });
      } else if (parsedJSON.error) {
        parsedError = parsedJSON.error;
      } else if (parsedJSON.message) {
        parsedError = parsedJSON.message;
      } else if (parsedJSON.failed) {
        parsedError = parsedJSON.failed;
      }
    }
    if (!parsedError) {
      if (error.status && error.status >= 400) {
        parsedError = error.status + " " + error.statusText;
      }
    }
    return {
      html,
      message: parsedError || defaultMessage || _I18n.default.t("generic_error")
    };
  }
  function extractError(error, defaultMessage) {
    return extractErrorInfo(error, defaultMessage).message;
  }
  function throwAjaxError(undoCallback, defaultMessage) {
    return function (error) {
      // If we provided an `undo` callback
      if (undoCallback) {
        undoCallback(error);
      }
      throw extractError(error, defaultMessage);
    };
  }
  function flashAjaxError(modal, defaultMessage) {
    return error => {
      modal.flash(extractError(error, defaultMessage), "error");
    };
  }
  function popupAjaxError(error) {
    const dialog = (0, _getOwner.getOwner)(this).lookup("service:dialog");
    const errorInfo = extractErrorInfo(error);
    if (errorInfo.html) {
      dialog.alert({
        message: (0, _template.htmlSafe)(errorInfo.message)
      });
    } else {
      dialog.alert(errorInfo.message);
    }
  }
});