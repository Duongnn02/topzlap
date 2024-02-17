define("discourse-common/lib/icon-library", ["exports", "I18n", "discourse-common/lib/attribute-hook", "virtual-dom", "discourse-common/config/environment", "discourse-common/lib/escape", "discourse-common/lib/deprecated"], function (_exports, _I18n, _attributeHook, _virtualDom, _environment, _escape, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.REPLACEMENTS = void 0;
  _exports.convertIconClass = convertIconClass;
  _exports.disableMissingIconWarning = disableMissingIconWarning;
  _exports.enableMissingIconWarning = enableMissingIconWarning;
  _exports.iconHTML = iconHTML;
  _exports.iconNode = iconNode;
  _exports.isExistingIconId = isExistingIconId;
  _exports.registerIconRenderer = registerIconRenderer;
  _exports.renderIcon = renderIcon;
  _exports.replaceIcon = replaceIcon;
  _exports.setIconList = setIconList;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/attribute-hook",0,"virtual-dom",0,"discourse-common/config/environment",0,"discourse-common/lib/escape",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  let _renderers = [];
  let warnMissingIcons = true;
  let _iconList;
  const REPLACEMENTS = {
    "d-tracking": "bell",
    "d-muted": "discourse-bell-slash",
    "d-regular": "far-bell",
    "d-watching": "discourse-bell-exclamation",
    "d-watching-first": "discourse-bell-one",
    "d-drop-expanded": "caret-down",
    "d-drop-collapsed": "caret-right",
    "d-unliked": "far-heart",
    "d-liked": "heart",
    "d-post-share": "link",
    "d-topic-share": "link",
    "notification.mentioned": "at",
    "notification.group_mentioned": "users",
    "notification.quoted": "quote-right",
    "notification.replied": "reply",
    "notification.posted": "discourse-bell-exclamation",
    "notification.watching_category_or_tag": "discourse-bell-exclamation",
    "notification.edited": "pencil-alt",
    "notification.bookmark_reminder": "discourse-bookmark-clock",
    "notification.liked": "heart",
    "notification.liked_2": "heart",
    "notification.liked_many": "heart",
    "notification.liked_consolidated": "heart",
    "notification.private_message": "envelope",
    "notification.invited_to_private_message": "envelope",
    "notification.invited_to_topic": "hand-point-right",
    "notification.invitee_accepted": "user",
    "notification.moved_post": "sign-out-alt",
    "notification.linked": "link",
    "notification.granted_badge": "certificate",
    "notification.topic_reminder": "far-clock",
    "notification.watching_first_post": "discourse-bell-one",
    "notification.group_message_summary": "users",
    "notification.post_approved": "check",
    "notification.membership_request_accepted": "user-plus",
    "notification.membership_request_consolidated": "users",
    "notification.reaction": "bell",
    "notification.votes_released": "plus",
    "notification.chat_quoted": "quote-right"
  };
  _exports.REPLACEMENTS = REPLACEMENTS;
  function replaceIcon(source, destination) {
    REPLACEMENTS[source] = destination;
  }
  function disableMissingIconWarning() {
    warnMissingIcons = false;
  }
  function enableMissingIconWarning() {
    warnMissingIcons = false;
  }
  function renderIcon(renderType, id, params) {
    params ||= {};
    for (const renderer of _renderers) {
      const rendererForType = renderer[renderType];
      if (!rendererForType) {
        continue;
      }
      const icon = {
        id,
        replacementId: REPLACEMENTS[id]
      };
      const result = rendererForType(icon, params);
      if (result) {
        return result;
      }
    }
  }
  function iconHTML(id, params) {
    return renderIcon("string", id, params);
  }
  function iconNode(id, params) {
    return renderIcon("node", id, params);
  }
  function convertIconClass(icon) {
    return icon.replace("far fa-", "far-").replace("fab fa-", "fab-").replace("fas fa-", "").replace("fa-", "").trim();
  }
  function registerIconRenderer(renderer) {
    _renderers.unshift(renderer);
  }
  function iconClasses(icon, params) {
    // "notification." is invalid syntax for classes, use replacement instead
    const dClass = icon.replacementId && icon.id.includes("notification.") ? icon.replacementId : icon.id;
    let classNames = `fa d-icon d-icon-${dClass} svg-icon`;
    if (params && params["class"]) {
      classNames += " " + params["class"];
    }
    return classNames;
  }
  function setIconList(iconList) {
    _iconList = iconList;
  }
  function isExistingIconId(id) {
    return _iconList?.includes(id);
  }
  function warnIfMissing(id) {
    if (warnMissingIcons && (0, _environment.isDevelopment)() && !isExistingIconId(id)) {
      console.warn(`The icon "${id}" is missing from the SVG subset.`); // eslint-disable-line no-console
    }
  }

  function handleIconId(icon) {
    let id = icon.replacementId || icon.id || "";

    // TODO: clean up "thumbtack unpinned" at source instead of here
    id = id.replace(" unpinned", "");
    warnIfMissing(id);
    return id;
  }

  // default resolver is font awesome
  registerIconRenderer({
    name: "font-awesome",
    string(icon, params) {
      const id = (0, _escape.default)(handleIconId(icon));
      let html = `<svg class='${(0, _escape.default)(iconClasses(icon, params))} svg-string'`;
      if (params.label) {
        html += " aria-hidden='true'";
      } else if (params["aria-label"]) {
        html += ` aria-hidden='false' aria-label='${(0, _escape.default)(params["aria-label"])}'`;
      }
      html += ` xmlns="${SVG_NAMESPACE}"><use href="#${id}" /></svg>`;
      if (params.label) {
        html += `<span class='sr-only'>${(0, _escape.default)(params.label)}</span>`;
      }
      if (params.title) {
        html = `<span class="svg-icon-title" title='${(0, _escape.default)(_I18n.default.t(params.title))}'>${html}</span>`;
      }
      if (params.translatedtitle) {
        (0, _deprecated.default)(`use 'translatedTitle' option instead of 'translatedtitle'`, {
          since: "2.9.0.beta6",
          dropFrom: "2.10.0.beta1",
          id: "discourse.icon-renderer-translatedtitle"
        });
        params.translatedTitle = params.translatedtitle;
      }
      if (params.translatedTitle) {
        html = `<span class="svg-icon-title" title='${(0, _escape.default)(params.translatedTitle)}'>${html}</span>`;
      }
      return html;
    },
    node(icon, params) {
      const id = handleIconId(icon);
      const classes = iconClasses(icon, params) + " svg-node";
      const svg = (0, _virtualDom.h)("svg", {
        attributes: {
          class: classes,
          "aria-hidden": true
        },
        namespace: SVG_NAMESPACE
      }, [(0, _virtualDom.h)("use", {
        href: (0, _attributeHook.default)("http://www.w3.org/1999/xlink", `#${(0, _escape.default)(id)}`),
        namespace: SVG_NAMESPACE
      })]);
      if (params.title) {
        return (0, _virtualDom.h)("span", {
          title: params.title,
          attributes: {
            class: "svg-icon-title"
          }
        }, [svg]);
      } else {
        return svg;
      }
    }
  });
});