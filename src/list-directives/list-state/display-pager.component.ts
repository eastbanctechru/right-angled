import { Component, DoCheck, KeyValueDiffer, KeyValueDiffers, SkipSelf } from '@angular/core';
import { BufferedPager, PagedPager, ProgressState, RegularPager } from 'e2e4';

import { RtListService } from '../list-service';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-display-pager',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class DisplayPagerComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    private pager: PagedPager | BufferedPager | RegularPager;
    constructor( @SkipSelf() pagedPager: PagedPager, @SkipSelf() private bufferedPager: BufferedPager, @SkipSelf() regularPager: RegularPager, @SkipSelf() protected listService: RtListService, differs: KeyValueDiffers) {
        super(listService, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = pagedPager || bufferedPager || regularPager;
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    private checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount' || (this.pager === this.bufferedPager && item.key === 'skip')) {
            this.setVisibility();
        }
    }
    public setVisibility(): void {
        let isVisible = this.listService.state === ProgressState.Done && this.pager.totalCount !== 0;
        if (this.pager === this.bufferedPager) {
            isVisible = isVisible && this.bufferedPager.skip < this.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
