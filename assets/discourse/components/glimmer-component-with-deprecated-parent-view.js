define("discourse/components/glimmer-component-with-deprecated-parent-view", ["exports", "@glimmer/component", "@glimmer/manager", "@glimmer/component/-private/ember-component-manager", "@glimmer/reference"], function (_exports, _component, _manager, _emberComponentManager, _reference) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component",0,"@glimmer/manager",0,"@glimmer/component/-private/ember-component-manager",0,"@glimmer/reference"eaimeta@70e063a35619d71f
  class GlimmerComponentWithParentViewManager extends _manager.CustomComponentManager {
    create(owner, componentClass, args, environment, dynamicScope, callerSelfRef) {
      const result = super.create(...arguments);
      result.component.parentView = dynamicScope.view;
      dynamicScope.view = result.component;
      result.component._target = (0, _reference.valueForRef)(callerSelfRef);
      return result;
    }
    getCapabilities() {
      return {
        ...super.getCapabilities(),
        createCaller: true
      };
    }
  }

  /**
   * This component has a lightly-extended version of Ember's default Glimmer component manager.
   * It gives Glimmer components the ability to reference their parent view which can be useful
   * when building backwards-compatible versions of components. Any use of the parentView property
   * of the component should be considered deprecated.
   */
  class GlimmerComponentWithDeprecatedParentView extends _component.default {}
  _exports.default = GlimmerComponentWithDeprecatedParentView;
  (0, _manager.setInternalComponentManager)(new GlimmerComponentWithParentViewManager(owner => new _emberComponentManager.default(owner)), GlimmerComponentWithDeprecatedParentView);
});