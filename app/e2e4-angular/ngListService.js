System.register(['e2e4/src/list', '../e2e4-angular/NullObjectStateManager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var list_1, NullObjectStateManager_1;
    var NgListService;
    return {
        setters:[
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (NullObjectStateManager_1_1) {
                NullObjectStateManager_1 = NullObjectStateManager_1_1;
            }],
        execute: function() {
            NgListService = (function (_super) {
                __extends(NgListService, _super);
                function NgListService() {
                    _super.call(this, new NullObjectStateManager_1.NullObjectStateManager());
                    this.stateManager.target = this;
                    _super.prototype.init.call(this, {});
                }
                NgListService.prototype.getDataReadPromise = function () {
                    return this.dataReadDelegate();
                };
                return NgListService;
            }(list_1.List));
            exports_1("NgListService", NgListService);
        }
    }
});
//# sourceMappingURL=ngListService.js.map