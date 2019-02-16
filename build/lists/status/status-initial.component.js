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
import { Component, KeyValueDiffers } from '@angular/core';
import { OperationStatus } from 'e2e4';
import { RTOperationStatus } from '../providers/list';
import { StatusComponentBase } from './status-component-base';
var StatusInitialComponent = /** @class */ (function (_super) {
    __extends(StatusInitialComponent, _super);
    function StatusInitialComponent(trackedStatusObject, differs) {
        return _super.call(this, trackedStatusObject, differs, OperationStatus.Initial) || this;
    }
    StatusInitialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rt-status-initial',
                    template: "<ng-content *ngIf=\"isVisible\"></ng-content>"
                },] },
    ];
    /** @nocollapse */
    StatusInitialComponent.ctorParameters = function () { return [
        { type: RTOperationStatus },
        { type: KeyValueDiffers }
    ]; };
    return StatusInitialComponent;
}(StatusComponentBase));
export { StatusInitialComponent };
