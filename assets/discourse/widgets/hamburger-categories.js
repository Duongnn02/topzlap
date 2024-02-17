define("discourse/widgets/hamburger-categories", ["exports", "discourse/models/category", "I18n", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse/lib/formatter"], function (_exports, _category, _I18n, _widget, _getUrl, _virtualDom, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"I18n",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("hamburger-category", {
    tagName: "li.category-link",
    html(c) {
      if (c.parent_category_id) {
        this.tagName += ".subcategory";
      }
      this.tagName += ".category-" + _category.default.slugFor(c, "-");
      const results = [this.attach("category-link", {
        category: c,
        allowUncategorized: true
      })];
      const unreadTotal = parseInt(c.get("unreadTopics"), 10) + parseInt(c.get("newTopics"), 10);
      if (unreadTotal) {
        results.push((0, _virtualDom.h)("a.badge.badge-notification", {
          attributes: {
            href: c.get("url")
          }
        }, (0, _formatter.number)(unreadTotal)));
      }
      if (!this.currentUser) {
        let count;
        if (c.get("show_subcategory_list")) {
          count = c.get("totalTopicCount");
        } else {
          count = c.get("topic_count");
        }
        results.push((0, _virtualDom.h)("b.topics-count", (0, _formatter.number)(count)));
      }
      return results;
    }
  });
  var _default = (0, _widget.createWidget)("hamburger-categories", {
    tagName: "ul.category-links.clearfix",
    html(attrs) {
      const href = (0, _getUrl.default)("/categories");
      let title = _I18n.default.t("filters.categories.title");
      if (attrs.moreCount > 0) {
        title = _I18n.default.t("categories.n_more", {
          count: attrs.moreCount
        });
      }
      let result = [(0, _virtualDom.h)("li.heading", (0, _virtualDom.h)("a.d-link.categories-link", {
        attributes: {
          href
        }
      }, title))];
      const categories = attrs.categories;
      if (categories.length === 0) {
        return;
      }
      result = result.concat(categories.map(c => this.attach("hamburger-category", c)));
      return result;
    }
  });
  _exports.default = _default;
});