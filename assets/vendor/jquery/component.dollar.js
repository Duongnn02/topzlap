(function () {
  // importing these, specifically, is done so that we don't trigger the
  // ember-global deprecation
  //
  // We had tried to import at the top of this file, but there is a build time transform
  // removing those, and re-triggering the ember-global deprecation.
  // See: https://deprecations.emberjs.com/v3.x#toc_ember-global
  // for more information
  const EmberObject = require("@ember/object").default;
  const Component = require("@ember/component").default;

  /*
   * This non-standard use of `reopen` and `call` allows the component
   * base class to be reopened without triggering the
   * ember.component.reopen deprecation in Ember itself.
   */
  EmberObject.reopen.call(Component, {
    $(sel) {
      (false && !(this.tagName !== '') && Ember.assert("You cannot access this.$() on a component with `tagName: ''` specified.", this.tagName !== ''));
      (true && !(false) && Ember.deprecate('Using this.$() in a component has been deprecated, consider using this.element', false, {
        id: 'ember-views.curly-components.jquery-element',
        since: '3.4.0',
        until: '4.0.0',
        url: 'https://emberjs.com/deprecations/v3.x#toc_jquery-apis',
        for: 'ember-source'
      }));
      if (this.element) {
        // same technique the shim uses
        let jQuery = self['jQuery'];
        return sel ? jQuery(sel, this.element) : jQuery(this.element);
      }
    }
  });
})();