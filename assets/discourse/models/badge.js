define("discourse/models/badge", ["exports", "discourse/models/badge-grouping", "@ember/object", "rsvp", "discourse/models/rest", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/object/computed"], function (_exports, _badgeGrouping, _object, _rsvp, _rest, _ajax, _decorators, _getUrl, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/badge-grouping",0,"@ember/object",0,"rsvp",0,"discourse/models/rest",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Badge = _rest.default.extend((_dec = (0, _decorators.default)("badge_type.name"), (_obj = {
    newBadge: (0, _computed.none)("id"),
    image: (0, _computed.alias)("image_url"),
    url() {
      return (0, _getUrl.default)(`/badges/${this.id}/${this.slug}`);
    },
    updateFromJson(json) {
      if (json.badge) {
        Object.keys(json.badge).forEach(key => this.set(key, json.badge[key]));
      }
      if (json.badge_types) {
        json.badge_types.forEach(badgeType => {
          if (badgeType.id === this.badge_type_id) {
            this.set("badge_type", Object.create(badgeType));
          }
        });
      }
    },
    badgeTypeClassName(type) {
      type = type || "";
      return `badge-type-${type.toLowerCase()}`;
    },
    save(data) {
      let url = "/admin/badges",
        type = "POST";
      if (this.id) {
        // We are updating an existing badge.
        url += `/${this.id}`;
        type = "PUT";
      }
      return (0, _ajax.ajax)(url, {
        type,
        data
      }).then(json => {
        this.updateFromJson(json);
        return this;
      });
    },
    destroy() {
      if (this.newBadge) {
        return _rsvp.Promise.resolve();
      }
      return (0, _ajax.ajax)(`/admin/badges/${this.id}`, {
        type: "DELETE"
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "url", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "badgeTypeClassName", [_dec], Object.getOwnPropertyDescriptor(_obj, "badgeTypeClassName"), _obj)), _obj)));
  Badge.reopenClass({
    createFromJson(json) {
      // Create BadgeType objects.
      const badgeTypes = {};
      if ("badge_types" in json) {
        json.badge_types.forEach(badgeTypeJson => badgeTypes[badgeTypeJson.id] = _object.default.create(badgeTypeJson));
      }
      const badgeGroupings = {};
      if ("badge_groupings" in json) {
        json.badge_groupings.forEach(badgeGroupingJson => badgeGroupings[badgeGroupingJson.id] = _badgeGrouping.default.create(badgeGroupingJson));
      }

      // Create Badge objects.
      let badges = [];
      if ("badge" in json) {
        badges = [json.badge];
      } else if (json.badges) {
        badges = json.badges;
      }
      badges = badges.map(badgeJson => {
        const badge = Badge.create(badgeJson);
        badge.setProperties({
          badge_type: badgeTypes[badge.badge_type_id],
          badge_grouping: badgeGroupings[badge.badge_grouping_id]
        });
        return badge;
      });
      if ("badge" in json) {
        return badges[0];
      } else {
        return badges;
      }
    },
    findAll(opts) {
      let listable = "";
      if (opts && opts.onlyListable) {
        listable = "?only_listable=true";
      }
      return (0, _ajax.ajax)(`/badges.json${listable}`, {
        data: opts
      }).then(badgesJson => Badge.createFromJson(badgesJson));
    },
    findById(id) {
      return (0, _ajax.ajax)(`/badges/${id}`).then(badgeJson => Badge.createFromJson(badgeJson));
    }
  });
  var _default = Badge;
  _exports.default = _default;
});