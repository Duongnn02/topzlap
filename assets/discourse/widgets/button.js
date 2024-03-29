define("discourse/widgets/button", ["exports", "discourse/lib/url", "I18n", "discourse/widgets/widget", "virtual-dom", "discourse-common/lib/icon-library"], function (_exports, _url, _I18n, _widget, _virtualDom, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.ButtonClass = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  const ButtonClass = {
    tagName: "button.widget-button.btn",
    buildClasses(attrs) {
      let className = this.attrs.className || "";
      let hasText = attrs.label || attrs.contents;
      if (!hasText) {
        className += " no-text";
      }
      if (attrs.icon) {
        className += " btn-icon";
        if (hasText) {
          className += "-text";
        }
      } else if (hasText) {
        className += " btn-text";
      }
      return className;
    },
    buildAttributes() {
      const attrs = this.attrs;
      const attributes = {};
      let title = attrs.translatedTitle;
      if (!title && attrs.title) {
        title = _I18n.default.t(attrs.title, attrs.titleOptions);
      }
      if (title) {
        attributes.title = title;
      }
      if (attrs.role) {
        attributes["role"] = attrs.role;
      }
      if (attrs.translatedAriaLabel) {
        attributes["aria-label"] = attrs.translatedAriaLabel;
      }
      if (attrs.ariaExpanded) {
        attributes["aria-expanded"] = attrs.ariaExpanded;
      }
      if (attrs.ariaControls) {
        attributes["aria-controls"] = attrs.ariaControls;
      }
      if (attrs.ariaPressed) {
        attributes["aria-pressed"] = attrs.ariaPressed;
      }
      if (attrs.tabAttrs) {
        const tab = attrs.tabAttrs;
        attributes["aria-selected"] = tab["aria-selected"];
        attributes["tabindex"] = tab["tabindex"];
        attributes["aria-controls"] = tab["aria-controls"];
        attributes["id"] = attrs.id;
      }
      if (attrs.disabled) {
        attributes.disabled = "true";
      }
      if (attrs.data) {
        Object.keys(attrs.data).forEach(k => attributes[`data-${k}`] = attrs.data[k]);
      }
      return attributes;
    },
    _buildIcon(attrs) {
      const icon = (0, _iconLibrary.iconNode)(attrs.icon, {
        class: attrs.iconClass
      });
      if (attrs["aria-label"]) {
        icon.properties.attributes["role"] = "img";
        icon.properties.attributes["aria-hidden"] = false;
      }
      return icon;
    },
    html(attrs) {
      const contents = [];
      const left = !attrs.iconRight;
      if (attrs.icon && left) {
        contents.push(this._buildIcon(attrs));
      }
      if (attrs.emoji && left) {
        contents.push(this.attach("emoji", {
          name: attrs.emoji
        }));
      }
      if (attrs.label) {
        contents.push((0, _virtualDom.h)("span.d-button-label", _I18n.default.t(attrs.label, attrs.labelOptions)));
      }
      if (attrs.translatedLabel) {
        contents.push((0, _virtualDom.h)("span.d-button-label", attrs.translatedLabel.toString(), attrs.translatedLabelOptions));
      }
      if (attrs.contents) {
        contents.push(attrs.contents);
      }
      if (attrs.emoji && !left) {
        contents.push(this.attach("emoji", {
          name: attrs.emoji
        }));
      }
      if (attrs.icon && !left) {
        contents.push(this._buildIcon(attrs));
      }
      return contents;
    },
    click(e) {
      const attrs = this.attrs;
      if (attrs.disabled) {
        return;
      }
      $(`button.widget-button`).removeClass("d-hover").blur();
      if (attrs.secondaryAction) {
        this.sendWidgetAction(attrs.secondaryAction);
      }
      if (attrs.url) {
        return _url.default.routeTo(attrs.url);
      }
      if (attrs.sendActionEvent) {
        return this.sendWidgetAction(attrs.action, e);
      }
      return this.sendWidgetAction(attrs.action, attrs.actionParam);
    }
  };
  _exports.ButtonClass = ButtonClass;
  var _default = (0, _widget.createWidget)("button", ButtonClass);
  _exports.default = _default;
  (0, _widget.createWidget)("flat-button", Object.assign(ButtonClass, {
    tagName: "button.widget-button.btn-flat"
  }));
});