define("discourse/components/pending-post", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse/lib/load-oneboxes", "discourse/lib/ajax", "pretty-text/upload-short-url"], function (_exports, _component, _templateFactory, _decorators, _loadOneboxes, _ajax, _uploadShortUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse/lib/load-oneboxes",0,"discourse/lib/ajax",0,"pretty-text/upload-short-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <UserStreamItem @item={{@post}} />
  */
  {
    "id": "QxNva+5p",
    "block": "[[[8,[39,0],null,[[\"@item\"],[[30,1]]],null]],[\"@post\"],false,[\"user-stream-item\"]]",
    "moduleName": "discourse/components/pending-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    didRender() {
      this._loadOneboxes();
      this._resolveUrls();
    },
    _loadOneboxes() {
      (0, _loadOneboxes.loadOneboxes)(this.element, _ajax.ajax, this.post.topic_id, this.post.category_id, this.siteSettings.max_oneboxes_per_post, true);
    },
    _resolveUrls() {
      (0, _uploadShortUrl.resolveAllShortUrls)(_ajax.ajax, this.siteSettings, this.element, this.opts);
    }
  }, (_applyDecoratedDescriptor(_obj, "_loadOneboxes", [_decorators.afterRender], Object.getOwnPropertyDescriptor(_obj, "_loadOneboxes"), _obj), _applyDecoratedDescriptor(_obj, "_resolveUrls", [_decorators.afterRender], Object.getOwnPropertyDescriptor(_obj, "_resolveUrls"), _obj)), _obj)));
  _exports.default = _default;
});