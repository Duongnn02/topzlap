define("discourse/routes/build-private-messages-route", ["exports", "I18n", "discourse/models/user-action", "discourse/routes/user-topic-list", "discourse/lib/cached-topic-list", "@ember/object", "discourse-common/lib/icon-library", "discourse-common/lib/get-url", "@ember/template"], function (_exports, _I18n, _userAction, _userTopicList, _cachedTopicList, _object, _iconLibrary, _getUrl, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.UNREAD_FILTER = _exports.NEW_FILTER = _exports.INBOX_FILTER = _exports.ARCHIVE_FILTER = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/models/user-action",0,"discourse/routes/user-topic-list",0,"discourse/lib/cached-topic-list",0,"@ember/object",0,"discourse-common/lib/icon-library",0,"discourse-common/lib/get-url",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const NEW_FILTER = "new";
  _exports.NEW_FILTER = NEW_FILTER;
  const UNREAD_FILTER = "unread";
  _exports.UNREAD_FILTER = UNREAD_FILTER;
  const INBOX_FILTER = "inbox";
  _exports.INBOX_FILTER = INBOX_FILTER;
  const ARCHIVE_FILTER = "archive";

  // A helper to build a user topic list route
  _exports.ARCHIVE_FILTER = ARCHIVE_FILTER;
  var _default = (inboxType, path, filter) => {
    var _obj;
    return _userTopicList.default.extend((_obj = {
      userActionType: _userAction.default.TYPES.messages_received,
      titleToken() {
        return [_I18n.default.t(`user.messages.${filter}`), _I18n.default.t("user.private_messages")];
      },
      didTransition() {
        this.controllerFor("user-topics-list")._showFooter();
        return true;
      },
      model() {
        const topicListFilter = "topics/" + path + "/" + this.modelFor("user").get("username_lower");
        const lastTopicList = (0, _cachedTopicList.findOrResetCachedTopicList)(this.session, topicListFilter);
        return lastTopicList ? lastTopicList : this.store.findFiltered("topicList", {
          filter: topicListFilter
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
        const userPrivateMessagesController = this.controllerFor("user-private-messages");
        const userTopicsListController = this.controllerFor("user-topics-list");
        userTopicsListController.setProperties({
          hideCategory: true,
          showPosters: true,
          tagsForUser: this.modelFor("user").get("username_lower"),
          selected: [],
          showToggleBulkSelect: true,
          filter,
          group: null,
          inbox: inboxType
        });
        userTopicsListController.subscribe();
        userPrivateMessagesController.setProperties({
          archive: false,
          group: null
        });
        this.searchService.set("contextType", "private_messages");
      },
      emptyState() {
        const title = _I18n.default.t("user.no_messages_title");
        const body = (0, _template.htmlSafe)(_I18n.default.t("user.no_messages_body", {
          aboutUrl: (0, _getUrl.default)("/about"),
          icon: (0, _iconLibrary.iconHTML)("envelope")
        }));
        return {
          title,
          body
        };
      },
      deactivate() {
        this.controllerFor("user-topics-list").unsubscribe();
        this.searchService.set("searchContext", this.controllerFor("user").get("model.searchContext"));
      },
      dismissReadOptions() {
        return {};
      },
      dismissReadTopics(dismissTopics) {
        const operationType = dismissTopics ? "topics" : "posts";
        const controller = this.controllerFor("user-topics-list");
        controller.send("dismissRead", operationType, {
          private_message_inbox: inboxType,
          ...this.dismissReadOptions()
        });
      }
    }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj), _applyDecoratedDescriptor(_obj, "dismissReadTopics", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissReadTopics"), _obj)), _obj));
  };
  _exports.default = _default;
});