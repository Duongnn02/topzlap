define("discourse/routes/build-private-messages-group-route", ["exports", "discourse/routes/build-private-messages-route", "I18n", "discourse/lib/cached-topic-list", "@ember/string"], function (_exports, _buildPrivateMessagesRoute, _I18n, _cachedTopicList, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-private-messages-route",0,"I18n",0,"discourse/lib/cached-topic-list",0,"@ember/string"eaimeta@70e063a35619d71f
  var _default = (inboxType, filter) => {
    return (0, _buildPrivateMessagesRoute.default)(inboxType, "private-messages-groups", filter).extend({
      groupName: null,
      titleToken() {
        const groupName = this.groupName;
        if (groupName) {
          let title = (0, _string.capitalize)(groupName);
          if (filter !== "inbox") {
            title = `${title} ${_I18n.default.t("user.messages." + filter)}`;
          }
          return [title, _I18n.default.t(`user.private_messages`)];
        }
      },
      model() {
        const username = this.modelFor("user").get("username_lower");
        const groupName = this.modelFor("userPrivateMessages.group");
        let topicListFilter = `topics/private-messages-group/${username}/${groupName}`;
        if (filter !== "inbox") {
          topicListFilter = `${topicListFilter}/${filter}`;
        }
        const lastTopicList = (0, _cachedTopicList.findOrResetCachedTopicList)(this.session, topicListFilter);
        return lastTopicList ? lastTopicList : this.store.findFiltered("topicList", {
          filter: topicListFilter
        }).then(topicList => {
          // andrei: we agreed that this is an anti pattern,
          // it's better to avoid mutating a rest model like this
          // this place we'll be refactored later
          // see https://github.com/discourse/discourse/pull/14313#discussion_r708784704
          topicList.set("emptyState", this.emptyState());
          return topicList;
        });
      },
      afterModel(model) {
        const filters = model.get("filter").split("/");
        let groupName;
        if (filter !== "inbox") {
          groupName = filters[filters.length - 2];
        } else {
          groupName = filters.pop();
        }
        const group = this.modelFor("user").get("groups").filterBy("name", groupName)[0];
        this.setProperties({
          groupName,
          group
        });
      },
      setupController() {
        this._super.apply(this, arguments);
        const userTopicsListController = this.controllerFor("user-topics-list");
        userTopicsListController.set("group", this.group);
        userTopicsListController.set("pmTopicTrackingState.activeGroup", this.group);
        this.controllerFor("user-private-messages").set("group", this.group);
      },
      emptyState() {
        return {
          title: _I18n.default.t("user.no_messages_title"),
          body: ""
        };
      },
      dismissReadOptions() {
        return {
          group_name: this.get("groupName")
        };
      }
    });
  };
  _exports.default = _default;
});