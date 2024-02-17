define("@ember/component/text-area", ["exports", "@ember/debug", "@ember/-internals/glimmer"], function (_exports, _debug, _glimmer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _glimmer.TextArea;
    }
  });
  if (true
  /* EMBER_MODERNIZED_BUILT_IN_COMPONENTS */) {
    (true && !(false) && (0, _debug.deprecate)(`Using Ember.TextArea or importing from 'TextArea' has been deprecated, install the ` + `\`@ember/legacy-built-in-components\` addon and use \`import { TextArea } from ` + `'@ember/legacy-built-in-components';\` instead`, false, {
      id: 'ember.built-in-components.import',
      until: '4.0.0',
      for: 'ember-source',
      since: {
        enabled: '3.27.0'
      },
      url: 'https://deprecations.emberjs.com/v3.x#toc_ember-built-in-components-import'
    }));
  }
});