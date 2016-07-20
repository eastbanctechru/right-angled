import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtListLifetimeInfo } from '../../services/injectables';
import { ListStateComponent } from './list-state-component';
import { RtNullObjectInjectableObject, RtPagedPager, RtBufferedPager, RtRegularPager } from '../../services/injectables';

@Component({
    selector: 'rt-list-state-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateNoDataComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    private pager: RtPagedPager | RtBufferedPager | RtRegularPager;
    constructor( @SkipSelf() pagedPager: RtPagedPager, @SkipSelf() bufferedPager: RtBufferedPager, @SkipSelf() regularPager: RtRegularPager, @SkipSelf() lifetimeInfo: RtListLifetimeInfo, differs: KeyValueDiffers) {
        super(lifetimeInfo, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = RtNullObjectInjectableObject.getFirstNotNullInstance(pagedPager, bufferedPager, regularPager);
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.pager);
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
        this.isVisible = this.lifetimeInfo.state === ProgressState.Done && this.pager.loadedCount === 0;
    }
}
