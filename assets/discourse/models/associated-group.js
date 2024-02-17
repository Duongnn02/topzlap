define("discourse/models/associated-group", ["exports", "@ember/object", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _object, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  const AssociatedGroup = _object.default.extend();
  AssociatedGroup.reopenClass({
    list() {
      return (0, _ajax.ajax)("/associated_groups").then(result => {
        return result.associated_groups.map(ag => AssociatedGroup.create(ag));
      }).catch(_ajaxError.popupAjaxError);
    }
  });
  var _default = AssociatedGroup;
  _exports.default = _default;
});