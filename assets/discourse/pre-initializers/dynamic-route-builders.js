define("discourse/pre-initializers/dynamic-route-builders", ["exports", "discourse/controllers/discovery-sortable", "discourse/models/site", "discourse/routes/tag-show", "discourse/models/user", "discourse/routes/build-category-route", "discourse/routes/build-topic-route", "@ember/string"], function (_exports, _discoverySortable, _site, _tagShow, _user, _buildCategoryRoute, _buildTopicRoute, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/discovery-sortable",0,"discourse/models/site",0,"discourse/routes/tag-show",0,"discourse/models/user",0,"discourse/routes/build-category-route",0,"discourse/routes/build-topic-route",0,"@ember/string"eaimeta@70e063a35619d71f
  var _default = {
    after: "inject-discourse-objects",
    name: "dynamic-route-builders",
    initialize(_container, app) {
      app.register("controller:discovery.category", _discoverySortable.default.extend());
      app.register("controller:discovery.category-none", _discoverySortable.default.extend());
      app.register("controller:discovery.category-all", _discoverySortable.default.extend());
      app.register("route:discovery.category", (0, _buildCategoryRoute.default)("default"));
      app.register("route:discovery.category-none", (0, _buildCategoryRoute.default)("default", {
        no_subcategories: true
      }));
      app.register("route:discovery.category-all", (0, _buildCategoryRoute.default)("default", {
        no_subcategories: false
      }));
      const site = _site.default.current();
      site.get("filters").forEach(filter => {
        const filterDasherized = (0, _string.dasherize)(filter);
        app.register(`controller:discovery.${filterDasherized}`, _discoverySortable.default.extend());
        app.register(`controller:discovery.${filterDasherized}-category`, _discoverySortable.default.extend());
        app.register(`controller:discovery.${filterDasherized}-category-none`, _discoverySortable.default.extend());
        if (filter === "top") {
          app.register("route:discovery.top", (0, _buildTopicRoute.default)("top", {
            actions: {
              willTransition() {
                _user.default.currentProp("user_option.should_be_redirected_to_top", false);
                if (_user.default.currentProp("user_option.redirected_to_top")) {
                  _user.default.currentProp("user_option.redirected_to_top.reason", null);
                }
                return this._super(...arguments);
              }
            }
          }));
        } else {
          app.register(`route:discovery.${filterDasherized}`, (0, _buildTopicRoute.default)(filter));
        }
        app.register(`route:discovery.${filterDasherized}-category`, (0, _buildCategoryRoute.default)(filter));
        app.register(`route:discovery.${filterDasherized}-category-none`, (0, _buildCategoryRoute.default)(filter, {
          no_subcategories: true
        }));
      });
      app.register("route:tags.show-category", _tagShow.default.extend());
      app.register("route:tags.show-category-none", _tagShow.default.extend({
        noSubcategories: true
      }));
      app.register("route:tags.show-category-all", _tagShow.default.extend({
        noSubcategories: false
      }));
      site.get("filters").forEach(function (filter) {
        const filterDasherized = (0, _string.dasherize)(filter);
        app.register(`route:tag.show-${filterDasherized}`, _tagShow.default.extend({
          navMode: filter
        }));
        app.register(`route:tags.show-category-${filterDasherized}`, _tagShow.default.extend({
          navMode: filter
        }));
        app.register(`route:tags.show-category-none-${filterDasherized}`, _tagShow.default.extend({
          navMode: filter,
          noSubcategories: true
        }));
        app.register(`route:tags.show-category-all-${filterDasherized}`, _tagShow.default.extend({
          navMode: filter,
          noSubcategories: false
        }));
      });
    }
  };
  _exports.default = _default;
});