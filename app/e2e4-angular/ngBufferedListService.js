System.register(['e2e4/src/bufferedList', '../e2e4-angular/NullObjectStateManager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var bufferedList_1, NullObjectStateManager_1;
    var NgBufferedListService;
    return {
        setters:[
            function (bufferedList_1_1) {
                bufferedList_1 = bufferedList_1_1;
            },
            function (NullObjectStateManager_1_1) {
                NullObjectStateManager_1 = NullObjectStateManager_1_1;
            }],
        execute: function() {
            NgBufferedListService = (function (_super) {
                __extends(NgBufferedListService, _super);
                function NgBufferedListService() {
                    _super.call(this, new NullObjectStateManager_1.NullObjectStateManager());
                    this.stateManager.target = this;
                    _super.prototype.init.call(this, {});
                }
                NgBufferedListService.prototype.getDataReadPromise = function () {
                    return this.dataReadDelegate();
                };
                return NgBufferedListService;
            }(bufferedList_1.BufferedList));
            exports_1("NgBufferedListService", NgBufferedListService);
        }
    }
});
//# sourceMappingURL=ngBufferedListService.js.map