define("discourse/helpers/slow-mode", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cannotPostAgain = cannotPostAgain;
  _exports.durationTextFromSeconds = durationTextFromSeconds;
  _exports.fromSeconds = fromSeconds;
  _exports.toSeconds = toSeconds;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function fromSeconds(seconds) {
    let initialSeconds = seconds;
    let hours = Math.trunc(initialSeconds / 3600);
    if (hours >= 1) {
      initialSeconds = initialSeconds - 3600 * hours;
    } else {
      hours = 0;
    }
    let minutes = Math.trunc(initialSeconds / 60);
    if (minutes >= 1) {
      initialSeconds = initialSeconds - 60 * minutes;
    } else {
      minutes = 0;
    }
    return {
      hours,
      minutes,
      seconds: initialSeconds
    };
  }
  function toSeconds(hours, minutes, seconds) {
    const hoursAsSeconds = hours * 60 * 60;
    const minutesAsSeconds = minutes * 60;
    return seconds + hoursAsSeconds + minutesAsSeconds;
  }
  function durationTextFromSeconds(seconds) {
    return moment.duration(seconds, "seconds").humanize();
  }
  function cannotPostAgain(user, duration, last_posted_at) {
    let threshold = new Date(last_posted_at);
    threshold = new Date(threshold.getTime() + duration * 1000);
    return !user.staff && new Date() < threshold;
  }
});