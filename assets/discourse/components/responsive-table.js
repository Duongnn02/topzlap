define("discourse/components/responsive-table", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@glimmer/tracking"], function (_exports, _component, _templateFactory, _decorators, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="directory-table-container">
    <div class="directory-table-top-scroll" {{on "scroll" this.onTopScroll}}>
      <div class="directory-table-top-scroll-fake-content"></div>
    </div>
    <div
      class={{concat-class "directory-table" @className}}
      role="table"
      aria-label={{@ariaLabel}}
      style={{@style}}
      {{did-insert this.checkScroll}}
      {{did-update this.checkScroll @updates}}
      {{on-resize this.checkScroll}}
      {{on "scroll" this.onBottomScroll}}
    >
      <div class="directory-table__header">
        {{yield to="header"}}
      </div>
      <div class="directory-table__body">
        {{yield to="body"}}
      </div>
    </div>
  </div>
  */
  {
    "id": "8n0K9JK6",
    "block": "[[[10,0],[14,0,\"directory-table-container\"],[12],[1,\"\\n  \"],[11,0],[24,0,\"directory-table-top-scroll\"],[4,[38,0],[\"scroll\",[30,0,[\"onTopScroll\"]]],null],[12],[1,\"\\n    \"],[10,0],[14,0,\"directory-table-top-scroll-fake-content\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[11,0],[16,0,[28,[37,1],[\"directory-table\",[30,1]],null]],[24,\"role\",\"table\"],[16,\"aria-label\",[30,2]],[16,5,[30,3]],[4,[38,2],[[30,0,[\"checkScroll\"]]],null],[4,[38,3],[[30,0,[\"checkScroll\"]],[30,4]],null],[4,[38,4],[[30,0,[\"checkScroll\"]]],null],[4,[38,0],[\"scroll\",[30,0,[\"onBottomScroll\"]]],null],[12],[1,\"\\n    \"],[10,0],[14,0,\"directory-table__header\"],[12],[1,\"\\n      \"],[18,5,null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"directory-table__body\"],[12],[1,\"\\n      \"],[18,6,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@className\",\"@ariaLabel\",\"@style\",\"@updates\",\"&header\",\"&body\"],false,[\"on\",\"concat-class\",\"did-insert\",\"did-update\",\"on-resize\",\"yield\"]]",
    "moduleName": "discourse/components/responsive-table.hbs",
    "isStrictMode": false
  });
  let ResponsiveTable = (_class = class ResponsiveTable extends _component.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "lastScrollPosition", _descriptor, this);
      _initializerDefineProperty(this, "ticking", _descriptor2, this);
      _initializerDefineProperty(this, "_table", _descriptor3, this);
      _initializerDefineProperty(this, "_topHorizontalScrollBar", _descriptor4, this);
    }
    checkScroll() {
      const _fakeScrollContent = document.querySelector(".directory-table-top-scroll-fake-content");
      if (this._table.getBoundingClientRect().bottom < window.innerHeight) {
        // Bottom of the table is visible. Hide the scrollbar
        _fakeScrollContent.style.height = 0;
      } else {
        _fakeScrollContent.style.width = `${this._table.scrollWidth}px`;
        _fakeScrollContent.style.height = "1px";
      }
    }
    onTopScroll() {
      this.onHorizontalScroll(this._topHorizontalScrollBar, this._table);
    }
    onBottomScroll() {
      this.onHorizontalScroll(this._table, this._topHorizontalScrollBar);
    }
    onHorizontalScroll(primary, replica) {
      this.set("lastScrollPosition", primary?.scrollLeft);
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          replica.scrollLeft = this.lastScrollPosition;
          this.set("ticking", false);
        });
        this.set("ticking", true);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "lastScrollPosition", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "ticking", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_table", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return document.querySelector(".directory-table");
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_topHorizontalScrollBar", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return document.querySelector(".directory-table-top-scroll");
    }
  }), _applyDecoratedDescriptor(_class.prototype, "checkScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "checkScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onTopScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onTopScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onBottomScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onBottomScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onHorizontalScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onHorizontalScroll"), _class.prototype)), _class);
  _exports.default = ResponsiveTable;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ResponsiveTable);
});