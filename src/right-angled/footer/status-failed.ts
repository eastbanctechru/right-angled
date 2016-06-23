import {SkipSelf, Component, KeyValueDiffers} from '@angular/core';
import {RtListComponent} from '../lists/list';
import {ProgressState} from 'e2e4';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-status-failed',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class RtStatusFailedComponent extends RtStatusControlBase {
    constructor(@SkipSelf()listHost: RtListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Fail);
    }
}
