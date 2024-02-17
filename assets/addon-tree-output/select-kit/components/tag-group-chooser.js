define("select-kit/components/tag-group-chooser", ["exports", "select-kit/components/multi-select", "select-kit/mixins/tags", "@ember/object", "discourse-common/lib/helpers"], function (_exports, _multiSelect, _tags, _object, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/multi-select",0,"select-kit/mixins/tags",0,"@ember/object",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend(_tags.default, {
    pluginApiIdentifiers: ["tag-group-chooser"],
    classNames: ["tag-group-chooser", "tag-chooser"],
    selectKitOptions: {
      allowAny: false,
      filterable: true,
      filterPlaceholder: "category.tag_groups_placeholder",
      limit: null
    },
    modifyComponentForRow() {
      return "tag-chooser-row";
    },
    value: (0, _object.computed)("tagGroups.[]", function () {
      return (0, _helpers.makeArray)(this.tagGroups).uniq();
    }),
    content: (0, _object.computed)("tagGroups.[]", function () {
      return (0, _helpers.makeArray)(this.tagGroups).uniq().map(t => this.defaultItem(t, t));
    }),
    search(query) {
      const data = {
        q: query,
        limit: this.siteSettings.max_tag_search_results
      };
      return this.searchTags("/tag_groups/filter/search", data, this._transformJson).then(results => {
        if (results && results.length) {
          return results.filter(r => {
            return !(0, _helpers.makeArray)(this.tagGroups).includes(this.getValue(r));
          });
        }
      });
    },
    _transformJson(context, json) {
      return json.results.sort((a, b) => a.name > b.name).map(result => {
        return {
          id: result.name,
          name: result.name,
          count: result.count
        };
      });
    }
  });
  _exports.default = _default;
});