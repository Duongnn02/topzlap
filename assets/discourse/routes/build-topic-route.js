define("discourse/routes/build-topic-route", ["exports", "discourse/controllers/discovery-sortable", "discourse/routes/discourse", "I18n", "discourse/models/session", "discourse/models/site", "discourse-common/lib/object", "discourse/lib/utilities", "@ember/utils", "@ember/service", "@ember/object"], function (_exports, _discoverySortable, _discourse, _I18n, _session, _site, _object, _utilities, _utils, _service, _object2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _exports.filterQueryParams = filterQueryParams;
  _exports.findTopicList = findTopicList;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/discovery-sortable",0,"discourse/routes/discourse",0,"I18n",0,"discourse/models/session",0,"discourse/models/site",0,"discourse-common/lib/object",0,"discourse/lib/utilities",0,"@ember/utils",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // A helper to build a topic route for a filter
  function filterQueryParams(params, defaultParams) {
    const findOpts = Object.assign({}, defaultParams || {});
    if (params) {
      Object.keys(_discoverySortable.queryParams).forEach(function (opt) {
        if (!(0, _utils.isEmpty)(params[opt])) {
          findOpts[opt] = params[opt];
        }
      });
    }
    return findOpts;
  }
  async function findTopicList(store, tracking, filter, filterParams) {
    let extras = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    let list;
    const session = _session.default.current();
    if (extras.cached) {
      const cachedList = session.get("topicList");

      // Try to use the cached version if it exists and is greater than the topics per page
      if (cachedList && cachedList.get("filter") === filter && (cachedList.get("topics.length") || 0) > cachedList.get("per_page") && (0, _object.deepEqual)(cachedList.get("listParams"), filterParams)) {
        cachedList.set("loaded", true);
        tracking?.updateTopics(cachedList.get("topics"));
        list = cachedList;
      }
      session.set("topicList", null);
    } else {
      // Clear the cache
      session.setProperties({
        topicList: null,
        topicListScrollPosition: null
      });
    }
    if (!list) {
      // Clean up any string parameters that might slip through
      filterParams ||= {};
      for (const [key, val] of Object.entries(filterParams)) {
        if (val === "undefined" || val === "null") {
          filterParams[key] = null;
        }
      }
      list = await store.findFiltered("topicList", {
        filter,
        params: filterParams
      });
    }
    list.set("listParams", filterParams);
    if (tracking) {
      tracking.sync(list, list.filter, filterParams);
      tracking.trackIncoming(list.filter);
    }
    _session.default.currentProp("topicList", list);
    if (list.topic_list?.top_tags) {
      if (list.filter.startsWith("c/") || list.filter.startsWith("tags/c/")) {
        _site.default.currentProp("category_top_tags", list.topic_list.top_tags);
      } else {
        _site.default.currentProp("top_tags", list.topic_list.top_tags);
      }
    }
    return list;
  }
  function _default(filter, extras) {
    var _obj;
    extras = extras || {};
    return _discourse.default.extend((_obj = {
      screenTrack: (0, _service.inject)(),
      queryParams: _discoverySortable.queryParams,
      beforeModel() {
        this.controllerFor("navigation/default").set("filterType", filter.split("/")[0]);
      },
      model(data, transition) {
        // attempt to stop early cause we need this to be called before .sync
        this.screenTrack.stop();
        const findOpts = filterQueryParams(data),
          findExtras = {
            cached: this.isPoppedState(transition)
          };
        return findTopicList(this.store, this.topicTrackingState, filter, findOpts, findExtras);
      },
      titleToken() {
        if (filter === (0, _utilities.defaultHomepage)()) {
          return;
        }
        const filterText = _I18n.default.t("filters." + filter.replace("/", ".") + ".title");
        return _I18n.default.t("filters.with_topics", {
          filter: filterText
        });
      },
      setupController(controller, model) {
        const topicOpts = {
          model,
          category: null,
          period: model.get("for_period") || model.get("params.period"),
          selected: [],
          expandAllPinned: false,
          expandGloballyPinned: true
        };
        this.controllerFor("discovery/topics").setProperties(topicOpts);
        this.controllerFor("navigation/default").set("canCreateTopic", model.get("can_create_topic"));
      },
      renderTemplate() {
        this.render("navigation/default", {
          outlet: "navigation-bar"
        });
        this.render("discovery/topics", {
          controller: "discovery/topics",
          outlet: "list-container"
        });
      },
      changeSort(sortBy) {
        _discoverySortable.changeSort.call(this, sortBy);
      },
      resetParams() {
        let skipParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        _discoverySortable.resetParams.call(this, skipParams);
      }
    }, (_applyDecoratedDescriptor(_obj, "changeSort", [_object2.action], Object.getOwnPropertyDescriptor(_obj, "changeSort"), _obj), _applyDecoratedDescriptor(_obj, "resetParams", [_object2.action], Object.getOwnPropertyDescriptor(_obj, "resetParams"), _obj)), _obj), extras);
  }
});