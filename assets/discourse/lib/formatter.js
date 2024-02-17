define("discourse/lib/formatter", ["exports", "discourse-common/lib/helpers", "discourse-common/lib/deprecated", "I18n", "jquery"], function (_exports, _helpers, _deprecated, _I18n, _jquery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.autoUpdatingRelativeAge = autoUpdatingRelativeAge;
  _exports.duration = duration;
  _exports.durationTiny = durationTiny;
  _exports.ensureJSON = ensureJSON;
  _exports.longDate = longDate;
  _exports.longDateNoYear = longDateNoYear;
  _exports.number = number;
  _exports.plainJSON = plainJSON;
  _exports.prettyJSON = prettyJSON;
  _exports.relativeAge = relativeAge;
  _exports.relativeAgeMediumSpan = relativeAgeMediumSpan;
  _exports.shortDate = shortDate;
  _exports.smartShortDate = smartShortDate;
  _exports.tinyDateYear = tinyDateYear;
  _exports.toTitleCase = toTitleCase;
  _exports.until = until;
  _exports.updateRelativeAge = updateRelativeAge;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse-common/lib/deprecated",0,"I18n",0,"jquery"eaimeta@70e063a35619d71f
  function shortDate(date) {
    return moment(date).format(_I18n.default.t("dates.medium.date_year"));
  }
  function shortDateNoYear(date) {
    return moment(date).format(_I18n.default.t("dates.tiny.date_month"));
  }

  // Suppress year if it's this year
  function smartShortDate(date) {
    let withYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tinyDateYear;
    return date.getFullYear() === new Date().getFullYear() ? shortDateNoYear(date) : withYear(date);
  }
  function tinyDateYear(date) {
    return moment(date).format(_I18n.default.t("dates.tiny.date_year"));
  }

  // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
  // TODO: locale support ?
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  }
  function longDate(dt) {
    if (!dt) {
      return;
    }
    return moment(dt).format(_I18n.default.t("dates.long_with_year"));
  }

  // suppress year, if current year
  function longDateNoYear(dt) {
    if (!dt) {
      return;
    }
    if (new Date().getFullYear() !== dt.getFullYear()) {
      return moment(dt).format(_I18n.default.t("dates.long_date_with_year"));
    } else {
      return moment(dt).format(_I18n.default.t("dates.long_date_without_year"));
    }
  }
  function updateRelativeAge(elems) {
    if (elems instanceof _jquery.default) {
      elems = elems.toArray();
      (0, _deprecated.default)("updateRelativeAge now expects a DOM NodeList", {
        since: "2.8.0.beta7",
        dropFrom: "2.9.0.beta1",
        id: "discourse.formatter.update-relative-age-node-list"
      });
    }
    if (!NodeList.prototype.isPrototypeOf(elems)) {
      elems = (0, _helpers.makeArray)(elems);
    }
    elems.forEach(elem => {
      elem.innerHTML = relativeAge(new Date(parseInt(elem.dataset.time, 10)), {
        format: elem.dataset.format,
        wrapInSpan: false
      });
    });
  }
  function autoUpdatingRelativeAge(date, options) {
    if (!date) {
      return "";
    }
    if (+date === +new Date(0)) {
      return "";
    }
    options = options || {};
    let format = options.format || "tiny";
    let append = "";
    if (format === "medium") {
      append = " date";
      if (options.leaveAgo) {
        format = "medium-with-ago";
      }
      options.wrapInSpan = false;
    }
    const relAge = relativeAge(date, options);
    if (format === "tiny" && relativeAgeTinyShowsYear(relAge)) {
      append += " with-year";
    }
    if (options.title) {
      append += "' title='" + longDate(date);
    }
    return "<span class='relative-date" + append + "' data-time='" + date.getTime() + "' data-format='" + format + "'>" + relAge + "</span>";
  }
  function until(untilDate, timezone, locale) {
    const untilMoment = moment.tz(untilDate, timezone);
    const now = moment.tz(timezone);
    let untilFormatted;
    if (now.isSame(untilMoment, "day")) {
      const localeData = moment.localeData(locale);
      untilFormatted = untilMoment.format(localeData.longDateFormat("LT"));
    } else {
      untilFormatted = untilMoment.format(_I18n.default.t("dates.long_no_year_no_time"));
    }
    return `${_I18n.default.t("until")} ${untilFormatted}`;
  }
  function wrapAgo(dateStr) {
    return _I18n.default.t("dates.wrap_ago", {
      date: dateStr
    });
  }
  function wrapOn(dateStr) {
    return _I18n.default.t("dates.wrap_on", {
      date: dateStr
    });
  }
  function duration(distance, ageOpts) {
    if (typeof distance !== "number") {
      return "&mdash;";
    }
    const dividedDistance = Math.round(distance / 60.0);
    const distanceInMinutes = dividedDistance < 1 ? 1 : dividedDistance;
    const t = function (key, opts) {
      const format = ageOpts && ageOpts.format || "tiny";
      const result = _I18n.default.t("dates." + format + "." + key, opts);
      return ageOpts && ageOpts.addAgo ? wrapAgo(result) : result;
    };
    let formatted;
    switch (true) {
      case distance <= 59:
        formatted = t("less_than_x_minutes", {
          count: 1
        });
        break;
      case distanceInMinutes >= 0 && distanceInMinutes <= 44:
        formatted = t("x_minutes", {
          count: distanceInMinutes
        });
        break;
      case distanceInMinutes >= 45 && distanceInMinutes <= 89:
        formatted = t("about_x_hours", {
          count: 1
        });
        break;
      case distanceInMinutes >= 90 && distanceInMinutes <= 1409:
        formatted = t("about_x_hours", {
          count: Math.round(distanceInMinutes / 60.0)
        });
        break;
      case distanceInMinutes >= 1410 && distanceInMinutes <= 2519:
        formatted = t("x_days", {
          count: 1
        });
        break;
      case distanceInMinutes >= 2520 && distanceInMinutes <= 129599:
        formatted = t("x_days", {
          count: Math.round(distanceInMinutes / 1440.0)
        });
        break;
      case distanceInMinutes >= 129600 && distanceInMinutes <= 525599:
        formatted = t("x_months", {
          count: Math.round(distanceInMinutes / 43200.0)
        });
        break;
      default:
        const numYears = distanceInMinutes / 525600.0;
        const remainder = numYears % 1;
        if (remainder < 0.25) {
          formatted = t("about_x_years", {
            count: Math.floor(numYears)
          });
        } else if (remainder < 0.75) {
          formatted = t("over_x_years", {
            count: Math.floor(numYears)
          });
        } else {
          formatted = t("almost_x_years", {
            count: Math.floor(numYears) + 1
          });
        }
        break;
    }
    return formatted;
  }
  function durationTiny(distance, ageOpts) {
    return duration(distance, Object.assign({
      format: "tiny"
    }, ageOpts));
  }
  function relativeAgeTiny(date, ageOpts) {
    const format = "tiny";
    let distance = Math.round((new Date() - date) / 1000);
    if (distance < 0) {
      distance = Math.round((date - new Date()) / 1000);
    }
    const dividedDistance = Math.round(distance / 60.0);
    const distanceInMinutes = dividedDistance < 1 ? 1 : dividedDistance;
    let formatted;
    const t = function (key, opts) {
      const result = _I18n.default.t("dates." + format + "." + key, opts);
      return ageOpts && ageOpts.addAgo ? wrapAgo(result) : result;
    };

    // This file is in lib but it's used as a helper
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    switch (true) {
      case distanceInMinutes >= 0 && distanceInMinutes <= 44:
        formatted = t("x_minutes", {
          count: distanceInMinutes
        });
        break;
      case distanceInMinutes >= 45 && distanceInMinutes <= 89:
        formatted = t("about_x_hours", {
          count: 1
        });
        break;
      case distanceInMinutes >= 90 && distanceInMinutes <= 1409:
        formatted = t("about_x_hours", {
          count: Math.round(distanceInMinutes / 60.0)
        });
        break;
      case siteSettings.relative_date_duration === 0 && distanceInMinutes <= 525599:
        formatted = shortDateNoYear(date);
        break;
      case distanceInMinutes >= 1410 && distanceInMinutes <= 2519:
        formatted = t("x_days", {
          count: 1
        });
        break;
      case distanceInMinutes >= 2520 && distanceInMinutes <= (siteSettings.relative_date_duration || 14) * 1440:
        formatted = t("x_days", {
          count: Math.round(distanceInMinutes / 1440.0)
        });
        break;
      default:
        formatted = (ageOpts.defaultFormat || smartShortDate)(date);
        break;
    }
    return formatted;
  }

  /*
   * Returns true if the given tiny date string includes the year.
   * Useful for checking if the string isn't so tiny.
   */
  function relativeAgeTinyShowsYear(relativeAgeString) {
    return relativeAgeString.match(/'[\d]{2}$/);
  }
  function relativeAgeMediumSpan(distance, leaveAgo) {
    let formatted;
    const distanceInMinutes = Math.round(distance / 60.0);
    const t = function (key, opts) {
      return _I18n.default.t("dates.medium" + (leaveAgo ? "_with_ago" : "") + "." + key, opts);
    };
    switch (true) {
      case distanceInMinutes >= 1 && distanceInMinutes <= 55:
        formatted = t("x_minutes", {
          count: distanceInMinutes
        });
        break;
      case distanceInMinutes >= 56 && distanceInMinutes <= 89:
        formatted = t("x_hours", {
          count: 1
        });
        break;
      case distanceInMinutes >= 90 && distanceInMinutes <= 1409:
        formatted = t("x_hours", {
          count: Math.round(distanceInMinutes / 60.0)
        });
        break;
      case distanceInMinutes >= 1410 && distanceInMinutes <= 2519:
        formatted = t("x_days", {
          count: 1
        });
        break;
      case distanceInMinutes >= 2520 && distanceInMinutes <= 129599:
        formatted = t("x_days", {
          count: Math.round((distanceInMinutes - 720.0) / 1440.0)
        });
        break;
      case distanceInMinutes >= 129600 && distanceInMinutes <= 525599:
        formatted = t("x_months", {
          count: Math.round(distanceInMinutes / 43200.0)
        });
        break;
      default:
        formatted = t("x_years", {
          count: Math.round(distanceInMinutes / 525600.0)
        });
        break;
    }
    return formatted || "&mdash;";
  }
  function relativeAgeMedium(date, options) {
    const wrapInSpan = options.wrapInSpan !== false;
    const leaveAgo = options.leaveAgo;
    const distance = Math.round((new Date() - date) / 1000);
    if (!date) {
      return "&mdash;";
    }
    const fullReadable = longDate(date);
    const fiveDaysAgo = 432000;
    const oneMinuteAgo = 60;
    let displayDate = "";
    if (distance < oneMinuteAgo) {
      displayDate = _I18n.default.t("now");
    } else if (distance > fiveDaysAgo) {
      displayDate = smartShortDate(date, shortDate);
      if (options.wrapOn) {
        displayDate = wrapOn(displayDate);
      }
    } else {
      displayDate = relativeAgeMediumSpan(distance, leaveAgo);
    }
    if (wrapInSpan) {
      return "<span class='date' title='" + fullReadable + "'>" + displayDate + "</span>";
    } else {
      return displayDate;
    }
  }

  // mostly lifted from rails with a few amendments
  function relativeAge(date, options) {
    options = options || {};
    const format = options.format || "tiny";
    if (format === "tiny") {
      return relativeAgeTiny(date, options);
    } else if (format === "medium") {
      return relativeAgeMedium(date, options);
    } else if (format === "medium-with-ago") {
      return relativeAgeMedium(date, Object.assign(options, {
        format: "medium",
        leaveAgo: true
      }));
    } else if (format === "medium-with-ago-and-on") {
      return relativeAgeMedium(date, Object.assign(options, {
        format: "medium",
        leaveAgo: true,
        wrapOn: true
      }));
    }
    return "UNKNOWN FORMAT";
  }
  function number(val) {
    let formattedNumber;
    val = Math.round(parseFloat(val));
    if (isNaN(val)) {
      val = 0;
    }
    if (val > 999999) {
      formattedNumber = _I18n.default.toNumber(val / 1000000, {
        precision: 1
      });
      return _I18n.default.t("number.short.millions", {
        number: formattedNumber
      });
    } else if (val > 99999) {
      formattedNumber = _I18n.default.toNumber(Math.floor(val / 1000), {
        precision: 0
      });
      return _I18n.default.t("number.short.thousands", {
        number: formattedNumber
      });
    } else if (val > 999) {
      formattedNumber = _I18n.default.toNumber(val / 1000, {
        precision: 1
      });
      return _I18n.default.t("number.short.thousands", {
        number: formattedNumber
      });
    }
    return val.toString();
  }
  function ensureJSON(json) {
    return typeof json === "string" ? JSON.parse(json) : json;
  }
  function plainJSON(val) {
    let json = ensureJSON(val);
    let headers = "";
    Object.keys(json).forEach(k => {
      headers += `${k}: ${json[k]}\n`;
    });
    return headers;
  }
  function prettyJSON(json) {
    return JSON.stringify(ensureJSON(json), null, 2);
  }
});