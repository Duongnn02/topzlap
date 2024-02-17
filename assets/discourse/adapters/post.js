define("discourse/adapters/post", ["exports", "discourse/adapters/rest", "discourse/lib/ajax", "@ember/string"], function (_exports, _rest, _ajax, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/adapters/rest",0,"discourse/lib/ajax",0,"@ember/string"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    find(store, type, findArgs) {
      return this._super(store, type, findArgs).then(function (result) {
        return {
          post: result
        };
      });
    },
    createRecord(store, type, args) {
      const typeField = (0, _string.underscore)(type);
      args.nested_post = true;
      return (0, _ajax.ajax)(this.pathFor(store, type), {
        type: "POST",
        data: args
      }).then(function (json) {
        return new _rest.Result(json[typeField], json);
      });
    }
  });
  _exports.default = _default;
});