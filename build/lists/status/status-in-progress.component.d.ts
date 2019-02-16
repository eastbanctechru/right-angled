import { KeyValueDiffers } from '@angular/core';
import { RTOperationStatus } from '../providers/list';
import { StatusComponentBase } from './status-component-base';
export declare class StatusInProgressComponent extends StatusComponentBase {
    constructor(trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers);
}
