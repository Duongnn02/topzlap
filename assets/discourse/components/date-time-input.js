define("discourse/components/date-time-input", ["exports", "@ember/component", "@ember/template-factory", "@ember/object"], function (_exports, _component, _templateFactory, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/component"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.timeFirst}}
    <DateInput
      @date={{this.date}}
      @placeholder={{this.placeholder}}
      @relativeDate={{this.relativeDate}}
      @onChange={{action "onChangeDate"}}
      @useGlobalPickerContainer={{this.useGlobalPickerContainer}}
    />
  {{/unless}}
  
  {{#if this.showTime}}
    <TimeInput
      @date={{this.date}}
      @relativeDate={{this.relativeDate}}
      @onChange={{action "onChangeTime"}}
    />
  {{/if}}
  
  {{#if this.timeFirst}}
    <DateInput
      @date={{this.date}}
      @placeholder={{this.placeholder}}
      @relativeDate={{this.relativeDate}}
      @onChange={{action "onChangeDate"}}
      @useGlobalPickerContainer={{this.useGlobalPickerContainer}}
    />
  {{/if}}
  
  {{#if this.clearable}}
    <DButton
      @class="btn-default clear-date-time"
      @icon="times"
      @action={{action "onClear"}}
    />
  {{/if}}
  */
  {
    "id": "po7ciQSt",
    "block": "[[[41,[51,[30,0,[\"timeFirst\"]]],[[[1,\"  \"],[8,[39,1],null,[[\"@date\",\"@placeholder\",\"@relativeDate\",\"@onChange\",\"@useGlobalPickerContainer\"],[[30,0,[\"date\"]],[30,0,[\"placeholder\"]],[30,0,[\"relativeDate\"]],[28,[37,2],[[30,0],\"onChangeDate\"],null],[30,0,[\"useGlobalPickerContainer\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showTime\"]],[[[1,\"  \"],[8,[39,4],null,[[\"@date\",\"@relativeDate\",\"@onChange\"],[[30,0,[\"date\"]],[30,0,[\"relativeDate\"]],[28,[37,2],[[30,0],\"onChangeTime\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"timeFirst\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@date\",\"@placeholder\",\"@relativeDate\",\"@onChange\",\"@useGlobalPickerContainer\"],[[30,0,[\"date\"]],[30,0,[\"placeholder\"]],[30,0,[\"relativeDate\"]],[28,[37,2],[[30,0],\"onChangeDate\"],null],[30,0,[\"useGlobalPickerContainer\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"clearable\"]],[[[1,\"  \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\"],[\"btn-default clear-date-time\",\"times\",[28,[37,2],[[30,0],\"onClear\"],null]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"unless\",\"date-input\",\"action\",\"if\",\"time-input\",\"d-button\"]]",
    "moduleName": "discourse/components/date-time-input.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    classNames: ["d-date-time-input"],
    date: null,
    relativeDate: null,
    showTime: true,
    clearable: false,
    hours: (0, _object.computed)("date", "showTime", function () {
      return this.date && this.get("showTime") ? this.date.hours() : null;
    }),
    minutes: (0, _object.computed)("date", "showTime", function () {
      return this.date && this.get("showTime") ? this.date.minutes() : null;
    }),
    onClear() {
      this.onChange(null);
    },
    onChangeTime(time) {
      if (this.onChange) {
        const date = this.date ? this.date : this.relativeDate ? this.relativeDate : moment.tz(this.resolvedTimezone);
        this.onChange(moment.tz({
          year: date.year(),
          month: date.month(),
          day: date.date(),
          hours: time.hours,
          minutes: time.minutes
        }, this.resolvedTimezone));
      }
    },
    onChangeDate(date) {
      if (!date) {
        this.onClear();
        return;
      }
      this.onChange?.(moment.tz({
        year: date.year(),
        month: date.month(),
        day: date.date(),
        hours: this.hours || 0,
        minutes: this.minutes || 0
      }, this.resolvedTimezone));
    },
    get resolvedTimezone() {
      return this.timezone || moment.tz.guess();
    }
  }, (_applyDecoratedDescriptor(_obj, "onClear", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onClear"), _obj), _applyDecoratedDescriptor(_obj, "onChangeTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeTime"), _obj), _applyDecoratedDescriptor(_obj, "onChangeDate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeDate"), _obj), _applyDecoratedDescriptor(_obj, "resolvedTimezone", [_object.computed], Object.getOwnPropertyDescriptor(_obj, "resolvedTimezone"), _obj)), _obj)));
  _exports.default = _default;
});