define("discourse/lib/render-topic-featured-link", ["exports", "discourse/models/user", "virtual-dom", "discourse-common/lib/icon-library"], function (_exports, _user, _virtualDom, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addFeaturedLinkMetaDecorator = addFeaturedLinkMetaDecorator;
  _exports.default = renderTopicFeaturedLink;
  _exports.extractLinkMeta = extractLinkMeta;
  _exports.topicFeaturedLinkNode = topicFeaturedLinkNode;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/user",0,"virtual-dom",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  const _decorators = [];
  function addFeaturedLinkMetaDecorator(decorator) {
    _decorators.push(decorator);
  }
  function extractLinkMeta(topic) {
    const href = topic.get("featured_link");
    const target = _user.default.currentProp("user_option.external_links_in_new_tab") ? "_blank" : "";
    const domain = topic.get("featured_link_root_domain");
    let allowList = topic.siteSettings.exclude_rel_nofollow_domains;
    let rel = "nofollow ugc";
    if (allowList) {
      allowList = allowList.split("|");
      if (allowList.includes(domain)) {
        rel = rel.replace("nofollow ", "");
      }
    }
    if (!href) {
      return;
    }
    const meta = {
      target,
      href,
      domain,
      rel
    };
    if (_decorators.length) {
      _decorators.forEach(cb => cb(meta));
    }
    return meta;
  }
  function renderTopicFeaturedLink(topic) {
    const meta = extractLinkMeta(topic);
    if (meta) {
      return `<a class="topic-featured-link" rel="${meta.rel}" target="${meta.target}" href="${meta.href}">${(0, _iconLibrary.renderIcon)("string", "external-link-alt")} ${meta.domain}</a>`;
    } else {
      return "";
    }
  }
  function topicFeaturedLinkNode(topic) {
    const meta = extractLinkMeta(topic);
    if (meta) {
      return (0, _virtualDom.h)("a.topic-featured-link", {
        attributes: {
          href: meta.href,
          rel: meta.rel,
          target: meta.target
        }
      }, [(0, _iconLibrary.renderIcon)("node", "external-link-alt"), meta.domain]);
    }
  }
});