define("discourse/templates/list/visited-line", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "  <tr class='topic-list-item-separator'>\n    <td class=\"topic-list-data\" colspan=\"6\">\n      <span>\n        " + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "topics.new_messages_marker", {
        "name": "i18n",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 5,
            "column": 8
          },
          "end": {
            "line": 5,
            "column": 45
          }
        }
      })) + "\n      </span>\n    </td>\n  </tr>\n";
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "view.isLastVisited", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 7
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/visited-line", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});