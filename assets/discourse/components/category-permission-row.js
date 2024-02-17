define("discourse/components/category-permission-row", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "I18n", "discourse/models/permission-type"], function (_exports, _component, _templateFactory, _object, _computed, _decorators, _I18n, _permissionType) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"discourse/models/permission-type"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span class="group-name">
    <span class="group-name-label">{{this.group_name}}</span>
    <a class="remove-permission" href {{on "click" this.removeRow}}>
      {{d-icon "far-trash-alt"}}
    </a>
  </span>
  <span class="options actionable">
    <DButton @icon="check-square" @class="btn btn-flat see" @disabled={{true}} />
  
    <DButton
      @icon={{this.canReplyIcon}}
      @action={{action "setPermissionReply"}}
      @translatedTitle={{this.replyTooltip}}
      @class={{concat "btn btn-flat reply-toggle " this.replyGranted}}
      @disabled={{this.replyDisabled}}
    />
  
    <DButton
      @icon={{this.canCreateIcon}}
      @action={{action "setPermissionFull"}}
      @translatedTitle={{this.createTooltip}}
      @class={{concat "btn btn-flat create-toggle " this.createGranted}}
      @disabled={{this.createDisabled}}
    />
  </span>
  */
  {
    "id": "i7pSAw7L",
    "block": "[[[10,1],[14,0,\"group-name\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"group-name-label\"],[12],[1,[30,0,[\"group_name\"]]],[13],[1,\"\\n  \"],[11,3],[24,0,\"remove-permission\"],[24,6,\"\"],[4,[38,0],[\"click\",[30,0,[\"removeRow\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"far-trash-alt\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,1],[14,0,\"options actionable\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@icon\",\"@class\",\"@disabled\"],[\"check-square\",\"btn btn-flat see\",true]],null],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@icon\",\"@action\",\"@translatedTitle\",\"@class\",\"@disabled\"],[[30,0,[\"canReplyIcon\"]],[28,[37,3],[[30,0],\"setPermissionReply\"],null],[30,0,[\"replyTooltip\"]],[28,[37,4],[\"btn btn-flat reply-toggle \",[30,0,[\"replyGranted\"]]],null],[30,0,[\"replyDisabled\"]]]],null],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@icon\",\"@action\",\"@translatedTitle\",\"@class\",\"@disabled\"],[[30,0,[\"canCreateIcon\"]],[28,[37,3],[[30,0],\"setPermissionFull\"],null],[30,0,[\"createTooltip\"]],[28,[37,4],[\"btn btn-flat create-toggle \",[30,0,[\"createGranted\"]]],null],[30,0,[\"createDisabled\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"on\",\"d-icon\",\"d-button\",\"action\",\"concat\"]]",
    "moduleName": "discourse/components/category-permission-row.hbs",
    "isStrictMode": false
  });
  const EVERYONE = "everyone";
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("type"), _dec2 = (0, _decorators.default)("type"), _dec3 = (0, _decorators.default)("type"), _dec4 = (0, _decorators.default)("type"), _dec5 = (0, _decorators.default)("type"), _dec6 = (0, _decorators.observes)("everyonePermissionType"), _dec7 = (0, _decorators.default)("everyonePermissionType", "type"), _dec8 = (0, _decorators.default)("replyDisabled"), _dec9 = (0, _decorators.default)("everyonePermissionType", "type"), _dec10 = (0, _decorators.default)("createDisabled"), (_obj = {
    classNames: ["permission-row", "row-body"],
    canCreate: (0, _computed.equal)("type", _permissionType.default.FULL),
    everyonePermissionType: (0, _computed.alias)("everyonePermission.permission_type"),
    canReply(value) {
      return value === _permissionType.default.CREATE_POST || value === _permissionType.default.FULL;
    },
    canReplyIcon() {
      return this.canReply ? "check-square" : "far-square";
    },
    canCreateIcon() {
      return this.canCreate ? "check-square" : "far-square";
    },
    replyGranted() {
      return this.type <= _permissionType.default.CREATE_POST ? "reply-granted" : "";
    },
    createGranted() {
      return this.type === _permissionType.default.FULL ? "create-granted" : "";
    },
    inheritFromEveryone() {
      if (this.group_name === EVERYONE) {
        return;
      }

      // groups cannot have a lesser permission than "everyone"
      if (this.everyonePermissionType < this.type) {
        this.updatePermission(this.everyonePermissionType);
      }
    },
    replyDisabled(everyonePermissionType) {
      if (this.group_name !== EVERYONE && everyonePermissionType && everyonePermissionType <= _permissionType.default.CREATE_POST) {
        return true;
      }
      return false;
    },
    replyTooltip(replyDisabled) {
      return replyDisabled ? _I18n.default.t("category.permissions.inherited") : _I18n.default.t("category.permissions.toggle_reply");
    },
    createDisabled(everyonePermissionType) {
      if (this.group_name !== EVERYONE && everyonePermissionType && everyonePermissionType === _permissionType.default.FULL) {
        return true;
      }
      return false;
    },
    createTooltip(createDisabled) {
      return createDisabled ? _I18n.default.t("category.permissions.inherited") : _I18n.default.t("category.permissions.toggle_full");
    },
    updatePermission(type) {
      this.category.updatePermission(this.group_name, type);
    },
    removeRow(event) {
      event?.preventDefault();
      this.category.removePermission(this.group_name);
    },
    actions: {
      setPermissionReply() {
        if (this.type <= _permissionType.default.CREATE_POST) {
          this.updatePermission(_permissionType.default.READONLY);
        } else {
          this.updatePermission(_permissionType.default.CREATE_POST);
        }
      },
      setPermissionFull() {
        if (this.group_name !== EVERYONE && this.everyonePermissionType === _permissionType.default.FULL) {
          return;
        }
        if (this.type === _permissionType.default.FULL) {
          this.updatePermission(_permissionType.default.CREATE_POST);
        } else {
          this.updatePermission(_permissionType.default.FULL);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "canReply", [_dec], Object.getOwnPropertyDescriptor(_obj, "canReply"), _obj), _applyDecoratedDescriptor(_obj, "canReplyIcon", [_dec2], Object.getOwnPropertyDescriptor(_obj, "canReplyIcon"), _obj), _applyDecoratedDescriptor(_obj, "canCreateIcon", [_dec3], Object.getOwnPropertyDescriptor(_obj, "canCreateIcon"), _obj), _applyDecoratedDescriptor(_obj, "replyGranted", [_dec4], Object.getOwnPropertyDescriptor(_obj, "replyGranted"), _obj), _applyDecoratedDescriptor(_obj, "createGranted", [_dec5], Object.getOwnPropertyDescriptor(_obj, "createGranted"), _obj), _applyDecoratedDescriptor(_obj, "inheritFromEveryone", [_dec6], Object.getOwnPropertyDescriptor(_obj, "inheritFromEveryone"), _obj), _applyDecoratedDescriptor(_obj, "replyDisabled", [_dec7], Object.getOwnPropertyDescriptor(_obj, "replyDisabled"), _obj), _applyDecoratedDescriptor(_obj, "replyTooltip", [_dec8], Object.getOwnPropertyDescriptor(_obj, "replyTooltip"), _obj), _applyDecoratedDescriptor(_obj, "createDisabled", [_dec9], Object.getOwnPropertyDescriptor(_obj, "createDisabled"), _obj), _applyDecoratedDescriptor(_obj, "createTooltip", [_dec10], Object.getOwnPropertyDescriptor(_obj, "createTooltip"), _obj), _applyDecoratedDescriptor(_obj, "removeRow", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeRow"), _obj)), _obj))));
  _exports.default = _default;
});