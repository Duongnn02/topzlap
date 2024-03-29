define("discourse/templates/list/activity-column", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "<" + alias2(lookupProperty(helpers, "get").call(alias1, "tagName", {
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
            "column": 12
          }
        }
      })) + " class=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "class", {
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
            "column": 20
          },
          "end": {
            "line": 1,
            "column": 29
          }
        }
      })) + " " + alias2((lookupProperty(helpers, "cold-age-class") || depth0 && lookupProperty(depth0, "cold-age-class") || alias3).call(alias1, "topic.createdAt", {
        "name": "cold-age-class",
        "hash": {
          "class": "",
          "startDate": "topic.bumpedAt"
        },
        "hashTypes": {
          "class": "StringLiteral",
          "startDate": "PathExpression"
        },
        "hashContexts": {
          "class": depth0,
          "startDate": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 30
          },
          "end": {
            "line": 1,
            "column": 98
          }
        }
      })) + " activity\" title=\"" + alias2((lookupProperty(helpers, "html-safe") || depth0 && lookupProperty(depth0, "html-safe") || alias3).call(alias1, "topic.bumpedAtTitle", {
        "name": "html-safe",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 116
          },
          "end": {
            "line": 1,
            "column": 149
          }
        }
      })) + "\">\n  <a class=\"post-activity\" href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.lastPostUrl", {
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
            "column": 33
          },
          "end": {
            "line": 2,
            "column": 54
          }
        }
      })) + "\">" + alias2((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias3).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-relative-date"
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
            "column": 66
          }
        }
      })) + alias2((lookupProperty(helpers, "format-date") || depth0 && lookupProperty(depth0, "format-date") || alias3).call(alias1, "topic.bumpedAt", {
        "name": "format-date",
        "hash": {
          "noTitle": "true",
          "format": "tiny"
        },
        "hashTypes": {
          "noTitle": "StringLiteral",
          "format": "StringLiteral"
        },
        "hashContexts": {
          "noTitle": depth0,
          "format": depth0
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
            "column": 65
          }
        }
      })) + "</a>\n</" + alias2(lookupProperty(helpers, "get").call(alias1, "tagName", {
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
            "column": 13
          }
        }
      })) + ">\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/activity-column", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});