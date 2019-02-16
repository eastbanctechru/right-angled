/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var RowNumberPipe = /** @class */ (function () {
    function RowNumberPipe() {
    }
    /**
     * @param {?} index
     * @param {?} rtList
     * @return {?}
     */
    RowNumberPipe.prototype.transform = /**
     * @param {?} index
     * @param {?} rtList
     * @return {?}
     */
    function (index, rtList) {
        if (index !== 0 && (!index || isNaN(index))) {
            throw new Error('Invalid input value for rtRowNumber pipe. Must be a valid numeric value.');
        }
        if (!rtList) {
            throw new Error('Invalid value provided for parameter "rtList" of rtRowNumber pipe . Must be "rtList" directive instance.');
        }
        if (rtList.listService.pager !== null && ((/** @type {?} */ (rtList.listService.pager))).displayFrom) {
            return index + ((/** @type {?} */ (rtList.listService.pager))).displayFrom;
        }
        else {
            return index + 1;
        }
    };
    RowNumberPipe.decorators = [
        { type: Pipe, args: [{ name: 'rtRowNumber' },] },
    ];
    return RowNumberPipe;
}());
export { RowNumberPipe };
