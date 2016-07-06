import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { ProgressState } from 'e2e4';

import { ListComponent } from '../list.component';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateNoDataComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    constructor(@SkipSelf()listHost: ListComponent, differs: KeyValueDiffers) {
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
