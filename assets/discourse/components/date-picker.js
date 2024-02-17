define("discourse/components/date-picker", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "discourse/lib/load-script", "@ember/runloop"], function (_exports, _component, _templateFactory, _decorators, _I18n, _loadScript, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"discourse/lib/load-script",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Input
    @type={{this.inputType}}
    class="date-picker"
    placeholder={{this.placeholder}}
    @value={{this.value}}
    autocomplete="off"
  />
  */
  {
    "id": "kT0NJodg",
    "block": "[[[8,[39,0],[[24,0,\"date-picker\"],[16,\"placeholder\",[30,0,[\"placeholder\"]]],[24,\"autocomplete\",\"off\"]],[[\"@type\",\"@value\"],[[30,0,[\"inputType\"]],[30,0,[\"value\"]]]],null]],[],false,[\"input\"]]",
    "moduleName": "discourse/components/date-picker.hbs",
    "isStrictMode": false
  });

  /* global Pikaday:true */

  const DATE_FORMAT = "YYYY-MM-DD";
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("site.mobileView"), _dec2 = (0, _decorators.on)("didInsertElement"), _dec3 = (0, _decorators.on)("willDestroyElement"), _dec4 = (0, _decorators.default)(), (_obj = {
    classNames: ["date-picker-wrapper"],
    _picker: null,
    value: null,
    inputType(mobileView) {
      return mobileView ? "date" : "text";
    },
    _loadDatePicker() {
      if (this.site.mobileView) {
        this._loadNativePicker();
      } else {
        const container = document.getElementById(this.containerId);
        this._loadPikadayPicker(container);
      }
    },
    _loadPikadayPicker(container) {
      (0, _loadScript.default)("/javascripts/pikaday.js").then(() => {
        (0, _runloop.schedule)("afterRender", () => {
          const options = {
            field: this.element.querySelector(".date-picker"),
            container: container || null,
            bound: container === null,
            format: DATE_FORMAT,
            firstDay: 1,
            i18n: {
              previousMonth: _I18n.default.t("dates.previous_month"),
              nextMonth: _I18n.default.t("dates.next_month"),
              months: moment.months(),
              weekdays: moment.weekdays(),
              weekdaysShort: moment.weekdaysMin()
            },
            onSelect: date => this._handleSelection(date)
          };
          this._picker = new Pikaday(Object.assign(options, this._opts()));
        });
      });
    },
    _loadNativePicker() {
      const picker = this.element.querySelector("input.date-picker");
      picker.onchange = () => this._handleSelection(picker.value);
      picker.hide = () => {
        /* do nothing for native */
      };
      picker.destroy = () => {
        /* do nothing for native */
      };
      this._picker = picker;
    },
    _handleSelection(value) {
      const formattedDate = moment(value).format(DATE_FORMAT);
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      if (this.onSelect) {
        this.onSelect(formattedDate);
      }
    },
    _destroy() {
      if (this._picker) {
        this._picker.destroy();
        this._picker = null;
      }
    },
    placeholder() {
      return _I18n.default.t("dates.placeholder");
    },
    _opts() {
      return null;
    }
  }, (_applyDecoratedDescriptor(_obj, "inputType", [_dec], Object.getOwnPropertyDescriptor(_obj, "inputType"), _obj), _applyDecoratedDescriptor(_obj, "_loadDatePicker", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_loadDatePicker"), _obj), _applyDecoratedDescriptor(_obj, "_destroy", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_destroy"), _obj), _applyDecoratedDescriptor(_obj, "placeholder", [_dec4], Object.getOwnPropertyDescriptor(_obj, "placeholder"), _obj)), _obj))));
  _exports.default = _default;
});