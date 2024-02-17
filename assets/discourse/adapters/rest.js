define("discourse/adapters/rest", ["exports", "@ember/object", "discourse/lib/ajax", "discourse/lib/hash", "@ember/string"], function (_exports, _object, _ajax, _hash, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Result = Result;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/lib/hash",0,"@ember/string"eaimeta@70e063a35619d71f
  const ADMIN_MODELS = ["plugin", "theme", "embeddable-host", "web-hook", "web-hook-event", "flagged-topic"];
  function Result(payload, responseJson) {
    this.payload = payload;
    this.responseJson = responseJson;
    this.target = null;
  }

  // We use this to make sure 404s are caught
  function rethrow(error) {
    if (error.status === 404) {
      throw new Error("404: " + error.responseText);
    }
    throw error;
  }
  var _default = _object.default.extend({
    primaryKey: "id",
    storageKey(type, findArgs, options) {
      if (options && options.cacheKey) {
        return options.cacheKey;
      }
      const hashedArgs = Math.abs((0, _hash.hashString)(JSON.stringify(findArgs)));
      return `${type}_${hashedArgs}`;
    },
    basePath(store, type) {
      if (ADMIN_MODELS.includes(type.replace("_", "-"))) {
        return "/admin/";
      }
      return "/";
    },
    appendQueryParams(path, findArgs, extension) {
      if (findArgs) {
        if (typeof findArgs === "object") {
          const urlSearchParams = new URLSearchParams();
          for (const [key, value] of Object.entries(findArgs)) {
            if (value) {
              urlSearchParams.set(key, value);
            }
          }
          const queryString = urlSearchParams.toString();
          if (queryString) {
            return `${path}${extension || ""}?${queryString}`;
          }
        } else {
          // It's serializable as a string if not an object
          return `${path}/${encodeURIComponent(findArgs)}${extension || ""}`;
        }
      }
      return path;
    },
    pathFor(store, type, findArgs) {
      let path = this.basePath(store, type, findArgs) + (0, _string.underscore)(store.pluralize(this.apiNameFor(type)));
      return this.appendQueryParams(path, findArgs);
    },
    apiNameFor(type) {
      return type;
    },
    findAll(store, type, findArgs) {
      return (0, _ajax.ajax)(this.pathFor(store, type, findArgs)).catch(rethrow);
    },
    find(store, type, findArgs) {
      return (0, _ajax.ajax)(this.pathFor(store, type, findArgs)).catch(rethrow);
    },
    findStale(store, type, findArgs, options) {
      if (this.cached) {
        return this.cached[this.storageKey(type, findArgs, options)];
      }
    },
    cacheFind(store, type, findArgs, opts, hydrated) {
      this.cached = this.cached || {};
      this.cached[this.storageKey(type, findArgs, opts)] = hydrated;
    },
    jsonMode: false,
    getPayload(method, data) {
      let payload = {
        method,
        data
      };
      if (this.jsonMode) {
        payload.contentType = "application/json";
        payload.data = JSON.stringify(data);
      }
      return payload;
    },
    update(store, type, id, attrs) {
      const data = {};
      const typeField = (0, _string.underscore)(this.apiNameFor(type));
      data[typeField] = attrs;
      return (0, _ajax.ajax)(this.pathFor(store, type, id), this.getPayload("PUT", data)).then(function (json) {
        return new Result(json[typeField], json);
      });
    },
    createRecord(store, type, attrs) {
      const data = {};
      const typeField = (0, _string.underscore)(this.apiNameFor(type));
      data[typeField] = attrs;
      return (0, _ajax.ajax)(this.pathFor(store, type), this.getPayload("POST", data)).then(function (json) {
        return new Result(json[typeField], json);
      });
    },
    destroyRecord(store, type, record) {
      return (0, _ajax.ajax)(this.pathFor(store, type, record.get(this.primaryKey)), {
        type: "DELETE"
      });
    }
  });
  _exports.default = _default;
});