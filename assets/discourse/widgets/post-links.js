define("discourse/widgets/post-links", ["exports", "discourse/widgets/widget", "virtual-dom", "discourse-common/lib/icon-library", "discourse/widgets/emoji"], function (_exports, _widget, _virtualDom, _iconLibrary, _emoji) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/widgets/emoji"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("post-links", {
    tagName: "div.post-links-container",
    buildKey: attrs => `post-links-${attrs.id}`,
    defaultState() {
      return {
        collapsed: true
      };
    },
    linkHtml(link) {
      const linkBody = (0, _emoji.replaceEmoji)(link.title);
      if (link.clicks) {
        linkBody.push((0, _virtualDom.h)("span.badge.badge-notification.clicks", link.clicks.toString()));
      }
      return (0, _virtualDom.h)("li", (0, _virtualDom.h)("a.track-link", {
        className: "inbound",
        attributes: {
          href: link.url
        }
      }, [(0, _iconLibrary.iconNode)("link"), linkBody]));
    },
    html(attrs, state) {
      if (!this.attrs.links || this.attrs.links.length === 0) {
        // shortcut all work
        return;
      }

      // only show incoming
      const links = this.attrs.links.filter(l => l.reflection).uniqBy("title");
      if (links.length === 0) {
        return;
      }
      const result = [];

      // show all links
      if (links.length <= 5 || !state.collapsed) {
        links.forEach(l => result.push(this.linkHtml(l)));
      } else {
        const max = Math.min(5, links.length);
        for (let i = 0; i < max; i++) {
          result.push(this.linkHtml(links[i]));
        }
        // 'show more' link
        if (links.length > max) {
          result.push((0, _virtualDom.h)("li", this.attach("link", {
            labelCount: "post_links.title",
            title: "post_links.about",
            count: links.length - max,
            action: "expandLinks",
            className: "expand-links"
          })));
        }
      }
      if (result.length) {
        return (0, _virtualDom.h)("ul.post-links", result);
      }
    },
    expandLinks() {
      this.state.collapsed = false;
    }
  });
  _exports.default = _default;
});