define("discourse/models/topic-list", ["exports", "@ember/object", "rsvp", "discourse/models/rest", "discourse/models/session", "discourse/models/user", "discourse/lib/ajax", "discourse-common/lib/get-owner", "@ember/utils", "@ember/object/computed"], function (_exports, _object, _rsvp, _rest, _session, _user, _ajax, _getOwner, _utils, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/session",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/lib/get-owner",0,"@ember/utils",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function extractByKey(collection, klass) {
    const retval = {};
    if ((0, _utils.isEmpty)(collection)) {
      return retval;
    }
    collection.forEach(function (item) {
      retval[item.id] = klass.create(item);
    });
    return retval;
  }

  // Whether to show the category badge in topic lists
  function displayCategoryInList(site, category) {
    if (category) {
      if (category.has_children) {
        return true;
      }
      const draftCategoryId = site.shared_drafts_category_id;
      if (draftCategoryId && category.id === draftCategoryId) {
        return true;
      }
      return false;
    }
    return true;
  }
  const TopicList = _rest.default.extend({
    canLoadMore: (0, _computed.notEmpty)("more_topics_url"),
    forEachNew(topics, callback) {
      const topicIds = new Set();
      this.topics.forEach(topic => topicIds.add(topic.id));
      topics.forEach(topic => {
        if (!topicIds.has(topic.id)) {
          callback(topic);
        }
      });
    },
    updateSortParams(order, ascending) {
      let params = Object.assign({}, this.params || {});
      if (params.q) {
        // search is unique, nothing else allowed with it
        params = {
          q: params.q
        };
      } else {
        params.order = order || params.order;
        params.ascending = ascending;
      }
      this.set("params", params);
    },
    loadMore() {
      if (this.loadingMore) {
        return _rsvp.Promise.resolve();
      }
      let moreUrl = this.more_topics_url;
      if (moreUrl) {
        let [url, params] = moreUrl.split("?");

        // ensure we postfix with .json so username paths work
        // correctly
        if (!url.match(/\.json$/)) {
          url += ".json";
        }
        moreUrl = url;
        if (params) {
          moreUrl += "?" + params;
        }
        this.set("loadingMore", true);
        return (0, _ajax.ajax)({
          url: moreUrl
        }).then(result => {
          let topicsAdded = 0;
          if (result) {
            // the new topics loaded from the server
            const newTopics = TopicList.topicsFrom(this.store, result);
            this.forEachNew(newTopics, t => {
              t.set("highlight", topicsAdded++ === 0);
              this.topics.pushObject(t);
            });
            this.setProperties({
              loadingMore: false,
              more_topics_url: result.topic_list.more_topics_url
            });
            _session.default.currentProp("topicList", this);
            return {
              moreTopicsUrl: this.more_topics_url,
              newTopics
            };
          }
        });
      } else {
        // Return a promise indicating no more results
        return _rsvp.Promise.resolve();
      }
    },
    // loads topics with these ids "before" the current topics
    loadBefore(topic_ids, storeInSession) {
      // refresh dupes
      this.topics.removeObjects(this.topics.filter(topic => topic_ids.includes(topic.id)));
      const url = `/${this.filter}.json?topic_ids=${topic_ids.join(",")}`;
      return (0, _ajax.ajax)({
        url,
        data: this.params
      }).then(result => {
        let i = 0;
        this.forEachNew(TopicList.topicsFrom(this.store, result), t => {
          // highlight the first of the new topics so we can get a visual feedback
          t.set("highlight", true);
          this.topics.insertAt(i, t);
          i++;
        });
        if (storeInSession) {
          _session.default.currentProp("topicList", this);
        }
      });
    }
  });
  TopicList.reopenClass({
    topicsFrom(store, result, opts) {
      if (!result) {
        return;
      }
      opts = opts || {};
      let listKey = opts.listKey || "topics";

      // Stitch together our side loaded data

      const users = extractByKey(result.users, _user.default);
      const groups = extractByKey(result.primary_groups, _object.default);
      return result.topic_list[listKey].map(t => {
        t.posters.forEach(p => {
          p.user = users[p.user_id];
          p.extraClasses = p.extras;
          if (p.primary_group_id) {
            p.primary_group = groups[p.primary_group_id];
            if (p.primary_group) {
              p.extraClasses = `${p.extraClasses || ""} group-${p.primary_group.name}`;
            }
          }
        });
        if (t.participants) {
          t.participants.forEach(p => p.user = users[p.user_id]);
        }
        return store.createRecord("topic", t);
      });
    },
    munge(json, store) {
      json.inserted = json.inserted || [];
      json.can_create_topic = json.topic_list.can_create_topic;
      json.more_topics_url = json.topic_list.more_topics_url;
      json.for_period = json.topic_list.for_period;
      json.loaded = true;
      json.per_page = json.topic_list.per_page;
      json.topics = this.topicsFrom(store, json);
      if (json.topic_list.shared_drafts) {
        json.sharedDrafts = this.topicsFrom(store, json, {
          listKey: "shared_drafts"
        });
      }
      return json;
    },
    find(filter, params) {
      const store = (0, _getOwner.getOwner)(this).lookup("service:store");
      return store.findFiltered("topicList", {
        filter,
        params
      });
    },
    // hide the category when it has no children
    hideUniformCategory(list, category) {
      list.set("hideCategory", !displayCategoryInList(list.site, category));
    }
  });
  var _default = TopicList;
  _exports.default = _default;
});