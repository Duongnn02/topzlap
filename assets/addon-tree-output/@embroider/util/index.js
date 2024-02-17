define("@embroider/util/index", ["exports", "@ember/debug", "@ember/application", "@embroider/util/ember-private-api", "@ember/component/helper"], function (_exports, _debug, _application, _emberPrivateApi, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.EnsureSafeComponentHelper = void 0;
  _exports.ensureSafeComponent = ensureSafeComponent;
  function ensureSafeComponent(value, thingWithOwner) {
    if (typeof value === 'string') {
      return handleString(value, thingWithOwner);
    } else if ((0, _emberPrivateApi.isCurriedComponentDefinition)(value)) {
      return value;
    } else if (value == null) {
      return value;
    } else {
      return handleClass(value, thingWithOwner);
    }
  }
  class EnsureSafeComponentHelper extends _helper.default {
    compute(_ref) {
      let [value] = _ref;
      return ensureSafeComponent(value, this);
    }
  }
  _exports.EnsureSafeComponentHelper = EnsureSafeComponentHelper;
  function handleString(name, thingWithOwner) {
    (true && !(false) && (0, _debug.deprecate)(`You're trying to invoke the component "${name}" by passing its name as a string. This won't work under Embroider.`, false, {
      id: 'ensure-safe-component.string',
      url: 'https://github.com/embroider-build/embroider/blob/main/REPLACING-COMPONENT-HELPER.md#when-youre-passing-a-component-to-someone-else',
      until: 'embroider',
      for: '@embroider/util',
      since: '0.27.0'
    }));
    let owner = (0, _application.getOwner)(thingWithOwner);
    return (0, _emberPrivateApi.lookupCurriedComponentDefinition)(name, owner);
  }
  function ensureRegistered(klass, owner) {
    let service = owner.lookup('service:-ensure-registered');
    (false && !(service) && (0, _debug.assert)('Could not lookup private -ensure-registered service', service));
    return service.register(klass, owner);
  }
  function handleClass(klass, thingWithOwner) {
    {
      return klass;
    }
  }
});