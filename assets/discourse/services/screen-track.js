define("discourse/services/screen-track", ["exports", "@ember/service", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse-common/config/environment", "discourse/lib/topic-list-tracker", "@ember/runloop"], function (_exports, _service, _ajax, _decorators, _environment, _topicListTracker, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse-common/config/environment",0,"discourse/lib/topic-list-tracker",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  // We use this class to track how long posts in a topic are on the screen.
  const PAUSE_UNLESS_SCROLLED = 1000 * 60 * 3;
  const MAX_TRACKING_TIME = 1000 * 60 * 6;
  const ANON_MAX_TOPIC_IDS = 5;
  const AJAX_FAILURE_DELAYS = [5000, 10000, 20000, 40000];
  const ALLOWED_AJAX_FAILURES = [405, 429, 500, 501, 502, 503, 504];
  let ScreenTrack = (_class = class ScreenTrack extends _service.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "appEvents", _descriptor, this);
      _defineProperty(this, "_consolidatedTimings", []);
      _defineProperty(this, "_lastTick", null);
      _defineProperty(this, "_lastScrolled", null);
      _defineProperty(this, "_lastFlush", 0);
      _defineProperty(this, "_timings", {});
      _defineProperty(this, "_totalTimings", {});
      _defineProperty(this, "_topicTime", 0);
      _defineProperty(this, "_onscreen", []);
      _defineProperty(this, "_readOnscreen", []);
      _defineProperty(this, "_readPosts", {});
      _defineProperty(this, "_inProgress", false);
      this.reset();
    }
    start(topicId, topicController) {
      const currentTopicId = this._topicId;
      if (currentTopicId && currentTopicId !== topicId) {
        this.tick();
        this.flush();
      }
      this.reset();

      // Create an interval timer if we don't have one.
      if (!this._interval) {
        this._interval = setInterval(() => {
          (0, _runloop.run)(() => this.tick());
        }, 1000);
        window.addEventListener("scroll", this.scrolled);
      }
      this._topicId = topicId;
      this._topicController = topicController;
    }
    stop() {
      // already stopped no need to "extra stop"
      if (!this._topicId) {
        return;
      }
      window.removeEventListener("scroll", this.scrolled);
      this.tick();
      this.flush();
      this.reset();
      this._topicId = null;
      this._topicController = null;
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    setOnscreen(onscreen, readOnscreen) {
      this._onscreen = onscreen;
      this._readOnscreen = readOnscreen;
    }

    // Reset our timers
    reset() {
      const now = Date.now();
      this._lastTick = now;
      this._lastScrolled = now;
      this._lastFlush = 0;
      this._timings = {};
      this._totalTimings = {};
      this._topicTime = 0;
      this._onscreen = [];
      this._readOnscreen = [];
      this._readPosts = {};
      this._inProgress = false;
    }
    scrolled() {
      this._lastScrolled = Date.now();
    }
    registerAnonCallback(cb) {
      this._anonCallback = cb;
    }
    consolidateTimings(timings, topicTime, topicId) {
      let foundIndex = this._consolidatedTimings.findIndex(elem => elem.topicId === topicId);
      if (foundIndex > -1) {
        let found = this._consolidatedTimings[foundIndex];
        const lastIndex = this._consolidatedTimings.length - 1;
        if (foundIndex !== lastIndex) {
          const last = this._consolidatedTimings[lastIndex];
          this._consolidatedTimings[lastIndex] = found;
          this._consolidatedTimings[lastIndex - 1] = last;
        }
        const oldTimings = found.timings;
        Object.keys(oldTimings).forEach(id => {
          if (timings[id]) {
            oldTimings[id] += timings[id];
          }
        });
        found.topicTime += topicTime;
        found.timings = Object.assign({}, timings, found.timings);
      } else {
        this._consolidatedTimings.push({
          timings,
          topicTime,
          topicId
        });
      }
      const highestRead = parseInt(Object.keys(timings).lastObject, 10);
      const cachedHighestRead = this.highestReadFromCache(topicId);
      if (!cachedHighestRead || cachedHighestRead < highestRead) {
        (0, _topicListTracker.setHighestReadCache)(topicId, highestRead);
      }
      return this._consolidatedTimings;
    }
    highestReadFromCache(topicId) {
      return (0, _topicListTracker.getHighestReadCache)(topicId);
    }
    sendNextConsolidatedTiming() {
      if (this._consolidatedTimings.length === 0) {
        return;
      }
      if (this._inProgress) {
        return;
      }
      if (this._blockSendingToServerTill && this._blockSendingToServerTill > Date.now()) {
        return;
      }
      this._ajaxFailures = this._ajaxFailures || 0;
      const {
        timings,
        topicTime,
        topicId
      } = this._consolidatedTimings.pop();
      const data = {
        timings,
        topic_time: topicTime,
        topic_id: topicId
      };
      this._inProgress = true;
      return (0, _ajax.ajax)("/topics/timings", {
        data,
        type: "POST",
        headers: {
          "X-SILENCE-LOGGER": "true",
          "Discourse-Background": "true"
        }
      }).then(() => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this._ajaxFailures = 0;
        const topicController = this._topicController;
        if (topicController) {
          const postNumbers = Object.keys(timings).map(v => parseInt(v, 10));
          topicController.readPosts(topicId, postNumbers);
          const cachedHighestRead = this.highestReadFromCache(topicId);
          if (cachedHighestRead && cachedHighestRead <= postNumbers.lastObject) {
            (0, _topicListTracker.resetHighestReadCache)(topicId);
          }
        }
        this.appEvents.trigger("topic:timings-sent", data);
      }).catch(e => {
        if (e.jqXHR && ALLOWED_AJAX_FAILURES.includes(e.jqXHR.status)) {
          const delay = AJAX_FAILURE_DELAYS[this._ajaxFailures];
          this._ajaxFailures += 1;
          if (delay) {
            this._blockSendingToServerTill = Date.now() + delay;
            // we did not send to the server, got to re-queue it
            this.consolidateTimings(timings, topicTime, topicId);
          }
        }
        if (window.console && window.console.warn && e.jqXHR) {
          window.console.warn(`Failed to update topic times for topic ${topicId} due to ${e.jqXHR.status} error`);
        }
      }).finally(() => {
        this._inProgress = false;
        this._lastFlush = 0;
      });
    }
    flush() {
      const newTimings = {};
      const totalTimings = this._totalTimings;
      const timings = this._timings;
      Object.keys(this._timings).forEach(postNumber => {
        const time = timings[postNumber];
        totalTimings[postNumber] = totalTimings[postNumber] || 0;
        if (time > 0 && totalTimings[postNumber] < MAX_TRACKING_TIME) {
          totalTimings[postNumber] += time;
          newTimings[postNumber] = time;
        }
        timings[postNumber] = 0;
      });
      const topicId = parseInt(this._topicId, 10);
      let highestSeen = 0;

      // Workaround to avoid ignored posts being "stuck unread"
      const controller = this._topicController;
      const stream = controller ? controller.get("model.postStream") : null;
      if (this.currentUser &&
      // Logged in
      this.currentUser.get("ignored_users.length") &&
      // At least 1 user is ignored
      stream &&
      // Sanity check
      stream.hasNoFilters &&
      // The stream is not filtered (by username or summary)
      !stream.canAppendMore &&
      // We are at the end of the stream
      stream.posts.lastObject &&
      // The last post exists
      stream.posts.lastObject.read &&
      // The last post is read
      stream.gaps &&
      // The stream has gaps
      !!stream.gaps.after[stream.posts.lastObject.id] &&
      // Stream ends with a gap
      stream.topic.last_read_post_number !== stream.posts.lastObject.post_number + stream.get(`gaps.after.${stream.posts.lastObject.id}.length`) // The last post in the gap has not been marked read
      ) {
        newTimings[stream.posts.lastObject.post_number + stream.get(`gaps.after.${stream.posts.lastObject.id}.length`)] = 1;
      }
      const newTimingsKeys = Object.keys(newTimings);
      newTimingsKeys.forEach(postNumber => {
        highestSeen = Math.max(highestSeen, parseInt(postNumber, 10));
      });
      const highestSeenByTopic = this.session.get("highestSeenByTopic");
      if ((highestSeenByTopic[topicId] || 0) < highestSeen) {
        highestSeenByTopic[topicId] = highestSeen;
      }
      this.topicTrackingState.updateSeen(topicId, highestSeen);
      if (newTimingsKeys.length > 0) {
        if (this.currentUser) {
          this.consolidateTimings(newTimings, this._topicTime, topicId);
          if (!(0, _environment.isTesting)()) {
            this.sendNextConsolidatedTiming();
          }
        } else if (this._anonCallback) {
          // Anonymous viewer - save to localStorage
          const storage = this.keyValueStore;

          // Save total time
          const existingTime = storage.getInt("anon-topic-time");
          storage.setItem("anon-topic-time", existingTime + this._topicTime);

          // Save unique topic IDs up to a max
          let topicIds = storage.get("anon-topic-ids");
          if (topicIds) {
            topicIds = topicIds.split(",").map(e => parseInt(e, 10));
          } else {
            topicIds = [];
          }
          if (!topicIds.includes(topicId) && topicIds.length < ANON_MAX_TOPIC_IDS) {
            topicIds.push(topicId);
            storage.setItem("anon-topic-ids", topicIds.join(","));
          }

          // Inform the observer
          this._anonCallback();

          // No need to call controller.readPosts()
        }

        this._topicTime = 0;
      }
      this._lastFlush = 0;
    }
    tick() {
      const now = Date.now();

      // If the user hasn't scrolled the browser in a long time, stop tracking time read
      const sinceScrolled = now - this._lastScrolled;
      if (sinceScrolled > PAUSE_UNLESS_SCROLLED) {
        return;
      }
      const diff = now - this._lastTick;
      this._lastFlush += diff;
      this._lastTick = now;
      const totalTimings = this._totalTimings;
      const timings = this._timings;
      const nextFlush = this.siteSettings.flush_timings_secs * 1000;
      const rush = Object.keys(timings).some(postNumber => {
        return timings[postNumber] > 0 && !totalTimings[postNumber] && !this._readPosts[postNumber];
      });
      if (!this._inProgress && (this._lastFlush > nextFlush || rush)) {
        this.flush();
      }
      if (!this._inProgress) {
        // handles retries so there is no situation where we are stuck with a backlog
        this.sendNextConsolidatedTiming();
      }
      if (this.session.hasFocus) {
        this._topicTime += diff;
        this._onscreen.forEach(postNumber => timings[postNumber] = (timings[postNumber] || 0) + diff);
        this._readOnscreen.forEach(postNumber => {
          this._readPosts[postNumber] = true;
        });
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "appEvents", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "scrolled", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "scrolled"), _class.prototype)), _class);
  _exports.default = ScreenTrack;
});