define("discourse/lib/push-notifications", ["exports", "discourse/lib/key-value-store", "discourse/lib/ajax", "discourse-common/lib/helpers"], function (_exports, _keyValueStore, _ajax, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isPushNotificationsEnabled = isPushNotificationsEnabled;
  _exports.isPushNotificationsSupported = isPushNotificationsSupported;
  _exports.keyValueStore = void 0;
  _exports.register = register;
  _exports.subscribe = subscribe;
  _exports.unsubscribe = unsubscribe;
  _exports.userSubscriptionKey = userSubscriptionKey;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/key-value-store",0,"discourse/lib/ajax",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  const keyValueStore = new _keyValueStore.default("discourse_push_notifications_");
  _exports.keyValueStore = keyValueStore;
  function userSubscriptionKey(user) {
    return `subscribed-${user.get("id")}`;
  }
  function sendSubscriptionToServer(subscription, sendConfirmation) {
    (0, _ajax.ajax)("/push_notifications/subscribe", {
      type: "POST",
      data: {
        subscription: subscription.toJSON(),
        send_confirmation: sendConfirmation
      }
    });
  }
  function resetIdle() {
    if ("controller" in navigator.serviceWorker && navigator.serviceWorker.controller != null) {
      navigator.serviceWorker.controller.postMessage({
        lastAction: Date.now()
      });
    }
  }
  function setupActivityListeners(appEvents) {
    window.addEventListener("focus", resetIdle);
    if (document) {
      document.addEventListener("scroll", resetIdle);
    }
    appEvents.on("page:changed", resetIdle);
  }
  function isPushNotificationsSupported() {
    let caps = (0, _helpers.helperContext)().capabilities;
    if (!("serviceWorker" in navigator && typeof ServiceWorkerRegistration !== "undefined" && typeof Notification !== "undefined" && "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && !caps.isAppWebview && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated")) {
      return false;
    }
    return true;
  }
  function isPushNotificationsEnabled(user) {
    return user && !user.isInDoNotDisturb() && isPushNotificationsSupported() && keyValueStore.getItem(userSubscriptionKey(user));
  }
  function register(user, router, appEvents) {
    if (!isPushNotificationsSupported()) {
      return;
    }
    if (Notification.permission === "denied" || !user) {
      return;
    }
    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.getSubscription().then(subscription => {
        if (subscription) {
          sendSubscriptionToServer(subscription, false);
          // Resync localStorage
          keyValueStore.setItem(userSubscriptionKey(user), "subscribed");
        }
        setupActivityListeners(appEvents);
      }).catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
    });
    navigator.serviceWorker.addEventListener("message", event => {
      if ("url" in event.data) {
        const url = event.data.url;
        router.handleURL(url);
      }
    });
  }
  function subscribe(callback, applicationServerKey) {
    if (!isPushNotificationsSupported()) {
      return;
    }
    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: new Uint8Array(applicationServerKey.split("|")) // eslint-disable-line no-undef
      }).then(subscription => {
        sendSubscriptionToServer(subscription, true);
        if (callback) {
          callback();
        }
      }).catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
    });
  }
  function unsubscribe(user, callback) {
    if (!isPushNotificationsSupported()) {
      return;
    }
    keyValueStore.setItem(userSubscriptionKey(user), "");
    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.getSubscription().then(subscription => {
        if (subscription) {
          subscription.unsubscribe().then(successful => {
            if (successful) {
              (0, _ajax.ajax)("/push_notifications/unsubscribe", {
                type: "POST",
                data: {
                  subscription: subscription.toJSON()
                }
              });
            }
          });
        }
      }).catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
      if (callback) {
        callback();
      }
    });
  }
});