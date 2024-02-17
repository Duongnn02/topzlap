define("discourse/components/date-input", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "rsvp", "@ember/object", "discourse/lib/load-script", "@ember/runloop"], function (_exports, _component, _templateFactory, _decorators, _I18n, _rsvp, _object, _loadScript, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"rsvp",0,"@ember/object",0,"discourse/lib/load-script",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Input
    @type={{this.inputType}}
    class="date-picker"
    placeholder={{this.placeholder}}
    @value={{readonly this.value}}
    id={{this.inputId}}
    {{on "input" (action "onChangeDate")}}
  />
  
  {{#unless this.useGlobalPickerContainer}}
    <div class="picker-container"></div>
  {{/unless}}
  */
  {
    "id": "1XRLewO+",
    "block": "[[[8,[39,0],[[24,0,\"date-picker\"],[16,\"placeholder\",[30,0,[\"placeholder\"]]],[16,1,[30,0,[\"inputId\"]]],[4,[38,2],[\"input\",[28,[37,3],[[30,0],\"onChangeDate\"],null]],null]],[[\"@type\",\"@value\"],[[30,0,[\"inputType\"]],[28,[37,1],[[30,0,[\"value\"]]],null]]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"useGlobalPickerContainer\"]]],[[[1,\"  \"],[10,0],[14,0,\"picker-container\"],[12],[13],[1,\"\\n\"]],[]],null]],[],false,[\"input\",\"readonly\",\"on\",\"action\",\"unless\"]]",
    "moduleName": "discourse/components/date-input.hbs",
    "isStrictMode": false
  });
  /* global Pikaday:true */

  function isInputDateSupported() {
    const input = document.createElement("input");
    const value = "a";
    input.setAttribute("type", "date");
    input.setAttribute("value", value);
    return input.value !== value;
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("site.mobileView"), _dec2 = (0, _decorators.on)("willDestroyElement"), _dec3 = (0, _decorators.default)("_placeholder"), (_obj = {
    classNames: ["d-date-input"],
    date: null,
    _picker: null,
    inputType() {
      return this.useNativePicker ? "date" : "text";
    },
    useNativePicker: isInputDateSupported(),
    click(event) {
      event.stopPropagation();
    },
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        if (!this.element || this.isDestroying || this.isDestroying) {
          return;
        }
        let promise;
        const container = document.getElementById(this.containerId);
        if (this.useNativePicker) {
          promise = this._loadNativePicker(container);
        } else {
          promise = this._loadPikadayPicker(container);
        }
        promise.then(picker => {
          this._picker = picker;
          if (this._picker && this.date) {
            const parsedDate = this.date instanceof moment ? this.date : moment(this.date);
            this._picker.setDate(parsedDate.toDate(), true);
          }
        });
      });
    },
    didUpdateAttrs() {
      this._super(...arguments);
      if (this._picker && this.date) {
        const parsedDate = this.date instanceof moment ? this.date : moment(this.date);
        this._picker.setDate(parsedDate.toDate(), true);
      }
      if (this._picker && this.relativeDate) {
        const parsedRelativeDate = this.relativeDate instanceof moment ? this.relativeDate : moment(this.relativeDate);
        this._picker.setMinDate(parsedRelativeDate.toDate(), true);
      }
      if (this._picker && !this.date) {
        this._picker.setDate(null);
      }
    },
    _loadPikadayPicker(container) {
      return (0, _loadScript.default)("/javascripts/pikaday.js").then(() => {
        let defaultOptions = {
          field: this.element.querySelector(".date-picker"),
          container: container || this.element.querySelector(".picker-container"),
          bound: container === null,
          format: "LL",
          firstDay: 1,
          i18n: {
            previousMonth: _I18n.default.t("dates.previous_month"),
            nextMonth: _I18n.default.t("dates.next_month"),
            months: moment.months(),
            weekdays: moment.weekdays(),
            weekdaysShort: moment.weekdaysShort()
          },
          onSelect: date => this._handleSelection(date)
        };
        if (this.relativeDate) {
          defaultOptions = Object.assign({}, defaultOptions, {
            minDate: moment(this.relativeDate).toDate()
          });
        }
        return new Pikaday(Object.assign({}, defaultOptions, this._opts()));
      });
    },
    _loadNativePicker(container) {
      const wrapper = container || this.element;
      const picker = wrapper.querySelector("input.date-picker");
      picker.onchange = () => this._handleSelection(picker.value);
      picker.hide = () => {
        /* do nothing for native */
      };
      picker.destroy = () => {
        /* do nothing for native */
      };
      picker.setDate = date => {
        picker.value = date ? moment(date).format("YYYY-MM-DD") : null;
      };
      picker.setMinDate = date => {
        picker.min = date;
      };
      if (this.date) {
        picker.setDate(this.date);
      }
      return _rsvp.Promise.resolve(picker);
    },
    _handleSelection(value) {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      if (this.onChange) {
        this.onChange(value ? moment(value) : null);
      }
    },
    _destroy() {
      if (this._picker) {
        this._picker.destroy();
        this._picker = null;
      }
    },
    placeholder: {
      get(_placeholder) {
        return _placeholder || _I18n.default.t("dates.placeholder");
      },
      set(value) {
        this.set("_placeholder", value);
        return value;
      }
    },
    _opts() {
      return null;
    },
    onChangeDate(event) {
      this._handleSelection(event.target.value);
    }
  }, (_applyDecoratedDescriptor(_obj, "inputType", [_dec], Object.getOwnPropertyDescriptor(_obj, "inputType"), _obj), _applyDecoratedDescriptor(_obj, "_destroy", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_destroy"), _obj), _applyDecoratedDescriptor(_obj, "placeholder", [_dec3], (_init = Object.getOwnPropertyDescriptor(_obj, "placeholder"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "onChangeDate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeDate"), _obj)), _obj))));
  _exports.default = _default;
});