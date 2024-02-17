define("discourse/components/sidebar/user/section-link", ["exports", "@glimmer/tracking", "discourse-common/utils/decorators", "discourse/lib/sidebar/route-info-helper", "discourse-common/lib/later"], function (_exports, _tracking, _decorators, _routeInfoHelper, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _calcMouseY;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/tracking",0,"discourse-common/utils/decorators",0,"discourse/lib/sidebar/route-info-helper",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const TOUCH_SCREEN_DELAY = 300;
  const MOUSE_DELAY = 250;
  let SectionLink = (_class = (_calcMouseY = /*#__PURE__*/new WeakSet(), class SectionLink {
    constructor(_ref, section, router) {
      let {
        external,
        icon,
        id,
        name,
        value
      } = _ref;
      _classPrivateMethodInitSpec(this, _calcMouseY);
      _initializerDefineProperty(this, "linkDragCss", _descriptor, this);
      this.external = external;
      this.icon = icon;
      this.id = id;
      this.name = name;
      this.value = value;
      this.section = section;
      if (!this.external) {
        const routeInfoHelper = new _routeInfoHelper.default(router, value);
        this.route = routeInfoHelper.route;
        this.models = routeInfoHelper.models;
        this.query = routeInfoHelper.query;
      }
    }
    didStartDrag(event) {
      // 0 represents left button of the mouse
      if (event.button === 0 || event.targetTouches) {
        this.startMouseY = _classPrivateMethodGet(this, _calcMouseY, _calcMouseY2).call(this, event);
        this.willDrag = true;
        (0, _later.default)(() => {
          this.delayedStart(event);
        }, event.targetTouches ? TOUCH_SCREEN_DELAY : MOUSE_DELAY);
      }
    }
    delayedStart(event) {
      if (this.willDrag) {
        const currentMouseY = _classPrivateMethodGet(this, _calcMouseY, _calcMouseY2).call(this, event);
        if (currentMouseY === this.startMouseY) {
          event.stopPropagation();
          event.preventDefault();
          this.mouseY = _classPrivateMethodGet(this, _calcMouseY, _calcMouseY2).call(this, event);
          this.linkDragCss = "drag";
          this.section.disable();
          this.drag = true;
        }
      }
    }
    didEndDrag() {
      this.linkDragCss = null;
      this.mouseY = null;
      this.section.enable();
      this.section.reorder();
      this.willDrag = false;
      this.drag = false;
    }
    dragMove(event) {
      this.startMouseY = _classPrivateMethodGet(this, _calcMouseY, _calcMouseY2).call(this, event);
      if (!this.drag) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const currentMouseY = _classPrivateMethodGet(this, _calcMouseY, _calcMouseY2).call(this, event);
      const distance = currentMouseY - this.mouseY;
      if (!this.linkHeight) {
        this.linkHeight = document.getElementsByClassName("sidebar-section-link-wrapper")[0].clientHeight;
      }
      if (distance >= this.linkHeight) {
        if (this.section.links.indexOf(this) !== this.section.links.length - 1) {
          this.section.moveLinkDown(this);
          this.mouseY = currentMouseY;
        }
      }
      if (distance <= -this.linkHeight) {
        if (this.section.links.indexOf(this) !== 0) {
          this.section.moveLinkUp(this);
          this.mouseY = currentMouseY;
        }
      }
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "linkDragCss", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "didStartDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "didStartDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didEndDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "didEndDrag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dragMove", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "dragMove"), _class.prototype)), _class);
  _exports.default = SectionLink;
  function _calcMouseY2(event) {
    return Math.round(event.targetTouches ? event.targetTouches[0].clientY : event.y);
  }
});