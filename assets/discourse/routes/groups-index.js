define("discourse/routes/groups-index", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class GroupsIndexRoute extends _discourse.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "queryParams", {
        order: {
          refreshModel: true,
          replace: true
        },
        asc: {
          refreshModel: true,
          replace: true
        },
        filter: {
          refreshModel: true
        },
        type: {
          refreshModel: true,
          replace: true
        },
        username: {
          refreshModel: true
        }
      });
    }
    titleToken() {
      return _I18n.default.t("groups.index.title");
    }
    model(params) {
      return params;
    }
    setupController(controller, params) {
      controller.loadGroups(params);
    }
  }
  _exports.default = GroupsIndexRoute;
});