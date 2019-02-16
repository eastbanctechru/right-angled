var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { EventsAttacherBase } from './events-attacher.base';
var PreventDefaultsDirective = /** @class */ (function (_super) {
    __extends(PreventDefaultsDirective, _super);
    function PreventDefaultsDirective(elementRef, renderer) {
        return _super.call(this, elementRef, renderer, function (evt) {
            evt.preventDefault();
        }) || this;
    }
    PreventDefaultsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtPreventDefaults]'
                },] },
    ];
    /** @nocollapse */
    PreventDefaultsDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    PreventDefaultsDirective.propDecorators = {
        eventNames: [{ type: Input, args: ['rtPreventDefaults',] }]
    };
    return PreventDefaultsDirective;
}(EventsAttacherBase));
export { PreventDefaultsDirective };
if (false) {
    /** @type {?} */
    PreventDefaultsDirective.prototype.eventNames;
}
