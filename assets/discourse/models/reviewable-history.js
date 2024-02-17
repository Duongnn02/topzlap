define("discourse/models/reviewable-history", ["exports", "discourse/models/rest", "@ember/object/computed"], function (_exports, _rest, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.TRANSITIONED_TO = _exports.EDITED = _exports.CREATED = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const CREATED = 0;
  _exports.CREATED = CREATED;
  const TRANSITIONED_TO = 1;
  _exports.TRANSITIONED_TO = TRANSITIONED_TO;
  const EDITED = 2;
  _exports.EDITED = EDITED;
  var _default = _rest.default.extend({
    created: (0, _computed.equal)("reviewable_history_type", CREATED)
  });
  _exports.default = _default;
});