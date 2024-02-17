define("discourse/routes/build-category-route", ["exports", "rsvp", "discourse/controllers/discovery-sortable", "discourse/routes/build-topic-route", "discourse/models/category", "discourse/models/category-list", "discourse/routes/discourse", "I18n", "discourse/models/permission-type", "discourse/models/topic-list", "@ember/object", "discourse/lib/preload-store", "@ember/service"], function (_exports, _rsvp, _discoverySortable, _buildTopicRoute, _category, _categoryList, _discourse, _I18n, _permissionType, _topicList, _object, _preloadStore, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"rsvp",0,"discourse/controllers/discovery-sortable",0,"discourse/routes/build-topic-route",0,"discourse/models/category",0,"discourse/models/category-list",0,"discourse/routes/discourse",0,"I18n",0,"discourse/models/permission-type",0,"discourse/models/topic-list",0,"@ember/object",0,"discourse/lib/preload-store",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // A helper function to create a category route with parameters
  var _default = (filterArg, params) => {
    var _obj;
    return _discourse.default.extend((_obj = {
      queryParams: _discoverySortable.queryParams,
      composer: (0, _service.inject)(),
      model(modelParams) {
        const category = _category.default.findBySlugPathWithID(modelParams.category_slug_path_with_id);
        if (!category) {
          const parts = modelParams.category_slug_path_with_id.split("/");
          if (parts.length > 0 && parts[parts.length - 1].match(/^\d+$/)) {
            parts.pop();
          }
          return _category.default.reloadBySlugPath(parts.join("/")).then(result => {
            const record = this.store.createRecord("category", result.category);
            record.setupGroupsAndPermissions();
            this.site.updateCategory(record);
            return {
              category: record,
              modelParams
            };
          });
        }
        if (category) {
          return {
            category,
            modelParams
          };
        }
      },
      afterModel(model, transition) {
        if (!model) {
          this.replaceWith("/404");
          return;
        }
        const {
          category,
          modelParams
        } = model;
        if ((!params || params.no_subcategories === undefined) && category.default_list_filter === "none" && filterArg === "default" && modelParams) {
          // TODO: avoid throwing away preload data by redirecting on the server
          _preloadStore.default.getAndRemove("topic_list");
          return this.replaceWith("discovery.categoryNone", modelParams.category_slug_path_with_id);
        }
        this._setupNavigation(category);
        return (0, _rsvp.all)([this._createSubcategoryList(category), this._retrieveTopicList(category, transition, modelParams)]);
      },
      filter(category) {
        return filterArg === "default" ? category.get("default_view") || "latest" : filterArg;
      },
      _setupNavigation(category) {
        const noSubcategories = params && !!params.no_subcategories,
          filterType = this.filter(category).split("/")[0];
        this.controllerFor("navigation/category").setProperties({
          category,
          filterType,
          noSubcategories
        });
      },
      _createSubcategoryList(category) {
        this._categoryList = null;
        if (category.isParent && category.show_subcategory_list) {
          return _categoryList.default.listForParent(this.store, category).then(list => this._categoryList = list);
        }

        // If we're not loading a subcategory list just resolve
        return _rsvp.Promise.resolve();
      },
      _retrieveTopicList(category, transition, modelParams) {
        const findOpts = (0, _buildTopicRoute.filterQueryParams)(modelParams, params);
        const extras = {
          cached: this.isPoppedState(transition)
        };
        let listFilter = `c/${_category.default.slugFor(category)}/${category.id}`;
        if (findOpts.no_subcategories) {
          listFilter += "/none";
        }
        listFilter += `/l/${this.filter(category)}`;
        return (0, _buildTopicRoute.findTopicList)(this.store, this.topicTrackingState, listFilter, findOpts, extras).then(list => {
          _topicList.default.hideUniformCategory(list, category);
          this.set("topics", list);
          return list;
        });
      },
      titleToken() {
        const category = this.currentModel.category;
        const filterText = _I18n.default.t("filters." + this.filter(category).replace("/", ".") + ".title");
        let categoryName = category.name;
        if (category.parent_category_id) {
          const list = _category.default.list();
          const parentCategory = list.findBy("id", category.parent_category_id);
          categoryName = `${parentCategory.name}/${categoryName}`;
        }
        return _I18n.default.t("filters.with_category", {
          filter: filterText,
          category: categoryName
        });
      },
      setupController(controller, model) {
        const topics = this.topics,
          category = model.category,
          canCreateTopic = topics.get("can_create_topic"),
          canCreateTopicOnCategory = canCreateTopic && category.get("permission") === _permissionType.default.FULL;
        this.controllerFor("navigation/category").setProperties({
          canCreateTopicOnCategory,
          cannotCreateTopicOnCategory: !canCreateTopicOnCategory,
          canCreateTopic
        });
        let topicOpts = {
          model: topics,
          category,
          period: topics.get("for_period") || model.modelParams && model.modelParams.period,
          selected: [],
          noSubcategories: params && !!params.no_subcategories,
          expandAllPinned: true,
          canCreateTopic,
          canCreateTopicOnCategory
        };
        const p = category.get("params");
        if (p && Object.keys(p).length) {
          if (p.order !== undefined) {
            topicOpts.order = p.order;
          }
          if (p.ascending !== undefined) {
            topicOpts.ascending = p.ascending;
          }
        }
        this.controllerFor("discovery/topics").setProperties(topicOpts);
        this.searchService.set("searchContext", category.get("searchContext"));
        this.set("topics", null);
      },
      renderTemplate() {
        this.render("navigation/category", {
          outlet: "navigation-bar"
        });
        if (this._categoryList) {
          this.render("discovery/categories", {
            outlet: "header-list-container",
            model: this._categoryList
          });
        } else {
          this.disconnectOutlet({
            outlet: "header-list-container"
          });
        }
        this.render("discovery/topics", {
          controller: "discovery/topics",
          outlet: "list-container"
        });
      },
      deactivate() {
        this._super(...arguments);
        this.composer.set("prioritizedCategoryId", null);
        this.searchService.set("searchContext", null);
      },
      setNotification(notification_level) {
        this.currentModel.setNotification(notification_level);
      },
      triggerRefresh() {
        this.refresh();
      },
      changeSort(sortBy) {
        _discoverySortable.changeSort.call(this, sortBy);
      },
      resetParams() {
        let skipParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        _discoverySortable.resetParams.call(this, skipParams);
      }
    }, (_applyDecoratedDescriptor(_obj, "setNotification", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setNotification"), _obj), _applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj), _applyDecoratedDescriptor(_obj, "changeSort", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeSort"), _obj), _applyDecoratedDescriptor(_obj, "resetParams", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetParams"), _obj)), _obj));
  };
  _exports.default = _default;
});