define("discourse/adapters/topic-list", ["exports", "discourse/lib/preload-store", "discourse/adapters/rest", "discourse/lib/ajax"], function (_exports, _preloadStore, _rest, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.finderFor = finderFor;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/preload-store",0,"discourse/adapters/rest",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function finderFor(filter, params) {
    return function () {
      let url = `/${filter}.json`;
      if (params) {
        const urlSearchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (typeof value !== "undefined") {
            urlSearchParams.set(key, value);
          }
        }
        const queryString = urlSearchParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }
      return (0, _ajax.ajax)(url);
    };
  }
  var _default = _rest.default.extend({
    find(store, type, findArgs) {
      const filter = findArgs.filter;
      const params = findArgs.params;
      return _preloadStore.default.getAndRemove("topic_list", finderFor(filter, params)).then(function (result) {
        result.filter = filter;
        result.params = params;
        return result;
      });
    }
  });
  _exports.default = _default;
});