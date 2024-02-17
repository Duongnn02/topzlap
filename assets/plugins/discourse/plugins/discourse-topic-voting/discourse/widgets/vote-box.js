define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-box", ["exports", "I18n", "discourse/widgets/widget", "discourse/lib/ajax", "discourse/widgets/raw-html", "discourse/lib/ajax-error"], function (_exports, _I18n, _widget, _ajax, _rawHtml, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/ajax",0,"discourse/widgets/raw-html",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("vote-box", {
    tagName: "div.voting-wrapper",
    buildKey: () => "vote-box",
    buildClasses() {
      if (this.siteSettings.voting_show_who_voted) {
        return "show-pointer";
      }
    },
    defaultState() {
      return {
        allowClick: true,
        initialVote: false
      };
    },
    html(attrs, state) {
      let voteCount = this.attach("vote-count", attrs);
      let voteButton = this.attach("vote-button", attrs);
      let voteOptions = this.attach("vote-options", attrs);
      let contents = [voteCount, voteButton, voteOptions];
      if (state.votesAlert > 0) {
        const html = "<div class='voting-popup-menu vote-options popup-menu'>" + _I18n.default.t("topic_voting.votes_left", {
          count: state.votesAlert,
          path: this.currentUser.get("path") + "/activity/votes"
        }) + "</div>";
        contents.push(new _rawHtml.default({
          html
        }));
      }
      return contents;
    },
    hideVotesAlert() {
      if (this.state.votesAlert) {
        this.state.votesAlert = null;
        this.scheduleRerender();
      }
    },
    click() {
      this.hideVotesAlert();
    },
    clickOutside() {
      this.hideVotesAlert();
    },
    addVote() {
      let topic = this.attrs;
      let state = this.state;
      return (0, _ajax.ajax)("/voting/vote", {
        type: "POST",
        data: {
          topic_id: topic.id
        }
      }).then(result => {
        topic.set("vote_count", result.vote_count);
        topic.set("user_voted", true);
        this.currentUser.setProperties({
          votes_exceeded: !result.can_vote,
          votes_left: result.votes_left
        });
        if (result.alert) {
          state.votesAlert = result.votes_left;
        }
        topic.set("who_voted", result.who_voted);
        state.allowClick = true;
        this.scheduleRerender();
      }).catch(_ajaxError.popupAjaxError);
    },
    removeVote() {
      let topic = this.attrs;
      let state = this.state;
      return (0, _ajax.ajax)("/voting/unvote", {
        type: "POST",
        data: {
          topic_id: topic.id
        }
      }).then(result => {
        topic.set("vote_count", result.vote_count);
        topic.set("user_voted", false);
        this.currentUser.setProperties({
          votes_exceeded: !result.can_vote,
          votes_left: result.votes_left
        });
        topic.set("who_voted", result.who_voted);
        state.allowClick = true;
        this.scheduleRerender();
      }).catch(_ajaxError.popupAjaxError);
    }
  });
  _exports.default = _default;
});