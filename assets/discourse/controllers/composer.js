define("discourse/controllers/composer", ["exports", "discourse/services/composer"], function (_exports, _composer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "addComposerSaveErrorCallback", {
    enumerable: true,
    get: function () {
      return _composer.addComposerSaveErrorCallback;
    }
  });
  Object.defineProperty(_exports, "addPopupMenuOptionsCallback", {
    enumerable: true,
    get: function () {
      return _composer.addPopupMenuOptionsCallback;
    }
  });
  Object.defineProperty(_exports, "clearComposerSaveErrorCallback", {
    enumerable: true,
    get: function () {
      return _composer.clearComposerSaveErrorCallback;
    }
  });
  Object.defineProperty(_exports, "clearPopupMenuOptionsCallback", {
    enumerable: true,
    get: function () {
      return _composer.clearPopupMenuOptionsCallback;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "toggleCheckDraftPopup", {
    enumerable: true,
    get: function () {
      return _composer.toggleCheckDraftPopup;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"discourse/services/composer"eaimeta@70e063a35619d71f
  // TODO add deprecation
  var _default = _composer.default;
  _exports.default = _default;
});