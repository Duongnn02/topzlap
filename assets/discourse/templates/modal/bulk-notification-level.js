define("discourse/templates/modal/bulk-notification-level", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="bulk-notification-list">
    {{#each this.notificationLevels as |level|}}
      <div class="controls">
        <label class="radio notification-level-radio">
          <RadioButton
            @value={{level.id}}
            @name="notification_level"
            @selection={{this.notificationLevelId}}
          />
          <strong>{{level.name}}</strong>
          <div class="description">{{html-safe level.description}}</div>
        </label>
      </div>
    {{/each}}
  </div>
  
  <DButton
    @disabled={{this.disabled}}
    @action={{action "changeNotificationLevel"}}
    @label="topics.bulk.change_notification_level"
  />
  */
  {
    "id": "eB55Tu5A",
    "block": "[[[10,0],[14,0,\"bulk-notification-list\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"notificationLevels\"]]],null]],null],null,[[[1,\"    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"radio notification-level-radio\"],[12],[1,\"\\n        \"],[8,[39,2],null,[[\"@value\",\"@name\",\"@selection\"],[[30,1,[\"id\"]],\"notification_level\",[30,0,[\"notificationLevelId\"]]]],null],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n        \"],[10,0],[14,0,\"description\"],[12],[1,[28,[35,3],[[30,1,[\"description\"]]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[1]],null],[13],[1,\"\\n\\n\"],[8,[39,4],null,[[\"@disabled\",\"@action\",\"@label\"],[[30,0,[\"disabled\"]],[28,[37,5],[[30,0],\"changeNotificationLevel\"],null],\"topics.bulk.change_notification_level\"]],null]],[\"level\"],false,[\"each\",\"-track-array\",\"radio-button\",\"html-safe\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/bulk-notification-level.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});