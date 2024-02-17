define("discourse/lib/link-mentions", ["exports", "discourse-common/lib/get-url", "discourse/lib/ajax", "discourse/lib/url", "discourse/lib/utilities"], function (_exports, _getUrl, _ajax, _url, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.fetchUnseenMentions = fetchUnseenMentions;
  _exports.linkSeenMentions = linkSeenMentions;
  _exports.resetMentions = resetMentions;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url",0,"discourse/lib/ajax",0,"discourse/lib/url",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  let checked = {};
  let foundUsers = {};
  let userReasons = {};
  let foundGroups = {};
  let groupReasons = {};
  let maxGroupMention;
  function resetMentions() {
    checked = {};
    foundUsers = {};
    userReasons = {};
    foundGroups = {};
    groupReasons = {};
    maxGroupMention = null;
  }
  function replaceSpan(element, name, opts) {
    const a = document.createElement("a");
    if (opts.group) {
      a.href = (0, _getUrl.default)(`/g/${name}`);
      a.innerText = `@${name}`;
      a.classList.add("mention-group");
      if (!opts.reason && opts.details) {
        a.dataset.mentionableUserCount = opts.details.user_count;
        a.dataset.maxMentions = maxGroupMention;
      }
    } else {
      a.href = (0, _url.userPath)(name.toLowerCase());
      a.innerText = `@${(0, _utilities.formatUsername)(name)}`;
      a.classList.add("mention");
    }
    a.dataset.name = name;
    if (opts.reason) {
      a.dataset.reason = opts.reason;
      if (opts.details) {
        a.dataset.notifiedUserCount = opts.details.notified_count;
      }
    }
    element.replaceWith(a);
  }
  function updateFound(mentions, names) {
    mentions.forEach((mention, index) => {
      const name = names[index];
      if (foundUsers[name.toLowerCase()]) {
        replaceSpan(mention, name, {
          reason: userReasons[name]
        });
      } else if (foundGroups[name]) {
        replaceSpan(mention, name, {
          group: true,
          details: foundGroups[name],
          reason: groupReasons[name]
        });
      } else if (checked[name]) {
        mention.classList.add("mention-tested");
      }
    });
  }
  function linkSeenMentions(element, siteSettings) {
    const mentions = [...element.querySelectorAll("span.mention:not(.mention-tested)")];
    if (mentions.length === 0) {
      return [];
    }
    const names = mentions.map(mention => mention.innerText.slice(1));
    updateFound(mentions, names);
    return names.uniq().filter(name => !checked[name] && name.length >= siteSettings.min_username_length);
  }
  async function fetchUnseenMentions(_ref) {
    let {
      names,
      topicId,
      allowedNames
    } = _ref;
    const response = await (0, _ajax.ajax)("/composer/mentions", {
      data: {
        names,
        topic_id: topicId,
        allowed_names: allowedNames
      }
    });
    names.forEach(name => checked[name] = true);
    response.users.forEach(username => foundUsers[username] = true);
    Object.entries(response.user_reasons).forEach(_ref2 => {
      let [username, reason] = _ref2;
      return userReasons[username] = reason;
    });
    Object.entries(response.groups).forEach(_ref3 => {
      let [name, details] = _ref3;
      return foundGroups[name] = details;
    });
    Object.entries(response.group_reasons).forEach(_ref4 => {
      let [name, reason] = _ref4;
      return groupReasons[name] = reason;
    });
    maxGroupMention = response.max_users_notified_per_group_mention;
    return response;
  }
});