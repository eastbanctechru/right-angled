import { DoCheck, HostBinding, HostListener, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

export abstract class PagerInputBase implements DoCheck, OnInit {
    @HostBinding('value')
    public innerValue: number;
    public changeTrackingKey: string;
    private pagerDiffer: KeyValueDiffer;
    constructor(public pager: any, differs: KeyValueDiffers, changeTrackingKey: string) {
        this.changeTrackingKey = changeTrackingKey;
        this.pagerDiffer = differs.find([]).create(null);
    }
    public abstract get value(): number;
    public abstract set value(value: number);

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerValue = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.value = value;
        setTimeout(() => this.innerValue = this.value, 0);
    }
    @HostListener('blur')
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
    private checkValueChanged = (item: any): void => {
        if (item.key === this.changeTrackingKey && item.currentValue !== this.innerValue) {
            this.innerValue = item.currentValue;
        }
    }
}
