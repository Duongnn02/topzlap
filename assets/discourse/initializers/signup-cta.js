define("discourse/initializers/signup-cta", ["exports", "discourse/models/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/session"eaimeta@70e063a35619d71f
  const ANON_TOPIC_IDS = 2;
  const ANON_PROMPT_READ_TIME = 2 * 60 * 1000;
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const PROMPT_HIDE_DURATION = ONE_DAY;
  var _default = {
    name: "signup-cta",
    initialize(container) {
      const screenTrack = container.lookup("service:screen-track");
      const session = _session.default.current();
      const siteSettings = container.lookup("service:site-settings");
      const keyValueStore = container.lookup("service:key-value-store");
      const user = container.lookup("service:current-user");
      const appEvents = container.lookup("service:app-events");

      // Preconditions
      if (user) {
        return;
      } // must not be logged in
      if (keyValueStore.get("anon-cta-never")) {
        return;
      } // "never show again"
      if (!siteSettings.allow_new_registrations) {
        return;
      }
      if (siteSettings.invite_only) {
        return;
      }
      if (siteSettings.login_required) {
        return;
      }
      if (!siteSettings.enable_signup_cta) {
        return;
      }
      function checkSignupCtaRequirements() {
        if (session.get("showSignupCta")) {
          return; // already shown
        }

        if (session.get("hideSignupCta")) {
          return; // hidden for session
        }

        if (keyValueStore.get("anon-cta-never")) {
          return; // hidden forever
        }

        const now = Date.now();
        const hiddenAt = keyValueStore.getInt("anon-cta-hidden", 0);
        if (hiddenAt > now - PROMPT_HIDE_DURATION) {
          return; // hidden in last 24 hours
        }

        const readTime = keyValueStore.getInt("anon-topic-time");
        if (readTime < ANON_PROMPT_READ_TIME) {
          return;
        }
        const topicIdsString = keyValueStore.get("anon-topic-ids");
        if (!topicIdsString) {
          return;
        }
        let topicIdsAry = topicIdsString.split(",");
        if (topicIdsAry.length < ANON_TOPIC_IDS) {
          return;
        }

        // Requirements met.
        session.set("showSignupCta", true);
        appEvents.trigger("cta:shown");
      }
      screenTrack.registerAnonCallback(checkSignupCtaRequirements);
      checkSignupCtaRequirements();
    }
  };
  _exports.default = _default;
});