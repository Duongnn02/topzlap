define("discourse/templates/topic-status", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "1": function (container, depth0, helpers, partials, data) {
      return "<div class='topic-statuses'>\n";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "status.href", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(4, data, 0),
        "inverse": container.program(6, data, 0),
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 10
          }
        }
      })) != null ? stack1 : "";
    },
    "4": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<a href='" + alias2(lookupProperty(helpers, "get").call(alias1, "status.href", {
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
            "column": 9
          },
          "end": {
            "line": 6,
            "column": 24
          }
        }
      })) + "' title='" + alias2(lookupProperty(helpers, "get").call(alias1, "status.title", {
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
            "column": 33
          },
          "end": {
            "line": 6,
            "column": 49
          }
        }
      })) + "' class='topic-status " + alias2(lookupProperty(helpers, "get").call(alias1, "status.extraClasses", {
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
            "column": 71
          },
          "end": {
            "line": 6,
            "column": 94
          }
        }
      })) + "'>" + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(alias1, "status.icon", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 96
          },
          "end": {
            "line": 6,
            "column": 118
          }
        }
      })) + "</a>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<" + alias2(lookupProperty(helpers, "get").call(alias1, "status.openTag", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 1
          },
          "end": {
            "line": 8,
            "column": 19
          }
        }
      })) + " title='" + alias2(lookupProperty(helpers, "get").call(alias1, "status.title", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 27
          },
          "end": {
            "line": 8,
            "column": 43
          }
        }
      })) + "' class='topic-status'>" + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(alias1, "status.icon", {
        "name": "d-icon",
        "hash": {
          "class": "status.key"
        },
        "hashTypes": {
          "class": "PathExpression"
        },
        "hashContexts": {
          "class": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 66
          },
          "end": {
            "line": 8,
            "column": 105
          }
        }
      })) + "</" + alias2(lookupProperty(helpers, "get").call(alias1, "status.closeTag", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 107
          },
          "end": {
            "line": 8,
            "column": 126
          }
        }
      })) + ">";
    },
    "8": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "view.showDefault", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 11,
            "column": 26
          },
          "end": {
            "line": 11,
            "column": 53
          }
        }
      }));
    },
    "10": function (container, depth0, helpers, partials, data) {
      return "</div>\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.renderDiv", {
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
            "line": 3,
            "column": 9
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "each").call(alias1, "status", "in", "view.statuses", {
        "name": "each",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression", "CommentStatement", "PathExpression"],
        "contexts": [depth0, depth0, depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 10
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.showDefault", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(8, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 11,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 63
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.renderDiv", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(10, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 9
          }
        }
      })) != null ? stack1 : "");
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("topic-status", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});