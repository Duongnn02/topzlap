define("select-kit/components/tag-chooser", ["exports", "select-kit/components/multi-select", "select-kit/mixins/tags", "@ember/object", "discourse-common/lib/helpers"], function (_exports, _multiSelect, _tags, _object, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/multi-select",0,"select-kit/mixins/tags",0,"@ember/object",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend(_tags.default, {
    pluginApiIdentifiers: ["tag-chooser"],
    classNames: ["tag-chooser"],
    selectKitOptions: {
      filterable: true,
      filterPlaceholder: "tagging.choose_for_topic",
      limit: null,
      allowAny: "canCreateTag",
      maximum: "maximumTagCount"
    },
    modifyComponentForRow(collection, item) {
      if (this.getValue(item) === this.selectKit.filter && !item.count) {
        return "select-kit/select-kit-row";
      }
      return "tag-chooser-row";
    },
    blockedTags: null,
    attributeBindings: ["categoryId"],
    excludeSynonyms: false,
    excludeHasSynonyms: false,
    canCreateTag: (0, _object.computed)("site.can_create_tag", "allowCreate", function () {
      return this.allowCreate && this.site.can_create_tag;
    }),
    maximumTagCount: (0, _object.computed)("siteSettings.max_tags_per_topic", "unlimitedTagCount", function () {
      if (!this.unlimitedTagCount) {
        return parseInt(this.options.limit || this.options.maximum || this.siteSettings.max_tags_per_topic, 10);
      }
      return null;
    }),
    init() {
      this._super(...arguments);
      this.setProperties({
        blockedTags: this.blockedTags || [],
        termMatchesForbidden: false,
        termMatchErrorMessage: null
      });
    },
    value: (0, _object.computed)("tags.[]", function () {
      return (0, _helpers.makeArray)(this.tags).uniq();
    }),
    content: (0, _object.computed)("tags.[]", function () {
      return (0, _helpers.makeArray)(this.tags).uniq().map(t => this.defaultItem(t, t));
    }),
    actions: {
      onChange(value, items) {
        if (this.attrs.onChange) {
          this.attrs.onChange(value, items);
        } else {
          this.set("tags", value);
        }
      }
    },
    search(query) {
      const selectedTags = (0, _helpers.makeArray)(this.tags).filter(Boolean);
      const data = {
        q: query,
        limit: this.siteSettings.max_tag_search_results,
        categoryId: this.categoryId
      };
      if (selectedTags.length || this.blockedTags.length) {
        data.selected_tags = selectedTags.concat(this.blockedTags).uniq().slice(0, 100);
      }
      if (!this.everyTag) {
        data.filterForInput = true;
      }
      if (this.excludeSynonyms) {
        data.excludeSynonyms = true;
      }
      if (this.excludeHasSynonyms) {
        data.excludeHasSynonyms = true;
      }
      return this.searchTags("/tags/filter/search", data, this._transformJson);
    },
    _transformJson(context, json) {
      if (context.isDestroyed || context.isDestroying) {
        return [];
      }
      let results = json.results;
      context.setProperties({
        termMatchesForbidden: json.forbidden ? true : false,
        termMatchErrorMessage: json.forbidden_message
      });
      if (context.blockedTags) {
        results = results.filter(result => {
          return !context.blockedTags.includes(result.id);
        });
      }
      if (context.siteSettings.tags_sort_alphabetically) {
        results = results.sort((a, b) => a.id > b.id);
      }
      return results.uniqBy("id");
    }
  });
  _exports.default = _default;
});