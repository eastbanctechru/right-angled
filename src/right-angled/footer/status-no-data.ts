import {SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck} from '@angular/core';
import {RtListComponent} from '../lists/list';
import {ProgressState} from 'e2e4';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-status-no-data',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class RtStatusNoDataComponent extends RtStatusControlBase implements DoCheck {
    pagerDiffer: KeyValueDiffer;
    constructor(@SkipSelf()listHost: RtListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
    }
    ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkLoadedCountChanges);
        }
    }
    checkLoadedCountChanges = (item: any): void => {
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.loadedCount === 0;
    }
}
