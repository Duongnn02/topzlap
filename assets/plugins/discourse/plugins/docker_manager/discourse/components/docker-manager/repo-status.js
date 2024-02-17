define("discourse/plugins/docker_manager/discourse/components/docker-manager/repo-status", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object", "I18n"], function (_exports, _component, _templateFactory, _component2, _service, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <tr>
    <td>
      {{#if this.officialRepoBadge}}
        {{d-icon
          this.officialRepoBadge
          class="check-circle"
          translatedTitle=this.officialRepoBadgeTitle
        }}
      {{/if}}
    </td>
  
    <td>
      <a href={{@repo.url}}>{{@repo.name}}</a>
      <span class="current commit-hash" title={{@repo.version}}>
        {{@repo.prettyVersion}}
      </span>
    </td>
  
    <td>
      {{#if @repo.checkingStatus}}
        {{i18n "admin.docker.checking"}}
      {{else if @repo.upToDate}}
        {{i18n "admin.docker.up_to_date"}}
      {{else}}
        <div class="new-version">
          <h4>{{i18n "admin.docker.new_version_available"}}</h4>
  
          <ul>
            <li>
              {{i18n "admin.docker.latest_version"}}
              <span class="new commit-hash" title={{@repo.latestVersion}}>
                {{@repo.prettyLatestVersion}}
              </span>
            </li>
            <li>
              {{i18n "admin.docker.last_updated"}}
              {{#if @repo.latest.date}}
                {{format-date @repo.latest.date}}
              {{else}}
                &mdash;
              {{/if}}
            </li>
            <li class="new-commits">
              {{new-commits
                @repo.latest.commits_behind
                @repo.version
                @repo.latest.version
                @repo.url
              }}
            </li>
          </ul>
  
          <DButton
            @action={{this.upgrade}}
            @disabled={{this.upgradeDisabled}}
            @class="upgrade-button"
            @translatedLabel={{this.upgradeButtonLabel}}
          />
        </div>
      {{/if}}
    </td>
  </tr>
  */
  {
    "id": "DjayAwPe",
    "block": "[[[10,\"tr\"],[12],[1,\"\\n  \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,0,[\"officialRepoBadge\"]],[[[1,\"      \"],[1,[28,[35,1],[[30,0,[\"officialRepoBadge\"]]],[[\"class\",\"translatedTitle\"],[\"check-circle\",[30,0,[\"officialRepoBadgeTitle\"]]]]]],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n    \"],[10,3],[15,6,[30,1,[\"url\"]]],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n    \"],[10,1],[14,0,\"current commit-hash\"],[15,\"title\",[30,1,[\"version\"]]],[12],[1,\"\\n      \"],[1,[30,1,[\"prettyVersion\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,1,[\"checkingStatus\"]],[[[1,\"      \"],[1,[28,[35,2],[\"admin.docker.checking\"],null]],[1,\"\\n\"]],[]],[[[41,[30,1,[\"upToDate\"]],[[[1,\"      \"],[1,[28,[35,2],[\"admin.docker.up_to_date\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"new-version\"],[12],[1,\"\\n        \"],[10,\"h4\"],[12],[1,[28,[35,2],[\"admin.docker.new_version_available\"],null]],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[12],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[1,[28,[35,2],[\"admin.docker.latest_version\"],null]],[1,\"\\n            \"],[10,1],[14,0,\"new commit-hash\"],[15,\"title\",[30,1,[\"latestVersion\"]]],[12],[1,\"\\n              \"],[1,[30,1,[\"prettyLatestVersion\"]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[1,[28,[35,2],[\"admin.docker.last_updated\"],null]],[1,\"\\n\"],[41,[30,1,[\"latest\",\"date\"]],[[[1,\"              \"],[1,[28,[35,3],[[30,1,[\"latest\",\"date\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"              —\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"new-commits\"],[12],[1,\"\\n            \"],[1,[28,[35,4],[[30,1,[\"latest\",\"commits_behind\"]],[30,1,[\"version\"]],[30,1,[\"latest\",\"version\"]],[30,1,[\"url\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[8,[39,5],null,[[\"@action\",\"@disabled\",\"@class\",\"@translatedLabel\"],[[30,0,[\"upgrade\"]],[30,0,[\"upgradeDisabled\"]],\"upgrade-button\",[30,0,[\"upgradeButtonLabel\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"@repo\"],false,[\"if\",\"d-icon\",\"i18n\",\"format-date\",\"new-commits\",\"d-button\"]]",
    "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/repo-status.hbs",
    "isStrictMode": false
  });
  let RepoStatus = (_class = class RepoStatus extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "upgradeStore", _descriptor2, this);
    }
    get upgradeDisabled() {
      // Allow to see the currently running upgrade
      if (this.args.upgradingRepo) {
        return false;
      }

      // Disable other buttons when an upgrade is running
      if (this.upgradeStore.running) {
        return true;
      }

      // docker_manager has to be upgraded before other plugins
      return !this.args.managerRepo.upToDate && this.args.managerRepo !== this.args.repo;
    }
    get officialRepoBadge() {
      if (this.args.repo.fork) {
        return "exclamation-circle";
      } else if (this.args.repo.official) {
        return "check-circle";
      }
    }
    get officialRepoBadgeTitle() {
      if (this.args.repo.fork) {
        return _I18n.default.t("admin.docker.forked_plugin");
      } else if (this.args.repo.official) {
        return _I18n.default.t("admin.docker.official_plugin");
      }
    }
    get upgradeButtonLabel() {
      if (this.args.repo.upgrading) {
        return _I18n.default.t("admin.docker.upgrading");
      } else {
        return _I18n.default.t("admin.docker.upgrade_action");
      }
    }
    upgrade() {
      this.router.transitionTo("upgrade.show", this.args.repo);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "upgradeStore", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "upgrade", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "upgrade"), _class.prototype)), _class);
  _exports.default = RepoStatus;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, RepoStatus);
});