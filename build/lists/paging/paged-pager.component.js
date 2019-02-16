/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { PagedPager } from 'e2e4';
import { RTList, RTPagedPager } from '../providers/list';
var PagedPagerComponent = /** @class */ (function () {
    function PagedPagerComponent(pager, listService) {
        this.pager = pager;
        this.listService = listService;
        this.defaultPageSize = PagedPager.settings.defaultPageSize;
        this.maxPageSize = PagedPager.settings.maxPageSize;
        this.minPageSize = PagedPager.settings.minPageSize;
        listService.pager = pager;
    }
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.pager.pageSize = this.defaultPageSize * 1;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PagedPagerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.defaultPageSize) {
            this.pager.defaultPageSize = changes.defaultPageSize.currentValue * 1;
        }
        if (changes.maxPageSize) {
            this.pager.maxPageSize = changes.maxPageSize.currentValue * 1;
        }
        if (changes.minPageSize) {
            this.pager.minPageSize = changes.minPageSize.currentValue * 1;
        }
    };
    Object.defineProperty(PagedPagerComponent.prototype, "canMoveForward", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pager.canMoveForward;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagedPagerComponent.prototype, "canMoveBackward", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pager.canMoveBackward;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.goToFirstPage = /**
     * @return {?}
     */
    function () {
        if (this.pager.tryMoveToFirstPage()) {
            return this.listService.loadData();
        }
        return null;
    };
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.goToLastPage = /**
     * @return {?}
     */
    function () {
        if (this.pager.tryMoveToLastPage()) {
            return this.listService.loadData();
        }
        return null;
    };
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.goToNextPage = /**
     * @return {?}
     */
    function () {
        if (this.pager.tryMoveToNextPage()) {
            return this.listService.loadData();
        }
        return null;
    };
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.goToPreviousPage = /**
     * @return {?}
     */
    function () {
        if (this.pager.tryMoveToPreviousPage()) {
            return this.listService.loadData();
        }
        return null;
    };
    /**
     * @return {?}
     */
    PagedPagerComponent.prototype.loadData = /**
     * @return {?}
     */
    function () {
        return this.listService.loadData();
    };
    PagedPagerComponent.decorators = [
        { type: Component, args: [{
                    providers: [{ provide: PagedPager, useClass: RTPagedPager }],
                    selector: 'rt-paged-pager',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    PagedPagerComponent.ctorParameters = function () { return [
        { type: PagedPager },
        { type: RTList }
    ]; };
    PagedPagerComponent.propDecorators = {
        defaultPageSize: [{ type: Input }],
        maxPageSize: [{ type: Input }],
        minPageSize: [{ type: Input }]
    };
    return PagedPagerComponent;
}());
export { PagedPagerComponent };
if (false) {
    /** @type {?} */
    PagedPagerComponent.prototype.defaultPageSize;
    /** @type {?} */
    PagedPagerComponent.prototype.maxPageSize;
    /** @type {?} */
    PagedPagerComponent.prototype.minPageSize;
    /** @type {?} */
    PagedPagerComponent.prototype.pager;
    /** @type {?} */
    PagedPagerComponent.prototype.listService;
}
