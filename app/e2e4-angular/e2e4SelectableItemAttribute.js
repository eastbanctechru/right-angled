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
    var E2E4SelectableItemAttribute;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (e2e4SelectionArea_1_1) {
                e2e4SelectionArea_1 = e2e4SelectionArea_1_1;
            }],
        execute: function() {
            E2E4SelectableItemAttribute = (function () {
                function E2E4SelectableItemAttribute(selectionArea) {
                    this.selectionArea = selectionArea;
                }
                E2E4SelectableItemAttribute.prototype.mouseUpHandler = function (event) {
                    this.selectionArea.selectionEventsHelper.mouseHandler(event, this.index, this.item);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], E2E4SelectableItemAttribute.prototype, "index", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], E2E4SelectableItemAttribute.prototype, "item", void 0);
                E2E4SelectableItemAttribute = __decorate([
                    core_1.Directive({
                        host: {
                            '(mouseup)': 'mouseUpHandler($event)'
                        },
                        selector: '[e2e4-selectable-item]'
                    }), 
                    __metadata('design:paramtypes', [e2e4SelectionArea_1.E2E4SelectionArea])
                ], E2E4SelectableItemAttribute);
                return E2E4SelectableItemAttribute;
            }());
            exports_1("E2E4SelectableItemAttribute", E2E4SelectableItemAttribute);
        }
    }
});
//# sourceMappingURL=e2e4SelectableItemAttribute.js.map