define("discourse/controllers/group-manage", ["exports", "@ember/controller", "discourse-common/utils/decorators"], function (_exports, _controller, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.automatic"), (_obj = {
    tabs(automatic) {
      const defaultTabs = [{
        route: "group.manage.profile",
        title: "groups.manage.profile.title"
      }, {
        route: "group.manage.interaction",
        title: "groups.manage.interaction.title"
      }, {
        route: "group.manage.categories",
        title: "groups.manage.categories.title"
      }];
      if (this.siteSettings.tagging_enabled) {
        defaultTabs.push({
          route: "group.manage.tags",
          title: "groups.manage.tags.title"
        });
      }
      defaultTabs.push({
        route: "group.manage.logs",
        title: "groups.manage.logs.title"
      });
      if (!automatic) {
        if (this.siteSettings.enable_smtp) {
          defaultTabs.splice(2, 0, {
            route: "group.manage.email",
            title: "groups.manage.email.title"
          });
        }
        defaultTabs.splice(1, 0, {
          route: "group.manage.membership",
          title: "groups.manage.membership.title"
        });
      }
      return defaultTabs;
    }
  }, (_applyDecoratedDescriptor(_obj, "tabs", [_dec], Object.getOwnPropertyDescriptor(_obj, "tabs"), _obj)), _obj)));
  _exports.default = _default;
});