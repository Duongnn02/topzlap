define("discourse/templates/list/posters-column", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, "poster.moreCount", {
        "name": "if",
        "hash": {},
        "hashTypes": {},
        "hashContexts": {},
        "fn": container.program(2, data, 0),
        "inverse": container.program(4, data, 0),
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 2
          },
          "end": {
            "line": 7,
            "column": 9
          }
        }
      })) != null ? stack1 : "";
    },
    "2": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "    <a class=\"posters-more-count\">" + container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "poster.moreCount", {
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
            "column": 34
          },
          "end": {
            "line": 4,
            "column": 54
          }
        }
      })) + "</a>\n";
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
      return "    <a href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "poster.user.path", {
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
            "column": 13
          },
          "end": {
            "line": 6,
            "column": 33
          }
        }
      })) + "\" data-user-card=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "poster.user.username", {
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
            "column": 51
          },
          "end": {
            "line": 6,
            "column": 75
          }
        }
      })) + "\" class=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "poster.extraClasses", {
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
            "column": 84
          },
          "end": {
            "line": 6,
            "column": 107
          }
        }
      })) + "\">" + alias2((lookupProperty(helpers, "avatar") || depth0 && lookupProperty(depth0, "avatar") || container.hooks.helperMissing).call(alias1, "poster", {
        "name": "avatar",
        "hash": {
          "imageSize": "small",
          "namePath": "user.name",
          "usernamePath": "user.username",
          "avatarTemplatePath": "user.avatar_template"
        },
        "hashTypes": {
          "imageSize": "StringLiteral",
          "namePath": "StringLiteral",
          "usernamePath": "StringLiteral",
          "avatarTemplatePath": "StringLiteral"
        },
        "hashContexts": {
          "imageSize": depth0,
          "namePath": depth0,
          "usernamePath": depth0,
          "avatarTemplatePath": depth0
        },
        "types": ["PathExpression"],
        "contexts": [depth0],
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 109
          },
          "end": {
            "line": 6,
            "column": 236
          }
        }
      })) + "</a>\n";
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
      return "<td class='posters topic-list-data'>\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, "poster", "in", "posters", {
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
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 9
          }
        }
      })) != null ? stack1 : "") + "</td>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("list/posters-column", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});