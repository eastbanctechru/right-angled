System.register(['angular2/core', './e2e4SelectionArea'], function(exports_1, context_1) {
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
    var core_1, e2e4SelectionArea_1;
    var E2E4SelectionCheckbox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (e2e4SelectionArea_1_1) {
                e2e4SelectionArea_1 = e2e4SelectionArea_1_1;
            }],
        execute: function() {
            E2E4SelectionCheckbox = (function () {
                function E2E4SelectionCheckbox(selectionArea) {
                    this.index = null;
                    this.selectionArea = selectionArea;
                }
                E2E4SelectionCheckbox.prototype.ngOnInit = function () {
                    if (this.item.selected === undefined) {
                        throw new Error('Binded item hasn\'t \'selected\' property and can\'t be used to match ISelectable interface');
                    }
                };
                E2E4SelectionCheckbox.prototype.changeHandler = function (evt) {
                    if (this.index === null) {
                        this.index = this.selectionArea.selectionManager.getItemIndex(this.item);
                    }
                    if (evt.target.checked) {
                        this.selectionArea.selectionManager.selectIndex(this.index, true);
                    }
                    else {
                        this.selectionArea.selectionManager.deselectIndex(this.index);
                    }
                };
                __decorate([
                    core_1.Input('for'), 
                    __metadata('design:type', Object)
                ], E2E4SelectionCheckbox.prototype, "item", void 0);
                E2E4SelectionCheckbox = __decorate([
                    core_1.Component({
                        selector: 'e2e4-selection-checkbox',
                        template: '<input type="checkbox" (change)="changeHandler($event)" [checked]="item.selected"/>'
                    }), 
                    __metadata('design:paramtypes', [e2e4SelectionArea_1.E2E4SelectionArea])
                ], E2E4SelectionCheckbox);
                return E2E4SelectionCheckbox;
            }());
            exports_1("E2E4SelectionCheckbox", E2E4SelectionCheckbox);
        }
    }
});
//# sourceMappingURL=e2e4SelectionCheckbox.js.map