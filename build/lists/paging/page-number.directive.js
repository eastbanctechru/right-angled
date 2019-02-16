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
import { PagedPager } from 'e2e4';
import { PagerInputBase } from './pager-input-base';
var PageNumberDirective = /** @class */ (function (_super) {
    __extends(PageNumberDirective, _super);
    function PageNumberDirective(pager, differs) {
        return _super.call(this, pager, differs, 'pageNumberInternal') || this;
    }
    Object.defineProperty(PageNumberDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pager.pageNumber;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.pager.pageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    PageNumberDirective.decorators = [
        { type: Directive, args: [{
                    /* tslint:disable-next-line:directive-selector */
                    selector: 'input[rtPageNumber]'
                },] },
    ];
    /** @nocollapse */
    PageNumberDirective.ctorParameters = function () { return [
        { type: PagedPager },
        { type: KeyValueDiffers }
    ]; };
    return PageNumberDirective;
}(PagerInputBase));
export { PageNumberDirective };
