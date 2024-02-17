define("discourse/initializers/edit-notification-clicks-tracker", ["exports", "discourse/models/post-stream"], function (_exports, _postStream) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/post-stream"eaimeta@70e063a35619d71f
  var _default = {
    name: "edit-notification-clicks-tracker",
    initialize(container) {
      const appEvents = container.lookup("service:app-events");
      appEvents.on("edit-notification:clicked", this.handleClick);
    },
    handleClick(_ref) {
      let {
        topicId,
        postNumber,
        revisionNumber
      } = _ref;
      (0, _postStream.setLastEditNotificationClick)(topicId, postNumber, revisionNumber);
    }
  };
  _exports.default = _default;
});