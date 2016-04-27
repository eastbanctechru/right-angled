import {Component, KeyValueDiffers} from 'angular2/core';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-status-no-data',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class RtStatusNoData extends RtStatusControlBase {
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
    }
    checkStatusChanges(item: any): void {
        super.checkStatusChanges(item);
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.loadedCount === 0;
    }
}
