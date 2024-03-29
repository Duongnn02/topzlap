define("discourse/templates/topic-post-badges", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "&nbsp;<a\n      href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "url", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 12
          },
          "end": {
            "line": 4,
            "column": 19
          }
        }
      })) + "\"\n      class=\"badge badge-notification unread-posts\"\n      title=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.unread_posts", {
        "name": "i18n",
        "hash": {
          "count": "newPosts"
        },
        "hashTypes": {
          "count": "PathExpression"
        },
        "hashContexts": {
          "count": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 13
          },
          "end": {
            "line": 6,
            "column": 57
          }
        }
      })) + "\"\n      aria-label=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.unread_posts", {
        "name": "i18n",
        "hash": {
          "count": "newPosts"
        },
        "hashTypes": {
          "count": "PathExpression"
        },
        "hashContexts": {
          "count": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 7,
            "column": 18
          },
          "end": {
            "line": 7,
            "column": 62
          }
        }
      })) + "\"\n    >" + alias2(lookupProperty(helpers, "get").call(alias1, "newPosts", {
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
            "column": 5
          },
          "end": {
            "line": 8,
            "column": 17
          }
        }
      })) + "</a>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "&nbsp;<a\n      href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "url", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 12
          },
          "end": {
            "line": 12,
            "column": 19
          }
        }
      })) + "\"\n      class=\"badge badge-notification unread-posts\"\n      title=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.unread_posts", {
        "name": "i18n",
        "hash": {
          "count": "unreadPosts"
        },
        "hashTypes": {
          "count": "PathExpression"
        },
        "hashContexts": {
          "count": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 14,
            "column": 13
          },
          "end": {
            "line": 14,
            "column": 60
          }
        }
      })) + "\"\n      aria-label=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.unread_posts", {
        "name": "i18n",
        "hash": {
          "count": "unreadPosts"
        },
        "hashTypes": {
          "count": "PathExpression"
        },
        "hashContexts": {
          "count": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 15,
            "column": 18
          },
          "end": {
            "line": 15,
            "column": 65
          }
        }
      })) + "\"\n    >" + alias2(lookupProperty(helpers, "get").call(alias1, "unreadPosts", {
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
            "column": 5
          },
          "end": {
            "line": 16,
            "column": 20
          }
        }
      })) + "</a>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        alias3 = container.hooks.helperMissing,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "&nbsp;<a\n      href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "url", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 20,
            "column": 12
          },
          "end": {
            "line": 20,
            "column": 19
          }
        }
      })) + "\"\n      class=\"badge badge-notification new-topic\"\n      title=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.new", {
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
            "column": 13
          },
          "end": {
            "line": 22,
            "column": 33
          }
        }
      })) + "\"\n      aria-label=\"" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias3).call(alias1, "topic.new", {
        "name": "i18n",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 23,
            "column": 18
          },
          "end": {
            "line": 23,
            "column": 38
          }
        }
      })) + "\"\n    >" + alias2(lookupProperty(helpers, "get").call(alias1, "newDotText", {
        "name": "get",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 24,
            "column": 5
          },
          "end": {
            "line": 24,
            "column": 19
          }
        }
      })) + "</a>";
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
      return "<span class=\"topic-post-badges\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, "newPosts", {
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
            "column": 2
          },
          "end": {
            "line": 9,
            "column": 10
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "unreadPosts", {
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
            "line": 10,
            "column": 2
          },
          "end": {
            "line": 17,
            "column": 10
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, "unseen", {
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
            "line": 18,
            "column": 2
          },
          "end": {
            "line": 25,
            "column": 10
          }
        }
      })) != null ? stack1 : "") + "</span>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("topic-post-badges", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});