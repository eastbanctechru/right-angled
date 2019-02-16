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
EventsAttacherBase = /** @class */ (function () {
    function EventsAttacherBase(elementRef, renderer, eventListener) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.eventListener = eventListener;
        this.eventListeners = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    EventsAttacherBase.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.eventNames) {
            this.removeListeners();
            this.addListeners(this.adjustEvents(changes.eventNames.currentValue));
        }
    };
    /**
     * @return {?}
     */
    EventsAttacherBase.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListeners();
    };
    /**
     * @private
     * @param {?} eventsNames
     * @return {?}
     */
    EventsAttacherBase.prototype.adjustEvents = /**
     * @private
     * @param {?} eventsNames
     * @return {?}
     */
    function (eventsNames) {
        return eventsNames ? (Array.isArray(eventsNames) ? eventsNames : [eventsNames]) : [];
    };
    /**
     * @private
     * @return {?}
     */
    EventsAttacherBase.prototype.removeListeners = /**
     * @private
     * @return {?}
     */
    function () {
        this.eventListeners.forEach(function (listener) {
            if (typeof listener === 'function') {
                listener();
            }
        });
        this.eventListeners = [];
    };
    /**
     * @private
     * @param {?} eventNames
     * @return {?}
     */
    EventsAttacherBase.prototype.addListeners = /**
     * @private
     * @param {?} eventNames
     * @return {?}
     */
    function (eventNames) {
        var _this = this;
        if (!eventNames || !eventNames.length) {
            return;
        }
        this.eventListeners = eventNames.map(function (eventName) {
            return _this.renderer.listen(_this.elementRef.nativeElement, eventName, _this.eventListener);
        });
    };
    return EventsAttacherBase;
}());
/**
 * @abstract
 */
export { EventsAttacherBase };
if (false) {
    /** @type {?} */
    EventsAttacherBase.prototype.eventNames;
    /** @type {?} */
    EventsAttacherBase.prototype.eventListeners;
    /**
     * @type {?}
     * @private
     */
    EventsAttacherBase.prototype.elementRef;
    /** @type {?} */
    EventsAttacherBase.prototype.renderer;
    /** @type {?} */
    EventsAttacherBase.prototype.eventListener;
}
