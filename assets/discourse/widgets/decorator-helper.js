define("discourse/widgets/decorator-helper", ["exports", "discourse/widgets/connector", "discourse/widgets/post-cooked", "discourse/widgets/raw-html", "virtual-dom", "discourse/widgets/render-glimmer"], function (_exports, _connector, _postCooked, _rawHtml, _virtualDom, _renderGlimmer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/connector",0,"discourse/widgets/post-cooked",0,"discourse/widgets/raw-html",0,"virtual-dom",0,"discourse/widgets/render-glimmer"eaimeta@70e063a35619d71f
  class DecoratorHelper {
    constructor(widget, attrs, state) {
      this.widget = widget;
      this.attrs = attrs;
      this.canConnectComponent = true;
      this.state = state;
      this.register = widget.register;
      this.register.deprecateContainer(this);
    }

    /**
     * The `h` helper allows you to build up a virtual dom easily.
     *
     * Example:
     *
     * ```
     * // renders `<div class='some-class'><p>paragraph</p></div>`
     * return helper.h('div.some-class', helper.h('p', 'paragraph'));
     * ```
     * Check out  https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md
     * for more details on how to construct markup with h.
     **/
    // h() is attached via `prototype` below

    /**
     * Attach another widget inside this one.
     *
     * ```
     * return helper.attach('widget-name');
     * ```
     */
    attach(name, attrs, state) {
      attrs = attrs || this.widget.attrs;
      state = state || this.widget.state;
      return this.widget.attach(name, attrs, state);
    }

    /**
     * Returns the model associated with this widget. When decorating
     * posts this will normally be the post.
     *
     * Example:
     *
     * ```
     * const post = helper.getModel();
     * console.log(post.get('id'));
     * ```
     **/
    getModel() {
      return this.widget.findAncestorModel();
    }

    /**
     * If your decorator must produce raw HTML, you can use this helper
     * to display it. It is preferred to use the `h` helper and create
     * the HTML yourself whenever possible.
     *
     * Example:
     *
     * ```
     * return helper.rawHtml(`<p>I will be displayed</p`);
     * ```
     **/
    rawHtml(html) {
      return new _rawHtml.default({
        html
      });
    }

    /**
     * Renders `cooked` content using all the helpers and decorators that
     * are attached to that. This is useful if you want to render a post's
     * content or a different version of it.
     *
     * Example:
     *
     * ```
     * return helper.cooked(`<p>Cook me</p>`);
     * ```
     **/
    cooked(cooked) {
      return new _postCooked.default({
        cooked
      }, this);
    }

    /**
     * You can use this bridge to mount an Ember Component inside the virtual
     * DOM post stream. Note that this is a bit bizarre, as our core app
     * is rendered in Ember, then we switch to a virtual dom, and this
     * allows part of that virtual dom to use Ember again!
     *
     * It really only exists as backwards compatibility for some old
     * plugins that would be difficult to update otherwise. There are
     * performance reasons not to use this, so be careful and avoid
     * using it whenever possible.
     *
     * Example:
     *
     * ```
     * helper.connect({ component: 'my-component-name' });
     * ```
     **/
    connect(details) {
      return new _connector.default(this.widget, details);
    }

    /**
     * Returns an element containing a rendered glimmer template. For full usage instructions,
     * see `widgets/render-glimmer.js`.
     *
     * Example usage:
     *
     * ```
     * import { hbs } from "ember-cli-htmlbars";
     *
     * api.decorateCookedElement((cooked, helper) => {
     *   // Generate a new element with glimmer rendered inside
     *   const glimmerElement = helper.renderGlimmer(
     *     "div.my-wrapper-class",
     *     hbs`<DButton @icon={{@data.param}} @translatedLabel="Hello world from Glimmer Component"/>`,
     *     { param: "user-plus" }
     *   );
     *   cooked.appendChild(glimmerElement);
     *
     *   // Or append to an existing element
     *   helper.renderGlimmer(
     *     cooked.querySelector(".some-container"),
     *     hbs`I will be appended to some-container`
     *   );
     * }, { onlyStream: true, id: "my-id" });
     * ```
     *
     */
    renderGlimmer(renderInto, template, data) {
      if (!this.widget.postContentsDestroyCallbacks) {
        throw "renderGlimmer can only be used in the context of a post";
      }
      const renderGlimmer = new _renderGlimmer.default(this.widget, renderInto, template, data);
      renderGlimmer.init();
      this.widget.postContentsDestroyCallbacks.push(renderGlimmer.destroy.bind(renderGlimmer));
      return renderGlimmer.element;
    }
  }
  DecoratorHelper.prototype.h = _virtualDom.h;
  var _default = DecoratorHelper;
  _exports.default = _default;
});