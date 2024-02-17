define("discourse/controllers/review-index", ["exports", "@ember/controller", "I18n", "discourse-common/utils/decorators", "@ember/utils", "@ember/runloop", "@ember/string"], function (_exports, _controller, _I18n, _decorators, _utils, _runloop, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"@ember/runloop",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("reviewableTypes"), _dec2 = (0, _decorators.default)("filtersExpanded"), (_obj = {
    queryParams: ["priority", "type", "status", "category_id", "topic_id", "username", "reviewed_by", "from_date", "to_date", "sort_order", "additional_filters"],
    type: null,
    status: "pending",
    priority: "low",
    category_id: null,
    reviewables: null,
    topic_id: null,
    filtersExpanded: false,
    username: "",
    reviewed_by: "",
    from_date: null,
    to_date: null,
    sort_order: null,
    additional_filters: null,
    init() {
      this._super(...arguments);
      this.set("priority", this.siteSettings.reviewable_default_visibility);
      this.set("filtersExpanded", !this.site.mobileView);
    },
    allTypes() {
      return (this.reviewableTypes || []).map(type => {
        const translationKey = (0, _string.underscore)(type).replace(/[^\w]+/g, "_");
        return {
          id: type,
          name: _I18n.default.t(`review.types.${translationKey}.title`)
        };
      });
    },
    priorities() {
      return ["any", "low", "medium", "high"].map(priority => {
        return {
          id: priority,
          name: _I18n.default.t(`review.filters.priority.${priority}`)
        };
      });
    },
    sortOrders() {
      return ["score", "score_asc", "created_at", "created_at_asc"].map(order => {
        return {
          id: order,
          name: _I18n.default.t(`review.filters.orders.${order}`)
        };
      });
    },
    statuses() {
      return ["pending", "approved", "rejected", "deleted", "ignored", "reviewed", "all"].map(id => {
        return {
          id,
          name: _I18n.default.t(`review.statuses.${id}.title`)
        };
      });
    },
    toggleFiltersIcon(filtersExpanded) {
      return filtersExpanded ? "chevron-up" : "chevron-down";
    },
    setRange(range) {
      this.setProperties(range);
    },
    refreshModel() {
      (0, _runloop.next)(() => this.send("refreshRoute"));
    },
    actions: {
      remove(ids) {
        if (!ids) {
          return;
        }
        let newList = this.reviewables.reject(reviewable => {
          return ids.includes(reviewable.id);
        });
        if (newList.length === 0) {
          this.refreshModel();
        } else {
          this.reviewables.setObjects(newList);
        }
      },
      resetTopic() {
        this.set("topic_id", null);
        this.refreshModel();
      },
      refresh() {
        const currentStatus = this.status;
        const nextStatus = this.filterStatus;
        const currentOrder = this.sort_order;
        let nextOrder = this.filterSortOrder;
        const createdAtStatuses = ["reviewed", "all"];
        const priorityStatuses = ["approved", "rejected", "deleted", "ignored", "pending"];
        if (createdAtStatuses.includes(currentStatus) && currentOrder === "created_at" && priorityStatuses.includes(nextStatus) && nextOrder === "created_at") {
          nextOrder = "score";
        }
        if (priorityStatuses.includes(currentStatus) && currentOrder === "score" && createdAtStatuses.includes(nextStatus) && nextOrder === "score") {
          nextOrder = "created_at";
        }
        this.setProperties({
          type: this.filterType,
          priority: this.filterPriority,
          status: this.filterStatus,
          category_id: this.filterCategoryId,
          username: this.filterUsername,
          reviewed_by: this.filterReviewedBy,
          from_date: (0, _utils.isPresent)(this.filterFromDate) ? this.filterFromDate.toISOString(true).split("T")[0] : null,
          to_date: (0, _utils.isPresent)(this.filterToDate) ? this.filterToDate.toISOString(true).split("T")[0] : null,
          sort_order: nextOrder,
          additional_filters: JSON.stringify(this.additionalFilters)
        });
        this.refreshModel();
      },
      loadMore() {
        return this.reviewables.loadMore();
      },
      toggleFilters() {
        this.toggleProperty("filtersExpanded");
      },
      updateFilterReviewedBy(selected) {
        this.set("filterReviewedBy", selected.firstObject);
      },
      updateFilterUsername(selected) {
        this.set("filterUsername", selected.firstObject);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "allTypes", [_dec], Object.getOwnPropertyDescriptor(_obj, "allTypes"), _obj), _applyDecoratedDescriptor(_obj, "priorities", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "priorities"), _obj), _applyDecoratedDescriptor(_obj, "sortOrders", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "sortOrders"), _obj), _applyDecoratedDescriptor(_obj, "statuses", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "statuses"), _obj), _applyDecoratedDescriptor(_obj, "toggleFiltersIcon", [_dec2], Object.getOwnPropertyDescriptor(_obj, "toggleFiltersIcon"), _obj)), _obj)));
  _exports.default = _default;
});