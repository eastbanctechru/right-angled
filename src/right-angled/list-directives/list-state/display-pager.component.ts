import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { ProgressState } from 'e2e4';

import { ListComponent } from '../list.component';
import { RtBufferedListService } from '../../services/rt-buffered-list-service.service';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-display-pager',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class DisplayPagerComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    constructor(@SkipSelf()listHost: ListComponent, differs: KeyValueDiffers) {
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
            isVisible = isVisible && (<RtBufferedListService>this.listHost.serviceInstance).pager.skip < this.listHost.serviceInstance.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
