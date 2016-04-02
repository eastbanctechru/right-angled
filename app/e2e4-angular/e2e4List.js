System.register(['angular2/core', './ngListService'], function(exports_1, context_1) {
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
    var core_1, ngListService_1;
    var E2E4List;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngListService_1_1) {
                ngListService_1 = ngListService_1_1;
            }],
        execute: function() {
            E2E4List = (function () {
                function E2E4List(ngListService) {
                    debugger;
                    this.ngListService = ngListService;
                }
                E2E4List.prototype.ngOnInit = function () {
                    debugger;
                    this.ngListService.dataReadDelegate = this.dataReadDelegate;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], E2E4List.prototype, "dataReadDelegate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], E2E4List.prototype, "items", void 0);
                E2E4List = __decorate([
                    core_1.Component({
                        providers: [ngListService_1.NgListService],
                        selector: 'e2e4-list',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [ngListService_1.NgListService])
                ], E2E4List);
                return E2E4List;
            }());
            exports_1("E2E4List", E2E4List);
        }
    }
});
//# sourceMappingURL=e2e4List.js.map