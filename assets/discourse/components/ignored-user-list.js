define("discourse/components/ignored-user-list", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/user", "discourse/lib/ajax-error", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _user, _ajaxError, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/models/user",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="ignored-list">
    {{#each this.items as |item|}}
      <IgnoredUserListItem
        @item={{item}}
        @onRemoveIgnoredUser={{action "removeIgnoredUser"}}
      />
    {{else}}
      {{i18n "user.user_notifications.ignore_no_users"}}
    {{/each}}
  </div>
  <div class="instructions">{{i18n "user.ignored_users_instructions"}}</div>
  <div><DButton
      @action={{action "newIgnoredUser"}}
      @class="btn-default"
      @icon="plus"
      @label="user.user_notifications.add_ignored_user"
    /></div>
  */
  {
    "id": "v8R14dR3",
    "block": "[[[10,0],[14,0,\"ignored-list\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"items\"]]],null]],null],null,[[[1,\"    \"],[8,[39,2],null,[[\"@item\",\"@onRemoveIgnoredUser\"],[[30,1],[28,[37,3],[[30,0],\"removeIgnoredUser\"],null]]],null],[1,\"\\n\"]],[1]],[[[1,\"    \"],[1,[28,[35,4],[\"user.user_notifications.ignore_no_users\"],null]],[1,\"\\n\"]],[]]],[13],[1,\"\\n\"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,4],[\"user.ignored_users_instructions\"],null]],[13],[1,\"\\n\"],[10,0],[12],[8,[39,5],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,3],[[30,0],\"newIgnoredUser\"],null],\"btn-default\",\"plus\",\"user.user_notifications.add_ignored_user\"]],null],[13]],[\"item\"],false,[\"each\",\"-track-array\",\"ignored-user-list-item\",\"action\",\"i18n\",\"d-button\"]]",
    "moduleName": "discourse/components/ignored-user-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    item: null,
    actions: {
      removeIgnoredUser(item) {
        this.set("saved", false);
        this.items.removeObject(item);
        _user.default.findByUsername(item).then(user => {
          user.updateNotificationLevel({
            level: "normal",
            actingUser: this.model
          }).catch(_ajaxError.popupAjaxError).finally(() => this.set("saved", true));
        });
      },
      newIgnoredUser() {
        const modal = (0, _showModal.default)("ignore-duration-with-username", {
          model: this.model
        });
        modal.setProperties({
          ignoredUsername: null,
          onUserIgnored: username => {
            this.items.addObject(username);
          }
        });
      }
    }
  }));
  _exports.default = _default;
});