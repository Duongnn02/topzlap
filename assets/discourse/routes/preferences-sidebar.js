define("discourse/routes/preferences-sidebar", ["exports", "discourse/routes/restricted-user", "discourse/models/category"], function (_exports, _restrictedUser, _category) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user",0,"discourse/models/category"eaimeta@70e063a35619d71f
  var _default = _restrictedUser.default.extend({
    showFooter: true,
    setupController(controller, user) {
      const props = {
        model: user,
        selectedSidebarCategories: _category.default.findByIds(user.sidebarCategoryIds)
      };
      if (this.siteSettings.tagging_enabled) {
        props.selectedSidebarTagNames = user.sidebarTagNames;
      }
      props.newSidebarListDestination = user.sidebarListDestination;
      controller.setProperties(props);
    }
  });
  _exports.default = _default;
});