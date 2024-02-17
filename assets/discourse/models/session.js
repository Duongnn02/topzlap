define("discourse/models/session", ["exports", "discourse/models/rest", "discourse/mixins/singleton"], function (_exports, _rest, _singleton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"discourse/mixins/singleton"eaimeta@70e063a35619d71f
  // A data model representing current session data. You can put transient
  // data here you might want later. It is not stored or serialized anywhere.
  const Session = _rest.default.extend({
    hasFocus: null,
    init() {
      this.set("highestSeenByTopic", {});
    }
  });
  Session.reopenClass(_singleton.default);
  var _default = Session;
  _exports.default = _default;
});