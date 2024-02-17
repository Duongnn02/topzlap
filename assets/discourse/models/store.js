define("discourse/models/store", ["exports", "discourse-common/lib/deprecated", "discourse/services/store"], function (_exports, _deprecated, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  Object.defineProperty(_exports, "flushMap", {
    enumerable: true,
    get: function () {
      return _store.flushMap;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"discourse/services/store"eaimeta@70e063a35619d71f
  (0, _deprecated.default)(`"discourse/models/store" import is deprecated, use "discourse/services/store" instead`, {
    since: "2.8.0.beta8",
    dropFrom: "2.9.0.beta1",
    id: "discourse.models-store"
  });
});