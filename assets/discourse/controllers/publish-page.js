define("discourse/controllers/publish-page", ["exports", "@ember/object", "@ember/object/computed", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _object, _computed, _controller, _modalFunctionality, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const States = {
    initializing: "initializing",
    checking: "checking",
    valid: "valid",
    invalid: "invalid",
    saving: "saving",
    new: "new",
    existing: "existing",
    unpublishing: "unpublishing",
    unpublished: "unpublished"
  };
  const StateHelpers = {};
  Object.keys(States).forEach(name => {
    StateHelpers[name] = (0, _computed.equal)("state", name);
  });
  var _default = _controller.default.extend(_modalFunctionality.default, StateHelpers, (_obj = {
    state: null,
    reason: null,
    publishedPage: null,
    disabled: (0, _computed.not)("valid"),
    showUrl: (0, _object.computed)("state", function () {
      return this.state === States.valid || this.state === States.saving || this.state === States.existing;
    }),
    showUnpublish: (0, _object.computed)("state", function () {
      return this.state === States.existing || this.state === States.unpublishing;
    }),
    onShow() {
      this.set("state", States.initializing);
      this.store.find("published_page", this.model.id).then(page => {
        this.setProperties({
          state: States.existing,
          publishedPage: page
        });
      }).catch(this.startNew);
    },
    startCheckSlug() {
      if (this.state === States.existing) {
        return;
      }
      this.set("state", States.checking);
    },
    checkSlug() {
      if (this.state === States.existing) {
        return;
      }
      return (0, _ajax.ajax)("/pub/check-slug", {
        data: {
          slug: this.publishedPage.slug
        }
      }).then(result => {
        if (result.valid_slug) {
          this.set("state", States.valid);
        } else {
          this.setProperties({
            state: States.invalid,
            reason: result.reason
          });
        }
      });
    },
    unpublish() {
      this.set("state", States.unpublishing);
      return this.publishedPage.destroyRecord().then(() => {
        this.set("state", States.unpublished);
        this.model.set("publishedPage", null);
      }).catch(result => {
        this.set("state", States.existing);
        (0, _ajaxError.popupAjaxError)(result);
      });
    },
    publish() {
      this.set("state", States.saving);
      return this.publishedPage.update(this.publishedPage.getProperties("slug", "public")).then(() => {
        this.set("state", States.existing);
        this.model.set("publishedPage", this.publishedPage);
      }).catch(errResult => {
        (0, _ajaxError.popupAjaxError)(errResult);
        this.set("state", States.existing);
      });
    },
    startNew() {
      this.setProperties({
        state: States.new,
        publishedPage: this.store.createRecord("published_page", this.model.getProperties("id", "slug", "public"))
      });
      this.checkSlug();
    },
    onChangePublic(isPublic) {
      this.publishedPage.set("public", isPublic);
      if (this.showUnpublish) {
        this.publish();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "startCheckSlug", [_object.action], Object.getOwnPropertyDescriptor(_obj, "startCheckSlug"), _obj), _applyDecoratedDescriptor(_obj, "checkSlug", [_object.action], Object.getOwnPropertyDescriptor(_obj, "checkSlug"), _obj), _applyDecoratedDescriptor(_obj, "unpublish", [_object.action], Object.getOwnPropertyDescriptor(_obj, "unpublish"), _obj), _applyDecoratedDescriptor(_obj, "publish", [_object.action], Object.getOwnPropertyDescriptor(_obj, "publish"), _obj), _applyDecoratedDescriptor(_obj, "startNew", [_object.action], Object.getOwnPropertyDescriptor(_obj, "startNew"), _obj), _applyDecoratedDescriptor(_obj, "onChangePublic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangePublic"), _obj)), _obj));
  _exports.default = _default;
});