define("discourse/controllers/badges/index", ["exports", "@ember/controller", "discourse-common/utils/decorators"], function (_exports, _controller, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function badgeKey(badge) {
    let pos = badge.get("badge_grouping.position");
    let type = badge.get("badge_type_id");
    let name = badge.get("name");
    return ("000" + pos).slice(-4) + (10 - type) + name;
  }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model"), (_obj = {
    badgeGroups(model) {
      let sorted = model.sort((a, b) => badgeKey(a).localeCompare(badgeKey(b)));
      let grouped = [];
      let group = [];
      let groupId;
      sorted.forEach(function (badge) {
        if (groupId !== badge.badge_grouping_id) {
          if (group && group.length > 0) {
            grouped.push({
              badges: group,
              badgeGrouping: group[0].badge_grouping
            });
          }
          group = [];
          groupId = badge.badge_grouping_id;
        }
        group.push(badge);
      });
      if (group && group.length > 0) {
        grouped.push({
          badges: group,
          badgeGrouping: group[0].badge_grouping
        });
      }
      return grouped;
    }
  }, (_applyDecoratedDescriptor(_obj, "badgeGroups", [_dec], Object.getOwnPropertyDescriptor(_obj, "badgeGroups"), _obj)), _obj)));
  _exports.default = _default;
});