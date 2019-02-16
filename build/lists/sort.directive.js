/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, IterableDiffers, Renderer2, SkipSelf } from '@angular/core';
import { SortDirection, SortingsService } from 'e2e4';
import { RTList } from './providers/list';
var SortDirective = /** @class */ (function () {
    function SortDirective(listService, sortingsService, renderer, el, differs) {
        var _this = this;
        this.listService = listService;
        this.sortingsService = sortingsService;
        this.renderer = renderer;
        this.sortItemRemovedCallback = function (removedItem) {
            if (removedItem.item && removedItem.item.fieldName === _this.fieldName) {
                _this.removeSortClasses();
            }
        };
        this.sortItemAddedCallback = function (addedItem) {
            if (addedItem.item && addedItem.item.fieldName === _this.fieldName) {
                _this.setSortClasses(addedItem.item);
            }
        };
        this.sortingsDiffer = differs.find([]).create(null);
        this.nativeEl = el.nativeElement;
    }
    /**
     * @return {?}
     */
    SortDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (SortDirective.settings.sortableClassName) {
            this.renderer.addClass(this.nativeEl, SortDirective.settings.sortableClassName);
        }
        this.sortingsService.sortings.some(function (sortParameter) {
            if (sortParameter.fieldName === _this.fieldName) {
                _this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    };
    /**
     * @param {?} ctrlKeyPressed
     * @return {?}
     */
    SortDirective.prototype.clickHandler = /**
     * @param {?} ctrlKeyPressed
     * @return {?}
     */
    function (ctrlKeyPressed) {
        if (this.listService.ready && !this.disableSort) {
            this.sortingsService.setSort(this.fieldName, ctrlKeyPressed);
            this.listService.reloadData();
        }
    };
    /**
     * @return {?}
     */
    SortDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var changes = this.sortingsDiffer.diff(this.sortingsService.sortings);
        if (changes) {
            changes.forEachRemovedItem(this.sortItemRemovedCallback);
            changes.forEachAddedItem(this.sortItemAddedCallback);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SortDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.disableSort && changes.disableSort.currentValue) {
            this.sortingsService.removeSort(this.fieldName);
        }
    };
    /**
     * @private
     * @return {?}
     */
    SortDirective.prototype.removeSortClasses = /**
     * @private
     * @return {?}
     */
    function () {
        if (SortDirective.settings.sortAscClassName) {
            this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortAscClassName);
        }
        if (SortDirective.settings.sortDescClassName) {
            this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortDescClassName);
        }
    };
    /**
     * @private
     * @param {?} sortParameter
     * @return {?}
     */
    SortDirective.prototype.setSortClasses = /**
     * @private
     * @param {?} sortParameter
     * @return {?}
     */
    function (sortParameter) {
        /** @type {?} */
        var direction = sortParameter.direction;
        if (SortDirective.settings.sortAscClassName) {
            if (direction === SortDirection.Asc) {
                this.renderer.addClass(this.nativeEl, SortDirective.settings.sortAscClassName);
            }
            else {
                this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortAscClassName);
            }
        }
        if (SortDirective.settings.sortDescClassName) {
            if (direction === SortDirection.Desc) {
                this.renderer.addClass(this.nativeEl, SortDirective.settings.sortDescClassName);
            }
            else {
                this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortDescClassName);
            }
        }
    };
    SortDirective.settings = {
        sortAscClassName: 'rt-sort-asc',
        sortDescClassName: 'rt-sort-desc',
        sortableClassName: 'rt-sortable'
    };
    SortDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[rtSort]'
                },] },
    ];
    /** @nocollapse */
    SortDirective.ctorParameters = function () { return [
        { type: RTList, decorators: [{ type: SkipSelf }] },
        { type: SortingsService, decorators: [{ type: SkipSelf }] },
        { type: Renderer2 },
        { type: ElementRef },
        { type: IterableDiffers }
    ]; };
    SortDirective.propDecorators = {
        fieldName: [{ type: Input, args: ['rtSort',] }],
        disableSort: [{ type: Input }],
        clickHandler: [{ type: HostListener, args: ['click', ['$event.ctrlKey'],] }]
    };
    return SortDirective;
}());
export { SortDirective };
if (false) {
    /** @type {?} */
    SortDirective.settings;
    /** @type {?} */
    SortDirective.prototype.fieldName;
    /** @type {?} */
    SortDirective.prototype.disableSort;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.nativeEl;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.sortingsDiffer;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.sortItemRemovedCallback;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.sortItemAddedCallback;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.listService;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.sortingsService;
    /**
     * @type {?}
     * @private
     */
    SortDirective.prototype.renderer;
}
