define("discourse/templates/user-selector-autocomplete", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.isUser", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(2, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 6
          },
          "end": {
            "line": 23,
            "column": 13
          }
        }
      })) != null ? stack1 : "") + "\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.isEmail", {
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
            "line": 25,
            "column": 6
          },
          "end": {
            "line": 32,
            "column": 13
          }
        }
      })) != null ? stack1 : "") + "\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.isGroup", {
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
            "line": 34,
            "column": 6
          },
          "end": {
            "line": 42,
            "column": 13
          }
        }
      })) != null ? stack1 : "");
    },
    "2": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "        <li>\n          <a href title=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "item.name", {
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
            "column": 25
          },
          "end": {
            "line": 6,
            "column": 38
          }
        }
      })) + "\" class=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "item.cssClasses", {
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
            "column": 47
          },
          "end": {
            "line": 6,
            "column": 66
          }
        }
      })) + "\">\n            " + alias2((lookupProperty(helpers, "avatar") || depth0 && lookupProperty(depth0, "avatar") || alias3).call(alias1, "item", {
        "name": "avatar",
        "hash": {
          "imageSize": "tiny"
        },
        "hashTypes": {
          "imageSize": "StringLiteral"
        },
        "hashContexts": {
          "imageSize": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 7,
            "column": 12
          },
          "end": {
            "line": 7,
            "column": 44
          }
        }
      })) + "\n            <span class='username'>" + alias2((lookupProperty(helpers, "format-username") || depth0 && lookupProperty(depth0, "format-username") || alias3).call(alias1, "item.username", {
        "name": "format-username",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 35
          },
          "end": {
            "line": 8,
            "column": 68
          }
        }
      })) + "</span>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.name", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 12
          },
          "end": {
            "line": 11,
            "column": 19
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.status", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(5, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 12
          },
          "end": {
            "line": 20,
            "column": 19
          }
        }
      })) != null ? stack1 : "") + "          </a>\n        </li>\n";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "              <span class='name'>" + container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "item.name", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 10,
            "column": 33
          },
          "end": {
            "line": 10,
            "column": 46
          }
        }
      })) + "</span>\n";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "              " + alias2((lookupProperty(helpers, "emoji") || depth0 && lookupProperty(depth0, "emoji") || container.hooks.helperMissing).call(alias1, "item.status.emoji", {
        "name": "emoji",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 13,
            "column": 14
          },
          "end": {
            "line": 13,
            "column": 41
          }
        }
      })) + "\n              <span class='status-description' title='" + alias2(lookupProperty(helpers, "get").call(alias1, "item.status.description", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 14,
            "column": 54
          },
          "end": {
            "line": 14,
            "column": 81
          }
        }
      })) + "'>\n                " + alias2(lookupProperty(helpers, "get").call(alias1, "item.status.description", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 15,
            "column": 16
          },
          "end": {
            "line": 15,
            "column": 43
          }
        }
      })) + "\n              </span>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "item.status.ends_at", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(6, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 17,
            "column": 14
          },
          "end": {
            "line": 19,
            "column": 21
          }
        }
      })) != null ? stack1 : "");
    },
    "6": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "                " + container.escapeExpression((lookupProperty(helpers, "format-age") || depth0 && lookupProperty(depth0, "format-age") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "item.status.ends_at", {
        "name": "format-age",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 18,
            "column": 16
          },
          "end": {
            "line": 18,
            "column": 50
          }
        }
      })) + "\n";
    },
    "8": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "        <li>\n          <a href title=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "item.username", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 27,
            "column": 25
          },
          "end": {
            "line": 27,
            "column": 42
          }
        }
      })) + "\">\n            " + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || alias3).call(alias1, "envelope", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 28,
            "column": 12
          },
          "end": {
            "line": 28,
            "column": 33
          }
        }
      })) + "\n            <span class='username'>" + alias2((lookupProperty(helpers, "format-username") || depth0 && lookupProperty(depth0, "format-username") || alias3).call(alias1, "item.username", {
        "name": "format-username",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 29,
            "column": 35
          },
          "end": {
            "line": 29,
            "column": 68
          }
        }
      })) + "</span>\n          </a>\n        </li>\n";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "        <li>\n          <a href title=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "item.full_name", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 36,
            "column": 25
          },
          "end": {
            "line": 36,
            "column": 43
          }
        }
      })) + "\">\n            " + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(alias1, "users", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 37,
            "column": 12
          },
          "end": {
            "line": 37,
            "column": 30
          }
        }
      })) + "\n            <span class='username'>" + alias2(lookupProperty(helpers, "get").call(alias1, "item.name", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 38,
            "column": 35
          },
          "end": {
            "line": 38,
            "column": 48
          }
        }
      })) + "</span>\n            <span class='name'>" + alias2(lookupProperty(helpers, "get").call(alias1, "item.full_name", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 39,
            "column": 31
          },
          "end": {
            "line": 39,
            "column": 49
          }
        }
      })) + "</span>\n          </a>\n        </li>\n";
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
      return "<div class='autocomplete ac-user'>\n  <ul>\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, "item", "in", "options", {
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
            "line": 43,
            "column": 13
          }
        }
      })) != null ? stack1 : "") + "  </ul>\n</div>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("user-selector-autocomplete", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});