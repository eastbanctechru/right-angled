import { Component, KeyValueDiffers } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RTOperationStatus } from '../providers/list';
import { StatusComponentBase } from './status-component-base';

@Component({
    selector: 'rt-status-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class StatusNoDataComponent extends StatusComponentBase {
    constructor(trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers) {
        super(trackedStatusObject, differs, OperationStatus.NoData);
    }
}
