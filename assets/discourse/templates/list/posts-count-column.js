define("discourse/templates/list/posts-count-column", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<" + alias2(lookupProperty(helpers, "get").call(alias1, "view.tagName", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1
          },
          "end": {
            "line": 1,
            "column": 17
          }
        }
      })) + " class='num posts-map posts " + alias2(lookupProperty(helpers, "get").call(alias1, "view.likesHeat", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 45
          },
          "end": {
            "line": 1,
            "column": 63
          }
        }
      })) + " topic-list-data' title='" + alias2(lookupProperty(helpers, "get").call(alias1, "view.title", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 88
          },
          "end": {
            "line": 1,
            "column": 102
          }
        }
      })) + "'>\n  <button class=\"btn-link posts-map badge-posts " + alias2(lookupProperty(helpers, "get").call(alias1, "view.likesHeat", {
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
            "column": 48
          },
          "end": {
            "line": 2,
            "column": 66
          }
        }
      })) + "\" aria-label=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "view.title", {
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
            "column": 80
          },
          "end": {
            "line": 2,
            "column": 94
          }
        }
      })) + "\">\n    " + alias2((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias3).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-reply-count"
        },
        "hashTypes": {
          "name": "StringLiteral"
        },
        "hashContexts": {
          "name": depth0
        },
        "types": [],
        "contexts": [],
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 4
          },
          "end": {
            "line": 3,
            "column": 62
          }
        }
      })) + "\n    " + alias2((lookupProperty(helpers, "number") || depth0 && lookupProperty(depth0, "number") || alias3).call(alias1, "topic.replyCount", {
        "name": "number",
        "hash": {
          "noTitle": "true"
        },
        "hashTypes": {
          "noTitle": "StringLiteral"
        },
        "hashContexts": {
          "noTitle": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 4,
            "column": 46
          }
        }
      })) + "\n  </button>\n</" + alias2(lookupProperty(helpers, "get").call(alias1, "view.tagName", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 2
          },
          "end": {
            "line": 6,
            "column": 18
          }
        }
      })) + ">\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/posts-count-column", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});