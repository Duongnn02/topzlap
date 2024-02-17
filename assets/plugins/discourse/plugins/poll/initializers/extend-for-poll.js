define("discourse/plugins/poll/initializers/extend-for-poll", ["exports", "@ember/object", "discourse/widgets/glue", "discourse-common/lib/get-owner", "discourse-common/utils/decorators", "discourse/lib/plugin-api"], function (_exports, _object, _glue, _getOwner, _decorators, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/widgets/glue",0,"discourse-common/lib/get-owner",0,"discourse-common/utils/decorators",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const PLUGIN_ID = "discourse-poll";
  let _glued = [];
  let _interval = null;
  function rerender() {
    _glued.forEach(g => g.queueRerender());
  }
  function cleanUpPolls() {
    if (_interval) {
      clearInterval(_interval);
      _interval = null;
    }
    _glued.forEach(g => g.cleanUp());
    _glued = [];
  }
  function initializePolls(api) {
    var _obj, _dec, _obj2;
    const register = (0, _getOwner.getRegister)(api),
      pollGroupableUserFields = api.container.lookup("service:site-settings").poll_groupable_user_fields;
    cleanUpPolls();
    api.modifyClass("controller:topic", (_obj = {
      pluginId: PLUGIN_ID,
      subscribe() {
        this._super(...arguments);
        this.messageBus.subscribe(`/polls/${this.model.id}`, this._onPollMessage);
      },
      unsubscribe() {
        this.messageBus.unsubscribe("/polls/*", this._onPollMessage);
        this._super(...arguments);
      },
      _onPollMessage(msg) {
        const post = this.get("model.postStream").findLoadedPost(msg.post_id);
        post?.set("polls", msg.polls);
      }
    }, (_applyDecoratedDescriptor(_obj, "_onPollMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_onPollMessage"), _obj)), _obj));
    api.modifyClass("model:post", (_dec = (0, _decorators.observes)("polls"), (_obj2 = {
      pluginId: PLUGIN_ID,
      _polls: null,
      pollsObject: null,
      pollsChanged() {
        const polls = this.polls;
        if (polls) {
          this._polls = this._polls || {};
          polls.forEach(p => {
            const existing = this._polls[p.name];
            if (existing) {
              this._polls[p.name].setProperties(p);
            } else {
              this._polls[p.name] = _object.default.create(p);
            }
          });
          this.set("pollsObject", this._polls);
          rerender();
        }
      }
    }, (_applyDecoratedDescriptor(_obj2, "pollsChanged", [_dec], Object.getOwnPropertyDescriptor(_obj2, "pollsChanged"), _obj2)), _obj2)));
    function attachPolls(elem, helper) {
      let pollNodes = [...elem.querySelectorAll(".poll")];
      pollNodes = pollNodes.filter(node => node.parentNode.tagName !== "BLOCKQUOTE");
      if (!pollNodes.length || !helper) {
        return;
      }
      const post = helper.getModel();
      api.preventCloak(post.id);
      post.pollsChanged();
      const polls = post.pollsObject || {};
      const votes = post.polls_votes || {};
      _interval = _interval || setInterval(rerender, 30000);
      pollNodes.forEach(pollNode => {
        const pollName = pollNode.dataset.pollName;
        let poll = polls[pollName];
        let pollPost = post;
        let vote = votes[pollName] || [];
        const quotedId = pollNode.closest(".expanded-quote")?.dataset.postId;
        if (quotedId && post.quoted[quotedId]) {
          pollPost = post.quoted[quotedId];
          pollPost = _object.default.create(pollPost);
          poll = _object.default.create(pollPost.polls.findBy("name", pollName));
          vote = pollPost.polls_votes || {};
          vote = vote[pollName] || [];
        }
        if (poll) {
          const titleElement = pollNode.querySelector(".poll-title");
          const attrs = {
            id: `${pollName}-${pollPost.id}`,
            post: pollPost,
            poll,
            vote,
            hasSavedVote: vote.length > 0,
            titleHTML: titleElement?.outerHTML,
            groupableUserFields: (pollGroupableUserFields || "").split("|").filter(Boolean)
          };
          const glue = new _glue.default("discourse-poll", register, attrs);
          glue.appendTo(pollNode);
          _glued.push(glue);
        }
      });
    }
    api.includePostAttributes("polls", "polls_votes");
    api.decorateCookedElement(attachPolls, {
      onlyStream: true,
      id: "discourse-poll"
    });
    api.cleanupStream(cleanUpPolls);
    const siteSettings = api.container.lookup("site-settings:main");
    if (siteSettings.poll_enabled) {
      api.addSearchSuggestion("in:polls");
    }
  }
  var _default = {
    name: "extend-for-poll",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.7", initializePolls);
    }
  };
  _exports.default = _default;
});