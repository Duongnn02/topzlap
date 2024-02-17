define("@glimmer/low-level", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Storage = _exports.Stack = void 0;
  class Storage {
    constructor() {
      this.array = [];
      this.next = 0;
    }
    add(element) {
      var {
        next: slot,
        array
      } = this;
      if (slot === array.length) {
        this.next++;
      } else {
        var prev = array[slot];
        this.next = prev;
      }
      this.array[slot] = element;
      return slot;
    }
    deref(pointer) {
      return this.array[pointer];
    }
    drop(pointer) {
      this.array[pointer] = this.next;
      this.next = pointer;
    }
  }
  _exports.Storage = Storage;
  class Stack {
    constructor(vec) {
      if (vec === void 0) {
        vec = [];
      }
      this.vec = vec;
    }
    clone() {
      return new Stack(this.vec.slice());
    }
    sliceFrom(start) {
      return new Stack(this.vec.slice(start));
    }
    slice(start, end) {
      return new Stack(this.vec.slice(start, end));
    }
    copy(from, to) {
      this.vec[to] = this.vec[from];
    } // TODO: how to model u64 argument?

    writeRaw(pos, value) {
      // TODO: Grow?
      this.vec[pos] = value;
    } // TODO: partially decoded enum?

    getRaw(pos) {
      return this.vec[pos];
    }
    reset() {
      this.vec.length = 0;
    }
    len() {
      return this.vec.length;
    }
  }
  _exports.Stack = Stack;
});