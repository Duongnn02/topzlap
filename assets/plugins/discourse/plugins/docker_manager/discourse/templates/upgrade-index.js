define("discourse/plugins/docker_manager/discourse/templates/upgrade-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <h1>{{i18n "admin.docker.upgrade_title"}}</h1>
  
  {{#if this.outdated}}
    <h2>{{i18n "admin.docker.outdated_image_header"}}</h2>
    <p>{{i18n "admin.docker.outdated_image_info"}}</p>
  
    {{! prettier-ignore }}
    <pre>
      cd /var/discourse
      git pull
      ./launcher rebuild app
    </pre>
    <p>
      <a
        href="https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325"
      >
        {{i18n "admin.docker.outdated_image_link"}}
      </a>
    </p>
  {{else}}
    <button
      disabled={{this.upgradeAllButtonDisabled}}
      id="upgrade-all"
      class="btn"
      type="button"
      {{on "click" this.upgradeAllButton}}
    >
      {{#if this.allUpToDate}}
        {{i18n "admin.docker.all_up_to_date"}}
      {{else}}
        {{i18n "admin.docker.upgrade_all"}}
      {{/if}}
    </button>
  
    <table class="table" id="repos">
      <thead>
        <th></th>
        <th style="width: 50%">{{i18n "admin.docker.repository"}}</th>
        <th>{{i18n "admin.docker.status"}}</th>
      </thead>
      <tbody>
        {{#each this.model as |repo|}}
          <DockerManager::RepoStatus
            @repo={{repo}}
            @upgradingRepo={{repo.upgrading}}
            @managerRepo={{this.managerRepo}}
          />
        {{/each}}
      </tbody>
    </table>
  {{/if}}
  */
  {
    "id": "DLkPlCRJ",
    "block": "[[[10,\"h1\"],[12],[1,[28,[35,0],[\"admin.docker.upgrade_title\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"outdated\"]],[[[1,\"  \"],[10,\"h2\"],[12],[1,[28,[35,0],[\"admin.docker.outdated_image_header\"],null]],[13],[1,\"\\n  \"],[10,2],[12],[1,[28,[35,0],[\"admin.docker.outdated_image_info\"],null]],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"pre\"],[12],[1,\"    cd /var/discourse\\n    git pull\\n    ./launcher rebuild app\\n  \"],[13],[1,\"\\n  \"],[10,2],[12],[1,\"\\n    \"],[10,3],[14,6,\"https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.docker.outdated_image_link\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[11,\"button\"],[16,\"disabled\",[30,0,[\"upgradeAllButtonDisabled\"]]],[24,1,\"upgrade-all\"],[24,0,\"btn\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"upgradeAllButton\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"allUpToDate\"]],[[[1,\"      \"],[1,[28,[35,0],[\"admin.docker.all_up_to_date\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,0],[\"admin.docker.upgrade_all\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,\"table\"],[14,0,\"table\"],[14,1,\"repos\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"th\"],[12],[13],[1,\"\\n      \"],[10,\"th\"],[14,5,\"width: 50%\"],[12],[1,[28,[35,0],[\"admin.docker.repository\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[12],[1,[28,[35,0],[\"admin.docker.status\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"        \"],[8,[39,5],null,[[\"@repo\",\"@upgradingRepo\",\"@managerRepo\"],[[30,1],[30,1,[\"upgrading\"]],[30,0,[\"managerRepo\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"repo\"],false,[\"i18n\",\"if\",\"on\",\"each\",\"-track-array\",\"docker-manager/repo-status\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/templates/upgrade-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});