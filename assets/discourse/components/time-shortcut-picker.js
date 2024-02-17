define("discourse/components/time-shortcut-picker", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/time-utils", "discourse/lib/time-shortcut", "discourse-common/utils/decorators", "I18n", "@ember/object", "@ember/object/computed"], function (_exports, _component, _templateFactory, _timeUtils, _timeShortcut, _decorators, _I18n, _object, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/time-utils",0,"discourse/lib/time-shortcut",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"@ember/object",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <TapTileGrid @activeTile={{this.selectedShortcut}} as |grid|>
    {{#each this.options as |option|}}
      {{#unless option.hidden}}
        <TapTile
          @icon={{option.icon}}
          @tileId={{option.id}}
          @activeTile={{grid.activeTile}}
          @onChange={{action "selectShortcut"}}
        >
          <div class="tap-tile-title">{{i18n option.label}}</div>
          <div class="tap-tile-date">{{option.timeFormatted}}</div>
        </TapTile>
      {{/unless}}
  
      {{#if option.isCustomTimeShortcut}}
        {{#if this.customDatetimeSelected}}
          <div class="control-group custom-date-time-wrap custom-input-wrap">
            <div class="tap-tile-date-input">
              {{d-icon "calendar-alt"}}
              <DatePickerFuture
                @value={{this.customDate}}
                @defaultDate={{this.defaultCustomDate}}
                @onSelect={{action (mut this.customDate)}}
                @id="custom-date"
              />
            </div>
            <div class="tap-tile-time-input">
              {{d-icon "far-clock"}}
              <Input
                placeholder="--:--"
                id="custom-time"
                @type="time"
                class="time-input"
                @value={{this.customTime}}
              />
            </div>
          </div>
          <div class="control-group custom-date-time-wrap custom-relative-wrap">
            <label class="control-label" for="bookmark-relative-time-picker">
              {{i18n "relative_time_picker.relative"}}
            </label>
            <RelativeTimePicker
              @id="bookmark-relative-time-picker"
              @onChange={{action "relativeTimeChanged"}}
            />
          </div>
        {{/if}}
      {{/if}}
    {{/each}}
  </TapTileGrid>
  */
  {
    "id": "Wlkve3s+",
    "block": "[[[8,[39,0],null,[[\"@activeTile\"],[[30,0,[\"selectedShortcut\"]]]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"options\"]]],null]],null],null,[[[41,[51,[30,2,[\"hidden\"]]],[[[1,\"      \"],[8,[39,4],null,[[\"@icon\",\"@tileId\",\"@activeTile\",\"@onChange\"],[[30,2,[\"icon\"]],[30,2,[\"id\"]],[30,1,[\"activeTile\"]],[28,[37,5],[[30,0],\"selectShortcut\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"tap-tile-title\"],[12],[1,[28,[35,6],[[30,2,[\"label\"]]],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"tap-tile-date\"],[12],[1,[30,2,[\"timeFormatted\"]]],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,2,[\"isCustomTimeShortcut\"]],[[[41,[30,0,[\"customDatetimeSelected\"]],[[[1,\"        \"],[10,0],[14,0,\"control-group custom-date-time-wrap custom-input-wrap\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"tap-tile-date-input\"],[12],[1,\"\\n            \"],[1,[28,[35,8],[\"calendar-alt\"],null]],[1,\"\\n            \"],[8,[39,9],null,[[\"@value\",\"@defaultDate\",\"@onSelect\",\"@id\"],[[30,0,[\"customDate\"]],[30,0,[\"defaultCustomDate\"]],[28,[37,5],[[30,0],[28,[37,10],[[30,0,[\"customDate\"]]],null]],null],\"custom-date\"]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"tap-tile-time-input\"],[12],[1,\"\\n            \"],[1,[28,[35,8],[\"far-clock\"],null]],[1,\"\\n            \"],[8,[39,11],[[24,\"placeholder\",\"--:--\"],[24,1,\"custom-time\"],[24,0,\"time-input\"]],[[\"@type\",\"@value\"],[\"time\",[30,0,[\"customTime\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"control-group custom-date-time-wrap custom-relative-wrap\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"bookmark-relative-time-picker\"],[12],[1,\"\\n            \"],[1,[28,[35,6],[\"relative_time_picker.relative\"],null]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[8,[39,12],null,[[\"@id\",\"@onChange\"],[\"bookmark-relative-time-picker\",[28,[37,5],[[30,0],\"relativeTimeChanged\"],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[2]],null]],[1]]]]]],[\"grid\",\"option\"],false,[\"tap-tile-grid\",\"each\",\"-track-array\",\"unless\",\"tap-tile\",\"action\",\"i18n\",\"if\",\"d-icon\",\"date-picker-future\",\"mut\",\"input\",\"relative-time-picker\"]]",
    "moduleName": "discourse/components/time-shortcut-picker.hbs",
    "isStrictMode": false
  });
  const BINDINGS = {
    "l t": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.LATER_TODAY]
    },
    "l w": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.LATER_THIS_WEEK]
    },
    "n d": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.TOMORROW]
    },
    "n b w": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.START_OF_NEXT_BUSINESS_WEEK]
    },
    "n m": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.NEXT_MONTH]
    },
    "c r": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM]
    },
    "n r": {
      handler: "selectShortcut",
      args: [_timeShortcut.TIME_SHORTCUT_TYPES.NONE]
    }
  };
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.observes)("prefilledDatetime"), _dec3 = (0, _decorators.observes)("customDate", "customTime"), _dec4 = (0, _decorators.default)("timeShortcuts", "hiddenOptions", "customLabels", "userTimezone"), (_obj = {
    tagName: "",
    userTimezone: null,
    onTimeSelected: null,
    selectedShortcut: null,
    selectedTime: null,
    selectedDate: null,
    selectedDatetime: null,
    prefilledDatetime: null,
    hiddenOptions: null,
    customOptions: null,
    lastCustomDate: null,
    lastCustomTime: null,
    parsedLastCustomDatetime: null,
    customDate: null,
    customTime: null,
    _itsatrap: null,
    _setupPicker() {
      this.setProperties({
        userTimezone: this.currentUser.user_option.timezone,
        hiddenOptions: this.hiddenOptions || [],
        customOptions: this.customOptions || [],
        customLabels: this.customLabels || {}
      });
      if (this.prefilledDatetime) {
        this.parsePrefilledDatetime();
      }
      this._bindKeyboardShortcuts();
    },
    prefilledDatetimeChanged() {
      if (this.prefilledDatetime) {
        this.parsePrefilledDatetime();
      } else {
        this.setProperties({
          customDate: null,
          customTime: null,
          selectedShortcut: null
        });
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._itsatrap.unbind(Object.keys(BINDINGS));
    },
    parsePrefilledDatetime() {
      let parsedDatetime = (0, _timeUtils.parseCustomDatetime)(this.prefilledDatetime, null, this.userTimezone);
      if (parsedDatetime.isSame((0, _timeUtils.laterToday)())) {
        return this.set("selectedShortcut", _timeShortcut.TIME_SHORTCUT_TYPES.LATER_TODAY);
      }
      this.setProperties({
        customDate: parsedDatetime.format("YYYY-MM-DD"),
        customTime: parsedDatetime.format("HH:mm"),
        selectedShortcut: _timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM
      });
    },
    _loadLastUsedCustomDatetime() {
      const lastTime = this.keyValueStore.lastCustomTime;
      const lastDate = this.keyValueStore.lastCustomDate;
      if (lastTime && lastDate) {
        let parsed = (0, _timeUtils.parseCustomDatetime)(lastDate, lastTime, this.userTimezone);
        if (!parsed.isValid() || parsed < (0, _timeUtils.now)(this.userTimezone)) {
          return;
        }
        this.setProperties({
          lastCustomDate: lastDate,
          lastCustomTime: lastTime,
          parsedLastCustomDatetime: parsed
        });
      }
    },
    _bindKeyboardShortcuts() {
      Object.keys(BINDINGS).forEach(shortcut => {
        this._itsatrap.bind(shortcut, () => {
          let binding = BINDINGS[shortcut];
          this.send(binding.handler, ...binding.args);
          return false;
        });
      });
    },
    customDatetimeSelected: (0, _computed.equal)("selectedShortcut", _timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM),
    relativeTimeSelected: (0, _computed.equal)("selectedShortcut", _timeShortcut.TIME_SHORTCUT_TYPES.RELATIVE),
    customDatetimeFilled: (0, _computed.and)("customDate", "customTime"),
    customDatetimeChanged() {
      if (!this.customDatetimeFilled) {
        return;
      }
      this.selectShortcut(_timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM);
    },
    options(timeShortcuts, hiddenOptions, customLabels, userTimezone) {
      this._loadLastUsedCustomDatetime();
      let options;
      if (timeShortcuts && timeShortcuts.length) {
        options = timeShortcuts;
      } else {
        options = (0, _timeShortcut.defaultTimeShortcuts)(userTimezone);
      }
      options = (0, _timeShortcut.hideDynamicTimeShortcuts)(options, userTimezone, this.siteSettings);
      let specialOptions = (0, _timeShortcut.specialShortcutOptions)();
      if (this.lastCustomDate && this.lastCustomTime) {
        let lastCustom = specialOptions.findBy("id", _timeShortcut.TIME_SHORTCUT_TYPES.LAST_CUSTOM);
        lastCustom.time = this.parsedLastCustomDatetime;
        lastCustom.timeFormatKey = "dates.long_no_year";
        lastCustom.hidden = false;
      }
      options = options.concat(specialOptions);
      if (hiddenOptions.length > 0) {
        options.forEach(opt => {
          if (hiddenOptions.includes(opt.id)) {
            opt.hidden = true;
          }
        });
      }
      this._applyCustomLabels(options, customLabels);
      options.forEach(o => o.timeFormatted = (0, _timeShortcut.formatTime)(o));
      return options;
    },
    relativeTimeChanged(relativeTimeMins) {
      let dateTime = (0, _timeUtils.now)(this.userTimezone).add(relativeTimeMins, "minutes");
      this.set("selectedDatetime", dateTime);
      if (this.onTimeSelected) {
        this.onTimeSelected(_timeShortcut.TIME_SHORTCUT_TYPES.RELATIVE, dateTime);
      }
    },
    selectShortcut(type) {
      if (this.options.filterBy("hidden").mapBy("id").includes(type)) {
        return;
      }
      let dateTime = null;
      if (type === _timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM) {
        const defaultCustomDateTime = this._defaultCustomDateTime();
        this.set("customDate", this.customDate || defaultCustomDateTime.format("YYYY-MM-DD"));
        this.set("customTime", this.customTime || defaultCustomDateTime.format("HH:mm"));
        const customDatetime = (0, _timeUtils.parseCustomDatetime)(this.customDate, this.customTime, this.userTimezone);
        if (customDatetime.isValid() && this.customDate) {
          dateTime = customDatetime;
          this.keyValueStore.lastCustomTime = this.customTime;
          this.keyValueStore.lastCustomDate = this.customDate;
        }
      } else {
        dateTime = this.options.findBy("id", type).time;
      }
      this.setProperties({
        selectedShortcut: type,
        selectedDatetime: dateTime
      });
      if (this.onTimeSelected) {
        this.onTimeSelected(type, dateTime);
      }
    },
    _applyCustomLabels(options, customLabels) {
      options.forEach(option => {
        if (customLabels[option.id]) {
          option.label = customLabels[option.id];
        }
      });
    },
    _formatTime(options) {
      options.forEach(option => {
        if (option.time && option.timeFormatKey) {
          option.timeFormatted = option.time.format(_I18n.default.t(option.timeFormatKey));
        }
      });
    },
    _defaultCustomDateTime() {
      return moment.tz(this.userTimezone).add(1, "hour");
    }
  }, (_applyDecoratedDescriptor(_obj, "_setupPicker", [_dec], Object.getOwnPropertyDescriptor(_obj, "_setupPicker"), _obj), _applyDecoratedDescriptor(_obj, "prefilledDatetimeChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "prefilledDatetimeChanged"), _obj), _applyDecoratedDescriptor(_obj, "customDatetimeChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "customDatetimeChanged"), _obj), _applyDecoratedDescriptor(_obj, "options", [_dec4], Object.getOwnPropertyDescriptor(_obj, "options"), _obj), _applyDecoratedDescriptor(_obj, "relativeTimeChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "relativeTimeChanged"), _obj), _applyDecoratedDescriptor(_obj, "selectShortcut", [_object.action], Object.getOwnPropertyDescriptor(_obj, "selectShortcut"), _obj)), _obj))));
  _exports.default = _default;
});