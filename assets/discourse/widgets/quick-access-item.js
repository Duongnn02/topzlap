define("discourse/widgets/quick-access-item", ["exports", "discourse/widgets/raw-html", "discourse/widgets/widget", "discourse/lib/text", "discourse/lib/utilities", "virtual-dom", "discourse-common/lib/icon-library"], function (_exports, _rawHtml, _widget, _text, _utilities, _virtualDom, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse/widgets/widget",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"virtual-dom",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  /**
   * This helper widget tries to enforce a consistent look and behavior for any
   * item under any quick access panels.
   *
   * It accepts the following attributes:
   *   action
   *   actionParam
   *   content
   *   escapedContent
   *   href
   *   icon
   *   read
   *   username
   */
  var _default = (0, _widget.createWidget)("quick-access-item", {
    tagName: "li",
    buildClasses(attrs) {
      const result = [];
      if (attrs.className) {
        result.push(attrs.className);
      }
      if (attrs.read === undefined || attrs.read) {
        result.push("read");
      }
      return result;
    },
    html(_ref) {
      let {
        href,
        title,
        icon
      } = _ref;
      let content = this._contentHtml();
      if (href) {
        let topicId = href.match(/\/t\/.*?\/(\d+)/);
        if (topicId && topicId[1]) {
          topicId = (0, _utilities.escapeExpression)(topicId[1]);
          content = `<span data-topic-id="${topicId}">${content}</span>`;
        }
      }
      return (0, _virtualDom.h)("a", {
        attributes: this._linkAttributes(href, title)
      }, [(0, _iconLibrary.iconNode)(icon), new _rawHtml.default({
        html: `<div>${this._usernameHtml()}${content}</div>`
      })]);
    },
    click(e) {
      this.attrs.read = true;
      if (this.attrs.action) {
        e.preventDefault();
        return this.sendWidgetAction(this.attrs.action, this.attrs.actionParam);
      }
    },
    _linkAttributes(href, title) {
      return {
        href,
        title
      };
    },
    _contentHtml() {
      const content = this.attrs.escapedContent || (0, _utilities.escapeExpression)(this.attrs.content);
      return (0, _text.emojiUnescape)(content);
    },
    _usernameHtml() {
      // Generate an empty `<span>` even if there is no username, because the
      // first `<span>` is styled differently.
      return this.attrs.username ? `<span>${this.attrs.username}</span> ` : "<span></span>";
    }
  });
  _exports.default = _default;
});