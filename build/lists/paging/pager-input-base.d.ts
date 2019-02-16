import { DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
export declare abstract class PagerInputBase implements DoCheck, OnInit {
    pager: any;
    innerValue: string | number;
    changeTrackingKey: string;
    private pagerDiffer;
    constructor(pager: any, differs: KeyValueDiffers, changeTrackingKey: string);
    abstract value: number;
    setPageSize(value: any): void;
    restoreInputValue(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    private checkValueChanged;
}
