define("@ember/render-modifiers/modifiers/will-destroy", ["exports", "@ember/modifier"], function (_exports, _modifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /**
    The `{{will-destroy}}` element modifier is activated immediately before the element
    is removed from the DOM.
  
    ```handlebars
    <div {{will-destroy this.teardownPlugin}}>
      {{yield}}
    </div>
    ```
  
    ```js
    export default Component.extend({
      teardownPlugin(element) {
        // teardown logic here
      }
    });
    ```
  
    By default, the executed function will be unbound. If you would like to access
    the component context in your function, use the `action` decorator as follows:
  
    ```handlebars
    <div {{will-destroy this.teardownPlugin}}>
      {{yield}}
    </div>
    ```
  
    ```js
    export default Component.extend({
      teardownPlugin: action(function(element) {
        // the `this` context will be the component instance
      })
    });
    ```
  
    @method will-destroy
    @public
  */
  var _default = (0, _modifier.setModifierManager)(() => ({
    capabilities: (0, _modifier.capabilities)('3.22', {
      disableAutoTracking: true
    }),
    createModifier() {
      return {
        element: null
      };
    },
    installModifier(state, element) {
      state.element = element;
    },
    updateModifier() {},
    destroyModifier(_ref, args) {
      let {
        element
      } = _ref;
      let [fn, ...positional] = args.positional;
      fn(element, positional, args.named);
    }
  }), class WillDestroyModifier {});
  _exports.default = _default;
});