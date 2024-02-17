define("discourse/templates/list/category-column", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "<td class='category topic-list-data'>" + container.escapeExpression((lookupProperty(helpers, "category-link") || depth0 && lookupProperty(depth0, "category-link") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "category", {
        "name": "category-link",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 37
          },
          "end": {
            "line": 1,
            "column": 63
          }
        }
      })) + "</td>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/category-column", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});