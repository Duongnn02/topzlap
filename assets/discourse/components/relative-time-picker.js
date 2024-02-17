define("discourse/components/relative-time-picker", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/utils", "I18n", "@ember/object"], function (_exports, _component, _templateFactory, _decorators, _utils, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"@ember/component",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="relative-time-picker">
    <Input
      class="relative-time-duration"
      min={{this.durationMin}}
      step={{this.durationStep}}
      @type="number"
      @value={{this.duration}}
      {{on "change" (action "onChangeDuration")}}
      id={{this.id}}
    />
    <ComboBox
      @content={{this.intervals}}
      @value={{this.selectedInterval}}
      @class="relative-time-intervals"
      @onChange={{action "onChangeInterval"}}
    />
  </div>
  */
  {
    "id": "fPqKxuBQ",
    "block": "[[[10,0],[14,0,\"relative-time-picker\"],[12],[1,\"\\n  \"],[8,[39,0],[[24,0,\"relative-time-duration\"],[16,\"min\",[30,0,[\"durationMin\"]]],[16,\"step\",[30,0,[\"durationStep\"]]],[16,1,[30,0,[\"id\"]]],[4,[38,1],[\"change\",[28,[37,2],[[30,0],\"onChangeDuration\"],null]],null]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"duration\"]]]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@content\",\"@value\",\"@class\",\"@onChange\"],[[30,0,[\"intervals\"]],[30,0,[\"selectedInterval\"]],\"relative-time-intervals\",[28,[37,2],[[30,0],\"onChangeInterval\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"input\",\"on\",\"action\",\"combo-box\"]]",
    "moduleName": "discourse/components/relative-time-picker.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.on)("init"), _dec3 = (0, _decorators.default)("selectedInterval"), _dec4 = (0, _decorators.default)("selectedInterval"), _dec5 = (0, _decorators.default)("duration"), _dec6 = (0, _decorators.default)("selectedInterval", "duration"), (_obj = {
    tagName: "",
    selectedInterval: "mins",
    durationMinutes: null,
    durationHours: null,
    duration: null,
    hiddenIntervals: null,
    cloneDuration() {
      const usesHours = Object.hasOwn(this.attrs, "durationHours");
      const usesMinutes = Object.hasOwn(this.attrs, "durationMinutes");
      if (usesHours && usesMinutes) {
        throw new Error("relative-time needs initial duration in hours OR minutes, both are not supported");
      }
      if (usesHours) {
        this._setInitialDurationFromHours(this.durationHours);
      } else {
        this._setInitialDurationFromMinutes(this.durationMinutes);
      }
    },
    setHiddenIntervals() {
      this.hiddenIntervals = this.hiddenIntervals || [];
    },
    _roundedDuration(duration) {
      let rounded = parseFloat(duration.toFixed(2));

      // showing 2.00 instead of just 2 in the input is weird
      if (rounded % 1 === 0) {
        return parseInt(rounded, 10);
      }
      return rounded;
    },
    _setInitialDurationFromHours(hours) {
      if (hours === null) {
        this.setProperties({
          duration: hours,
          selectedInterval: "hours"
        });
      } else if (hours >= 8760) {
        this.setProperties({
          duration: this._roundedDuration(hours / 365 / 24),
          selectedInterval: "years"
        });
      } else if (hours >= 730) {
        this.setProperties({
          duration: this._roundedDuration(hours / 30 / 24),
          selectedInterval: "months"
        });
      } else if (hours >= 24) {
        this.setProperties({
          duration: this._roundedDuration(hours / 24),
          selectedInterval: "days"
        });
      } else if (hours < 1) {
        this.setProperties({
          duration: this._roundedDuration(hours * 60),
          selectedInterval: "mins"
        });
      } else {
        this.setProperties({
          duration: hours,
          selectedInterval: "hours"
        });
      }
    },
    _setInitialDurationFromMinutes(mins) {
      if (mins >= 525600) {
        this.setProperties({
          duration: this._roundedDuration(mins / 365 / 60 / 24),
          selectedInterval: "years"
        });
      } else if (mins >= 43800) {
        this.setProperties({
          duration: this._roundedDuration(mins / 30 / 60 / 24),
          selectedInterval: "months"
        });
      } else if (mins >= 1440) {
        this.setProperties({
          duration: this._roundedDuration(mins / 60 / 24),
          selectedInterval: "days"
        });
      } else if (mins >= 60) {
        this.setProperties({
          duration: this._roundedDuration(mins / 60),
          selectedInterval: "hours"
        });
      } else {
        this.setProperties({
          duration: mins,
          selectedInterval: "mins"
        });
      }
    },
    durationMin(selectedInterval) {
      return selectedInterval === "mins" ? 1 : 0.1;
    },
    durationStep(selectedInterval) {
      return selectedInterval === "mins" ? 1 : 0.05;
    },
    intervals(duration) {
      const count = duration ? parseFloat(duration) : 0;
      return [{
        id: "mins",
        name: _I18n.default.t("relative_time_picker.minutes", {
          count
        })
      }, {
        id: "hours",
        name: _I18n.default.t("relative_time_picker.hours", {
          count
        })
      }, {
        id: "days",
        name: _I18n.default.t("relative_time_picker.days", {
          count
        })
      }, {
        id: "months",
        name: _I18n.default.t("relative_time_picker.months", {
          count
        })
      }, {
        id: "years",
        name: _I18n.default.t("relative_time_picker.years", {
          count
        })
      }].filter(interval => !this.hiddenIntervals.includes(interval.id));
    },
    calculatedMinutes(interval, duration) {
      if ((0, _utils.isBlank)(duration)) {
        return null;
      }
      duration = parseFloat(duration);
      let mins = 0;
      switch (interval) {
        case "mins":
          // we round up here in case the user manually inputted a step < 1
          mins = Math.ceil(duration);
          break;
        case "hours":
          mins = duration * 60;
          break;
        case "days":
          mins = duration * 60 * 24;
          break;
        case "months":
          mins = duration * 60 * 24 * 30; // less accurate because of varying days in months
          break;
        case "years":
          mins = duration * 60 * 24 * 365; // least accurate because of varying days in months/years
          break;
      }
      return mins;
    },
    onChangeInterval(newInterval) {
      this.set("selectedInterval", newInterval);
      if (this.onChange) {
        this.onChange(this.calculatedMinutes);
      }
    },
    onChangeDuration() {
      if (this.onChange) {
        this.onChange(this.calculatedMinutes);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "cloneDuration", [_dec], Object.getOwnPropertyDescriptor(_obj, "cloneDuration"), _obj), _applyDecoratedDescriptor(_obj, "setHiddenIntervals", [_dec2], Object.getOwnPropertyDescriptor(_obj, "setHiddenIntervals"), _obj), _applyDecoratedDescriptor(_obj, "durationMin", [_dec3], Object.getOwnPropertyDescriptor(_obj, "durationMin"), _obj), _applyDecoratedDescriptor(_obj, "durationStep", [_dec4], Object.getOwnPropertyDescriptor(_obj, "durationStep"), _obj), _applyDecoratedDescriptor(_obj, "intervals", [_dec5], Object.getOwnPropertyDescriptor(_obj, "intervals"), _obj), _applyDecoratedDescriptor(_obj, "calculatedMinutes", [_dec6], Object.getOwnPropertyDescriptor(_obj, "calculatedMinutes"), _obj), _applyDecoratedDescriptor(_obj, "onChangeInterval", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeInterval"), _obj), _applyDecoratedDescriptor(_obj, "onChangeDuration", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeDuration"), _obj)), _obj))));
  _exports.default = _default;
});