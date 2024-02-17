define("discourse/components/groups-form-profile-fields", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object", "discourse/models/group", "I18n", "discourse-common/lib/debounce", "@ember/utils", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _component, _templateFactory, _decorators, _object, _group, _I18n, _debounce, _utils, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"discourse/models/group",0,"I18n",0,"discourse-common/lib/debounce",0,"@ember/utils",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canEdit}}
    {{#if this.currentUser.can_create_group}}
      <div class="control-group">
        <label class="control-label" for="name">{{i18n "groups.name"}}</label>
  
        <TextField
          @name="name"
          @class="input-xxlarge group-form-name"
          @value={{this.nameInput}}
          @placeholderKey="admin.groups.name_placeholder"
        />
  
        <InputTip @validation={{this.nameValidation}} />
      </div>
    {{/if}}
  
    <div class="control-group">
      <label class="control-label" for="full_name">{{i18n
          "groups.manage.full_name"
        }}</label>
  
      <TextField
        @name="full_name"
        @class="input-xxlarge group-form-full-name"
        @value={{this.model.full_name}}
      />
    </div>
  {{/if}}
  
  <div class="control-group">
    <label class="control-label" for="bio">{{i18n "groups.bio"}}</label>
    <DEditor
      @value={{this.model.bio_raw}}
      @class="group-form-bio input-xxlarge"
    />
  </div>
  
  {{#if this.model.automatic}}
    <div class="control-group">
      <GroupFlairInputs @model={{this.model}} />
    </div>
  {{/if}}
  
  {{#if this.canEdit}}
    {{yield}}
  
    <span>
      <PluginOutlet
        @name="group-edit"
        @connectorTagName="div"
        @outletArgs={{hash group=this.model}}
      />
    </span>
  {{/if}}
  */
  {
    "id": "C65S5baD",
    "block": "[[[41,[30,0,[\"canEdit\"]],[[[41,[30,0,[\"currentUser\",\"can_create_group\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"name\"],[12],[1,[28,[35,1],[\"groups.name\"],null]],[13],[1,\"\\n\\n      \"],[8,[39,2],null,[[\"@name\",\"@class\",\"@value\",\"@placeholderKey\"],[\"name\",\"input-xxlarge group-form-name\",[30,0,[\"nameInput\"]],\"admin.groups.name_placeholder\"]],null],[1,\"\\n\\n      \"],[8,[39,3],null,[[\"@validation\"],[[30,0,[\"nameValidation\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"full_name\"],[12],[1,[28,[35,1],[\"groups.manage.full_name\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@name\",\"@class\",\"@value\"],[\"full_name\",\"input-xxlarge group-form-full-name\",[30,0,[\"model\",\"full_name\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"bio\"],[12],[1,[28,[35,1],[\"groups.bio\"],null]],[13],[1,\"\\n  \"],[8,[39,4],null,[[\"@value\",\"@class\"],[[30,0,[\"model\",\"bio_raw\"]],\"group-form-bio input-xxlarge\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"automatic\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canEdit\"]],[[[1,\"  \"],[18,1,null],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"group-edit\",\"div\",[28,[37,8],null,[[\"group\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"if\",\"i18n\",\"text-field\",\"input-tip\",\"d-editor\",\"group-flair-inputs\",\"yield\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/groups-form-profile-fields.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("basicNameValidation", "uniqueNameValidation"), _dec2 = (0, _decorators.observes)("nameInput"), (_obj = {
    disableSave: null,
    nameInput: null,
    didInsertElement() {
      this._super(...arguments);
      const name = this.get("model.name");
      if (name) {
        this.set("nameInput", name);
      } else {
        this.set("disableSave", true);
      }
    },
    canEdit: (0, _computed.not)("model.automatic"),
    nameValidation(basicNameValidation, uniqueNameValidation) {
      return uniqueNameValidation ? uniqueNameValidation : basicNameValidation;
    },
    _validateName() {
      if (this.nameInput === this.get("model.name")) {
        return;
      }
      if (this.nameInput === undefined) {
        return this._failedInputValidation();
      }
      if (this.nameInput === "") {
        this.set("uniqueNameValidation", null);
        return this._failedInputValidation(_I18n.default.t("admin.groups.new.name.blank"));
      }
      if (this.nameInput.length < this.siteSettings.min_username_length) {
        return this._failedInputValidation(_I18n.default.t("admin.groups.new.name.too_short"));
      }
      if (this.nameInput.length > this.siteSettings.max_username_length) {
        return this._failedInputValidation(_I18n.default.t("admin.groups.new.name.too_long"));
      }
      this.checkGroupNameDebounced();
      return this._failedInputValidation(_I18n.default.t("admin.groups.new.name.checking"));
    },
    checkGroupNameDebounced() {
      (0, _debounce.default)(this, this._checkGroupName, 500);
    },
    _checkGroupName() {
      if ((0, _utils.isEmpty)(this.nameInput)) {
        return;
      }
      _group.default.checkName(this.nameInput).then(response => {
        const validationName = "uniqueNameValidation";
        if (response.available) {
          this.set(validationName, _object.default.create({
            ok: true,
            reason: _I18n.default.t("admin.groups.new.name.available")
          }));
          this.set("disableSave", false);
          this.set("model.name", this.nameInput);
        } else {
          let reason;
          if (response.errors) {
            reason = response.errors.join(" ");
          } else {
            reason = _I18n.default.t("admin.groups.new.name.not_available");
          }
          this.set(validationName, this._failedInputValidation(reason));
        }
      }).catch(_ajaxError.popupAjaxError);
    },
    _failedInputValidation(reason) {
      this.set("disableSave", true);
      const options = {
        failed: true
      };
      if (reason) {
        options.reason = reason;
      }
      this.set("basicNameValidation", _object.default.create(options));
    }
  }, (_applyDecoratedDescriptor(_obj, "nameValidation", [_dec], Object.getOwnPropertyDescriptor(_obj, "nameValidation"), _obj), _applyDecoratedDescriptor(_obj, "_validateName", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_validateName"), _obj)), _obj))));
  _exports.default = _default;
});