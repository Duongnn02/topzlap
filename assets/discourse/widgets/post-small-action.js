define("discourse/widgets/post-small-action", ["exports", "I18n", "discourse/widgets/raw-html", "discourse/lib/formatter", "discourse/widgets/post", "@ember/object", "discourse/widgets/widget", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/url", "@ember/template"], function (_exports, _I18n, _rawHtml, _formatter, _post, _object, _widget, _virtualDom, _iconLibrary, _url, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.actionDescription = actionDescription;
  _exports.actionDescriptionHtml = actionDescriptionHtml;
  _exports.addGroupPostSmallActionCode = addGroupPostSmallActionCode;
  _exports.addPostSmallActionClassesCallback = addPostSmallActionClassesCallback;
  _exports.addPostSmallActionIcon = addPostSmallActionIcon;
  _exports.default = void 0;
  _exports.resetPostSmallActionClassesCallbacks = resetPostSmallActionClassesCallbacks;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/raw-html",0,"discourse/lib/formatter",0,"discourse/widgets/post",0,"@ember/object",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/url",0,"@ember/template"eaimeta@70e063a35619d71f
  function actionDescriptionHtml(actionCode, createdAt, username, path) {
    const dt = new Date(createdAt);
    const when = (0, _formatter.autoUpdatingRelativeAge)(dt, {
      format: "medium-with-ago-and-on"
    });
    let who = "";
    if (username) {
      if (groupActionCodes.includes(actionCode)) {
        who = `<a class="mention-group" href="/g/${username}">@${username}</a>`;
      } else {
        who = `<a class="mention" href="${(0, _url.userPath)(username)}">@${username}</a>`;
      }
    }
    return (0, _template.htmlSafe)(_I18n.default.t(`action_codes.${actionCode}`, {
      who,
      when,
      path
    }));
  }
  function actionDescription(actionCode, createdAt, username) {
    let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return (0, _object.computed)(actionCode, createdAt, function () {
      const ac = this.get(actionCode);
      if (ac) {
        return actionDescriptionHtml(ac, this.get(createdAt), this.get(username), path ? this.get(path) : null);
      }
    });
  }
  const addPostSmallActionClassesCallbacks = [];
  const groupActionCodes = ["invited_group", "removed_group"];
  const icons = {
    "closed.enabled": "lock",
    "closed.disabled": "unlock-alt",
    "autoclosed.enabled": "lock",
    "autoclosed.disabled": "unlock-alt",
    "archived.enabled": "folder",
    "archived.disabled": "folder-open",
    "pinned.enabled": "thumbtack",
    "pinned.disabled": "thumbtack unpinned",
    "pinned_globally.enabled": "thumbtack",
    "pinned_globally.disabled": "thumbtack unpinned",
    "banner.enabled": "thumbtack",
    "banner.disabled": "thumbtack unpinned",
    "visible.enabled": "far-eye",
    "visible.disabled": "far-eye-slash",
    split_topic: "sign-out-alt",
    invited_user: "plus-circle",
    invited_group: "plus-circle",
    user_left: "minus-circle",
    removed_user: "minus-circle",
    removed_group: "minus-circle",
    public_topic: "comment",
    private_topic: "envelope",
    autobumped: "hand-point-right"
  };
  function addPostSmallActionIcon(key, icon) {
    icons[key] = icon;
  }
  function addGroupPostSmallActionCode(actionCode) {
    groupActionCodes.push(actionCode);
  }
  function addPostSmallActionClassesCallback(callback) {
    addPostSmallActionClassesCallbacks.push(callback);
  }
  function resetPostSmallActionClassesCallbacks() {
    addPostSmallActionClassesCallbacks.length = 0;
  }
  var _default = (0, _widget.createWidget)("post-small-action", {
    buildKey: attrs => `post-small-act-${attrs.id}`,
    tagName: "div.small-action.onscreen-post",
    buildId(attrs) {
      return `post_${attrs.post_number}`;
    },
    buildClasses(attrs) {
      let classNames = [];
      if (attrs.deleted) {
        classNames.push("deleted");
      }
      if (addPostSmallActionClassesCallbacks.length > 0) {
        addPostSmallActionClassesCallbacks.forEach(callback => {
          const additionalClasses = callback.call(this, attrs);
          if (additionalClasses) {
            classNames.push(...additionalClasses);
          }
        });
      }
      return classNames;
    },
    html(attrs) {
      const contents = [];
      const buttons = [];
      const customMessage = [];
      contents.push(_post.avatarFor.call(this, "small", {
        template: attrs.avatar_template,
        username: attrs.username,
        url: attrs.usernameUrl
      }));
      if (attrs.actionDescriptionWidget) {
        contents.push(this.attach(attrs.actionDescriptionWidget, attrs));
      } else {
        const description = actionDescriptionHtml(attrs.actionCode, new Date(attrs.created_at), attrs.actionCodeWho, attrs.actionCodePath);
        contents.push(new _rawHtml.default({
          html: `<p>${description}</p>`
        }));
      }
      if (attrs.canRecover) {
        buttons.push(this.attach("button", {
          className: "btn-flat small-action-recover",
          icon: "undo",
          action: "recoverPost",
          title: "post.controls.undelete"
        }));
      }
      if (attrs.canEdit && !attrs.canRecover) {
        buttons.push(this.attach("button", {
          className: "btn-flat small-action-edit",
          icon: "pencil-alt",
          action: "editPost",
          title: "post.controls.edit"
        }));
      }
      if (attrs.canDelete) {
        buttons.push(this.attach("button", {
          className: "btn-flat btn-danger small-action-delete",
          icon: "trash-alt",
          action: "deletePost",
          title: "post.controls.delete"
        }));
      }
      if (!attrs.actionDescriptionWidget && attrs.cooked) {
        customMessage.push(new _rawHtml.default({
          html: `<div class='small-action-custom-message'>${attrs.cooked}</div>`
        }));
      }
      return [(0, _virtualDom.h)("div.topic-avatar", (0, _iconLibrary.iconNode)(icons[attrs.actionCode] || "exclamation")), (0, _virtualDom.h)("div.small-action-desc", [(0, _virtualDom.h)("div.small-action-contents", contents), (0, _virtualDom.h)("div.small-action-buttons", buttons), customMessage])];
    }
  });
  _exports.default = _default;
});