define("discourse/services/presence", ["exports", "@ember/service", "@ember/object", "discourse/lib/ajax", "@ember/runloop", "discourse-common/lib/later", "discourse/models/session", "rsvp", "discourse/models/user", "discourse/lib/user-presence", "discourse-common/utils/decorators", "@ember/object/evented", "discourse-common/config/environment", "discourse-common/lib/get-url"], function (_exports, _service, _object, _ajax, _runloop, _later, _session, _rsvp, _user, _userPresence, _decorators, _evented, _environment, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.PresenceChannelNotFound = void 0;
  var _dec, _dec2, _dec3, _class, _dec4, _class2, _class3;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/object",0,"discourse/lib/ajax",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/models/session",0,"rsvp",0,"discourse/models/user",0,"discourse/lib/user-presence",0,"discourse-common/utils/decorators",0,"@ember/object/evented",0,"discourse-common/config/environment",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const PRESENCE_INTERVAL_S = 30;
  const DEFAULT_PRESENCE_DEBOUNCE_MS = (0, _environment.isTesting)() ? 0 : 500;
  const PRESENCE_THROTTLE_MS = (0, _environment.isTesting)() ? 0 : 1000;
  const PRESENCE_GET_RETRY_MS = 5000;
  const DEFAULT_ACTIVE_OPTIONS = {
    userUnseenTime: 60000,
    browserHiddenTime: 10000
  };
  function createPromiseProxy() {
    const promiseProxy = {};
    promiseProxy.promise = new _rsvp.Promise((resolve, reject) => {
      promiseProxy.resolve = resolve;
      promiseProxy.reject = reject;
    });
    return promiseProxy;
  }
  class PresenceChannelNotFound extends Error {}

  // Instances of this class are handed out to consumers. They act as
  // convenient proxies to the PresenceService and PresenceServiceState
  // The 'change' event is fired whenever the users list or the count change
  _exports.PresenceChannelNotFound = PresenceChannelNotFound;
  let PresenceChannel = (_dec = (0, _object.computed)("_presenceState.users", "subscribed"), _dec2 = (0, _object.computed)("_presenceState.count", "subscribed"), _dec3 = (0, _object.computed)("_presenceState.count", "subscribed"), (_class = class PresenceChannel extends _object.default.extend(_evented.default) {
    init(_ref) {
      let {
        name,
        presenceService
      } = _ref;
      super.init(...arguments);
      this.name = name;
      this.presenceService = presenceService;
      this.set("present", false);
      this.set("subscribed", false);
    }

    // Mark the current user as 'present' in this channel
    // By default, the user will temporarily 'leave' the channel when
    // the current tab is in the background, or has no interaction for more than 60 seconds.
    // To override this behaviour, set onlyWhileActive: false
    // To specify custom thresholds, set `activeOptions`. See `lib/user-presence.js` for options.
    async enter() {
      let {
        onlyWhileActive = true,
        activeOptions = null
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (onlyWhileActive && activeOptions) {
        for (const key in DEFAULT_ACTIVE_OPTIONS) {
          if (activeOptions[key] < DEFAULT_ACTIVE_OPTIONS[key]) {
            throw `${key} cannot be less than ${DEFAULT_ACTIVE_OPTIONS[key]} (given ${activeOptions[key]})`;
          }
        }
      } else if (onlyWhileActive && !activeOptions) {
        activeOptions = DEFAULT_ACTIVE_OPTIONS;
      }
      this.setProperties({
        activeOptions
      });
      if (!this.present) {
        this.set("present", true);
        await this.presenceService._enter(this);
      }
    }

    // Mark the current user as leaving this channel
    async leave() {
      if (this.present) {
        this.set("present", false);
        await this.presenceService._leave(this);
      }
    }
    async subscribe() {
      let initialData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (this.subscribed) {
        return;
      }
      const state = await this.presenceService._subscribe(this, initialData);
      this.set("subscribed", true);
      this.set("_presenceState", state);
      this._publishChange();
      state.on("change", this._publishChange);
    }
    async unsubscribe() {
      if (!this.subscribed) {
        return;
      }
      await this.presenceService._unsubscribe(this);
      this.set("subscribed", false);
      this._presenceState.off("change", this._publishChange);
      this.set("_presenceState", null);
      this._publishChange();
    }
    _publishChange() {
      this.trigger("change", this);
    }
    get users() {
      if (!this.subscribed) {
        return;
      }
      return this._presenceState?.users;
    }
    get count() {
      if (!this.subscribed) {
        return;
      }
      return this._presenceState?.count;
    }
    get countOnly() {
      if (!this.subscribed) {
        return;
      }
      return this._presenceState?.countOnly;
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "_publishChange", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_publishChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "users", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "users"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "count", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "count"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "countOnly", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "countOnly"), _class.prototype)), _class));
  let PresenceChannelState = (_dec4 = (0, _object.computed)("_subscribedCallback"), (_class2 = class PresenceChannelState extends _object.default.extend(_evented.default) {
    init(_ref2) {
      let {
        name,
        presenceService
      } = _ref2;
      super.init(...arguments);
      this.name = name;
      this.set("users", null);
      this.set("count", null);
      this.set("countOnly", null);
      this.presenceService = presenceService;
    }

    // Is this PresenceChannel object currently subscribed to updates
    // from the server.
    get subscribed() {
      return !!this._subscribedCallback;
    }

    // Subscribe to server-side updates about the channel
    // Ideally, pass an initialData object with serialized PresenceChannel::State
    // data from the server (serialized via PresenceChannelStateSerializer).
    //
    // If initialData is not supplied, an AJAX request will be made for the information.
    async subscribe() {
      let initialData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (this.subscribed) {
        return;
      }
      if (!initialData) {
        initialData = await this.presenceService._getInitialData(this.name);
      }
      this.set("count", initialData.count);
      if (initialData.users) {
        this.set("users", initialData.users);
        this.set("countOnly", false);
      } else {
        this.set("users", null);
        this.set("countOnly", true);
      }
      this.lastSeenId = initialData.last_message_id;
      this.presenceService.messageBus.subscribe(`/presence${this.name}`, this._processMessage, this.lastSeenId);
      this.set("_subscribedCallback", this._processMessage);
      this.trigger("change");
    }

    // Stop subscribing to updates from the server about this channel
    unsubscribe() {
      if (this.subscribed) {
        this.presenceService.messageBus.unsubscribe(`/presence${this.name}`, this._subscribedCallback);
        this.set("_subscribedCallback", null);
        this.set("users", null);
        this.set("count", null);
        this.trigger("change");
      }
    }
    async _resubscribe() {
      this.unsubscribe();
      await this.subscribe();
    }
    async _processMessage(data, global_id, message_id) {
      if (message_id !== this.lastSeenId + 1) {
        // eslint-disable-next-line no-console
        console.log(`PresenceChannel '${this.name}' dropped message (received ${message_id}, expecting ${this.lastSeenId + 1}), resyncing...`);
        await this._resubscribe();
        return;
      }
      this.lastSeenId = message_id;
      if (this.countOnly && data.count_delta !== undefined) {
        this.set("count", this.count + data.count_delta);
        this.trigger("change");
      } else if (!this.countOnly && (data.entering_users || data.leaving_user_ids)) {
        if (data.entering_users) {
          const users = data.entering_users.map(u => _user.default.create(u));
          this.users.addObjects(users);
        }
        if (data.leaving_user_ids) {
          const leavingIds = new Set(data.leaving_user_ids);
          const toRemove = this.users.filter(u => leavingIds.has(u.id));
          this.users.removeObjects(toRemove);
        }
        this.set("count", this.users.length);
        this.trigger("change");
      } else {
        // Unexpected message
        await this._resubscribe();
        return;
      }
    }
  }, (_applyDecoratedDescriptor(_class2.prototype, "subscribed", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "subscribed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_processMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_class2.prototype, "_processMessage"), _class2.prototype)), _class2));
  let PresenceService = (_class3 = class PresenceService extends _service.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "_presenceDebounceMs", DEFAULT_PRESENCE_DEBOUNCE_MS);
    }
    init() {
      super.init(...arguments);
      this._queuedEvents = [];
      this._presenceChannelStates = new Map();
      this._presentProxies = new Map();
      this._subscribedProxies = new Map();
      this._initialDataRequests = new Map();
      if (this.currentUser) {
        window.addEventListener("beforeunload", this._beaconLeaveAll);
        (0, _userPresence.onPresenceChange)({
          ...DEFAULT_ACTIVE_OPTIONS,
          callback: this._throttledUpdateServer
        });
      }
    }
    get _presentChannels() {
      return new Set(this._presentProxies.keys());
    }
    willDestroy() {
      super.willDestroy(...arguments);
      window.removeEventListener("beforeunload", this._beaconLeaveAll);
      (0, _userPresence.removeOnPresenceChange)(this._throttledUpdateServer);
      (0, _runloop.cancel)(this._debounceTimer);
    }

    // Get a PresenceChannel object representing a single channel
    getChannel(channelName) {
      return PresenceChannel.create({
        name: channelName,
        presenceService: this
      });
    }
    _getInitialData(channelName) {
      let promiseProxy = this._initialDataRequests[channelName];
      if (!promiseProxy) {
        promiseProxy = this._initialDataRequests[channelName] = createPromiseProxy();
      }
      (0, _runloop.once)(this, this._makeInitialDataRequest);
      return promiseProxy.promise;
    }
    async _makeInitialDataRequest() {
      if (this._initialDataAjax) {
        // try again next runloop
        (0, _runloop.next)(this, () => (0, _runloop.once)(this, this._makeInitialDataRequest));
        return;
      }
      if (Object.keys(this._initialDataRequests).length === 0) {
        // Nothing to request
        return;
      }
      this._initialDataAjax = (0, _ajax.ajax)("/presence/get", {
        data: {
          channels: Object.keys(this._initialDataRequests).slice(0, 50)
        }
      });
      let result;
      try {
        result = await this._initialDataAjax;
      } catch (e) {
        (0, _later.default)(this, this._makeInitialDataRequest, PRESENCE_GET_RETRY_MS);
        throw e;
      } finally {
        this._initialDataAjax = null;
      }
      for (const channel in result) {
        if (!result.hasOwnProperty(channel)) {
          continue;
        }
        const state = result[channel];
        if (state) {
          this._initialDataRequests[channel].resolve(state);
        } else {
          const error = new PresenceChannelNotFound(`PresenceChannel '${channel}' not found`);
          this._initialDataRequests[channel].reject(error);
        }
        delete this._initialDataRequests[channel];
      }
    }
    _addPresent(channelProxy) {
      let present = this._presentProxies.get(channelProxy.name);
      if (!present) {
        present = new Set();
        this._presentProxies.set(channelProxy.name, present);
      }
      present.add(channelProxy);
      return present.size;
    }
    _removePresent(channelProxy) {
      let present = this._presentProxies.get(channelProxy.name);
      present?.delete(channelProxy);
      if (present?.size === 0) {
        this._presentProxies.delete(channelProxy.name);
      }
      return present?.size || 0;
    }
    _addSubscribed(channelProxy) {
      let subscribed = this._subscribedProxies.get(channelProxy.name);
      if (!subscribed) {
        subscribed = new Set();
        this._subscribedProxies.set(channelProxy.name, subscribed);
      }
      subscribed.add(channelProxy);
      return subscribed.size;
    }
    _removeSubscribed(channelProxy) {
      let subscribed = this._subscribedProxies.get(channelProxy.name);
      subscribed?.delete(channelProxy);
      if (subscribed?.size === 0) {
        this._subscribedProxies.delete(channelProxy.name);
      }
      return subscribed?.size || 0;
    }
    async _enter(channelProxy) {
      if (!this.currentUser) {
        throw "Must be logged in to enter presence channel";
      }
      const newCount = this._addPresent(channelProxy);
      if (newCount > 1) {
        return;
      }
      const promiseProxy = createPromiseProxy();
      this._queuedEvents.push({
        channel: channelProxy.name,
        type: "enter",
        promiseProxy
      });
      this._scheduleNextUpdate();
      await promiseProxy.promise;
    }
    async _leave(channelProxy) {
      if (!this.currentUser) {
        throw "Must be logged in to leave presence channel";
      }
      const presentCount = this._removePresent(channelProxy);
      if (presentCount > 0) {
        return;
      }
      const promiseProxy = createPromiseProxy();
      this._queuedEvents.push({
        channel: channelProxy.name,
        type: "leave",
        promiseProxy
      });
      this._scheduleNextUpdate();
      await promiseProxy.promise;
    }
    async _subscribe(channelProxy) {
      let initialData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.siteSettings.login_required && !this.currentUser) {
        throw "Presence is only available to authenticated users on login-required sites";
      }
      this._addSubscribed(channelProxy);
      const channelName = channelProxy.name;
      let state = this._presenceChannelStates.get(channelName);
      if (!state) {
        state = PresenceChannelState.create({
          name: channelName,
          presenceService: this
        });
        this._presenceChannelStates.set(channelName, state);
        await state.subscribe(initialData);
      }
      return state;
    }
    _unsubscribe(channelProxy) {
      const subscribedCount = this._removeSubscribed(channelProxy);
      if (subscribedCount === 0) {
        const channelName = channelProxy.name;
        this._presenceChannelStates.get(channelName).unsubscribe();
        this._presenceChannelStates.delete(channelName);
      }
    }
    _beaconLeaveAll() {
      if ((0, _environment.isTesting)()) {
        return;
      }
      this._dedupQueue();
      const channelsToLeave = this._queuedEvents.filter(e => e.type === "leave").map(e => e.channel);
      channelsToLeave.push(...this._presentChannels);
      if (channelsToLeave.length === 0) {
        return;
      }
      const data = new FormData();
      data.append("client_id", this.messageBus.clientId);
      channelsToLeave.forEach(ch => data.append("leave_channels[]", ch));
      data.append("authenticity_token", _session.default.currentProp("csrfToken"));
      navigator.sendBeacon((0, _getUrl.default)("/presence/update"), data);
    }
    _dedupQueue() {
      const deduplicated = {};
      this._queuedEvents.forEach(e => {
        if (deduplicated[e.channel]) {
          deduplicated[e.channel].promiseProxy.resolve(e.promiseProxy.promise);
        }
        deduplicated[e.channel] = e;
      });
      this._queuedEvents = Object.values(deduplicated);
    }
    async _updateServer() {
      this._lastUpdate = new Date();
      this._updateRunning = true;
      this._cancelTimer();
      this._dedupQueue();
      const queue = this._queuedEvents;
      this._queuedEvents = [];
      try {
        const presentChannels = [];
        const channelsToLeave = queue.filter(e => e.type === "leave").map(e => e.channel);
        for (const [channelName, proxies] of this._presentProxies) {
          if (Array.from(proxies).some(p => {
            return !p.activeOptions || (0, _userPresence.default)(p.activeOptions);
          })) {
            presentChannels.push(channelName);
          } else {
            channelsToLeave.push(channelName);
          }
        }
        if (queue.length === 0 && presentChannels.length === 0) {
          return;
        }
        const response = await (0, _ajax.ajax)("/presence/update", {
          data: {
            client_id: this.messageBus.clientId,
            present_channels: presentChannels,
            leave_channels: channelsToLeave
          },
          type: "POST"
        });
        queue.forEach(e => {
          if (response[e.channel] === false) {
            e.promiseProxy.reject(new PresenceChannelNotFound(`PresenceChannel '${e.channel}' not found`));
          } else {
            e.promiseProxy.resolve();
          }
        });
        this._presenceDebounceMs = DEFAULT_PRESENCE_DEBOUNCE_MS;
      } catch (e) {
        // Put the failed events back in the queue for next time
        this._queuedEvents.unshift(...queue);
        if (e.jqXHR?.status === 429) {
          // Rate limited
          const waitSeconds = e.jqXHR.responseJSON?.extras?.wait_seconds || 10;
          this._presenceDebounceMs = waitSeconds * 1000;
        } else {
          throw e;
        }
      } finally {
        this._updateRunning = false;
        this._scheduleNextUpdate();
      }
    }

    // `throttle` only allows triggering on the first **or** the last event
    // in a sequence of calls. We want both. We want the first event, to make
    // things very responsive. Then if things are happening too frequently, we
    // drop back to the last event via the regular throttle function.
    _throttledUpdateServer() {
      if (!this._lastUpdate || new Date() - this._lastUpdate > PRESENCE_THROTTLE_MS) {
        this._updateServer();
      } else {
        (0, _runloop.throttle)(this, this._updateServer, PRESENCE_THROTTLE_MS, false);
      }
    }
    _cancelTimer() {
      if (this._nextUpdateTimer) {
        (0, _runloop.cancel)(this._nextUpdateTimer);
        this._nextUpdateTimer = null;
      }
    }
    _scheduleNextUpdate() {
      if (this._updateRunning) {
        return;
      } else if (this._queuedEvents.length > 0) {
        this._cancelTimer();
        (0, _runloop.cancel)(this._debounceTimer);
        this._debounceTimer = (0, _runloop.debounce)(this, this._throttledUpdateServer, this._presenceDebounceMs);
      } else if (!this._nextUpdateTimer && this._presentChannels.length > 0 && !(0, _environment.isTesting)()) {
        this._nextUpdateTimer = (0, _later.default)(this, this._throttledUpdateServer, PRESENCE_INTERVAL_S * 1000);
      }
    }
  }, (_applyDecoratedDescriptor(_class3.prototype, "_beaconLeaveAll", [_decorators.bind], Object.getOwnPropertyDescriptor(_class3.prototype, "_beaconLeaveAll"), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, "_throttledUpdateServer", [_decorators.bind], Object.getOwnPropertyDescriptor(_class3.prototype, "_throttledUpdateServer"), _class3.prototype)), _class3);
  _exports.default = PresenceService;
});