System.register(['angular2/core', './ngListServiceMediator', './ngListService', './ngBufferedListService', './ngPagedListService'], function(exports_1, context_1) {
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
    var core_1, ngListServiceMediator_1, ngListService_1, ngBufferedListService_1, ngPagedListService_1;
    var E2E4RowNumber;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngListServiceMediator_1_1) {
                ngListServiceMediator_1 = ngListServiceMediator_1_1;
            },
            function (ngListService_1_1) {
                ngListService_1 = ngListService_1_1;
            },
            function (ngBufferedListService_1_1) {
                ngBufferedListService_1 = ngBufferedListService_1_1;
            },
            function (ngPagedListService_1_1) {
                ngPagedListService_1 = ngPagedListService_1_1;
            }],
        execute: function() {
            E2E4RowNumber = (function () {
                function E2E4RowNumber(ngListServiceMediator) {
                    this.ngListServiceMediator = ngListServiceMediator;
                }
                E2E4RowNumber.prototype.ngOnChanges = function () {
                    if (this.ngListServiceMediator.instance instanceof ngListService_1.NgListService || this.ngListServiceMediator.instance instanceof ngBufferedListService_1.NgBufferedListService) {
                        this.rowNumber = this.index + 1;
                    }
                    else if (this.ngListServiceMediator.instance instanceof ngPagedListService_1.NgPagedListService) {
                        this.rowNumber = this.index + this.ngListServiceMediator.instance.displayFrom;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], E2E4RowNumber.prototype, "index", void 0);
                E2E4RowNumber = __decorate([
                    core_1.Component({
                        selector: 'row-number',
                        template: "{{rowNumber}}<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [ngListServiceMediator_1.NgListServiceMediator])
                ], E2E4RowNumber);
                return E2E4RowNumber;
            }());
            exports_1("E2E4RowNumber", E2E4RowNumber);
        }
    }
});
//# sourceMappingURL=e2e4RowNumber.js.map