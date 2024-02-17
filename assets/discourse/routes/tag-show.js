define("discourse/routes/tag-show", ["exports", "discourse/routes/build-topic-route", "discourse/controllers/discovery-sortable", "discourse/models/category", "discourse/models/composer", "discourse/routes/discourse", "discourse/mixins/filter-mode", "I18n", "discourse/models/permission-type", "discourse/lib/utilities", "discourse-common/lib/helpers", "discourse/lib/topic-list-tracker", "discourse/lib/show-modal", "@ember/object", "discourse/lib/preload-store", "@ember/service"], function (_exports, _buildTopicRoute, _discoverySortable, _category, _composer, _discourse, _filterMode, _I18n, _permissionType, _utilities, _helpers, _topicListTracker, _showModal, _object, _preloadStore, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-topic-route",0,"discourse/controllers/discovery-sortable",0,"discourse/models/category",0,"discourse/models/composer",0,"discourse/routes/discourse",0,"discourse/mixins/filter-mode",0,"I18n",0,"discourse/models/permission-type",0,"discourse/lib/utilities",0,"discourse-common/lib/helpers",0,"discourse/lib/topic-list-tracker",0,"discourse/lib/show-modal",0,"@ember/object",0,"discourse/lib/preload-store",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const NONE = "none";
  const ALL = "all";
  var _default = _discourse.default.extend(_filterMode.default, (_obj = {
    composer: (0, _service.inject)(),
    navMode: "latest",
    queryParams: _discoverySortable.queryParams,
    controllerName: "tag.show",
    templateName: "tag.show",
    beforeModel() {
      const controller = this.controllerFor("tag.show");
      controller.setProperties({
        loading: true,
        showInfo: false
      });
    },
    async model(params, transition) {
      const tag = this.store.createRecord("tag", {
        id: (0, _utilities.escapeExpression)(params.tag_id)
      });
      let additionalTags;
      if (params.additional_tags) {
        additionalTags = params.additional_tags.split("/").map(t => {
          return this.store.createRecord("tag", {
            id: (0, _utilities.escapeExpression)(t)
          }).id;
        });
      }
      const filterType = this.navMode.split("/")[0];
      let tagNotification;
      if (tag && tag.id !== NONE && this.currentUser) {
        // If logged in, we should get the tag's user settings
        tagNotification = await this.store.find("tagNotification", tag.id.toLowerCase());
      }
      const category = params.category_slug_path_with_id ? _category.default.findBySlugPathWithID(params.category_slug_path_with_id) : null;
      const filteredQueryParams = (0, _buildTopicRoute.filterQueryParams)(transition.to.queryParams, {});
      const topicFilter = this.navMode;
      const tagId = tag ? tag.id.toLowerCase() : NONE;
      let filter;
      if (category) {
        category.setupGroupsAndPermissions();
        filter = `tags/c/${_category.default.slugFor(category)}/${category.id}`;
        if (this.noSubcategories !== undefined) {
          filter += this.noSubcategories ? `/${NONE}` : `/${ALL}`;
        }
        filter += `/${tagId}/l/${topicFilter}`;
      } else if (additionalTags) {
        filter = `tags/intersection/${tagId}/${additionalTags.join("/")}`;
      } else {
        filter = `tag/${tagId}/l/${topicFilter}`;
      }
      if (this.noSubcategories === undefined && category?.default_list_filter === "none" && topicFilter === "latest") {
        // TODO: avoid throwing away preload data by redirecting on the server
        _preloadStore.default.getAndRemove("topic_list");
        return this.replaceWith("tags.showCategoryNone", params.category_slug_path_with_id, tagId);
      }
      const list = await (0, _buildTopicRoute.findTopicList)(this.store, this.topicTrackingState, filter, filteredQueryParams, {
        cached: this.isPoppedState(transition)
      });
      if (list.topic_list.tags && list.topic_list.tags.length === 1) {
        // Update name of tag (case might be different)
        tag.setProperties({
          id: list.topic_list.tags[0].name,
          staff: list.topic_list.tags[0].staff
        });
      }
      (0, _topicListTracker.setTopicList)(list);
      return {
        tag,
        category,
        list,
        additionalTags,
        filterType,
        tagNotification,
        canCreateTopic: list.can_create_topic,
        canCreateTopicOnCategory: category?.permission === _permissionType.default.FULL,
        canCreateTopicOnTag: !tag.staff || this.currentUser?.staff
      };
    },
    setupController(controller, model) {
      const noSubcategories = this.noSubcategories;
      this.controllerFor("tag.show").setProperties({
        model: model.tag,
        ...model,
        period: model.list.for_period,
        navMode: this.navMode,
        noSubcategories,
        loading: false
      });
      if (model.category || model.additionalTags) {
        const tagIntersectionSearchContext = {
          type: "tagIntersection",
          tagId: model.tag.id,
          tag: model.tag,
          additionalTags: model.additionalTags || null,
          categoryId: model.category?.id || null,
          category: model.category || null
        };
        this.searchService.set("searchContext", tagIntersectionSearchContext);
      } else {
        this.searchService.set("searchContext", model.tag.searchContext);
      }
    },
    titleToken() {
      const filterText = _I18n.default.t(`filters.${this.navMode.replace("/", ".")}.title`);
      const controller = this.controllerFor("tag.show");
      if (controller.tag?.id) {
        if (controller.category) {
          return _I18n.default.t("tagging.filters.with_category", {
            filter: filterText,
            tag: controller.tag.id,
            category: controller.category.name
          });
        } else {
          return _I18n.default.t("tagging.filters.without_category", {
            filter: filterText,
            tag: controller.tag.id
          });
        }
      } else {
        if (controller.category) {
          return _I18n.default.t("tagging.filters.untagged_with_category", {
            filter: filterText,
            category: controller.category.name
          });
        } else {
          return _I18n.default.t("tagging.filters.untagged_without_category", {
            filter: filterText
          });
        }
      }
    },
    deactivate() {
      this._super(...arguments);
      this.searchService.set("searchContext", null);
    },
    renameTag(tag) {
      (0, _showModal.default)("rename-tag", {
        model: tag
      });
    },
    createTopic() {
      if (this.currentUser?.has_topic_draft) {
        this.openTopicDraft();
      } else {
        const controller = this.controllerFor("tag.show");
        this.composer.open({
          categoryId: controller.category?.id,
          action: _composer.default.CREATE_TOPIC,
          draftKey: _composer.default.NEW_TOPIC_KEY
        }).then(() => {
          // Pre-fill the tags input field
          if (this.composer.canEditTags && controller.tag?.id) {
            const composerModel = this.composer.model;
            composerModel.set("tags", this._controllerTags(controller));
          }
        });
      }
    },
    dismissReadTopics(dismissTopics) {
      const operationType = dismissTopics ? "topics" : "posts";
      this.send("dismissRead", operationType);
    },
    dismissRead(operationType) {
      const controller = this.controllerFor("tag-show");
      let options = {
        tagName: controller.tag?.id
      };
      const categoryId = controller.category?.id;
      if (categoryId) {
        options = Object.assign({}, options, {
          categoryId,
          includeSubcategories: !controller.noSubcategories
        });
      }
      controller.send("dismissRead", operationType, options);
    },
    resetParams() {
      let skipParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      _discoverySortable.resetParams.call(this, skipParams);
    },
    didTransition() {
      this.controllerFor("tag.show")._showFooter();
      return true;
    },
    _controllerTags(controller) {
      return [controller.get("model.id"), ...(0, _helpers.makeArray)(controller.additionalTags)].filter(Boolean).filter(tag => ![NONE, ALL].includes(tag));
    }
  }, (_applyDecoratedDescriptor(_obj, "renameTag", [_object.action], Object.getOwnPropertyDescriptor(_obj, "renameTag"), _obj), _applyDecoratedDescriptor(_obj, "createTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createTopic"), _obj), _applyDecoratedDescriptor(_obj, "dismissReadTopics", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissReadTopics"), _obj), _applyDecoratedDescriptor(_obj, "dismissRead", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissRead"), _obj), _applyDecoratedDescriptor(_obj, "resetParams", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetParams"), _obj), _applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});