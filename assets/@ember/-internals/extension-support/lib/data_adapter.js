define("@ember/-internals/extension-support/lib/data_adapter", ["exports", "@ember/-internals/owner", "@ember/runloop", "@ember/-internals/metal", "@ember/string", "@ember/-internals/utils", "@ember/-internals/runtime", "@glimmer/validator"], function (_exports, _owner, _runloop, _metal, _string, _utils, _runtime, _validator) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function iterate(arr, fn) {
    if (_utils.HAS_NATIVE_SYMBOL && Symbol.iterator in arr) {
      for (var item of arr) {
        fn(item);
      }
    } else {
      arr.forEach(fn);
    }
  }
  class RecordsWatcher {
    getCacheForItem(record) {
      var recordCache = this.recordCaches.get(record);
      if (!recordCache) {
        var hasBeenAdded = false;
        recordCache = (0, _validator.createCache)(() => {
          if (!hasBeenAdded) {
            this.added.push(this.wrapRecord(record));
            hasBeenAdded = true;
          } else {
            this.updated.push(this.wrapRecord(record));
          }
        });
        this.recordCaches.set(record, recordCache);
      }
      return recordCache;
    }
    constructor(records, recordsAdded, recordsUpdated, recordsRemoved, wrapRecord, release) {
      this.recordCaches = new Map();
      this.added = [];
      this.updated = [];
      this.removed = [];
      this.release = release;
      this.wrapRecord = wrapRecord;
      this.recordArrayCache = (0, _validator.createCache)(() => {
        var seen = new Set(); // Track `[]` for legacy support

        (0, _validator.consumeTag)((0, _validator.tagFor)(records, '[]'));
        iterate(records, record => {
          (0, _validator.getValue)(this.getCacheForItem(record));
          seen.add(record);
        }); // Untrack this operation because these records are being removed, they
        // should not be polled again in the future

        (0, _validator.untrack)(() => {
          this.recordCaches.forEach((cache, record) => {
            if (!seen.has(record)) {
              this.removed.push(wrapRecord(record));
              this.recordCaches.delete(record);
            }
          });
        });
        if (this.added.length > 0) {
          recordsAdded(this.added);
          this.added = [];
        }
        if (this.updated.length > 0) {
          recordsUpdated(this.updated);
          this.updated = [];
        }
        if (this.removed.length > 0) {
          recordsRemoved(this.removed);
          this.removed = [];
        }
      });
    }
    revalidate() {
      (0, _validator.getValue)(this.recordArrayCache);
    }
  }
  class TypeWatcher {
    constructor(records, onChange, release) {
      var hasBeenAccessed = false;
      this.cache = (0, _validator.createCache)(() => {
        // Empty iteration, we're doing this just
        // to track changes to the records array
        iterate(records, () => {}); // Also track `[]` for legacy support

        (0, _validator.consumeTag)((0, _validator.tagFor)(records, '[]'));
        if (hasBeenAccessed === true) {
          onChange();
        } else {
          hasBeenAccessed = true;
        }
      });
      this.release = release;
    }
    revalidate() {
      (0, _validator.getValue)(this.cache);
    }
  }
  /**
  @module @ember/debug
  */

  /**
    The `DataAdapter` helps a data persistence library
    interface with tools that debug Ember such
    as the [Ember Inspector](https://github.com/emberjs/ember-inspector)
    for Chrome and Firefox.
  
    This class will be extended by a persistence library
    which will override some of the methods with
    library-specific code.
  
    The methods likely to be overridden are:
  
    * `getFilters`
    * `detect`
    * `columnsForType`
    * `getRecords`
    * `getRecordColumnValues`
    * `getRecordKeywords`
    * `getRecordFilterValues`
    * `getRecordColor`
  
    The adapter will need to be registered
    in the application's container as `dataAdapter:main`.
  
    Example:
  
    ```javascript
    Application.initializer({
      name: "data-adapter",
  
      initialize: function(application) {
        application.register('data-adapter:main', DS.DataAdapter);
      }
    });
    ```
  
    @class DataAdapter
    @extends EmberObject
    @public
  */
  var _default = _runtime.Object.extend({
    init() {
      this._super(...arguments);
      this.containerDebugAdapter = (0, _owner.getOwner)(this).lookup('container-debug-adapter:main');
      this.releaseMethods = (0, _runtime.A)();
      this.recordsWatchers = new Map();
      this.typeWatchers = new Map();
      this.flushWatchers = null;
    },
    /**
      The container-debug-adapter which is used
      to list all models.
       @property containerDebugAdapter
      @default undefined
      @since 1.5.0
      @public
    **/

    /**
      The number of attributes to send
      as columns. (Enough to make the record
      identifiable).
       @private
      @property attributeLimit
      @default 3
      @since 1.3.0
    */
    attributeLimit: 3,
    /**
       Ember Data > v1.0.0-beta.18
       requires string model names to be passed
       around instead of the actual factories.
        This is a stamp for the Ember Inspector
       to differentiate between the versions
       to be able to support older versions too.
        @public
       @property acceptsModelName
     */
    acceptsModelName: true,
    /**
       Map from records arrays to RecordsWatcher instances
        @private
       @property recordsWatchers
       @since 3.26.0
     */

    /**
      Map from records arrays to TypeWatcher instances
       @private
      @property typeWatchers
      @since 3.26.0
     */

    /**
      Callback that is currently scheduled on backburner end to flush and check
      all active watchers.
       @private
      @property flushWatchers
      @since 3.26.0
      */

    /**
      Stores all methods that clear observers.
      These methods will be called on destruction.
       @private
      @property releaseMethods
      @since 1.3.0
    */

    /**
      Specifies how records can be filtered.
      Records returned will need to have a `filterValues`
      property with a key for every name in the returned array.
       @public
      @method getFilters
      @return {Array} List of objects defining filters.
       The object should have a `name` and `desc` property.
    */
    getFilters() {
      return (0, _runtime.A)();
    },
    /**
      Fetch the model types and observe them for changes.
       @public
      @method watchModelTypes
       @param {Function} typesAdded Callback to call to add types.
      Takes an array of objects containing wrapped types (returned from `wrapModelType`).
       @param {Function} typesUpdated Callback to call when a type has changed.
      Takes an array of objects containing wrapped types.
       @return {Function} Method to call to remove all observers
    */
    watchModelTypes(typesAdded, typesUpdated) {
      var modelTypes = this.getModelTypes();
      var releaseMethods = (0, _runtime.A)();
      var typesToSend;
      typesToSend = modelTypes.map(type => {
        var klass = type.klass;
        var wrapped = this.wrapModelType(klass, type.name);
        releaseMethods.push(this.observeModelType(type.name, typesUpdated));
        return wrapped;
      });
      typesAdded(typesToSend);
      var release = () => {
        releaseMethods.forEach(fn => fn());
        this.releaseMethods.removeObject(release);
      };
      this.releaseMethods.pushObject(release);
      return release;
    },
    _nameToClass(type) {
      if (typeof type === 'string') {
        var owner = (0, _owner.getOwner)(this);
        var Factory = owner.factoryFor(`model:${type}`);
        type = Factory && Factory.class;
      }
      return type;
    },
    /**
      Fetch the records of a given type and observe them for changes.
       @public
      @method watchRecords
       @param {String} modelName The model name.
       @param {Function} recordsAdded Callback to call to add records.
      Takes an array of objects containing wrapped records.
      The object should have the following properties:
        columnValues: {Object} The key and value of a table cell.
        object: {Object} The actual record object.
       @param {Function} recordsUpdated Callback to call when a record has changed.
      Takes an array of objects containing wrapped records.
       @param {Function} recordsRemoved Callback to call when a record has removed.
      Takes an array of objects containing wrapped records.
       @return {Function} Method to call to remove all observers.
    */
    watchRecords(modelName, recordsAdded, recordsUpdated, recordsRemoved) {
      var klass = this._nameToClass(modelName);
      var records = this.getRecords(klass, modelName);
      var {
        recordsWatchers
      } = this;
      var recordsWatcher = recordsWatchers.get(records);
      if (!recordsWatcher) {
        recordsWatcher = new RecordsWatcher(records, recordsAdded, recordsUpdated, recordsRemoved, record => this.wrapRecord(record), () => {
          recordsWatchers.delete(records);
          this.updateFlushWatchers();
        });
        recordsWatchers.set(records, recordsWatcher);
        this.updateFlushWatchers();
        recordsWatcher.revalidate();
      }
      return recordsWatcher.release;
    },
    updateFlushWatchers() {
      if (this.flushWatchers === null) {
        if (this.typeWatchers.size > 0 || this.recordsWatchers.size > 0) {
          this.flushWatchers = () => {
            this.typeWatchers.forEach(watcher => watcher.revalidate());
            this.recordsWatchers.forEach(watcher => watcher.revalidate());
          };
          _runloop._backburner.on('end', this.flushWatchers);
        }
      } else if (this.typeWatchers.size === 0 && this.recordsWatchers.size === 0) {
        _runloop._backburner.off('end', this.flushWatchers);
        this.flushWatchers = null;
      }
    },
    /**
      Clear all observers before destruction
      @private
      @method willDestroy
    */
    willDestroy() {
      this._super(...arguments);
      this.typeWatchers.forEach(watcher => watcher.release());
      this.recordsWatchers.forEach(watcher => watcher.release());
      this.releaseMethods.forEach(fn => fn());
      if (this.flushWatchers) {
        _runloop._backburner.off('end', this.flushWatchers);
      }
    },
    /**
      Detect whether a class is a model.
       Test that against the model class
      of your persistence library.
       @public
      @method detect
      @return boolean Whether the class is a model class or not.
    */
    detect() {
      return false;
    },
    /**
      Get the columns for a given model type.
       @public
      @method columnsForType
      @return {Array} An array of columns of the following format:
       name: {String} The name of the column.
       desc: {String} Humanized description (what would show in a table column name).
    */
    columnsForType() {
      return (0, _runtime.A)();
    },
    /**
      Adds observers to a model type class.
       @private
      @method observeModelType
      @param {String} modelName The model type name.
      @param {Function} typesUpdated Called when a type is modified.
      @return {Function} The function to call to remove observers.
    */
    observeModelType(modelName, typesUpdated) {
      var klass = this._nameToClass(modelName);
      var records = this.getRecords(klass, modelName);
      var onChange = () => {
        typesUpdated([this.wrapModelType(klass, modelName)]);
      };
      var {
        typeWatchers
      } = this;
      var typeWatcher = typeWatchers.get(records);
      if (!typeWatcher) {
        typeWatcher = new TypeWatcher(records, onChange, () => {
          typeWatchers.delete(records);
          this.updateFlushWatchers();
        });
        typeWatchers.set(records, typeWatcher);
        this.updateFlushWatchers();
        typeWatcher.revalidate();
      }
      return typeWatcher.release;
    },
    /**
      Wraps a given model type and observes changes to it.
       @private
      @method wrapModelType
      @param {Class} klass A model class.
      @param {String} modelName Name of the class.
      @return {Object} Contains the wrapped type and the function to remove observers
      Format:
        type: {Object} The wrapped type.
          The wrapped type has the following format:
            name: {String} The name of the type.
            count: {Integer} The number of records available.
            columns: {Columns} An array of columns to describe the record.
            object: {Class} The actual Model type class.
        release: {Function} The function to remove observers.
    */
    wrapModelType(klass, name) {
      var records = this.getRecords(klass, name);
      var typeToSend;
      typeToSend = {
        name,
        count: (0, _metal.get)(records, 'length'),
        columns: this.columnsForType(klass),
        object: klass
      };
      return typeToSend;
    },
    /**
      Fetches all models defined in the application.
       @private
      @method getModelTypes
      @return {Array} Array of model types.
    */
    getModelTypes() {
      var containerDebugAdapter = this.get('containerDebugAdapter');
      var types;
      if (containerDebugAdapter.canCatalogEntriesByType('model')) {
        types = containerDebugAdapter.catalogEntriesByType('model');
      } else {
        types = this._getObjectsOnNamespaces();
      } // New adapters return strings instead of classes.

      types = (0, _runtime.A)(types).map(name => {
        return {
          klass: this._nameToClass(name),
          name
        };
      });
      types = (0, _runtime.A)(types).filter(type => this.detect(type.klass));
      return (0, _runtime.A)(types);
    },
    /**
      Loops over all namespaces and all objects
      attached to them.
       @private
      @method _getObjectsOnNamespaces
      @return {Array} Array of model type strings.
    */
    _getObjectsOnNamespaces() {
      var namespaces = (0, _runtime.A)(_runtime.Namespace.NAMESPACES);
      var types = (0, _runtime.A)();
      namespaces.forEach(namespace => {
        for (var key in namespace) {
          if (!Object.prototype.hasOwnProperty.call(namespace, key)) {
            continue;
          } // Even though we will filter again in `getModelTypes`,
          // we should not call `lookupFactory` on non-models

          if (!this.detect(namespace[key])) {
            continue;
          }
          var name = (0, _string.dasherize)(key);
          types.push(name);
        }
      });
      return types;
    },
    /**
      Fetches all loaded records for a given type.
       @public
      @method getRecords
      @return {Array} An array of records.
       This array will be observed for changes,
       so it should update when new records are added/removed.
    */
    getRecords() {
      return (0, _runtime.A)();
    },
    /**
      Wraps a record and observers changes to it.
       @private
      @method wrapRecord
      @param {Object} record The record instance.
      @return {Object} The wrapped record. Format:
      columnValues: {Array}
      searchKeywords: {Array}
    */
    wrapRecord(record) {
      var recordToSend = {
        object: record
      };
      recordToSend.columnValues = this.getRecordColumnValues(record);
      recordToSend.searchKeywords = this.getRecordKeywords(record);
      recordToSend.filterValues = this.getRecordFilterValues(record);
      recordToSend.color = this.getRecordColor(record);
      return recordToSend;
    },
    /**
      Gets the values for each column.
       @public
      @method getRecordColumnValues
      @return {Object} Keys should match column names defined
      by the model type.
    */
    getRecordColumnValues() {
      return {};
    },
    /**
      Returns keywords to match when searching records.
       @public
      @method getRecordKeywords
      @return {Array} Relevant keywords for search.
    */
    getRecordKeywords() {
      return (0, _runtime.A)();
    },
    /**
      Returns the values of filters defined by `getFilters`.
       @public
      @method getRecordFilterValues
      @param {Object} record The record instance.
      @return {Object} The filter values.
    */
    getRecordFilterValues() {
      return {};
    },
    /**
      Each record can have a color that represents its state.
       @public
      @method getRecordColor
      @param {Object} record The record instance
      @return {String} The records color.
        Possible options: black, red, blue, green.
    */
    getRecordColor() {
      return null;
    }
  });
  _exports.default = _default;
});