define("discourse/plugins/discourse-assign/discourse-assign/lib/user-menu/assign-item", ["exports", "discourse/lib/user-menu/base-item", "discourse/lib/utilities", "@ember/template", "discourse/lib/text", "I18n"], function (_exports, _baseItem, _utilities, _template, _text, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-menu/base-item",0,"discourse/lib/utilities",0,"@ember/template",0,"discourse/lib/text",0,"I18n"eaimeta@70e063a35619d71f
  const ICON = "user-plus";
  const GROUP_ICON = "group-plus";
  class UserMenuAssignItem extends _baseItem.default {
    constructor(_ref) {
      let {
        assign
      } = _ref;
      super(...arguments);
      this.assign = assign;
    }
    get className() {
      return "assign";
    }
    get linkHref() {
      return (0, _utilities.postUrl)(this.assign.slug, this.assign.id, (this.assign.last_read_post_number || 0) + 1);
    }
    get linkTitle() {
      if (this.assign.assigned_to_group) {
        return _I18n.default.t("user.assigned_to_group", {
          group_name: this.assign.assigned_to_group.full_name || this.assign.assigned_to_group.name
        });
      } else {
        return _I18n.default.t("user.assigned_to_you");
      }
    }
    get icon() {
      if (this.assign.assigned_to_group) {
        return GROUP_ICON;
      } else {
        return ICON;
      }
    }
    get label() {
      return null;
    }
    get description() {
      return (0, _template.htmlSafe)((0, _text.emojiUnescape)(this.assign.fancy_title));
    }
    get topicId() {
      return this.assign.id;
    }
  }
  _exports.default = UserMenuAssignItem;
});