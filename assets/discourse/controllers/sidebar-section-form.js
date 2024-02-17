define("discourse/controllers/sidebar-section-form", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "@ember/utils", "discourse/lib/ajax-error", "@ember/service", "I18n", "discourse/lib/text", "@glimmer/tracking", "@ember/array", "discourse/lib/constants"], function (_exports, _controller, _modalFunctionality, _ajax, _utils, _ajaxError, _service, _I18n, _text, _tracking, _array, _constants) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _blankTitle, _tooLongTitle, _class3, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _blankIcon, _tooLongIcon, _blankName, _tooLongName, _blankValue, _tooLongValue, _invalidValue, _validExternal, _validInternal;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"@ember/service",0,"I18n",0,"discourse/lib/text",0,"@glimmer/tracking",0,"@ember/array",0,"discourse/lib/constants"eaimeta@70e063a35619d71f
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const FULL_RELOAD_LINKS_REGEX = [/^\/my\/[a-z_\-\/]+$/, /^\/safe-mode$/];
  let Section = (_class = (_blankTitle = /*#__PURE__*/new WeakMap(), _tooLongTitle = /*#__PURE__*/new WeakMap(), class Section {
    constructor(_ref) {
      let {
        title,
        links,
        id,
        publicSection
      } = _ref;
      _classPrivateFieldInitSpec(this, _tooLongTitle, {
        get: _get_tooLongTitle,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _blankTitle, {
        get: _get_blankTitle,
        set: void 0
      });
      _initializerDefineProperty(this, "title", _descriptor, this);
      _initializerDefineProperty(this, "links", _descriptor2, this);
      this.title = title;
      this.public = publicSection;
      this.links = links;
      this.id = id;
    }
    get valid() {
      const validLinks = this.links.length > 0 && this.links.every(link => link.valid);
      return this.validTitle && validLinks;
    }
    get validTitle() {
      return !_classPrivateFieldGet(this, _blankTitle) && !_classPrivateFieldGet(this, _tooLongTitle);
    }
    get invalidTitleMessage() {
      if (this.title === undefined) {
        return;
      }
      if (_classPrivateFieldGet(this, _blankTitle)) {
        return _I18n.default.t("sidebar.sections.custom.title.validation.blank");
      }
      if (_classPrivateFieldGet(this, _tooLongTitle)) {
        return _I18n.default.t("sidebar.sections.custom.title.validation.maximum", {
          count: _constants.SIDEBAR_SECTION.max_title_length
        });
      }
    }
    get titleCssClass() {
      return this.title === undefined || this.validTitle ? "" : "warning";
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "links", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  function _get_blankTitle() {
    return (0, _utils.isEmpty)(this.title);
  }
  function _get_tooLongTitle() {
    return this.title.length > _constants.SIDEBAR_SECTION.max_title_length;
  }
  let SectionLink = (_class3 = (_blankIcon = /*#__PURE__*/new WeakMap(), _tooLongIcon = /*#__PURE__*/new WeakMap(), _blankName = /*#__PURE__*/new WeakMap(), _tooLongName = /*#__PURE__*/new WeakMap(), _blankValue = /*#__PURE__*/new WeakMap(), _tooLongValue = /*#__PURE__*/new WeakMap(), _invalidValue = /*#__PURE__*/new WeakMap(), _validExternal = /*#__PURE__*/new WeakSet(), _validInternal = /*#__PURE__*/new WeakSet(), class SectionLink {
    constructor(_ref2) {
      let {
        router,
        icon,
        name,
        value,
        id
      } = _ref2;
      _classPrivateMethodInitSpec(this, _validInternal);
      _classPrivateMethodInitSpec(this, _validExternal);
      _classPrivateFieldInitSpec(this, _invalidValue, {
        get: _get_invalidValue,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _tooLongValue, {
        get: _get_tooLongValue,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _blankValue, {
        get: _get_blankValue,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _tooLongName, {
        get: _get_tooLongName,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _blankName, {
        get: _get_blankName,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _tooLongIcon, {
        get: _get_tooLongIcon,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _blankIcon, {
        get: _get_blankIcon,
        set: void 0
      });
      _initializerDefineProperty(this, "icon", _descriptor3, this);
      _initializerDefineProperty(this, "name", _descriptor4, this);
      _initializerDefineProperty(this, "value", _descriptor5, this);
      _initializerDefineProperty(this, "_destroy", _descriptor6, this);
      this.router = router;
      this.icon = icon || "link";
      this.name = name;
      this.value = value;
      this.id = id;
      this.httpHost = "http://" + window.location.host;
      this.httpsHost = "https://" + window.location.host;
    }
    get path() {
      return this.value?.replace(this.httpHost, "").replace(this.httpsHost, "");
    }
    get valid() {
      return this.validIcon && this.validName && this.validValue;
    }
    get validIcon() {
      return !_classPrivateFieldGet(this, _blankIcon) && !_classPrivateFieldGet(this, _tooLongIcon);
    }
    get validName() {
      return !_classPrivateFieldGet(this, _blankName) && !_classPrivateFieldGet(this, _tooLongName);
    }
    get validValue() {
      return !_classPrivateFieldGet(this, _blankValue) && !_classPrivateFieldGet(this, _tooLongValue) && !_classPrivateFieldGet(this, _invalidValue);
    }
    get invalidIconMessage() {
      if (_classPrivateFieldGet(this, _blankIcon)) {
        return _I18n.default.t("sidebar.sections.custom.links.icon.validation.blank");
      }
      if (_classPrivateFieldGet(this, _tooLongIcon)) {
        return _I18n.default.t("sidebar.sections.custom.links.icon.validation.maximum", {
          count: _constants.SIDEBAR_URL.max_icon_length
        });
      }
    }
    get invalidNameMessage() {
      if (this.name === undefined) {
        return;
      }
      if (_classPrivateFieldGet(this, _blankName)) {
        return _I18n.default.t("sidebar.sections.custom.links.name.validation.blank");
      }
      if (_classPrivateFieldGet(this, _tooLongName)) {
        return _I18n.default.t("sidebar.sections.custom.links.name.validation.maximum", {
          count: _constants.SIDEBAR_URL.max_name_length
        });
      }
    }
    get invalidValueMessage() {
      if (this.value === undefined) {
        return;
      }
      if (_classPrivateFieldGet(this, _blankValue)) {
        return _I18n.default.t("sidebar.sections.custom.links.value.validation.blank");
      }
      if (_classPrivateFieldGet(this, _tooLongValue)) {
        return _I18n.default.t("sidebar.sections.custom.links.value.validation.maximum", {
          count: _constants.SIDEBAR_URL.max_value_length
        });
      }
      if (_classPrivateFieldGet(this, _invalidValue)) {
        return _I18n.default.t("sidebar.sections.custom.links.value.validation.invalid");
      }
    }
    get iconCssClass() {
      return this.icon === undefined || this.validIcon ? "" : "warning";
    }
    get nameCssClass() {
      return this.name === undefined || this.validName ? "" : "warning";
    }
    get valueCssClass() {
      return this.value === undefined || this.validValue ? "" : "warning";
    }
    get external() {
      return this.value && !(this.value.startsWith(this.httpHost) || this.value.startsWith(this.httpsHost) || this.value.startsWith("/"));
    }
  }), (_descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "icon", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, "name", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, "value", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class3.prototype, "_destroy", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class3);
  function _get_blankIcon() {
    return (0, _utils.isEmpty)(this.icon);
  }
  function _get_tooLongIcon() {
    return this.icon.length > _constants.SIDEBAR_URL.max_icon_length;
  }
  function _get_blankName() {
    return (0, _utils.isEmpty)(this.name);
  }
  function _get_tooLongName() {
    return this.name.length > _constants.SIDEBAR_URL.max_name_length;
  }
  function _get_blankValue() {
    return (0, _utils.isEmpty)(this.value);
  }
  function _get_tooLongValue() {
    return this.value.length > _constants.SIDEBAR_URL.max_value_length;
  }
  function _get_invalidValue() {
    return this.path && (this.external ? !_classPrivateMethodGet(this, _validExternal, _validExternal2).call(this) : !_classPrivateMethodGet(this, _validInternal, _validInternal2).call(this));
  }
  function _validExternal2() {
    try {
      return new URL(this.value);
    } catch {
      return false;
    }
  }
  function _validInternal2() {
    return this.router.recognize(this.path).name !== "unknown" || FULL_RELOAD_LINKS_REGEX.some(regex => this.path.match(regex));
  }
  var _default = _controller.default.extend(_modalFunctionality.default, {
    dialog: (0, _service.inject)(),
    router: (0, _service.inject)(),
    onShow() {
      this.setProperties({
        flashText: null,
        flashClass: null
      });
      this.model = this.initModel();
    },
    onClose() {
      this.model = null;
    },
    initModel() {
      if (this.model) {
        return new Section({
          title: this.model.title,
          publicSection: this.model.public,
          links: (0, _array.A)(this.model.links.map(link => new SectionLink({
            router: this.router,
            icon: link.icon,
            name: link.name,
            value: link.value,
            id: link.id
          }))),
          id: this.model.id
        });
      } else {
        return new Section({
          links: (0, _array.A)([new SectionLink({
            router: this.router
          })])
        });
      }
    },
    create() {
      return (0, _ajax.ajax)(`/sidebar_sections`, {
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          title: this.model.title,
          public: this.model.public,
          links: this.model.links.map(link => {
            return {
              icon: link.icon,
              name: link.name,
              value: link.path
            };
          })
        })
      }).then(data => {
        this.currentUser.set("sidebar_sections", this.currentUser.sidebar_sections.concat(data.sidebar_section));
        this.send("closeModal");
      }).catch(e => this.setProperties({
        flashText: (0, _text.sanitize)((0, _ajaxError.extractError)(e)),
        flashClass: "error"
      }));
    },
    update() {
      return (0, _ajax.ajax)(`/sidebar_sections/${this.model.id}`, {
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          title: this.model.title,
          public: this.model.public,
          links: this.model.links.map(link => {
            return {
              id: link.id,
              icon: link.icon,
              name: link.name,
              value: link.path,
              _destroy: link._destroy
            };
          })
        })
      }).then(data => {
        const newSidebarSections = this.currentUser.sidebar_sections.map(section => {
          if (section.id === data["sidebar_section"].id) {
            return data["sidebar_section"];
          }
          return section;
        });
        this.currentUser.set("sidebar_sections", newSidebarSections);
        this.send("closeModal");
      }).catch(e => this.setProperties({
        flashText: (0, _text.sanitize)((0, _ajaxError.extractError)(e)),
        flashClass: "error"
      }));
    },
    get activeLinks() {
      return this.model.links.filter(link => !link._destroy);
    },
    get header() {
      return this.model.id ? "sidebar.sections.custom.edit" : "sidebar.sections.custom.add";
    },
    actions: {
      addLink() {
        this.model.links.pushObject(new SectionLink({
          router: this.router
        }));
      },
      deleteLink(link) {
        if (link.id) {
          link._destroy = "1";
        } else {
          this.model.links.removeObject(link);
        }
      },
      save() {
        this.model.id ? this.update() : this.create();
      },
      delete() {
        return this.dialog.yesNoConfirm({
          message: _I18n.default.t("sidebar.sections.custom.delete_confirm"),
          didConfirm: () => {
            return (0, _ajax.ajax)(`/sidebar_sections/${this.model.id}`, {
              type: "DELETE"
            }).then(data => {
              const newSidebarSections = this.currentUser.sidebar_sections.filter(section => {
                return section.id !== data["sidebar_section"].id;
              });
              this.currentUser.set("sidebar_sections", newSidebarSections);
              this.send("closeModal");
            }).catch(e => this.setProperties({
              flashText: (0, _text.sanitize)((0, _ajaxError.extractError)(e)),
              flashClass: "error"
            }));
          }
        });
      }
    }
  });
  _exports.default = _default;
});