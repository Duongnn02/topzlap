define("discourse/routes/about", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/ajax", "@ember/object"], function (_exports, _discourse, _I18n, _ajax, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/ajax",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model() {
      return (0, _ajax.ajax)("/about.json").then(result => {
        let activeAdmins = [];
        let activeModerators = [];
        const yearAgo = moment().locale("en").utc().subtract(1, "year");
        result.about.admins.forEach(r => {
          if (moment(r.last_seen_at) > yearAgo) {
            activeAdmins.push(r);
          }
        });
        result.about.moderators.forEach(r => {
          if (moment(r.last_seen_at) > yearAgo) {
            activeModerators.push(r);
          }
        });
        result.about.admins = activeAdmins;
        result.about.moderators = activeModerators;
        const {
          category_moderators: categoryModerators
        } = result.about;
        if (categoryModerators && categoryModerators.length) {
          categoryModerators.forEach((obj, index) => {
            const category = this.site.categories.findBy("id", obj.category_id);
            result.about.category_moderators[index].category = category;
          });
        }
        return result.about;
      });
    },
    titleToken() {
      return _I18n.default.t("about.simple_title");
    },
    didTransition() {
      this.controllerFor("application").set("showFooter", true);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});