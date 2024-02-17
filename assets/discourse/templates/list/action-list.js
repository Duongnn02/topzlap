define("discourse/templates/list/action-list", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "1": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class='post-actions " + alias2(lookupProperty(helpers, "get").call(alias1, "className", {
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
            "column": 25
          },
          "end": {
            "line": 2,
            "column": 38
          }
        }
      })) + "'>\n  " + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(alias1, "icon", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 2
          },
          "end": {
            "line": 3,
            "column": 17
          }
        }
      })) + "\n" + ((stack1 = lookupProperty(helpers, "each").call(alias1, "postNumber", "in", "postNumbers", {
        "name": "each",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(2, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression", "CommentStatement", "PathExpression"],
        "contexts": [depth0, depth0, depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 2
          },
          "end": {
            "line": 6,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "</div>\n";
    },
    "2": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "    <a href='" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.url", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 5,
            "column": 13
          },
          "end": {
            "line": 5,
            "column": 26
          }
        }
      })) + "/" + alias2(lookupProperty(helpers, "get").call(alias1, "postNumber", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 5,
            "column": 27
          },
          "end": {
            "line": 5,
            "column": 41
          }
        }
      })) + "'>#" + alias2(lookupProperty(helpers, "get").call(alias1, "postNumber", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 5,
            "column": 44
          },
          "end": {
            "line": 5,
            "column": 58
          }
        }
      })) + "</a>\n";
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "postNumbers", {
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
            "line": 8,
            "column": 7
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/action-list", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});