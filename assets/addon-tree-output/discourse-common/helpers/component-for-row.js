define("discourse-common/helpers/component-for-row", ["discourse-common/lib/helpers"], function (_helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("component-for-row", (collectionForIdentifier, item, selectKit) => {
    return selectKit.modifyComponentForRow(collectionForIdentifier, item);
  });
});