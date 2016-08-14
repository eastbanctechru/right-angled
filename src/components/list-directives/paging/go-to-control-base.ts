import { Renderer, KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit } from '@angular/core';

import { RtNullObjectInjectable, RtPagedPager } from '../../providers/index';

export abstract class GoToControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    public disabledCls: string;
    constructor(private renderer: Renderer, protected pager: RtPagedPager, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (pager === RtNullObjectInjectable.instance) {
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
        if (this.innerDisabled) {
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, true);
        } else {
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, false);
        }
    }
    public abstract isDisabled(): boolean;
}
