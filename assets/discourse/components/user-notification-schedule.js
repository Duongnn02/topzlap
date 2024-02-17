define("discourse/components/user-notification-schedule", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group notification-schedule">
    <label class="control-label">{{i18n
        "user.notification_schedule.title"
      }}</label>
    <PreferenceCheckbox
      @labelKey="user.notification_schedule.label"
      @checked={{this.model.user_notification_schedule.enabled}}
    />
  
    {{#if this.model.user_notification_schedule.enabled}}
      <div class="instruction">{{i18n "user.notification_schedule.tip"}}</div>
  
      <table class="notification-schedule-table">
        <tbody class="notification-schedule-tbody">
          {{#each this.days as |day|}}
            <UserNotificationScheduleDay
              @day={{day.day}}
              @startTimeOptions={{day.startTimeOptions}}
              @startTimeValue={{day.startTimeValue}}
              @onChangeStartTime={{day.onChangeStartTime}}
              @endTimeOptions={{day.endTimeOptions}}
              @endTimeValue={{day.endTimeValue}}
              @onChangeEndTime={{day.onChangeEndTime}}
            />
          {{/each}}
        </tbody>
      </table>
    {{/if}}
  </div>
  */
  {
    "id": "gkGP1BD0",
    "block": "[[[10,0],[14,0,\"control-group notification-schedule\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.notification_schedule.title\"],null]],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@labelKey\",\"@checked\"],[\"user.notification_schedule.label\",[30,0,[\"model\",\"user_notification_schedule\",\"enabled\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"user_notification_schedule\",\"enabled\"]],[[[1,\"    \"],[10,0],[14,0,\"instruction\"],[12],[1,[28,[35,0],[\"user.notification_schedule.tip\"],null]],[13],[1,\"\\n\\n    \"],[10,\"table\"],[14,0,\"notification-schedule-table\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[14,0,\"notification-schedule-tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"days\"]]],null]],null],null,[[[1,\"          \"],[8,[39,5],null,[[\"@day\",\"@startTimeOptions\",\"@startTimeValue\",\"@onChangeStartTime\",\"@endTimeOptions\",\"@endTimeValue\",\"@onChangeEndTime\"],[[30,1,[\"day\"]],[30,1,[\"startTimeOptions\"]],[30,1,[\"startTimeValue\"]],[30,1,[\"onChangeStartTime\"]],[30,1,[\"endTimeOptions\"]],[30,1,[\"endTimeValue\"]],[30,1,[\"onChangeEndTime\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"day\"],false,[\"i18n\",\"preference-checkbox\",\"if\",\"each\",\"-track-array\",\"user-notification-schedule-day\"]]",
    "moduleName": "discourse/components/user-notification-schedule.hbs",
    "isStrictMode": false
  });
  const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const Day = _object.default.extend((_dec = (0, _decorators.default)("model.user_notification_schedule.day_{0,1,2,3,4,5,6}_start_time"), _dec2 = (0, _decorators.default)("model.user_notification_schedule.day_{0,1,2,3,4,5,6}_start_time"), _dec3 = (0, _decorators.default)("model.user_notification_schedule.day_{0,1,2,3,4,5,6}_end_time"), (_obj = {
    id: null,
    startTimeOptions: null,
    model: null,
    onChangeStartTime(val) {
      this.startingTimeChangedForDay(val);
    },
    onChangeEndTime(val) {
      this.set(`model.user_notification_schedule.day_${this.id}_end_time`, val);
    },
    startTimeValue(schedule) {
      return schedule[`day_${this.id}_start_time`];
    },
    endTimeOptions(schedule) {
      return this.buildEndTimeOptionsFor(schedule[`day_${this.id}_start_time`]);
    },
    endTimeValue(schedule) {
      return schedule[`day_${this.id}_end_time`];
    },
    startingTimeChangedForDay(val) {
      val = parseInt(val, 10);
      this.model.set(`user_notification_schedule.day_${this.id}_start_time`, val);
      if (val !== "-1" && this.model.user_notification_schedule[`day_${this.id}_end_time`] <= val) {
        this.model.set(`user_notification_schedule.day_${this.id}_end_time`, val + 30);
      }
    },
    buildEndTimeOptionsFor(startTime) {
      startTime = parseInt(startTime, 10);
      if (startTime === -1) {
        return null;
      }
      return this.buildTimeOptions(startTime + 30, {
        includeNone: false,
        showMidnight: true
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "onChangeStartTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeStartTime"), _obj), _applyDecoratedDescriptor(_obj, "onChangeEndTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeEndTime"), _obj), _applyDecoratedDescriptor(_obj, "startTimeValue", [_dec], Object.getOwnPropertyDescriptor(_obj, "startTimeValue"), _obj), _applyDecoratedDescriptor(_obj, "endTimeOptions", [_dec2], Object.getOwnPropertyDescriptor(_obj, "endTimeOptions"), _obj), _applyDecoratedDescriptor(_obj, "endTimeValue", [_dec3], Object.getOwnPropertyDescriptor(_obj, "endTimeValue"), _obj)), _obj)));
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    days: null,
    didInsertElement() {
      this._super(...arguments);
      this.set("startTimeOptions", this.buildTimeOptions(0, {
        includeNone: true,
        showMidnight: false
      }));
      this.set("days", []);
      DAYS.forEach((day, index) => {
        this.days.pushObject(Day.create({
          id: index,
          day,
          model: this.model,
          buildTimeOptions: this.buildTimeOptions,
          startTimeOptions: this.startTimeOptions
        }));
      });
    },
    buildTimeOptions(startAt) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        includeNone: false,
        showMidnight: true
      };
      let timeOptions = [];
      if (opts.includeNone) {
        timeOptions.push({
          name: _I18n.default.t("user.notification_schedule.none"),
          value: -1
        });
      }
      for (let timeInMin = startAt; timeInMin <= 1440; timeInMin += 30) {
        let hours = Math.floor(timeInMin / 60);
        let minutes = timeInMin % 60;
        if (minutes === 0) {
          minutes = "00";
        }
        if (hours === 24) {
          if (opts.showMidnight) {
            timeOptions.push({
              name: _I18n.default.t("user.notification_schedule.midnight"),
              value: 1440
            });
          }
          break;
        }
        timeOptions.push({
          name: moment().set("hour", hours).set("minute", minutes).format("LT"),
          value: timeInMin
        });
      }
      return timeOptions;
    }
  }));
  _exports.default = _default;
});