define("discourse/controllers/discovery-sortable", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addDiscoveryQueryParam = void 0;
  _exports.changeSort = changeSort;
  _exports.queryParams = _exports.default = void 0;
  _exports.resetParams = resetParams;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f
  // Just add query params here to have them automatically passed to topic list filters.
  const queryParams = {
    order: {
      replace: true,
      refreshModel: true
    },
    ascending: {
      replace: true,
      refreshModel: true,
      default: false
    },
    status: {
      replace: true,
      refreshModel: true
    },
    state: {
      replace: true,
      refreshModel: true
    },
    search: {
      replace: true,
      refreshModel: true
    },
    max_posts: {
      replace: true,
      refreshModel: true
    },
    min_posts: {
      replace: true,
      refreshModel: true
    },
    q: {
      replace: true,
      refreshModel: true
    },
    before: {
      replace: true,
      refreshModel: true
    },
    bumped_before: {
      replace: true,
      refreshModel: true
    },
    f: {
      replace: true,
      refreshModel: true
    },
    period: {
      replace: true,
      refreshModel: true
    },
    topic_ids: {
      replace: true,
      refreshModel: true
    },
    group_name: {
      replace: true,
      refreshModel: true
    },
    tags: {
      replace: true,
      refreshModel: true
    },
    match_all_tags: {
      replace: true,
      refreshModel: true
    },
    no_subcategories: {
      replace: true,
      refreshModel: true
    },
    no_tags: {
      replace: true,
      refreshModel: true
    },
    exclude_tag: {
      replace: true,
      refreshModel: true
    }
  };

  // Basic controller options
  _exports.queryParams = queryParams;
  const controllerOpts = {
    discoveryTopics: (0, _controller.inject)("discovery/topics"),
    queryParams: Object.keys(queryParams)
  };

  // Default to `undefined`
  controllerOpts.queryParams.forEach(p => {
    controllerOpts[p] = queryParams[p].default;
  });
  function changeSort(sortBy) {
    let model = this.controllerFor("discovery.topics").model;
    if (sortBy === this.controller.order) {
      this.controller.toggleProperty("ascending");
      model.updateSortParams(sortBy, this.controller.ascending);
    } else {
      this.controller.setProperties({
        order: sortBy,
        ascending: false
      });
      model.updateSortParams(sortBy, false);
    }
  }
  function resetParams() {
    let skipParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    controllerOpts.queryParams.forEach(p => {
      if (!skipParams.includes(p)) {
        this.controller.set(p, queryParams[p].default);
      }
    });
  }
  const SortableController = _controller.default.extend(controllerOpts);
  const addDiscoveryQueryParam = function (p, opts) {
    queryParams[p] = opts;
    const cOpts = {};
    cOpts[p] = null;
    cOpts["queryParams"] = Object.keys(queryParams);
    SortableController.reopen(cOpts);
  };
  _exports.addDiscoveryQueryParam = addDiscoveryQueryParam;
  var _default = SortableController;
  _exports.default = _default;
});