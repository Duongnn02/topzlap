define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-count", ["exports", "discourse/widgets/widget", "discourse-common/lib/get-url", "virtual-dom", "discourse/lib/ajax"], function (_exports, _widget, _getUrl, _virtualDom, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("vote-count", {
    tagName: "div.vote-count-wrapper",
    buildKey: () => "vote-count",
    buildClasses() {
      if (this.attrs.vote_count === 0) {
        return "no-votes";
      }
    },
    defaultState() {
      return {
        whoVotedUsers: null
      };
    },
    html(attrs) {
      let voteCount = (0, _virtualDom.h)("div.vote-count", attrs.vote_count.toString());
      let whoVoted = null;
      if (this.siteSettings.voting_show_who_voted && this.state.whoVotedUsers && this.state.whoVotedUsers.length > 0) {
        whoVoted = this.attach("small-user-list", {
          users: this.state.whoVotedUsers,
          addSelf: attrs.liked,
          listClassName: "regular-votes"
        });
      }
      let buffer = [voteCount];
      if (whoVoted) {
        buffer.push((0, _virtualDom.h)("div.who-voted.popup-menu.voting-popup-menu", [whoVoted]));
      }
      return buffer;
    },
    click() {
      if (!this.currentUser) {
        this.sendWidgetAction("showLogin");
        $.cookie("destination_url", window.location.href);
        return;
      }
      if (this.siteSettings.voting_show_who_voted && this.attrs.vote_count > 0) {
        if (this.state.whoVotedUsers === null) {
          return this.getWhoVoted();
        } else {
          $(".who-voted").toggle();
        }
      }
    },
    clickOutside() {
      $(".who-voted").hide();
    },
    getWhoVoted() {
      return (0, _ajax.ajax)("/voting/who", {
        type: "GET",
        data: {
          topic_id: this.attrs.id
        }
      }).then(users => {
        this.state.whoVotedUsers = users.map(whoVotedAvatars);
      });
    }
  });
  _exports.default = _default;
  function whoVotedAvatars(user) {
    return {
      template: user.avatar_template,
      username: user.username,
      post_url: user.post_url,
      url: (0, _getUrl.default)("/u/") + user.username.toLowerCase()
    };
  }
});