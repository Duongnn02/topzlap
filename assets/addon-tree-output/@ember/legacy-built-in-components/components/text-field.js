define("@ember/legacy-built-in-components/components/text-field", ["exports", "@ember/legacy-built-in-components/components/_has-dom", "@ember/object", "@ember/component", "@ember/legacy-built-in-components/mixins/text-support"], function (_exports, _hasDom, _object, _component, _textSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* eslint-disable ember/no-mixins */
  /* eslint-disable ember/no-classic-classes */
  /**
  @module @ember/component
  */

  const inputTypes = _hasDom.default ? Object.create(null) : null;
  function canSetTypeOfInput(type) {
    // if running in outside of a browser always return
    // the original type
    if (!_hasDom.default) {
      return Boolean(type);
    }
    if (type in inputTypes) {
      return inputTypes[type];
    }
    let inputTypeTestElement = document.createElement('input');
    try {
      inputTypeTestElement.type = type;
    } catch (e) {
      // ignored
    }
    return inputTypes[type] = inputTypeTestElement.type === type;
  }

  /**
    The internal class used to create text inputs when the `Input` component is used with `type` of `text`.
  
    See [Ember.Templates.components.Input](/ember/release/classes/Ember.Templates.components/methods/Input?anchor=Input) for usage details.
  
    ## Layout and LayoutName properties
  
    Because HTML `input` elements are self closing `layout` and `layoutName`
    properties will not be applied.
  
    @class TextField
    @extends Component
    @uses Ember.TextSupport
    @public
  */
  const TextField = _component.default.extend(_textSupport.default, {
    /**
      By default, this component will add the `ember-text-field` class to the component's element.
       @property classNames
      @type Array | String
      @default ['ember-text-field']
      @public
     */
    classNames: ['ember-text-field'],
    tagName: 'input',
    /**
      By default this component will forward a number of arguments to attributes on the the
      component's element:
       * accept
      * autocomplete
      * autosave
      * dir
      * formaction
      * formenctype
      * formmethod
      * formnovalidate
      * formtarget
      * height
      * inputmode
      * lang
      * list
      * type
      * max
      * min
      * multiple
      * name
      * pattern
      * size
      * step
      * value
      * width
       When invoked with `{{input type="text"}}`, you can only customize these attributes. When invoked
      with `<Input @type="text" />`, you can just use HTML attributes directly.
       @property attributeBindings
      @type Array | String
      @default ['accept', 'autocomplete', 'autosave', 'dir', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'height', 'inputmode', 'lang', 'list', 'type', 'max', 'min', 'multiple', 'name', 'pattern', 'size', 'step', 'value', 'width']
      @public
    */
    attributeBindings: ['accept', 'autocomplete', 'autosave', 'dir', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'height', 'inputmode', 'lang', 'list', 'type',
    // needs to be before min and max. See #15675
    'max', 'min', 'multiple', 'name', 'pattern', 'size', 'step', 'value', 'width'],
    /**
      As the user inputs text, this property is updated to reflect the `value` property of the HTML
      element.
       @property value
      @type String
      @default ""
      @public
    */
    value: '',
    /**
      The `type` attribute of the input element.
       @property type
      @type String
      @default "text"
      @public
    */
    type: (0, _object.computed)({
      get() {
        return 'text';
      },
      set(_key, value) {
        let type = 'text';
        if (canSetTypeOfInput(value)) {
          type = value;
        }
        return type;
      }
    }),
    /**
      The `size` of the text field in characters.
       @property size
      @type String
      @default null
      @public
    */
    size: null,
    /**
      The `pattern` attribute of input element.
       @property pattern
      @type String
      @default null
      @public
    */
    pattern: null,
    /**
      The `min` attribute of input element used with `type="number"` or `type="range"`.
       @property min
      @type String
      @default null
      @since 1.4.0
      @public
    */
    min: null,
    /**
      The `max` attribute of input element used with `type="number"` or `type="range"`.
       @property max
      @type String
      @default null
      @since 1.4.0
      @public
    */
    max: null
  });
  TextField.toString = () => '@ember/component/text-field';
  var _default = TextField;
  _exports.default = _default;
});