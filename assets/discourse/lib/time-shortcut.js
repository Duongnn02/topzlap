define("discourse/lib/time-shortcut", ["exports", "discourse/lib/time-utils", "I18n"], function (_exports, _timeUtils, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.TIME_SHORTCUT_TYPES = void 0;
  _exports.defaultTimeShortcuts = defaultTimeShortcuts;
  _exports.extendedDefaultTimeShortcuts = extendedDefaultTimeShortcuts;
  _exports.formatTime = formatTime;
  _exports.hideDynamicTimeShortcuts = hideDynamicTimeShortcuts;
  _exports.specialShortcutOptions = specialShortcutOptions;
  _exports.timeShortcuts = timeShortcuts;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/time-utils",0,"I18n"eaimeta@70e063a35619d71f
  const TIME_SHORTCUT_TYPES = {
    ONE_HOUR: "one_hour",
    TWO_HOURS: "two_hours",
    LATER_TODAY: "later_today",
    TOMORROW: "tomorrow",
    THIS_WEEKEND: "this_weekend",
    NEXT_MONTH: "next_month",
    ONE_YEAR: "one_year",
    FOREVER: "forever",
    CUSTOM: "custom",
    RELATIVE: "relative",
    LAST_CUSTOM: "last_custom",
    NONE: "none",
    NOW: "now",
    START_OF_NEXT_BUSINESS_WEEK: "start_of_next_business_week",
    LATER_THIS_WEEK: "later_this_week",
    POST_LOCAL_DATE: "post_local_date"
  };
  _exports.TIME_SHORTCUT_TYPES = TIME_SHORTCUT_TYPES;
  function defaultTimeShortcuts(timezone) {
    const shortcuts = timeShortcuts(timezone);
    return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.laterThisWeek(), shortcuts.thisWeekend(), shortcuts.monday(), shortcuts.nextMonth()];
  }
  function extendedDefaultTimeShortcuts(timezone) {
    const shortcuts = timeShortcuts(timezone);
    return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.laterThisWeek(), shortcuts.monday(), shortcuts.twoWeeks(), shortcuts.nextMonth(), shortcuts.twoMonths(), shortcuts.threeMonths(), shortcuts.fourMonths(), shortcuts.sixMonths(), shortcuts.oneYear(), shortcuts.forever()];
  }
  function specialShortcutOptions() {
    const shortcuts = timeShortcuts();
    return [shortcuts.lastCustom(), shortcuts.custom(), shortcuts.none()];
  }
  function timeShortcuts(timezone) {
    return {
      oneHour() {
        return {
          id: TIME_SHORTCUT_TYPES.ONE_HOUR,
          icon: "angle-right",
          label: "time_shortcut.in_one_hour",
          time: (0, _timeUtils.oneHour)(timezone),
          timeFormatKey: "dates.time"
        };
      },
      twoHours() {
        return {
          id: TIME_SHORTCUT_TYPES.TWO_HOURS,
          icon: "angle-right",
          label: "time_shortcut.in_two_hours",
          time: (0, _timeUtils.twoHours)(timezone),
          timeFormatKey: "dates.time"
        };
      },
      laterToday() {
        return {
          id: TIME_SHORTCUT_TYPES.LATER_TODAY,
          icon: "angle-right",
          label: "time_shortcut.later_today",
          time: (0, _timeUtils.laterToday)(timezone),
          timeFormatKey: "dates.time"
        };
      },
      tomorrow() {
        return {
          id: TIME_SHORTCUT_TYPES.TOMORROW,
          icon: "far-sun",
          label: "time_shortcut.tomorrow",
          time: (0, _timeUtils.tomorrow)(timezone),
          timeFormatKey: "dates.time_short_day"
        };
      },
      twoDays() {
        return {
          id: "two_days",
          icon: "angle-right",
          label: "time_shortcut.two_days",
          time: (0, _timeUtils.twoDays)(timezone),
          timeFormatKey: "dates.time_short_day"
        };
      },
      laterThisWeek() {
        return {
          id: TIME_SHORTCUT_TYPES.LATER_THIS_WEEK,
          icon: "angle-double-right",
          label: "time_shortcut.later_this_week",
          time: (0, _timeUtils.laterThisWeek)(timezone),
          timeFormatKey: "dates.time_short_day"
        };
      },
      thisWeekend() {
        return {
          id: TIME_SHORTCUT_TYPES.THIS_WEEKEND,
          icon: "bed",
          label: "time_shortcut.this_weekend",
          time: (0, _timeUtils.thisWeekend)(timezone),
          timeFormatKey: "dates.time_short_day"
        };
      },
      monday() {
        return {
          id: TIME_SHORTCUT_TYPES.START_OF_NEXT_BUSINESS_WEEK,
          icon: "briefcase",
          label: (0, _timeUtils.now)(timezone).day() === _timeUtils.MOMENT_MONDAY || (0, _timeUtils.now)(timezone).day() === _timeUtils.MOMENT_SUNDAY ? "time_shortcut.start_of_next_business_week_alt" : "time_shortcut.start_of_next_business_week",
          time: (0, _timeUtils.nextBusinessWeekStart)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      nextMonth() {
        return {
          id: TIME_SHORTCUT_TYPES.NEXT_MONTH,
          icon: "far-calendar-plus",
          label: "time_shortcut.next_month",
          time: (0, _timeUtils.nextMonth)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      twoWeeks() {
        return {
          id: "two_weeks",
          icon: "far-clock",
          label: "time_shortcut.two_weeks",
          time: (0, _timeUtils.twoWeeks)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      twoMonths() {
        return {
          id: "two_months",
          icon: "far-calendar-plus",
          label: "time_shortcut.two_months",
          time: (0, _timeUtils.twoMonths)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      threeMonths() {
        return {
          icon: "far-calendar-plus",
          id: "three_months",
          label: "time_shortcut.three_months",
          time: (0, _timeUtils.threeMonths)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      fourMonths() {
        return {
          id: "four_months",
          icon: "far-calendar-plus",
          label: "time_shortcut.four_months",
          time: (0, _timeUtils.fourMonths)(timezone),
          timeFormatKey: "dates.long_no_year"
        };
      },
      sixMonths() {
        return {
          id: "six_months",
          icon: "far-calendar-plus",
          label: "time_shortcut.six_months",
          time: (0, _timeUtils.sixMonths)(timezone),
          timeFormatKey: "dates.long_with_year"
        };
      },
      oneYear() {
        return {
          id: TIME_SHORTCUT_TYPES.ONE_YEAR,
          icon: "far-calendar-plus",
          label: "time_shortcut.one_year",
          time: (0, _timeUtils.oneYear)(timezone),
          timeFormatKey: "dates.long_with_year"
        };
      },
      forever() {
        return {
          id: TIME_SHORTCUT_TYPES.FOREVER,
          icon: "gavel",
          label: "time_shortcut.forever",
          time: (0, _timeUtils.thousandYears)(timezone),
          timeFormatKey: "dates.long_with_year"
        };
      },
      custom() {
        return {
          icon: "calendar-alt",
          id: TIME_SHORTCUT_TYPES.CUSTOM,
          label: "time_shortcut.custom",
          time: null,
          isCustomTimeShortcut: true
        };
      },
      lastCustom() {
        return {
          icon: "undo",
          id: TIME_SHORTCUT_TYPES.LAST_CUSTOM,
          label: "time_shortcut.last_custom",
          time: null,
          hidden: true
        };
      },
      none() {
        return {
          icon: "ban",
          id: TIME_SHORTCUT_TYPES.NONE,
          label: "time_shortcut.none",
          time: null
        };
      },
      now() {
        return {
          id: TIME_SHORTCUT_TYPES.NOW,
          icon: "magic",
          label: "time_shortcut.now",
          time: (0, _timeUtils.now)(timezone)
        };
      }
    };
  }
  function hideDynamicTimeShortcuts(shortcuts, timezone) {
    let siteSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const shortcutsToHide = new Set();
    const _now = (0, _timeUtils.now)(timezone);
    if (_now.hour() >= _timeUtils.LATER_TODAY_CUTOFF_HOUR) {
      shortcutsToHide.add(TIME_SHORTCUT_TYPES.LATER_TODAY);
    }
    if (_now.day === _timeUtils.MOMENT_SUNDAY || _now.day() >= _timeUtils.MOMENT_THURSDAY) {
      shortcutsToHide.add(TIME_SHORTCUT_TYPES.LATER_THIS_WEEK);
    }
    if (!siteSettings.suggest_weekends_in_date_pickers || _now.day() === _timeUtils.MOMENT_FRIDAY || _now.day() === _timeUtils.MOMENT_SATURDAY || _now.day() === _timeUtils.MOMENT_SUNDAY) {
      shortcutsToHide.add(TIME_SHORTCUT_TYPES.THIS_WEEKEND);
    }
    return shortcuts.filter(s => !shortcutsToHide.has(s.id));
  }
  function formatTime(shortcut) {
    if (!shortcut.time || !shortcut.timeFormatKey) {
      return null;
    }
    return shortcut.time.format(_I18n.default.t(shortcut.timeFormatKey));
  }
});