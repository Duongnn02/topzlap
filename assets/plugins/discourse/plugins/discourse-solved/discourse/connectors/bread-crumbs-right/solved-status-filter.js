define("discourse/plugins/discourse-solved/discourse/connectors/bread-crumbs-right/solved-status-filter", ["exports", "I18n", "discourse-common/lib/get-owner"], function (_exports, _I18n, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  var _default = {
    shouldRender(args, component) {
      const router = (0, _getOwner.getOwner)(this).lookup("router:main");
      if (!component.siteSettings.show_filter_by_solved_status || router.currentPath === "discovery.categories") {
        return false;
      } else if (component.siteSettings.allow_solved_on_all_topics) {
        return true;
      } else {
        const controller = (0, _getOwner.getOwner)(this).lookup("controller:navigation/category");
        return controller && controller.get("category.enable_accepted_answers");
      }
    },
    setupComponent(args, component) {
      const statuses = ["all", "solved", "unsolved"].map(status => {
        return {
          name: _I18n.default.t(`solved.topic_status_filter.${status}`),
          value: status
        };
      });
      component.set("statuses", statuses);
      const queryStrings = window.location.search;
      if (queryStrings.match(/solved=yes/)) {
        component.set("status", "solved");
      } else if (queryStrings.match(/solved=no/)) {
        component.set("status", "unsolved");
      } else {
        component.set("status", "all");
      }
    },
    actions: {
      changeStatus(newStatus) {
        const router = (0, _getOwner.getOwner)(this).lookup("router:main");
        if (newStatus && newStatus !== "all") {
          newStatus = newStatus === "solved" ? "yes" : "no";
        }
        router.transitionTo({
          queryParams: {
            solved: newStatus
          }
        });
      }
    }
  };
  _exports.default = _default;
});