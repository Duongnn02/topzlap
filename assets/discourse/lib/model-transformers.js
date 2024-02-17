define("discourse/lib/model-transformers", ["exports", "discourse/lib/source-identifier"], function (_exports, _sourceIdentifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.applyModelTransformations = applyModelTransformations;
  _exports.registerModelTransformer = registerModelTransformer;
  _exports.resetModelTransformers = resetModelTransformers;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/source-identifier"eaimeta@70e063a35619d71f
  let modelTransformersMap = {};
  function registerModelTransformer(modelName, func) {
    if (!modelTransformersMap[modelName]) {
      modelTransformersMap[modelName] = [];
    }
    const transformer = {
      prefix: (0, _sourceIdentifier.consolePrefix)(),
      execute: func
    };
    modelTransformersMap[modelName].push(transformer);
  }
  async function applyModelTransformations(modelName, models) {
    for (const transformer of modelTransformersMap[modelName] || []) {
      try {
        await transformer.execute(models);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(transformer.prefix, `transformer for the \`${modelName}\` model failed with:`, err, err.stack);
      }
    }
  }
  function resetModelTransformers() {
    modelTransformersMap = {};
  }
});