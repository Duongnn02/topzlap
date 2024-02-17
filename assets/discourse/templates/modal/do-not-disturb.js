define("discourse/templates/modal/do-not-disturb", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="pause_notifications.title">
    <TapTileGrid @activeTile={{this.duration}} as |grid|>
      <TapTile
        @class="do-not-disturb-tile"
        @tileId="30"
        @activeTile={{grid.activeTile}}
        @onChange={{action "setDuration"}}
      >
        {{i18n "pause_notifications.options.half_hour"}}
      </TapTile>
      <TapTile
        @class="do-not-disturb-tile"
        @tileId="60"
        @activeTile={{grid.activeTile}}
        @onChange={{action "setDuration"}}
      >
        {{i18n "pause_notifications.options.one_hour"}}
      </TapTile>
      <TapTile
        @class="do-not-disturb-tile"
        @tileId="120"
        @activeTile={{grid.activeTile}}
        @onChange={{action "setDuration"}}
      >
        {{i18n "pause_notifications.options.two_hours"}}
      </TapTile>
      <TapTile
        @class="do-not-disturb-tile"
        @tileId="tomorrow"
        @activeTile={{grid.activeTile}}
        @onChange={{action "setDuration"}}
      >
        {{i18n "pause_notifications.options.tomorrow"}}
      </TapTile>
    </TapTileGrid>
  
    <DButton
      @action={{action "navigateToNotificationSchedule"}}
      @label="pause_notifications.set_schedule"
    />
  
  </DModalBody>
  */
  {
    "id": "TtyBkpTY",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"pause_notifications.title\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@activeTile\"],[[30,0,[\"duration\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,2],null,[[\"@class\",\"@tileId\",\"@activeTile\",\"@onChange\"],[\"do-not-disturb-tile\",\"30\",[30,1,[\"activeTile\"]],[28,[37,3],[[30,0],\"setDuration\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"pause_notifications.options.half_hour\"],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n    \"],[8,[39,2],null,[[\"@class\",\"@tileId\",\"@activeTile\",\"@onChange\"],[\"do-not-disturb-tile\",\"60\",[30,1,[\"activeTile\"]],[28,[37,3],[[30,0],\"setDuration\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"pause_notifications.options.one_hour\"],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n    \"],[8,[39,2],null,[[\"@class\",\"@tileId\",\"@activeTile\",\"@onChange\"],[\"do-not-disturb-tile\",\"120\",[30,1,[\"activeTile\"]],[28,[37,3],[[30,0],\"setDuration\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"pause_notifications.options.two_hours\"],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n    \"],[8,[39,2],null,[[\"@class\",\"@tileId\",\"@activeTile\",\"@onChange\"],[\"do-not-disturb-tile\",\"tomorrow\",[30,1,[\"activeTile\"]],[28,[37,3],[[30,0],\"setDuration\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,4],[\"pause_notifications.options.tomorrow\"],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"]],[1]]]]],[1,\"\\n\\n  \"],[8,[39,5],null,[[\"@action\",\"@label\"],[[28,[37,3],[[30,0],\"navigateToNotificationSchedule\"],null],\"pause_notifications.set_schedule\"]],null],[1,\"\\n\\n\"]],[]]]]]],[\"grid\"],false,[\"d-modal-body\",\"tap-tile-grid\",\"tap-tile\",\"action\",\"i18n\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/do-not-disturb.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});