define("discourse/widgets/widget-dropdown", ["exports", "I18n", "@popperjs/core", "discourse/widgets/widget", "@ember/runloop"], function (_exports, _I18n, _core, _widget, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.WidgetDropdownItemClass = _exports.WidgetDropdownHeaderClass = _exports.WidgetDropdownClass = _exports.WidgetDropdownBodyClass = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@popperjs/core",0,"discourse/widgets/widget",0,"discourse/widgets/hbs-compiler",0,"@ember/runloop"eaimeta@70e063a35619d71f
  /*
  
    widget-dropdown
  
    Usage
    -----
  
    {{attach
      widget="widget-dropdown"
      attrs=(hash
        id=id
        label=label
        content=content
        onChange=onChange
        options=(hash)
      )
    }}
  
    Mandatory attributes:
  
      - id: must be unique in the application
  
      - label or translatedLabel:
          - label: an i18n key to be translated and displayed on the header
          - translatedLabel: an already translated label to display on the header
  
      - onChange: action called when a click happens on a row, content[rowIndex] will be passed as params
  
    Optional attributes:
  
      - class: adds css class to the dropdown
      - content: list of items to display, if undefined or empty dropdown won't display
        Example content:
  
        ```
        [
          { id: 1, label: "foo.bar" },
          "separator",
          { id: 2, translatedLabel: "FooBar" },
          { id: 3 label: "foo.baz", icon: "times" },
          { id: 4, html: "<b>foo</b>" }
        ]
        ```
  
      - options: accepts a hash of optional attributes
        - headerClass: adds css class to the dropdown header
        - bodyClass: adds css class to the dropdown header
        - caret: adds a caret to visually enforce this is a dropdown
        - disabled: adds disabled css class and lock dropdown
  */

  const WidgetDropdownHeaderClass = {
    tagName: "button",
    transform(attrs) {
      return {
        label: this._buildLabel(attrs)
      };
    },
    buildAttributes(attrs) {
      return {
        title: this._buildLabel(attrs)
      };
    },
    buildClasses(attrs) {
      let classes = ["widget-dropdown-header", "btn", "btn-default"];
      if (attrs.class) {
        classes = classes.concat(attrs.class.split(" "));
      }
      return classes.filter(Boolean).join(" ");
    },
    click(event) {
      event.preventDefault();
      this.sendWidgetAction("_onTrigger");
    },
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var _r = [];
      _r.push("\n");
      if (attrs.icon) {
        _r.push("      ");
        _r.push(__h1(attrs.icon));
        _r.push("\n");
      }
      _r.push("    ");
      var _a0 = [];
      _a0.push("\n      ");
      _a0.push(this.transformed.label);
      _a0.push("\n    ");
      _r.push(virtualDom.h('span', {
        "className": "label",
        "attributes": {}
      }, _a0));
      _r.push("\n");
      if (attrs.caret) {
        _r.push("      ");
        _r.push(__h1("caret-down"));
        _r.push("\n");
      }
      _r.push("  ");
      return _r;
    },
    _buildLabel(attrs) {
      return attrs.translatedLabel ? attrs.translatedLabel : _I18n.default.t(attrs.label);
    }
  };
  _exports.WidgetDropdownHeaderClass = WidgetDropdownHeaderClass;
  (0, _widget.createWidget)("widget-dropdown-header", WidgetDropdownHeaderClass);
  const WidgetDropdownItemClass = {
    tagName: "div",
    transform(attrs) {
      return {
        content: attrs.item === "separator" ? "<hr>" : attrs.item.html ? attrs.item.html : attrs.item.translatedLabel ? attrs.item.translatedLabel : _I18n.default.t(attrs.item.label)
      };
    },
    buildAttributes(attrs) {
      return {
        "data-id": attrs.item.id,
        tabindex: attrs.item === "separator" ? -1 : 0
      };
    },
    buildClasses(attrs) {
      const classes = ["widget-dropdown-item", attrs.item === "separator" ? "separator" : `item-${attrs.item.id}`];
      classes.push(attrs.item.disabled ? "disabled" : "");
      return classes.join(" ");
    },
    keyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.sendWidgetAction("_onChange", this.attrs.item);
      }
    },
    click(event) {
      event.preventDefault();
      this.sendWidgetAction("_onChange", this.attrs.item);
    },
    template: function (attrs, state) {
      var __h1 = __widget_helpers.iconNode;
      var __h2 = __widget_helpers.rawHtml;
      var _r = [];
      _r.push("\n");
      if (attrs.item.icon) {
        _r.push("      ");
        _r.push(__h1(attrs.item.icon));
        _r.push("\n");
      }
      _r.push("    ");
      _r.push(new __h2({
        html: '<span>' + this.transformed.content + '</span>'
      }));
      _r.push("\n  ");
      return _r;
    }
  };
  _exports.WidgetDropdownItemClass = WidgetDropdownItemClass;
  (0, _widget.createWidget)("widget-dropdown-item", WidgetDropdownItemClass);
  const WidgetDropdownBodyClass = {
    tagName: "div",
    buildClasses(attrs) {
      return `widget-dropdown-body ${attrs.class || ""}`;
    },
    clickOutside() {
      this.sendWidgetAction("hideBody");
    },
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n");
      if (attrs.content && attrs.content.length) {
        attrs.content.forEach(item => {
          _r.push("      ");
          _r.push(this.attach("widget-dropdown-item", {
            "item": item
          }, undefined, undefined));
          _r.push("\n");
        });
      }
      _r.push("  ");
      return _r;
    }
  };
  _exports.WidgetDropdownBodyClass = WidgetDropdownBodyClass;
  (0, _widget.createWidget)("widget-dropdown-body", WidgetDropdownBodyClass);
  const WidgetDropdownClass = {
    tagName: "div",
    init(attrs) {
      if (!attrs) {
        throw "A widget-dropdown expects attributes.";
      }
      if (!attrs.id) {
        throw "A widget-dropdown expects a unique `id` attribute.";
      }
      if (!attrs.label && !attrs.translatedLabel) {
        throw "A widget-dropdown expects at least a `label` or `translatedLabel`";
      }
    },
    buildKey: attrs => {
      return attrs.id;
    },
    buildAttributes(attrs) {
      return {
        id: attrs.id
      };
    },
    defaultState(attrs) {
      return {
        opened: false,
        disabled: attrs.options && attrs.options.disabled || false
      };
    },
    buildClasses(attrs) {
      const classes = ["widget-dropdown"];
      classes.push(this.state.opened ? "opened" : "closed");
      classes.push(this.state.disabled ? "disabled" : "");
      return classes.join(" ") + " " + (attrs.class || "");
    },
    transform(attrs) {
      return {
        options: attrs.options || {},
        isDropdownVisible: !this.state.disabled && this.state.opened
      };
    },
    hideBody() {
      this.state.opened = false;
    },
    _onChange(params) {
      if (params.disabled) {
        return;
      }
      this.state.opened = false;
      if (this.attrs.onChange) {
        if (typeof this.attrs.onChange === "string") {
          this.sendWidgetAction(this.attrs.onChange, params);
        } else {
          this.attrs.onChange(params);
        }
      }
    },
    destroy() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
    },
    willRerenderWidget() {
      this._popper && this._popper.destroy();
    },
    didRenderWidget() {
      if (this.state.opened) {
        (0, _runloop.schedule)("afterRender", () => {
          const dropdownHeader = document.querySelector(`#${this.attrs.id} .widget-dropdown-header`);
          if (!dropdownHeader) {
            return;
          }
          const dropdownBody = document.querySelector(`#${this.attrs.id} .widget-dropdown-body`);
          if (!dropdownBody) {
            return;
          }
          this._popper = (0, _core.createPopper)(dropdownHeader, dropdownBody, {
            strategy: "absolute",
            placement: "bottom-start",
            modifiers: [{
              name: "preventOverflow"
            }, {
              name: "offset",
              options: {
                offset: [0, 5]
              }
            }]
          });
        });
      }
    },
    _onTrigger() {
      this.state.opened = !this.state.opened;
    },
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n");
      if (attrs.content) {
        _r.push("      ");
        _r.push(this.attach("widget-dropdown-header", {
          "icon": attrs.icon,
          "label": attrs.label,
          "translatedLabel": attrs.translatedLabel,
          "class": this.transformed.options.headerClass,
          "caret": this.transformed.options.caret
        }, undefined, undefined));
        _r.push("\n\n");
        if (this.transformed.isDropdownVisible) {
          _r.push("        ");
          _r.push(this.attach("widget-dropdown-body", {
            "id": attrs.id,
            "class": this.transformed.options.bodyClass,
            "content": attrs.content
          }, undefined, undefined));
          _r.push("\n");
        }
      }
      _r.push("  ");
      return _r;
    }
  };
  _exports.WidgetDropdownClass = WidgetDropdownClass;
  var _default = (0, _widget.createWidget)("widget-dropdown", WidgetDropdownClass);
  _exports.default = _default;
});