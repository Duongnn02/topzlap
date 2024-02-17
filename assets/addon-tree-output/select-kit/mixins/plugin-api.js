define("select-kit/mixins/plugin-api", ["exports", "@ember/object/mixin", "@ember/utils", "discourse-common/lib/helpers"], function (_exports, _mixin, _utils, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.applyContentPluginApiCallbacks = applyContentPluginApiCallbacks;
  _exports.applyOnChangePluginApiCallbacks = applyOnChangePluginApiCallbacks;
  _exports.clearCallbacks = clearCallbacks;
  _exports.default = void 0;
  _exports.modifySelectKit = modifySelectKit;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/utils",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  let _appendContentCallbacks = {};
  function appendContent(pluginApiIdentifiers, contentFunction) {
    if ((0, _utils.isNone)(_appendContentCallbacks[pluginApiIdentifiers])) {
      _appendContentCallbacks[pluginApiIdentifiers] = [];
    }
    _appendContentCallbacks[pluginApiIdentifiers].push(contentFunction);
  }
  let _prependContentCallbacks = {};
  function prependContent(targetedIdentifier, contentFunction) {
    if ((0, _utils.isNone)(_prependContentCallbacks[targetedIdentifier])) {
      _prependContentCallbacks[targetedIdentifier] = [];
    }
    _prependContentCallbacks[targetedIdentifier].push(contentFunction);
  }
  let _onChangeCallbacks = {};
  function onChange(pluginApiIdentifiers, mutationFunction) {
    if ((0, _utils.isNone)(_onChangeCallbacks[pluginApiIdentifiers])) {
      _onChangeCallbacks[pluginApiIdentifiers] = [];
    }
    _onChangeCallbacks[pluginApiIdentifiers].push(mutationFunction);
  }
  let _replaceContentCallbacks = {};
  function replaceContent(pluginApiIdentifiers, contentFunction) {
    if ((0, _utils.isNone)(_replaceContentCallbacks[pluginApiIdentifiers])) {
      _replaceContentCallbacks[pluginApiIdentifiers] = [];
    }
    _replaceContentCallbacks[pluginApiIdentifiers].push(contentFunction);
  }
  function applyContentPluginApiCallbacks(content, component) {
    (0, _helpers.makeArray)(component.pluginApiIdentifiers).forEach(key => {
      (_prependContentCallbacks[key] || []).forEach(c => {
        const prependedContent = c(component, content);
        if (prependedContent) {
          content = (0, _helpers.makeArray)(prependedContent).concat(content);
        }
      });
      (_appendContentCallbacks[key] || []).forEach(c => {
        const appendedContent = c(component, content);
        if (appendedContent) {
          content = content.concat((0, _helpers.makeArray)(appendedContent));
        }
      });
      (_replaceContentCallbacks[key] || []).forEach(c => {
        const replacementContent = c(component, content);
        if (replacementContent) {
          content = (0, _helpers.makeArray)(replacementContent);
        }
      });
    });
    return content;
  }
  function applyOnChangePluginApiCallbacks(value, items, component) {
    (0, _helpers.makeArray)(component.pluginApiIdentifiers).forEach(key => {
      (_onChangeCallbacks[key] || []).forEach(c => c(component, value, items));
    });
  }
  function modifySelectKit(targetedIdentifier) {
    return {
      appendContent: callback => {
        appendContent(targetedIdentifier, callback);
        return modifySelectKit(targetedIdentifier);
      },
      prependContent: callback => {
        prependContent(targetedIdentifier, callback);
        return modifySelectKit(targetedIdentifier);
      },
      onChange: callback => {
        onChange(targetedIdentifier, callback);
        return modifySelectKit(targetedIdentifier);
      },
      replaceContent: callback => {
        replaceContent(targetedIdentifier, callback);
        return modifySelectKit(targetedIdentifier);
      }
    };
  }
  function clearCallbacks() {
    _appendContentCallbacks = {};
    _prependContentCallbacks = {};
    _onChangeCallbacks = {};
    _replaceContentCallbacks = {};
  }
  const EMPTY_ARRAY = Object.freeze([]);
  var _default = _mixin.default.create({
    concatenatedProperties: ["pluginApiIdentifiers"],
    pluginApiIdentifiers: EMPTY_ARRAY
  });
  _exports.default = _default;
});