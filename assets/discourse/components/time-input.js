define("discourse/components/time-input", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/utils", "@ember/template"], function (_exports, _component, _templateFactory, _object, _utils, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/component",0,"@ember/utils",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ComboBox
    @value={{this.time}}
    @content={{this.timeOptions}}
    @onChange={{action "onChangeTime"}}
    @options={{hash
      translatedNone="--:--"
      allowAny=true
      filterable=false
      autoInsertNoneItem=false
      translatedFilterPlaceholder="--:--"
    }}
  />
  */
  {
    "id": "DcLZyXCT",
    "block": "[[[8,[39,0],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"time\"]],[30,0,[\"timeOptions\"]],[28,[37,1],[[30,0],\"onChangeTime\"],null],[28,[37,2],null,[[\"translatedNone\",\"allowAny\",\"filterable\",\"autoInsertNoneItem\",\"translatedFilterPlaceholder\"],[\"--:--\",true,false,false,\"--:--\"]]]]],null]],[],false,[\"combo-box\",\"action\",\"hash\"]]",
    "moduleName": "discourse/components/time-input.hbs",
    "isStrictMode": false
  });
  function convertMinutes(num) {
    return {
      hours: Math.floor(num / 60),
      minutes: num % 60
    };
  }
  function convertMinutesToString(n) {
    const hoursAndMinutes = convertMinutes(n);
    return `${hoursAndMinutes.hours.toString().padStart(2, "0")}:${hoursAndMinutes.minutes.toString().padStart(2, "0")}`;
  }
  function convertMinutesToDurationString(n) {
    const hoursAndMinutes = convertMinutes(n);
    let output = "";
    if (hoursAndMinutes.hours) {
      output = `${hoursAndMinutes.hours}h`;
      if (hoursAndMinutes.minutes > 0) {
        output = `${output} ${hoursAndMinutes.minutes} min`;
      }
    } else {
      output = `${hoursAndMinutes.minutes} min`;
    }
    return output;
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    classNames: ["d-time-input"],
    hours: null,
    minutes: null,
    relativeDate: null,
    didReceiveAttrs() {
      this._super(...arguments);
      if ((0, _utils.isPresent)(this.date)) {
        this.setProperties({
          hours: this.date.hours(),
          minutes: this.date.minutes()
        });
      }
      if (!(0, _utils.isPresent)(this.date) && !(0, _utils.isPresent)(this.attrs.hours) && !(0, _utils.isPresent)(this.attrs.minutes)) {
        this.setProperties({
          hours: null,
          minutes: null
        });
      }
    },
    minimumTime: (0, _object.computed)("relativeDate", "date", function () {
      if (this.relativeDate) {
        if (this.date) {
          if (!this.date.isSame(this.relativeDate, "day")) {
            return 0;
          } else {
            return this.relativeDate.hours() * 60 + this.relativeDate.minutes();
          }
        } else {
          return this.relativeDate.hours() * 60 + this.relativeDate.minutes();
        }
      }
    }),
    timeOptions: (0, _object.computed)("minimumTime", "hours", "minutes", function () {
      let options = [];
      const start = this.minimumTime ? this.minimumTime > this.time ? this.time : this.minimumTime : 0;

      // theres 1440 minutes in a day
      // and 1440 / 15 = 96
      let i = 0;
      while (i < 96) {
        // while diff with minimumTime is less than one hour
        // use 15 minutes steps and then 30 minutes
        const minutes = this.minimumTime ? i <= 4 ? 15 : 30 : 15;
        const option = start + i * minutes;

        // when start is higher than 0 we will reach 1440 minutes
        // before the 96 iterations
        if (option > 1440) {
          break;
        }
        options.push(option);
        i++;
      }
      if (this.time && !options.includes(this.time)) {
        options = [this.time].concat(options);
      }
      options = options.sort((a, b) => a - b);
      return options.map(option => {
        let name = convertMinutesToString(option);
        let label;
        if (this.date && this.relativeDate) {
          const diff = this.date.clone().startOf("day").add(option, "minutes").diff(this.relativeDate, "minutes");
          if (diff < 1440) {
            label = (0, _template.htmlSafe)(`${name} <small>(${convertMinutesToDurationString(diff)})</small>`);
          }
        }
        return {
          id: option,
          name,
          label,
          title: name
        };
      });
    }),
    time: (0, _object.computed)("minimumTime", "hours", "minutes", function () {
      if ((0, _utils.isPresent)(this.hours) && (0, _utils.isPresent)(this.minutes)) {
        return parseInt(this.hours, 10) * 60 + parseInt(this.minutes, 10);
      }
    }),
    onFocusIn(value, event) {
      if (value && event.target) {
        event.target.select();
      }
    },
    onChangeTime(time) {
      if ((0, _utils.isPresent)(time) && this.onChange) {
        if (typeof time === "string" && time.length) {
          let [hours, minutes] = time.split(":");
          if (hours && minutes) {
            if (hours < 0) {
              hours = 0;
            }
            if (hours > 23) {
              hours = 23;
            }
            if (minutes < 0) {
              minutes = 0;
            }
            if (minutes > 59) {
              minutes = 59;
            }
            this.onChange({
              hours: parseInt(hours, 10),
              minutes: parseInt(minutes, 10)
            });
          }
        } else {
          this.onChange({
            hours: convertMinutes(time).hours,
            minutes: convertMinutes(time).minutes
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onFocusIn", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onFocusIn"), _obj), _applyDecoratedDescriptor(_obj, "onChangeTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeTime"), _obj)), _obj)));
  _exports.default = _default;
});