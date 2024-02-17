define("discourse/services/media-optimization-worker", ["exports", "@ember/service", "@ember/application", "rsvp", "discourse/lib/media-optimization-utils", "discourse-common/lib/get-url"], function (_exports, _service, _application, _rsvp, _mediaOptimizationUtils, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/application",0,"rsvp",0,"discourse/lib/media-optimization-utils",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  /**
   * This worker follows a particular promise/callback flow to ensure
   * that the media-optimization-worker is installed and has its libraries
   * loaded before optimizations can happen. The flow:
   *
   * 1. optimizeImage called
   * 2. worker initialized and started
   * 3. message handlers for worker registered
   * 4. "install" message posted to worker
   * 5. "installed" message received from worker
   * 6. optimizeImage continues, posting "compress" message to worker
   *
   * When the worker is being installed, all other calls to optimizeImage
   * will wait for the "installed" message to be handled before continuing
   * with any image optimization work.
   */
  class MediaOptimizationWorkerService extends _service.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "appEvents", (0, _application.getOwner)(this).lookup("service:app-events"));
      _defineProperty(this, "worker", null);
      _defineProperty(this, "workerUrl", (0, _getUrl.getAbsoluteURL)("/javascripts/media-optimization-worker.js"));
      _defineProperty(this, "currentComposerUploadData", null);
      _defineProperty(this, "promiseResolvers", null);
    }
    async optimizeImage(data) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.promiseResolvers = this.promiseResolvers || {};
      this.stopWorkerOnError = opts.hasOwnProperty("stopWorkerOnError") ? opts.stopWorkerOnError : true;
      let file = data;
      if (!/(\.|\/)(jpe?g|png|webp)$/i.test(file.type)) {
        return _rsvp.Promise.resolve();
      }
      if (file.size < this.siteSettings.composer_media_optimization_image_bytes_optimization_threshold) {
        this.logIfDebug(`The file ${file.name} was less than the image optimization bytes threshold (${this.siteSettings.composer_media_optimization_image_bytes_optimization_threshold} bytes), skipping.`, file);
        return _rsvp.Promise.resolve();
      }
      await this.ensureAvailableWorker();
      return new _rsvp.Promise(async resolve => {
        this.logIfDebug(`Transforming ${file.name}`);
        this.currentComposerUploadData = data;
        this.promiseResolvers[file.id] = resolve;
        let imageData;
        try {
          imageData = await (0, _mediaOptimizationUtils.fileToImageData)(file.data);
        } catch (error) {
          this.logIfDebug(error);
          return resolve();
        }
        this.worker.postMessage({
          type: "compress",
          fileId: file.id,
          file: imageData.data.buffer,
          fileName: file.name,
          width: imageData.width,
          height: imageData.height,
          settings: {
            resize_threshold: this.siteSettings.composer_media_optimization_image_resize_dimensions_threshold,
            resize_target: this.siteSettings.composer_media_optimization_image_resize_width_target,
            resize_pre_multiply: this.siteSettings.composer_media_optimization_image_resize_pre_multiply,
            resize_linear_rgb: this.siteSettings.composer_media_optimization_image_resize_linear_rgb,
            encode_quality: this.siteSettings.composer_media_optimization_image_encode_quality,
            debug_mode: this.siteSettings.composer_media_optimization_debug_mode
          }
        }, [imageData.data.buffer]);
      });
    }
    async ensureAvailableWorker() {
      if (this.worker && this.workerInstalled) {
        return _rsvp.Promise.resolve();
      }
      if (this.installPromise) {
        return this.installPromise;
      }
      return this.install();
    }
    async install() {
      this.installPromise = new _rsvp.Promise((resolve, reject) => {
        this.afterInstalled = resolve;
        this.failedInstall = reject;
        this.logIfDebug("Installing worker.");
        this.startWorker();
        this.registerMessageHandler();
        this.worker.postMessage({
          type: "install",
          settings: {
            mozjpeg_script: (0, _getUrl.getURLWithCDN)("/javascripts/squoosh/mozjpeg_enc.js"),
            mozjpeg_wasm: (0, _getUrl.getURLWithCDN)("/javascripts/squoosh/mozjpeg_enc.wasm"),
            resize_script: (0, _getUrl.getURLWithCDN)("/javascripts/squoosh/squoosh_resize.js"),
            resize_wasm: (0, _getUrl.getURLWithCDN)("/javascripts/squoosh/squoosh_resize_bg.wasm")
          }
        });
        this.appEvents.on("composer:closed", this, "stopWorker");
      });
      return this.installPromise;
    }
    startWorker() {
      this.logIfDebug("Starting media-optimization-worker");
      this.worker = new Worker(this.workerUrl); // TODO come up with a workaround for FF that lacks type: module support
    }

    stopWorker() {
      if (this.worker) {
        this.logIfDebug("Stopping media-optimization-worker...");
        this.workerInstalled = false;
        this.worker.terminate();
        this.worker = null;
      }
    }
    registerMessageHandler() {
      this.worker.onmessage = e => {
        switch (e.data.type) {
          case "file":
            let optimizedFile = new File([e.data.file], e.data.fileName, {
              type: "image/jpeg"
            });
            this.logIfDebug(`Finished optimization of ${optimizedFile.name} new size: ${optimizedFile.size}.`);
            this.promiseResolvers[e.data.fileId](optimizedFile);
            break;
          case "error":
            this.logIfDebug(`Handling error message from image optimization for ${e.data.fileName}.`);
            if (this.stopWorkerOnError) {
              this.stopWorker();
            }
            this.promiseResolvers[e.data.fileId]();
            break;
          case "installed":
            this.logIfDebug("Worker installed.");
            this.workerInstalled = true;
            this.afterInstalled();
            this.cleanupInstallPromises();
            break;
          case "installFailed":
            this.logIfDebug("Worker failed to install.");
            this.failedInstall(e.data.errorMessage);
            this.cleanupInstallPromises();
            break;
          default:
            this.logIfDebug(`Sorry, we are out of ${e}.`);
        }
      };
    }
    cleanupInstallPromises() {
      this.afterInstalled = null;
      this.failedInstall = null;
      this.installPromise = null;
    }
    logIfDebug() {
      if (this.siteSettings.composer_media_optimization_debug_mode) {
        // eslint-disable-next-line no-console
        console.log(...arguments);
      }
    }
  }
  _exports.default = MediaOptimizationWorkerService;
});