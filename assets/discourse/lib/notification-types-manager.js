define("discourse/lib/notification-types-manager", ["exports", "discourse/lib/notification-types/base", "discourse/lib/notification-types/bookmark-reminder", "discourse/lib/notification-types/custom", "discourse/lib/notification-types/granted-badge", "discourse/lib/notification-types/group-mentioned", "discourse/lib/notification-types/group-message-summary", "discourse/lib/notification-types/invitee-accepted", "discourse/lib/notification-types/liked-consolidated", "discourse/lib/notification-types/liked", "discourse/lib/notification-types/membership-request-accepted", "discourse/lib/notification-types/membership-request-consolidated", "discourse/lib/notification-types/new-features", "discourse/lib/notification-types/moved-post", "discourse/lib/notification-types/watching-first-post"], function (_exports, _base, _bookmarkReminder, _custom, _grantedBadge, _groupMentioned, _groupMessageSummary, _inviteeAccepted, _likedConsolidated, _liked, _membershipRequestAccepted, _membershipRequestConsolidated, _newFeatures, _movedPost, _watchingFirstPost) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getRenderDirector = getRenderDirector;
  _exports.registerNotificationTypeRenderer = registerNotificationTypeRenderer;
  _exports.resetNotificationTypeRenderers = resetNotificationTypeRenderers;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/notification-types/base",0,"discourse/lib/notification-types/bookmark-reminder",0,"discourse/lib/notification-types/custom",0,"discourse/lib/notification-types/granted-badge",0,"discourse/lib/notification-types/group-mentioned",0,"discourse/lib/notification-types/group-message-summary",0,"discourse/lib/notification-types/invitee-accepted",0,"discourse/lib/notification-types/liked-consolidated",0,"discourse/lib/notification-types/liked",0,"discourse/lib/notification-types/membership-request-accepted",0,"discourse/lib/notification-types/membership-request-consolidated",0,"discourse/lib/notification-types/new-features",0,"discourse/lib/notification-types/moved-post",0,"discourse/lib/notification-types/watching-first-post"eaimeta@70e063a35619d71f
  const CLASS_FOR_TYPE = {
    bookmark_reminder: _bookmarkReminder.default,
    custom: _custom.default,
    granted_badge: _grantedBadge.default,
    group_mentioned: _groupMentioned.default,
    group_message_summary: _groupMessageSummary.default,
    invitee_accepted: _inviteeAccepted.default,
    liked: _liked.default,
    liked_consolidated: _likedConsolidated.default,
    membership_request_accepted: _membershipRequestAccepted.default,
    membership_request_consolidated: _membershipRequestConsolidated.default,
    moved_post: _movedPost.default,
    new_features: _newFeatures.default,
    watching_first_post: _watchingFirstPost.default
  };
  let _customClassForType = {};
  function registerNotificationTypeRenderer(notificationType, func) {
    _customClassForType[notificationType] = func(_base.default);
  }
  function resetNotificationTypeRenderers() {
    _customClassForType = {};
  }
  function getRenderDirector(type, notification, currentUser, siteSettings, site) {
    const klass = _customClassForType[type] || CLASS_FOR_TYPE[type] || _base.default;
    return new klass({
      notification,
      currentUser,
      siteSettings,
      site
    });
  }
});