define("discourse/lib/eyeline", ["exports", "@ember/object", "@ember/object/evented", "discourse-common/config/environment"], function (_exports, _object, _evented, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configureEyeline = configureEyeline;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/evented",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  let _skipUpdate;
  let _rootElement;
  function configureEyeline(opts) {
    if (opts) {
      _skipUpdate = opts.skipUpdate;
      _rootElement = opts.rootElement;
    } else {
      _skipUpdate = (0, _environment.isTesting)();
      _rootElement = null;
    }
  }
  configureEyeline();

  // Track visible elements on the screen.
  var _default = _object.default.extend(_evented.default, {
    update() {
      if (_skipUpdate) {
        return;
      }
      const docViewTop = _rootElement ? $(_rootElement).scrollTop() : $(window).scrollTop();
      const windowHeight = _rootElement ? $(_rootElement).height() : $(window).height();
      const docViewBottom = docViewTop + windowHeight;
      const $elements = $(this.selector);
      const bottomOffset = _rootElement ? $elements.last().position() : $elements.last().offset();
      const atBottom = bottomOffset && bottomOffset.top <= docViewBottom && bottomOffset.top >= docViewTop;
      return $elements.each((i, elem) => {
        const $elem = $(elem);
        const elemTop = _rootElement ? $elem.position().top : $elem.offset().top;
        const elemBottom = elemTop + $elem.height();
        let markSeen = false;

        // Make sure the element is visible
        if (!$elem.is(":visible")) {
          return true;
        }

        // It's seen if...
        // ...the element is vertically within the top and bottom
        if (elemTop <= docViewBottom && elemTop >= docViewTop) {
          markSeen = true;
        }

        // ...the element top is above the top and the bottom is below the bottom (large elements)
        if (elemTop <= docViewTop && elemBottom >= docViewBottom) {
          markSeen = true;
        }

        // ...we're at the bottom and the bottom of the element is visible (large bottom elements)
        if (atBottom && elemBottom >= docViewTop) {
          markSeen = true;
        }
        if (!markSeen) {
          return true;
        }

        // If you hit the bottom we mark all the elements as seen. Otherwise, just the first one
        if (!atBottom) {
          return false;
        }
        if (i === $elements.length - 1) {
          return this.trigger("sawBottom", {
            detail: $elem
          });
        }
      });
    }
  });
  _exports.default = _default;
});