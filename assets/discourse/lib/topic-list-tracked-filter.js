define("discourse/lib/topic-list-tracked-filter", ["exports", "discourse/models/site", "discourse/models/user"], function (_exports, _site, _user) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.TRACKED_QUERY_PARAM_VALUE = void 0;
  _exports.hasTrackedFilter = hasTrackedFilter;
  _exports.isTrackedTopic = isTrackedTopic;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/site",0,"discourse/models/user"eaimeta@70e063a35619d71f
  const TRACKED_QUERY_PARAM_VALUE = "tracked";
  _exports.TRACKED_QUERY_PARAM_VALUE = TRACKED_QUERY_PARAM_VALUE;
  function hasTrackedFilter(queryParams) {
    if (!queryParams) {
      return false;
    }
    return queryParams.f === TRACKED_QUERY_PARAM_VALUE || queryParams.filter === TRACKED_QUERY_PARAM_VALUE;
  }

  /**
   * Logic here needs to be in sync with `TopicQuery#tracked_filter` on the server side. See `TopicQuery#tracked_filter`
   * for the rational behind this decision.
   */
  function isTrackedTopic(topic) {
    if (topic.category_id) {
      const categories = _site.default.current().trackedCategoriesList;
      for (const category of categories) {
        if (category.id === topic.category_id) {
          return true;
        }
        if (category.subcategories && category.subcategories.some(subCategory => {
          if (subCategory.id === topic.category_id) {
            return true;
          }
          if (subCategory.subcategories && subCategory.subcategories.some(c => {
            return c.id === topic.category_id;
          })) {
            return true;
          }
        })) {
          return true;
        }
      }
    }
    if (topic.tags) {
      const tags = _user.default.current().trackedTags;
      for (const tag of tags) {
        if (topic.tags.includes(tag)) {
          return true;
        }
      }
    }
    return false;
  }
});