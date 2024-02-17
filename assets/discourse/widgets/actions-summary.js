define("discourse/widgets/actions-summary", ["exports", "I18n", "discourse/widgets/post", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse/lib/url"], function (_exports, _I18n, _post, _widget, _getUrl, _virtualDom, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.smallUserAtts = smallUserAtts;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/post",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse/widgets/hbs-compiler",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function smallUserAtts(user) {
    return {
      template: user.avatar_template,
      username: user.username,
      post_url: user.post_url,
      url: (0, _url.userPath)(user.username_lower),
      unknown: user.unknown
    };
  }
  (0, _widget.createWidget)("small-user-list", {
    tagName: "div.clearfix.small-user-list",
    buildClasses(atts) {
      return atts.listClassName;
    },
    buildAttributes(attrs) {
      const attributes = {
        role: "list"
      };
      if (attrs.ariaLabel) {
        attributes["aria-label"] = attrs.ariaLabel;
      }
      return attributes;
    },
    html(atts) {
      let users = atts.users;
      if (users) {
        const currentUser = this.currentUser;
        if (atts.addSelf && !users.some(u => u.username === currentUser.username)) {
          users = users.concat(smallUserAtts(currentUser));
        }
        let description = null;
        if (atts.description) {
          description = (0, _virtualDom.h)("span.list-description", {
            attributes: {
              "aria-hidden": true
            }
          }, _I18n.default.t(atts.description, {
            count: atts.count
          }));
        }

        // oddly post_url is on the user
        let postUrl;
        const icons = users.map(u => {
          postUrl = postUrl || u.post_url;
          if (u.unknown) {
            return (0, _virtualDom.h)("div.unknown", {
              attributes: {
                title: _I18n.default.t("post.unknown_user"),
                role: "listitem"
              }
            });
          } else {
            return _post.avatarFor.call(this, "small", u, {
              role: "listitem",
              "aria-hidden": false
            });
          }
        });
        if (postUrl) {
          description = (0, _virtualDom.h)("a", {
            attributes: {
              href: (0, _getUrl.default)(postUrl)
            }
          }, description);
        }
        let buffer = [icons];
        if (description) {
          buffer.push(description);
        }
        return buffer;
      }
    }
  });
  (0, _widget.createWidget)("action-link", {
    tagName: "span.action-link",
    template: function (attrs, state) {
      var _r = [];
      var _a0 = [];
      _a0.push(attrs.text);
      _a0.push(". ");
      _r.push(virtualDom.h('a', _a0));
      return _r;
    },
    buildClasses(attrs) {
      return attrs.className;
    },
    click() {
      this.sendWidgetAction(this.attrs.action);
    }
  });
  var _default = (0, _widget.createWidget)("actions-summary", {
    tagName: "section.post-actions",
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var __h2 = __widget_helpers.avatar;
      var __h3 = __widget_helpers.dateNode;
      var _r = [];
      _r.push("\n");
      if (attrs.actionsSummary && attrs.actionsSummary.length) {
        attrs.actionsSummary.forEach(as => {
          _r.push("      ");
          var _a0 = [];
          _a0.push(as.description);
          _r.push(virtualDom.h('div', {
            "className": "post-action",
            "attributes": {}
          }, _a0));
          _r.push("\n      ");
          var _a1 = [];
          _r.push(virtualDom.h('div', {
            "className": "clearfix",
            "attributes": {}
          }, _a1));
          _r.push("\n");
        });
      }
      if (attrs.deleted_at) {
        _r.push("      ");
        var _a2 = [];
        _a2.push("\n        ");
        _a2.push(__h1("far-trash-alt"));
        _a2.push("\n        ");
        _a2.push(__h2("small", {
          template: attrs.deletedByAvatarTemplate,
          username: attrs.deletedByUsername
        }));
        _a2.push("\n        ");
        _a2.push(__h3(attrs.deleted_at));
        _a2.push("\n      ");
        _r.push(virtualDom.h('div', {
          "className": "post-action deleted-post",
          "attributes": {}
        }, _a2));
        _r.push("\n");
      }
      _r.push("  ");
      return _r;
    }
  });
  _exports.default = _default;
});