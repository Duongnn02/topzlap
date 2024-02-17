define("discourse/routes/group-activity-mentions", ["exports", "discourse/routes/group-activity-posts"], function (_exports, _groupActivityPosts) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/group-activity-posts"eaimeta@70e063a35619d71f
  var _default = (0, _groupActivityPosts.buildGroupPage)("mentions");
  _exports.default = _default;
});