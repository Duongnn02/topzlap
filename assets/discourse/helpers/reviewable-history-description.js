define("discourse/helpers/reviewable-history-description", ["exports", "discourse/models/reviewable-history", "I18n", "discourse-common/lib/helpers", "discourse/helpers/reviewable-status", "discourse-common/lib/icon-library"], function (_exports, _reviewableHistory, _I18n, _helpers, _reviewableStatus, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/reviewable-history",0,"I18n",0,"discourse-common/lib/helpers",0,"discourse/helpers/reviewable-status",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)(function (rh) {
    switch (rh.reviewable_history_type) {
      case _reviewableHistory.EDITED:
        return (0, _iconLibrary.iconHTML)("pencil-alt") + " " + _I18n.default.t("review.history.edited");
      default:
        return (0, _reviewableStatus.htmlStatus)(rh.status);
    }
  });
  _exports.default = _default;
});