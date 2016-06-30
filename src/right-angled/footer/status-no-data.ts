import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { RtListComponent } from '../lists/list';
import { ProgressState } from 'e2e4';
import { RtStatusControlBase } from './status-control-base';

@Component({
    selector: 'rt-status-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class RtStatusNoDataComponent extends RtStatusControlBase implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    constructor(@SkipSelf()listHost: RtListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkLoadedCountChanges);
        }
    }
    private checkLoadedCountChanges = (item: any): void => {
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.loadedCount === 0;
    }
}
