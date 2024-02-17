define("ember-buffered-proxy/mixin", ["exports", "ember", "@ember/object/mixin", "@ember/array", "@ember/object/computed", "@ember/object", "ember-buffered-proxy/helpers"], function (_exports, _ember, _mixin, _array, _computed, _object, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint-disable ember/no-get */
  /* eslint-disable ember/no-new-mixins */

  const {
    meta
  } = _ember.default; // eslint-disable-line ember/new-module-imports
  const hasOwnProp = Object.prototype.hasOwnProperty;
  function monkeyPatchedNotifyPropertyChange(context, key) {
    if (true && false) {
      let content = (0, _object.get)(context, 'content');
      (0, _object.notifyPropertyChange)(content, key);
    } else {
      (0, _object.notifyPropertyChange)(context, key);
    }
  }
  var _default = _mixin.default.create({
    buffer: null,
    hasBufferedChanges: false,
    hasChanges: (0, _computed.readOnly)('hasBufferedChanges'),
    applyChanges: (0, _helpers.aliasMethod)('applyBufferedChanges'),
    discardChanges: (0, _helpers.aliasMethod)('discardBufferedChanges'),
    init() {
      this.initializeBuffer();
      (0, _object.set)(this, 'hasBufferedChanges', false);
      this._super(...arguments);
    },
    initializeBuffer(onlyTheseKeys) {
      if ((0, _array.isArray)(onlyTheseKeys) && !(0, _helpers.empty)(onlyTheseKeys)) {
        onlyTheseKeys.forEach(key => delete this.buffer[key]);
      } else {
        (0, _object.set)(this, 'buffer', Object.create(null));
      }
    },
    unknownProperty(key) {
      const buffer = (0, _object.get)(this, 'buffer');
      return hasOwnProp.call(buffer, key) ? buffer[key] : this._super(key);
    },
    setUnknownProperty(key, value) {
      const m = meta(this);
      if (m.proto === this || m.isInitializing && m.isInitializing()) {
        // if marked as prototype or object is initializing then just
        // defineProperty rather than delegate
        (0, _object.defineProperty)(this, key, null, value);
        return value;
      }
      const {
        buffer,
        content
      } = (0, _object.getProperties)(this, ['buffer', 'content']);
      let current;
      let previous;
      if (content != null) {
        current = (0, _object.get)(content, key);
      }
      previous = hasOwnProp.call(buffer, key) ? buffer[key] : current;
      if (previous === value) {
        return;
      }
      if (current === value) {
        delete buffer[key];
        if ((0, _helpers.empty)(buffer)) {
          (0, _object.set)(this, 'hasBufferedChanges', false);
        }
      } else {
        buffer[key] = value;
        (0, _object.set)(this, 'hasBufferedChanges', true);
      }
      monkeyPatchedNotifyPropertyChange(this, key);
      return value;
    },
    applyBufferedChanges(onlyTheseKeys) {
      const {
        buffer,
        content
      } = (0, _object.getProperties)(this, ['buffer', 'content']);
      Object.keys(buffer).forEach(key => {
        if ((0, _array.isArray)(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
          return;
        }
        (0, _object.set)(content, key, buffer[key]);
      });
      this.initializeBuffer(onlyTheseKeys);
      if ((0, _helpers.empty)((0, _object.get)(this, 'buffer'))) {
        (0, _object.set)(this, 'hasBufferedChanges', false);
      }
    },
    discardBufferedChanges(onlyTheseKeys) {
      const buffer = (0, _object.get)(this, 'buffer');
      this.initializeBuffer(onlyTheseKeys);
      Object.keys(buffer).forEach(key => {
        if ((0, _array.isArray)(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
          return;
        }
        monkeyPatchedNotifyPropertyChange(this, key);
      });
      if ((0, _helpers.empty)((0, _object.get)(this, 'buffer'))) {
        (0, _object.set)(this, 'hasBufferedChanges', false);
      }
    },
    /*
     * Determines if a given key has changed else returns false. Allows individual key lookups where
     * as hasBufferedChanged only looks at the whole buffer.
     */
    hasChanged(key) {
      const {
        buffer,
        content
      } = (0, _object.getProperties)(this, ['buffer', 'content']);
      if (typeof key !== 'string' || typeof (0, _object.get)(buffer, key) === 'undefined') {
        return false;
      }
      if ((0, _object.get)(buffer, key) !== (0, _object.get)(content, key)) {
        return true;
      }
      return false;
    }
  });
  _exports.default = _default;
});