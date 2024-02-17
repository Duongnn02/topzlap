define("select-kit/components/tag-drop", ["exports", "@ember/object/computed", "discourse/lib/computed", "select-kit/components/combo-box", "discourse/lib/url", "select-kit/mixins/tags", "@ember/object", "discourse-common/lib/helpers", "select-kit/components/select-kit"], function (_exports, _computed, _computed2, _comboBox, _url, _tags, _object, _helpers, _selectKit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.NO_TAG_ID = _exports.NONE_TAG_ID = _exports.ALL_TAGS_ID = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/lib/computed",0,"select-kit/components/combo-box",0,"discourse/lib/url",0,"select-kit/mixins/tags",0,"@ember/object",0,"discourse-common/lib/helpers",0,"select-kit/components/select-kit"eaimeta@70e063a35619d71f
  const NO_TAG_ID = "no-tags";
  _exports.NO_TAG_ID = NO_TAG_ID;
  const ALL_TAGS_ID = "all-tags";
  _exports.ALL_TAGS_ID = ALL_TAGS_ID;
  const NONE_TAG_ID = "none";
  _exports.NONE_TAG_ID = NONE_TAG_ID;
  const MORE_TAGS_COLLECTION = "MORE_TAGS_COLLECTION";
  var _default = _comboBox.default.extend(_tags.default, {
    pluginApiIdentifiers: ["tag-drop"],
    classNameBindings: ["categoryStyle", "tagClass"],
    classNames: ["tag-drop"],
    value: (0, _computed.readOnly)("tagId"),
    categoryStyle: (0, _computed2.setting)("category_style"),
    maxTagSearchResults: (0, _computed2.setting)("max_tag_search_results"),
    sortTagsAlphabetically: (0, _computed2.setting)("tags_sort_alphabetically"),
    maxTagsInFilterList: (0, _computed2.setting)("max_tags_in_filter_list"),
    shouldShowMoreTags: (0, _object.computed)("maxTagsInFilterList", "topTags.[]", function () {
      return this.topTags.length > this.maxTagsInFilterList;
    }),
    selectKitOptions: {
      allowAny: false,
      caretDownIcon: "caret-right",
      caretUpIcon: "caret-down",
      fullWidthOnMobile: true,
      filterable: true,
      headerComponent: "tag-drop/tag-drop-header",
      autoInsertNoneItem: false
    },
    noTagsSelected: (0, _computed.equal)("tagId", NONE_TAG_ID),
    init() {
      this._super(...arguments);
      this.insertAfterCollection(_selectKit.MAIN_COLLECTION, MORE_TAGS_COLLECTION);
    },
    modifyComponentForCollection(collection) {
      if (collection === MORE_TAGS_COLLECTION) {
        return "tag-drop/more-tags-collection";
      }
    },
    modifyContentForCollection(collection) {
      if (collection === MORE_TAGS_COLLECTION) {
        return {
          shouldShowMoreTags: this.shouldShowMoreTags
        };
      }
    },
    modifyNoSelection() {
      if (this.noTagsSelected) {
        return this.defaultItem(NO_TAG_ID, this.noTagsLabel);
      } else {
        return this.defaultItem(ALL_TAGS_ID, this.allTagsLabel);
      }
    },
    modifySelection(content) {
      if (this.tagId) {
        if (this.noTagsSelected) {
          content = this.defaultItem(NO_TAG_ID, this.noTagsLabel);
        } else {
          content = this.defaultItem(this.tagId, this.tagId);
        }
      }
      return content;
    },
    tagClass: (0, _object.computed)("tagId", function () {
      return this.tagId ? `tag-${this.tagId}` : "tag_all";
    }),
    allTagsLabel: (0, _computed2.i18n)("tagging.selector_all_tags"),
    noTagsLabel: (0, _computed2.i18n)("tagging.selector_no_tags"),
    modifyComponentForRow() {
      return "tag-row";
    },
    shortcuts: (0, _object.computed)("tagId", function () {
      const shortcuts = [];
      if (this.tagId !== NONE_TAG_ID) {
        shortcuts.push({
          id: NO_TAG_ID,
          name: this.noTagsLabel
        });
      }
      if (this.tagId) {
        shortcuts.push({
          id: ALL_TAGS_ID,
          name: this.allTagsLabel
        });
      }
      return shortcuts;
    }),
    topTags: (0, _object.computed)("currentCategory", "site.category_top_tags.[]", "site.top_tags.[]", function () {
      if (this.currentCategory && this.site.category_top_tags) {
        return this.site.category_top_tags || [];
      }
      return this.site.top_tags || [];
    }),
    content: (0, _object.computed)("topTags.[]", "shortcuts.[]", function () {
      const topTags = this.topTags.slice(0, this.maxTagsInFilterList);
      if (this.sortTagsAlphabetically && topTags) {
        return this.shortcuts.concat(topTags.sort());
      } else {
        return this.shortcuts.concat((0, _helpers.makeArray)(topTags));
      }
    }),
    search(filter) {
      if (filter) {
        const data = {
          q: filter,
          limit: this.maxTagSearchResults
        };
        return this.searchTags("/tags/filter/search", data, this._transformJson);
      } else {
        return (this.content || []).map(tag => {
          if (tag.id && tag.name) {
            return tag;
          }
          return this.defaultItem(tag, tag);
        });
      }
    },
    _transformJson(context, json) {
      return json.results.sort((a, b) => a.id > b.id).map(r => {
        const content = context.defaultItem(r.id, r.text);
        content.targetTagId = r.target_tag || r.id;
        if (!context.currentCategory) {
          content.count = r.count;
        }
        content.pmCount = r.pm_count;
        return content;
      });
    },
    actions: {
      onChange(tagId, tag) {
        if (tagId === NO_TAG_ID) {
          tagId = NONE_TAG_ID;
        } else if (tagId === ALL_TAGS_ID) {
          tagId = null;
        } else if (tag && tag.targetTagId) {
          tagId = tag.targetTagId;
        }
        _url.default.routeToUrl((0, _url.getCategoryAndTagUrl)(this.currentCategory, !this.noSubcategories, tagId));
      }
    }
  });
  _exports.default = _default;
});