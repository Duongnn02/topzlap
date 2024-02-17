define("discourse/routes/edit-category", ["exports", "discourse/models/category", "discourse/routes/discourse", "I18n"], function (_exports, _category, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    model(params) {
      return _category.default.reloadCategoryWithPermissions(params, this.store, this.site);
    },
    afterModel(model) {
      if (!model.can_edit) {
        this.replaceWith("/404");
        return;
      }
    },
    titleToken() {
      return _I18n.default.t("category.edit_dialog_title", {
        categoryName: this.currentModel.name
      });
    }
  });
  _exports.default = _default;
});