import { Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit, SkipSelf } from '@angular/core';
import { BufferedPager, PagedPager, RegularPager } from 'e2e4';

import { RtListService } from '../list-service';

@Component({
    selector: 'rt-display-pager',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class DisplayPagerComponent implements DoCheck, OnInit {
    protected isVisible: boolean;
    private pagerDiffer: KeyValueDiffer;
    private pager: PagedPager | BufferedPager | RegularPager;
    constructor( @SkipSelf() pagedPager: PagedPager, @SkipSelf() private bufferedPager: BufferedPager, @SkipSelf() regularPager: RegularPager, @SkipSelf() protected listService: RtListService, differs: KeyValueDiffers) {
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = pagedPager || bufferedPager || regularPager;
    }
    public ngOnInit(): void {
        this.setVisibility();
    }

    public ngDoCheck(): void {
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
        let isVisible = this.pager.totalCount !== 0;
        if (this.pager === this.bufferedPager) {
            isVisible = isVisible && this.bufferedPager.skip < this.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
