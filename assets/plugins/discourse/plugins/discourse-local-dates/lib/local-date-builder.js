define("discourse/plugins/discourse-local-dates/lib/local-date-builder", ["exports", "discourse/plugins/discourse-local-dates/lib/date-with-zone-helper", "I18n", "discourse-common/lib/icon-library"], function (_exports, _dateWithZoneHelper, _I18n, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/discourse-local-dates/lib/date-with-zone-helper",0,"I18n",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  const DATETIME_FORMAT = "LLL";
  const DATE_FORMAT = "LL";
  const FULL_DATETIME_FORMAT = "LLLL";
  const TIME_FORMAT = "h:mm A";
  const DAY_OF_THE_WEEK_FORMAT = "dddd";
  const RANGE_SEPARATOR = "→";
  const TIME_ICON = "clock";
  const SHORT_FORMAT_DAYS_PERIOD = 1;
  class LocalDateBuilder {
    constructor() {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let localTimezone = arguments.length > 1 ? arguments[1] : undefined;
      this.time = params.time;
      this.date = params.date;
      this.recurring = params.recurring;
      this.sameLocalDayAsFrom = params.sameLocalDayAsFrom;
      this.timezones = Array.from(new Set((params.timezones || []).filter(Boolean)));
      this.timezone = params.timezone || "UTC";
      this.calendar = typeof params.calendar === "undefined" ? true : params.calendar;
      this.displayedTimezone = params.displayedTimezone;
      this.format = params.format || (this.time ? DATETIME_FORMAT : DATE_FORMAT);
      this.countdown = params.countdown;
      this.duration = params.duration;
      this.localTimezone = localTimezone;
    }
    build() {
      const [year, month, day] = this.date.split("-").map(x => parseInt(x, 10));
      const [hour, minute, second] = (this.time || "").split(":").map(x => x ? parseInt(x, 10) : undefined);
      let displayedTimezone;
      if (this.time) {
        displayedTimezone = this.displayedTimezone || this.localTimezone;
      } else {
        displayedTimezone = this.displayedTimezone || this.timezone || this.localTimezone;
      }
      let localDate = new _dateWithZoneHelper.default({
        year,
        month: month ? month - 1 : null,
        day,
        hour,
        minute,
        second,
        timezone: this.timezone,
        localTimezone: this.localTimezone
      });
      if (this.recurring && moment().isAfter(localDate.datetime)) {
        const type = this.recurring.split(".")[1];
        const repetitionsForType = localDate.unitRepetitionsBetweenDates(this.recurring, moment.tz(this.localTimezone));
        localDate = localDate.add(repetitionsForType, type);
      }
      const previews = this._generatePreviews(localDate, displayedTimezone);
      const hasTime = hour !== undefined;
      return {
        pastEvent: !this.recurring && moment.tz(this.localTimezone).isAfter(localDate.datetime),
        formatted: this._applyFormatting(localDate, displayedTimezone, hasTime),
        previews,
        textPreview: this._generateTextPreviews(previews)
      };
    }
    _generateTextPreviews(previews) {
      return previews.map(preview => {
        const formattedZone = this._zoneWithoutPrefix(preview.timezone);
        return `${formattedZone} ${preview.formatted}`;
      }).join(", ");
    }
    _generatePreviews(localDate, displayedTimezone) {
      const previewedTimezones = [];
      const timezones = this.timezones.filter(timezone => !this._isEqualZones(timezone, this.localTimezone));
      previewedTimezones.push({
        timezone: this._zoneWithoutPrefix(this.localTimezone),
        current: true,
        formatted: this._createDateTimeRange(_dateWithZoneHelper.default.fromDatetime(localDate.datetime, localDate.timezone, this.localTimezone), this.time, this.duration)
      });
      if (this.timezone && displayedTimezone === this.localTimezone && this.timezone !== displayedTimezone && !this._isEqualZones(displayedTimezone, this.timezone) && !this.timezones.any(t => this._isEqualZones(t, this.timezone))) {
        timezones.unshift(this.timezone);
      }
      timezones.forEach(timezone => {
        if (this._isEqualZones(timezone, displayedTimezone)) {
          return;
        }
        if (this._isEqualZones(timezone, this.localTimezone)) {
          timezone = this.localTimezone;
        }
        previewedTimezones.push({
          timezone: this._zoneWithoutPrefix(timezone),
          formatted: this._createDateTimeRange(_dateWithZoneHelper.default.fromDatetime(localDate.datetime, localDate.timezone, timezone), this.time, this.duration)
        });
      });
      return previewedTimezones.uniqBy("timezone");
    }
    _isEqualZones(timezoneA, timezoneB) {
      if ((timezoneA || timezoneB) && (!timezoneA || !timezoneB)) {
        return false;
      }
      if (timezoneA.includes(timezoneB) || timezoneB.includes(timezoneA)) {
        return true;
      }
      return moment.tz(timezoneA).utcOffset() === moment.tz(timezoneB).utcOffset();
    }
    _createDateTimeRange(startRange, time, duration) {
      const [startDate, endDate] = this._calculateDatesForRange(startRange, time, duration);
      let formatElements = [startDate.format(`${DAY_OF_THE_WEEK_FORMAT}, ${DATE_FORMAT}`), this._optionalTimeIcon(startDate, endDate), startDate.format(TIME_FORMAT)];
      if (endDate) {
        formatElements = formatElements.concat([RANGE_SEPARATOR, endDate.format(this._endDateFormat(startDate, endDate))]);
      }
      return formatElements.filter(Boolean).join(" ");
    }
    _shortFormat(startDate, endDate) {
      return endDate.datetime.diff(startDate.datetime, "days") < SHORT_FORMAT_DAYS_PERIOD;
    }
    _optionalTimeIcon(startDate, endDate) {
      if (!endDate || this._shortFormat(startDate, endDate)) {
        return `<br />${(0, _iconLibrary.renderIcon)("string", TIME_ICON)}`;
      }
    }
    _endDateFormat(startDate, endDate) {
      return this._shortFormat(startDate, endDate) ? TIME_FORMAT : FULL_DATETIME_FORMAT;
    }
    _calculateDatesForRange(date, time, duration) {
      // if a time has been given we do not attempt to automatically create a range
      // instead we show only one date with a format showing the time
      if (time && !duration) {
        return [date];
      }
      const dates = [date, duration ? date.add(duration, "minutes") : date.add(24, "hours")];
      return duration < 0 ? dates.reverse() : dates;
    }
    _applyFormatting(localDate, displayedTimezone, hasTime) {
      if (this.countdown) {
        const diffTime = moment.tz(this.localTimezone).diff(localDate.datetime);
        if (diffTime < 0) {
          return moment.duration(diffTime).humanize();
        } else {
          return _I18n.default.t("discourse_local_dates.relative_dates.countdown.passed");
        }
      }
      const sameTimezone = this._isEqualZones(displayedTimezone, this.localTimezone);
      if (this.calendar) {
        const inCalendarRange = moment.tz(this.localTimezone).isBetween(localDate.subtract(2, "day").datetime, localDate.add(1, "day").datetime.endOf("day"));
        if (this.sameLocalDayAsFrom) {
          return this._timeOnlyFormat(localDate, displayedTimezone);
        }
        if (inCalendarRange && sameTimezone) {
          const date = localDate.datetimeWithZone(this.localTimezone);
          if (hasTime && date.hours() === 0 && date.minutes() === 0) {
            return date.format("dddd");
          }
          return date.calendar(moment.tz(localDate.timezone), this._calendarFormats(this.time ? this.time : null));
        }
      }
      if (!sameTimezone) {
        return this._formatWithZone(localDate, displayedTimezone, this.format);
      }
      return localDate.format(this.format);
    }
    _calendarFormats(time) {
      return {
        sameDay: this._translateCalendarKey(time, "today"),
        nextDay: this._translateCalendarKey(time, "tomorrow"),
        lastDay: this._translateCalendarKey(time, "yesterday"),
        sameElse: "L"
      };
    }
    _translateCalendarKey(time, key) {
      const translated = _I18n.default.t(`discourse_local_dates.relative_dates.${key}`, {
        time: "LT"
      });
      if (time) {
        return translated.split("LT").map(w => `[${w}]`).join("LT");
      } else {
        return `[${translated.replace(" LT", "")}]`;
      }
    }
    _formatTimezone(timezone) {
      return timezone.replace("_", " ").replace("Etc/", "").split("/");
    }
    _zoneWithoutPrefix(timezone) {
      const [part1, part2] = this._formatTimezone(timezone);
      return part2 || part1;
    }
    _formatWithZone(localDate, displayedTimezone, format) {
      let formatted = localDate.datetimeWithZone(displayedTimezone).format(format);
      return `${formatted} (${this._zoneWithoutPrefix(displayedTimezone)})`;
    }
    _timeOnlyFormat(localTime, displayedTimezone) {
      return this._formatWithZone(localTime, displayedTimezone, "LT");
    }
  }
  _exports.default = LocalDateBuilder;
});