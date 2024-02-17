define("discourse/widgets/user-status-bubble", ["exports", "discourse/widgets/widget", "I18n"], function (_exports, _widget, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"I18n"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("user-status-bubble", {
    tagName: "div.user-status-background",
    html(attrs) {
      let title = attrs.description;
      if (attrs.ends_at) {
        const until = moment.tz(attrs.ends_at, this.currentUser.user_option.timezone).format(_I18n.default.t("dates.long_date_without_year"));
        title += `\n${_I18n.default.t("until")} ${until}`;
      }
      return this.attach("emoji", {
        name: attrs.emoji,
        title
      });
    }
  });
  _exports.default = _default;
});