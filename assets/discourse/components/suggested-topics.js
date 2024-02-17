define("discourse/components/suggested-topics", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "I18n", "discourse/helpers/category-link", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "discourse-common/lib/icon-library"], function (_exports, _component, _templateFactory, _object, _I18n, _categoryLink, _decorators, _getUrl, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/component",0,"I18n",0,"discourse/helpers/category-link",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    id="suggested-topics"
    class="suggested-topics"
    role="complementary"
    aria-labelledby="suggested-topics-title"
  >
    <UserTip @id="suggested_topics" />
  
    <h3 id="suggested-topics-title" class="suggested-topics-title">
      {{i18n this.suggestedTitleLabel}}
    </h3>
  
    <div class="topics">
      {{#if this.topic.isPrivateMessage}}
        <BasicTopicList
          @hideCategory="true"
          @showPosters="true"
          @topics={{this.topic.suggestedTopics}}
        />
      {{else}}
        <BasicTopicList @topics={{this.topic.suggestedTopics}} />
      {{/if}}
    </div>
  
    <h3 class="suggested-topics-message">
      {{html-safe this.browseMoreMessage}}
    </h3>
  </div>
  
  <span>
    <PluginOutlet
      @name="below-suggested-topics"
      @connectorTagName="div"
      @outletArgs={{hash topic=this.topic}}
    />
  </span>
  */
  {
    "id": "j2Ex7N+W",
    "block": "[[[10,0],[14,1,\"suggested-topics\"],[14,0,\"suggested-topics\"],[14,\"role\",\"complementary\"],[14,\"aria-labelledby\",\"suggested-topics-title\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@id\"],[\"suggested_topics\"]],null],[1,\"\\n\\n  \"],[10,\"h3\"],[14,1,\"suggested-topics-title\"],[14,0,\"suggested-topics-title\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"suggestedTitleLabel\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"topics\"],[12],[1,\"\\n\"],[41,[30,0,[\"topic\",\"isPrivateMessage\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@hideCategory\",\"@showPosters\",\"@topics\"],[\"true\",\"true\",[30,0,[\"topic\",\"suggestedTopics\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,3],null,[[\"@topics\"],[[30,0,[\"topic\",\"suggestedTopics\"]]]],null],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,\"h3\"],[14,0,\"suggested-topics-message\"],[12],[1,\"\\n    \"],[1,[28,[35,4],[[30,0,[\"browseMoreMessage\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-suggested-topics\",\"div\",[28,[37,6],null,[[\"topic\"],[[30,0,[\"topic\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"user-tip\",\"i18n\",\"if\",\"basic-topic-list\",\"html-safe\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/suggested-topics.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic", "pmTopicTrackingState.isTracking", "pmTopicTrackingState.statesModificationCounter", "topicTrackingState.messageCount"), (_obj = {
    tagName: "",
    suggestedTitleLabel: (0, _object.computed)("topic", function () {
      const href = this.currentUser && this.currentUser.pmPath(this.topic);
      if (this.topic.get("isPrivateMessage") && href) {
        return "suggested_topics.pm_title";
      } else {
        return "suggested_topics.title";
      }
    }),
    browseMoreMessage(topic) {
      return topic.isPrivateMessage ? this._privateMessageBrowseMoreMessage(topic) : this._topicBrowseMoreMessage(topic);
    },
    _privateMessageBrowseMoreMessage(topic) {
      const username = this.currentUser.username;
      const suggestedGroupName = topic.suggested_group_name;
      const inboxFilter = suggestedGroupName ? "group" : "user";
      const unreadCount = this.pmTopicTrackingState.lookupCount("unread", {
        inboxFilter,
        groupName: suggestedGroupName
      });
      const newCount = this.pmTopicTrackingState.lookupCount("new", {
        inboxFilter,
        groupName: suggestedGroupName
      });
      if (unreadCount + newCount > 0) {
        const hasBoth = unreadCount > 0 && newCount > 0;
        if (suggestedGroupName) {
          return _I18n.default.messageFormat("user.messages.read_more_group_pm_MF", {
            HAS_UNREAD_AND_NEW: hasBoth,
            UNREAD: unreadCount,
            NEW: newCount,
            username,
            groupName: suggestedGroupName,
            groupLink: this._groupLink(username, suggestedGroupName),
            basePath: (0, _getUrl.default)("")
          });
        } else {
          return _I18n.default.messageFormat("user.messages.read_more_personal_pm_MF", {
            HAS_UNREAD_AND_NEW: hasBoth,
            UNREAD: unreadCount,
            NEW: newCount,
            username,
            basePath: (0, _getUrl.default)("")
          });
        }
      } else if (suggestedGroupName) {
        return _I18n.default.t("user.messages.read_more_in_group", {
          groupLink: this._groupLink(username, suggestedGroupName)
        });
      } else {
        return _I18n.default.t("user.messages.read_more", {
          basePath: (0, _getUrl.default)(""),
          username
        });
      }
    },
    _topicBrowseMoreMessage(topic) {
      let category = topic.get("category");
      if (category && (0, _object.get)(category, "id") === this.site.uncategorized_category_id) {
        category = null;
      }
      let unreadTopics = 0;
      let newTopics = 0;
      if (this.currentUser) {
        unreadTopics = this.topicTrackingState.countUnread();
        newTopics = this.topicTrackingState.countNew();
      }
      if (newTopics + unreadTopics > 0) {
        return _I18n.default.messageFormat("topic.read_more_MF", {
          HAS_UNREAD_AND_NEW: unreadTopics > 0 && newTopics > 0,
          UNREAD: unreadTopics,
          NEW: newTopics,
          HAS_CATEGORY: category ? true : false,
          categoryLink: category ? (0, _categoryLink.categoryBadgeHTML)(category) : null,
          basePath: (0, _getUrl.default)("")
        });
      } else if (category) {
        return _I18n.default.t("topic.read_more_in_category", {
          categoryLink: (0, _categoryLink.categoryBadgeHTML)(category),
          latestLink: (0, _getUrl.default)("/latest")
        });
      } else {
        return _I18n.default.t("topic.read_more", {
          categoryLink: (0, _getUrl.default)("/categories"),
          latestLink: (0, _getUrl.default)("/latest")
        });
      }
    },
    _groupLink(username, groupName) {
      return `<a class="group-link" href="${(0, _getUrl.default)(`/u/${username}/messages/group/${groupName}`)}">${(0, _iconLibrary.iconHTML)("users")} ${groupName}</a>`;
    }
  }, (_applyDecoratedDescriptor(_obj, "browseMoreMessage", [_dec], Object.getOwnPropertyDescriptor(_obj, "browseMoreMessage"), _obj)), _obj))));
  _exports.default = _default;
});