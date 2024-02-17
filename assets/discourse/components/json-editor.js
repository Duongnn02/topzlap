define("discourse/components/json-editor", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "virtual-dom", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "discourse/lib/load-script", "@ember/runloop"], function (_exports, _component, _templateFactory, _object, _virtualDom, _decorators, _iconLibrary, _loadScript, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/component",0,"virtual-dom",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"discourse/lib/load-script",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @rawTitle={{i18n
      "admin.site_settings.json_schema.modal_title"
      name=this.settingName
    }}
  >
    <div id="json-editor-holder"></div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "saveChanges"}}
      @label="save"
    />
  </div>
  */
  {
    "id": "EYnfabHP",
    "block": "[[[8,[39,0],null,[[\"@rawTitle\"],[[28,[37,1],[\"admin.site_settings.json_schema.modal_title\"],[[\"name\"],[[30,0,[\"settingName\"]]]]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,1,\"json-editor-holder\"],[12],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,3],[[30,0],\"saveChanges\"],null],\"save\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/json-editor.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.settingName"), (_obj = {
    className: "json-editor-holder",
    editor: null,
    saveChangesCallback: null,
    didInsertElement() {
      this._super(...arguments);
      (0, _loadScript.default)("/javascripts/jsoneditor.js").then(() => {
        (0, _runloop.schedule)("afterRender", () => {
          let {
            JSONEditor
          } = window;
          JSONEditor.defaults.options.theme = "bootstrap4";
          JSONEditor.defaults.iconlibs = {
            discourseIcons: DiscourseJsonSchemaEditorIconlib
          };
          JSONEditor.defaults.options.iconlib = "discourseIcons";
          const el = document.querySelector("#json-editor-holder");
          this.editor = new JSONEditor(el, {
            schema: this.model.jsonSchema,
            disable_array_delete_all_rows: true,
            disable_array_delete_last_row: true,
            disable_array_reorder: false,
            disable_array_copy: false,
            enable_array_copy: true,
            disable_edit_json: true,
            disable_properties: true,
            disable_collapse: false,
            remove_button_labels: true,
            show_errors: "never",
            startval: this.model.value ? JSON.parse(this.model.value) : null
          });
        });
      });
    },
    settingName(name) {
      return name.replace(/\_/g, " ");
    },
    saveChanges() {
      const errors = this.editor.validate();
      if (!errors.length) {
        const fieldValue = JSON.stringify(this.editor.getValue());
        this.saveChangesCallback(fieldValue);
      } else {
        this.appEvents.trigger("modal-body:flash", {
          text: errors.mapBy("message").join("\n"),
          messageClass: "error"
        });
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this.editor?.destroy();
    }
  }, (_applyDecoratedDescriptor(_obj, "settingName", [_dec], Object.getOwnPropertyDescriptor(_obj, "settingName"), _obj), _applyDecoratedDescriptor(_obj, "saveChanges", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveChanges"), _obj)), _obj))));
  _exports.default = _default;
  class DiscourseJsonSchemaEditorIconlib {
    constructor() {
      this.mapping = {
        delete: "trash-alt",
        add: "plus",
        moveup: "arrow-up",
        movedown: "arrow-down",
        copy: "copy",
        collapse: "chevron-down",
        expand: "chevron-up"
      };
    }
    getIcon(key) {
      if (!this.mapping[key]) {
        return;
      }
      return (0, _virtualDom.create)((0, _iconLibrary.iconNode)(this.mapping[key]));
    }
  }
});