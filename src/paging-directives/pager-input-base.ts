import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

import { RtList } from '../core/providers';

export abstract class PagerInputBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    public innerValue: number;
    public changeTrackingKey: string;
    private checkValueChanged = (item: any): void => {
        if (item.key === this.changeTrackingKey && item.currentValue !== this.innerValue) {
            this.innerValue = item.currentValue;
        }
    }
    public abstract get value(): number;
    public abstract set value(value: number);

    constructor(private listService: RtList, public pager: any, differs: KeyValueDiffers, changeTrackingKey: string) {
        this.changeTrackingKey = changeTrackingKey;
        this.pagerDiffer = differs.find([]).create(null);
    }

    public onComplete(): void {
        this.innerValue = this.value;
        this.listService.loadData();
    }

    public setPageSize(value: any): void {
        this.innerValue = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.value = value;
        setTimeout(() => this.innerValue = this.value, 0);
    }

    public restoreInputValue(): void {
        this.innerValue = this.value;
    }
    public ngOnInit(): void {
        this.restoreInputValue();
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkValueChanged);
        }
    }
}
