define("discourse/templates/list/unread-indicator", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "1": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "&nbsp;<span class='badge badge-notification unread-indicator indicator-topic-" + alias2(lookupProperty(helpers, "get").call(alias1, "topicId", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 79
          },
          "end": {
            "line": 2,
            "column": 90
          }
        }
      })) + " " + alias2(lookupProperty(helpers, "get").call(alias1, "unreadClass", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 91
          },
          "end": {
            "line": 2,
            "column": 106
          }
        }
      })) + "' title='" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.unread_indicator", {
        "name": "i18n",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 115
          },
          "end": {
            "line": 2,
            "column": 148
          }
        }
      })) + "'>" + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || alias3).call(alias1, "asterisk", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 4
          },
          "end": {
            "line": 3,
            "column": 26
          }
        }
      })) + "\n  </span>";
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "includeUnreadIndicator", {
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
            "line": 5,
            "column": 8
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/unread-indicator", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});