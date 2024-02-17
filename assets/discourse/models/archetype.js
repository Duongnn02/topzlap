define("discourse/models/archetype", ["exports", "@ember/object/computed", "discourse/models/rest", "discourse/lib/computed"], function (_exports, _computed, _rest, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/models/rest",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    hasOptions: (0, _computed.gt)("options.length", 0),
    isDefault: (0, _computed2.propertyEqual)("id", "site.default_archetype"),
    notDefault: (0, _computed.not)("isDefault")
  });
  _exports.default = _default;
});