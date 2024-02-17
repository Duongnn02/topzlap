define("discourse/lib/email-provider-default-settings", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = emailProviderDefaultSettings;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const GMAIL = {
    imap: {
      imap_server: "imap.gmail.com",
      imap_port: "993",
      imap_ssl: true
    },
    smtp: {
      smtp_server: "smtp.gmail.com",
      smtp_port: "587",
      smtp_ssl: true
    }
  };
  function emailProviderDefaultSettings(provider, protocol) {
    provider = provider.toLowerCase();
    protocol = protocol.toLowerCase();
    switch (provider) {
      case "gmail":
        return GMAIL[protocol];
    }
  }
});