define("discourse/templates/list/topic-list-item", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "  <td class=\"bulk-select topic-list-data\">\n    <label for=\"bulk-select-" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.id", {
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
            "column": 28
          },
          "end": {
            "line": 5,
            "column": 40
          }
        }
      })) + "\">\n      <input type=\"checkbox\" class=\"bulk-select\" id=\"bulk-select-" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.id", {
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
            "column": 65
          },
          "end": {
            "line": 6,
            "column": 77
          }
        }
      })) + "\">\n    </label>\n  </td>\n";
    },
    "3": function (container, depth0, helpers, partials, data) {
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
            "line": 25,
            "column": 6
          },
          "end": {
            "line": 25,
            "column": 36
          }
        }
      }));
    },
    "5": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "topic-post-badges", {
        "name": "raw",
        "hash": {
          "newDotText": "newDotText",
          "url": "topic.lastUnreadUrl",
          "unseen": "topic.unseen",
          "unreadPosts": "topic.unread_posts"
        },
        "hashTypes": {
          "newDotText": "PathExpression",
          "url": "PathExpression",
          "unseen": "PathExpression",
          "unreadPosts": "PathExpression"
        },
        "hashContexts": {
          "newDotText": depth0,
          "url": depth0,
          "unseen": depth0,
          "unreadPosts": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 32,
            "column": 6
          },
          "end": {
            "line": 32,
            "column": 131
          }
        }
      }));
    },
    "7": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "unless").call(depth0 != null ? depth0 : container.nullContext || {}, "topic.isPinnedUncategorized", {
        "name": "unless",
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
            "line": 37,
            "column": 6
          },
          "end": {
            "line": 40,
            "column": 17
          }
        }
      })) != null ? stack1 : "";
    },
    "8": function (container, depth0, helpers, partials, data) {
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
            "line": 38,
            "column": 8
          },
          "end": {
            "line": 38,
            "column": 64
          }
        }
      })) + "\n        " + alias3((lookupProperty(helpers, "category-link") || depth0 && lookupProperty(depth0, "category-link") || alias2).call(alias1, "topic.category", {
        "name": "category-link",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 39,
            "column": 8
          },
          "end": {
            "line": 39,
            "column": 40
          }
        }
      })) + "\n";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "    " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "list.topic-excerpt", {
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
            "line": 46,
            "column": 4
          },
          "end": {
            "line": 46,
            "column": 44
          }
        }
      })) + "\n";
    },
    "12": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "list.posters-column", {
        "name": "raw",
        "hash": {
          "posters": "topic.featuredUsers"
        },
        "hashTypes": {
          "posters": "PathExpression"
        },
        "hashContexts": {
          "posters": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 55,
            "column": 2
          },
          "end": {
            "line": 55,
            "column": 59
          }
        }
      })) + "\n";
    },
    "14": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  <td class=\"num likes topic-list-data\">\n" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "hasLikes", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(15, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 62,
            "column": 4
          },
          "end": {
            "line": 66,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "  </td>\n";
    },
    "15": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "      <a href='" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.summaryUrl", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 63,
            "column": 15
          },
          "end": {
            "line": 63,
            "column": 35
          }
        }
      })) + "'>\n        " + alias2((lookupProperty(helpers, "number") || depth0 && lookupProperty(depth0, "number") || alias3).call(alias1, "topic.like_count", {
        "name": "number",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 64,
            "column": 8
          },
          "end": {
            "line": 64,
            "column": 35
          }
        }
      })) + " " + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || alias3).call(alias1, "heart", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 64,
            "column": 36
          },
          "end": {
            "line": 64,
            "column": 54
          }
        }
      })) + "\n      </a>\n";
    },
    "17": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "  <td class=\"num likes\">\n" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "hasOpLikes", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(18, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 72,
            "column": 4
          },
          "end": {
            "line": 76,
            "column": 11
          }
        }
      })) != null ? stack1 : "") + "  </td>\n";
    },
    "18": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "      <a href='" + alias2(lookupProperty(helpers, "get").call(alias1, "topic.summaryUrl", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 73,
            "column": 15
          },
          "end": {
            "line": 73,
            "column": 35
          }
        }
      })) + "'>\n        " + alias2((lookupProperty(helpers, "number") || depth0 && lookupProperty(depth0, "number") || alias3).call(alias1, "topic.op_like_count", {
        "name": "number",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 74,
            "column": 8
          },
          "end": {
            "line": 74,
            "column": 38
          }
        }
      })) + " " + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || alias3).call(alias1, "heart", {
        "name": "d-icon",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 74,
            "column": 39
          },
          "end": {
            "line": 74,
            "column": 57
          }
        }
      })) + "\n      </a>\n";
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
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 55
          }
        }
      })) + "\n\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
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
            "line": 3,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + "\n<td class='main-link clearfix topic-list-data' colspan=\"1\">" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
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
            "line": 19,
            "column": 2
          },
          "end": {
            "line": 19,
            "column": 54
          }
        }
      })) + "\n  <span class='link-top-line'>" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
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
            "line": 21,
            "column": 4
          },
          "end": {
            "line": 21,
            "column": 58
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
            "line": 22,
            "column": 4
          },
          "end": {
            "line": 22,
            "column": 39
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
            "line": 23,
            "column": 4
          },
          "end": {
            "line": 23,
            "column": 57
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "topic.featured_link", {
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
            "line": 24,
            "column": 4
          },
          "end": {
            "line": 26,
            "column": 12
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
            "line": 27,
            "column": 4
          },
          "end": {
            "line": 27,
            "column": 56
          }
        }
      })) + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "list.unread-indicator", {
        "name": "raw",
        "hash": {
          "unreadClass": "unreadClass",
          "topicId": "topic.id",
          "includeUnreadIndicator": "includeUnreadIndicator"
        },
        "hashTypes": {
          "unreadClass": "PathExpression",
          "topicId": "PathExpression",
          "includeUnreadIndicator": "PathExpression"
        },
        "hashContexts": {
          "unreadClass": depth0,
          "topicId": depth0,
          "includeUnreadIndicator": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 28,
            "column": 4
          },
          "end": {
            "line": 30,
            "column": 61
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showTopicPostBadges", {
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
            "line": 31,
            "column": 4
          },
          "end": {
            "line": 33,
            "column": 12
          }
        }
      })) != null ? stack1 : "") + "  </span>\n  <div class=\"link-bottom-line\">\n" + ((stack1 = lookupProperty(helpers, "unless").call(alias1, "hideCategory", {
        "name": "unless",
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
            "line": 36,
            "column": 4
          },
          "end": {
            "line": 41,
            "column": 15
          }
        }
      })) != null ? stack1 : "") + "    " + alias3((lookupProperty(helpers, "discourse-tags") || depth0 && lookupProperty(depth0, "discourse-tags") || alias2).call(alias1, "topic", {
        "name": "discourse-tags",
        "hash": {
          "tagsForUser": "tagsForUser",
          "mode": "list"
        },
        "hashTypes": {
          "tagsForUser": "PathExpression",
          "mode": "StringLiteral"
        },
        "hashContexts": {
          "tagsForUser": depth0,
          "mode": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 42,
            "column": 4
          },
          "end": {
            "line": 42,
            "column": 64
          }
        }
      })) + "\n    " + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "list.action-list", {
        "name": "raw",
        "hash": {
          "icon": "heart",
          "className": "likes",
          "postNumbers": "topic.liked_post_numbers",
          "topic": "topic"
        },
        "hashTypes": {
          "icon": "StringLiteral",
          "className": "StringLiteral",
          "postNumbers": "PathExpression",
          "topic": "PathExpression"
        },
        "hashContexts": {
          "icon": depth0,
          "className": depth0,
          "postNumbers": depth0,
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 43,
            "column": 4
          },
          "end": {
            "line": 43,
            "column": 110
          }
        }
      })) + "\n  </div>\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "expandPinned", {
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
            "line": 45,
            "column": 2
          },
          "end": {
            "line": 47,
            "column": 9
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
            "line": 49,
            "column": 2
          },
          "end": {
            "line": 49,
            "column": 59
          }
        }
      })) + "\n</td>" + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-after-main-link"
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
            "line": 52,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 56
          }
        }
      })) + "\n\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showPosters", {
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
            "line": 54,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + "\n" + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "list.posts-count-column", {
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
            "line": 58,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 45
          }
        }
      })) + "\n\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showLikes", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(14, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 60,
            "column": 0
          },
          "end": {
            "line": 68,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + "\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "showOpLikes", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(17, data, 0),
        "inverse": container.noop,
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 70,
            "column": 0
          },
          "end": {
            "line": 78,
            "column": 7
          }
        }
      })) != null ? stack1 : "") + "\n<td class=\"num views " + alias3(lookupProperty(helpers, "get").call(alias1, "topic.viewsHeat", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 80,
            "column": 21
          },
          "end": {
            "line": 80,
            "column": 40
          }
        }
      })) + " topic-list-data\">\n  " + alias3((lookupProperty(helpers, "raw-plugin-outlet") || depth0 && lookupProperty(depth0, "raw-plugin-outlet") || alias2).call(alias1, {
        "name": "raw-plugin-outlet",
        "hash": {
          "name": "topic-list-before-view-count"
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
            "line": 81,
            "column": 2
          },
          "end": {
            "line": 81,
            "column": 59
          }
        }
      })) + "\n  " + alias3((lookupProperty(helpers, "number") || depth0 && lookupProperty(depth0, "number") || alias2).call(alias1, "topic.views", {
        "name": "number",
        "hash": {
          "numberKey": "views_long"
        },
        "hashTypes": {
          "numberKey": "StringLiteral"
        },
        "hashContexts": {
          "numberKey": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 82,
            "column": 2
          },
          "end": {
            "line": 82,
            "column": 47
          }
        }
      })) + "\n</td>\n\n" + alias3((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || alias2).call(alias1, "list.activity-column", {
        "name": "raw",
        "hash": {
          "tagName": "td",
          "class": "num topic-list-data",
          "topic": "topic"
        },
        "hashTypes": {
          "tagName": "StringLiteral",
          "class": "StringLiteral",
          "topic": "PathExpression"
        },
        "hashContexts": {
          "tagName": depth0,
          "class": depth0,
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 85,
            "column": 0
          },
          "end": {
            "line": 85,
            "column": 83
          }
        }
      })) + "\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/topic-list-item", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});