import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtNullObjectInjectable, RtListLifetimeInfo, RtPagedPager, RtBufferedPager, RtRegularPager } from '../../services/index';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-display-pager',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class DisplayPagerComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    private pager: RtPagedPager | RtBufferedPager | RtRegularPager;
    constructor( @SkipSelf() pagedPager: RtPagedPager, @SkipSelf() bufferedPager: RtBufferedPager, @SkipSelf() regularPager: RtRegularPager, @SkipSelf() protected lifetimeInfo: RtListLifetimeInfo, differs: KeyValueDiffers) {
        super(lifetimeInfo, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = RtNullObjectInjectable.getFirstNotNullInstance(pagedPager, bufferedPager, regularPager);
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    private checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount' || (this.pager instanceof RtBufferedPager && item.key === 'skip')) {
            this.setVisibility();
        }
    }
    public setVisibility(): void {
        let isVisible = this.lifetimeInfo.state === ProgressState.Done && this.pager.totalCount !== 0;
        if (this.pager instanceof RtBufferedPager) {
            isVisible = isVisible && (<RtBufferedPager>this.pager).skip < this.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
