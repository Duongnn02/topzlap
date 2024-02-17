define("discourse/lib/update-user-status-on-mention", ["exports", "discourse/lib/utilities", "discourse/lib/text", "discourse/lib/formatter"], function (_exports, _utilities, _text, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.updateUserStatusOnMention = updateUserStatusOnMention;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse/lib/text",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  function updateUserStatusOnMention(mention, status, currentUser) {
    removeStatus(mention);
    if (status) {
      const html = statusHtml(status, currentUser);
      mention.insertAdjacentHTML("beforeend", html);
    }
  }
  function removeStatus(mention) {
    mention.querySelector("img.user-status")?.remove();
  }
  function statusHtml(status, currentUser) {
    const emoji = (0, _utilities.escapeExpression)(`:${status.emoji}:`);
    return (0, _text.emojiUnescape)(emoji, {
      class: "user-status",
      title: statusTitle(status, currentUser)
    });
  }
  function statusTitle(status, currentUser) {
    if (!status.ends_at) {
      return status.description;
    }
    const timezone = currentUser ? currentUser.user_option?.timezone : moment.tz.guess();
    const until_ = (0, _formatter.until)(status.ends_at, timezone, currentUser?.locale);
    return (0, _utilities.escapeExpression)(`${status.description} ${until_}`);
  }
});