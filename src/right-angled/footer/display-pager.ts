import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { RtListComponent } from '../lists/list';
import { NgBufferedListService } from '../bootstrap/ngBufferedListService';
import { ProgressState } from 'e2e4';
import { RtStatusControlBase } from './status-control-base';

@Component({
    selector: 'rt-display-pager',
    template: `<div *ngIf="isVisible"><ng-content></ng-content></div>`
})
export class RtDisplayPagerComponent extends RtStatusControlBase implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    constructor(@SkipSelf()listHost: RtListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    private checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount' || (this.listHost.isBufferedList && item.key === 'skip')) {
            this.setVisibility();
        }
    }
    public setVisibility(): void {
        let isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
        if (this.listHost.isBufferedList) {
            isVisible = isVisible && (<NgBufferedListService>this.listHost.serviceInstance).pager.skip < this.listHost.serviceInstance.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
