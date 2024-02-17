define("discourse/components/directory-table", ["exports", "@ember/component", "@ember/template-factory", "@ember/object"], function (_exports, _component, _templateFactory, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ResponsiveTable>
    <:header>
      <TableHeaderToggle
        @field="username"
        @order={{this.order}}
        @asc={{this.asc}}
      />
      {{#each this.columns as |column|}}
        <TableHeaderToggle
          @field={{column.name}}
          @icon={{column.icon}}
          @order={{this.order}}
          @asc={{this.asc}}
          @automatic={{directory-column-is-automatic column=column}}
          @translated={{column.user_field_id}}
          @onActiveRender={{this.setActiveHeader}}
        />
      {{/each}}
  
      {{#if this.showTimeRead}}
        <div class="directory-table__column-header">
          <div class="header-contents">
            {{i18n "directory.time_read"}}
          </div>
        </div>
      {{/if}}
    </:header>
    <:body>
      {{#each this.items as |item|}}
        <DirectoryItem
          @item={{item}}
          @columns={{this.columns}}
          @showTimeRead={{this.showTimeRead}}
        />
      {{/each}}
    </:body>
  </ResponsiveTable>
  */
  {
    "id": "l/tNHSdq",
    "block": "[[[8,[39,0],null,null,[[\"header\",\"body\"],[[[[1,\"\\n    \"],[8,[39,1],null,[[\"@field\",\"@order\",\"@asc\"],[\"username\",[30,0,[\"order\"]],[30,0,[\"asc\"]]]],null],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"columns\"]]],null]],null],null,[[[1,\"      \"],[8,[39,1],null,[[\"@field\",\"@icon\",\"@order\",\"@asc\",\"@automatic\",\"@translated\",\"@onActiveRender\"],[[30,1,[\"name\"]],[30,1,[\"icon\"]],[30,0,[\"order\"]],[30,0,[\"asc\"]],[28,[37,4],null,[[\"column\"],[[30,1]]]],[30,1,[\"user_field_id\"]],[30,0,[\"setActiveHeader\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[41,[30,0,[\"showTimeRead\"]],[[[1,\"      \"],[10,0],[14,0,\"directory-table__column-header\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"header-contents\"],[12],[1,\"\\n          \"],[1,[28,[35,6],[\"directory.time_read\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]],[[[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"items\"]]],null]],null],null,[[[1,\"      \"],[8,[39,7],null,[[\"@item\",\"@columns\",\"@showTimeRead\"],[[30,2],[30,0,[\"columns\"]],[30,0,[\"showTimeRead\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"  \"]],[]]]]]],[\"column\",\"item\"],false,[\"responsive-table\",\"table-header-toggle\",\"each\",\"-track-array\",\"directory-column-is-automatic\",\"if\",\"i18n\",\"directory-item\"]]",
    "moduleName": "discourse/components/directory-table.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    _table: null,
    didInsertElement() {
      this._super(...arguments);
      this.setProperties({
        _table: this.element.querySelector(".directory-table"),
        _columnCount: this.showTimeRead ? this.attrs.columns.value.length + 1 : this.attrs.columns.value.length
      });
      this._table.style.gridTemplateColumns = `minmax(13em, 3fr) repeat(${this._columnCount}, minmax(max-content, 1fr))`;
    },
    setActiveHeader(header) {
      // After render, scroll table left to ensure the order by column is visible
      if (!this._table) {
        this.set("_table", document.querySelector(".directory-table"));
      }
      const scrollPixels = header.offsetLeft + header.offsetWidth + 10 - this._table.offsetWidth;
      if (scrollPixels > 0) {
        this._table.scrollLeft = scrollPixels;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "setActiveHeader", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setActiveHeader"), _obj)), _obj)));
  _exports.default = _default;
});