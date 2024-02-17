define("discourse/initializers/sharing-sources", ["exports", "I18n", "discourse/lib/sharing"], function (_exports, _I18n, _sharing) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sharing"eaimeta@70e063a35619d71f
  var _default = {
    name: "sharing-sources",
    initialize(container) {
      const siteSettings = container.lookup("service:site-settings");
      _sharing.default.addSource({
        id: "twitter",
        icon: "fab-twitter",
        generateUrl(link, title) {
          let quote = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
          const text = quote ? `"${quote}" -- ` : title;
          return `http://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
        },
        shouldOpenInPopup: true,
        title: _I18n.default.t("share.twitter"),
        popupHeight: 265
      });
      _sharing.default.addSource({
        id: "facebook",
        icon: "fab-facebook",
        title: _I18n.default.t("share.facebook"),
        generateUrl(link, title) {
          let quote = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
          const fb_url = siteSettings.facebook_app_id ? `https://www.facebook.com/dialog/share?app_id=${siteSettings.facebook_app_id}&quote=${encodeURIComponent(quote)}&href=` : "https://www.facebook.com/sharer.php?u=";
          return `${fb_url}${encodeURIComponent(link)}`;
        },
        shouldOpenInPopup: true
      });
      _sharing.default.addSource({
        id: "email",
        icon: "envelope",
        title: _I18n.default.t("share.email"),
        generateUrl(link, title) {
          let quote = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
          const body = quote ? `${quote} \n\n ${link}` : link;
          return "mailto:?to=&subject=" + encodeURIComponent("[" + siteSettings.title + "] " + title) + "&body=" + encodeURIComponent(body);
        },
        showInPrivateContext: true
      });
    }
  };
  _exports.default = _default;
});