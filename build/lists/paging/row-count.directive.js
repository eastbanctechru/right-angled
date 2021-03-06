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
import { Directive, KeyValueDiffers } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { PagerInputBase } from './pager-input-base';
var RowCountDirective = /** @class */ (function (_super) {
    __extends(RowCountDirective, _super);
    function RowCountDirective(bufferedPager, differs) {
        return _super.call(this, bufferedPager, differs, 'takeRowCountInternal') || this;
    }
    Object.defineProperty(RowCountDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pager.takeRowCount;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.pager.takeRowCount = value;
        },
        enumerable: true,
        configurable: true
    });
    RowCountDirective.decorators = [
        { type: Directive, args: [{
                    /* tslint:disable-next-line:directive-selector */
                    selector: 'input[rtRowCount]'
                },] },
    ];
    /** @nocollapse */
    RowCountDirective.ctorParameters = function () { return [
        { type: BufferedPager },
        { type: KeyValueDiffers }
    ]; };
    return RowCountDirective;
}(PagerInputBase));
export { RowCountDirective };
