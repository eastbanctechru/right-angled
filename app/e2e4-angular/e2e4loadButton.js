System.register(['angular2/core', './ngListService', './ngPagedListService', './ngBufferedListService'], function(exports_1, context_1) {
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
    var core_1, ngListService_1, ngPagedListService_1, ngBufferedListService_1;
    var E2E4LoadButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngListService_1_1) {
                ngListService_1 = ngListService_1_1;
            },
            function (ngPagedListService_1_1) {
                ngPagedListService_1 = ngPagedListService_1_1;
            },
            function (ngBufferedListService_1_1) {
                ngBufferedListService_1 = ngBufferedListService_1_1;
            }],
        execute: function() {
            E2E4LoadButton = (function () {
                function E2E4LoadButton(ngListService, ngPagedListService, ngBufferedListService) {
                    this.listService = ngListService || ngPagedListService || ngBufferedListService;
                }
                E2E4LoadButton.prototype.loadData = function () {
                    this.listService.normalizedService.reloadData();
                };
                E2E4LoadButton = __decorate([
                    core_1.Component({
                        selector: 'e2e4-load-button',
                        template: "<div class=\"e2e4-button-host\" (click)=\"loadData()\"><ng-content></ng-content></div>"
                    }),
                    __param(0, core_1.Optional()),
                    __param(1, core_1.Optional()),
                    __param(2, core_1.Optional()), 
                    __metadata('design:paramtypes', [ngListService_1.NgListService, ngPagedListService_1.NgPagedListService, ngBufferedListService_1.NgBufferedListService])
                ], E2E4LoadButton);
                return E2E4LoadButton;
            }());
            exports_1("E2E4LoadButton", E2E4LoadButton);
        }
    }
});
//# sourceMappingURL=e2e4LoadButton.js.map