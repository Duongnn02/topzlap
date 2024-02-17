define("discourse/templates/preferences/notifications", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group notifications">
    <label class="control-label">{{i18n "user.notifications"}}</label>
  
    <div class="controls controls-dropdown">
      <label>{{i18n "user.like_notification_frequency.title"}}</label>
      <ComboBox
        @valueProperty="value"
        @content={{this.likeNotificationFrequencies}}
        @value={{this.model.user_option.like_notification_frequency}}
        @onChange={{action
          (mut this.model.user_option.like_notification_frequency)
        }}
      />
    </div>
  </div>
  
  {{#unless this.capabilities.isAppWebview}}
    <div class="control-group desktop-notifications">
      <label class="control-label">{{i18n
          "user.desktop_notifications.label"
        }}</label>
      <DesktopNotificationConfig />
      <div class="instructions">{{i18n
          "user.desktop_notifications.each_browser_note"
        }}</div>
      <span>
        <PluginOutlet
          @name="user-preferences-desktop-notifications"
          @connectorTagName="div"
          @outletArgs={{hash model=this.model save=(action "save")}}
        />
      </span>
    </div>
  {{/unless}}
  
  <UserNotificationSchedule @model={{this.model}} />
  
  <span>
    <PluginOutlet
      @name="user-preferences-notifications"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model save=(action "save")}}
    />
  </span>
  
  <br />
  
  <span>
    <PluginOutlet
      @name="user-custom-controls"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  
  <SaveControls
    @model={{this.model}}
    @action={{action "save"}}
    @saved={{this.saved}}
  />
  */
  {
    "id": "OgDh86Fw",
    "block": "[[[10,0],[14,0,\"control-group notifications\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.notifications\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,0],[\"user.like_notification_frequency.title\"],null]],[13],[1,\"\\n    \"],[8,[39,1],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"value\",[30,0,[\"likeNotificationFrequencies\"]],[30,0,[\"model\",\"user_option\",\"like_notification_frequency\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"model\",\"user_option\",\"like_notification_frequency\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"capabilities\",\"isAppWebview\"]]],[[[1,\"  \"],[10,0],[14,0,\"control-group desktop-notifications\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"user.desktop_notifications.label\"],null]],[13],[1,\"\\n    \"],[8,[39,5],null,null,null],[1,\"\\n    \"],[10,0],[14,0,\"instructions\"],[12],[1,[28,[35,0],[\"user.desktop_notifications.each_browser_note\"],null]],[13],[1,\"\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-desktop-notifications\",\"div\",[28,[37,7],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,8],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-preferences-notifications\",\"div\",[28,[37,7],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"br\"],[12],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"user-custom-controls\",\"div\",[28,[37,7],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,9],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,2],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null]],[],false,[\"i18n\",\"combo-box\",\"action\",\"mut\",\"unless\",\"desktop-notification-config\",\"plugin-outlet\",\"hash\",\"user-notification-schedule\",\"save-controls\"]]",
    "moduleName": "discourse/templates/preferences/notifications.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});