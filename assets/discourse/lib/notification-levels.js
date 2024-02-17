define("discourse/lib/notification-levels", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.allLevels = _exports.NotificationLevels = void 0;
  _exports.buttonDetails = buttonDetails;
  _exports.topicLevels = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const MUTED = 0;
  const REGULAR = 1;
  const NORMAL = 1; // alias for REGULAR
  const TRACKING = 2;
  const WATCHING = 3;
  const WATCHING_FIRST_POST = 4;
  const NotificationLevels = {
    WATCHING_FIRST_POST,
    WATCHING,
    TRACKING,
    REGULAR,
    NORMAL,
    MUTED
  };
  _exports.NotificationLevels = NotificationLevels;
  function buttonDetails(level) {
    switch (level) {
      case WATCHING_FIRST_POST:
        return {
          id: WATCHING_FIRST_POST,
          key: "watching_first_post",
          icon: "d-watching-first"
        };
      case WATCHING:
        return {
          id: WATCHING,
          key: "watching",
          icon: "d-watching"
        };
      case TRACKING:
        return {
          id: TRACKING,
          key: "tracking",
          icon: "d-tracking"
        };
      case MUTED:
        return {
          id: MUTED,
          key: "muted",
          icon: "d-muted"
        };
      default:
        return {
          id: REGULAR,
          key: "regular",
          icon: "d-regular"
        };
    }
  }
  const allLevels = [WATCHING, TRACKING, WATCHING_FIRST_POST, REGULAR, MUTED].map(buttonDetails);
  _exports.allLevels = allLevels;
  const topicLevels = allLevels.filter(l => l.id !== WATCHING_FIRST_POST);
  _exports.topicLevels = topicLevels;
});