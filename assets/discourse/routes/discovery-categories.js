define("discourse/routes/discovery-categories", ["exports", "discourse/models/category-list", "discourse/routes/discourse", "@ember/object", "I18n", "discourse/mixins/open-composer", "discourse/lib/preload-store", "discourse/models/topic-list", "discourse/lib/ajax", "discourse/lib/utilities", "rsvp", "@ember/runloop", "discourse/lib/show-modal", "discourse/models/session"], function (_exports, _categoryList, _discourse, _object, _I18n, _openComposer, _preloadStore, _topicList, _ajax, _utilities, _rsvp, _runloop, _showModal, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category-list",0,"discourse/routes/discourse",0,"@ember/object",0,"I18n",0,"discourse/mixins/open-composer",0,"discourse/lib/preload-store",0,"discourse/models/topic-list",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"rsvp",0,"@ember/runloop",0,"discourse/lib/show-modal",0,"discourse/models/session"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const DiscoveryCategoriesRoute = _discourse.default.extend(_openComposer.default, (_obj = {
    renderTemplate() {
      this.render("navigation/categories", {
        outlet: "navigation-bar"
      });
      this.render("discovery/categories", {
        outlet: "list-container"
      });
    },
    findCategories() {
      let style = !this.site.mobileView && this.siteSettings.desktop_category_page_style;
      if (style === "categories_and_latest_topics" || style === "categories_and_latest_topics_created_date") {
        return this._findCategoriesAndTopics("latest");
      } else if (style === "categories_and_top_topics") {
        return this._findCategoriesAndTopics("top");
      } else {
        // The server may have serialized this. Based on the logic above, we don't need it
        // so remove it to avoid it being used later by another TopicList route.
        _preloadStore.default.remove("topic_list");
      }
      return _categoryList.default.list(this.store);
    },
    model() {
      return this.findCategories().then(model => {
        const tracking = this.topicTrackingState;
        if (tracking) {
          tracking.sync(model, "categories");
          tracking.trackIncoming("categories");
        }
        return model;
      });
    },
    _loadBefore(store) {
      return function (topic_ids, storeInSession) {
        // refresh dupes
        this.topics.removeObjects(this.topics.filter(topic => topic_ids.includes(topic.id)));
        const url = `/latest.json?topic_ids=${topic_ids.join(",")}`;
        return (0, _ajax.ajax)({
          url,
          data: this.params
        }).then(result => {
          const topicIds = new Set();
          this.topics.forEach(topic => topicIds.add(topic.id));
          let i = 0;
          _topicList.default.topicsFrom(store, result).forEach(topic => {
            if (!topicIds.has(topic.id)) {
              topic.set("highlight", true);
              this.topics.insertAt(i, topic);
              i++;
            }
          });
          if (storeInSession) {
            _session.default.currentProp("topicList", this);
          }
        });
      };
    },
    _findCategoriesAndTopics(filter) {
      return (0, _rsvp.hash)({
        wrappedCategoriesList: _preloadStore.default.getAndRemove("categories_list"),
        topicsList: _preloadStore.default.getAndRemove("topic_list")
      }).then(response => {
        let {
          wrappedCategoriesList,
          topicsList
        } = response;
        let categoriesList = wrappedCategoriesList && wrappedCategoriesList.category_list;
        let store = this.store;
        if (categoriesList && topicsList) {
          if (topicsList.topic_list?.top_tags) {
            this.site.set("top_tags", topicsList.topic_list.top_tags);
          }
          return _object.default.create({
            categories: _categoryList.default.categoriesFrom(this.store, wrappedCategoriesList),
            topics: _topicList.default.topicsFrom(this.store, topicsList),
            can_create_category: categoriesList.can_create_category,
            can_create_topic: categoriesList.can_create_topic,
            loadBefore: this._loadBefore(store)
          });
        }
        // Otherwise, return the ajax result
        return (0, _ajax.ajax)(`/categories_and_${filter}`).then(result => {
          if (result.topic_list?.top_tags) {
            this.site.set("top_tags", result.topic_list.top_tags);
          }
          return _object.default.create({
            categories: _categoryList.default.categoriesFrom(this.store, result),
            topics: _topicList.default.topicsFrom(this.store, result),
            can_create_category: result.category_list.can_create_category,
            can_create_topic: result.category_list.can_create_topic,
            loadBefore: this._loadBefore(store)
          });
        });
      });
    },
    titleToken() {
      if ((0, _utilities.defaultHomepage)() === "categories") {
        return;
      }
      return _I18n.default.t("filters.categories.title");
    },
    setupController(controller, model) {
      controller.set("model", model);
      this.controllerFor("navigation/categories").setProperties({
        showCategoryAdmin: model.get("can_create_category"),
        canCreateTopic: model.get("can_create_topic")
      });
    },
    triggerRefresh() {
      this.refresh();
    },
    createCategory() {
      this.transitionTo("newCategory");
    },
    reorderCategories() {
      (0, _showModal.default)("reorder-categories");
    },
    createTopic() {
      if (this.get("currentUser.has_topic_draft")) {
        this.openTopicDraft();
      } else {
        this.openComposer(this.controllerFor("discovery/categories"));
      }
    },
    didTransition() {
      (0, _runloop.next)(() => this.controllerFor("application").set("showFooter", true));
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj), _applyDecoratedDescriptor(_obj, "createCategory", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createCategory"), _obj), _applyDecoratedDescriptor(_obj, "reorderCategories", [_object.action], Object.getOwnPropertyDescriptor(_obj, "reorderCategories"), _obj), _applyDecoratedDescriptor(_obj, "createTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createTopic"), _obj), _applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  var _default = DiscoveryCategoriesRoute;
  _exports.default = _default;
});