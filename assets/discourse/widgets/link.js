define("discourse/widgets/link", ["exports", "discourse/lib/url", "I18n", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/intercept-click"], function (_exports, _url, _I18n, _widget, _getUrl, _virtualDom, _iconLibrary, _interceptClick) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"I18n",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/intercept-click"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("link", {
    tagName: "a",
    href(attrs) {
      const route = attrs.route;
      if (route) {
        const router = this.register.lookup("router:main");
        if (router && router._routerMicrolib) {
          const params = [route];
          if (attrs.model) {
            params.push(attrs.model);
          }
          return (0, _getUrl.default)(router._routerMicrolib.generate.apply(router._routerMicrolib, params));
        }
      } else {
        return (0, _getUrl.default)(attrs.href);
      }
    },
    buildClasses(attrs) {
      const result = [];
      result.push("widget-link");
      if (attrs.className) {
        result.push(attrs.className);
      }
      return result;
    },
    buildAttributes(attrs) {
      const ret = {
        href: this.href(attrs),
        title: attrs.title ? _I18n.default.t(attrs.title, attrs.titleOptions) : this.label(attrs)
      };
      if (attrs.attributes) {
        Object.keys(attrs.attributes).forEach(k => ret[k] = attrs.attributes[k]);
      }
      return ret;
    },
    label(attrs) {
      if (attrs.labelCount && attrs.count) {
        return _I18n.default.t(attrs.labelCount, {
          count: attrs.count
        });
      }
      return attrs.rawLabel || (attrs.label ? _I18n.default.t(attrs.label) : "");
    },
    html(attrs) {
      if (attrs.contents) {
        return attrs.contents();
      }
      const result = [];
      if (attrs.icon) {
        if (attrs["aria-label"]) {
          let icon = (0, _iconLibrary.iconNode)(attrs.icon);
          icon.properties.attributes["aria-label"] = _I18n.default.t(attrs["aria-label"], attrs.ariaLabelOptions);
          icon.properties.attributes["role"] = "img";
          icon.properties.attributes["aria-hidden"] = false;
          result.push(icon);
        } else {
          result.push((0, _iconLibrary.iconNode)(attrs.icon));
        }
        result.push(" ");
      }
      if (!attrs.hideLabel) {
        let label = this.label(attrs);
        if (attrs.omitSpan) {
          result.push(label);
        } else {
          result.push((0, _virtualDom.h)("span.d-label", label));
        }
      }
      const currentUser = this.currentUser;
      if (currentUser && attrs.badgeCount) {
        const val = parseInt(currentUser.get(attrs.badgeCount), 10);
        if (val > 0) {
          const title = attrs.badgeTitle ? _I18n.default.t(attrs.badgeTitle) : "";
          result.push(" ");
          result.push((0, _virtualDom.h)("span.badge-notification", {
            className: attrs.badgeClass,
            attributes: {
              title
            }
          }, val));
        }
      }
      return result;
    },
    click(e) {
      if (this.attrs.attributes && this.attrs.attributes.target === "_blank") {
        return;
      }
      if ((0, _interceptClick.wantsNewWindow)(e)) {
        return;
      }
      e.preventDefault();
      if (this.attrs.action) {
        e.preventDefault();
        return this.sendWidgetAction(this.attrs.action, this.attrs.actionParam);
      } else {
        this.sendWidgetEvent("linkClicked", this.attrs);
      }
      return _url.default.routeToTag(e.target.closest("a"));
    }
  });
  _exports.default = _default;
});