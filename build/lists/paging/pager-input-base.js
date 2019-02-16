/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HostBinding, HostListener } from '@angular/core';
/**
 * @abstract
 */
var PagerInputBase = /** @class */ (function () {
    function PagerInputBase(pager, differs, changeTrackingKey) {
        var _this = this;
        this.pager = pager;
        this.checkValueChanged = function (item) {
            if (item.key === _this.changeTrackingKey && item.currentValue !== _this.innerValue) {
                _this.innerValue = item.currentValue;
            }
        };
        this.changeTrackingKey = changeTrackingKey;
        this.pagerDiffer = differs.find([]).create();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    PagerInputBase.prototype.setPageSize = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.innerValue = value;
        // tslint:disable-next-line:prefer-switch
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.value = value;
        setTimeout(function () { return (_this.innerValue = _this.value); }, 0);
    };
    /**
     * @return {?}
     */
    PagerInputBase.prototype.restoreInputValue = /**
     * @return {?}
     */
    function () {
        this.innerValue = this.value;
    };
    /**
     * @return {?}
     */
    PagerInputBase.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.restoreInputValue();
    };
    /**
     * @return {?}
     */
    PagerInputBase.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkValueChanged);
        }
    };
    PagerInputBase.propDecorators = {
        innerValue: [{ type: HostBinding, args: ['value',] }],
        setPageSize: [{ type: HostListener, args: ['input', ['$event.target.value'],] }],
        restoreInputValue: [{ type: HostListener, args: ['blur',] }]
    };
    return PagerInputBase;
}());
export { PagerInputBase };
if (false) {
    /** @type {?} */
    PagerInputBase.prototype.innerValue;
    /** @type {?} */
    PagerInputBase.prototype.changeTrackingKey;
    /**
     * @type {?}
     * @private
     */
    PagerInputBase.prototype.pagerDiffer;
    /**
     * @type {?}
     * @private
     */
    PagerInputBase.prototype.checkValueChanged;
    /** @type {?} */
    PagerInputBase.prototype.pager;
    /**
     * @abstract
     * @return {?}
     */
    PagerInputBase.prototype.value = function () { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    PagerInputBase.prototype.value = function (value) { };
}
