define("@ember/test/index", ["exports", "require"], function (_exports, _require) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.unregisterWaiter = _exports.unregisterHelper = _exports.registerWaiter = _exports.registerHelper = _exports.registerAsyncHelper = void 0;
  var registerAsyncHelper;
  _exports.registerAsyncHelper = registerAsyncHelper;
  var registerHelper;
  _exports.registerHelper = registerHelper;
  var registerWaiter;
  _exports.registerWaiter = registerWaiter;
  var unregisterHelper;
  _exports.unregisterHelper = unregisterHelper;
  var unregisterWaiter;
  _exports.unregisterWaiter = unregisterWaiter;
  if ((0, _require.has)('ember-testing')) {
    var {
      Test
    } = (0, _require.default)("ember-testing");
    _exports.registerAsyncHelper = registerAsyncHelper = Test.registerAsyncHelper;
    _exports.registerHelper = registerHelper = Test.registerHelper;
    _exports.registerWaiter = registerWaiter = Test.registerWaiter;
    _exports.unregisterHelper = unregisterHelper = Test.unregisterHelper;
    _exports.unregisterWaiter = unregisterWaiter = Test.unregisterWaiter;
  } else {
    var testingNotAvailableMessage = () => {
      throw new Error('Attempted to use test utilities, but `ember-testing` was not included');
    };
    _exports.registerAsyncHelper = registerAsyncHelper = testingNotAvailableMessage;
    _exports.registerHelper = registerHelper = testingNotAvailableMessage;
    _exports.registerWaiter = registerWaiter = testingNotAvailableMessage;
    _exports.unregisterHelper = unregisterHelper = testingNotAvailableMessage;
    _exports.unregisterWaiter = unregisterWaiter = testingNotAvailableMessage;
  }
});