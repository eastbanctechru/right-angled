/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { FiltersService } from 'e2e4';
var RegisterAsFilterDirective = /** @class */ (function () {
    function RegisterAsFilterDirective(filtersService) {
        this.filtersService = filtersService;
    }
    /**
     * @return {?}
     */
    RegisterAsFilterDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.filtersService.registerFilterTarget(this.filterTarget);
    };
    /**
     * @return {?}
     */
    RegisterAsFilterDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.filtersService.removeFilterTarget(this.filterTarget);
    };
    RegisterAsFilterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtRegisterAsFilter]'
                },] },
    ];
    /** @nocollapse */
    RegisterAsFilterDirective.ctorParameters = function () { return [
        { type: FiltersService }
    ]; };
    RegisterAsFilterDirective.propDecorators = {
        filterTarget: [{ type: Input, args: ['rtRegisterAsFilter',] }]
    };
    return RegisterAsFilterDirective;
}());
export { RegisterAsFilterDirective };
if (false) {
    /** @type {?} */
    RegisterAsFilterDirective.prototype.filterTarget;
    /** @type {?} */
    RegisterAsFilterDirective.prototype.filtersService;
}
