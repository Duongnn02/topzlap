define("discourse/widgets/home-logo", ["exports", "discourse/lib/url", "discourse/models/session", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/intercept-click"], function (_exports, _url, _session, _widget, _getUrl, _virtualDom, _iconLibrary, _interceptClick) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/models/session",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/intercept-click"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("home-logo", {
    tagName: "div.title",
    settings: {
      href: (0, _getUrl.default)("/")
    },
    buildClasses() {
      if (this.attrs.minimized) {
        return "title--minimized";
      }
    },
    href() {
      const href = this.settings.href;
      return typeof href === "function" ? href() : href;
    },
    logoUrl() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.logoResolver("logo", opts);
    },
    mobileLogoUrl() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.logoResolver("mobile_logo", opts);
    },
    smallLogoUrl() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.logoResolver("logo_small", opts);
    },
    logo() {
      const {
          siteSettings
        } = this,
        mobileView = this.site.mobileView;
      const darkModeOptions = _session.default.currentProp("darkModeAvailable") ? {
        dark: true
      } : {};
      const mobileLogoUrl = this.mobileLogoUrl(),
        mobileLogoUrlDark = this.mobileLogoUrl(darkModeOptions);
      const showMobileLogo = mobileView && mobileLogoUrl.length > 0;
      const logoUrl = this.logoUrl(),
        logoUrlDark = this.logoUrl(darkModeOptions);
      const title = siteSettings.title;
      if (this.attrs.minimized) {
        const logoSmallUrl = this.smallLogoUrl(),
          logoSmallUrlDark = this.smallLogoUrl(darkModeOptions);
        if (logoSmallUrl.length) {
          return this.logoElement("logo-small", logoSmallUrl, title, logoSmallUrlDark);
        } else {
          return (0, _iconLibrary.iconNode)("home");
        }
      } else if (showMobileLogo) {
        return this.logoElement("logo-mobile", mobileLogoUrl, title, mobileLogoUrlDark);
      } else if (logoUrl.length) {
        return this.logoElement("logo-big", logoUrl, title, logoUrlDark);
      } else {
        return (0, _virtualDom.h)("h1#site-text-logo.text-logo", {
          key: "logo-text"
        }, title);
      }
    },
    logoResolver(name) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        siteSettings
      } = this;

      // get alternative logos for browser dark dark mode switching
      if (opts.dark) {
        return siteSettings[`site_${name}_dark_url`];
      }

      // try dark logos first when color scheme is dark
      // this is independent of browser dark mode
      // hence the fallback to normal logos
      if (_session.default.currentProp("defaultColorSchemeIsDark")) {
        return siteSettings[`site_${name}_dark_url`] || siteSettings[`site_${name}_url`] || "";
      }
      return siteSettings[`site_${name}_url`] || "";
    },
    logoElement(key, url, title) {
      let darkUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      const attributes = key === "logo-small" ? {
        src: (0, _getUrl.default)(url),
        width: 36,
        alt: title
      } : {
        src: (0, _getUrl.default)(url),
        alt: title
      };
      const imgElement = (0, _virtualDom.h)(`img#site-logo.${key}`, {
        key,
        attributes
      });
      if (darkUrl && url !== darkUrl) {
        return (0, _virtualDom.h)("picture", [(0, _virtualDom.h)("source", {
          attributes: {
            srcset: (0, _getUrl.default)(darkUrl),
            media: "(prefers-color-scheme: dark)"
          }
        }), imgElement]);
      }
      return imgElement;
    },
    html() {
      return (0, _virtualDom.h)("a", {
        attributes: {
          href: this.href(),
          "data-auto-route": true
        }
      }, this.logo());
    },
    click(e) {
      if ((0, _interceptClick.wantsNewWindow)(e)) {
        return false;
      }
      e.preventDefault();
      _url.default.routeToTag(e.target.closest("a"));
      return false;
    }
  });
  _exports.default = _default;
});