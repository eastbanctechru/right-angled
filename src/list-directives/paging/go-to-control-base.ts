import { DoCheck, ElementRef, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { PagedPager } from 'e2e4';

export abstract class GoToControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    constructor(protected pager: PagedPager, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (pager === null) {
            throw new Error('[rtGoTo...] directives can be used only with paged list.');
        }
        this.pagerDiffer = differs.find([]).create(null);
        this.nativeEl = elementRef.nativeElement;
    }

    public get disabled(): boolean {
        return this.innerDisabled;
    }
    private checkPagerChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal' || item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.setDisabledState();
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanged);
        }
    }
    public ngOnInit(): void {
        this.setDisabledState();
    }
    protected setDisabledState(): void {
        this.innerDisabled = this.isDisabled();
    }
    public abstract isDisabled(): boolean;
}
