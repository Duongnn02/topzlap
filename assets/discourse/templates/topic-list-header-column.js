define("discourse/templates/topic-list-header-column", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "aria-label='" + container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "ariaLabel", {
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
            "column": 116
          },
          "end": {
            "line": 1,
            "column": 129
          }
        }
      })) + "'";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "tabindex=\"0\" role=\"button\" aria-pressed='" + container.escapeExpression(lookupProperty(helpers, "get").call(alias1, "view.ariaPressed", {
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
            "column": 195
          },
          "end": {
            "line": 1,
            "column": 215
          }
        }
      })) + "' " + ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.ariaSort", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(4, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 217
          },
          "end": {
            "line": 1,
            "column": 274
          }
        }
      })) != null ? stack1 : "") + " ";
    },
    "4": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "aria-sort='" + container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "view.ariaSort", {
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
            "column": 249
          },
          "end": {
            "line": 1,
            "column": 266
          }
        }
      })) + "'";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, "showBulkToggle", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(7, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
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
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(9, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 4
          },
          "end": {
            "line": 14,
            "column": 13
          }
        }
      })) != null ? stack1 : "");
    },
    "7": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "      " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "flat-button", {
        "name": "raw",
        "hash": {
          "title": "topics.bulk.toggle",
          "icon": "list",
          "class": "bulk-select"
        },
        "hashTypes": {
          "title": "StringLiteral",
          "icon": "StringLiteral",
          "class": "StringLiteral"
        },
        "hashContexts": {
          "title": depth0,
          "icon": depth0,
          "class": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 6
          },
          "end": {
            "line": 4,
            "column": 86
          }
        }
      })) + "\n";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "      <span class='bulk-select-topics'>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "canDoBulkActions", {
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
            "line": 8,
            "column": 8
          },
          "end": {
            "line": 10,
            "column": 17
          }
        }
      })) != null ? stack1 : "") + "<button class='btn btn-default bulk-select-all'>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "topics.bulk.select_all", {
        "name": "i18n",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 11,
            "column": 56
          },
          "end": {
            "line": 11,
            "column": 89
          }
        }
      })) + "</button>\n        <button class='btn btn-default bulk-clear-all'>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "topics.bulk.clear_all", {
        "name": "i18n",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 55
          },
          "end": {
            "line": 12,
            "column": 87
          }
        }
      })) + "</button>\n      </span>\n";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "          <button class='btn btn-icon no-text bulk-select-actions'>" + container.escapeExpression((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "cog", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 67
          },
          "end": {
            "line": 9,
            "column": 83
          }
        }
      })) + "&#8203;</button>\n";
    },
    "12": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "    " + container.escapeExpression((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "view.sortIcon", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 18,
            "column": 4
          },
          "end": {
            "line": 18,
            "column": 28
          }
        }
      })) + "\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<th data-sort-order='" + alias2(lookupProperty(helpers, "get").call(alias1, "order", {
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
            "column": 21
          },
          "end": {
            "line": 1,
            "column": 30
          }
        }
      })) + "' class='" + alias2(lookupProperty(helpers, "get").call(alias1, "view.className", {
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
            "column": 39
          },
          "end": {
            "line": 1,
            "column": 57
          }
        }
      })) + " topic-list-data' scope=\"col\" " + ((stack1 = lookupProperty(helpers, "if").call(alias1, "ariaLabel", {
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
            "column": 87
          },
          "end": {
            "line": 1,
            "column": 137
          }
        }
      })) != null ? stack1 : "") + " " + ((stack1 = lookupProperty(helpers, "if").call(alias1, "sortable", {
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
            "line": 1,
            "column": 138
          },
          "end": {
            "line": 1,
            "column": 282
          }
        }
      })) != null ? stack1 : "") + ">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "canBulkSelect", {
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
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 15,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "<span>" + alias2(lookupProperty(helpers, "get").call(alias1, "view.localizedName", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 16,
            "column": 8
          },
          "end": {
            "line": 16,
            "column": 30
          }
        }
      })) + "</span>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.isSorting", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(12, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 17,
            "column": 2
          },
          "end": {
            "line": 19,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "</th>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("topic-list-header-column", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});