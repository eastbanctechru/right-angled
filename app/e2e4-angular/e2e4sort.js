System.register(['angular2/core', 'e2e4/src/common/defaults', './ngListService', './ngPagedListService', './ngBufferedListService', 'e2e4/src/common/SortDirection'], function(exports_1, context_1) {
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
    var core_1, defaults_1, ngListService_1, ngPagedListService_1, ngBufferedListService_1, SortDirection_1;
    var E2E4Sort;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (ngListService_1_1) {
                ngListService_1 = ngListService_1_1;
            },
            function (ngPagedListService_1_1) {
                ngPagedListService_1 = ngPagedListService_1_1;
            },
            function (ngBufferedListService_1_1) {
                ngBufferedListService_1 = ngBufferedListService_1_1;
            },
            function (SortDirection_1_1) {
                SortDirection_1 = SortDirection_1_1;
            }],
        execute: function() {
            E2E4Sort = (function () {
                function E2E4Sort(el, ngListService, ngPagedListService, ngBufferedListService) {
                    this.listService = ngListService || ngPagedListService || ngBufferedListService;
                    this.clickHandlerBinded = this.clickHandler.bind(this);
                    this.checkElementClassesBinded = this.checkElementClasses.bind(this);
                    this.nativeElement = el.nativeElement;
                    this.nativeElement.classList.add(defaults_1.Defaults.sortAttribute.sortableClassName);
                }
                E2E4Sort.prototype.clickHandler = function (evt) {
                    if (this.listService.ready) {
                        this.listService.sortManager.setSort(this.columnName, evt.ctrlKey);
                        this.listService.onSortChangesCompleted();
                    }
                };
                E2E4Sort.prototype.ngOnChanges = function () {
                    this.checkElementClassesBinded();
                };
                E2E4Sort.prototype.checkElementClasses = function () {
                    var _this = this;
                    var existedSortIndex = this.listService.sortManager.sortings ?
                        this.listService.sortManager.sortings.findIndex(function (sp) { return sp.fieldName === _this.columnName; }) : -1;
                    if (existedSortIndex !== -1) {
                        var direction = this.listService.sortManager.sortings[existedSortIndex].direction;
                        this.nativeElement.classList.remove(direction === SortDirection_1.SortDirection.Asc ? defaults_1.Defaults.sortAttribute.descClassName : defaults_1.Defaults.sortAttribute.ascClassName);
                        this.nativeElement.classList.add(direction === SortDirection_1.SortDirection.Asc ? defaults_1.Defaults.sortAttribute.ascClassName : defaults_1.Defaults.sortAttribute.descClassName);
                    }
                    else {
                        this.nativeElement.classList.remove(defaults_1.Defaults.sortAttribute.ascClassName, defaults_1.Defaults.sortAttribute.descClassName);
                    }
                };
                __decorate([
                    core_1.Input('e2e4-sort'), 
                    __metadata('design:type', String)
                ], E2E4Sort.prototype, "columnName", void 0);
                E2E4Sort = __decorate([
                    core_1.Directive({
                        host: {
                            '(click)': 'clickHandlerBinded($event)'
                        },
                        selector: '[e2e4-sort]'
                    }),
                    __param(1, core_1.Optional()),
                    __param(2, core_1.Optional()),
                    __param(3, core_1.Optional()), 
                    __metadata('design:paramtypes', [core_1.ElementRef, ngListService_1.NgListService, ngPagedListService_1.NgPagedListService, ngBufferedListService_1.NgBufferedListService])
                ], E2E4Sort);
                return E2E4Sort;
            }());
            exports_1("E2E4Sort", E2E4Sort);
        }
    }
});
//# sourceMappingURL=e2e4Sort.js.map