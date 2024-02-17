define("discourse/widgets/private-message-map", ["exports", "discourse/widgets/post", "I18n", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/helpers"], function (_exports, _post, _I18n, _widget, _getUrl, _virtualDom, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/post",0,"I18n",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse/widgets/hbs-compiler",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("pm-remove-group-link", {
    tagName: "a.remove-invited.no-text.btn-icon.btn",
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push(__h1("times"));
      return _r;
    },
    services: ["dialog"],
    click() {
      this.dialog.deleteConfirm({
        message: _I18n.default.t("private_message_info.remove_allowed_group", {
          name: this.attrs.name
        }),
        confirmButtonLabel: "private_message_info.remove_group",
        didConfirm: () => this.sendWidgetAction("removeAllowedGroup", this.attrs)
      });
    }
  });
  (0, _widget.createWidget)("pm-map-user-group", {
    tagName: "div.user.group",
    transform(attrs) {
      return {
        href: (0, _getUrl.default)(`/g/${attrs.group.name}`)
      };
    },
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push("\n    ");
      var _a0 = [];
      _a0.push("\n      ");
      _a0.push(__h1("users"));
      _a0.push("\n      ");
      var _a1 = [];
      _a1.push(attrs.group.name);
      _a0.push(virtualDom.h('span', {
        "className": "group-name",
        "attributes": {}
      }, _a1));
      _a0.push("\n    ");
      _r.push(virtualDom.h('a', {
        "className": "group-link",
        "attributes": {
          "href": this.transformed.href
        }
      }, _a0));
      _r.push("\n");
      if (attrs.isEditing) {
        if (attrs.canRemoveAllowedUsers) {
          _r.push("        ");
          _r.push(this.attach("pm-remove-group-link", attrs.group));
          _r.push("\n");
        }
      }
      _r.push("  ");
      return _r;
    }
  });
  (0, _widget.createWidget)("pm-remove-link", {
    tagName: "a.remove-invited.no-text.btn-icon.btn",
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push(__h1("times"));
      return _r;
    },
    services: ["dialog"],
    click() {
      const messageKey = this.attrs.isCurrentUser ? "leave_message" : "remove_allowed_user";
      this.dialog.deleteConfirm({
        message: _I18n.default.t(`private_message_info.${messageKey}`, {
          name: this.attrs.user.username
        }),
        confirmButtonLabel: this.attrs.isCurrentUser ? "private_message_info.leave" : "private_message_info.remove_user",
        didConfirm: () => this.sendWidgetAction("removeAllowedUser", this.attrs.user)
      });
    }
  });
  (0, _widget.createWidget)("pm-map-user", {
    tagName: "div.user",
    html(attrs) {
      const user = attrs.user;
      const username = (0, _virtualDom.h)("span.username", user.username);
      let link;
      if (this.site && this.site.mobileView) {
        const avatar = (0, _post.avatarImg)("tiny", {
          template: user.avatar_template,
          username: user.username
        });
        link = (0, _virtualDom.h)("a", {
          attributes: {
            href: user.get("path")
          }
        }, [avatar, username]);
      } else {
        const avatar = (0, _post.avatarFor)("tiny", {
          template: user.avatar_template,
          username: user.username
        });
        link = (0, _virtualDom.h)("a", {
          attributes: {
            class: "user-link",
            href: user.get("path")
          }
        }, [avatar, username]);
      }
      const result = [link];
      const isCurrentUser = attrs.canRemoveSelfId === user.get("id");
      if (attrs.isEditing && (attrs.canRemoveAllowedUsers || isCurrentUser)) {
        result.push(this.attach("pm-remove-link", {
          user,
          isCurrentUser
        }));
      }
      return result;
    }
  });
  var _default = (0, _widget.createWidget)("private-message-map", {
    tagName: "section.information.private-message-map",
    buildKey: attrs => `private-message-map-${attrs.id}`,
    defaultState() {
      return {
        isEditing: false
      };
    },
    html(attrs) {
      const participants = [];
      if (attrs.allowedGroups.length) {
        participants.push(attrs.allowedGroups.map(group => {
          return this.attach("pm-map-user-group", {
            group,
            canRemoveAllowedUsers: attrs.canRemoveAllowedUsers,
            isEditing: this.state.isEditing
          });
        }));
      }
      if (attrs.allowedUsers.length) {
        participants.push(attrs.allowedUsers.map(au => {
          return this.attach("pm-map-user", {
            user: au,
            canRemoveAllowedUsers: attrs.canRemoveAllowedUsers,
            canRemoveSelfId: attrs.canRemoveSelfId,
            isEditing: this.state.isEditing
          });
        }));
      }
      let hideNamesClass = "";
      if (!this.state.isEditing && this.site.mobileView && (0, _helpers.makeArray)(participants[0]).length > 4) {
        hideNamesClass = ".hide-names";
      }
      const result = [(0, _virtualDom.h)(`div.participants${hideNamesClass}`, participants)];
      const controls = [];
      const canRemove = attrs.canRemoveAllowedUsers || attrs.canRemoveSelfId;
      if (attrs.canInvite || canRemove) {
        let key;
        let action = "toggleEditing";
        if (attrs.canInvite && canRemove) {
          key = "edit";
        } else if (!attrs.canInvite && canRemove) {
          key = "remove";
        } else {
          key = "add";
          action = "showInvite";
        }
        controls.push(this.attach("button", {
          action,
          label: `private_message_info.${key}`,
          className: "btn btn-default add-remove-participant-btn"
        }));
      }
      if (attrs.canInvite && this.state.isEditing) {
        controls.push(this.attach("button", {
          action: "showInvite",
          icon: "plus",
          className: "btn btn-default no-text btn-icon"
        }));
      }
      if (controls.length) {
        result.push((0, _virtualDom.h)("div.controls", controls));
      }
      return result;
    },
    toggleEditing() {
      this.state.isEditing = !this.state.isEditing;
    }
  });
  _exports.default = _default;
});