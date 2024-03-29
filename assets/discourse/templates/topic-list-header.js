define("discourse/templates/topic-list-header", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-templates"eaimeta@70e063a35619d71f
  let template = (0, _rawHandlebars.template)({
    "1": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  <th class=\"bulk-select topic-list-data\">\n" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "canBulkSelect", {
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
            "column": 4
          },
          "end": {
            "line": 6,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "  </th>\n";
    },
    "2": function (container, depth0, helpers, partials, data) {
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
            "line": 5,
            "column": 6
          },
          "end": {
            "line": 5,
            "column": 86
          }
        }
      })) + "\n";
    },
    "4": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "category.sort_options.posters", {
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
                "column": 61
              },
              "end": {
                "line": 12,
                "column": 99
              }
            }
          }),
          "order": "posters"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "order": "StringLiteral"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "order": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 2
          },
          "end": {
            "line": 12,
            "column": 101
          }
        }
      })) + "\n";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "sr_likes", {
            "name": "i18n",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "types": ["StringLiteral"],
            "contexts": [depth0],
            "data": data,
            "loc": {
              "start": {
                "line": 16,
                "column": 104
              },
              "end": {
                "line": 16,
                "column": 121
              }
            }
          }),
          "name": "likes",
          "order": "likes",
          "number": "true",
          "sortable": "sortable"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "name": "StringLiteral",
          "order": "StringLiteral",
          "number": "StringLiteral",
          "sortable": "PathExpression"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "name": depth0,
          "order": depth0,
          "number": depth0,
          "sortable": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 16,
            "column": 2
          },
          "end": {
            "line": 16,
            "column": 123
          }
        }
      })) + "\n";
    },
    "8": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "sr_op_likes", {
            "name": "i18n",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "types": ["StringLiteral"],
            "contexts": [depth0],
            "data": data,
            "loc": {
              "start": {
                "line": 19,
                "column": 107
              },
              "end": {
                "line": 19,
                "column": 127
              }
            }
          }),
          "name": "likes",
          "order": "op_likes",
          "number": "true",
          "sortable": "sortable"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "name": "StringLiteral",
          "order": "StringLiteral",
          "number": "StringLiteral",
          "sortable": "PathExpression"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "name": depth0,
          "order": depth0,
          "number": depth0,
          "sortable": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 19,
            "column": 2
          },
          "end": {
            "line": 19,
            "column": 129
          }
        }
      })) + "\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
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
      return alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-header-before"
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
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 55
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
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
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "canDoBulkActions": "canDoBulkActions",
          "canBulkSelect": "canBulkSelect",
          "showBulkToggle": "toggleInTitle",
          "bulkSelectEnabled": "bulkSelectEnabled",
          "name": "listTitle",
          "order": "default"
        },
        "hashTypes": {
          "canDoBulkActions": "PathExpression",
          "canBulkSelect": "PathExpression",
          "showBulkToggle": "PathExpression",
          "bulkSelectEnabled": "PathExpression",
          "name": "PathExpression",
          "order": "StringLiteral"
        },
        "hashContexts": {
          "canDoBulkActions": depth0,
          "canBulkSelect": depth0,
          "showBulkToggle": depth0,
          "bulkSelectEnabled": depth0,
          "name": depth0,
          "order": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 192
          }
        }
      })) + "\n" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-header-after-main-link"
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
            "line": 10,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 62
          }
        }
      })) + "\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showPosters", {
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
            "line": 11,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "sr_replies", {
            "name": "i18n",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "types": ["StringLiteral"],
            "contexts": [depth0],
            "data": data,
            "loc": {
              "start": {
                "line": 14,
                "column": 104
              },
              "end": {
                "line": 14,
                "column": 123
              }
            }
          }),
          "name": "replies",
          "order": "posts",
          "number": "true",
          "sortable": "sortable"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "name": "StringLiteral",
          "order": "StringLiteral",
          "number": "StringLiteral",
          "sortable": "PathExpression"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "name": depth0,
          "order": depth0,
          "number": depth0,
          "sortable": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 14,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 125
          }
        }
      })) + "\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showLikes", {
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
            "line": 15,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showOpLikes", {
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
            "line": 18,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "sr_views", {
            "name": "i18n",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "types": ["StringLiteral"],
            "contexts": [depth0],
            "data": data,
            "loc": {
              "start": {
                "line": 21,
                "column": 102
              },
              "end": {
                "line": 21,
                "column": 119
              }
            }
          }),
          "name": "views",
          "order": "views",
          "number": "true",
          "sortable": "sortable"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "name": "StringLiteral",
          "order": "StringLiteral",
          "number": "StringLiteral",
          "sortable": "PathExpression"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "name": depth0,
          "order": depth0,
          "number": depth0,
          "sortable": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 21,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 121
          }
        }
      })) + "\n" + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-list-header-column", {
        "name": "raw",
        "hash": {
          "ariaLabel": (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, "sr_activity", {
            "name": "i18n",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "types": ["StringLiteral"],
            "contexts": [depth0],
            "data": data,
            "loc": {
              "start": {
                "line": 22,
                "column": 108
              },
              "end": {
                "line": 22,
                "column": 128
              }
            }
          }),
          "name": "activity",
          "order": "activity",
          "number": "true",
          "sortable": "sortable"
        },
        "hashTypes": {
          "ariaLabel": "SubExpression",
          "name": "StringLiteral",
          "order": "StringLiteral",
          "number": "StringLiteral",
          "sortable": "PathExpression"
        },
        "hashContexts": {
          "ariaLabel": depth0,
          "name": depth0,
          "order": depth0,
          "number": depth0,
          "sortable": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 22,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 130
          }
        }
      })) + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-header-after"
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
            "line": 23,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 54
          }
        }
      }));
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("topic-list-header", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});