define("discourse/lib/flag-targets/flag", ["exports", "discourse/lib/ajax-error"], function (_exports, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  class Flag {
    targetsTopic() {
      return false;
    }
    editable() {
      return true;
    }
    create(controller, opts) {
      // an instance of ActionSummary
      let postAction = this.postActionFor(controller);
      controller.appEvents.trigger(this.flagCreatedEvent, controller.model, postAction, opts);
      controller.send("hideModal");
      postAction.act(controller.model, opts).then(() => {
        if (controller.isDestroying || controller.isDestroyed) {
          return;
        }
        if (!opts.skipClose) {
          controller.send("closeModal");
        }
        if (opts.message) {
          controller.set("message", "");
        }
        controller.appEvents.trigger("post-stream:refresh", {
          id: controller.get("model.id")
        });
      }).catch(error => {
        if (!controller.isDestroying && !controller.isDestroyed) {
          controller.send("closeModal");
        }
        (0, _ajaxError.popupAjaxError)(error);
      });
    }
  }
  _exports.default = Flag;
});