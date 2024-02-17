define("discourse/routes/new-category", ["exports", "discourse/routes/discourse", "I18n", "rsvp", "discourse/lib/constants"], function (_exports, _discourse, _I18n, _rsvp, _constants) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.setNewCategoryDefaultColors = setNewCategoryDefaultColors;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"rsvp",0,"discourse/lib/constants"eaimeta@70e063a35619d71f
  let _newCategoryColor = "0088CC",
    _newCategoryTextColor = "FFFFFF";
  function setNewCategoryDefaultColors(backgroundColor, textColor) {
    _newCategoryColor = backgroundColor;
    _newCategoryTextColor = textColor;
  }
  var _default = _discourse.default.extend({
    model() {
      return _rsvp.Promise.resolve(this.groupPermissions()).then(permissions => {
        return this.newCategoryWithPermissions(permissions);
      }).catch(() => {
        return this.newCategoryWithPermissions(this.defaultGroupPermissions());
      });
    },
    newCategoryWithPermissions(group_permissions) {
      return this.store.createRecord("category", {
        color: _newCategoryColor,
        text_color: _newCategoryTextColor,
        group_permissions,
        available_groups: this.site.groups.map(g => g.name),
        allow_badges: true,
        topic_featured_link_allowed: true,
        custom_fields: {},
        category_setting: {},
        search_priority: _constants.SEARCH_PRIORITIES.normal,
        required_tag_groups: [],
        form_template_ids: []
      });
    },
    titleToken() {
      return _I18n.default.t("category.create");
    },
    groupPermissions() {
      // Override this function if you want different groupPermissions from a plugin.
      // If your plugin override fails, permissions will fallback to defaultGroupPermissions
      return this.defaultGroupPermissions();
    },
    defaultGroupPermissions() {
      return [{
        group_name: this.site.groups.findBy("id", 0).name,
        permission_type: 1
      }];
    },
    renderTemplate() {
      this.render("edit-category-tabs", {
        controller: "edit-category-tabs",
        model: this.currentModel
      });
    }
  });
  _exports.default = _default;
});