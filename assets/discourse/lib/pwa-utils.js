define("discourse/lib/pwa-utils", ["exports", "rsvp"], function (_exports, _rsvp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getNativeContact = getNativeContact;
  _exports.nativeShare = nativeShare;
  0; //eaimeta@70e063a35619d71f0,"rsvp"eaimeta@70e063a35619d71f
  function nativeShare(caps, data) {
    return new _rsvp.Promise((resolve, reject) => {
      if (!(caps.isIOS || caps.isAndroid || caps.isWinphone)) {
        reject();
        return;
      }
      if (window.location.protocol === "https:" && typeof window.navigator.share !== "undefined") {
        window.navigator.share(data).then(resolve).catch(e => {
          if (e.name === "AbortError") {
            // closing share panel do nothing
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }
  function getNativeContact(caps, properties, multiple) {
    return new _rsvp.Promise((resolve, reject) => {
      if (!caps.hasContactPicker) {
        return reject();
      }
      navigator.contacts.select(properties, {
        multiple
      }).then(resolve).catch(reject);
    });
  }
});