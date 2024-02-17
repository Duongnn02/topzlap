define("discourse/routes/new-topic", ["exports", "discourse/models/category", "discourse/routes/discourse", "discourse/lib/cookie", "@ember/runloop"], function (_exports, _category, _discourse, _cookie, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"discourse/routes/discourse",0,"discourse/lib/cookie",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel(transition) {
      if (this.currentUser) {
        let category, categoryId;
        if (transition.to.queryParams.category_id) {
          categoryId = transition.to.queryParams.category_id;
          category = _category.default.findById(categoryId);
        } else if (transition.to.queryParams.category) {
          const splitCategory = transition.to.queryParams.category.split("/");
          category = this._getCategory(splitCategory[0], splitCategory[1], "nameLower");
          if (!category) {
            category = this._getCategory(splitCategory[0], splitCategory[1], "slug");
          }
          if (category) {
            categoryId = category.id;
          }
        }
        if (category) {
          let route = "discovery.category";
          let params = {
            category,
            id: category.id
          };
          this.replaceWith(route, params).then(e => {
            if (this.controllerFor("navigation/category").canCreateTopic) {
              this._sendTransition(e, transition, categoryId);
            }
          });
        } else {
          this.replaceWith("discovery.latest").then(e => {
            if (this.controllerFor("navigation/default").canCreateTopic) {
              this._sendTransition(e, transition);
            }
          });
        }
      } else {
        // User is not logged in
        (0, _cookie.default)("destination_url", window.location.href);
        this.replaceWith("login");
      }
    },
    _sendTransition(event, transition, categoryId) {
      (0, _runloop.next)(() => {
        event.send("createNewTopicViaParams", transition.to.queryParams.title, transition.to.queryParams.body, categoryId, transition.to.queryParams.tags);
      });
    },
    _getCategory(mainCategory, subCategory, type) {
      let category;
      if (!subCategory) {
        category = this.site.categories.findBy(type, mainCategory.toLowerCase());
      } else {
        const categories = this.site.categories;
        const main = categories.findBy(type, mainCategory.toLowerCase());
        if (main) {
          category = categories.find(item => {
            return item && item[type] === subCategory.toLowerCase() && item.parent_category_id === main.id;
          });
        }
      }
      return category;
    }
  });
  _exports.default = _default;
});