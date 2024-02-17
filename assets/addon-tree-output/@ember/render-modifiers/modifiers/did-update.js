define("@ember/render-modifiers/modifiers/did-update", ["exports", "@embroider/macros/es-compat", "@ember/modifier"], function (_exports, _esCompat, _modifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const untrack = function () {
    {
      // ember-source@3.27 shipped "real modules" by default, so we can just use
      // importSync to get @glimmer/validator directly
      return (0, _esCompat.default)(require("@glimmer/validator")).untrack;
    }
  }();

  /**
    The `{{did-update}}` element modifier is activated when any of its arguments
    are updated. It does not run on initial render.
  
    In this example, the `resize` function receives the `textarea` DOM element as its
    first argument and is executed anytime the `@text` argument changes.
  
    ```handlebars
    <textarea {{did-update this.resize @text}} readonly style="padding: 0px;">
      {{@text}}
    </textarea>
    ```
  
    ```js
    export default Component.extend({
      resize(element) {
        element.style.height = `${element.scrollHeight}px`;
      }
    });
    ```
  
    In addition to the `element`, both named and positional arguments are passed to the
    executed function:
  
    ```handlebars
    <div {{did-update this.logArguments @first @second third=@third}} />
    ```
  
    ```js
    export default Component.extend({
      logArguments(element, [first, second], { third }) {
        console.log('element', element);
        console.log('positional args', first, second);
        console.log('names args', third);
      }
    });
    ```
  
    By default, the executed function will be unbound. If you would like to access
    the component context in your function, use the `action` decorator as follows:
  
    ```handlebars
    <div {{did-update this.someFunction @someArg} />
    ```
  
    ```js
    export default Component.extend({
      someFunction: action(function(element, [someArg]) {
        // the `this` context will be the component instance
      })
    });
    ```
  
    @method did-update
    @public
  */
  var _default = (0, _modifier.setModifierManager)(() => ({
    capabilities: (0, _modifier.capabilities)('3.22', {
      disableAutoTracking: false
    }),
    createModifier() {
      return {
        element: null
      };
    },
    installModifier(state, element, args) {
      // save element into state bucket
      state.element = element;
      {
        // Consume individual properties to entangle tracking.
        // https://github.com/emberjs/ember.js/issues/19277
        // https://github.com/ember-modifier/ember-modifier/pull/63#issuecomment-815908201
        args.positional.forEach(() => {});
        args.named && Object.values(args.named);
      }
    },
    updateModifier(_ref, args) {
      let {
        element
      } = _ref;
      let [fn, ...positional] = args.positional;
      {
        // Consume individual properties to entangle tracking.
        // https://github.com/emberjs/ember.js/issues/19277
        // https://github.com/ember-modifier/ember-modifier/pull/63#issuecomment-815908201
        args.positional.forEach(() => {});
        args.named && Object.values(args.named);
        untrack(() => {
          fn(element, positional, args.named);
        });
      }
    },
    destroyModifier() {}
  }), class DidUpdateModifier {});
  _exports.default = _default;
});