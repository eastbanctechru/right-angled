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
// tslint:disable:max-classes-per-file
import { EventEmitter, Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { AsyncSubscriber, BufferedPager, FiltersService, List, PagedPager, SortingsService, StateService } from 'e2e4';
import { RTFiltersService } from '../../filters/filters-service';
// tslint:disable-next-line:variable-name
/** @type {?} */
export var RTFilterTarget = new InjectionToken('RTFilterTarget');
/**
 * @abstract
 */
var /**
 * @abstract
 */
RTStateService = /** @class */ (function (_super) {
    __extends(RTStateService, _super);
    function RTStateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RTStateService;
}(StateService));
/**
 * @abstract
 */
export { RTStateService };
var RTOperationStatus = /** @class */ (function () {
    function RTOperationStatus() {
    }
    return RTOperationStatus;
}());
export { RTOperationStatus };
if (false) {
    /** @type {?} */
    RTOperationStatus.prototype.status;
}
var RTList = /** @class */ (function (_super) {
    __extends(RTList, _super);
    function RTList(asyncSubscriber, stateServices, filterTargets, sortingsService, filtersService) {
        var _a;
        var _this = _super.call(this, asyncSubscriber, stateServices, sortingsService, filtersService) || this;
        _this.loadStarted = new EventEmitter();
        _this.loadSucceed = new EventEmitter();
        _this.loadFailed = new EventEmitter();
        _this.filterTargets = [];
        if (filterTargets != null) {
            if (Array.isArray(filterTargets)) {
                (_a = _this.filterTargets).push.apply(_a, filterTargets);
            }
            else {
                _this.filterTargets.push(filterTargets);
            }
        }
        return _this;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    RTList.prototype.loadSuccessCallback = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        /** @type {?} */
        var result = _super.prototype.loadSuccessCallback.call(this, response);
        this.loadSucceed.emit(result);
        return result;
    };
    /**
     * @return {?}
     */
    RTList.prototype.loadFailCallback = /**
     * @return {?}
     */
    function () {
        _super.prototype.loadFailCallback.call(this);
        this.loadFailed.emit();
    };
    /**
     * @return {?}
     */
    RTList.prototype.loadData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var subscribable = _super.prototype.loadData.call(this);
        this.loadStarted.emit();
        return subscribable;
    };
    /**
     * @return {?}
     */
    RTList.prototype.reloadData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var subscribable = _super.prototype.reloadData.call(this);
        this.loadStarted.emit();
        return subscribable;
    };
    /**
     * @return {?}
     */
    RTList.prototype.init = /**
     * @return {?}
     */
    function () {
        var _a;
        (_a = this.filtersService).registerFilterTarget.apply(_a, this.filterTargets);
        _super.prototype.init.call(this);
    };
    RTList.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RTList.ctorParameters = function () { return [
        { type: AsyncSubscriber },
        { type: RTStateService, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [RTFilterTarget,] }] },
        { type: SortingsService },
        { type: FiltersService }
    ]; };
    return RTList;
}(List));
export { RTList };
if (false) {
    /** @type {?} */
    RTList.prototype.loadStarted;
    /** @type {?} */
    RTList.prototype.loadSucceed;
    /** @type {?} */
    RTList.prototype.loadFailed;
    /**
     * @type {?}
     * @private
     */
    RTList.prototype.filterTargets;
}
var RTPagedPager = /** @class */ (function (_super) {
    __extends(RTPagedPager, _super);
    function RTPagedPager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTPagedPager.decorators = [
        { type: Injectable },
    ];
    return RTPagedPager;
}(PagedPager));
export { RTPagedPager };
var RTBufferedPager = /** @class */ (function (_super) {
    __extends(RTBufferedPager, _super);
    function RTBufferedPager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTBufferedPager.decorators = [
        { type: Injectable },
    ];
    return RTBufferedPager;
}(BufferedPager));
export { RTBufferedPager };
var RTSortingsService = /** @class */ (function (_super) {
    __extends(RTSortingsService, _super);
    function RTSortingsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTSortingsService.decorators = [
        { type: Injectable },
    ];
    return RTSortingsService;
}(SortingsService));
export { RTSortingsService };
/** @type {?} */
export var LIST_PROVIDERS = [
    AsyncSubscriber,
    RTList,
    { provide: FiltersService, useClass: RTFiltersService },
    { provide: RTOperationStatus, useExisting: RTList },
    { provide: SortingsService, useClass: RTSortingsService }
];
