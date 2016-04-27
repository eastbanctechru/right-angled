import {Component, KeyValueDiffers} from 'angular2/core';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-status-request-canceled',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class RtStatusRequestCanceled extends RtStatusControlBase {
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Cancelled);
    }
}
