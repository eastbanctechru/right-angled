System.register(['angular2/core', './baseListService', '../e2e4-angular/e2e4List', '../e2e4-angular/e2e4LoadButton'], function(exports_1, context_1) {
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
    var core_1, baseListService_1, e2e4List_1, e2e4LoadButton_1;
    var BaseListSample;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (baseListService_1_1) {
                baseListService_1 = baseListService_1_1;
            },
            function (e2e4List_1_1) {
                e2e4List_1 = e2e4List_1_1;
            },
            function (e2e4LoadButton_1_1) {
                e2e4LoadButton_1 = e2e4LoadButton_1_1;
            }],
        execute: function() {
            BaseListSample = (function () {
                function BaseListSample(listComponentService) {
                    var _this = this;
                    this.message = 'Hello';
                    this.items = new Array();
                    this.loadData = function () {
                        return _this.listComponentService.getData({ sort: [] }).then(function (result) {
                            _this.items = result.items;
                            return result;
                        });
                    };
                    this.listComponentService = listComponentService;
                }
                BaseListSample.prototype.ngOnInit = function () {
                    var _this = this;
                    this.listComponentService.getData({ sort: [] }).then(function (result) { _this.items = result.items; });
                };
                BaseListSample = __decorate([
                    core_1.Component({
                        directives: [e2e4List_1.E2E4List, e2e4LoadButton_1.E2E4LoadButton],
                        providers: [baseListService_1.ListComponentService],
                        templateUrl: 'app/base-list-sample/baseListSample.html'
                    }), 
                    __metadata('design:paramtypes', [baseListService_1.ListComponentService])
                ], BaseListSample);
                return BaseListSample;
            }());
            exports_1("BaseListSample", BaseListSample);
        }
    }
});
//# sourceMappingURL=baseListSample.js.map