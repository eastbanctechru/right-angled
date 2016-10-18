import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

import { RtList } from './list';

export abstract class PageSizeControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    public innerValue: number;
    public checkPageSizeChanged = (item: any): void => {
        if (item.key === this.checkChangesPropertyName && item.currentValue !== this.innerValue) {
            this.innerValue = item.currentValue;
        }
    }
    public abstract get pageSize(): number;
    public abstract set pageSize(value: number);
    public abstract get checkChangesPropertyName(): string;

    constructor(private listService: RtList, public pager: any, differs: KeyValueDiffers) {
        this.pagerDiffer = differs.find([]).create(null);
    }

    public onComplete(): void {
        this.innerValue = this.pageSize;
        this.listService.loadData();
    }

    public setPageSize(value: any): void {
        this.innerValue = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pageSize = value;
        setTimeout(() => this.innerValue = this.pageSize);
    }

    public restoreInputValue(): void {
        this.innerValue = this.pageSize;
    }
    public ngOnInit(): void {
        this.restoreInputValue();
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageSizeChanged);
        }
    }
}
