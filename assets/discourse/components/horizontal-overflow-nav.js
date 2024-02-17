define("discourse/components/horizontal-overflow-nav", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object", "discourse-common/utils/decorators", "@ember/service", "@glimmer/tracking"], function (_exports, _component, _templateFactory, _component2, _object, _decorators, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{! template-lint-disable no-down-event-binding }}
  {{! template-lint-disable no-invalid-interactive }}
  
  <nav
    class="horizontal-overflow-nav {{if this.hasScroll 'has-scroll'}}"
    aria-label={{@ariaLabel}}
  >
    {{#if this.hasScroll}}
      <a
        role="button"
        {{on "mousedown" this.horizontalScroll}}
        {{on "mouseup" this.stopScroll}}
        {{on "mouseleave" this.stopScroll}}
        data-direction="left"
        class={{concat-class
          "horizontal-overflow-nav__scroll-left"
          (if this.hideLeftScroll "disabled")
        }}
      >
        {{d-icon "chevron-left"}}
      </a>
    {{/if}}
  
    <ul
      {{on-resize this.checkScroll}}
      {{on "scroll" this.watchScroll}}
      {{did-insert this.scrollToActive}}
      {{on "mousedown" this.scrollDrag}}
      class="nav-pills action-list {{@className}}"
      ...attributes
    >
      {{yield}}
    </ul>
  
    {{#if this.hasScroll}}
      <a
        role="button"
        {{on "mousedown" this.horizontalScroll}}
        {{on "mouseup" this.stopScroll}}
        {{on "mouseleave" this.stopScroll}}
        class={{concat-class
          "horizontal-overflow-nav__scroll-right"
          (if this.hideRightScroll "disabled")
        }}
      >
        {{d-icon "chevron-right"}}
      </a>
    {{/if}}
  </nav>
  */
  {
    "id": "6xDtbyK8",
    "block": "[[[1,\"\\n\"],[10,\"nav\"],[15,0,[29,[\"horizontal-overflow-nav \",[52,[30,0,[\"hasScroll\"]],\"has-scroll\"]]]],[15,\"aria-label\",[30,1]],[12],[1,\"\\n\"],[41,[30,0,[\"hasScroll\"]],[[[1,\"    \"],[11,3],[24,\"role\",\"button\"],[24,\"data-direction\",\"left\"],[16,0,[28,[37,1],[\"horizontal-overflow-nav__scroll-left\",[52,[30,0,[\"hideLeftScroll\"]],\"disabled\"]],null]],[4,[38,2],[\"mousedown\",[30,0,[\"horizontalScroll\"]]],null],[4,[38,2],[\"mouseup\",[30,0,[\"stopScroll\"]]],null],[4,[38,2],[\"mouseleave\",[30,0,[\"stopScroll\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"chevron-left\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[11,\"ul\"],[16,0,[29,[\"nav-pills action-list \",[30,2]]]],[17,3],[4,[38,4],[[30,0,[\"checkScroll\"]]],null],[4,[38,2],[\"scroll\",[30,0,[\"watchScroll\"]]],null],[4,[38,5],[[30,0,[\"scrollToActive\"]]],null],[4,[38,2],[\"mousedown\",[30,0,[\"scrollDrag\"]]],null],[12],[1,\"\\n    \"],[18,4,null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"hasScroll\"]],[[[1,\"    \"],[11,3],[24,\"role\",\"button\"],[16,0,[28,[37,1],[\"horizontal-overflow-nav__scroll-right\",[52,[30,0,[\"hideRightScroll\"]],\"disabled\"]],null]],[4,[38,2],[\"mousedown\",[30,0,[\"horizontalScroll\"]]],null],[4,[38,2],[\"mouseup\",[30,0,[\"stopScroll\"]]],null],[4,[38,2],[\"mouseleave\",[30,0,[\"stopScroll\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"chevron-right\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"@ariaLabel\",\"@className\",\"&attrs\",\"&default\"],false,[\"if\",\"concat-class\",\"on\",\"d-icon\",\"on-resize\",\"did-insert\",\"yield\"]]",
    "moduleName": "discourse/components/horizontal-overflow-nav.hbs",
    "isStrictMode": false
  });
  let HorizontalOverflowNav = (_class = class HorizontalOverflowNav extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "site", _descriptor, this);
      _initializerDefineProperty(this, "hasScroll", _descriptor2, this);
      _initializerDefineProperty(this, "hideRightScroll", _descriptor3, this);
      _initializerDefineProperty(this, "hideLeftScroll", _descriptor4, this);
      _defineProperty(this, "scrollInterval", void 0);
    }
    scrollToActive(element) {
      const activeElement = element.querySelector("a.active");
      activeElement?.scrollIntoView({
        block: "nearest",
        inline: "center"
      });
    }
    checkScroll(event) {
      if (this.site.mobileView) {
        return;
      }
      this.watchScroll(event);
      this.hasScroll = event.target.scrollWidth > event.target.offsetWidth;
    }
    stopScroll() {
      clearInterval(this.scrollInterval);
    }
    watchScroll(event) {
      if (this.site.mobileView) {
        return;
      }
      if (event.target.offsetWidth + event.target.scrollLeft === event.target.scrollWidth) {
        this.hideRightScroll = true;
        clearInterval(this.scrollInterval);
      } else {
        this.hideRightScroll = false;
      }
      if (event.target.scrollLeft === 0) {
        this.hideLeftScroll = true;
        clearInterval(this.scrollInterval);
      } else {
        this.hideLeftScroll = false;
      }
    }
    scrollDrag(event) {
      if (this.site.mobileView || !this.hasScroll) {
        return;
      }
      event.preventDefault();
      const navPills = event.target.closest(".nav-pills");
      const position = {
        left: navPills.scrollLeft,
        // current scroll
        x: event.clientX // mouse position
      };

      const mouseDragScroll = function (e) {
        let mouseChange = e.clientX - position.x;
        navPills.scrollLeft = position.left - mouseChange;
      };
      navPills.querySelectorAll("a").forEach(a => {
        a.style.cursor = "grabbing";
      });
      const removeDragScroll = function () {
        document.removeEventListener("mousemove", mouseDragScroll);
        navPills.querySelectorAll("a").forEach(a => {
          a.style.cursor = "pointer";
        });
      };
      document.addEventListener("mousemove", mouseDragScroll);
      document.addEventListener("mouseup", removeDragScroll, {
        once: true
      });
    }
    horizontalScroll(event) {
      // Do nothing if it is not left mousedown
      if (event.which !== 1) {
        return;
      }
      let scrollSpeed = 175;
      let siblingTarget = event.target.previousElementSibling;
      if (event.target.dataset.direction === "left") {
        scrollSpeed = scrollSpeed * -1;
        siblingTarget = event.target.nextElementSibling;
      }
      siblingTarget.scrollLeft += scrollSpeed;
      this.scrollInterval = setInterval(function () {
        siblingTarget.scrollLeft += scrollSpeed;
      }, 50);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "hasScroll", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "hideRightScroll", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "hideLeftScroll", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "scrollToActive", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "scrollToActive"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "checkScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "checkScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stopScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "stopScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "watchScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "watchScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "scrollDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "scrollDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "horizontalScroll", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "horizontalScroll"), _class.prototype)), _class);
  _exports.default = HorizontalOverflowNav;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, HorizontalOverflowNav);
});