import { Component, KeyValueDiffers } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RTOperationStatus } from '../providers/list';
import { StatusComponentBase } from './status-component-base';

@Component({
    selector: 'rt-status-request-cancelled',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class StatusRequestCancelledComponent extends StatusComponentBase {
    constructor(trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers) {
        super(trackedStatusObject, differs, OperationStatus.Cancelled);
    }
}
