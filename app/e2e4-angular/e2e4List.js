System.register(['angular2/core', './ngListServiceMediator'], function(exports_1, context_1) {
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
    var core_1, ngListServiceMediator_1;
    var E2E4List;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ngListServiceMediator_1_1) {
                ngListServiceMediator_1 = ngListServiceMediator_1_1;
            }],
        execute: function() {
            E2E4List = (function () {
                function E2E4List(ngListServiceMediator) {
                    this.ngListServiceMediator = ngListServiceMediator;
                }
                E2E4List.prototype.ngOnChanges = function (changes) {
                    if (changes.items) {
                        this.ngListServiceMediator.instance.items = changes.items.currentValue;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], E2E4List.prototype, "items", void 0);
                E2E4List = __decorate([
                    core_1.Component({
                        providers: [ngListServiceMediator_1.NgListServiceMediator],
                        selector: 'e2e4-list',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [ngListServiceMediator_1.NgListServiceMediator])
                ], E2E4List);
                return E2E4List;
            }());
            exports_1("E2E4List", E2E4List);
        }
    }
});
//# sourceMappingURL=e2e4List.js.map