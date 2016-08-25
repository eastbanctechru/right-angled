import { Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit, SkipSelf } from '@angular/core';
import { BufferedPager, PagedPager, ProgressState, RegularPager } from 'e2e4';

import { RtListService } from '../list-service';

@Component({
    selector: 'rt-total-records-text',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class TotalRecordsTextComponent implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private pagerDiffer: KeyValueDiffer;
    private isVisible: boolean;
    private pager: PagedPager | BufferedPager | RegularPager;
    constructor( @SkipSelf() pagedPager: PagedPager, @SkipSelf() bufferedPager: BufferedPager, @SkipSelf() regularPager: RegularPager, @SkipSelf() private listService: RtListService, differs: KeyValueDiffers) {
        this.listDiffer = differs.find([]).create(null);
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = pagedPager || bufferedPager || regularPager;
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let stateDiff = this.listDiffer.diff(this.listService);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    private checkStateFieldChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    private checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount') {
            this.setVisibility();
        }
    }
    private setVisibility(): void {
        this.isVisible = this.listService.state === ProgressState.Done && this.pager.totalCount !== 0;
    }
}
