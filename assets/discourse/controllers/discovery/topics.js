define("discourse/controllers/discovery/topics", ["exports", "@ember/object/computed", "discourse/mixins/bulk-topic-selection", "discourse/controllers/discovery", "I18n", "discourse/models/topic", "discourse/models/topic-list", "@ember/controller", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "discourse/lib/computed", "discourse/helpers/route-action", "@ember/service", "discourse/lib/url", "@ember/object"], function (_exports, _computed, _bulkTopicSelection, _discovery, _I18n, _topic, _topicList, _controller, _deprecated, _decorators, _computed2, _routeAction, _service, _url, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/mixins/bulk-topic-selection",0,"discourse/controllers/discovery",0,"I18n",0,"discourse/models/topic",0,"discourse/models/topic-list",0,"@ember/controller",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"discourse/lib/computed",0,"discourse/helpers/route-action",0,"@ember/service",0,"discourse/lib/url",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const controllerOpts = (_dec = (0, _decorators.default)("model.filter", "model.topics.length"), _dec2 = (0, _decorators.default)("model.filter", "model.topics.length"), _dec3 = (0, _decorators.default)("model.filter"), _dec4 = (0, _decorators.default)("allLoaded", "model.topics.length"), _dec5 = (0, _decorators.default)("allLoaded", "model.topics.length"), (_obj = {
    discovery: (0, _controller.inject)(),
    router: (0, _service.inject)(),
    period: null,
    canCreateTopicOnCategory: null,
    canStar: (0, _computed.alias)("currentUser.id"),
    showTopicPostBadges: (0, _computed.not)("new"),
    redirectedReason: (0, _computed.alias)("currentUser.user_option.redirected_to_top.reason"),
    expandGloballyPinned: false,
    expandAllPinned: false,
    order: (0, _computed.readOnly)("model.params.order"),
    ascending: (0, _computed.readOnly)("model.params.ascending"),
    selected: null,
    loadingBegan() {
      this.set("application.showFooter", false);
      return true;
    },
    loadingComplete() {
      this.set("application.showFooter", this.loadedAllItems);
      return true;
    },
    showDismissRead(filter, topicsLength) {
      return this._isFilterPage(filter, "unread") && topicsLength > 0;
    },
    showResetNew(filter, topicsLength) {
      return this._isFilterPage(filter, "new") && topicsLength > 0;
    },
    showInserted(event) {
      event?.preventDefault();
      const tracker = this.topicTrackingState;

      // Move inserted into topics
      this.model.loadBefore(tracker.get("newIncoming"), true);
      tracker.resetTracking();
    },
    actions: {
      changeSort() {
        (0, _deprecated.default)("changeSort has been changed from an (action) to a (route-action)", {
          since: "2.6.0",
          dropFrom: "2.7.0",
          id: "discourse.topics.change-sort"
        });
        return (0, _routeAction.routeAction)("changeSort", this.router._router, ...arguments)();
      },
      refresh() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          skipResettingParams: []
        };
        const filter = this.get("model.filter");
        this.send("resetParams", options.skipResettingParams);

        // Don't refresh if we're still loading
        if (this.discovery.loading) {
          return;
        }

        // If we `send('loading')` here, due to returning true it bubbles up to the
        // router and ember throws an error due to missing `handlerInfos`.
        // Lesson learned: Don't call `loading` yourself.
        this.discovery.loadingBegan();
        this.topicTrackingState.resetTracking();
        this.store.findFiltered("topicList", {
          filter
        }).then(list => {
          _topicList.default.hideUniformCategory(list, this.category);

          // If query params are present in the current route, we need still need to sync topic
          // tracking with the topicList without any query params. Then we set the topic
          // list to the list filtered with query params in the afterRefresh.
          const params = this.router.currentRoute.queryParams;
          if (Object.keys(params).length) {
            this.store.findFiltered("topicList", {
              filter,
              params
            }).then(listWithParams => {
              this.afterRefresh(filter, list, listWithParams);
            });
          } else {
            this.afterRefresh(filter, list);
          }
        });
      },
      resetNew() {
        const tracked = (this.router.currentRoute.queryParams["f"] || this.router.currentRoute.queryParams["filter"]) === "tracked";
        let topicIds = this.selected ? this.selected.map(topic => topic.id) : null;
        _topic.default.resetNew(this.category, !this.noSubcategories, {
          tracked,
          topicIds
        }).then(() => this.send("refresh", tracked ? {
          skipResettingParams: ["filter", "f"]
        } : {}));
      }
    },
    afterRefresh(filter, list) {
      let listModel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : list;
      this.setProperties({
        model: listModel
      });
      this.resetSelected();
      if (this.topicTrackingState) {
        this.topicTrackingState.sync(list, filter);
      }
      this.send("loadingComplete");
    },
    hasTopics: (0, _computed.gt)("model.topics.length", 0),
    allLoaded: (0, _computed.empty)("model.more_topics_url"),
    latest: (0, _computed2.endWith)("model.filter", "latest"),
    top: (0, _computed2.endWith)("model.filter", "top"),
    yearly: (0, _computed.equal)("period", "yearly"),
    quarterly: (0, _computed.equal)("period", "quarterly"),
    monthly: (0, _computed.equal)("period", "monthly"),
    weekly: (0, _computed.equal)("period", "weekly"),
    daily: (0, _computed.equal)("period", "daily"),
    new(filter) {
      return filter?.endsWith("new") && !this.currentUser?.new_new_view_enabled;
    },
    footerMessage(allLoaded, topicsLength) {
      if (!allLoaded) {
        return;
      }
      const category = this.category;
      if (category) {
        return _I18n.default.t("topics.bottom.category", {
          category: category.get("name")
        });
      } else {
        const split = (this.get("model.filter") || "").split("/");
        if (topicsLength === 0) {
          return _I18n.default.t("topics.none." + split[0], {
            category: split[1]
          });
        } else {
          return _I18n.default.t("topics.bottom." + split[0], {
            category: split[1]
          });
        }
      }
    },
    footerEducation(allLoaded, topicsLength) {
      if (!allLoaded || topicsLength > 0 || !this.currentUser) {
        return;
      }
      const segments = (this.get("model.filter") || "").split("/");
      const tab = segments[segments.length - 1];
      if (tab !== "new" && tab !== "unread") {
        return;
      }
      return _I18n.default.t("topics.none.educate." + tab, {
        userPrefsUrl: (0, _url.userPath)(`${this.currentUser.get("username_lower")}/preferences/notifications`)
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "loadingBegan", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadingBegan"), _obj), _applyDecoratedDescriptor(_obj, "loadingComplete", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadingComplete"), _obj), _applyDecoratedDescriptor(_obj, "showDismissRead", [_dec], Object.getOwnPropertyDescriptor(_obj, "showDismissRead"), _obj), _applyDecoratedDescriptor(_obj, "showResetNew", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showResetNew"), _obj), _applyDecoratedDescriptor(_obj, "showInserted", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInserted"), _obj), _applyDecoratedDescriptor(_obj, "new", [_dec3], Object.getOwnPropertyDescriptor(_obj, "new"), _obj), _applyDecoratedDescriptor(_obj, "footerMessage", [_dec4], Object.getOwnPropertyDescriptor(_obj, "footerMessage"), _obj), _applyDecoratedDescriptor(_obj, "footerEducation", [_dec5], Object.getOwnPropertyDescriptor(_obj, "footerEducation"), _obj)), _obj));
  var _default = _discovery.default.extend(controllerOpts, _bulkTopicSelection.default);
  _exports.default = _default;
});