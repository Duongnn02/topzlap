define("discourse/templates/list/post-count-or-badges", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "topic-post-badges", {
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
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 2,
            "column": 126
          }
        }
      })) + "\n";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "  " + container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "list.posts-count-column", {
        "name": "raw",
        "hash": {
          "tagName": "div",
          "topic": "topic"
        },
        "hashTypes": {
          "tagName": "StringLiteral",
          "topic": "PathExpression"
        },
        "hashContexts": {
          "tagName": depth0,
          "topic": depth0
        },
        "types": ["StringLiteral"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 2
          },
          "end": {
            "line": 4,
            "column": 61
          }
        }
      })) + "\n";
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "view.showBadges", {
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
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 7
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/post-count-or-badges", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});