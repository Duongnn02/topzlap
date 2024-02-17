define("discourse/components/future-date-input", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/object/computed", "I18n", "select-kit/components/future-date-input-selector", "discourse-common/utils/decorators", "discourse/lib/time-shortcut"], function (_exports, _component, _templateFactory, _object, _computed, _I18n, _futureDateInputSelector, _decorators, _timeShortcut) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"@ember/object/computed",0,"I18n",0,"select-kit/components/future-date-input-selector",0,"discourse-common/utils/decorators",0,"discourse/lib/time-shortcut"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="future-date-input">
    <div class="control-group">
      <label class={{this.labelClasses}}>
        {{#if this.displayLabelIcon}}{{d-icon
            this.displayLabelIcon
          }}{{/if}}{{this.displayLabel}}
      </label>
      <FutureDateInputSelector
        @value={{readonly this.selection}}
        @content={{this.shortcuts}}
        @clearable={{this.clearable}}
        @onChangeInput={{this.onChangeInput}}
        @onChange={{action (mut this.selection)}}
        @options={{hash none="time_shortcut.select_timeframe"}}
      />
    </div>
  
    {{#if this.displayDateAndTimePicker}}
      <div class="control-group future-date-input-date-picker">
        {{d-icon "calendar-alt"}}
        <DatePickerFuture
          @value={{this._date}}
          @defaultDate={{this._date}}
          @onSelect={{action "onChangeDate"}}
        />
      </div>
  
      <div class="control-group future-date-input-time-picker">
        {{d-icon "far-clock"}}
        <Input
          placeholder="--:--"
          @type="time"
          class="time-input"
          @value={{this._time}}
          disabled={{this.timeInputDisabled}}
          {{on "input" (action "onChangeTime" value="target.value")}}
        />
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "h88ZSmfg",
    "block": "[[[10,0],[14,0,\"future-date-input\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[15,0,[30,0,[\"labelClasses\"]]],[12],[1,\"\\n      \"],[41,[30,0,[\"displayLabelIcon\"]],[[[1,[28,[35,1],[[30,0,[\"displayLabelIcon\"]]],null]]],[]],null],[1,[30,0,[\"displayLabel\"]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@value\",\"@content\",\"@clearable\",\"@onChangeInput\",\"@onChange\",\"@options\"],[[28,[37,3],[[30,0,[\"selection\"]]],null],[30,0,[\"shortcuts\"]],[30,0,[\"clearable\"]],[30,0,[\"onChangeInput\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"selection\"]]],null]],null],[28,[37,6],null,[[\"none\"],[\"time_shortcut.select_timeframe\"]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"displayDateAndTimePicker\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group future-date-input-date-picker\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"calendar-alt\"],null]],[1,\"\\n      \"],[8,[39,7],null,[[\"@value\",\"@defaultDate\",\"@onSelect\"],[[30,0,[\"_date\"]],[30,0,[\"_date\"]],[28,[37,4],[[30,0],\"onChangeDate\"],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group future-date-input-time-picker\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"far-clock\"],null]],[1,\"\\n      \"],[8,[39,8],[[24,\"placeholder\",\"--:--\"],[24,0,\"time-input\"],[16,\"disabled\",[30,0,[\"timeInputDisabled\"]]],[4,[38,9],[\"input\",[28,[37,4],[[30,0],\"onChangeTime\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"time\",[30,0,[\"_time\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"if\",\"d-icon\",\"future-date-input-selector\",\"readonly\",\"action\",\"mut\",\"hash\",\"date-picker-future\",\"input\",\"on\"]]",
    "moduleName": "discourse/components/future-date-input.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("customShortcuts"), (_obj = {
    selection: null,
    includeDateTime: true,
    isCustom: (0, _computed.equal)("selection", "custom"),
    displayDateAndTimePicker: (0, _computed.and)("includeDateTime", "isCustom"),
    displayLabel: null,
    labelClasses: null,
    timeInputDisabled: (0, _computed.empty)("_date"),
    userTimezone: null,
    onChangeInput: null,
    _date: null,
    _time: null,
    init() {
      this._super(...arguments);
      this.userTimezone = this.currentUser.user_option.timezone;
    },
    didReceiveAttrs() {
      this._super(...arguments);
      if (this.label) {
        this.set("displayLabel", _I18n.default.t(this.label));
      }
      if (this.input) {
        const dateTime = moment(this.input);
        const closestShortcut = this._findClosestShortcut(dateTime);
        if (closestShortcut) {
          this.set("selection", closestShortcut.id);
        } else {
          this.setProperties({
            selection: _timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM,
            _date: dateTime.format("YYYY-MM-DD"),
            _time: dateTime.format("HH:mm")
          });
        }
      }
    },
    shortcuts(customShortcuts) {
      let shortcuts;
      if (customShortcuts && customShortcuts.length) {
        shortcuts = customShortcuts;
      } else {
        shortcuts = (0, _timeShortcut.extendedDefaultTimeShortcuts)(this.userTimezone);
      }
      const shortcutsFactory = (0, _timeShortcut.timeShortcuts)(this.userTimezone);
      if (this.includeDateTime) {
        shortcuts.push(shortcutsFactory.custom());
      }
      if (this.includeNow) {
        shortcuts.push(shortcutsFactory.now());
      }
      shortcuts = (0, _timeShortcut.hideDynamicTimeShortcuts)(shortcuts, this.userTimezone, this.siteSettings);
      return shortcuts.map(s => {
        return {
          id: s.id,
          name: _I18n.default.t(s.label),
          time: s.time,
          timeFormatted: (0, _timeShortcut.formatTime)(s),
          icon: s.icon
        };
      });
    },
    onChangeDate(date) {
      if (!date) {
        this.set("_time", null);
      }
      this._dateTimeChanged(date, this._time);
    },
    onChangeTime(time) {
      if (this._date) {
        this._dateTimeChanged(this._date, time);
      }
    },
    _dateTimeChanged(date, time) {
      time = time ? ` ${time}` : "";
      const dateTime = moment(`${date}${time}`);
      if (dateTime.isValid()) {
        this.onChangeInput?.(dateTime.format(_futureDateInputSelector.FORMAT));
      } else {
        this.onChangeInput?.(null);
      }
    },
    _findClosestShortcut(dateTime) {
      return this.shortcuts.find(tf => {
        if (tf.time) {
          const diff = tf.time.diff(dateTime);
          return 0 <= diff && diff < 60 * 1000;
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "shortcuts", [_dec], Object.getOwnPropertyDescriptor(_obj, "shortcuts"), _obj), _applyDecoratedDescriptor(_obj, "onChangeDate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeDate"), _obj), _applyDecoratedDescriptor(_obj, "onChangeTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeTime"), _obj)), _obj))));
  _exports.default = _default;
});