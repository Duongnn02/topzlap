define("discourse/components/shared-draft-controls", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators", "@ember/service"], function (_exports, _component, _templateFactory, _I18n, _decorators, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="shared-draft-controls">
    {{#if this.publishing}}
      {{i18n "shared_drafts.publishing"}}
    {{else}}
      {{i18n "shared_drafts.notice"}}
  
      <div class="publish-field">
        <label>{{i18n "shared_drafts.destination_category"}}</label>
        <CategoryChooser
          @value={{this.topic.destination_category_id}}
          @onChange={{action "updateDestinationCategory"}}
        />
      </div>
  
      <div class="publish-field">
        {{#if this.validCategory}}
          <DButton
            @action={{action "publish"}}
            @label="shared_drafts.publish"
            @class="btn-primary publish-shared-draft"
            @icon="far-clipboard"
          />
        {{/if}}
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "DQ9GAb6t",
    "block": "[[[10,0],[14,0,\"shared-draft-controls\"],[12],[1,\"\\n\"],[41,[30,0,[\"publishing\"]],[[[1,\"    \"],[1,[28,[35,1],[\"shared_drafts.publishing\"],null]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,1],[\"shared_drafts.notice\"],null]],[1,\"\\n\\n    \"],[10,0],[14,0,\"publish-field\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"shared_drafts.destination_category\"],null]],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@value\",\"@onChange\"],[[30,0,[\"topic\",\"destination_category_id\"]],[28,[37,3],[[30,0],\"updateDestinationCategory\"],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"publish-field\"],[12],[1,\"\\n\"],[41,[30,0,[\"validCategory\"]],[[[1,\"        \"],[8,[39,4],null,[[\"@action\",\"@label\",\"@class\",\"@icon\"],[[28,[37,3],[[30,0],\"publish\"],null],\"shared_drafts.publish\",\"btn-primary publish-shared-draft\",\"far-clipboard\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]]],[13]],[],false,[\"if\",\"i18n\",\"category-chooser\",\"action\",\"d-button\"]]",
    "moduleName": "discourse/components/shared-draft-controls.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic.destination_category_id"), (_obj = {
    tagName: "",
    dialog: (0, _service.inject)(),
    publishing: false,
    validCategory(destCatId) {
      return destCatId && destCatId !== this.site.shared_drafts_category_id;
    },
    actions: {
      updateDestinationCategory(categoryId) {
        return this.topic.updateDestinationCategory(categoryId);
      },
      publish() {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("shared_drafts.confirm_publish"),
          didConfirm: () => {
            this.set("publishing", true);
            const destinationCategoryId = this.topic.destination_category_id;
            return this.topic.publish().then(() => {
              this.topic.setProperties({
                category_id: destinationCategoryId,
                destination_category_id: undefined,
                is_shared_draft: false
              });
            }).finally(() => {
              this.set("publishing", false);
            });
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "validCategory", [_dec], Object.getOwnPropertyDescriptor(_obj, "validCategory"), _obj)), _obj))));
  _exports.default = _default;
});