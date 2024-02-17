define("discourse/lib/show-modal", ["exports", "I18n", "@ember/string", "discourse-common/lib/get-owner"], function (_exports, _I18n, _string, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/string",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _default(name, opts) {
    opts = opts || {};
    let container = (0, _getOwner.getOwner)(this);
    if (container.isDestroying || container.isDestroyed) {
      return;
    }

    // We use the container here because modals are like singletons
    // in Discourse. Only one can be shown with a particular state.
    const route = container.lookup("route:application");
    const modalController = route.controllerFor("modal");
    modalController.set("modalClass", opts.modalClass || `${(0, _string.dasherize)(name).toLowerCase()}-modal`);
    const controllerName = opts.admin ? `modals/${name}` : name;
    modalController.set("name", controllerName);
    let controller = container.lookup("controller:" + controllerName);
    const templateName = opts.templateName || (0, _string.dasherize)(name);
    const renderArgs = {
      into: "modal",
      outlet: "modalBody"
    };
    if (controller) {
      renderArgs.controller = controllerName;
    } else {
      // use a basic controller
      renderArgs.controller = "basic-modal-body";
      controller = container.lookup(`controller:${renderArgs.controller}`);
    }
    if (opts.addModalBodyView) {
      renderArgs.view = "modal-body";
    }
    const modalName = `modal/${templateName}`;
    const fullName = opts.admin ? `admin/templates/${modalName}` : modalName;
    route.render(fullName, renderArgs);
    if (opts.title) {
      modalController.set("title", _I18n.default.t(opts.title));
    } else if (opts.titleTranslated) {
      modalController.set("title", opts.titleTranslated);
    } else {
      modalController.set("title", null);
    }
    if (opts.titleAriaElementId) {
      modalController.set("titleAriaElementId", opts.titleAriaElementId);
    }
    if (opts.panels) {
      modalController.setProperties({
        panels: opts.panels,
        selectedPanel: opts.panels[0]
      });
      if (controller.actions.onSelectPanel) {
        modalController.set("onSelectPanel", controller.actions.onSelectPanel.bind(controller));
      }
      modalController.set("modalClass", `${modalController.get("modalClass")} has-tabs`);
    } else {
      modalController.setProperties({
        panels: [],
        selectedPanel: null
      });
    }
    controller.set("modal", modalController);
    const model = opts.model;
    if (model) {
      controller.set("model", model);
    }
    if (controller.onShow) {
      controller.onShow();
    }
    controller.set("flashMessage", null);
    return controller;
  }
});