define("discourse/routes/user-private-messages-group-unread", ["exports", "discourse/routes/build-private-messages-group-route", "discourse/routes/build-private-messages-route"], function (_exports, _buildPrivateMessagesGroupRoute, _buildPrivateMessagesRoute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-private-messages-group-route",0,"discourse/routes/build-private-messages-route"eaimeta@70e063a35619d71f
  var _default = (0, _buildPrivateMessagesGroupRoute.default)("group", _buildPrivateMessagesRoute.UNREAD_FILTER);
  _exports.default = _default;
});