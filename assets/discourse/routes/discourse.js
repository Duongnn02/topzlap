define("discourse/routes/discourse", ["exports", "discourse/models/composer", "discourse/models/draft", "@ember/routing/route", "@ember/runloop", "discourse/lib/user-presence", "discourse-common/lib/get-owner"], function (_exports, _composer, _draft, _route, _runloop, _userPresence, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"discourse/models/draft",0,"@ember/routing/route",0,"@ember/runloop",0,"discourse/lib/user-presence",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  const DiscourseRoute = _route.default.extend({
    showFooter: false,
    willTransition() {
      (0, _userPresence.seenUser)();
    },
    activate() {
      this._super(...arguments);
      if (this.showFooter) {
        this.controllerFor("application").set("showFooter", true);
      }
    },
    _refreshTitleOnce() {
      this.send("_collectTitleTokens", []);
    },
    actions: {
      _collectTitleTokens(tokens) {
        // If there's a title token method, call it and get the token
        if (this.titleToken) {
          const t = this.titleToken();
          if (t && t.length) {
            if (t instanceof Array) {
              t.forEach(function (ti) {
                tokens.push(ti);
              });
            } else {
              tokens.push(t);
            }
          }
        }
        return true;
      },
      refreshTitle() {
        (0, _runloop.once)(this, this._refreshTitleOnce);
      }
    },
    redirectIfLoginRequired() {
      const app = this.controllerFor("application");
      if (app.get("loginRequired")) {
        this.replaceWith("login");
      }
    },
    openTopicDraft() {
      const composer = (0, _getOwner.getOwner)(this).lookup("service:composer");
      if (composer.get("model.action") === _composer.default.CREATE_TOPIC && composer.get("model.draftKey") === _composer.default.NEW_TOPIC_KEY) {
        composer.set("model.composeState", _composer.default.OPEN);
      } else {
        _draft.default.get(_composer.default.NEW_TOPIC_KEY).then(data => {
          if (data.draft) {
            composer.open({
              action: _composer.default.CREATE_TOPIC,
              draft: data.draft,
              draftKey: _composer.default.NEW_TOPIC_KEY,
              draftSequence: data.draft_sequence
            });
          }
        });
      }
    },
    // deprecated, use isCurrentUser() instead
    isAnotherUsersPage(user) {
      if (!this.currentUser) {
        return true;
      }
      return user.username !== this.currentUser.username;
    },
    isCurrentUser(user) {
      if (!this.currentUser) {
        return false; // the current user is anonymous
      }

      return user.id === this.currentUser.id;
    },
    isPoppedState(transition) {
      return !transition._discourse_intercepted && (!!transition.intent.url || !!transition.queryParamsOnly);
    }
  });
  var _default = DiscourseRoute;
  _exports.default = _default;
});