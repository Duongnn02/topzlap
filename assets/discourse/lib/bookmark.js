define("discourse/lib/bookmark", ["exports", "I18n"], function (_exports, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.formattedReminderTime = formattedReminderTime;
  0; //eaimeta@70e063a35619d71f0,"I18n"eaimeta@70e063a35619d71f
  function formattedReminderTime(reminderAt, timezone) {
    let reminderAtDate = moment.tz(reminderAt, timezone);
    let formatted = reminderAtDate.format(_I18n.default.t("dates.time"));
    let now = moment.tz(timezone);
    let tomorrow = moment(now).add(1, "day");
    if (reminderAtDate.isSame(tomorrow, "date")) {
      return _I18n.default.t("bookmarks.reminders.tomorrow_with_time", {
        time: formatted
      });
    } else if (reminderAtDate.isSame(now, "date")) {
      return _I18n.default.t("bookmarks.reminders.today_with_time", {
        time: formatted
      });
    }
    return _I18n.default.t("bookmarks.reminders.at_time", {
      date_time: reminderAtDate.format(_I18n.default.t("dates.long_with_year"))
    });
  }
});