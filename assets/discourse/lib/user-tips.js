define("discourse/lib/user-tips", ["exports", "discourse-common/lib/icon-library", "I18n", "pretty-text/sanitizer", "tippy.js"], function (_exports, _iconLibrary, _I18n, _sanitizer, _tippy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hideAllUserTips = hideAllUserTips;
  _exports.hideUserTip = hideUserTip;
  _exports.showNextUserTip = showNextUserTip;
  _exports.showUserTip = showUserTip;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"I18n",0,"pretty-text/sanitizer",0,"tippy.js"eaimeta@70e063a35619d71f
  const instances = {};
  const queue = [];
  function showUserTip(options) {
    hideUserTip(options.id);
    if (!options.reference) {
      return;
    }
    if (Object.keys(instances).length > 0) {
      return addToQueue(options);
    }
    instances[options.id] = (0, _tippy.default)(options.reference, {
      // Tippy must be displayed as soon as possible and not be hidden unless
      // the user clicks on one of the two buttons.
      showOnCreate: true,
      hideOnClick: false,
      trigger: "manual",
      theme: "user-tips",
      zIndex: "",
      // It must be interactive to make buttons work.
      interactive: true,
      arrow: (0, _iconLibrary.iconHTML)("tippy-rounded-arrow"),
      placement: options.placement,
      appendTo: options.appendTo,
      // It often happens for the reference element to be rerendered. In this
      // case, tippy must be rerendered too. Having an animation means that the
      // animation will replay over and over again.
      animation: false,
      // The `content` property below is HTML.
      allowHTML: true,
      content: `
      <div class='user-tip-container'>
        <div class='user-tip-title'>${(0, _sanitizer.escape)(options.titleText)}</div>
        <div class='user-tip-content'>${(0, _sanitizer.escape)(options.contentText)}</div>
        <div class='user-tip-buttons'>
          <button class="btn btn-primary btn-dismiss">${(0, _sanitizer.escape)(options.primaryBtnText || _I18n.default.t("user_tips.primary"))}</button>
          <button class="btn btn-flat btn-text btn-dismiss-all">${(0, _sanitizer.escape)(options.secondaryBtnText || _I18n.default.t("user_tips.secondary"))}</button>
        </div>
      </div>`,
      onCreate(instance) {
        instance.popper.classList.add("user-tip");
        instance.popper.querySelector(".btn-dismiss").addEventListener("click", event => {
          options.onDismiss();
          event.preventDefault();
        });
        instance.popper.querySelector(".btn-dismiss-all").addEventListener("click", event => {
          options.onDismissAll();
          event.preventDefault();
        });
      }
    });
  }
  function hideUserTip(userTipId) {
    const instance = instances[userTipId];
    if (instance && !instance.state.isDestroyed) {
      instance.destroy();
    }
    delete instances[userTipId];
    const index = queue.findIndex(userTip => userTip.id === userTipId);
    if (index > -1) {
      queue.splice(index, 1);
    }
  }
  function hideAllUserTips() {
    Object.keys(instances).forEach(hideUserTip);
  }
  function addToQueue(options) {
    for (let i = 0; i < queue.size; ++i) {
      if (queue[i].id === options.id) {
        queue[i] = options;
        return;
      }
    }
    queue.push(options);
  }
  function showNextUserTip() {
    const options = queue.shift();
    if (options) {
      showUserTip(options);
    }
  }
});