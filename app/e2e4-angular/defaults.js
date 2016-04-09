System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Defaults;
    return {
        setters:[],
        execute: function() {
            Defaults = (function () {
                function Defaults() {
                }
                Defaults.sortAttribute = {
                    ascClassName: 'sort-asc',
                    descClassName: 'sort-desc',
                    sortableClassName: 'sortable'
                };
                Defaults.eventNames = {
                    selectableItemClicked: 'selectable-item-clicked'
                };
                return Defaults;
            }());
            exports_1("Defaults", Defaults);
        }
    }
});
//# sourceMappingURL=defaults.js.map