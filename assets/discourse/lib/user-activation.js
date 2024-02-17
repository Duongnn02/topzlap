define("discourse/lib/user-activation", ["exports", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/url"], function (_exports, _ajax, _ajaxError, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.changeEmail = changeEmail;
  _exports.resendActivationEmail = resendActivationEmail;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function resendActivationEmail(username) {
    return (0, _ajax.ajax)((0, _url.userPath)("action/send_activation_email"), {
      type: "POST",
      data: {
        username
      }
    }).catch(_ajaxError.popupAjaxError);
  }
  function changeEmail(data) {
    return (0, _ajax.ajax)((0, _url.userPath)("update-activation-email"), {
      data,
      type: "PUT"
    });
  }
});