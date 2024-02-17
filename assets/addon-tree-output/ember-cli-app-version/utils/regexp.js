define("ember-cli-app-version/utils/regexp", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.versionRegExp = _exports.versionExtendedRegExp = _exports.shaRegExp = void 0;
  const versionRegExp = /\d+[.]\d+[.]\d+/; // Match any number of 3 sections of digits separated by .
  _exports.versionRegExp = versionRegExp;
  const versionExtendedRegExp = /\d+[.]\d+[.]\d+-[a-z]*([.]\d+)?/; // Match the above but also hyphen followed by any number of lowercase letters, then optionally period and digits
  _exports.versionExtendedRegExp = versionExtendedRegExp;
  const shaRegExp = /[a-z\d]{8}$/; // Match 8 lowercase letters and digits, at the end of the string only (to avoid matching with version extended part)
  _exports.shaRegExp = shaRegExp;
});