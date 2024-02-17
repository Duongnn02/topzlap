define("discourse/plugins/discourse-topic-voting/discourse/initializers/discourse-topic-voting", ["exports", "I18n", "discourse/lib/plugin-api", "discourse/models/nav-item"], function (_exports, _I18n, _pluginApi, _navItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/plugin-api",0,"discourse/models/nav-item"eaimeta@70e063a35619d71f
  var _default = {
    name: "discourse-topic-voting",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.32", api => {
        const siteSettings = api.container.lookup("site-settings:main");
        if (siteSettings.voting_enabled) {
          const pageSearchController = api.container.lookup("controller:full-page-search");
          pageSearchController.sortOrders.pushObject({
            name: _I18n.default.t("search.most_votes"),
            id: 5,
            term: "order:votes"
          });
          api.addNavigationBarItem({
            name: "votes",
            before: "top",
            customFilter: category => {
              return category && category.can_vote;
            },
            customHref: (category, args) => {
              const path = _navItem.default.pathFor("latest", args);
              return `${path}?order=votes`;
            },
            forceActive: (category, args, router) => {
              const queryParams = router.currentRoute.queryParams;
              return queryParams && Object.keys(queryParams).length === 1 && queryParams["order"] === "votes";
            }
          });
          api.addNavigationBarItem({
            name: "my_votes",
            before: "top",
            customFilter: category => {
              return category && category.can_vote && api.getCurrentUser();
            },
            customHref: (category, args) => {
              const path = _navItem.default.pathFor("latest", args);
              return `${path}?state=my_votes`;
            },
            forceActive: (category, args, router) => {
              const queryParams = router.currentRoute.queryParams;
              return queryParams && Object.keys(queryParams).length === 1 && queryParams["state"] === "my_votes";
            }
          });
        }
      });
      (0, _pluginApi.withPluginApi)("0.11.7", api => {
        const siteSettings = api.container.lookup("site-settings:main");
        if (siteSettings.voting_enabled) {
          api.addSearchSuggestion("order:votes");
        }
      });
    }
  };
  _exports.default = _default;
});