define("discourse/widgets/do-not-disturb", ["exports", "I18n", "discourse/widgets/widget", "discourse/helpers/node", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/show-modal", "discourse/lib/do-not-disturb"], function (_exports, _I18n, _widget, _node, _virtualDom, _iconLibrary, _showModal, _doNotDisturb) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"discourse/helpers/node",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/show-modal",0,"discourse/lib/do-not-disturb"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("do-not-disturb", {
    tagName: "li.do-not-disturb",
    saving: false,
    html() {
      const isOn = this.currentUser.isInDoNotDisturb();
      return [this._menuButton(isOn)];
    },
    click() {
      if (this.saving) {
        return;
      }
      this.saving = true;
      if (this.currentUser.do_not_disturb_until) {
        return this.currentUser.leaveDoNotDisturb().then(() => {
          this.saving = false;
        });
      } else {
        this.saving = false;
        return (0, _showModal.default)("do-not-disturb");
      }
    },
    _menuButton(isOn) {
      const icon = (0, _iconLibrary.iconNode)(isOn ? "toggle-on" : "toggle-off");
      return (0, _virtualDom.h)("button.btn-flat.do-not-disturb-inner-container", [icon, this._label()]);
    },
    _label() {
      const content = [(0, _virtualDom.h)("span", _I18n.default.t("pause_notifications.label"))];
      const until = this.currentUser.do_not_disturb_until;
      if (!_doNotDisturb.default.isEternal(until)) {
        content.push((0, _node.dateNode)(until));
      }
      return (0, _virtualDom.h)("span.do-not-disturb-label", content);
    }
  });
  _exports.default = _default;
});