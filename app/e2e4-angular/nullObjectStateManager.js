System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NullObjectStateManager;
    return {
        setters:[],
        execute: function() {
            NullObjectStateManager = (function () {
                function NullObjectStateManager() {
                }
                NullObjectStateManager.prototype.flushRequestState = function (state) {
                };
                NullObjectStateManager.prototype.persistLocalState = function (state) { };
                NullObjectStateManager.prototype.mergeStates = function (params) {
                    return params;
                };
                return NullObjectStateManager;
            }());
            exports_1("NullObjectStateManager", NullObjectStateManager);
        }
    }
});
//# sourceMappingURL=NullObjectStateManager.js.map