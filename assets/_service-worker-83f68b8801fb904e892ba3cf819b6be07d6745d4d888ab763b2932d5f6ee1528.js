'use strict';

importScripts("/javascripts/workbox/workbox-sw.js");

workbox.setConfig({
  modulePathPrefix: "/javascripts/workbox",
  debug: false
});

var authUrls = ["auth", "session/sso_login", "session/sso"].map(path => `/${path}`);
var chatRegex = /\/chat\/channel\/(\d+)\//;
var inlineReplyIcon = "https://community.topazlabs.com/images/push-notifications/inline_reply.png";

var cacheVersion = "1";
var discourseCacheName = "discourse-" + cacheVersion;
var externalCacheName = "external-" + cacheVersion;

// Chrome 97 shipped with broken samesite cookie handling when proxying requests through service workers
// https://bugs.chromium.org/p/chromium/issues/detail?id=1286367
var chromeVersionMatch = navigator.userAgent.match(/Chrome\/97.0.(\d+)/);
var isBrokenChrome97 = chromeVersionMatch && parseInt(chromeVersionMatch[1]) <= 4692;
var isApple = /iPhone|iPod|Mac OS/.test(navigator.userAgent);

// Cache all GET requests, so Discourse can be used while offline
workbox.routing.registerRoute(
  function(args) {
    return args.url.origin === location.origin && !authUrls.some(u => args.url.pathname.startsWith(u)) && !isBrokenChrome97 && !isApple;
  }, // Match all except auth routes
  new workbox.strategies.NetworkFirst({ // This will only use the cache when a network request fails
    cacheName: discourseCacheName,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200] // opaque responses will return status code '0'
      }), // for s3 secure uploads signed urls
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7* 24 * 60 * 60, // 7 days
        maxEntries: 250,
        purgeOnQuotaError: true, // safe to automatically delete if exceeding the available storage
      }),
    ],
  })
);

var cdnUrls = [];


workbox.routing.registerRoute(
  function(args) {
    if (args.url.origin === location.origin) {
      return false;
    }

    var matching = cdnUrls.filter(
      function(url) {
        return args.url.href.startsWith(url);
      }
    );
    return matching.length === 0;
  }, // Match all other external resources
  new workbox.strategies.NetworkFirst({ // This will only use the cache when a network request fails
    cacheName: externalCacheName,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200] // opaque responses will return status code '0'
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7* 24 * 60 * 60, // 7 days
        maxEntries: 250,
        purgeOnQuotaError: true, // safe to automatically delete if exceeding the available storage
      }),
    ],
  })
);

var idleThresholdTime = 1000 * 10; // 10 seconds
var lastAction = -1;

function isIdle() {
  return lastAction + idleThresholdTime < Date.now();
}

function showNotification(title, body, icon, badge, tag, baseUrl, url) {
  var notificationOptions = {
    body: body,
    icon: icon,
    badge: badge,
    data: { url: url, baseUrl: baseUrl },
    tag: tag
  }

  if (chatRegex.test(url)) {
    notificationOptions['actions'] = [{
      action: "reply",
      title: "Reply",
      placeholder: "reply",
      type: "text",
      icon: inlineReplyIcon
    }];
  }

  return self.registration.showNotification(title, notificationOptions);
}

self.addEventListener('push', function(event) {
  var payload = event.data.json();
  if(!isIdle() && payload.hide_when_active) {
    return false;
  }

  event.waitUntil(
    self.registration.getNotifications({ tag: payload.tag }).then(function(notifications) {
      if (notifications && notifications.length > 0) {
        notifications.forEach(function(notification) {
          notification.close();
        });
      }

      return showNotification(payload.title, payload.body, payload.icon, payload.badge, payload.tag, payload.base_url, payload.url);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();
  var url = event.notification.data.url;
  var baseUrl = event.notification.data.baseUrl;

  if (event.action === "reply") {
    let csrf;
    fetch("/session/csrf", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        csrf = data.csrf;

        let chatTest = url.match(chatRegex);
        if (chatTest.length > 0) {
          let chatChannel = chatTest[1];

          fetch(`${baseUrl}/chat/${chatChannel}.json`, {
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "X-CSRF-Token": csrf,
            },
            body: `message=${event.reply}`,
            method: "POST",
            mode: "cors",
          });
        }
      });
  } else {
    // This looks to see if the current window is already open and
    // focuses if it is
    event.waitUntil(
      clients.matchAll({ type: "window" }).then(function (clientList) {
        var reusedClientWindow = clientList.some(function (client) {
          if (client.url === baseUrl + url && "focus" in client) {
            client.focus();
            return true;
          }

          if ("postMessage" in client && "focus" in client) {
            client.focus();
            client.postMessage({ url: url });
            return true;
          }
          return false;
        });

        if (!reusedClientWindow && clients.openWindow)
          return clients.openWindow(baseUrl + url);
      })
    );
  }
});

self.addEventListener('message', function(event) {
  if('lastAction' in event.data){
    lastAction = event.data.lastAction;
  }
});

self.addEventListener('pushsubscriptionchange', function(event) {
  event.waitUntil(
    Promise.all(
      fetch('https://community.topazlabs.com/push_notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: new URLSearchParams({
          "subscription[endpoint]": event.newSubscription.endpoint,
          "subscription[keys][auth]": event.newSubscription.toJSON().keys.auth,
          "subscription[keys][p256dh]": event.newSubscription.toJSON().keys.p256dh,
          "send_confirmation": false
        })
      }),
      fetch('https://community.topazlabs.com/push_notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: new URLSearchParams({
          "subscription[endpoint]": event.oldSubscription.endpoint,
          "subscription[keys][auth]": event.oldSubscription.toJSON().keys.auth,
          "subscription[keys][p256dh]": event.oldSubscription.toJSON().keys.p256dh
        })
      })
    )
  );
});

