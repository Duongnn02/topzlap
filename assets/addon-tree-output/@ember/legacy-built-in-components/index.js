define("@ember/legacy-built-in-components/index", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.TextField = _exports.TextArea = _exports.LinkComponent = _exports.Checkbox = void 0;
  /* eslint-disable ember/new-module-imports */

  let Checkbox;
  _exports.Checkbox = Checkbox;
  {
    _exports.Checkbox = Checkbox = _ember.default._LegacyCheckbox.extend();
  }
  let LinkComponent;
  _exports.LinkComponent = LinkComponent;
  {
    _exports.LinkComponent = LinkComponent = _ember.default._LegacyLinkComponent.extend();
  }
  let TextArea;
  _exports.TextArea = TextArea;
  {
    _exports.TextArea = TextArea = _ember.default._LegacyTextArea.extend();
  }
  let TextField;
  _exports.TextField = TextField;
  {
    _exports.TextField = TextField = _ember.default._LegacyTextField.extend();
  }
});