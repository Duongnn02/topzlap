define("discourse/components/date-time-input-range", ["exports", "@ember/component", "@ember/template-factory", "@ember/object"], function (_exports, _component, _templateFactory, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DateTimeInput
    @date={{this.from}}
    @onChange={{action "onChangeRanges" (hash prop="from")}}
    @showTime={{this.showFromTime}}
    @class="from"
    @placeholder={{i18n "dates.from_placeholder"}}
    @timezone={{@timezone}}
  />
  
  <DateTimeInput
    @date={{this.to}}
    @relativeDate={{this.from}}
    @onChange={{action "onChangeRanges" (hash prop="to")}}
    @timeFirst={{this.toTimeFirst}}
    @showTime={{this.showToTime}}
    @clearable={{this.clearable}}
    @class="to"
    @placeholder={{i18n "dates.to_placeholder"}}
    @timezone={{@timezone}}
  />
  */
  {
    "id": "yd3SyU/2",
    "block": "[[[8,[39,0],null,[[\"@date\",\"@onChange\",\"@showTime\",\"@class\",\"@placeholder\",\"@timezone\"],[[30,0,[\"from\"]],[28,[37,1],[[30,0],\"onChangeRanges\",[28,[37,2],null,[[\"prop\"],[\"from\"]]]],null],[30,0,[\"showFromTime\"]],\"from\",[28,[37,3],[\"dates.from_placeholder\"],null],[30,1]]],null],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@date\",\"@relativeDate\",\"@onChange\",\"@timeFirst\",\"@showTime\",\"@clearable\",\"@class\",\"@placeholder\",\"@timezone\"],[[30,0,[\"to\"]],[30,0,[\"from\"]],[28,[37,1],[[30,0],\"onChangeRanges\",[28,[37,2],null,[[\"prop\"],[\"to\"]]]],null],[30,0,[\"toTimeFirst\"]],[30,0,[\"showToTime\"]],[30,0,[\"clearable\"]],\"to\",[28,[37,3],[\"dates.to_placeholder\"],null],[30,1]]],null]],[\"@timezone\"],false,[\"date-time-input\",\"action\",\"hash\",\"i18n\"]]",
    "moduleName": "discourse/components/date-time-input-range.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    classNames: ["d-date-time-input-range"],
    from: null,
    to: null,
    onChangeTo: null,
    onChangeFrom: null,
    toTimeFirst: false,
    showToTime: true,
    showFromTime: true,
    clearable: false,
    onChangeRanges(options, value) {
      if (this.onChange) {
        const state = {
          from: this.from,
          to: this.to
        };
        const diff = {};
        if (options.prop === "from") {
          if (this.to && value?.isAfter(this.to)) {
            diff[options.prop] = value;
            diff["to"] = value.clone().add(1, "hour");
          } else {
            diff[options.prop] = value;
          }
        }
        if (options.prop === "to") {
          if (value && value.isBefore(this.from)) {
            diff[options.prop] = this.from.clone().add(1, "hour");
          } else {
            diff[options.prop] = value;
          }
        }
        const newState = Object.assign({}, state, diff);
        this.onChange(newState);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onChangeRanges", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeRanges"), _obj)), _obj)));
  _exports.default = _default;
});