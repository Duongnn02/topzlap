define("select-kit/components/form-template-chooser", ["exports", "select-kit/components/multi-select", "admin/models/form-template", "@ember/object"], function (_exports, _multiSelect, _formTemplate, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/multi-select",0,"admin/models/form-template",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _multiSelect.default.extend((_dec = (0, _object.computed)("templates"), (_obj = {
    pluginApiIdentifiers: ["form-template-chooser"],
    classNames: ["form-template-chooser"],
    selectKitOptions: {
      none: "admin.form_templates.edit_category.select_template"
    },
    init() {
      this._super(...arguments);
      if (!this.templates) {
        this._fetchTemplates();
      }
    },
    get content() {
      if (!this.templates) {
        return this._fetchTemplates();
      }
      return this.templates;
    },
    _fetchTemplates() {
      _formTemplate.default.findAll().then(result => {
        const sortedTemplates = this._sortTemplatesByName(result);
        if (sortedTemplates.length > 0) {
          return this.set("templates", sortedTemplates);
        } else {
          this.set("templates", sortedTemplates);
          this.set("selectKit.options.disabled", true);
        }
      });
    },
    _sortTemplatesByName(templates) {
      return templates.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, (_applyDecoratedDescriptor(_obj, "content", [_dec], Object.getOwnPropertyDescriptor(_obj, "content"), _obj)), _obj)));
  _exports.default = _default;
});