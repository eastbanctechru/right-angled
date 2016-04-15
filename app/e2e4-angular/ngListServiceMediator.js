System.register(['angular2/core', './ngBufferedListService', './ngPagedListService', './ngListService'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, ngBufferedListService_1, ngPagedListService_1, ngListService_1;
    var NgListServiceMediator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngBufferedListService_1_1) {
                ngBufferedListService_1 = ngBufferedListService_1_1;
            },
            function (ngPagedListService_1_1) {
                ngPagedListService_1 = ngPagedListService_1_1;
            },
            function (ngListService_1_1) {
                ngListService_1 = ngListService_1_1;
            }],
        execute: function() {
            NgListServiceMediator = (function () {
                function NgListServiceMediator(bufferedList, pagedList, simpleList) {
                    this.bufferedListService = bufferedList;
                    this.pagedListService = pagedList;
                    this.simpleListService = simpleList;
                }
                Object.defineProperty(NgListServiceMediator.prototype, "instance", {
                    get: function () {
                        return this.simpleListService || this.bufferedListService || this.pagedListService;
                    },
                    enumerable: true,
                    configurable: true
                });
                NgListServiceMediator = __decorate([
                    __param(0, core_1.Optional()),
                    __param(1, core_1.Optional()),
                    __param(2, core_1.Optional()), 
                    __metadata('design:paramtypes', [ngBufferedListService_1.NgBufferedListService, ngPagedListService_1.NgPagedListService, ngListService_1.NgListService])
                ], NgListServiceMediator);
                return NgListServiceMediator;
            }());
            exports_1("NgListServiceMediator", NgListServiceMediator);
        }
    }
});
//# sourceMappingURL=ngListServiceMediator.js.map