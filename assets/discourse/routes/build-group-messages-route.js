define("discourse/routes/build-group-messages-route", ["exports", "I18n", "discourse/routes/user-topic-list"], function (_exports, _I18n, _userTopicList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/routes/user-topic-list"eaimeta@70e063a35619d71f
  var _default = type => {
    return _userTopicList.default.extend({
      titleToken() {
        return _I18n.default.t(`user.messages.${type}`);
      },
      model() {
        const groupName = this.modelFor("group").get("name");
        const username = this.currentUser.get("username_lower");
        let filter = `topics/private-messages-group/${username}/${groupName}`;
        if (this._isArchive()) {
          filter = `${filter}/archive`;
        }
        return this.store.findFiltered("topicList", {
          filter
        }).then(model => {
          // andrei: we agreed that this is an anti pattern,
          // it's better to avoid mutating a rest model like this
          // this place we'll be refactored later
          // see https://github.com/discourse/discourse/pull/14313#discussion_r708784704
          model.set("emptyState", this.emptyState());
          return model;
        });
      },
      setupController() {
        this._super.apply(this, arguments);
        const groupName = this.modelFor("group").get("name");
        let channel = `/private-messages/group/${groupName}`;
        if (this._isArchive()) {
          channel = `${channel}/archive`;
        }
        this.controllerFor("user-topics-list").subscribe(channel);
        this.controllerFor("user-topics-list").setProperties({
          hideCategory: true,
          showPosters: true
        });
        const currentUser = this.currentUser;
        this.searchService.set("searchContext", {
          type: "private_messages",
          id: currentUser.get("username_lower"),
          user: currentUser
        });
      },
      emptyState() {
        return {
          title: _I18n.default.t("no_group_messages_title"),
          body: ""
        };
      },
      _isArchive() {
        return type === "archive";
      },
      deactivate() {
        this.searchService.set("searchContext", null);
      }
    });
  };
  _exports.default = _default;
});