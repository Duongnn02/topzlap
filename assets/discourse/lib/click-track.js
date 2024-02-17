define("discourse/lib/click-track", ["exports", "discourse/lib/url", "I18n", "rsvp", "discourse/models/user", "discourse/lib/ajax", "discourse-common/lib/get-url", "discourse-common/config/environment", "discourse/lib/intercept-click", "discourse-common/lib/deprecated", "discourse-common/lib/get-owner", "jquery"], function (_exports, _url, _I18n, _rsvp, _user, _ajax, _getUrl, _environment, _interceptClick, _deprecated, _getOwner, _jquery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.isValidLink = isValidLink;
  _exports.openLinkInNewTab = openLinkInNewTab;
  _exports.shouldOpenInNewTab = shouldOpenInNewTab;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"I18n",0,"rsvp",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/lib/get-url",0,"discourse-common/config/environment",0,"discourse/lib/intercept-click",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/get-owner",0,"jquery"eaimeta@70e063a35619d71f
  function isValidLink(link) {
    if (link instanceof _jquery.default) {
      link = link[0];
      (0, _deprecated.default)("isValidLink now expects an Element, not a jQuery object", {
        since: "2.9.0.beta7",
        id: "discourse.click-track.is-valid-link-jquery"
      });
    }

    // .hashtag/.hashtag-cooked == category/tag link
    // .back == quote back ^ button
    if (["lightbox", "no-track-link", "hashtag", "hashtag-cooked", "back"].some(name => link.classList.contains(name))) {
      return false;
    }
    const closest = link.closest("aside.quote, .elided, .expanded-embed");
    if (closest && closest !== link) {
      return false;
    }
    if (link.closest(".onebox-result, .onebox-body")) {
      const a = link.closest(".onebox")?.querySelector("header a");
      if (a && a.href === link.href) {
        return true;
      }
    }
    return link.classList.contains("track-link") || !link.closest(".hashtag, .hashtag-cooked, .badge-category, .onebox-result, .onebox-body");
  }
  function shouldOpenInNewTab(href) {
    const isInternal = _url.default.isInternal(href);
    const openExternalInNewTab = _user.default.currentProp("user_option.external_links_in_new_tab");
    return !isInternal && openExternalInNewTab;
  }
  function openLinkInNewTab(event, link) {
    let href = (link.href || link.dataset.href || "").trim();
    if (href === "") {
      return;
    }
    const newWindow = window.open(href, "_blank");
    newWindow.opener = null;
    newWindow.focus();
    event.preventDefault();
  }
  var _default = {
    trackClick(e, siteSettings) {
      let {
        returnPromise = false
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // right clicks are not tracked
      if (e.which === 3) {
        return true;
      }
      const link = e.currentTarget;
      const tracking = isValidLink(link);

      // Return early for mentions and group mentions. This is not in
      // isValidLink because returning true here allows the group card
      // to pop up. If we returned false it would not.
      if (["mention", "mention-group"].some(name => link.classList.contains(name))) {
        return true;
      }
      let href = (link.getAttribute("href") || link.dataset.href || "").trim();
      if (!href || href.startsWith("mailto:")) {
        return true;
      }
      if (link.classList.contains("attachment")) {
        // Warn the user if they cannot download the file.
        if (siteSettings?.prevent_anons_from_downloading_files && !_user.default.current()) {
          const dialog = (0, _getOwner.getOwner)(this).lookup("service:dialog");
          dialog.alert(_I18n.default.t("post.errors.attachment_download_requires_login"));
        } else if ((0, _interceptClick.wantsNewWindow)(e)) {
          const newWindow = window.open(href, "_blank");
          newWindow.opener = null;
          newWindow.focus();
        } else {
          _url.default.redirectTo(href);
        }
        return false;
      }
      const article = link.closest("article:not(.onebox-body), .excerpt, #revisions");
      const postId = article.dataset.postId;
      const topicId = document.querySelector("#topic")?.dataset?.topicId || article.dataset.topicId;
      const userId = link.dataset.userId || article.dataset.userId;
      const ownLink = userId && parseInt(userId, 10) === _user.default.currentProp("id");

      // Update badge clicks unless it's our own.
      if (tracking && !ownLink) {
        const badge = link.querySelector("span.badge");
        if (badge) {
          const html = badge.innerHTML;
          const key = `${new Date().toLocaleDateString()}-${postId}-${href}`;
          if (/^\d+$/.test(html) && !sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, true);
            badge.innerHTML = parseInt(html, 10) + 1;
          }
        }
      }
      let trackPromise = _rsvp.Promise.resolve();
      if (tracking) {
        if (!(0, _environment.isTesting)() && navigator.sendBeacon) {
          const data = new FormData();
          data.append("url", href);
          data.append("post_id", postId);
          data.append("topic_id", topicId);
          navigator.sendBeacon((0, _getUrl.default)("/clicks/track"), data);
        } else {
          trackPromise = (0, _ajax.ajax)((0, _getUrl.default)("/clicks/track"), {
            type: "POST",
            data: {
              url: href,
              post_id: postId,
              topic_id: topicId
            }
          });
        }
      }
      if (!(0, _interceptClick.wantsNewWindow)(e)) {
        if (shouldOpenInNewTab(href)) {
          openLinkInNewTab(e, link);
        } else {
          trackPromise.finally(() => {
            if (_url.default.isInternal(href) && (0, _getUrl.samePrefix)(href)) {
              _url.default.routeTo(href);
            } else {
              _url.default.redirectAbsolute(href);
            }
          });
        }
        return returnPromise ? trackPromise : false;
      }
      return returnPromise ? trackPromise : true;
    }
  };
  _exports.default = _default;
});