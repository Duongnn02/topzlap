define("discourse/lib/render-tags", ["exports", "I18n", "discourse/lib/render-tag"], function (_exports, _I18n, _renderTag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addTagsHtmlCallback = addTagsHtmlCallback;
  _exports.clearTagsHtmlCallbacks = clearTagsHtmlCallbacks;
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/render-tag"eaimeta@70e063a35619d71f
  let callbacks = null;
  let priorities = null;
  function addTagsHtmlCallback(callback, options) {
    callbacks = callbacks || [];
    priorities = priorities || [];
    const priority = options && options.priority || 0;
    let i = 0;
    while (i < priorities.length && priorities[i] > priority) {
      i += 1;
    }
    priorities.splice(i, 0, priority);
    callbacks.splice(i, 0, callback);
  }
  function clearTagsHtmlCallbacks() {
    callbacks = null;
    priorities = null;
  }
  function _default(topic, params) {
    let tags = topic.tags;
    let buffer = "";
    let tagsForUser = null;
    let tagName;
    const isPrivateMessage = topic.get("isPrivateMessage");
    if (params) {
      if (params.mode === "list") {
        tags = topic.get("visibleListTags");
      }
      if (params.tagsForUser) {
        tagsForUser = params.tagsForUser;
      }
      if (params.tagName) {
        tagName = params.tagName;
      }
    }
    let customHtml = null;
    if (callbacks) {
      callbacks.forEach(c => {
        const html = c(topic, params);
        if (html) {
          if (customHtml) {
            customHtml += html;
          } else {
            customHtml = html;
          }
        }
      });
    }
    if (customHtml || tags && tags.length > 0) {
      buffer = `<div class='discourse-tags' role='list' 
                aria-label=${_I18n.default.t("tagging.tags")}>`;
      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          buffer += (0, _renderTag.default)(tags[i], {
            description: topic.tags_descriptions && topic.tags_descriptions[tags[i]],
            isPrivateMessage,
            tagsForUser,
            tagName
          }) + " ";
        }
      }
      if (customHtml) {
        buffer += customHtml;
      }
      buffer += "</div>";
    }
    return buffer;
  }
});