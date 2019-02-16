import { KeyValueDiffers } from '@angular/core';
import { RTOperationStatus } from '../providers/list';
import { StatusComponentBase } from './status-component-base';
export declare class StatusDoneComponent extends StatusComponentBase {
    constructor(trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers);
}
