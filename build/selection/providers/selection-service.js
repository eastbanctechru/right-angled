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
import { DefaultSelectionService } from 'e2e4';
var RTSelectionService = /** @class */ (function (_super) {
    __extends(RTSelectionService, _super);
    function RTSelectionService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitters = new Array();
        _this.childSelectionServices = new Array();
        return _this;
    }
    /**
     * @return {?}
     */
    RTSelectionService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.areaEventsEmitter = null;
        this.eventEmitters.length = 0;
        _super.prototype.destroy.call(this);
    };
    /**
     * @param {?=} recursive
     * @return {?}
     */
    RTSelectionService.prototype.selectAll = /**
     * @param {?=} recursive
     * @return {?}
     */
    function (recursive) {
        var _this = this;
        if (recursive === void 0) { recursive = true; }
        _super.prototype.selectAll.call(this);
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(function () {
            if (recursive && _this.childSelectionServices) {
                _this.childSelectionServices.forEach(function (service) {
                    service.selectAll(recursive);
                });
            }
        }, 0);
    };
    /**
     * @param {?=} recursive
     * @return {?}
     */
    RTSelectionService.prototype.deselectAll = /**
     * @param {?=} recursive
     * @return {?}
     */
    function (recursive) {
        if (recursive === void 0) { recursive = true; }
        if (recursive && this.childSelectionServices) {
            this.childSelectionServices.forEach(function (service) {
                service.deselectAll(recursive);
            });
        }
        _super.prototype.deselectAll.call(this);
    };
    /**
     * @param {?} tuple
     * @param {?} selected
     * @return {?}
     */
    RTSelectionService.prototype.processSelection = /**
     * @param {?} tuple
     * @param {?} selected
     * @return {?}
     */
    function (tuple, selected) {
        /** @type {?} */
        var initialSelectState = this.eventEmitters[tuple.index]
            ? this.eventEmitters[tuple.index].selected || null
            : null;
        if (initialSelectState === null || initialSelectState !== selected) {
            if (this.eventEmitters.length > tuple.index && this.eventEmitters[tuple.index]) {
                this.emitEvents(this.eventEmitters[tuple.index], selected, tuple);
                this.eventEmitters[tuple.index].postProcessSelection(selected);
            }
            if (this.areaEventsEmitter) {
                this.emitEvents(this.areaEventsEmitter, selected, tuple);
            }
        }
    };
    /**
     * @param {?} emitter
     * @param {?} selected
     * @param {?} tuple
     * @return {?}
     */
    RTSelectionService.prototype.emitEvents = /**
     * @param {?} emitter
     * @param {?} selected
     * @param {?} tuple
     * @return {?}
     */
    function (emitter, selected, tuple) {
        if (selected) {
            emitter.itemSelected.emit({ index: tuple.index, item: tuple.item });
        }
        else {
            emitter.itemDeselected.emit({ index: tuple.index, item: tuple.item });
        }
        emitter.selectionChanged.emit({ index: tuple.index, item: tuple.item });
    };
    return RTSelectionService;
}(DefaultSelectionService));
export { RTSelectionService };
if (false) {
    /** @type {?} */
    RTSelectionService.prototype.eventEmitters;
    /** @type {?} */
    RTSelectionService.prototype.childSelectionServices;
    /** @type {?} */
    RTSelectionService.prototype.areaEventsEmitter;
}
