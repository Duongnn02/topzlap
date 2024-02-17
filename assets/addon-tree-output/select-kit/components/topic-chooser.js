define("select-kit/components/topic-chooser", ["exports", "@ember/utils", "discourse/lib/search", "select-kit/components/combo-box"], function (_exports, _utils, _search, _comboBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/utils",0,"discourse/lib/search",0,"select-kit/components/combo-box"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["topic-chooser"],
    classNames: ["topic-chooser"],
    nameProperty: "fancy_title",
    labelProperty: "title",
    titleProperty: "title",
    selectKitOptions: {
      clearable: true,
      filterable: true,
      filterPlaceholder: "choose_topic.title.placeholder",
      additionalFilters: ""
    },
    modifyComponentForRow() {
      return "topic-row";
    },
    search(filter) {
      if ((0, _utils.isEmpty)(filter) && (0, _utils.isEmpty)(this.selectKit.options.additionalFilters)) {
        return [];
      }
      const searchParams = {};
      if (!(0, _utils.isEmpty)(filter)) {
        searchParams.typeFilter = "topic";
        searchParams.restrictToArchetype = "regular";
        searchParams.searchForId = true;
      }
      return (0, _search.searchForTerm)(`${filter} ${this.selectKit.options.additionalFilters}`, searchParams).then(results => {
        if (results?.posts?.length > 0) {
          return results.posts.mapBy("topic");
        }
      });
    }
  });
  _exports.default = _default;
});