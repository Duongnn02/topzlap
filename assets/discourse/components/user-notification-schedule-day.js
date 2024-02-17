define("discourse/components/user-notification-schedule-day", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <tr class="day {{this.dayLabel}}">
    <td class="day-label">{{this.dayLabel}}</td>
    <td class="starts-at">
      <ComboBox
        @valueProperty="value"
        @content={{this.startTimeOptions}}
        @value={{this.startTimeValue}}
        @onChange={{this.onChangeStartTime}}
      />
    </td>
    {{#if this.endTimeOptions}}
      <td class="to">{{i18n "user.notification_schedule.to"}}</td>
      <td class="ends-at">
        <ComboBox
          @valueProperty="value"
          @content={{this.endTimeOptions}}
          @value={{this.endTimeValue}}
          @onChange={{this.onChangeEndTime}}
        />
      </td>
    {{/if}}
  </tr>
  */
  {
    "id": "ka00K4Tj",
    "block": "[[[10,\"tr\"],[15,0,[29,[\"day \",[30,0,[\"dayLabel\"]]]]],[12],[1,\"\\n  \"],[10,\"td\"],[14,0,\"day-label\"],[12],[1,[30,0,[\"dayLabel\"]]],[13],[1,\"\\n  \"],[10,\"td\"],[14,0,\"starts-at\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"startTimeOptions\"]],[30,0,[\"startTimeValue\"]],[30,0,[\"onChangeStartTime\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"endTimeOptions\"]],[[[1,\"    \"],[10,\"td\"],[14,0,\"to\"],[12],[1,[28,[35,2],[\"user.notification_schedule.to\"],null]],[13],[1,\"\\n    \"],[10,\"td\"],[14,0,\"ends-at\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"endTimeOptions\"]],[30,0,[\"endTimeValue\"]],[30,0,[\"onChangeEndTime\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"combo-box\",\"if\",\"i18n\"]]",
    "moduleName": "discourse/components/user-notification-schedule-day.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "",
    dayLabel: (0, _computed.i18n)("day", "user.notification_schedule.%@")
  }));
  _exports.default = _default;
});