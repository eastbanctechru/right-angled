System.register(['e2e4/src/pagedList', '../e2e4-angular/NullObjectStateManager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pagedList_1, NullObjectStateManager_1;
    var NgPagedListService;
    return {
        setters:[
            function (pagedList_1_1) {
                pagedList_1 = pagedList_1_1;
            },
            function (NullObjectStateManager_1_1) {
                NullObjectStateManager_1 = NullObjectStateManager_1_1;
            }],
        execute: function() {
            NgPagedListService = (function (_super) {
                __extends(NgPagedListService, _super);
                function NgPagedListService() {
                    _super.call(this, new NullObjectStateManager_1.NullObjectStateManager());
                    this.stateManager.target = this;
                    _super.prototype.init.call(this, {});
                }
                NgPagedListService.prototype.getDataReadPromise = function () {
                    return this.dataReadDelegate();
                };
                return NgPagedListService;
            }(pagedList_1.PagedList));
            exports_1("NgPagedListService", NgPagedListService);
        }
    }
});
//# sourceMappingURL=ngPagedListService.js.map