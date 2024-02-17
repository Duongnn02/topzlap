define("discourse-common/lib/get-owner", ["exports", "@ember/application", "discourse-common/lib/deprecated"], function (_exports, _application, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getOwner = getOwner;
  _exports.getRegister = getRegister;
  _exports.setDefaultOwner = setDefaultOwner;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  let _default = {};
  function getOwner(obj) {
    if (_application.getOwner) {
      return (0, _application.getOwner)(obj || _default) || (0, _application.getOwner)(_default);
    }
    return obj.container;
  }
  function setDefaultOwner(container) {
    (0, _application.setOwner)(_default, container);
  }

  // `this.container` is deprecated, but we can still build a container-like
  // object for components to use
  function getRegister(obj) {
    const owner = getOwner(obj);
    const register = {
      lookup: function () {
        return owner.lookup(...arguments);
      },
      lookupFactory: function () {
        if (owner.factoryFor) {
          return owner.factoryFor(...arguments);
        } else if (owner._lookupFactory) {
          return owner._lookupFactory(...arguments);
        }
      },
      deprecateContainer(target) {
        Object.defineProperty(target, "container", {
          get() {
            (0, _deprecated.default)("Use `this.register` or `getOwner` instead of `this.container`", {
              id: "discourse.this-container"
            });
            return register;
          }
        });
      }
    };
    return register;
  }
});