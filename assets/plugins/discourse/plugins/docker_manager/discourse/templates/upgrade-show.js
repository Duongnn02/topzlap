define("discourse/plugins/docker_manager/discourse/templates/upgrade-show", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h1>{{this.title}}</h1>
  
  <DockerManager::ProgressBar @percent={{this.upgradeStore.progressPercentage}} />
  
  {{#if this.complete}}
    <p>{{i18n "admin.docker.upgrade_successful"}}</p>
  {{else if this.failed}}
    <p>{{i18n "admin.docker.upgrade_error"}}</p>
  {{/if}}
  
  {{#if this.isUpToDate}}
    {{#if this.multiUpgrade}}
      <p>{{i18n "admin.docker.everything_up_to_date"}}</p>
    {{else}}
      <p>{{i18n "admin.docker.repo_newest_version" name=this.model.name}}</p>
    {{/if}}
  {{else}}
    <div class="upgrade-actions">
      <button
        {{on "click" this.start}}
        disabled={{this.upgrading}}
        class="btn start-upgrade"
        type="button"
      >
        {{#if this.upgrading}}
          {{i18n "admin.docker.upgrading"}}
        {{else}}
          {{i18n "admin.docker.start_upgrading"}}
        {{/if}}
      </button>
  
      {{#if this.upgrading}}
        <button {{on "click" this.resetUpgrade}} class="btn unlock" type="button">
          {{i18n "admin.docker.reset_upgrade"}}
        </button>
      {{/if}}
    </div>
  {{/if}}
  
  <DockerManager::Console
    @output={{this.upgradeStore.consoleOutput}}
    @followOutput={{true}}
  />
  */
  {
    "id": "hR+DfpZK",
    "block": "[[[10,\"h1\"],[12],[1,[30,0,[\"title\"]]],[13],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@percent\"],[[30,0,[\"upgradeStore\",\"progressPercentage\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"complete\"]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,2],[\"admin.docker.upgrade_successful\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"failed\"]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,2],[\"admin.docker.upgrade_error\"],null]],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"isUpToDate\"]],[[[41,[30,0,[\"multiUpgrade\"]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,2],[\"admin.docker.everything_up_to_date\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,2],[\"admin.docker.repo_newest_version\"],[[\"name\"],[[30,0,[\"model\",\"name\"]]]]]],[13],[1,\"\\n\"]],[]]]],[]],[[[1,\"  \"],[10,0],[14,0,\"upgrade-actions\"],[12],[1,\"\\n    \"],[11,\"button\"],[16,\"disabled\",[30,0,[\"upgrading\"]]],[24,0,\"btn start-upgrade\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"start\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"upgrading\"]],[[[1,\"        \"],[1,[28,[35,2],[\"admin.docker.upgrading\"],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,2],[\"admin.docker.start_upgrading\"],null]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"upgrading\"]],[[[1,\"      \"],[11,\"button\"],[24,0,\"btn unlock\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"resetUpgrade\"]]],null],[12],[1,\"\\n        \"],[1,[28,[35,2],[\"admin.docker.reset_upgrade\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[8,[39,4],null,[[\"@output\",\"@followOutput\"],[[30,0,[\"upgradeStore\",\"consoleOutput\"]],true]],null]],[],false,[\"docker-manager/progress-bar\",\"if\",\"i18n\",\"on\",\"docker-manager/console\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/templates/upgrade-show.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});