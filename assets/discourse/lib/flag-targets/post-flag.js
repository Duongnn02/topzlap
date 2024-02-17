define("discourse/lib/flag-targets/post-flag", ["exports", "discourse/lib/flag-targets/flag"], function (_exports, _flag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/flag-targets/flag"eaimeta@70e063a35619d71f
  class PostFlag extends _flag.default {
    title() {
      return "flagging.title";
    }
    customSubmitLabel() {
      return "flagging.notify_action";
    }
    submitLabel() {
      return "flagging.action";
    }
    flagCreatedEvent() {
      return "post:flag-created";
    }
    flagsAvailable(_flagController, _site, model) {
      let flagsAvailable = model.flagsAvailable;

      // "message user" option should be at the top
      const notifyUserIndex = flagsAvailable.indexOf(flagsAvailable.filterBy("name_key", "notify_user")[0]);
      if (notifyUserIndex !== -1) {
        const notifyUser = flagsAvailable[notifyUserIndex];
        flagsAvailable.splice(notifyUserIndex, 1);
        flagsAvailable.splice(0, 0, notifyUser);
      }
      return flagsAvailable;
    }
    postActionFor(controller) {
      return controller.get("model.actions_summary").findBy("id", controller.get("selected.id"));
    }
  }
  _exports.default = PostFlag;
});