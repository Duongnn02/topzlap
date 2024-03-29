define("discourse/templates/mobile/list/topic-list-item", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "      <label for=\"bulk-select-" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.id", {
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
            "column": 30
          },
          "end": {
            "line": 5,
            "column": 42
          }
        }
      })) + "\">\n        <input type=\"checkbox\" class=\"bulk-select\" id=\"bulk-select-" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.id", {
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
            "column": 67
          },
          "end": {
            "line": 6,
            "column": 79
          }
        }
      })) + "\">\n      </label>\n";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "      <a href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.lastPostUrl", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 15
          },
          "end": {
            "line": 9,
            "column": 36
          }
        }
      })) + "\" data-user-card=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.lastPosterUser.username", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 54
          },
          "end": {
            "line": 9,
            "column": 87
          }
        }
      })) + "\">" + alias2((lookupProperty(helpers, "avatar") || depth0 && lookupProperty(depth0, "avatar") || container.hooks.helperMissing).call(alias1, "topic.lastPosterUser", {
        "name": "avatar",
        "hash": {
          "imageSize": "large"
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
            "line": 9,
            "column": 89
          },
          "end": {
            "line": 9,
            "column": 138
          }
        }
      })) + "</a>\n";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "topic-featured-link") || depth0 && lookupProperty(depth0, "topic-featured-link") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "topic", {
        "name": "topic-featured-link",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 26,
            "column": 6
          },
          "end": {
            "line": 26,
            "column": 37
          }
        }
      }));
    },
    "7": function (container, depth0, helpers, partials, data) {
      return "<span class=\"topic-post-badges\">&nbsp;<span class=\"badge-notification new-topic\"></span></span>";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "list.topic-excerpt", {
        "name": "raw",
        "hash": {
          "topic": "topic"
        },
        "hashTypes": {
          "topic": "PathExpression"
        },
        "hashContexts": {
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 33,
            "column": 6
          },
          "end": {
            "line": 33,
            "column": 48
          }
        }
      }));
    },
    "11": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
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
          "name": "topic-list-before-category"
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
            "line": 43,
            "column": 10
          },
          "end": {
            "line": 43,
            "column": 66
          }
        }
      })) + "\n          " + alias3((lookupProperty(helpers, "category-link") || depth0 && lookupProperty(depth0, "category-link") || alias2).call(alias1, "topic.category", {
        "name": "category-link",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 44,
            "column": 10
          },
          "end": {
            "line": 44,
            "column": 43
          }
        }
      }));
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
      return "<td class=\"topic-list-data\">" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-columns"
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
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 2,
            "column": 57
          }
        }
      })) + "\n  <div class='pull-left'>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(3, data, 0),
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 10,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "  </div>\n  <div class='right'>\n" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-link"
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
            "line": 20,
            "column": 4
          },
          "end": {
            "line": 20,
            "column": 56
          }
        }
      })) + "\n    <div class='main-link'>" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-status"
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
            "line": 22,
            "column": 6
          },
          "end": {
            "line": 22,
            "column": 60
          }
        }
      })) + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "topic-status", {
        "name": "raw",
        "hash": {
          "topic": "topic"
        },
        "hashTypes": {
          "topic": "PathExpression"
        },
        "hashContexts": {
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 23,
            "column": 6
          },
          "end": {
            "line": 23,
            "column": 42
          }
        }
      })) + alias3((lookupProperty(helpers, "topic-link") || depth0 && lookupProperty(depth0, "topic-link") || alias2).call(alias1, "topic", {
        "name": "topic-link",
        "hash": {
          "class": "raw-link raw-topic-link"
        },
        "hashTypes": {
          "class": "StringLiteral"
        },
        "hashContexts": {
          "class": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 24,
            "column": 6
          },
          "end": {
            "line": 24,
            "column": 59
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "topic.featured_link", {
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
            "line": 25,
            "column": 6
          },
          "end": {
            "line": 27,
            "column": 15
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-after-title"
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
            "line": 28,
            "column": 6
          },
          "end": {
            "line": 28,
            "column": 58
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "topic.unseen", {
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
            "line": 29,
            "column": 6
          },
          "end": {
            "line": 31,
            "column": 15
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "expandPinned", {
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
            "line": 32,
            "column": 6
          },
          "end": {
            "line": 34,
            "column": 15
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-main-link-bottom"
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
            "line": 35,
            "column": 7
          },
          "end": {
            "line": 35,
            "column": 64
          }
        }
      })) + "\n    </div>\n    <div class='pull-right'>\n      " + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "list.post-count-or-badges", {
        "name": "raw",
        "hash": {
          "postBadgesEnabled": "showTopicPostBadges",
          "topic": "topic"
        },
        "hashTypes": {
          "postBadgesEnabled": "PathExpression",
          "topic": "PathExpression"
        },
        "hashContexts": {
          "postBadgesEnabled": depth0,
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 38,
            "column": 6
          },
          "end": {
            "line": 38,
            "column": 91
          }
        }
      })) + "\n    </div>\n    <div class=\"topic-item-stats clearfix\">\n      <span class=\"topic-item-stats__category-tags\">\n" + ((stack1 = lookupProperty(helpers, "unless").call(alias1, "hideCategory", {
        "name": "unless",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(11, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 42,
            "column": 8
          },
          "end": {
            "line": 45,
            "column": 20
          }
        }
      })) != null ? stack1 : "") + alias3((lookupProperty(helpers, "discourse-tags") || depth0 && lookupProperty(depth0, "discourse-tags") || alias2).call(alias1, "topic", {
        "name": "discourse-tags",
        "hash": {
          "mode": "list"
        },
        "hashTypes": {
          "mode": "StringLiteral"
        },
        "hashContexts": {
          "mode": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 46,
            "column": 8
          },
          "end": {
            "line": 46,
            "column": 45
          }
        }
      })) + "\n      </span>\n      <div class='num activity last'>\n        <span class=\"age activity\" title=\"" + alias3(lookupProperty(helpers, "get").call(alias1, "topic.bumpedAtTitle", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 49,
            "column": 42
          },
          "end": {
            "line": 49,
            "column": 65
          }
        }
      })) + "\"><a\n            href=\"" + alias3(lookupProperty(helpers, "get").call(alias1, "topic.lastPostUrl", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 50,
            "column": 18
          },
          "end": {
            "line": 50,
            "column": 39
          }
        }
      })) + "\">" + alias3((lookupProperty(helpers, "format-date") || depth0 && lookupProperty(depth0, "format-date") || alias2).call(alias1, "topic.bumpedAt", {
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
            "line": 50,
            "column": 41
          },
          "end": {
            "line": 50,
            "column": 100
          }
        }
      })) + "</a>\n        </span>\n      </div>\n  </div>\n</td>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("mobile/list/topic-list-item", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});