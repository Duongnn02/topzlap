define("discourse/components/navigation-bar", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object", "discourse/lib/url", "discourse/mixins/filter-mode", "@ember/runloop"], function (_exports, _component, _templateFactory, _decorators, _object, _url, _filterMode, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"discourse/lib/url",0,"discourse/mixins/filter-mode",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.navItems as |navItem|}}
    <NavigationItem
      @content={{navItem}}
      @filterMode={{this.filterMode}}
      @category={{this.category}}
      @class={{concat "nav-item_" navItem.name}}
    />
  {{/each}}
  <PluginOutlet
    @name="extra-nav-item"
    @connectorTagName="li"
    @outletArgs={{hash category=this.category filterMode=this.filterMode}}
  />
  */
  {
    "id": "HTKYckl3",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"navItems\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@content\",\"@filterMode\",\"@category\",\"@class\"],[[30,1],[30,0,[\"filterMode\"]],[30,0,[\"category\"]],[28,[37,3],[\"nav-item_\",[30,1,[\"name\"]]],null]]],null],[1,\"\\n\"]],[1]],null],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"extra-nav-item\",\"li\",[28,[37,5],null,[[\"category\",\"filterMode\"],[[30,0,[\"category\"]],[30,0,[\"filterMode\"]]]]]]],null]],[\"navItem\"],false,[\"each\",\"-track-array\",\"navigation-item\",\"concat\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/navigation-bar.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_filterMode.default, (_dec = (0, _decorators.default)("filterType", "navItems"), _dec2 = (0, _decorators.observes)("expanded"), (_obj = {
    tagName: "ul",
    classNameBindings: [":nav", ":nav-pills"],
    elementId: "navigation-bar",
    init() {
      this._super(...arguments);
    },
    selectedNavItem(filterType, navItems) {
      let item = navItems.find(i => i.active === true);
      item = item || navItems.find(i => i.get("filterType") === filterType);
      if (!item) {
        let connectors = this.connectors;
        let category = this.category;
        if (connectors && category) {
          connectors.forEach(c => {
            if (c.connectorClass && typeof c.connectorClass.path === "function" && typeof c.connectorClass.displayName === "function") {
              let path = c.connectorClass.path(category);
              if (path.indexOf(filterType) > 0) {
                item = {
                  displayName: c.connectorClass.displayName()
                };
              }
            }
          });
        }
      }
      return item || navItems[0];
    },
    closedNav() {
      if (!this.expanded) {
        this.ensureDropClosed();
      }
    },
    ensureDropClosed() {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      if (this.expanded) {
        this.set("expanded", false);
      }
      $(window).off("click.navigation-bar");
      _url.default.appEvents.off("dom:clean", this, this.ensureDropClosed);
    },
    toggleDrop(event) {
      event?.preventDefault();
      this.set("expanded", !this.expanded);
      if (this.expanded) {
        _url.default.appEvents.on("dom:clean", this, this.ensureDropClosed);
        (0, _runloop.next)(() => {
          if (!this.expanded) {
            return;
          }
          $(this.element.querySelector(".drop a")).on("click", () => {
            this.element.querySelector(".drop").style.display = "none";
            (0, _runloop.next)(() => {
              this.ensureDropClosed();
            });
            return true;
          });
          $(window).on("click.navigation-bar", () => {
            this.ensureDropClosed();
            return true;
          });
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedNavItem", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectedNavItem"), _obj), _applyDecoratedDescriptor(_obj, "closedNav", [_dec2], Object.getOwnPropertyDescriptor(_obj, "closedNav"), _obj), _applyDecoratedDescriptor(_obj, "toggleDrop", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleDrop"), _obj)), _obj))));
  _exports.default = _default;
});