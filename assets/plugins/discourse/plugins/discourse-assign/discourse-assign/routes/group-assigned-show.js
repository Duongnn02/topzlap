define("discourse/plugins/discourse-assign/discourse-assign/routes/group-assigned-show", ["exports", "discourse/routes/discourse", "discourse/lib/cached-topic-list"], function (_exports, _discourse, _cachedTopicList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/cached-topic-list"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel(transition) {
      if (!(transition.hasOwnProperty("from") && transition.from)) {
        return;
      }
      if (transition.from.localName === "show") {
        this.session.set("topicListScrollPosition", 1);
      }
    },
    model(params) {
      let filter = null;
      if (["everyone", this.modelFor("group").get("name")].includes(params.filter)) {
        filter = `topics/group-topics-assigned/${this.modelFor("group").get("name")}`;
      } else {
        filter = `topics/messages-assigned/${params.filter}`;
      }
      const lastTopicList = (0, _cachedTopicList.findOrResetCachedTopicList)(this.session, filter);
      return lastTopicList ? lastTopicList : this.store.findFiltered("topicList", {
        filter,
        params: {
          order: params.order,
          ascending: params.ascending,
          search: params.search,
          direct: params.filter !== "everyone"
        }
      });
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        search: this.currentModel.params.search
      });
    },
    renderTemplate() {
      this.render("group-topics-list");
    }
  });
  _exports.default = _default;
});