define("discourse/templates/post/poster-avatar", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<a href=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "post.usernameUrl", {
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
            "column": 9
          },
          "end": {
            "line": 1,
            "column": 29
          }
        }
      })) + "\" classNames=\"trigger-user-card " + alias2(lookupProperty(helpers, "get").call(alias1, "classNames", {
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
            "column": 61
          },
          "end": {
            "line": 1,
            "column": 75
          }
        }
      })) + "\" data-user-card=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "post.username", {
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
            "column": 93
          },
          "end": {
            "line": 1,
            "column": 110
          }
        }
      })) + "\">" + alias2((lookupProperty(helpers, "avatar") || depth0 && lookupProperty(depth0, "avatar") || container.hooks.helperMissing).call(alias1, "post", {
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
            "line": 1,
            "column": 112
          },
          "end": {
            "line": 1,
            "column": 145
          }
        }
      })) + "</a>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("post/poster-avatar", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});