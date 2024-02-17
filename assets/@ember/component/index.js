define("@ember/component/index", ["exports", "@glimmer/manager", "@ember/-internals/glimmer"], function (_exports, _manager, _glimmer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Input", {
    enumerable: true,
    get: function () {
      return _glimmer.Input;
    }
  });
  Object.defineProperty(_exports, "capabilities", {
    enumerable: true,
    get: function () {
      return _glimmer.componentCapabilities;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _glimmer.Component;
    }
  });
  Object.defineProperty(_exports, "getComponentTemplate", {
    enumerable: true,
    get: function () {
      return _manager.getComponentTemplate;
    }
  });
  Object.defineProperty(_exports, "setComponentManager", {
    enumerable: true,
    get: function () {
      return _glimmer.setComponentManager;
    }
  });
  Object.defineProperty(_exports, "setComponentTemplate", {
    enumerable: true,
    get: function () {
      return _manager.setComponentTemplate;
    }
  });
});