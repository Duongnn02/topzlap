define("discourse/lib/reviewable-types-manager", ["exports", "discourse/lib/reviewable-types/base", "discourse/lib/reviewable-types/flagged-post", "discourse/lib/reviewable-types/queued-post", "discourse/lib/reviewable-types/user"], function (_exports, _base, _flaggedPost, _queuedPost, _user) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getRenderDirector = getRenderDirector;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/reviewable-types/base",0,"discourse/lib/reviewable-types/flagged-post",0,"discourse/lib/reviewable-types/queued-post",0,"discourse/lib/reviewable-types/user"eaimeta@70e063a35619d71f
  const CLASS_FOR_TYPE = {
    ReviewableFlaggedPost: _flaggedPost.default,
    ReviewableQueuedPost: _queuedPost.default,
    ReviewableUser: _user.default
  };
  function getRenderDirector(type, reviewable, currentUser, siteSettings, site) {
    const klass = CLASS_FOR_TYPE[type] || _base.default;
    return new klass({
      reviewable,
      currentUser,
      siteSettings,
      site
    });
  }
});