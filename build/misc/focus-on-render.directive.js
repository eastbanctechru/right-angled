/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
var FocusOnRenderDirective = /** @class */ (function () {
    function FocusOnRenderDirective(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    FocusOnRenderDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // we need set timeout for the cases when element itself is rendered by *ngIf directive and we need to wait it's rendering
        setTimeout(function () { return _this.elementRef.nativeElement.focus(); }, 0);
    };
    FocusOnRenderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtFocusOnRender]'
                },] },
    ];
    /** @nocollapse */
    FocusOnRenderDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return FocusOnRenderDirective;
}());
export { FocusOnRenderDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusOnRenderDirective.prototype.elementRef;
}
