define("discourse/plugins/discourse-solved/discourse/connectors/topic-navigation/no-answer", ["exports", "@ember/runloop", "discourse-common/config/environment"], function (_exports, _runloop, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // milliseconds
  const MAX_DURATION_WITH_NO_ANSWER = ONE_WEEK;
  const DISPLAY_DELAY = (0, _environment.isTesting)() ? 0 : 2000;
  var _default = {
    shouldRender(args, component) {
      return !component.site.mobileView;
    },
    setupComponent(args, component) {
      component.set("show", false);
      component.setProperties({
        oneWeek: ONE_WEEK,
        show: false
      });
      (0, _runloop.later)(() => {
        if (!component.element || component.isDestroying || component.isDestroyed) {
          return;
        }
        const topic = args.topic;
        const currentUser = component.currentUser;

        // show notice if:
        // - user can accept answer
        // - it does not have an accepted answer
        // - topic is old
        // - topic has at least one reply from another user that can be accepted
        if (!topic.accepted_answer && currentUser && topic.user_id === currentUser.id && moment() - moment(topic.created_at) > MAX_DURATION_WITH_NO_ANSWER && topic.postStream.posts.some(post => post.user_id !== currentUser.id && post.can_accept_answer)) {
          component.set("show", true);
        }
      }, DISPLAY_DELAY);
    }
  };
  _exports.default = _default;
});