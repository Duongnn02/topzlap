define("discourse/templates/hashtag-autocomplete", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function (_exports, _rawHandlebars, _rawTemplates) {
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
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "        <li class=\"hashtag-autocomplete__option\">\n          <a class=\"hashtag-autocomplete__link\" title=\"" + alias2(lookupProperty(helpers, "get").call(alias1, "option.description", {
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
            "column": 55
          },
          "end": {
            "line": 6,
            "column": 77
          }
        }
      })) + "\" href>" + alias2((lookupProperty(helpers, "d-icon") || depth0 && lookupProperty(depth0, "d-icon") || container.hooks.helperMissing).call(alias1, "option.icon", {
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
            "column": 84
          },
          "end": {
            "line": 6,
            "column": 106
          }
        }
      })) + "<span class=\"hashtag-autocomplete__text\">" + alias2(lookupProperty(helpers, "get").call(alias1, "option.text", {
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
            "column": 147
          },
          "end": {
            "line": 6,
            "column": 162
          }
        }
      })) + ((stack1 = lookupProperty(helpers, "if").call(alias1, "option.secondary_text", {
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
            "line": 6,
            "column": 162
          },
          "end": {
            "line": 6,
            "column": 271
          }
        }
      })) != null ? stack1 : "") + "</span></span>\n          </a>\n        </li>\n";
    },
    "2": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "<span class=\"hashtag-autocomplete__meta-text\">(" + container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "option.secondary_text", {
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
            "column": 238
          },
          "end": {
            "line": 6,
            "column": 263
          }
        }
      })) + ")";
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
      return "<div class='autocomplete hashtag-autocomplete'>\n  <div class=\"hashtag-autocomplete__fadeout\">\n    <ul>\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, "option", "in", "options", {
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
            "line": 4,
            "column": 6
          },
          "end": {
            "line": 9,
            "column": 15
          }
        }
      })) != null ? stack1 : "") + "    </ul>\n  </div>\n</div>\n";
    },
    "useData": true
  });
  (0, _rawTemplates.addRawTemplate)("hashtag-autocomplete", template, {
    core: true
  });
  var _default = template;
  _exports.default = _default;
});