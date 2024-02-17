define("discourse/models/draft", ["exports", "@ember/object", "discourse/lib/ajax"], function (_exports, _object, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  const Draft = _object.default.extend();
  Draft.reopenClass({
    clear(key, sequence) {
      return (0, _ajax.ajax)(`/drafts/${key}.json`, {
        type: "DELETE",
        data: {
          draft_key: key,
          sequence
        }
      });
    },
    get(key) {
      return (0, _ajax.ajax)(`/drafts/${key}.json`);
    },
    getLocal(key, current) {
      // TODO: implement this
      return current;
    },
    save(key, sequence, data, clientId) {
      let {
        forceSave = false
      } = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      data = typeof data === "string" ? data : JSON.stringify(data);
      return (0, _ajax.ajax)("/drafts.json", {
        type: "POST",
        data: {
          draft_key: key,
          sequence,
          data,
          owner: clientId,
          force_save: forceSave
        },
        ignoreUnsent: false
      });
    }
  });
  var _default = Draft;
  _exports.default = _default;
});