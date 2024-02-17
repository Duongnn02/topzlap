define("select-kit/components/mini-tag-chooser/selected-collection", ["exports", "@ember/object/computed", "@ember/component", "@ember/object", "select-kit/templates/components/mini-tag-chooser/selected-collection"], function (_exports, _computed, _component, _object, _selectedCollection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"@ember/component",0,"@ember/object",0,"select-kit/templates/components/mini-tag-chooser/selected-collection"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    tagName: "",
    layout: _selectedCollection.default,
    selectedTags: (0, _computed.reads)("collection.content.selectedTags.[]"),
    tags: (0, _object.computed)("selectedTags.[]", "selectKit.filter", function () {
      if (!this.selectedTags) {
        return [];
      }
      let tags = this.selectedTags;
      if (tags.length >= 20 && this.selectKit.filter) {
        tags = tags.filter(t => t.includes(this.selectKit.filter));
      } else if (tags.length >= 20) {
        tags = tags.slice(0, 20);
      }
      return tags.map(selectedTag => {
        return {
          value: selectedTag,
          classNames: "selected-tag"
        };
      });
    })
  });
  _exports.default = _default;
});