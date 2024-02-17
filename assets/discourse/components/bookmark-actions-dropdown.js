define("discourse/components/bookmark-actions-dropdown", ["exports", "@ember/object", "discourse-common/utils/decorators", "select-kit/components/dropdown-select-box", "I18n"], function (_exports, _object, _decorators, _dropdownSelectBox, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse-common/utils/decorators",0,"select-kit/components/dropdown-select-box",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const ACTION_REMOVE = "remove";
  const ACTION_EDIT = "edit";
  const ACTION_CLEAR_REMINDER = "clear_reminder";
  const ACTION_PIN = "pin";
  var _default = _dropdownSelectBox.default.extend((_dec = (0, _decorators.default)("bookmark"), (_obj = {
    classNames: ["bookmark-actions-dropdown"],
    pluginApiIdentifiers: ["bookmark-actions-dropdown"],
    selectKitOptions: {
      icon: null,
      translatedNone: "...",
      showFullTitle: true
    },
    content(bookmark) {
      const actions = [];
      actions.push({
        id: ACTION_REMOVE,
        icon: "trash-alt",
        name: _I18n.default.t("post.bookmarks.actions.delete_bookmark.name"),
        description: _I18n.default.t("post.bookmarks.actions.delete_bookmark.description")
      });
      actions.push({
        id: ACTION_EDIT,
        icon: "pencil-alt",
        name: _I18n.default.t("post.bookmarks.actions.edit_bookmark.name"),
        description: _I18n.default.t("post.bookmarks.actions.edit_bookmark.description")
      });
      if (bookmark.reminder_at) {
        actions.push({
          id: ACTION_CLEAR_REMINDER,
          icon: "history",
          name: _I18n.default.t("post.bookmarks.actions.clear_bookmark_reminder.name"),
          description: _I18n.default.t("post.bookmarks.actions.clear_bookmark_reminder.description")
        });
      }
      actions.push({
        id: ACTION_PIN,
        icon: "thumbtack",
        name: _I18n.default.t(`post.bookmarks.actions.${bookmark.pinAction()}_bookmark.name`),
        description: _I18n.default.t(`post.bookmarks.actions.${bookmark.pinAction()}_bookmark.description`)
      });
      return actions;
    },
    onChange(selectedAction) {
      if (selectedAction === ACTION_REMOVE) {
        this.removeBookmark(this.bookmark);
      } else if (selectedAction === ACTION_EDIT) {
        this.editBookmark(this.bookmark);
      } else if (selectedAction === ACTION_CLEAR_REMINDER) {
        this.clearBookmarkReminder(this.bookmark);
      } else if (selectedAction === ACTION_PIN) {
        this.togglePinBookmark(this.bookmark);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "content", [_dec], Object.getOwnPropertyDescriptor(_obj, "content"), _obj), _applyDecoratedDescriptor(_obj, "onChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChange"), _obj)), _obj)));
  _exports.default = _default;
});