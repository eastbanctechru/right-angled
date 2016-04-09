System.register(['angular2/core', './ngPagedListService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ngPagedListService_1;
    var E2E4PagedList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngPagedListService_1_1) {
                ngPagedListService_1 = ngPagedListService_1_1;
            }],
        execute: function() {
            E2E4PagedList = (function () {
                function E2E4PagedList(ngPagedListService) {
                    this.injectedPagedListService = ngPagedListService;
                }
                E2E4PagedList.prototype.ngOnChanges = function (changes) {
                    this.injectedPagedListService.normalizedService = changes.inputListService ? changes.inputListService.currentValue : this.injectedPagedListService;
                    if (changes.dataReadDelegate) {
                        this.injectedPagedListService.normalizedService.dataReadDelegate = changes.dataReadDelegate.currentValue;
                    }
                    if (changes.items) {
                        this.injectedPagedListService.normalizedService.items = changes.items.currentValue;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], E2E4PagedList.prototype, "dataReadDelegate", void 0);
                __decorate([
                    core_1.Input('listService'), 
                    __metadata('design:type', ngPagedListService_1.NgPagedListService)
                ], E2E4PagedList.prototype, "inputListService", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], E2E4PagedList.prototype, "items", void 0);
                E2E4PagedList = __decorate([
                    core_1.Component({
                        providers: [ngPagedListService_1.NgPagedListService],
                        selector: 'e2e4-paged-list',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [ngPagedListService_1.NgPagedListService])
                ], E2E4PagedList);
                return E2E4PagedList;
            }());
            exports_1("E2E4PagedList", E2E4PagedList);
        }
    }
});
//# sourceMappingURL=e2e4PagedList.js.map