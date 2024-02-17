define("discourse/components/d-modal-body", ["exports", "@ember/component", "@ember/runloop"], function (_exports, _component, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    classNames: ["modal-body"],
    fixed: false,
    submitOnEnter: true,
    dismissable: true,
    attributeBindings: ["tabindex"],
    tabindex: -1,
    didInsertElement() {
      this._super(...arguments);
      this._modalAlertElement = document.getElementById("modal-alert");
      if (this._modalAlertElement) {
        this._clearFlash();
      }
      let fixedParent = this.element.closest(".d-modal.fixed-modal");
      if (fixedParent) {
        this.set("fixed", true);
        $(fixedParent).modal("show");
      }
      (0, _runloop.scheduleOnce)("afterRender", this, this._afterFirstRender);
      this.appEvents.on("modal-body:flash", this, "_flash");
      this.appEvents.on("modal-body:clearFlash", this, "_clearFlash");
    },
    willDestroyElement() {
      this._super(...arguments);
      this.appEvents.off("modal-body:flash", this, "_flash");
      this.appEvents.off("modal-body:clearFlash", this, "_clearFlash");
      this.appEvents.trigger("modal:body-dismissed");
    },
    _afterFirstRender() {
      const maxHeight = this.maxHeight;
      if (maxHeight) {
        const maxHeightFloat = parseFloat(maxHeight) / 100.0;
        if (maxHeightFloat > 0) {
          const viewPortHeight = $(window).height();
          this.element.style.maxHeight = Math.floor(maxHeightFloat * viewPortHeight) + "px";
        }
      }
      this.appEvents.trigger("modal:body-shown", this.getProperties("title", "rawTitle", "fixed", "subtitle", "rawSubtitle", "submitOnEnter", "dismissable", "headerClass"));
    },
    _clearFlash() {
      if (this._modalAlertElement) {
        this._modalAlertElement.innerHTML = "";
        this._modalAlertElement.classList.remove("alert", "alert-error", "alert-info", "alert-success", "alert-warning");
      }
    },
    _flash(msg) {
      this._clearFlash();
      if (!this._modalAlertElement) {
        return;
      }
      this._modalAlertElement.classList.add("alert", `alert-${msg.messageClass || "success"}`);
      this._modalAlertElement.innerHTML = msg.text || "";
    }
  });
  _exports.default = _default;
});