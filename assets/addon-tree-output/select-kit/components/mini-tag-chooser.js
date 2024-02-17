define("select-kit/components/mini-tag-chooser", ["exports", "@ember/object/computed", "select-kit/components/multi-select", "I18n", "select-kit/mixins/tags", "@ember/object", "discourse-common/lib/helpers", "discourse/lib/computed"], function (_exports, _computed, _multiSelect, _I18n, _tags, _object, _helpers, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"select-kit/components/multi-select",0,"I18n",0,"select-kit/mixins/tags",0,"@ember/object",0,"discourse-common/lib/helpers",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend(_tags.default, {
    pluginApiIdentifiers: ["mini-tag-chooser"],
    attributeBindings: ["selectKit.options.categoryId:category-id"],
    classNames: ["mini-tag-chooser"],
    classNameBindings: ["noTags"],
    noTags: (0, _computed.empty)("value"),
    maxTagSearchResults: (0, _computed2.setting)("max_tag_search_results"),
    maxTagsPerTopic: (0, _computed2.setting)("max_tags_per_topic"),
    selectKitOptions: {
      fullWidthOnMobile: true,
      filterable: true,
      caretDownIcon: "caretIcon",
      caretUpIcon: "caretIcon",
      termMatchesForbidden: false,
      categoryId: null,
      everyTag: false,
      closeOnChange: false,
      maximum: "maxTagsPerTopic",
      autoInsertNoneItem: false
    },
    modifyComponentForRow(collection, item) {
      if (this.getValue(item) === this.selectKit.filter && !item.count) {
        return "select-kit/select-kit-row";
      }
      return "tag-row";
    },
    modifyNoSelection() {
      if (this.selectKit.options.minimum > 0) {
        return this.defaultItem(null, _I18n.default.t("tagging.choose_for_topic_required", {
          count: this.selectKit.options.minimum
        }));
      } else {
        return this.defaultItem(null, _I18n.default.t("tagging.choose_for_topic"));
      }
    },
    allowAnyTag: (0, _computed.or)("allowCreate", "site.can_create_tag"),
    caretIcon: (0, _object.computed)("value.[]", "content.[]", function () {
      const maximum = this.selectKit.options.maximum;
      return maximum && (0, _helpers.makeArray)(this.value).length >= parseInt(maximum, 10) ? null : "plus";
    }),
    content: (0, _object.computed)("value.[]", function () {
      let values = (0, _helpers.makeArray)(this.value);
      if (this.selectKit.options.hiddenValues) {
        values = values.filter(val => !this.selectKit.options.hiddenValues.includes(val));
      }
      return values.map(x => this.defaultItem(x, x));
    }),
    search(filter) {
      const data = {
        q: filter || "",
        limit: this.maxTagSearchResults,
        categoryId: this.selectKit.options.categoryId
      };
      if (this.value) {
        data.selected_tags = this.value.slice(0, 100);
      }
      if (!this.selectKit.options.everyTag) {
        data.filterForInput = true;
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
      if (context.siteSettings.tags_sort_alphabetically) {
        results = results.sort((a, b) => a.text.localeCompare(b.text));
      }
      if (json.required_tag_group) {
        context.set("selectKit.options.translatedFilterPlaceholder", _I18n.default.t("tagging.choose_for_topic_required_group", {
          count: json.required_tag_group.min_count,
          name: json.required_tag_group.name
        }));
      } else {
        context.set("selectKit.options.translatedFilterPlaceholder", null);
      }
      return results.filter(r => !(0, _helpers.makeArray)(context.tags).includes(r.id));
    }
  });
  _exports.default = _default;
});