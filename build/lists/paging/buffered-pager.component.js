/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { RTBufferedPager, RTList } from '../providers/list';
var BufferedPagerComponent = /** @class */ (function () {
    function BufferedPagerComponent(pager, listService) {
        this.pager = pager;
        this.listService = listService;
        this.defaultRowCount = RTBufferedPager.settings.defaultRowCount;
        this.maxRowCount = RTBufferedPager.settings.maxRowCount;
        this.minRowCount = RTBufferedPager.settings.minRowCount;
        this.listService.pager = pager;
    }
    /**
     * @return {?}
     */
    BufferedPagerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.pager.takeRowCount = this.defaultRowCount * 1;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BufferedPagerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.defaultRowCount) {
            this.pager.defaultRowCount = changes.defaultRowCount.currentValue * 1;
        }
        if (changes.maxRowCount) {
            this.pager.maxRowCount = changes.maxRowCount.currentValue * 1;
        }
        if (changes.minRowCount) {
            this.pager.minRowCount = changes.minRowCount.currentValue * 1;
        }
    };
    Object.defineProperty(BufferedPagerComponent.prototype, "canLoadMore", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pager.canLoadMore;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BufferedPagerComponent.prototype.loadMore = /**
     * @return {?}
     */
    function () {
        if (this.canLoadMore) {
            return this.listService.loadData();
        }
        return null;
    };
    BufferedPagerComponent.decorators = [
        { type: Component, args: [{
                    providers: [{ provide: BufferedPager, useClass: RTBufferedPager }],
                    selector: 'rt-buffered-pager',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    BufferedPagerComponent.ctorParameters = function () { return [
        { type: BufferedPager },
        { type: RTList }
    ]; };
    BufferedPagerComponent.propDecorators = {
        defaultRowCount: [{ type: Input }],
        maxRowCount: [{ type: Input }],
        minRowCount: [{ type: Input }]
    };
    return BufferedPagerComponent;
}());
export { BufferedPagerComponent };
if (false) {
    /** @type {?} */
    BufferedPagerComponent.prototype.defaultRowCount;
    /** @type {?} */
    BufferedPagerComponent.prototype.maxRowCount;
    /** @type {?} */
    BufferedPagerComponent.prototype.minRowCount;
    /** @type {?} */
    BufferedPagerComponent.prototype.pager;
    /** @type {?} */
    BufferedPagerComponent.prototype.listService;
}
