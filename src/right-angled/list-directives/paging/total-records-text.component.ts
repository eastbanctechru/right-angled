import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';
import { Pager, ProgressState } from 'e2e4';

import { ListComponent } from '../list.component';

@Component({
    selector: 'rt-total-records-text',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class TotalRecordsTextComponent implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private pagerDiffer: KeyValueDiffer;
    private isVisible: boolean;
    private listHost: ListComponent;
    private pager: Pager;
    constructor(@SkipSelf()listHost: ListComponent, differs: KeyValueDiffers) {
        this.listDiffer = differs.find([]).create(null);
        this.pagerDiffer = differs.find([]).create(null);
        this.listHost = listHost;
        this.pager = this.listHost.serviceInstance.pager;
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkListChanges);
        }
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    private checkListChanges = (item: any): void => {
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
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
    }
}
