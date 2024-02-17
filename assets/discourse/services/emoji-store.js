define("discourse/services/emoji-store", ["exports", "discourse/lib/key-value-store", "@ember/service"], function (_exports, _keyValueStore, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/key-value-store",0,"@ember/service"eaimeta@70e063a35619d71f
  const EMOJI_USAGE = "emojiUsage";
  const EMOJI_SELECTED_DIVERSITY = "emojiSelectedDiversity";
  const TRACKED_EMOJIS = 15;
  const STORE_NAMESPACE = "discourse_emojis_";
  var _default = _service.default.extend({
    init() {
      this._super(...arguments);
      this.store = new _keyValueStore.default(STORE_NAMESPACE);
      if (!this.store.getObject(EMOJI_USAGE)) {
        this.favorites = [];
      }
    },
    get diversity() {
      return this.store.getObject(EMOJI_SELECTED_DIVERSITY) || 1;
    },
    set diversity(value) {
      this.store.setObject({
        key: EMOJI_SELECTED_DIVERSITY,
        value: value || 1
      });
      this.notifyPropertyChange("diversity");
    },
    get favorites() {
      return this.store.getObject(EMOJI_USAGE) || [];
    },
    set favorites(value) {
      this.store.setObject({
        key: EMOJI_USAGE,
        value: value || []
      });
      this.notifyPropertyChange("favorites");
    },
    track(code) {
      const normalizedCode = code.replace(/(^:)|(:$)/g, "");
      const recent = this.favorites.filter(r => r !== normalizedCode);
      recent.unshift(normalizedCode);
      recent.length = Math.min(recent.length, TRACKED_EMOJIS);
      this.favorites = recent;
    },
    reset() {
      const store = new _keyValueStore.default(STORE_NAMESPACE);
      store.setObject({
        key: EMOJI_USAGE,
        value: []
      });
      store.setObject({
        key: EMOJI_SELECTED_DIVERSITY,
        value: 1
      });
    }
  });
  _exports.default = _default;
});