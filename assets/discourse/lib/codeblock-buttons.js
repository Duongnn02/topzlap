define("discourse/lib/codeblock-buttons", ["exports", "@ember/runloop", "discourse-common/lib/later", "discourse/lib/mobile", "discourse-common/utils/decorators", "discourse/lib/show-modal", "I18n", "@ember/object/internals", "discourse/lib/utilities", "discourse-common/lib/icon-library"], function (_exports, _runloop, _later, _mobile, _decorators, _showModal, _I18n, _internals, _utilities, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/lib/mobile",0,"discourse-common/utils/decorators",0,"discourse/lib/show-modal",0,"I18n",0,"@ember/object/internals",0,"discourse/lib/utilities",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Use to attach copy/fullscreen buttons to a block of code, either
  // within the post stream or for a regular element that contains
  // a pre > code HTML structure.
  //
  // Usage (post):
  //
  // const cb = new CodeblockButtons({
  //   showFullscreen: true,
  //   showCopy: true,
  // });
  // cb.attachToPost(post, postElement);
  //
  // Usage (generic):
  //
  // const cb = new CodeblockButtons({
  //   showFullscreen: true,
  //   showCopy: true,
  // });
  // cb.attachToGeneric(element);
  //
  // Make sure to run .cleanup() on the instance once you are done to
  // remove click events.
  let CodeblockButtons = (_class = class CodeblockButtons {
    constructor() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._codeblockButtonClickHandlers = {};
      this._fadeCopyCodeblocksRunners = {};
      opts = Object.assign({
        showFullscreen: true,
        showCopy: true
      }, opts);
      this.showFullscreen = opts.showFullscreen;
      this.showCopy = opts.showCopy;
    }
    attachToPost(post, postElement) {
      let codeBlocks = this._getCodeBlocks(postElement);
      if (!codeBlocks.length || !post) {
        return;
      }
      this._createButtons(codeBlocks);
      this._storeClickHandler(post.id, postElement);
      this._addClickEvent(postElement);
    }
    attachToGeneric(element) {
      let codeBlocks = this._getCodeBlocks(element);
      if (!codeBlocks.length) {
        return;
      }
      this._createButtons(codeBlocks);
      const commandId = (0, _internals.guidFor)(element);
      this._storeClickHandler(commandId, element);
      this._addClickEvent(element);
    }
    cleanup() {
      Object.values(this._codeblockButtonClickHandlers || {}).forEach(handler => handler.removeEventListener("click", this._handleClick));
      Object.values(this._fadeCopyCodeblocksRunners || {}).forEach(runner => (0, _runloop.cancel)(runner));
      this._codeblockButtonClickHandlers = {};
      this._fadeCopyCodeblocksRunners = {};
    }
    _storeClickHandler(identifier, element) {
      if (this._codeblockButtonClickHandlers[identifier]) {
        this._codeblockButtonClickHandlers[identifier].removeEventListener("click", this._handleClick);
        delete this._codeblockButtonClickHandlers[identifier];
      }
      this._codeblockButtonClickHandlers[identifier] = element;
    }
    _getCodeBlocks(element) {
      return element.querySelectorAll(":scope > pre > code, :scope :not(article):not(blockquote) > pre > code");
    }
    _createButtons(codeBlocks) {
      codeBlocks.forEach(codeBlock => {
        const wrapperEl = document.createElement("div");
        wrapperEl.classList.add("codeblock-button-wrapper");
        codeBlock.before(wrapperEl);
        if (this.showCopy) {
          const copyButton = document.createElement("button");
          copyButton.classList.add("btn", "nohighlight", "copy-cmd");
          copyButton.ariaLabel = _I18n.default.t("copy_codeblock.copy");
          copyButton.innerHTML = (0, _iconLibrary.iconHTML)("copy");
          wrapperEl.appendChild(copyButton);
          wrapperEl.style.right = `${codeBlock.offsetWidth - codeBlock.clientWidth}px`;
        }
        if (this.showFullscreen && !_mobile.default.isMobileDevice && codeBlock.scrollWidth > codeBlock.clientWidth) {
          const fullscreenButton = document.createElement("button");
          fullscreenButton.classList.add("btn", "nohighlight", "fullscreen-cmd");
          fullscreenButton.ariaLabel = _I18n.default.t("copy_codeblock.fullscreen");
          fullscreenButton.innerHTML = (0, _iconLibrary.iconHTML)("discourse-expand");
          wrapperEl.appendChild(fullscreenButton);
        }
        codeBlock.parentElement.classList.add("codeblock-buttons");
      });
    }
    _addClickEvent(element) {
      element.addEventListener("click", this._handleClick, false);
    }
    _handleClick(event) {
      if (!event.target.classList.contains("copy-cmd") && !event.target.classList.contains("fullscreen-cmd")) {
        return;
      }
      const action = event.target.classList.contains("fullscreen-cmd") ? "fullscreen" : "copy";
      const button = event.target;
      const codeEl = button.parentElement.parentElement.querySelector("code");
      if (codeEl) {
        // replace any weird whitespace characters with a proper '\u20' whitespace
        const text = codeEl.innerText.replace(/[\f\v\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/g, " ").trim();
        if (action === "copy") {
          const result = (0, _utilities.clipboardCopy)(text);
          if (result?.then) {
            result.then(() => {
              this._copyComplete(button);
            });
          } else if (result) {
            this._copyComplete(button);
          }
        } else if (action === "fullscreen") {
          (0, _showModal.default)("fullscreen-code").setProperties({
            code: text,
            codeClasses: codeEl.className
          });
        }
      }
    }
    _copyComplete(button) {
      button.classList.add("action-complete");
      const state = button.innerHTML;
      button.innerHTML = _I18n.default.t("copy_codeblock.copied");
      const commandId = (0, _internals.guidFor)(button);
      if (this._fadeCopyCodeblocksRunners[commandId]) {
        (0, _runloop.cancel)(this._fadeCopyCodeblocksRunners[commandId]);
        delete this._fadeCopyCodeblocksRunners[commandId];
      }
      this._fadeCopyCodeblocksRunners[commandId] = (0, _later.default)(() => {
        button.classList.remove("action-complete");
        button.innerHTML = state;
        delete this._fadeCopyCodeblocksRunners[commandId];
      }, 3000);
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "_handleClick", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_handleClick"), _class.prototype)), _class);
  _exports.default = CodeblockButtons;
});