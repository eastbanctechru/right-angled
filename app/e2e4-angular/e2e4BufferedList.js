System.register(['angular2/core', './ngBufferedListService'], function(exports_1, context_1) {
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
    var core_1, ngBufferedListService_1;
    var E2E4BufferedList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngBufferedListService_1_1) {
                ngBufferedListService_1 = ngBufferedListService_1_1;
            }],
        execute: function() {
            E2E4BufferedList = (function () {
                function E2E4BufferedList(ngBufferedListService) {
                    this.injectedBufferedListService = ngBufferedListService;
                }
                E2E4BufferedList.prototype.ngOnChanges = function (changes) {
                    this.injectedBufferedListService.normalizedService = changes.inputListService ?
                        changes.inputListService.currentValue : this.injectedBufferedListService;
                    if (changes.dataReadDelegate) {
                        this.injectedBufferedListService.normalizedService.dataReadDelegate = changes.dataReadDelegate.currentValue;
                    }
                    if (changes.items) {
                        this.injectedBufferedListService.normalizedService.items = changes.items.currentValue;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Function)
                ], E2E4BufferedList.prototype, "dataReadDelegate", void 0);
                __decorate([
                    core_1.Input('listService'), 
                    __metadata('design:type', ngBufferedListService_1.NgBufferedListService)
                ], E2E4BufferedList.prototype, "inputListService", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], E2E4BufferedList.prototype, "items", void 0);
                E2E4BufferedList = __decorate([
                    core_1.Component({
                        providers: [ngBufferedListService_1.NgBufferedListService],
                        selector: 'e2e4-buffered-list',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [ngBufferedListService_1.NgBufferedListService])
                ], E2E4BufferedList);
                return E2E4BufferedList;
            }());
            exports_1("E2E4BufferedList", E2E4BufferedList);
        }
    }
});
//# sourceMappingURL=e2e4BufferedList.js.map