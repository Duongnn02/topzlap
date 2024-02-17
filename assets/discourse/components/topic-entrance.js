define("discourse/components/topic-entrance", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/cleans-up", "discourse/lib/url", "I18n", "discourse-common/utils/decorators", "@ember/runloop"], function (_exports, _component, _templateFactory, _cleansUp, _url, _I18n, _decorators, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj, _init, _init2, _init3, _init4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/mixins/cleans-up",0,"@ember/component",0,"discourse/lib/url",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @action={{action "enterTop"}}
    @class="btn-default full jump-top"
    @ariaLabel="topic_entrance.sr_jump_top_button"
  >
    {{d-icon "step-backward"}}
    {{html-safe this.topDate}}
  </DButton>
  
  <DButton
    @action={{action "enterBottom"}}
    @class="btn-default full jump-bottom"
    @ariaLabel="topic_entrance.sr_jump_bottom_button"
  >
    {{html-safe this.bottomDate}}
    {{d-icon "step-forward"}}
  </DButton>
  */
  {
    "id": "KCGwEplr",
    "block": "[[[8,[39,0],null,[[\"@action\",\"@class\",\"@ariaLabel\"],[[28,[37,1],[[30,0],\"enterTop\"],null],\"btn-default full jump-top\",\"topic_entrance.sr_jump_top_button\"]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,2],[\"step-backward\"],null]],[1,\"\\n  \"],[1,[28,[35,3],[[30,0,[\"topDate\"]]],null]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[8,[39,0],null,[[\"@action\",\"@class\",\"@ariaLabel\"],[[28,[37,1],[[30,0],\"enterBottom\"],null],\"btn-default full jump-bottom\",\"topic_entrance.sr_jump_bottom_button\"]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,3],[[30,0,[\"bottomDate\"]]],null]],[1,\"\\n  \"],[1,[28,[35,2],[\"step-forward\"],null]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-button\",\"action\",\"d-icon\",\"html-safe\"]]",
    "moduleName": "discourse/components/topic-entrance.hbs",
    "isStrictMode": false
  });
  function entranceDate(dt, showTime) {
    const today = new Date();
    if (dt.toDateString() === today.toDateString()) {
      return moment(dt).format(_I18n.default.t("dates.time"));
    }
    if (dt.getYear() === today.getYear()) {
      // No year
      return moment(dt).format(showTime ? _I18n.default.t("dates.long_date_without_year_with_linebreak") : _I18n.default.t("dates.long_no_year_no_time"));
    }
    return moment(dt).format(showTime ? _I18n.default.t("dates.long_date_with_year_with_linebreak") : _I18n.default.t("dates.long_date_with_year_without_time"));
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_cleansUp.default, (_dec = (0, _decorators.default)("topic.created_at"), _dec2 = (0, _decorators.default)("topic.bumped_at"), _dec3 = (0, _decorators.default)("createdDate", "bumpedDate"), _dec4 = (0, _decorators.default)("createdDate", "showTime"), _dec5 = (0, _decorators.default)("bumpedDate", "showTime"), (_obj = {
    elementId: "topic-entrance",
    classNameBindings: ["visible::hidden"],
    topic: null,
    visible: null,
    _position: null,
    _originalActiveElement: null,
    _activeButton: null,
    createdDate: createdAt => new Date(createdAt),
    bumpedDate: bumpedAt => new Date(bumpedAt),
    showTime(createdDate, bumpedDate) {
      return bumpedDate.getTime() - createdDate.getTime() < 1000 * 60 * 60 * 24 * 2;
    },
    topDate: (createdDate, showTime) => entranceDate(createdDate, showTime),
    bottomDate: (bumpedDate, showTime) => entranceDate(bumpedDate, showTime),
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("topic-entrance:show", this, "_show");
    },
    _setCSS() {
      const pos = this._position;
      const $self = $(this.element);
      const width = $self.width();
      const height = $self.height();
      pos.left = parseInt(pos.left, 10) - width / 2;
      pos.top = parseInt(pos.top, 10) - height / 2;
      const windowWidth = $(window).width();
      if (pos.left + width > windowWidth) {
        pos.left = windowWidth - width - 15;
      }
      $self.css(pos);
    },
    _escListener(e) {
      if (e.key === "Escape") {
        this.cleanUp();
      } else if (e.key === "Tab") {
        if (this._activeButton === "top") {
          this._jumpBottomButton().focus();
          this._activeButton = "bottom";
          e.preventDefault();
        } else if (this._activeButton === "bottom") {
          this._jumpTopButton().focus();
          this._activeButton = "top";
          e.preventDefault();
        }
      }
    },
    _jumpTopButton() {
      return this.element.querySelector(".jump-top");
    },
    _jumpBottomButton() {
      return this.element.querySelector(".jump-bottom");
    },
    _setupEscListener() {
      document.body.addEventListener("keydown", this._escListener);
    },
    _removeEscListener() {
      document.body.removeEventListener("keydown", this._escListener);
    },
    _trapFocus() {
      this._originalActiveElement = document.activeElement;
      this._jumpTopButton().focus();
      this._activeButton = "top";
    },
    _releaseFocus() {
      if (this._originalActiveElement) {
        this._originalActiveElement.focus();
        this._originalActiveElement = null;
      }
    },
    _applyDomChanges() {
      this._setCSS();
      this._setupEscListener();
      this._trapFocus();
    },
    _show(data) {
      this._position = data.position;
      this.setProperties({
        topic: data.topic,
        visible: true
      });
      (0, _runloop.scheduleOnce)("afterRender", this, this._applyDomChanges);
      $("html").off("mousedown.topic-entrance").on("mousedown.topic-entrance", e => {
        const $target = $(e.target);
        if ($target.prop("id") === "topic-entrance" || $(this.element).has($target).length !== 0) {
          return;
        }
        this.cleanUp();
      });
    },
    cleanUp() {
      this.setProperties({
        topic: null,
        visible: false
      });
      $("html").off("mousedown.topic-entrance");
      this._removeEscListener();
      this._releaseFocus();
    },
    willDestroyElement() {
      this.appEvents.off("topic-entrance:show", this, "_show");
    },
    _jumpTo(destination) {
      this.cleanUp();
      _url.default.routeTo(destination);
    },
    actions: {
      enterTop() {
        this._jumpTo(this.get("topic.url"));
      },
      enterBottom() {
        this._jumpTo(this.get("topic.lastPostUrl"));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "createdDate", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "createdDate"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "bumpedDate", [_dec2], (_init2 = Object.getOwnPropertyDescriptor(_obj, "bumpedDate"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showTime", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showTime"), _obj), _applyDecoratedDescriptor(_obj, "topDate", [_dec4], (_init3 = Object.getOwnPropertyDescriptor(_obj, "topDate"), _init3 = _init3 ? _init3.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init3;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "bottomDate", [_dec5], (_init4 = Object.getOwnPropertyDescriptor(_obj, "bottomDate"), _init4 = _init4 ? _init4.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init4;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "_escListener", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_escListener"), _obj)), _obj))));
  _exports.default = _default;
});