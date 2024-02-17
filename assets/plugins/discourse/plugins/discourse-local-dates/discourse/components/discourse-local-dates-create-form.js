define("discourse/plugins/discourse-local-dates/discourse/components/discourse-local-dates-create-form", ["exports", "discourse-common/utils/decorators", "@ember/component", "@ember/object", "I18n", "discourse-common/config/environment", "rsvp", "discourse/lib/text", "@ember/utils", "discourse/lib/load-script", "@ember/object/computed", "discourse/lib/computed", "@ember/runloop", "discourse-common/lib/get-owner", "discourse/lib/local-dates", "discourse/plugins/discourse-local-dates/lib/local-date-markup-generator"], function (_exports, _decorators, _component, _object, _I18n, _environment, _rsvp, _text, _utils, _loadScript, _computed, _computed2, _runloop, _getOwner, _localDates, _localDateMarkupGenerator) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _obj;
  /* global Pikaday:true */
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"I18n",0,"discourse-common/config/environment",0,"rsvp",0,"discourse/lib/text",0,"@ember/utils",0,"discourse/lib/load-script",0,"@ember/object/computed",0,"discourse/lib/computed",0,"@ember/runloop",0,"discourse-common/lib/get-owner",0,"discourse/lib/local-dates",0,"discourse/plugins/discourse-local-dates/lib/local-date-markup-generator"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.observes)("computedConfig.{from,to,options}", "options", "isValid", "isRange"), _dec2 = (0, _decorators.debounce)(_environment.INPUT_DELAY), _dec3 = (0, _decorators.default)("date", "toDate", "toTime"), _dec4 = (0, _decorators.default)("computedConfig", "isRange"), _dec5 = (0, _decorators.default)("date", "time", "isRange", "options.{format,timezone}"), _dec6 = (0, _decorators.default)("toDate", "toTime", "isRange", "options.{timezone,format}"), _dec7 = (0, _decorators.default)("recurring", "timezones", "timezone", "format"), _dec8 = (0, _decorators.default)("fromConfig.{date}", "toConfig.{date}", "options.{recurring,timezones,timezone,format}"), _dec9 = (0, _decorators.default)("currentUserTimezone"), _dec10 = (0, _decorators.default)("formats"), _dec11 = (0, _decorators.default)("advancedMode"), _dec12 = (0, _decorators.default)("computedConfig.{from,to,options}", "options", "isValid", "isRange"), _dec13 = (0, _decorators.default)("fromConfig.dateTime"), _dec14 = (0, _decorators.default)("toConfig.dateTime", "toSelected"), (_obj = {
    timeFormat: "HH:mm:ss",
    dateFormat: "YYYY-MM-DD",
    dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    date: null,
    toDate: null,
    time: null,
    toTime: null,
    format: null,
    formats: null,
    recurring: null,
    advancedMode: false,
    timezone: null,
    fromSelected: null,
    fromFilled: (0, _computed.notEmpty)("date"),
    toSelected: null,
    toFilled: (0, _computed.notEmpty)("toDate"),
    init() {
      this._super(...arguments);
      this._picker = null;
      this.setProperties({
        timezones: [],
        formats: (this.siteSettings.discourse_local_dates_default_formats || "").split("|").filter(f => f),
        timezone: moment.tz.guess(),
        date: moment().format(this.dateFormat)
      });
    },
    didInsertElement() {
      this._super(...arguments);
      this._setupPicker().then(picker => {
        this._picker = picker;
        this.send("focusFrom");
      });
    },
    configChanged() {
      this._renderPreview();
    },
    async _renderPreview() {
      if (this.markup) {
        const result = await (0, _text.cookAsync)(this.markup);
        this.set("currentPreview", result);
        (0, _runloop.schedule)("afterRender", () => {
          (0, _localDates.applyLocalDates)(document.querySelectorAll(".preview .discourse-local-date"), this.siteSettings);
        });
      }
    },
    isRange(date, toDate, toTime) {
      return date && (toDate || toTime);
    },
    isValid(config, isRange) {
      const fromConfig = config.from;
      if (!config.from.dateTime || !config.from.dateTime.isValid()) {
        return false;
      }
      if (isRange) {
        const toConfig = config.to;
        if (!toConfig.dateTime || !toConfig.dateTime.isValid() || toConfig.dateTime.diff(fromConfig.dateTime) < 0) {
          return false;
        }
      }
      return true;
    },
    fromConfig(date, time, isRange) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      const timeInferred = time ? false : true;
      let dateTime;
      if (!timeInferred) {
        dateTime = moment.tz(`${date} ${time}`, options.timezone);
      } else {
        dateTime = moment.tz(date, options.timezone);
      }
      if (!timeInferred) {
        time = dateTime.format(this.timeFormat);
      }
      let format = options.format;
      if (timeInferred && this.formats.includes(format)) {
        format = "LL";
      }
      return _object.default.create({
        date: dateTime.format(this.dateFormat),
        time,
        dateTime,
        format,
        range: isRange ? "start" : false
      });
    },
    toConfig(date, time, isRange) {
      let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      const timeInferred = time ? false : true;
      if (time && !date) {
        date = moment().format(this.dateFormat);
      }
      let dateTime;
      if (!timeInferred) {
        dateTime = moment.tz(`${date} ${time}`, options.timezone);
      } else {
        dateTime = moment.tz(date, options.timezone).endOf("day");
      }
      if (!timeInferred) {
        time = dateTime.format(this.timeFormat);
      }
      let format = options.format;
      if (timeInferred && this.formats.includes(format)) {
        format = "LL";
      }
      return _object.default.create({
        date: dateTime.format(this.dateFormat),
        time,
        dateTime,
        format,
        range: isRange ? "end" : false
      });
    },
    options(recurring, timezones, timezone, format) {
      return _object.default.create({
        recurring,
        timezones,
        timezone,
        format
      });
    },
    computedConfig(fromConfig, toConfig, options) {
      return _object.default.create({
        from: fromConfig,
        to: toConfig,
        options
      });
    },
    currentUserTimezone() {
      return moment.tz.guess();
    },
    allTimezones() {
      return moment.tz.names();
    },
    timezoneIsDifferentFromUserTimezone: (0, _computed2.propertyNotEqual)("currentUserTimezone", "options.timezone"),
    formattedCurrentUserTimezone(timezone) {
      return timezone.replace("_", " ").replace("Etc/", "").replace("/", ", ");
    },
    previewedFormats(formats) {
      return formats.map(format => {
        return {
          format,
          preview: moment().format(format)
        };
      });
    },
    recurringOptions() {
      const key = "discourse_local_dates.create.form.recurring";
      return [{
        name: _I18n.default.t(`${key}.every_day`),
        id: "1.days"
      }, {
        name: _I18n.default.t(`${key}.every_week`),
        id: "1.weeks"
      }, {
        name: _I18n.default.t(`${key}.every_two_weeks`),
        id: "2.weeks"
      }, {
        name: _I18n.default.t(`${key}.every_month`),
        id: "1.months"
      }, {
        name: _I18n.default.t(`${key}.every_two_months`),
        id: "2.months"
      }, {
        name: _I18n.default.t(`${key}.every_three_months`),
        id: "3.months"
      }, {
        name: _I18n.default.t(`${key}.every_six_months`),
        id: "6.months"
      }, {
        name: _I18n.default.t(`${key}.every_year`),
        id: "1.years"
      }];
    },
    _generateDateMarkup(fromDateTime, options, isRange, toDateTime) {
      return (0, _localDateMarkupGenerator.default)(fromDateTime, options, isRange, toDateTime);
    },
    toggleModeBtnLabel(advancedMode) {
      return advancedMode ? "discourse_local_dates.create.form.simple_mode" : "discourse_local_dates.create.form.advanced_mode";
    },
    markup(config, options, isValid, isRange) {
      let text;
      if (isValid && config.from) {
        if (config.to && config.to.range) {
          text = this._generateDateMarkup(config.from, options, isRange, config.to);
        } else {
          text = this._generateDateMarkup(config.from, options, isRange);
        }
      }
      return text;
    },
    formattedFrom(dateTime) {
      return dateTime.format("LLLL");
    },
    formattedTo(dateTime, toSelected) {
      const emptyText = toSelected ? "&nbsp;" : _I18n.default.t("discourse_local_dates.create.form.until");
      return dateTime.isValid() ? dateTime.format("LLLL") : emptyText;
    },
    updateFormat(format, event) {
      event?.preventDefault();
      this.set("format", format);
    },
    actions: {
      setTime(event) {
        this._setTimeIfValid(event.target.value, "time");
      },
      setToTime(event) {
        this._setTimeIfValid(event.target.value, "toTime");
      },
      eraseToDateTime() {
        this.setProperties({
          toDate: null,
          toTime: null
        });
        this._setPickerDate(null);
      },
      focusFrom() {
        this.setProperties({
          fromSelected: true,
          toSelected: false
        });
        this._setPickerDate(this.get("fromConfig.date"));
        this._setPickerMinDate(null);
      },
      focusTo() {
        this.setProperties({
          toSelected: true,
          fromSelected: false
        });
        this._setPickerDate(this.get("toConfig.date"));
        this._setPickerMinDate(this.get("fromConfig.date"));
      },
      advancedMode() {
        this.toggleProperty("advancedMode");
      },
      save() {
        const markup = this.markup;
        if (markup) {
          this._closeModal();
          this.insertDate(markup);
        }
      },
      cancel() {
        this._closeModal();
      }
    },
    _setTimeIfValid(time, key) {
      if ((0, _utils.isEmpty)(time)) {
        this.set(key, null);
        return;
      }
      if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
        this.set(key, time);
      }
    },
    _setupPicker() {
      return new _rsvp.Promise(resolve => {
        (0, _loadScript.default)("/javascripts/pikaday.js").then(() => {
          const options = {
            field: this.element.querySelector(".fake-input"),
            container: this.element.querySelector(`#picker-container-${this.elementId}`),
            bound: false,
            format: "YYYY-MM-DD",
            reposition: false,
            firstDay: 1,
            setDefaultDate: true,
            keyboardInput: false,
            i18n: {
              previousMonth: _I18n.default.t("dates.previous_month"),
              nextMonth: _I18n.default.t("dates.next_month"),
              months: moment.months(),
              weekdays: moment.weekdays(),
              weekdaysShort: moment.weekdaysMin()
            },
            onSelect: date => {
              const formattedDate = moment(date).format("YYYY-MM-DD");
              if (this.fromSelected) {
                this.set("date", formattedDate);
              }
              if (this.toSelected) {
                this.set("toDate", formattedDate);
              }
            }
          };
          resolve(new Pikaday(options));
        });
      });
    },
    _setPickerMinDate(date) {
      (0, _runloop.schedule)("afterRender", () => {
        if (moment(date, this.dateFormat).isValid()) {
          this._picker.setMinDate(moment(date, this.dateFormat).toDate());
        } else {
          this._picker.setMinDate(null);
        }
      });
    },
    _setPickerDate(date) {
      (0, _runloop.schedule)("afterRender", () => {
        if (moment(date, this.dateFormat).isValid()) {
          this._picker.setDate(moment.utc(date), true);
        } else {
          this._picker.setDate(null);
        }
      });
    },
    _closeModal() {
      const composer = (0, _getOwner.getOwner)(this).lookup("controller:composer");
      composer.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "configChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "configChanged"), _obj), _applyDecoratedDescriptor(_obj, "_renderPreview", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_renderPreview"), _obj), _applyDecoratedDescriptor(_obj, "isRange", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isRange"), _obj), _applyDecoratedDescriptor(_obj, "isValid", [_dec4], Object.getOwnPropertyDescriptor(_obj, "isValid"), _obj), _applyDecoratedDescriptor(_obj, "fromConfig", [_dec5], Object.getOwnPropertyDescriptor(_obj, "fromConfig"), _obj), _applyDecoratedDescriptor(_obj, "toConfig", [_dec6], Object.getOwnPropertyDescriptor(_obj, "toConfig"), _obj), _applyDecoratedDescriptor(_obj, "options", [_dec7], Object.getOwnPropertyDescriptor(_obj, "options"), _obj), _applyDecoratedDescriptor(_obj, "computedConfig", [_dec8], Object.getOwnPropertyDescriptor(_obj, "computedConfig"), _obj), _applyDecoratedDescriptor(_obj, "currentUserTimezone", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "currentUserTimezone"), _obj), _applyDecoratedDescriptor(_obj, "allTimezones", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "allTimezones"), _obj), _applyDecoratedDescriptor(_obj, "formattedCurrentUserTimezone", [_dec9], Object.getOwnPropertyDescriptor(_obj, "formattedCurrentUserTimezone"), _obj), _applyDecoratedDescriptor(_obj, "previewedFormats", [_dec10], Object.getOwnPropertyDescriptor(_obj, "previewedFormats"), _obj), _applyDecoratedDescriptor(_obj, "recurringOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "recurringOptions"), _obj), _applyDecoratedDescriptor(_obj, "toggleModeBtnLabel", [_dec11], Object.getOwnPropertyDescriptor(_obj, "toggleModeBtnLabel"), _obj), _applyDecoratedDescriptor(_obj, "markup", [_dec12], Object.getOwnPropertyDescriptor(_obj, "markup"), _obj), _applyDecoratedDescriptor(_obj, "formattedFrom", [_dec13], Object.getOwnPropertyDescriptor(_obj, "formattedFrom"), _obj), _applyDecoratedDescriptor(_obj, "formattedTo", [_dec14], Object.getOwnPropertyDescriptor(_obj, "formattedTo"), _obj), _applyDecoratedDescriptor(_obj, "updateFormat", [_object.action], Object.getOwnPropertyDescriptor(_obj, "updateFormat"), _obj)), _obj)));
  _exports.default = _default;
});