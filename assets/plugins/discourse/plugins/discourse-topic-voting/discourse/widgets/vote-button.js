define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-button", ["exports", "I18n", "discourse/widgets/widget", "virtual-dom"], function (_exports, _I18n, _widget, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("vote-button", {
    tagName: "div",
    buildClasses(attrs) {
      let buttonClass = "";
      if (attrs.closed) {
        buttonClass = "voting-closed";
      } else {
        if (!attrs.user_voted) {
          buttonClass = "nonvote";
        } else {
          if (this.currentUser && this.currentUser.votes_exceeded) {
            buttonClass = "vote-limited nonvote";
          } else {
            buttonClass = "vote";
          }
        }
      }
      if (this.siteSettings.voting_show_who_voted) {
        buttonClass += " show-pointer";
      }
      return buttonClass;
    },
    buildButtonTitle(attrs) {
      if (this.currentUser) {
        if (attrs.closed) {
          return _I18n.default.t("topic_voting.voting_closed_title");
        }
        if (attrs.user_voted) {
          return _I18n.default.t("topic_voting.voted_title");
        }
        if (this.currentUser.votes_exceeded) {
          return _I18n.default.t("topic_voting.voting_limit");
        }
        return _I18n.default.t("topic_voting.vote_title");
      }
      if (attrs.vote_count) {
        return _I18n.default.t("topic_voting.anonymous_button", {
          count: attrs.vote_count
        });
      }
      return _I18n.default.t("topic_voting.anonymous_button", {
        count: 1
      });
    },
    html(attrs) {
      return (0, _virtualDom.h)("button", {
        attributes: {
          title: this.currentUser ? _I18n.default.t("topic_voting.votes_left_button_title", {
            count: this.currentUser.votes_left
          }) : ""
        },
        className: "btn btn-primary vote-button"
      }, this.buildButtonTitle(attrs));
    },
    click() {
      if (!this.currentUser) {
        this.sendWidgetAction("showLogin");
        $.cookie("destination_url", window.location.href);
        return;
      }
      if (!this.attrs.closed && this.parentWidget.state.allowClick && !this.attrs.user_voted && !this.currentUser.votes_exceeded) {
        this.parentWidget.state.allowClick = false;
        this.parentWidget.state.initialVote = true;
        this.sendWidgetAction("addVote");
      }
      if (this.attrs.user_voted || this.currentUser.votes_exceeded) {
        $(".vote-options").toggleClass("hidden");
      }
    },
    clickOutside() {
      $(".vote-options").addClass("hidden");
      this.parentWidget.state.initialVote = false;
    }
  });
  _exports.default = _default;
});