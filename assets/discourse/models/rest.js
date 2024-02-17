define("discourse/models/rest", ["exports", "@ember/object", "rsvp", "@ember/object/computed", "discourse-common/lib/get-owner", "@ember/debug"], function (_exports, _object, _rsvp, _computed, _getOwner, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"rsvp",0,"@ember/object/computed",0,"discourse-common/lib/get-owner",0,"@ember/debug"eaimeta@70e063a35619d71f
  const RestModel = _object.default.extend({
    isNew: (0, _computed.equal)("__state", "new"),
    isCreated: (0, _computed.equal)("__state", "created"),
    isSaving: false,
    beforeCreate() {},
    afterCreate() {},
    beforeUpdate() {},
    afterUpdate() {},
    update(props) {
      if (this.isSaving) {
        return _rsvp.Promise.reject();
      }
      props = props || this.updateProperties();
      this.beforeUpdate(props);
      this.set("isSaving", true);
      return this.store.update(this.__type, this.id, props).then(res => {
        const payload = this.__munge(res.payload || res.responseJson);
        if (payload.success === "OK") {
          (false && (0, _debug.warn)("An update call should return the updated attributes", {
            id: "discourse.rest-model.update-attributes"
          }));
          res = props;
        }
        this.setProperties(payload);
        this.afterUpdate(res);
        res.target = this;
        return res;
      }).finally(() => this.set("isSaving", false));
    },
    _saveNew(props) {
      if (this.isSaving) {
        return _rsvp.Promise.reject();
      }
      props = props || this.createProperties();
      this.beforeCreate(props);
      const adapter = this.store.adapterFor(this.__type);
      this.set("isSaving", true);
      return adapter.createRecord(this.store, this.__type, props).then(res => {
        if (!res) {
          throw new Error("Received no data back from createRecord");
        }

        // We can get a response back without properties, for example
        // when a post is queued.
        if (res.payload) {
          this.setProperties(this.__munge(res.payload));
          this.set("__state", "created");
        }
        this.afterCreate(res);
        res.target = this;
        return res;
      }).finally(() => this.set("isSaving", false));
    },
    createProperties() {
      throw new Error("You must overwrite `createProperties()` before saving a record");
    },
    save(props) {
      return this.isNew ? this._saveNew(props) : this.update(props);
    },
    destroyRecord() {
      return this.store.destroyRecord(this.__type, this);
    }
  });
  RestModel.reopenClass({
    // Overwrite and JSON will be passed through here before `create` and `update`
    munge(json) {
      return json;
    },
    create(args) {
      args = args || {};
      let owner = (0, _getOwner.getOwner)(this);

      // Some Discourse code calls `model.create()` directly without going through the
      // store. In that case the injections are not made, so we do them here. Eventually
      // we should use the store for everything to fix this.
      if (!args.store) {
        args.store = owner.lookup("service:store");
      }
      if (!args.siteSettings) {
        args.siteSettings = owner.lookup("service:site-settings");
      }
      if (!args.appEvents) {
        args.appEvents = owner.lookup("service:appEvents");
      }
      args.__munge = this.munge;
      return this._super(this.munge(args, args.store));
    }
  });
  var _default = RestModel;
  _exports.default = _default;
});