define("discourse/components/d-modal", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@ember/runloop", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _runloop, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"@ember/runloop",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="modal-outer-container">
    <div class="modal-middle-container">
      <div class="modal-inner-container">
        <PluginOutlet @name="above-modal-header" @connectorTagName="div" />
        <div class="modal-header {{this.headerClass}}">
          {{#if this.dismissable}}
            <DButton
              @icon="times"
              @action={{route-action "closeModal" "initiatedByCloseButton"}}
              @class="btn-flat modal-close close"
              @title="modal.close"
            />
          {{/if}}
  
          {{#if this.title}}
            <div class="title">
              <h3 id="discourse-modal-title">{{this.title}}</h3>
  
              {{#if this.subtitle}}
                <p class="subtitle">{{this.subtitle}}</p>
              {{/if}}
            </div>
          {{/if}}
  
          {{#if this.panels}}
            <ul class="modal-tabs">
              {{#each this.panels as |panel|}}
                <ModalTab
                  @panel={{panel}}
                  @panelsLength={{this.panels.length}}
                  @selectedPanel={{this.selectedPanel}}
                  @onSelectPanel={{this.onSelectPanel}}
                />
              {{/each}}
            </ul>
          {{/if}}
        </div>
  
        <div id="modal-alert" role="alert"></div>
  
        {{yield}}
  
        {{#each this.errors as |error|}}
          <div class="alert alert-error">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label={{i18n "modal.dismiss_error"}}
            >×</button>
            {{error}}
          </div>
        {{/each}}
      </div>
    </div>
  </div>
  */
  {
    "id": "Tdshlzbd",
    "block": "[[[10,0],[14,0,\"modal-outer-container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"modal-middle-container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"modal-inner-container\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\"],[\"above-modal-header\",\"div\"]],null],[1,\"\\n      \"],[10,0],[15,0,[29,[\"modal-header \",[30,0,[\"headerClass\"]]]]],[12],[1,\"\\n\"],[41,[30,0,[\"dismissable\"]],[[[1,\"          \"],[8,[39,2],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"times\",[28,[37,3],[\"closeModal\",\"initiatedByCloseButton\"],null],\"btn-flat modal-close close\",\"modal.close\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"title\"]],[[[1,\"          \"],[10,0],[14,0,\"title\"],[12],[1,\"\\n            \"],[10,\"h3\"],[14,1,\"discourse-modal-title\"],[12],[1,[30,0,[\"title\"]]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"subtitle\"]],[[[1,\"              \"],[10,2],[14,0,\"subtitle\"],[12],[1,[30,0,[\"subtitle\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"panels\"]],[[[1,\"          \"],[10,\"ul\"],[14,0,\"modal-tabs\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"panels\"]]],null]],null],null,[[[1,\"              \"],[8,[39,6],null,[[\"@panel\",\"@panelsLength\",\"@selectedPanel\",\"@onSelectPanel\"],[[30,1],[30,0,[\"panels\",\"length\"]],[30,0,[\"selectedPanel\"]],[30,0,[\"onSelectPanel\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,1,\"modal-alert\"],[14,\"role\",\"alert\"],[12],[13],[1,\"\\n\\n      \"],[18,3,null],[1,\"\\n\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"errors\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n          \"],[10,\"button\"],[14,0,\"close\"],[14,\"data-dismiss\",\"alert\"],[15,\"aria-label\",[28,[37,8],[\"modal.dismiss_error\"],null]],[14,4,\"button\"],[12],[1,\"×\"],[13],[1,\"\\n          \"],[1,[30,2]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[2]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"panel\",\"error\",\"&default\"],false,[\"plugin-outlet\",\"if\",\"d-button\",\"route-action\",\"each\",\"-track-array\",\"modal-tab\",\"yield\",\"i18n\"]]",
    "moduleName": "discourse/components/d-modal.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("title", "titleAriaElementId"), (_obj = {
    classNameBindings: [":modal", ":d-modal", "modalClass", "modalStyle", "hasPanels"],
    attributeBindings: ["data-keyboard", "aria-modal", "role", "ariaLabelledby:aria-labelledby"],
    submitOnEnter: true,
    dismissable: true,
    title: null,
    titleAriaElementId: null,
    subtitle: null,
    role: "dialog",
    headerClass: null,
    // We handle ESC ourselves
    "data-keyboard": "false",
    // Inform screen readers of the modal
    "aria-modal": "true",
    init() {
      this._super(...arguments);

      // If we need to render a second modal for any reason, we can't
      // use `elementId`
      if (this.modalStyle !== "inline-modal") {
        this.set("elementId", "discourse-modal");
        this.set("modalStyle", "fixed-modal");
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("modal:body-shown", this, "_modalBodyShown");
      document.documentElement.addEventListener("keydown", this._handleModalEvents);
    },
    willDestroyElement() {
      this._super(...arguments);
      this.appEvents.off("modal:body-shown", this, "_modalBodyShown");
      document.documentElement.removeEventListener("keydown", this._handleModalEvents);
    },
    ariaLabelledby(title, titleAriaElementId) {
      if (titleAriaElementId) {
        return titleAriaElementId;
      }
      if (title) {
        return "discourse-modal-title";
      }
      return;
    },
    triggerClickOnEnter(e) {
      if (!this.submitOnEnter) {
        return false;
      }

      // skip when in a form or a textarea element
      if (e.target.closest("form") || document.activeElement && document.activeElement.nodeName === "TEXTAREA") {
        return false;
      }
      return true;
    },
    mouseDown(e) {
      if (!this.dismissable) {
        return;
      }
      if (e.target.classList.contains("modal-middle-container") || e.target.classList.contains("modal-outer-container")) {
        // Send modal close (which bubbles to ApplicationRoute) if clicked outside.
        // We do this because some CSS of ours seems to cover the backdrop and makes
        // it unclickable.
        return this.attrs.closeModal?.("initiatedByClickOut");
      }
    },
    _modalBodyShown(data) {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      if (data.fixed) {
        this.element.classList.remove("hidden");
      }
      if (data.title) {
        this.set("title", _I18n.default.t(data.title));
      } else if (data.rawTitle) {
        this.set("title", data.rawTitle);
      }
      if (data.subtitle) {
        this.set("subtitle", _I18n.default.t(data.subtitle));
      } else if (data.rawSubtitle) {
        this.set("subtitle", data.rawSubtitle);
      } else {
        // if no subtitle provided, makes sure the previous subtitle
        // of another modal is not used
        this.set("subtitle", null);
      }
      if ("submitOnEnter" in data) {
        this.set("submitOnEnter", data.submitOnEnter);
      }
      if ("dismissable" in data) {
        this.set("dismissable", data.dismissable);
      } else {
        this.set("dismissable", true);
      }
      this.set("headerClass", data.headerClass || null);
      (0, _runloop.schedule)("afterRender", () => {
        this._trapTab();
      });
    },
    _handleModalEvents(event) {
      if (this.element.classList.contains("hidden")) {
        return;
      }
      if (event.key === "Escape" && this.dismissable) {
        (0, _runloop.next)(() => this.attrs.closeModal("initiatedByESC"));
      }
      if (event.key === "Enter" && this.triggerClickOnEnter(event)) {
        this.element.querySelector(".modal-footer .btn-primary")?.click();
        event.preventDefault();
      }
      if (event.key === "Tab") {
        this._trapTab(event);
      }
    },
    _trapTab(event) {
      if (this.element.classList.contains("hidden")) {
        return true;
      }
      const innerContainer = this.element.querySelector(".modal-inner-container");
      if (!innerContainer) {
        return;
      }
      let focusableElements = '[autofocus], a, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';
      if (!event) {
        // on first trap we don't allow to focus modal-close
        // and apply manual focus only if we don't have any autofocus element
        const autofocusedElement = innerContainer.querySelector("[autofocus]");
        if (!autofocusedElement || document.activeElement !== autofocusedElement) {
          // if there's not autofocus, or the activeElement, is not the autofocusable element
          // attempt to focus the first of the focusable elements or just the modal-body
          // to make it possible to scroll with arrow down/up
          (innerContainer.querySelector(focusableElements + ", button:not(.modal-close)") || innerContainer.querySelector(".modal-body"))?.focus();
        }
        return;
      }
      focusableElements += ", button:enabled";
      const firstFocusableElement = innerContainer.querySelector(focusableElements);
      const focusableContent = innerContainer.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          (innerContainer.querySelector(".modal-close") || firstFocusableElement)?.focus();
          event.preventDefault();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "ariaLabelledby", [_dec], Object.getOwnPropertyDescriptor(_obj, "ariaLabelledby"), _obj), _applyDecoratedDescriptor(_obj, "_handleModalEvents", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleModalEvents"), _obj)), _obj))));
  _exports.default = _default;
});