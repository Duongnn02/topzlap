define("discourse/models/invite", ["exports", "@ember/object", "@ember/object/computed", "rsvp", "discourse-common/utils/decorators", "discourse/models/topic", "discourse/models/user", "discourse/lib/ajax", "@ember/utils", "discourse/lib/ajax-error", "discourse/lib/url"], function (_exports, _object, _computed, _rsvp, _decorators, _topic, _user, _ajax, _utils, _ajaxError, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"rsvp",0,"discourse-common/utils/decorators",0,"discourse/models/topic",0,"discourse/models/user",0,"discourse/lib/ajax",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Invite = _object.default.extend((_dec = (0, _decorators.default)("invite_key"), _dec2 = (0, _decorators.default)("groups"), _dec3 = (0, _decorators.default)("topics.firstObject"), _dec4 = (0, _decorators.default)("email", "domain"), (_obj = {
    save(data) {
      const promise = this.id ? (0, _ajax.ajax)(`/invites/${this.id}`, {
        type: "PUT",
        data
      }) : (0, _ajax.ajax)("/invites", {
        type: "POST",
        data
      });
      return promise.then(result => this.setProperties(result));
    },
    destroy() {
      return (0, _ajax.ajax)("/invites", {
        type: "DELETE",
        data: {
          id: this.id
        }
      }).then(() => this.set("destroyed", true));
    },
    reinvite() {
      return (0, _ajax.ajax)("/invites/reinvite", {
        type: "POST",
        data: {
          email: this.email
        }
      }).then(() => this.set("reinvited", true)).catch(_ajaxError.popupAjaxError);
    },
    shortKey(key) {
      return key.slice(0, 4) + "...";
    },
    groupIds(groups) {
      return groups ? groups.map(group => group.id) : [];
    },
    topic(topicData) {
      return topicData ? _topic.default.create(topicData) : null;
    },
    emailOrDomain(email, domain) {
      return email || domain;
    },
    topicId: (0, _computed.alias)("topics.firstObject.id"),
    topicTitle: (0, _computed.alias)("topics.firstObject.title")
  }, (_applyDecoratedDescriptor(_obj, "shortKey", [_dec], Object.getOwnPropertyDescriptor(_obj, "shortKey"), _obj), _applyDecoratedDescriptor(_obj, "groupIds", [_dec2], Object.getOwnPropertyDescriptor(_obj, "groupIds"), _obj), _applyDecoratedDescriptor(_obj, "topic", [_dec3], Object.getOwnPropertyDescriptor(_obj, "topic"), _obj), _applyDecoratedDescriptor(_obj, "emailOrDomain", [_dec4], Object.getOwnPropertyDescriptor(_obj, "emailOrDomain"), _obj)), _obj)));
  Invite.reopenClass({
    create() {
      const result = this._super.apply(this, arguments);
      if (result.user) {
        result.user = _user.default.create(result.user);
      }
      return result;
    },
    findInvitedBy(user, filter, search, offset) {
      if (!user) {
        _rsvp.Promise.resolve();
      }
      const data = {};
      if (!(0, _utils.isNone)(filter)) {
        data.filter = filter;
      }
      if (!(0, _utils.isNone)(search)) {
        data.search = search;
      }
      data.offset = offset || 0;
      return (0, _ajax.ajax)((0, _url.userPath)(`${user.username_lower}/invited.json`), {
        data
      }).then(result => {
        result.invites = result.invites.map(i => Invite.create(i));
        return _object.default.create(result);
      });
    },
    reinviteAll() {
      return (0, _ajax.ajax)("/invites/reinvite-all", {
        type: "POST"
      });
    },
    destroyAllExpired() {
      return (0, _ajax.ajax)("/invites/destroy-all-expired", {
        type: "POST"
      });
    }
  });
  var _default = Invite;
  _exports.default = _default;
});