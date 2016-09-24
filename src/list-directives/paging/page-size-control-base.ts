import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

import { RtListService } from '../list-service';

export abstract class PageSizeControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    public innerValue: number;
    public checkPageSizeChanged = (item: any): void => {
        if (item.key === this.pageSizePropertyName && item.currentValue !== this.innerValue) {
            this.innerValue = item.currentValue;
        }
    }
    public abstract get pageSizePropertyName(): string;

    constructor(private listService: RtListService, public pager: any, differs: KeyValueDiffers) {
        this.pagerDiffer = differs.find([]).create(null);
    }

    public onComplete(): void {
        this.innerValue = this.pager[this.pageSizePropertyName];
        this.listService.loadData();
    }

    public setPageSize(value: any): void {
        this.innerValue = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pager[this.pageSizePropertyName] = value;
        setTimeout(() => this.innerValue = this.pager[this.pageSizePropertyName]);
    }

    public restoreInputValue(): void {
        this.innerValue = this.pager[this.pageSizePropertyName];
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
