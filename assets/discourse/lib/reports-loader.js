define("discourse/lib/reports-loader", ["exports", "discourse/lib/ajax", "discourse-common/lib/debounce"], function (_exports, _ajax, _debounce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/ajax",0,"discourse-common/lib/debounce"eaimeta@70e063a35619d71f
  let _queue = [];
  let _processing = 0;

  // max number of reports which will be requested in one bulk request
  const MAX_JOB_SIZE = 4;

  // max number of concurrent bulk requests
  const MAX_CONCURRENCY = 3;

  // max number of jobs stored, first entered jobs will be evicted first
  const MAX_QUEUE_SIZE = 20;
  const BULK_REPORTS_ENDPOINT = "/admin/reports/bulk";
  const DEBOUNCING_DELAY = 50;
  var _default = {
    enqueue(type, params, callback) {
      // makes sure the queue is not filling indefinitely
      if (_queue.length >= MAX_QUEUE_SIZE) {
        const removedJobs = _queue.splice(0, 1)[0];
        removedJobs.forEach(job => {
          // this is technically not a 429, but it's the result
          // of client doing too many requests so we want the same
          // behavior
          job.runnable()(429);
        });
      }
      _queue.push({
        runnable: () => callback,
        type,
        params
      });
      (0, _debounce.default)(this, this._processQueue, DEBOUNCING_DELAY);
    },
    _processQueue() {
      if (_queue.length === 0) {
        return;
      }
      if (_processing >= MAX_CONCURRENCY) {
        return;
      }
      _processing++;
      const jobs = _queue.splice(0, MAX_JOB_SIZE);

      // if queue has still jobs after splice, we request a future processing
      if (_queue.length > 0) {
        (0, _debounce.default)(this, this._processQueue, DEBOUNCING_DELAY);
      }
      let reports = {};
      jobs.forEach(job => {
        reports[job.type] = job.params;
      });
      (0, _ajax.ajax)(BULK_REPORTS_ENDPOINT, {
        data: {
          reports
        }
      }).then(response => {
        jobs.forEach(job => {
          const report = response.reports.findBy("type", job.type);
          job.runnable()(report);
        });
      }).catch(data => {
        jobs.forEach(job => {
          if (data.jqXHR && data.jqXHR.status === 429) {
            job.runnable()(429);
          } else if (data.jqXHR && data.jqXHR.status === 500) {
            job.runnable()(500);
          } else {
            job.runnable()();
          }
        });
      }).finally(() => {
        _processing--;
        (0, _debounce.default)(this, this._processQueue, DEBOUNCING_DELAY);
      });
    },
    _reset() {
      _queue = [];
      _processing = 0;
    }
  };
  _exports.default = _default;
});