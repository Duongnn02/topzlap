define("discourse/lib/time-utils", ["exports", "@ember/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.START_OF_DAY_HOUR = _exports.MOMENT_WEDNESDAY = _exports.MOMENT_TUESDAY = _exports.MOMENT_THURSDAY = _exports.MOMENT_SUNDAY = _exports.MOMENT_SATURDAY = _exports.MOMENT_MONDAY = _exports.MOMENT_FRIDAY = _exports.LATER_TODAY_MAX_HOUR = _exports.LATER_TODAY_CUTOFF_HOUR = void 0;
  _exports.fourMonths = fourMonths;
  _exports.laterThisWeek = laterThisWeek;
  _exports.laterToday = laterToday;
  _exports.nextBusinessWeekStart = nextBusinessWeekStart;
  _exports.nextMonth = nextMonth;
  _exports.now = now;
  _exports.oneHour = oneHour;
  _exports.oneYear = oneYear;
  _exports.parseCustomDatetime = parseCustomDatetime;
  _exports.sixMonths = sixMonths;
  _exports.startOfDay = startOfDay;
  _exports.thisWeekend = thisWeekend;
  _exports.thousandYears = thousandYears;
  _exports.threeMonths = threeMonths;
  _exports.tomorrow = tomorrow;
  _exports.twoDays = twoDays;
  _exports.twoHours = twoHours;
  _exports.twoMonths = twoMonths;
  _exports.twoWeeks = twoWeeks;
  0; //eaimeta@70e063a35619d71f0,"@ember/utils"eaimeta@70e063a35619d71f
  const START_OF_DAY_HOUR = 8;
  _exports.START_OF_DAY_HOUR = START_OF_DAY_HOUR;
  const LATER_TODAY_CUTOFF_HOUR = 17;
  _exports.LATER_TODAY_CUTOFF_HOUR = LATER_TODAY_CUTOFF_HOUR;
  const LATER_TODAY_MAX_HOUR = 18;
  _exports.LATER_TODAY_MAX_HOUR = LATER_TODAY_MAX_HOUR;
  const MOMENT_SUNDAY = 0;
  _exports.MOMENT_SUNDAY = MOMENT_SUNDAY;
  const MOMENT_MONDAY = 1;
  _exports.MOMENT_MONDAY = MOMENT_MONDAY;
  const MOMENT_TUESDAY = 2;
  _exports.MOMENT_TUESDAY = MOMENT_TUESDAY;
  const MOMENT_WEDNESDAY = 3;
  _exports.MOMENT_WEDNESDAY = MOMENT_WEDNESDAY;
  const MOMENT_THURSDAY = 4;
  _exports.MOMENT_THURSDAY = MOMENT_THURSDAY;
  const MOMENT_FRIDAY = 5;
  _exports.MOMENT_FRIDAY = MOMENT_FRIDAY;
  const MOMENT_SATURDAY = 6;
  _exports.MOMENT_SATURDAY = MOMENT_SATURDAY;
  function now(timezone) {
    return moment.tz(timezone);
  }
  function startOfDay(momentDate) {
    let startOfDayHour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : START_OF_DAY_HOUR;
    return momentDate.hour(startOfDayHour).startOf("hour");
  }
  function oneHour(timezone) {
    return now(timezone).add(1, "hours");
  }
  function twoHours(timezone) {
    return now(timezone).add(2, "hours");
  }
  function tomorrow(timezone) {
    return startOfDay(now(timezone).add(1, "day"));
  }
  function thisWeekend(timezone) {
    return startOfDay(now(timezone).day(MOMENT_SATURDAY));
  }
  function laterToday(timezone) {
    let later = now(timezone).add(3, "hours");
    if (later.hour() >= LATER_TODAY_MAX_HOUR) {
      return later.hour(LATER_TODAY_MAX_HOUR).startOf("hour");
    }
    return later.minutes() < 30 ? later.startOf("hour") : later.add(30, "minutes").startOf("hour");
  }
  function twoDays(timezone) {
    return startOfDay(now(timezone).add(2, "days"));
  }
  function laterThisWeek(timezone) {
    return twoDays(timezone);
  }
  function nextMonth(timezone) {
    return startOfDay(now(timezone).add(1, "month").startOf("month"));
  }
  function twoWeeks(timezone) {
    return startOfDay(now(timezone).add(2, "weeks").day(MOMENT_MONDAY));
  }
  function twoMonths(timezone) {
    return startOfDay(now(timezone).add(2, "months").startOf("month"));
  }
  function threeMonths(timezone) {
    return startOfDay(now(timezone).add(3, "months").startOf("month"));
  }
  function fourMonths(timezone) {
    return startOfDay(now(timezone).add(4, "months").startOf("month"));
  }
  function sixMonths(timezone) {
    return startOfDay(now(timezone).add(6, "months").startOf("month"));
  }
  function oneYear(timezone) {
    return startOfDay(now(timezone).add(1, "years").startOf("month"));
  }
  function thousandYears(timezone) {
    return startOfDay(now(timezone).add(1000, "years").startOf("month"));
  }
  function nextBusinessWeekStart(timezone) {
    return startOfDay(now(timezone).add(7, "days")).day(MOMENT_MONDAY);
  }
  function parseCustomDatetime(date, time, currentTimezone) {
    let parseTimezone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // If we are called without a valid date use today
    date = date || new Date().toISOString().split("T")[0];
    let dateTime = (0, _utils.isPresent)(time) ? `${date} ${time}` : date;
    parseTimezone = parseTimezone || currentTimezone;
    let parsed = moment.tz(dateTime, parseTimezone);
    if (parseTimezone !== currentTimezone) {
      parsed = parsed.tz(currentTimezone);
    }
    return parsed;
  }
});