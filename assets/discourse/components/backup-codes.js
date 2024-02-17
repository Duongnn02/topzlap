define("discourse/components/backup-codes", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/utilities", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _utilities, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/utilities",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="wrapper">
    <textarea
      id="backupCodes"
      class="backup-codes-area"
      rows="10"
      readonly
    >{{this.formattedBackupCodes}}</textarea>
  
    <div class="controls">
      <DButton
        @action={{action "copyToClipboard"}}
        @class="btn-default backup-codes-copy-btn"
        @icon="copy"
        @aria-label="user.second_factor_backup.copy_to_clipboard"
        @title="user.second_factor_backup.copy_to_clipboard"
      />
  
      <a
        download="{{this.siteTitleSlug}}-backup-codes.txt"
        class="btn btn-default no-text btn-icon backup-codes-download-btn"
        aria-label={{i18n "user.second_factor_backup.download_backup_codes"}}
        title={{i18n "user.second_factor_backup.download_backup_codes"}}
        rel="noopener noreferrer"
        target="_blank"
        href="data:application/octet-stream;charset=utf-8;base64,{{this.base64BackupCode}}"
      >
        {{d-icon "download"}}
      </a>
    </div>
  </div>
  */
  {
    "id": "LNrUGsLS",
    "block": "[[[10,0],[14,0,\"wrapper\"],[12],[1,\"\\n  \"],[10,\"textarea\"],[14,1,\"backupCodes\"],[14,0,\"backup-codes-area\"],[14,\"rows\",\"10\"],[14,\"readonly\",\"\"],[12],[1,[30,0,[\"formattedBackupCodes\"]]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@action\",\"@class\",\"@icon\",\"@aria-label\",\"@title\"],[[28,[37,1],[[30,0],\"copyToClipboard\"],null],\"btn-default backup-codes-copy-btn\",\"copy\",\"user.second_factor_backup.copy_to_clipboard\",\"user.second_factor_backup.copy_to_clipboard\"]],null],[1,\"\\n\\n    \"],[10,3],[15,\"download\",[29,[[30,0,[\"siteTitleSlug\"]],\"-backup-codes.txt\"]]],[14,0,\"btn btn-default no-text btn-icon backup-codes-download-btn\"],[15,\"aria-label\",[28,[37,2],[\"user.second_factor_backup.download_backup_codes\"],null]],[15,\"title\",[28,[37,2],[\"user.second_factor_backup.download_backup_codes\"],null]],[14,\"rel\",\"noopener noreferrer\"],[14,\"target\",\"_blank\"],[15,6,[29,[\"data:application/octet-stream;charset=utf-8;base64,\",[30,0,[\"base64BackupCode\"]]]]],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"download\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-button\",\"action\",\"i18n\",\"d-icon\"]]",
    "moduleName": "discourse/components/backup-codes.hbs",
    "isStrictMode": false
  });
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode("0x" + p1);
    }));
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("formattedBackupCodes"), _dec2 = (0, _decorators.default)("backupCodes"), _dec3 = (0, _decorators.default)(), (_obj = {
    classNames: ["backup-codes"],
    backupCodes: null,
    click(event) {
      if (event.target.id === "backupCodes") {
        this._selectAllBackupCodes();
      }
    },
    didRender() {
      this._super(...arguments);
      const backupCodes = this.element.querySelector("#backupCodes");
      if (backupCodes) {
        backupCodes.style.height = backupCodes.scrollHeight;
      }
    },
    base64BackupCode: b64EncodeUnicode,
    formattedBackupCodes(backupCodes) {
      if (!backupCodes) {
        return null;
      }
      return backupCodes.join("\n").trim();
    },
    siteTitleSlug() {
      const title = this.siteSettings.title;
      const convertedTitle = (0, _utilities.toAsciiPrintable)(title, "discourse");
      return (0, _utilities.slugify)(convertedTitle);
    },
    actions: {
      copyToClipboard() {
        this._selectAllBackupCodes();
        this.copyBackupCode(document.execCommand("copy"));
      }
    },
    _selectAllBackupCodes() {
      const textArea = this.element.querySelector("#backupCodes");
      textArea.focus();
      textArea.setSelectionRange(0, this.formattedBackupCodes.length);
    }
  }, (_applyDecoratedDescriptor(_obj, "base64BackupCode", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "base64BackupCode"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "formattedBackupCodes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "formattedBackupCodes"), _obj), _applyDecoratedDescriptor(_obj, "siteTitleSlug", [_dec3], Object.getOwnPropertyDescriptor(_obj, "siteTitleSlug"), _obj)), _obj))));
  _exports.default = _default;
});