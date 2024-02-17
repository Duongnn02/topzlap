define("discourse/components/mobile-nav", ["exports", "discourse-common/utils/decorators", "@ember/component", "@ember/object", "@ember/runloop", "@ember/service", "discourse-common/lib/deprecated"], function (_exports, _decorators, _component, _object, _runloop, _service, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"@ember/runloop",0,"@ember/service",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.on)("init"), (_obj = {
    _init() {
      if (!this.get("site.mobileView")) {
        let classes = this.desktopClass;
        if (classes) {
          classes = classes.split(" ");
          this.set("classNames", classes);
        }
      }
      if (this.currentPath) {
        (0, _deprecated.default)("{{mobile-nav}} no longer requires the currentPath property", {
          since: "2.7.0.beta4",
          dropFrom: "2.9.0.beta1",
          id: "discourse.mobile-nav.currentPath"
        });
      }
    },
    tagName: "ul",
    selectedHtml: null,
    classNames: ["mobile-nav"],
    router: (0, _service.inject)(),
    currentRouteChanged() {
      this.set("expanded", false);
      (0, _runloop.next)(() => this._updateSelectedHtml());
    },
    _updateSelectedHtml() {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      const active = this.element.querySelector(".active");
      if (active && active.innerHTML) {
        this.set("selectedHtml", active.innerHTML);
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this._updateSelectedHtml();
      this.router.on("routeDidChange", this, this.currentRouteChanged);
    },
    willDestroyElement() {
      this.router.off("routeDidChange", this, this.currentRouteChanged);
    },
    toggleExpanded(event) {
      event?.preventDefault();
      this.toggleProperty("expanded");
      (0, _runloop.next)(() => {
        if (this.expanded) {
          $(window).off("click.mobile-nav").on("click.mobile-nav", e => {
            if (!this.element || this.isDestroying || this.isDestroyed) {
              return;
            }
            const expander = this.element.querySelector(".expander");
            if (expander && e.target !== expander) {
              this.set("expanded", false);
              $(window).off("click.mobile-nav");
            }
          });
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_init", [_dec], Object.getOwnPropertyDescriptor(_obj, "_init"), _obj), _applyDecoratedDescriptor(_obj, "toggleExpanded", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleExpanded"), _obj)), _obj)));
  _exports.default = _default;
});