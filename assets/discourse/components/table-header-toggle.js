define("discourse/components/table-header-toggle", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/lib/icon-library", "@ember/template", "@ember/runloop", "discourse-common/utils/decorators", "I18n"], function (_exports, _component, _templateFactory, _iconLibrary, _template, _runloop, _decorators, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/lib/icon-library",0,"@ember/template",0,"@ember/runloop",0,"discourse-common/utils/decorators",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class="header-contents"
    id={{this.id}}
    role="button"
    tabindex="0"
    aria-label={{this.ariaLabel}}
    aria-pressed={{this.pressedState}}
  >
  
    {{yield}}
    <span class="text">
      {{directory-table-header-title
        field=this.field
        labelKey=this.labelKey
        icon=this.icon
        translated=this.translated
      }}
      {{this.chevronIcon}}
    </span>
  </div>
  */
  {
    "id": "mJT5cJoN",
    "block": "[[[10,0],[14,0,\"header-contents\"],[15,1,[30,0,[\"id\"]]],[14,\"role\",\"button\"],[14,\"tabindex\",\"0\"],[15,\"aria-label\",[30,0,[\"ariaLabel\"]]],[15,\"aria-pressed\",[30,0,[\"pressedState\"]]],[12],[1,\"\\n\\n  \"],[18,1,null],[1,\"\\n  \"],[10,1],[14,0,\"text\"],[12],[1,\"\\n    \"],[1,[28,[35,1],null,[[\"field\",\"labelKey\",\"icon\",\"translated\"],[[30,0,[\"field\"]],[30,0,[\"labelKey\"]],[30,0,[\"icon\"]],[30,0,[\"translated\"]]]]]],[1,\"\\n    \"],[1,[30,0,[\"chevronIcon\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"yield\",\"directory-table-header-title\"]]",
    "moduleName": "discourse/components/table-header-toggle.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("order", "field", "asc"), (_obj = {
    tagName: "div",
    classNames: ["directory-table__column-header", "sortable"],
    attributeBindings: ["title", "colspan", "ariaSort:aria-sort", "role"],
    role: "columnheader",
    labelKey: null,
    chevronIcon: null,
    columnIcon: null,
    translated: false,
    automatic: false,
    onActiveRender: null,
    pressedState: null,
    ariaLabel: null,
    ariaSort() {
      if (this.order === this.field) {
        return this.asc ? "ascending" : "descending";
      } else {
        return "none";
      }
    },
    toggleProperties() {
      if (this.order === this.field) {
        this.set("asc", this.asc ? null : true);
      } else {
        this.setProperties({
          order: this.field,
          asc: null
        });
      }
    },
    toggleChevron() {
      if (this.order === this.field) {
        let chevron = (0, _iconLibrary.iconHTML)(this.asc ? "chevron-up" : "chevron-down");
        this.set("chevronIcon", (0, _template.htmlSafe)(`${chevron}`));
      } else {
        this.set("chevronIcon", null);
      }
    },
    click() {
      this.toggleProperties();
    },
    keyPress(e) {
      if (e.which === 13) {
        this.toggleProperties();
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      if (!this.automatic && !this.translated) {
        this.set("labelKey", this.field);
      }
      this.set("id", `table-header-toggle-${this.field.replace(/\s/g, "")}`);
      this.toggleChevron();
      this._updateA11yAttributes();
    },
    didRender() {
      if (this.onActiveRender && this.chevronIcon) {
        this.onActiveRender(this.element);
      }
    },
    _updateA11yAttributes() {
      let criteria = "";
      const pressed = this.order === this.field;
      if (this.icon === "heart") {
        criteria += `${_I18n.default.t("likes_lowercase", {
          count: 2
        })} `;
      }
      if (this.translated) {
        criteria += this.field;
      } else {
        const labelKey = this.labelKey || `directory.${this.field}`;
        criteria += _I18n.default.t(labelKey + "_long", {
          defaultValue: _I18n.default.t(labelKey)
        });
      }
      this.set("ariaLabel", _I18n.default.t("directory.sort.label", {
        criteria
      }));
      if (pressed) {
        if (this.asc) {
          this.set("pressedState", "mixed");
        } else {
          this.set("pressedState", "true");
        }
        this._focusHeader();
      } else {
        this.set("pressedState", "false");
      }
    },
    _focusHeader() {
      (0, _runloop.schedule)("afterRender", () => {
        document.getElementById(this.id)?.focus();
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "ariaSort", [_dec], Object.getOwnPropertyDescriptor(_obj, "ariaSort"), _obj)), _obj))));
  _exports.default = _default;
});