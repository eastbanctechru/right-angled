/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectableDirective } from './selectable.directive';
import { SelectionAreaDirective } from './selection-area.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
var RTSelectionModule = /** @class */ (function () {
    function RTSelectionModule() {
    }
    RTSelectionModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SelectableDirective, SelectionAreaDirective, SelectionCheckboxForDirective],
                    exports: [SelectableDirective, SelectionAreaDirective, SelectionCheckboxForDirective],
                    imports: [CommonModule]
                },] },
    ];
    return RTSelectionModule;
}());
export { RTSelectionModule };
export { RTSelectionService } from './providers/selection-service';
export { RTSelectionEventsHelper } from './providers/selection-events-helper';
export { SelectableDirective } from './selectable.directive';
export { SelectionAreaDirective } from './selection-area.directive';
export { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
