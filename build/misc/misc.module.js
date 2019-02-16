/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusOnRenderDirective } from './focus-on-render.directive';
import { PreventDefaultsDirective } from './prevent-defaults.directive';
import { SelectOnFocusDirective } from './select-on-focus.directive';
import { StopEventsDirective } from './stop-events.directive';
var RTMiscModule = /** @class */ (function () {
    function RTMiscModule() {
    }
    RTMiscModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
                    exports: [FocusOnRenderDirective, SelectOnFocusDirective, StopEventsDirective, PreventDefaultsDirective],
                    imports: [CommonModule]
                },] },
    ];
    return RTMiscModule;
}());
export { RTMiscModule };
export { FocusOnRenderDirective } from './focus-on-render.directive';
export { SelectOnFocusDirective } from './select-on-focus.directive';
export { StopEventsDirective } from './stop-events.directive';
export { PreventDefaultsDirective } from './prevent-defaults.directive';
