define("discourse/initializers/register-media-optimization-upload-processor", ["exports", "discourse/components/composer-editor", "discourse/lib/uppy-media-optimization-plugin", "rsvp"], function (_exports, _composerEditor, _uppyMediaOptimizationPlugin, _rsvp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/composer-editor",0,"discourse/lib/uppy-media-optimization-plugin",0,"rsvp"eaimeta@70e063a35619d71f
  var _default = {
    name: "register-media-optimization-upload-processor",
    initialize(container) {
      const siteSettings = container.lookup("service:site-settings");
      const capabilities = container.lookup("service:capabilities");
      if (siteSettings.composer_media_optimization_image_enabled) {
        // NOTE: There are various performance issues with the Canvas
        // in iOS Safari that are causing crashes when processing images
        // with spikes of over 100% CPU usage. The cause of this is unknown,
        // but profiling points to CanvasRenderingContext2D.getImageData()
        // and CanvasRenderingContext2D.drawImage().
        //
        // Until Safari makes some progress with OffscreenCanvas or other
        // alternatives we cannot support this workflow.
        //
        // TODO (martin): Revisit around 2022-06-01 to see the state of iOS Safari.
        if (capabilities.isIOS && !siteSettings.composer_ios_media_optimisation_image_enabled) {
          return;
        }
        (0, _composerEditor.addComposerUploadPreProcessor)(_uppyMediaOptimizationPlugin.default, _ref => {
          let {
            isMobileDevice
          } = _ref;
          return {
            optimizeFn: (data, opts) => {
              if (container.isDestroyed || container.isDestroying) {
                return _rsvp.Promise.resolve();
              }
              return container.lookup("service:media-optimization-worker").optimizeImage(data, opts);
            },
            runParallel: !isMobileDevice
          };
        });
      }
    }
  };
  _exports.default = _default;
});