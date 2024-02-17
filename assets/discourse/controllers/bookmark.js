define("discourse/controllers/bookmark", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "@ember/object", "rsvp", "discourse/lib/show-modal"], function (_exports, _controller, _I18n, _modalFunctionality, _object, _rsvp, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.openBookmarkModal = openBookmarkModal;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"rsvp",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function openBookmarkModal(bookmark) {
    let callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      onCloseWithoutSaving: null,
      onAfterSave: null,
      onAfterDelete: null
    };
    return new _rsvp.Promise(resolve => {
      const model = {
        id: bookmark.id,
        reminderAt: bookmark.reminder_at,
        autoDeletePreference: bookmark.auto_delete_preference,
        name: bookmark.name
      };
      model.bookmarkableId = bookmark.bookmarkable_id;
      model.bookmarkableType = bookmark.bookmarkable_type;
      let modalController = (0, _showModal.default)("bookmark", {
        model,
        titleTranslated: _I18n.default.t(bookmark.id ? "bookmarks.edit" : "bookmarks.create"),
        modalClass: "bookmark-with-reminder"
      });
      modalController.setProperties({
        onCloseWithoutSaving: () => {
          if (callbacks.onCloseWithoutSaving) {
            callbacks.onCloseWithoutSaving();
          }
          resolve();
        },
        afterSave: savedData => {
          let resolveData;
          if (callbacks.onAfterSave) {
            resolveData = callbacks.onAfterSave(savedData);
          }
          resolve(resolveData);
        },
        afterDelete: (topicBookmarked, bookmarkId) => {
          if (callbacks.onAfterDelete) {
            callbacks.onAfterDelete(topicBookmarked, bookmarkId);
          }
          resolve();
        }
      });
    });
  }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    onShow() {
      this.setProperties({
        model: this.model || {},
        allowSave: true
      });
    },
    registerOnCloseHandler(handlerFn) {
      this.set("onCloseHandler", handlerFn);
    },
    /**
     * We always want to save the bookmark unless the user specifically
     * clicks the save or cancel button to mimic browser behaviour.
     */
    onClose() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this.onCloseHandler) {
        this.onCloseHandler(opts);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "registerOnCloseHandler", [_object.action], Object.getOwnPropertyDescriptor(_obj, "registerOnCloseHandler"), _obj)), _obj));
  _exports.default = _default;
});