/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
StatusComponentBase = /** @class */ (function () {
    function StatusComponentBase(trackedStatusObject, differs, visibleState) {
        var _this = this;
        this.trackedStatusObject = trackedStatusObject;
        this.checkStateFieldChanges = function (item) {
            if (item.key === 'status' || item.key === 'statusInternal') {
                _this.setVisibility();
            }
        };
        this.visibleState = visibleState;
        this.listDiffer = differs.find([]).create();
    }
    /**
     * @return {?}
     */
    StatusComponentBase.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setVisibility();
    };
    /**
     * @return {?}
     */
    StatusComponentBase.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stateDiff = this.listDiffer.diff(this.trackedStatusObject);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    };
    /**
     * @protected
     * @return {?}
     */
    StatusComponentBase.prototype.setVisibility = /**
     * @protected
     * @return {?}
     */
    function () {
        this.isVisible = this.trackedStatusObject.status === this.visibleState;
    };
    return StatusComponentBase;
}());
/**
 * @abstract
 */
export { StatusComponentBase };
if (false) {
    /** @type {?} */
    StatusComponentBase.prototype.isVisible;
    /**
     * @type {?}
     * @private
     */
    StatusComponentBase.prototype.listDiffer;
    /**
     * @type {?}
     * @private
     */
    StatusComponentBase.prototype.visibleState;
    /**
     * @type {?}
     * @private
     */
    StatusComponentBase.prototype.checkStateFieldChanges;
    /**
     * @type {?}
     * @protected
     */
    StatusComponentBase.prototype.trackedStatusObject;
}
