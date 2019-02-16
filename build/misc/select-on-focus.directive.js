/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
var SelectOnFocusDirective = /** @class */ (function () {
    function SelectOnFocusDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    SelectOnFocusDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.select([]);
    };
    SelectOnFocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtSelectOnFocus]'
                },] },
    ];
    /** @nocollapse */
    SelectOnFocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    SelectOnFocusDirective.propDecorators = {
        onFocus: [{ type: HostListener, args: ['focus',] }]
    };
    return SelectOnFocusDirective;
}());
export { SelectOnFocusDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SelectOnFocusDirective.prototype.elementRef;
}
