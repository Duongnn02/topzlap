define("select-kit/components/email-group-user-chooser", ["exports", "select-kit/components/user-chooser"], function (_exports, _userChooser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/user-chooser"eaimeta@70e063a35619d71f
  var _default = _userChooser.default.extend({
    pluginApiIdentifiers: ["email-group-user-chooser"],
    classNames: ["email-group-user-chooser"],
    classNameBindings: ["selectKit.options.fullWidthWrap:full-width-wrap"],
    valueProperty: "id",
    nameProperty: "name",
    modifyComponentForRow() {
      return "email-group-user-chooser-row";
    },
    selectKitOptions: {
      filterComponent: "email-group-user-chooser-filter",
      fullWidthWrap: false,
      autoWrap: false
    },
    search() {
      const superPromise = this._super(...arguments);
      if (!superPromise) {
        return;
      }
      return superPromise.then(results => {
        if (!results || results.length === 0) {
          return;
        }
        return results.map(item => {
          const reconstructed = {};
          if (item.username) {
            reconstructed.id = item.username;
            if (item.username.includes("@")) {
              reconstructed.isEmail = true;
            } else {
              reconstructed.isUser = true;
              reconstructed.name = item.name;
              reconstructed.showUserStatus = this.showUserStatus;
            }
          } else if (item.name) {
            reconstructed.id = item.name;
            reconstructed.name = item.full_name;
            reconstructed.isGroup = true;
          }
          return Object.assign({}, item, reconstructed);
        });
      });
    }
  });
  _exports.default = _default;
});