define("discourse/modifiers/draggable", ["exports", "ember-modifier", "@ember/destroyable", "discourse-common/utils/decorators"], function (_exports, _emberModifier, _destroyable, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"ember-modifier",0,"@ember/destroyable",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let DraggableModifier = (_class = class DraggableModifier extends _emberModifier.default {
    constructor(owner, args) {
      super(owner, args);
      _defineProperty(this, "hasStarted", false);
      _defineProperty(this, "element", void 0);
      (0, _destroyable.registerDestructor)(this, instance => instance.cleanup());
    }
    modify(el, _, _ref) {
      let {
        didStartDrag,
        didEndDrag,
        dragMove
      } = _ref;
      this.element = el;
      this.didStartDragCallback = didStartDrag;
      this.didEndDragCallback = didEndDrag;
      this.dragMoveCallback = dragMove;
      this.element.addEventListener("touchstart", this.dragMove, {
        passive: false
      });
      this.element.addEventListener("mousedown", this.dragMove, {
        passive: false
      });
      this.element.addEventListener("dragenter", this.dragMove, {
        passive: false
      });
    }
    dragMove(e) {
      if (!this.hasStarted) {
        this.hasStarted = true;
        if (this.didStartDragCallback) {
          this.didStartDragCallback(e);
        }

        // Register a global event to capture mouse moves when element 'clicked'.
        document.addEventListener("touchmove", this.drag, {
          passive: false
        });
        document.addEventListener("mousemove", this.drag, {
          passive: false
        });
        document.addEventListener("dragover", this.drag, {
          passive: false
        });
        document.body.classList.add("dragging");

        // On leaving click, stop moving.
        document.addEventListener("touchend", this.didEndDrag, {
          passive: false
        });
        document.addEventListener("mouseup", this.didEndDrag, {
          passive: false
        });
        document.addEventListener("drop", this.didEndDrag, {
          passive: false
        });
      }
    }
    drag(e) {
      if (this.hasStarted && this.dragMoveCallback) {
        this.dragMoveCallback(e, this.element);
      }
    }
    didEndDrag(e) {
      if (this.hasStarted) {
        this.didEndDragCallback(e, this.element);
        document.removeEventListener("touchmove", this.drag);
        document.removeEventListener("mousemove", this.drag);
        document.removeEventListener("dragover", this.drag);
        document.body.classList.remove("dragging");
        this.hasStarted = false;
      }
    }
    cleanup() {
      document.removeEventListener("touchstart", this.dragMove);
      document.removeEventListener("mousedown", this.dragMove);
      document.removeEventListener("dragenter", this.dragMove);
      document.removeEventListener("touchend", this.didEndDrag);
      document.removeEventListener("mouseup", this.didEndDrag);
      document.removeEventListener("drop", this.didEndDrag);
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("touchmove", this.drag);
      document.removeEventListener("dragover", this.drag);
      document.body.classList.remove("dragging");
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "dragMove", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "dragMove"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "drag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "drag"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didEndDrag", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "didEndDrag"), _class.prototype)), _class);
  _exports.default = DraggableModifier;
});