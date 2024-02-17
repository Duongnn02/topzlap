define("discourse/components/badge-title", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "I18n", "discourse/lib/ajax", "@ember/service"], function (_exports, _component, _templateFactory, _object, _I18n, _ajax, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"I18n",0,"discourse/lib/ajax",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="badge-title">
    <section class="user-content" id="user-content">
      <form class="form-horizontal">
        <div class="control-group">
          <div class="controls">
            <h3>{{i18n "badges.select_badge_for_title"}}</h3>
          </div>
        </div>
  
        <div class="control-group">
          <div class="controls">
            <ComboBox
              @value={{this._selectedUserBadgeId}}
              @nameProperty="badge.name"
              @content={{this.selectableUserBadges}}
              @onChange={{action (mut this._selectedUserBadgeId)}}
            />
          </div>
        </div>
  
        <div class="control-group">
          <div class="controls">
            <DButton
              @class="btn-primary"
              @action={{action "saveBadgeTitle"}}
              @disabled={{this._isSaving}}
              @label={{if this._isSaving "saving" "save"}}
            />
            {{#if this._isSaved}}
              <span>{{i18n "saved"}}</span>
            {{/if}}
          </div>
        </div>
      </form>
    </section>
  </div>
  */
  {
    "id": "VyLGtWqJ",
    "block": "[[[10,0],[14,0,\"badge-title\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n    \"],[10,\"form\"],[14,0,\"form-horizontal\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,\"h3\"],[12],[1,[28,[35,0],[\"badges.select_badge_for_title\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[8,[39,1],null,[[\"@value\",\"@nameProperty\",\"@content\",\"@onChange\"],[[30,0,[\"_selectedUserBadgeId\"]],\"badge.name\",[30,0,[\"selectableUserBadges\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"_selectedUserBadgeId\"]]],null]],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@disabled\",\"@label\"],[\"btn-primary\",[28,[37,2],[[30,0],\"saveBadgeTitle\"],null],[30,0,[\"_isSaving\"]],[52,[30,0,[\"_isSaving\"]],\"saving\",\"save\"]]],null],[1,\"\\n\"],[41,[30,0,[\"_isSaved\"]],[[[1,\"            \"],[10,1],[12],[1,[28,[35,0],[\"saved\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"combo-box\",\"action\",\"mut\",\"d-button\",\"if\"]]",
    "moduleName": "discourse/components/badge-title.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    dialog: (0, _service.inject)(),
    tagName: "",
    selectableUserBadges: null,
    _selectedUserBadgeId: null,
    _isSaved: false,
    _isSaving: false,
    init() {
      this._super(...arguments);
      const badge = this._findBadgeByTitle(this.selectableUserBadges, this.currentUser.title);
      this.set("_selectedUserBadgeId", badge?.id || 0);
    },
    saveBadgeTitle() {
      this.setProperties({
        _isSaved: false,
        _isSaving: true
      });
      const selectedUserBadge = this._findBadgeById(this.selectableUserBadges, this._selectedUserBadgeId);
      return (0, _ajax.ajax)(`${this.currentUser.path}/preferences/badge_title`, {
        type: "PUT",
        data: {
          user_badge_id: selectedUserBadge?.id || 0
        }
      }).then(() => {
        this.set("_isSaved", true);
        this.currentUser.set("title", selectedUserBadge?.badge?.name || "");
      }, () => {
        this.dialog.alert(_I18n.default.t("generic_error"));
      }).finally(() => this.set("_isSaving", false));
    },
    _findBadgeById(badges, id) {
      return (badges || []).findBy("id", id);
    },
    _findBadgeByTitle(badges, title) {
      return (badges || []).findBy("badge.name", title);
    }
  }, (_applyDecoratedDescriptor(_obj, "saveBadgeTitle", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveBadgeTitle"), _obj)), _obj)));
  _exports.default = _default;
});