define("discourse/routes/review-index", ["exports", "discourse/routes/discourse", "@ember/utils", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _discourse, _utils, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"@ember/utils",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model(params) {
      if (params.sort_order === null) {
        if (params.status === "reviewed" || params.status === "all") {
          params.sort_order = "created_at";
        } else {
          params.sort_order = "score";
        }
      }
      return this.store.findAll("reviewable", params);
    },
    setupController(controller, model) {
      let meta = model.resultSetMeta;

      // "fast track" to update the current user's reviewable count before the message bus finds out.
      if (meta.reviewable_count !== undefined) {
        this.currentUser.set("reviewable_count", meta.reviewable_count);
      }
      if (meta.unseen_reviewable_count !== undefined) {
        this.currentUser.set("unseen_reviewable_count", meta.unseen_reviewable_count);
      }
      controller.setProperties({
        reviewables: model,
        type: meta.type,
        filterType: meta.type,
        filterStatus: meta.status,
        filterTopic: meta.topic_id,
        filterCategoryId: meta.category_id,
        filterPriority: meta.priority,
        reviewableTypes: meta.reviewable_types,
        filterUsername: meta.username,
        filterReviewedBy: meta.reviewed_by,
        filterFromDate: (0, _utils.isPresent)(meta.from_date) ? moment(meta.from_date) : null,
        filterToDate: (0, _utils.isPresent)(meta.to_date) ? moment(meta.to_date) : null,
        filterSortOrder: meta.sort_order,
        sort_order: meta.sort_order,
        additionalFilters: meta.additional_filters || {}
      });
      controller.reviewables.setEach("last_performing_username", null);
    },
    activate() {
      this.messageBus.subscribe("/reviewable_claimed", this._updateClaimedBy);
      this.messageBus.subscribe(this._reviewableCountsChannel, this._updateReviewables);
    },
    deactivate() {
      this.messageBus.unsubscribe("/reviewable_claimed", this._updateClaimedBy);
      this.messageBus.unsubscribe(this._reviewableCountsChannel, this._updateReviewables);
    },
    _updateClaimedBy(data) {
      const reviewables = this.controller.reviewables;
      if (reviewables) {
        const user = data.user ? this.store.createRecord("user", data.user) : null;
        reviewables.forEach(reviewable => {
          if (data.topic_id === reviewable.topic.id) {
            reviewable.set("claimed_by", user);
          }
        });
      }
    },
    _updateReviewables(data) {
      if (data.updates) {
        this.controller.reviewables.forEach(reviewable => {
          const updates = data.updates[reviewable.id];
          if (updates) {
            reviewable.setProperties(updates);
          }
        });
      }
    },
    get _reviewableCountsChannel() {
      return this.currentUser.redesigned_user_menu_enabled ? `/reviewable_counts/${this.currentUser.id}` : "/reviewable_counts";
    },
    refreshRoute() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "_updateClaimedBy", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_updateClaimedBy"), _obj), _applyDecoratedDescriptor(_obj, "_updateReviewables", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_updateReviewables"), _obj), _applyDecoratedDescriptor(_obj, "refreshRoute", [_object.action], Object.getOwnPropertyDescriptor(_obj, "refreshRoute"), _obj)), _obj));
  _exports.default = _default;
});