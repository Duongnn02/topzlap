define("discourse/lib/d-popover", ["exports", "tippy.js", "discourse-common/lib/icon-library"], function (_exports, _tippy, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = setup;
  _exports.hideOnEscapePlugin = void 0;
  _exports.hidePopover = hidePopover;
  _exports.isPopoverShown = isPopoverShown;
  _exports.showPopover = showPopover;
  0; //eaimeta@70e063a35619d71f0,"tippy.js",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  const hideOnEscapePlugin = {
    name: "hideOnEscape",
    defaultValue: true,
    fn(_ref) {
      let {
        hide
      } = _ref;
      function onKeyDown(event) {
        if (event.keyCode === 27) {
          hide();
        }
      }
      return {
        onShow() {
          document.addEventListener("keydown", onKeyDown);
        },
        onHide() {
          document.removeEventListener("keydown", onKeyDown);
        }
      };
    }
  };
  _exports.hideOnEscapePlugin = hideOnEscapePlugin;
  function isPopoverShown(event) {
    const instance = event.target._tippy;
    return instance?.state.isShown;
  }

  // legacy, shouldn't be needed with setup
  function hidePopover(event) {
    const instance = event.target._tippy;
    if (instance?.state.isShown) {
      instance.hide();
    }
  }

  // legacy, setup() should be used
  function showPopover(event) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const instance = event.target._tippy ?? setup(event.target, options);
    if (instance.state.isShown) {
      instance.hide();
    } else {
      instance.show();
    }
  }

  // target is the element that triggers the display of the popover
  // options accepts all tippy.js options as defined in their documentation
  // https://atomiks.github.io/tippyjs/v6/all-props/
  function setup(target, options) {
    const tippyOptions = Object.assign({
      arrow: (0, _iconLibrary.iconHTML)("tippy-rounded-arrow"),
      content: options.textContent || options.htmlContent,
      allowHTML: options?.htmlContent?.length,
      trigger: "mouseenter click",
      hideOnClick: true,
      zIndex: 1400,
      plugins: [hideOnEscapePlugin],
      touch: ["hold", 500]
    }, options);

    // legacy support delete tippyOptions.textContent;
    delete tippyOptions.htmlContent;
    return (0, _tippy.default)(target, tippyOptions);
  }
});