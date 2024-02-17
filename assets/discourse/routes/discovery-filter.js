define("discourse/routes/discovery-filter", ["exports", "I18n", "discourse/routes/discourse", "@ember/object"], function (_exports, _I18n, _discourse, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class2;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/routes/discourse",0,"@ember/object"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let _class = (_class2 = class _class2 extends _discourse.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "queryParams", {
        q: {
          replace: true,
          refreshModel: true
        }
      });
    }
    model(data) {
      return this.store.findFiltered("topicList", {
        filter: "filter",
        params: {
          q: data.q
        }
      });
    }
    titleToken() {
      const filterText = _I18n.default.t("filters.filter.title");
      return _I18n.default.t("filters.with_topics", {
        filter: filterText
      });
    }
    setupController(_controller, model) {
      this.controllerFor("discovery/topics").setProperties({
        model
      });
    }
    renderTemplate() {
      this.render("navigation/filter", {
        outlet: "navigation-bar"
      });
      this.render("discovery/topics", {
        controller: "discovery/topics",
        outlet: "list-container"
      });
    }

    // TODO(tgxworld): This action is required by the `discovery/topics` controller which is not necessary for this route.
    // Figure out a way to remove this.
    changeSort() {}
  }, (_applyDecoratedDescriptor(_class2.prototype, "changeSort", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeSort"), _class2.prototype)), _class2);
  _exports.default = _class;
});