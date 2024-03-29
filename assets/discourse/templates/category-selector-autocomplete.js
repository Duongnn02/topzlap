define("discourse/templates/category-selector-autocomplete", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "1": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "      <li><a href>" + container.escapeExpression((lookupProperty(helpers, "category-link") || depth0 && lookupProperty(depth0, "category-link") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "option", {
        "name": "category-link",
        "hash": {
          "link": "false",
          "allowUncategorized": "true"
        },
        "hashTypes": {
          "link": "StringLiteral",
          "allowUncategorized": "StringLiteral"
        },
        "hashContexts": {
          "link": depth0,
          "allowUncategorized": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 18
          },
          "end": {
            "line": 4,
            "column": 81
          }
        }
      })) + "</a></li>\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class='autocomplete ac-category'>\n  <ul>\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, "option", "in", "options", {
        "name": "each",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression", "CommentStatement", "PathExpression"],
        "contexts": [depth0, depth0, depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 4
          },
          "end": {
            "line": 5,
            "column": 13
          }
        }
      })) != null ? stack1 : "") + "  </ul>\n</div>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("category-selector-autocomplete", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});