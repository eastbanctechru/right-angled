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
import { Injectable } from '@angular/core';
import { FiltersService } from 'e2e4';
var RTFiltersService = /** @class */ (function (_super) {
    __extends(RTFiltersService, _super);
    function RTFiltersService() {
        return _super.call(this) || this;
    }
    RTFiltersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RTFiltersService.ctorParameters = function () { return []; };
    return RTFiltersService;
}(FiltersService));
export { RTFiltersService };
