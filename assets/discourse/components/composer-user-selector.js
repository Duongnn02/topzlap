define("discourse/components/composer-user-selector", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <EmailGroupUserChooser
    @id="private-message-users"
    @value={{this.splitRecipients}}
    @onChange={{action "updateRecipients"}}
    @options={{hash
      topicId=this.topicId
      none="composer.users_placeholder"
      includeMessageableGroups=true
      allowEmails=this.currentUser.can_send_private_email_messages
      autoWrap=true
    }}
  />
  */
  {
    "id": "KhWwI0hr",
    "block": "[[[8,[39,0],null,[[\"@id\",\"@value\",\"@onChange\",\"@options\"],[\"private-message-users\",[30,0,[\"splitRecipients\"]],[28,[37,1],[[30,0],\"updateRecipients\"],null],[28,[37,2],null,[[\"topicId\",\"none\",\"includeMessageableGroups\",\"allowEmails\",\"autoWrap\"],[[30,0,[\"topicId\"]],\"composer.users_placeholder\",true,[30,0,[\"currentUser\",\"can_send_private_email_messages\"]],true]]]]],null]],[],false,[\"email-group-user-chooser\",\"action\",\"hash\"]]",
    "moduleName": "discourse/components/composer-user-selector.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("recipients"), (_obj = {
    init() {
      this._super(...arguments);
      this.set("_groups", []);
    },
    didInsertElement() {
      this._super(...arguments);
      if (this.focusTarget === "usernames") {
        this.element.querySelector(".select-kit .select-kit-header").focus();
      }
    },
    splitRecipients(recipients) {
      if (Array.isArray(recipients)) {
        return recipients;
      }
      return recipients ? recipients.split(",").filter(Boolean) : [];
    },
    _updateGroups(selected, newGroups) {
      const groups = [];
      this._groups.forEach(existing => {
        if (selected.includes(existing)) {
          groups.addObject(existing);
        }
      });
      newGroups.forEach(newGroup => {
        if (!groups.includes(newGroup)) {
          groups.addObject(newGroup);
        }
      });
      this.setProperties({
        _groups: groups,
        hasGroups: groups.length > 0
      });
    },
    actions: {
      updateRecipients(selected, content) {
        const newGroups = content.filterBy("isGroup").mapBy("id");
        this._updateGroups(selected, newGroups);
        this.set("recipients", selected.join(","));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "splitRecipients", [_dec], Object.getOwnPropertyDescriptor(_obj, "splitRecipients"), _obj)), _obj))));
  _exports.default = _default;
});