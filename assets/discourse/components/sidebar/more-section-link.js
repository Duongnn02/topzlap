define("discourse/components/sidebar/more-section-link", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Sidebar::SectionLink
    @shouldDisplay={{@sectionLink.shouldDisplay}}
    @linkName={{@sectionLink.name}}
    @route={{@sectionLink.route}}
    @href={{@sectionLink.href}}
    @query={{@sectionLink.query}}
    @title={{@sectionLink.title}}
    @content={{@sectionLink.text}}
    @currentWhen={{@sectionLink.currentWhen}}
    @badgeText={{@sectionLink.badgeText}}
    @model={{@sectionLink.model}}
    @models={{@sectionLink.models}}
    @prefixType={{@sectionLink.prefixType}}
    @prefixValue={{@sectionLink.prefixValue}}
  />
  */
  {
    "id": "Vrrh9pj2",
    "block": "[[[8,[39,0],null,[[\"@shouldDisplay\",\"@linkName\",\"@route\",\"@href\",\"@query\",\"@title\",\"@content\",\"@currentWhen\",\"@badgeText\",\"@model\",\"@models\",\"@prefixType\",\"@prefixValue\"],[[30,1,[\"shouldDisplay\"]],[30,1,[\"name\"]],[30,1,[\"route\"]],[30,1,[\"href\"]],[30,1,[\"query\"]],[30,1,[\"title\"]],[30,1,[\"text\"]],[30,1,[\"currentWhen\"]],[30,1,[\"badgeText\"]],[30,1,[\"model\"]],[30,1,[\"models\"]],[30,1,[\"prefixType\"]],[30,1,[\"prefixValue\"]]]],null]],[\"@sectionLink\"],false,[\"sidebar/section-link\"]]",
    "moduleName": "discourse/components/sidebar/more-section-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});