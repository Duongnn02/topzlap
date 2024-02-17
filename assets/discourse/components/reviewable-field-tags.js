define("discourse/components/reviewable-field-tags", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <MiniTagChooser
    @value={{this.value}}
    @onChange={{action "onChange"}}
    @options={{hash categoryId=this.tagCategoryId}}
  />
  */
  {
    "id": "JKyUkA0b",
    "block": "[[[8,[39,0],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"value\"]],[28,[37,1],[[30,0],\"onChange\"],null],[28,[37,2],null,[[\"categoryId\"],[[30,0,[\"tagCategoryId\"]]]]]]],null]],[],false,[\"mini-tag-chooser\",\"action\",\"hash\"]]",
    "moduleName": "discourse/components/reviewable-field-tags.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    actions: {
      onChange(tags) {
        this.set("value", tags);
        this.valueChanged && this.valueChanged({
          target: {
            value: tags
          }
        });
      }
    }
  }));
  _exports.default = _default;
});