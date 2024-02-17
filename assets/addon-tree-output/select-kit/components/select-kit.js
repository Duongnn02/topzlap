define("select-kit/components/select-kit", ["exports", "discourse-common/config/environment", "@ember/object", "select-kit/mixins/plugin-api", "@ember/runloop", "@ember/utils", "@ember/component", "I18n", "@ember/object/mixin", "rsvp", "select-kit/mixins/utils", "@popperjs/core", "discourse-common/lib/deprecated", "discourse-common/lib/debounce", "@ember/object/internals", "discourse-common/lib/helpers"], function (_exports, _environment, _object, _pluginApi, _runloop, _utils, _component, _I18n, _mixin, _rsvp, _utils2, _core, _deprecated, _debounce, _internals, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.MAIN_COLLECTION = _exports.ERRORS_COLLECTION = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/config/environment",0,"@ember/object",0,"select-kit/mixins/plugin-api",0,"@ember/runloop",0,"@ember/utils",0,"@ember/component",0,"I18n",0,"@ember/object/mixin",0,"rsvp",0,"select-kit/mixins/utils",0,"@popperjs/core",0,"discourse-common/lib/deprecated",0,"discourse-common/lib/debounce",0,"@ember/object/internals",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  const MAIN_COLLECTION = "MAIN_COLLECTION";
  _exports.MAIN_COLLECTION = MAIN_COLLECTION;
  const ERRORS_COLLECTION = "ERRORS_COLLECTION";
  _exports.ERRORS_COLLECTION = ERRORS_COLLECTION;
  const EMPTY_OBJECT = Object.freeze({});
  const SELECT_KIT_OPTIONS = _mixin.default.create({
    concatenatedProperties: ["selectKitOptions"],
    selectKitOptions: EMPTY_OBJECT
  });
  function isDocumentRTL() {
    return document.documentElement.classList.contains("rtl");
  }
  var _default = _component.default.extend(SELECT_KIT_OPTIONS, _pluginApi.default, _utils2.default, {
    tagName: "details",
    pluginApiIdentifiers: ["select-kit"],
    classNames: ["select-kit"],
    classNameBindings: ["selectKit.isLoading:is-loading", "selectKit.isExpanded:is-expanded", "selectKit.options.disabled:is-disabled", "selectKit.isHidden:is-hidden", "selectKit.hasSelection:has-selection"],
    tabindex: 0,
    content: null,
    value: null,
    selectKit: null,
    mainCollection: null,
    errorsCollection: null,
    options: null,
    valueProperty: "id",
    nameProperty: "name",
    singleSelect: false,
    multiSelect: false,
    labelProperty: null,
    titleProperty: null,
    langProperty: null,
    init() {
      this._super(...arguments);
      this._searchPromise = null;
      this.set("errorsCollection", []);
      this._collections = [ERRORS_COLLECTION, MAIN_COLLECTION];
      !this.options && this.set("options", _object.default.create({}));
      this.handleDeprecations();
      this.set("selectKit", _object.default.create({
        uniqueID: this.attrs?.id?.value || this.attrs?.id || (0, _internals.guidFor)(this),
        valueProperty: this.valueProperty,
        nameProperty: this.nameProperty,
        labelProperty: this.labelProperty,
        titleProperty: this.titleProperty,
        langProperty: this.langProperty,
        options: _object.default.create(),
        isLoading: false,
        isHidden: false,
        isExpanded: false,
        isFilterExpanded: false,
        enterDisabled: false,
        hasSelection: false,
        hasNoContent: true,
        highlighted: null,
        noneItem: null,
        newItem: null,
        filter: null,
        modifyContent: (0, _runloop.bind)(this, this._modifyContentWrapper),
        modifySelection: (0, _runloop.bind)(this, this._modifySelectionWrapper),
        modifyComponentForRow: (0, _runloop.bind)(this, this._modifyComponentForRowWrapper),
        modifyContentForCollection: (0, _runloop.bind)(this, this._modifyContentForCollectionWrapper),
        modifyComponentForCollection: (0, _runloop.bind)(this, this._modifyComponentForCollectionWrapper),
        toggle: (0, _runloop.bind)(this, this._toggle),
        close: (0, _runloop.bind)(this, this._close),
        open: (0, _runloop.bind)(this, this._open),
        highlightNext: (0, _runloop.bind)(this, this._highlightNext),
        highlightPrevious: (0, _runloop.bind)(this, this._highlightPrevious),
        highlightLast: (0, _runloop.bind)(this, this._highlightLast),
        highlightFirst: (0, _runloop.bind)(this, this._highlightFirst),
        change: (0, _runloop.bind)(this, this._onChangeWrapper),
        select: (0, _runloop.bind)(this, this.select),
        deselect: (0, _runloop.bind)(this, this.deselect),
        deselectByValue: (0, _runloop.bind)(this, this.deselectByValue),
        append: (0, _runloop.bind)(this, this.append),
        cancelSearch: (0, _runloop.bind)(this, this._cancelSearch),
        triggerSearch: (0, _runloop.bind)(this, this.triggerSearch),
        focusFilter: (0, _runloop.bind)(this, this._focusFilter),
        onOpen: (0, _runloop.bind)(this, this._onOpenWrapper),
        onClose: (0, _runloop.bind)(this, this._onCloseWrapper),
        onInput: (0, _runloop.bind)(this, this._onInput),
        onClearSelection: (0, _runloop.bind)(this, this._onClearSelection),
        onHover: (0, _runloop.bind)(this, this._onHover),
        onKeydown: (0, _runloop.bind)(this, this._onKeydownWrapper),
        mainElement: (0, _runloop.bind)(this, this._mainElement),
        headerElement: (0, _runloop.bind)(this, this._headerElement),
        bodyElement: (0, _runloop.bind)(this, this._bodyElement)
      }));
    },
    _modifyComponentForRowWrapper(collection, item) {
      let component = this.modifyComponentForRow(collection, item);
      return component || "select-kit/select-kit-row";
    },
    modifyComponentForRow() {},
    _modifyContentForCollectionWrapper(identifier) {
      let collection = this.modifyContentForCollection(identifier);
      if (!collection) {
        switch (identifier) {
          case ERRORS_COLLECTION:
            collection = this.errorsCollection;
            break;
          default:
            collection = this.mainCollection;
            break;
        }
      }
      return collection;
    },
    modifyContentForCollection() {},
    _modifyComponentForCollectionWrapper(identifier) {
      let component = this.modifyComponentForCollection(identifier);
      if (!component) {
        switch (identifier) {
          case ERRORS_COLLECTION:
            component = "select-kit/errors-collection";
            break;
          default:
            component = "select-kit/select-kit-collection";
            break;
        }
      }
      return component;
    },
    modifyComponentForCollection() {},
    didUpdateAttrs() {
      this._super(...arguments);
      this.handleDeprecations();
    },
    didInsertElement() {
      this._super(...arguments);
      if (this.selectKit.options.expandedOnInsert) {
        this._open();
      }
    },
    click(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    willDestroyElement() {
      this._super(...arguments);
      this._cancelSearch();
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      const deprecatedOptions = this._resolveDeprecatedOptions();
      const mergedOptions = Object.assign({}, ...this.selectKitOptions);
      Object.keys(mergedOptions).forEach(key => {
        if ((0, _utils.isPresent)(this.options[key])) {
          this.selectKit.options.set(key, this.options[key]);
          return;
        }
        if ((0, _utils.isPresent)(deprecatedOptions[`options.${key}`])) {
          this.selectKit.options.set(key, deprecatedOptions[`options.${key}`]);
          return;
        }
        const value = mergedOptions[key];
        if (key === "componentForRow" || key === "contentForCollection" || key === "componentForCollection") {
          if (typeof value === "string") {
            this.selectKit.options.set(key, () => value);
          } else {
            this.selectKit.options.set(key, (0, _runloop.bind)(this, value));
          }
          return;
        }
        if (typeof value === "string" && !value.includes(".") && value in this) {
          const computedValue = (0, _object.get)(this, value);
          if (typeof computedValue !== "function") {
            this.selectKit.options.set(key, computedValue);
            return;
          }
        }
        this.selectKit.options.set(key, value);
      });
      this.selectKit.setProperties({
        hasSelection: !(0, _utils.isEmpty)(this.value),
        noneItem: this._modifyNoSelectionWrapper(),
        newItem: null
      });
      if (this.selectKit.isExpanded) {
        this.triggerSearch();
      }
      if (this.computeContent) {
        this._deprecated(`The \`computeContent()\` function is deprecated pass a \`content\` attribute or define a \`content\` computed property in your component.`);
        this.set("content", this.computeContent());
      }
    },
    selectKitOptions: {
      allowAny: false,
      showFullTitle: true,
      none: null,
      translatedNone: null,
      filterable: false,
      autoFilterable: "autoFilterable",
      filterIcon: "search",
      filterPlaceholder: null,
      translatedFilterPlaceholder: null,
      icon: null,
      icons: null,
      maximum: null,
      maximumLabel: null,
      minimum: null,
      autoInsertNoneItem: true,
      closeOnChange: true,
      limitMatches: null,
      placement: isDocumentRTL() ? "bottom-end" : "bottom-start",
      verticalOffset: 3,
      filterComponent: "select-kit/select-kit-filter",
      selectedNameComponent: "selected-name",
      selectedChoiceComponent: "selected-choice",
      castInteger: false,
      focusAfterOnChange: true,
      triggerOnChangeOnTab: true,
      autofocus: false,
      placementStrategy: null,
      mobilePlacementStrategy: null,
      desktopPlacementStrategy: null,
      hiddenValues: null,
      disabled: false,
      expandedOnInsert: false
    },
    autoFilterable: (0, _object.computed)("content.[]", "selectKit.filter", function () {
      return this.selectKit.filter && this.options.autoFilterable && this.content.length > 15;
    }),
    collections: (0, _object.computed)("selectedContent.[]", "mainCollection.[]", "errorsCollection.[]", function () {
      return this._collections.map(identifier => {
        return {
          identifier,
          content: this.selectKit.modifyContentForCollection(identifier)
        };
      });
    }),
    createContentFromInput(input) {
      return input;
    },
    validateCreate(filter, content) {
      this.clearErrors();
      return filter.length > 0 && content && !content.map(c => this.getValue(c)).includes(filter) && !(0, _helpers.makeArray)(this.value).includes(filter);
    },
    validateSelect() {
      this.clearErrors();
      const selection = (0, _helpers.makeArray)(this.value);
      const maximum = this.selectKit.options.maximum;
      if (maximum && selection.length >= maximum) {
        const key = this.selectKit.options.maximumLabel || "select_kit.max_content_reached";
        this.addError(_I18n.default.t(key, {
          count: maximum
        }));
        return false;
      }
      return true;
    },
    addError(error) {
      this.errorsCollection.pushObject(error);
      this._safeAfterRender(() => this.popper && this.popper.update());
    },
    clearErrors() {
      if (!this.element || this.isDestroyed || this.isDestroying) {
        return;
      }
      this.set("errorsCollection", []);
    },
    prependCollection(identifier) {
      this._collections.unshift(identifier);
    },
    appendCollection(identifier) {
      this._collections.push(identifier);
    },
    insertCollectionAtIndex(identifier, index) {
      this._collections.insertAt(index, identifier);
    },
    insertBeforeCollection(identifier, insertedIdentifier) {
      const index = this._collections.indexOf(identifier);
      this.insertCollectionAtIndex(insertedIdentifier, index - 1);
    },
    insertAfterCollection(identifier, insertedIdentifier) {
      const index = this._collections.indexOf(identifier);
      this.insertCollectionAtIndex(insertedIdentifier, index + 1);
    },
    _onInput(event) {
      this.popper && this.popper.update();
      if (this._searchPromise) {
        (0, _runloop.cancel)(this._searchPromise);
      }
      this.selectKit.set("isLoading", true);
      (0, _debounce.default)(this, this._debouncedInput, event.target.value, _environment.INPUT_DELAY);
    },
    _debouncedInput(filter) {
      this.selectKit.set("filter", filter);
      this.triggerSearch(filter);
    },
    _onChangeWrapper(value, items) {
      this.selectKit.set("filter", null);
      return new _rsvp.Promise(resolve => {
        if (!this.selectKit.valueProperty && this.selectKit.noneItem === value) {
          value = null;
          items = [];
        }
        value = (0, _helpers.makeArray)(value);
        items = (0, _helpers.makeArray)(items);
        if (this.multiSelect) {
          items = items.filter(i => i !== this.newItem && i !== this.noneItem && this.getValue(i) !== null);
          if (this.selectKit.options.maximum === 1) {
            value = value.slice(0, 1);
            items = items.slice(0, 1);
          }
        }
        if (this.singleSelect) {
          value = (0, _utils.isPresent)(value.firstObject) ? value.firstObject : null;
          items = (0, _utils.isPresent)(items.firstObject) ? items.firstObject : null;
        }
        this._boundaryActionHandler("onChange", value, items);
        (0, _pluginApi.applyOnChangePluginApiCallbacks)(value, items, this);
        resolve(items);
      }).finally(() => {
        if (!this.isDestroying && !this.isDestroyed) {
          if (this.selectKit.options.closeOnChange || (0, _utils.isPresent)(value) && this.selectKit.options.maximum === 1) {
            this.selectKit.close(event);
          }
          if (this.selectKit.options.focusAfterOnChange) {
            this._safeAfterRender(() => {
              this._focusFilter();
              this.popper && this.popper.update();
            });
          }
        }
      });
    },
    _modifyContentWrapper(content) {
      content = this.modifyContent(content);
      return (0, _pluginApi.applyContentPluginApiCallbacks)(content, this);
    },
    modifyContent(content) {
      return content;
    },
    _modifyNoSelectionWrapper() {
      return this.modifyNoSelection();
    },
    modifyNoSelection() {
      if (this.selectKit.options.translatedNone) {
        return this.defaultItem(null, this.selectKit.options.translatedNone);
      }
      let none = this.selectKit.options.none;
      if ((0, _utils.isNone)(none) && !this.selectKit.options.allowAny) {
        return null;
      }
      if ((0, _utils.isNone)(none) && this.selectKit.options.allowAny && !this.selectKit.isExpanded) {
        return null;
      }
      let item;
      switch (typeof none) {
        case "string":
          item = this.defaultItem(null, _I18n.default.t(none));
          break;
        default:
          item = none;
      }
      return item;
    },
    _modifySelectionWrapper(item) {
      return this.modifySelection(item);
    },
    modifySelection(item) {
      return item;
    },
    _onKeydownWrapper(event) {
      return this._boundaryActionHandler("onKeydown", event);
    },
    _mainElement() {
      return document.querySelector(`#${this.selectKit.uniqueID}`);
    },
    _headerElement() {
      return this.selectKit.mainElement().querySelector("summary");
    },
    _bodyElement() {
      return this.selectKit.mainElement().querySelector(".select-kit-body");
    },
    _onHover(value, item) {
      (0, _runloop.throttle)(this, this._highlight, item, 25, true);
    },
    _highlight(item) {
      this.selectKit.set("highlighted", item);
    },
    _boundaryActionHandler(actionName) {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      let boundaryAction = true;
      const privateActionName = `_${actionName}`;
      const privateAction = (0, _object.get)(this, privateActionName);
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      if (privateAction) {
        boundaryAction = privateAction.call(this, ...params);
      }
      if (this.actions) {
        const componentAction = (0, _object.get)(this.actions, actionName);
        if (boundaryAction && componentAction) {
          boundaryAction = componentAction.call(this, ...params);
        }
      }
      const action = (0, _object.get)(this, actionName);
      if (boundaryAction && action) {
        boundaryAction = action.call(this, ...params);
      }
      return boundaryAction;
    },
    deselect() {
      this.clearErrors();
      this.selectKit.change(null, null);
    },
    deselectByValue(value) {
      if (!value) {
        return;
      }
      const item = this.itemForValue(value, this.selectedContent);
      this.deselect(item);
    },
    append() {
      // do nothing on general case
    },
    search(filter) {
      let content = this.content || [];
      if (filter) {
        filter = this._normalize(filter);
        content = content.filter(c => {
          const name = this._normalize(this.getName(c));
          return name?.includes(filter);
        });
      }
      return content;
    },
    triggerSearch(filter) {
      this._searchPromise && (0, _runloop.cancel)(this._searchPromise);
      this._searchPromise = this._searchWrapper(filter || this.selectKit.filter);
    },
    _searchWrapper(filter) {
      if (this.isDestroyed || this.isDestroying) {
        return _rsvp.Promise.resolve([]);
      }
      this.clearErrors();
      this.setProperties({
        mainCollection: [],
        "selectKit.isLoading": true,
        "selectKit.enterDisabled": true
      });
      this._safeAfterRender(() => this.popper && this.popper.update());
      let content = [];
      return _rsvp.Promise.resolve(this.search(filter)).then(result => {
        if (this.isDestroyed || this.isDestroying) {
          return [];
        }
        content = content.concat((0, _helpers.makeArray)(result));
        content = this.selectKit.modifyContent(content).filter(Boolean);
        if (this.selectKit.valueProperty) {
          content = content.uniqBy(this.selectKit.valueProperty);
        } else {
          content = content.uniq();
        }
        if (this.selectKit.options.limitMatches) {
          content = content.slice(0, this.selectKit.options.limitMatches);
        }
        const noneItem = this.selectKit.noneItem;
        if (this.selectKit.options.allowAny && filter && this.getName(noneItem) !== filter) {
          filter = this.createContentFromInput(filter);
          if (this.validateCreate(filter, content)) {
            this.selectKit.set("newItem", this.defaultItem(filter, filter));
            content.unshift(this.selectKit.newItem);
          }
        }
        const hasNoContent = (0, _utils.isEmpty)(content);
        if (this.selectKit.hasSelection && noneItem && this.selectKit.options.autoInsertNoneItem) {
          content.unshift(noneItem);
        }
        this.set("mainCollection", content);
        this.selectKit.setProperties({
          highlighted: this.singleSelect && this.value ? this.itemForValue(this.value, this.mainCollection) : (0, _utils.isEmpty)(this.selectKit.filter) ? null : this.mainCollection.firstObject,
          isLoading: false,
          hasNoContent
        });
        this._safeAfterRender(() => {
          if (this.selectKit.isExpanded) {
            this.popper && this.popper.update();
            this._focusFilter();
          }
        });
      }).finally(() => {
        if (this.isDestroyed || this.isDestroying) {
          return;
        }
        this.set("selectKit.enterDisabled", false);
      });
    },
    _safeAfterRender(fn) {
      (0, _runloop.next)(() => {
        (0, _runloop.schedule)("afterRender", () => {
          if (!this.element || this.isDestroyed || this.isDestroying) {
            return;
          }
          fn();
        });
      });
    },
    _scrollToRow(rowItem) {
      let preventScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const value = this.getValue(rowItem);
      let rowContainer;
      if ((0, _utils.isPresent)(value)) {
        rowContainer = this.element.querySelector(`.select-kit-row[data-value="${value}"]`);
      } else {
        rowContainer = this.element.querySelector(".select-kit-row.is-none");
      }
      rowContainer?.focus({
        preventScroll
      });
    },
    _highlightLast() {
      const highlighted = this.mainCollection.objectAt(this.mainCollection.length - 1);
      if (highlighted) {
        this._scrollToRow(highlighted, false);
        this.set("selectKit.highlighted", highlighted);
      }
    },
    _highlightFirst() {
      const highlighted = this.mainCollection.objectAt(0);
      if (highlighted) {
        this._scrollToRow(highlighted, false);
        this.set("selectKit.highlighted", highlighted);
      }
    },
    _highlightNext() {
      let highlightedIndex = this.mainCollection.indexOf(this.selectKit.highlighted);
      const count = this.mainCollection.length;
      if (highlightedIndex < count - 1) {
        highlightedIndex = highlightedIndex + 1;
      } else {
        if (this.selectKit.isFilterExpanded) {
          this._focusFilter();
        } else {
          highlightedIndex = 0;
        }
      }
      const highlighted = this.mainCollection.objectAt(highlightedIndex);
      if (highlighted) {
        this._scrollToRow(highlighted, false);
        this.set("selectKit.highlighted", highlighted);
      }
    },
    _highlightPrevious() {
      let highlightedIndex = this.mainCollection.indexOf(this.selectKit.highlighted);
      const count = this.mainCollection.length;
      if (highlightedIndex > 0) {
        highlightedIndex = highlightedIndex - 1;
      } else {
        if (this.selectKit.isFilterExpanded) {
          this._focusFilter();
        } else {
          highlightedIndex = count - 1;
        }
      }
      const highlighted = this.mainCollection.objectAt(highlightedIndex);
      if (highlighted) {
        this._scrollToRow(highlighted, false);
        this.set("selectKit.highlighted", highlighted);
      }
    },
    select(value, item) {
      if (!(0, _utils.isPresent)(value)) {
        this._onClearSelection();
      } else {
        const existingItem = this.findValue(this.mainCollection, item);
        if (existingItem) {
          if (!this.validateSelect(item)) {
            return;
          }
        }
        this.selectKit.change(value, item || this.defaultItem(value, value));
      }
    },
    _onClearSelection() {
      this.selectKit.change(null, null);
    },
    _onOpenWrapper() {
      return this._boundaryActionHandler("onOpen");
    },
    _cancelSearch() {
      this._searchPromise && (0, _runloop.cancel)(this._searchPromise);
    },
    _onCloseWrapper() {
      this._cancelSearch();
      this.set("selectKit.highlighted", null);
      return this._boundaryActionHandler("onClose");
    },
    _toggle(event) {
      if (this.selectKit.isExpanded) {
        this._close(event);
      } else {
        this._open(event);
      }
    },
    _close(event) {
      if (!this.selectKit.isExpanded) {
        return;
      }
      this.selectKit.mainElement().open = false;
      this.clearErrors();
      const inModal = this.element.closest("#discourse-modal");
      if (inModal && this.site.mobileView) {
        const modalBody = inModal.querySelector(".modal-body");
        modalBody.style = "";
      }
      this.selectKit.onClose(event);
      this.selectKit.setProperties({
        isExpanded: false,
        filter: null
      });
    },
    _open(event) {
      if (this.selectKit.isExpanded) {
        return;
      }
      this.selectKit.mainElement().open = true;
      this.clearErrors();
      this.selectKit.onOpen(event);
      if (!this.popper) {
        const inModal = this.element.closest("#discourse-modal");
        const anchor = document.querySelector(`#${this.selectKit.uniqueID}-header`);
        const popper = document.querySelector(`#${this.selectKit.uniqueID}-body`);
        const strategy = this._computePlacementStrategy();
        this.popper = (0, _core.createPopper)(anchor, popper, {
          eventsEnabled: false,
          strategy,
          placement: this.selectKit.options.placement,
          modifiers: [{
            name: "eventListeners",
            options: {
              resize: !this.site.mobileView,
              scroll: !this.site.mobileView
            }
          }, {
            name: "flip",
            enabled: !inModal,
            options: {
              padding: {
                top: parseInt(document.documentElement.style.getPropertyValue("--header-offset"), 10) || 0
              }
            }
          }, {
            name: "offset",
            options: {
              offset: [0, this.selectKit.options.verticalOffset]
            }
          }, {
            name: "applySmallScreenOffset",
            enabled: window.innerWidth <= 450,
            phase: "main",
            fn(_ref) {
              let {
                state
              } = _ref;
              if (!inModal) {
                let {
                  x
                } = state.elements.reference.getBoundingClientRect();
                if (strategy === "fixed") {
                  state.modifiersData.popperOffsets.x = 0 + 10;
                } else {
                  state.modifiersData.popperOffsets.x = -x + 10;
                }
              }
            }
          }, {
            name: "applySmallScreenMaxWidth",
            enabled: window.innerWidth <= 450,
            phase: "beforeWrite",
            fn: _ref2 => {
              let {
                state
              } = _ref2;
              if (inModal) {
                const innerModal = document.querySelector("#discourse-modal div.modal-inner-container");
                if (innerModal) {
                  if (this.multiSelect) {
                    state.styles.popper.width = `${this.element.offsetWidth}px`;
                  } else {
                    state.styles.popper.width = `${innerModal.clientWidth - 20}px`;
                  }
                }
              } else {
                state.styles.popper.width = `${window.innerWidth - 20}px`;
              }
            }
          }, {
            name: "minWidth",
            enabled: window.innerWidth > 450,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: _ref3 => {
              let {
                state
              } = _ref3;
              state.styles.popper.minWidth = `${Math.max(state.rects.reference.width, 220)}px`;
            },
            effect: _ref4 => {
              let {
                state
              } = _ref4;
              state.elements.popper.style.minWidth = `${Math.max(state.elements.reference.offsetWidth, 220)}px`;
            }
          }, {
            name: "modalHeight",
            enabled: !!(inModal && this.site.mobileView),
            phase: "afterWrite",
            fn: _ref5 => {
              let {
                state
              } = _ref5;
              const modalBody = inModal.querySelector(".modal-body");
              modalBody.style = "";
              modalBody.style.height = modalBody.clientHeight + state.rects.popper.height + "px";
            }
          }]
        });
      }
      this.selectKit.setProperties({
        isExpanded: true,
        isFilterExpanded: this.selectKit.options.filterable || this.selectKit.options.allowAny
      });
      this.triggerSearch();
      this._safeAfterRender(() => {
        this._focusFilter();
        this._scrollToCurrent();
        this.popper && this.popper.update();
      });
    },
    _scrollToCurrent() {
      if (this.value && this.mainCollection) {
        let highlighted;
        if (this.valueProperty) {
          highlighted = this.mainCollection.findBy(this.valueProperty, this.value);
        } else {
          const index = this.mainCollection.indexOf(this.value);
          highlighted = this.mainCollection.objectAt(index);
        }
        if (highlighted) {
          this._scrollToRow(highlighted, false);
          this.set("selectKit.highlighted", highlighted);
        }
      }
    },
    _focusFilter() {
      let forceHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.selectKit.mainElement()) {
        return;
      }
      if (!this.selectKit.mainElement().open) {
        const headerContainer = this.getHeader();
        headerContainer && headerContainer.focus({
          preventScroll: true
        });
        return;
      }
      this._safeAfterRender(() => {
        const input = this.getFilterInput();
        if (!forceHeader && input) {
          input.focus({
            preventScroll: true
          });
          if (typeof input.selectionStart === "number") {
            input.selectionStart = input.selectionEnd = input.value.length;
          }
        } else if (!this.selectKit.options.preventHeaderFocus) {
          const headerContainer = this.getHeader();
          headerContainer && headerContainer.focus({
            preventScroll: true
          });
        }
      });
    },
    getFilterInput() {
      return document.querySelector(`#${this.selectKit.uniqueID}-filter input`);
    },
    getHeader() {
      return document.querySelector(`#${this.selectKit.uniqueID}-header`);
    },
    handleDeprecations() {
      this._deprecateValueAttribute();
      this._deprecateMutations();
      this._handleDeprecatedArgs();
    },
    _computePlacementStrategy() {
      let placementStrategy = this.selectKit.options.placementStrategy;
      if (placementStrategy) {
        return placementStrategy;
      }
      if (this.capabilities.isIpadOS || this.site.mobileView) {
        placementStrategy = this.selectKit.options.mobilePlacementStrategy || "absolute";
      } else {
        placementStrategy = this.selectKit.options.desktopPlacementStrategy || "fixed";
      }
      return placementStrategy;
    },
    _deprecated(text) {
      (0, _deprecated.default)(text, {
        since: "v2.4.0",
        dropFrom: "2.9.0.beta1",
        id: "discourse.select-kit"
      });
    },
    _deprecateValueAttribute() {
      if (this.valueAttribute || this.valueAttribute === null) {
        this._deprecated("The `valueAttribute` is deprecated. Use `valueProperty` instead");
        this.set("valueProperty", this.valueAttribute);
      }
    },
    _deprecateMutations() {
      this.actions = this.actions || {};
      this.attrs = this.attrs || {};
      if (!this.attrs.onChange && !this.actions.onChange) {
        this._deprecated("Implicit mutation has been deprecated, please use `onChange` handler");
        this.actions.onChange = this.attrs.onSelect || this.actions.onSelect || (value => this.set("value", value));
      }
    },
    _resolveDeprecatedOptions() {
      const migrations = {
        allowAny: "options.allowAny",
        allowCreate: "options.allowAny",
        filterable: "options.filterable",
        excludeCategoryId: "options.excludeCategoryId",
        scopedCategoryId: "options.scopedCategoryId",
        allowUncategorized: "options.allowUncategorized",
        none: "options.none",
        rootNone: "options.none",
        disabled: "options.disabled",
        isDisabled: "options.disabled",
        rootNoneLabel: "options.none",
        showFullTitle: "options.showFullTitle",
        title: "options.translatedNone",
        maximum: "options.maximum",
        minimum: "options.minimum",
        i18nPostfix: "options.i18nPostfix",
        i18nPrefix: "options.i18nPrefix",
        castInteger: "options.castInteger"
      };
      const resolvedDeprecations = {};
      Object.keys(migrations).forEach(from => {
        const to = migrations[from];
        if (this.get(from) && !this.get(to)) {
          this._deprecated(`The \`${from}\` attribute is deprecated. Use \`${to}\` instead`);
          resolvedDeprecations[(to, this.get(from))];
        }
      });
      return resolvedDeprecations;
    },
    _handleDeprecatedArgs() {
      const migrations = {
        headerIcon: "icon",
        onExpand: "onOpen",
        onCollapse: "onClose"
      };
      Object.keys(migrations).forEach(from => {
        const to = migrations[from];
        if (this.get(from) && !this.get(to)) {
          this._deprecated(`The \`${from}\` attribute is deprecated. Use \`${to}\` instead`);
          this.set(to, this.get(from));
        }
      });
    }
  });
  _exports.default = _default;
});