/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, Self } from '@angular/core';
import { SortingsService } from 'e2e4';
import { LIST_PROVIDERS, RTList } from './providers/list';
var ListDirective = /** @class */ (function () {
    function ListDirective(listService, sortingsService) {
        var _this = this;
        this.listService = listService;
        this.sortingsService = sortingsService;
        this.listInit = new EventEmitter(false);
        this.afterListInit = new EventEmitter(false);
        this.loadSucceed = new EventEmitter();
        this.loadFailed = new EventEmitter();
        this.loadStarted = new EventEmitter();
        this.loadOnInit = true;
        this.keepRecordsOnLoad = false;
        this.successSubscription = listService.loadSucceed.subscribe(function (response) {
            _this.loadSucceed.emit(response);
        });
        this.failSubscription = listService.loadFailed.subscribe(function () {
            _this.loadFailed.emit();
        });
        this.loadStartedSubscription = listService.loadStarted.subscribe(function () {
            _this.loadStarted.emit();
        });
    }
    Object.defineProperty(ListDirective.prototype, "fetchMethod", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.listService.fetchMethod = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ListDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite theese default values by values passed via persistence services
        // 4. execute all ngAfterViewInit for custom services registration (setTimeout)
        setTimeout(function () {
            _this.listInit.emit(_this.listService);
            _this.listService.init();
            _this.afterListInit.emit(_this.listService);
            if (_this.loadOnInit) {
                _this.listService.loadData();
            }
        }, 0);
    };
    /**
     * @return {?}
     */
    ListDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.listService.destroy();
        this.successSubscription.unsubscribe();
        this.failSubscription.unsubscribe();
        this.loadStartedSubscription.unsubscribe();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ListDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.defaultSortings) {
            this.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
        if (changes.keepRecordsOnLoad) {
            this.listService.keepRecordsOnLoad = changes.keepRecordsOnLoad.currentValue;
        }
    };
    /**
     * @return {?}
     */
    ListDirective.prototype.reloadData = /**
     * @return {?}
     */
    function () {
        return this.listService.reloadData();
    };
    /**
     * @return {?}
     */
    ListDirective.prototype.loadData = /**
     * @return {?}
     */
    function () {
        return this.listService.loadData();
    };
    /**
     * @return {?}
     */
    ListDirective.prototype.resetSettings = /**
     * @return {?}
     */
    function () {
        this.listService.resetSettings();
    };
    /**
     * @return {?}
     */
    ListDirective.prototype.cancelRequests = /**
     * @return {?}
     */
    function () {
        this.listService.cancelRequests();
    };
    Object.defineProperty(ListDirective.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this.listService.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListDirective.prototype, "busy", {
        get: /**
         * @return {?}
         */
        function () {
            return this.listService.busy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListDirective.prototype, "ready", {
        get: /**
         * @return {?}
         */
        function () {
            return this.listService.ready;
        },
        enumerable: true,
        configurable: true
    });
    ListDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'rtList',
                    providers: [LIST_PROVIDERS],
                    selector: '[rtList]'
                },] },
    ];
    /** @nocollapse */
    ListDirective.ctorParameters = function () { return [
        { type: RTList, decorators: [{ type: Self }] },
        { type: SortingsService, decorators: [{ type: Self }] }
    ]; };
    ListDirective.propDecorators = {
        listInit: [{ type: Output }],
        afterListInit: [{ type: Output }],
        loadSucceed: [{ type: Output }],
        loadFailed: [{ type: Output }],
        loadStarted: [{ type: Output }],
        defaultSortings: [{ type: Input }],
        loadOnInit: [{ type: Input }],
        keepRecordsOnLoad: [{ type: Input }],
        fetchMethod: [{ type: Input, args: ['rtList',] }]
    };
    return ListDirective;
}());
export { ListDirective };
if (false) {
    /** @type {?} */
    ListDirective.prototype.listInit;
    /** @type {?} */
    ListDirective.prototype.afterListInit;
    /** @type {?} */
    ListDirective.prototype.loadSucceed;
    /** @type {?} */
    ListDirective.prototype.loadFailed;
    /** @type {?} */
    ListDirective.prototype.loadStarted;
    /** @type {?} */
    ListDirective.prototype.defaultSortings;
    /** @type {?} */
    ListDirective.prototype.loadOnInit;
    /** @type {?} */
    ListDirective.prototype.keepRecordsOnLoad;
    /**
     * @type {?}
     * @private
     */
    ListDirective.prototype.successSubscription;
    /**
     * @type {?}
     * @private
     */
    ListDirective.prototype.failSubscription;
    /**
     * @type {?}
     * @private
     */
    ListDirective.prototype.loadStartedSubscription;
    /** @type {?} */
    ListDirective.prototype.listService;
    /** @type {?} */
    ListDirective.prototype.sortingsService;
}
