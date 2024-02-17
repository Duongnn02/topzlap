define("discourse/helpers/reviewable-status", ["exports", "discourse/models/reviewable", "I18n", "discourse-common/lib/helpers", "discourse-common/lib/icon-library"], function (_exports, _reviewable, _I18n, _helpers, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.htmlStatus = htmlStatus;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/reviewable",0,"I18n",0,"discourse-common/lib/helpers",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function dataFor(status, type) {
    switch (status) {
      case _reviewable.PENDING:
        return {
          name: "pending"
        };
      case _reviewable.APPROVED:
        switch (type) {
          case "ReviewableQueuedPost":
            return {
              icon: "check",
              name: "approved_post",
              cssClass: "approved"
            };
          case "ReviewableUser":
            return {
              icon: "check",
              name: "approved_user",
              cssClass: "approved"
            };
          default:
            return {
              icon: "check",
              name: "approved_flag",
              cssClass: "approved"
            };
        }
      case _reviewable.REJECTED:
        switch (type) {
          case "ReviewableQueuedPost":
            return {
              icon: "times",
              name: "rejected_post",
              cssClass: "rejected"
            };
          case "ReviewableUser":
            return {
              icon: "times",
              name: "rejected_user",
              cssClass: "rejected"
            };
          default:
            return {
              icon: "times",
              name: "rejected_flag",
              cssClass: "rejected"
            };
        }
      case _reviewable.IGNORED:
        return {
          icon: "external-link-alt",
          name: "ignored"
        };
      case _reviewable.DELETED:
        return {
          icon: "trash-alt",
          name: "deleted"
        };
    }
  }
  function htmlStatus(status, type) {
    let data = dataFor(status, type);
    if (!data) {
      return;
    }
    let icon = data.icon ? (0, _iconLibrary.iconHTML)(data.icon) : "";
    return `
      <span class="${data.cssClass || data.name}">
        ${icon}
        ${_I18n.default.t("review.statuses." + data.name + ".title")}
      </span>
  `;
  }
  var _default = (0, _helpers.htmlHelper)((status, type) => {
    return htmlStatus(status, type);
  });
  _exports.default = _default;
});