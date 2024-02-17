define("discourse/controllers/reorder-categories", ["exports", "discourse-common/utils/decorators", "ember-buffered-proxy/proxy", "@ember/controller", "@ember/object/evented", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/ajax-error", "@ember/object/computed"], function (_exports, _decorators, _proxy, _controller, _evented, _modalFunctionality, _ajax, _ajaxError, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"ember-buffered-proxy/proxy",0,"@ember/controller",0,"@ember/object/evented",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, _evented.default, (_dec = (0, _decorators.default)("site.categories.[]"), _dec2 = (0, _decorators.on)("init"), (_obj = {
    init() {
      this._super(...arguments);
      this.categoriesSorting = ["position"];
    },
    categoriesBuffered(categories) {
      return (categories || []).map(c => _proxy.default.create({
        content: c
      }));
    },
    categoriesOrdered: (0, _computed.sort)("categoriesBuffered", "categoriesSorting"),
    reorder() {
      const reorderChildren = (categoryId, depth, index) => {
        this.categoriesOrdered.forEach(category => {
          if (categoryId === null && !category.get("parent_category_id") || category.get("parent_category_id") === categoryId) {
            category.setProperties({
              depth,
              position: index++
            });
            index = reorderChildren(category.get("id"), depth + 1, index);
          }
        });
        return index;
      };
      reorderChildren(null, 0, 0);
      this.categoriesBuffered.forEach(bc => {
        if (bc.get("hasBufferedChanges")) {
          bc.applyBufferedChanges();
        }
      });
      this.notifyPropertyChange("categoriesBuffered");
    },
    countDescendants(category) {
      return category.get("subcategories") ? category.get("subcategories").reduce((count, subcategory) => count + this.countDescendants(subcategory), category.get("subcategories").length) : 0;
    },
    move(category, direction) {
      let targetPosition = category.get("position") + direction;

      // Adjust target position for sub-categories
      if (direction > 0) {
        // Moving down (position gets larger)
        if (category.get("isParent")) {
          // This category has subcategories, adjust targetPosition to account for them
          let offset = this.countDescendants(category);
          if (direction <= offset) {
            // Only apply offset if target position is occupied by a subcategory
            // Seems weird but fixes a UX quirk
            targetPosition += offset;
          }
        }
      } else {
        // Moving up (position gets smaller)
        const otherCategory = this.categoriesOrdered.find(c =>
        // find category currently at targetPosition
        c.get("position") === targetPosition);
        if (otherCategory && otherCategory.get("ancestors")) {
          // Target category is a subcategory, adjust targetPosition to account for ancestors
          const highestAncestor = otherCategory.get("ancestors").reduce((current, min) => current.get("position") < min.get("position") ? current : min);
          targetPosition = highestAncestor.get("position");
        }
      }

      // Adjust target position for range bounds
      if (targetPosition >= this.categoriesOrdered.length) {
        // Set to max
        targetPosition = this.categoriesOrdered.length - 1;
      } else if (targetPosition < 0) {
        // Set to min
        targetPosition = 0;
      }

      // Update other categories between current and target position
      this.categoriesOrdered.map(c => {
        if (direction < 0) {
          // Moving up (position gets smaller)
          if (c.get("position") < category.get("position") && c.get("position") >= targetPosition) {
            const newPosition = c.get("position") + 1;
            c.set("position", newPosition);
          }
        } else {
          // Moving down (position gets larger)
          if (c.get("position") > category.get("position") && c.get("position") <= targetPosition) {
            const newPosition = c.get("position") - 1;
            c.set("position", newPosition);
          }
        }
      });

      // Update this category's position to target position
      category.set("position", targetPosition);
      this.reorder();
    },
    actions: {
      change(category, event) {
        let newPosition = parseFloat(event.target.value);
        newPosition = newPosition < category.get("position") ? Math.ceil(newPosition) : Math.floor(newPosition);
        const direction = newPosition - category.get("position");
        this.move(category, direction);
      },
      moveUp(category) {
        this.move(category, -1);
      },
      moveDown(category) {
        this.move(category, 1);
      },
      save() {
        this.reorder();
        const data = {};
        this.categoriesBuffered.forEach(cat => {
          data[cat.get("id")] = cat.get("position");
        });
        (0, _ajax.ajax)("/categories/reorder", {
          type: "POST",
          data: {
            mapping: JSON.stringify(data)
          }
        }).then(() => window.location.reload()).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "categoriesBuffered", [_dec], Object.getOwnPropertyDescriptor(_obj, "categoriesBuffered"), _obj), _applyDecoratedDescriptor(_obj, "reorder", [_dec2], Object.getOwnPropertyDescriptor(_obj, "reorder"), _obj)), _obj)));
  _exports.default = _default;
});